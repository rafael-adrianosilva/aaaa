import type { CalendarEvent } from "../../types/Ranking";
import type { RealTeam } from "../../types/RealTeam";
import type {
  Tournament,
  TournamentRun,
  TournamentRunMatch,
  TournamentRunStage,
  TournamentStage,
} from "../../types/Tournament";
import type { SeriesResult } from "../../types/Series";
import type { SeriesFormat } from "../../types/Veto";

export function buildTournamentCalendar(tournaments: Tournament[]): CalendarEvent[] {
  return tournaments
    .map((tournament) => ({
      id: `calendar-${tournament.id}`,
      tournamentId: tournament.id,
      name: tournament.displayName,
      startDate: tournament.startDate,
      endDate: tournament.endDate,
      region: tournament.region,
      status: tournament.status,
    }))
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function getDefaultTournamentStage(tournament: Tournament): TournamentStage {
  return (
    tournament.stages.find((stage) => stage.name === "Playoffs") ??
    tournament.stages[0] ?? {
      id: `${tournament.id}-stage`,
      name: "Series",
      format: tournament.format,
      seriesFormat: "MD3",
      teamsCount: tournament.teamsCount,
    }
  );
}

export function getSeriesFormatForTournament(
  tournament: Tournament,
  stageId?: string,
): SeriesFormat {
  const stage = stageId
    ? tournament.stages.find((item) => item.id === stageId)
    : getDefaultTournamentStage(tournament);

  if (stage?.seriesFormat) {
    return stage.seriesFormat;
  }

  if (tournament.format === "OpenQualifier" || tournament.format === "Swiss") {
    return "MD1";
  }

  return tournament.tier === "Major" || tournament.tier === "S" ? "MD3" : "MD3";
}

export function pickTournamentOpponent(
  teams: RealTeam[],
  tournament: Tournament,
  userTeamId: string,
): RealTeam | null {
  const userTeam = teams.find((team) => team.id === userTeamId);

  if (!userTeam) {
    return teams.find((team) => team.id !== userTeamId) ?? null;
  }

  const candidates = teams
    .filter((team) => team.id !== userTeamId)
    .filter(
      (team) =>
        tournament.region === "Global" ||
        tournament.region === "Americas" ||
        team.region === tournament.region ||
        (tournament.region === "South America" && team.region === "Brazil") ||
        (tournament.region === "Brazil" && team.region === "Brazil"),
    )
    .sort((a, b) => {
      const diffA = Math.abs((a.rankingGlobal ?? 50) - (userTeam.rankingGlobal ?? 50));
      const diffB = Math.abs((b.rankingGlobal ?? 50) - (userTeam.rankingGlobal ?? 50));
      return diffA - diffB;
    });

  return candidates[0] ?? teams.find((team) => team.id !== userTeamId) ?? null;
}

export function createTournamentRun(
  tournament: Tournament,
  teams: RealTeam[],
  userTeamId: string,
): TournamentRun {
  const participants = seedTournamentParticipants(teams, tournament, userTeamId);
  const stages = createRunStages(tournament, participants);
  const firstMatch = stages[0]?.matches[0];

  return {
    id: `run-${tournament.id}-${Date.now()}`,
    tournamentId: tournament.id,
    participantTeamIds: participants,
    stages,
    currentStageIndex: 0,
    currentMatchId: firstMatch?.id,
    status: "Ongoing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function getCurrentTournamentMatch(
  run: TournamentRun | null | undefined,
) {
  if (!run?.currentMatchId) {
    return null;
  }

  return (
    run.stages
      .flatMap((stage) => stage.matches)
      .find((match) => match.id === run.currentMatchId) ?? null
  );
}

export function recordSeriesResultInRun(
  run: TournamentRun,
  result: SeriesResult,
): TournamentRun {
  const stages = run.stages.map((stage) => ({
    ...stage,
    matches: stage.matches.map((match) =>
      match.id === run.currentMatchId
        ? {
            ...match,
            status: "Finished" as const,
            winnerTeamId: result.winnerTeamId,
            loserTeamId: result.loserTeamId,
            result,
          }
        : match,
    ),
  }));
  const activeStage = stages[run.currentStageIndex];
  const pendingInStage = activeStage?.matches.find(
    (match) => match.status !== "Finished",
  );

  if (pendingInStage) {
    return {
      ...run,
      stages,
      currentMatchId: pendingInStage.id,
      updatedAt: new Date().toISOString(),
    };
  }

  const nextStageIndex = run.currentStageIndex + 1;
  const nextStage = stages[nextStageIndex];

  if (!nextStage) {
    return {
      ...run,
      stages,
      status: "Finished",
      currentMatchId: undefined,
      championTeamId: result.winnerTeamId,
      updatedAt: new Date().toISOString(),
    };
  }

  if (nextStage.matches.length === 0) {
    const winners = activeStage.matches
      .map((match) => match.winnerTeamId)
      .filter((teamId): teamId is string => Boolean(teamId));
    const hydratedNextStage = {
      ...nextStage,
      matches: createStageMatches({
        tournamentId: run.tournamentId,
        stageId: nextStage.id,
        stageName: nextStage.name,
        seriesFormat: nextStage.seriesFormat,
        teamIds: winners,
        roundLabel: nextStage.name,
      }),
    };
    const nextStages = stages.map((stage, index) =>
      index === nextStageIndex ? hydratedNextStage : stage,
    );

    return {
      ...run,
      stages: nextStages,
      currentStageIndex: nextStageIndex,
      currentMatchId: hydratedNextStage.matches[0]?.id,
      updatedAt: new Date().toISOString(),
    };
  }

  return {
    ...run,
    stages,
    currentStageIndex: nextStageIndex,
    currentMatchId: nextStage.matches[0]?.id,
    updatedAt: new Date().toISOString(),
  };
}

export function upsertTournamentRun(
  runs: TournamentRun[],
  run: TournamentRun,
) {
  return runs.some((item) => item.id === run.id)
    ? runs.map((item) => (item.id === run.id ? run : item))
    : [...runs, run];
}

export function markTournamentPlayed(
  tournaments: Tournament[],
  tournamentId: string,
): Tournament[] {
  return tournaments.map((tournament) =>
    tournament.id === tournamentId ? { ...tournament, status: "Finished" } : tournament,
  );
}

function seedTournamentParticipants(
  teams: RealTeam[],
  tournament: Tournament,
  userTeamId: string,
) {
  const userTeam = teams.find((team) => team.id === userTeamId);
  const regionFiltered = teams.filter((team) =>
    tournament.region === "Global" ||
    tournament.region === "Americas" ||
    team.region === tournament.region ||
    (tournament.region === "South America" && team.region === "Brazil") ||
    (tournament.region === "Brazil" && team.region === "Brazil")
  );
  const pool = (regionFiltered.length >= 4 ? regionFiltered : teams)
    .filter((team) => team.id !== userTeamId)
    .sort((a, b) => (a.rankingGlobal ?? 999) - (b.rankingGlobal ?? 999));
  const targetCount = Math.min(
    nearestPowerOfTwo(Math.min(tournament.teamsCount, 16)),
    pool.length + (userTeam ? 1 : 0),
  );
  const selected = [
    ...(userTeam ? [userTeam.id] : []),
    ...pool.slice(0, Math.max(0, targetCount - (userTeam ? 1 : 0))).map((team) => team.id),
  ];

  return selected.slice(0, targetCount);
}

function createRunStages(
  tournament: Tournament,
  participantTeamIds: string[],
): TournamentRunStage[] {
  const bracketStages = buildBracketStagePlan(tournament, participantTeamIds.length);

  return bracketStages.map((stage, index) => ({
    id: `${tournament.id}-run-stage-${index + 1}`,
    name: stage.name,
    seriesFormat: stage.seriesFormat,
    order: index + 1,
    matches:
      index === 0
        ? createStageMatches({
            tournamentId: tournament.id,
            stageId: `${tournament.id}-run-stage-${index + 1}`,
            stageName: stage.name,
            seriesFormat: stage.seriesFormat,
            teamIds: participantTeamIds,
            roundLabel: stage.name,
          })
        : [],
  }));
}

function buildBracketStagePlan(tournament: Tournament, teamCount: number) {
  const stages: Array<{ name: string; seriesFormat: SeriesFormat }> = [];
  let remaining = teamCount;

  while (remaining > 1) {
    const name =
      remaining >= 16
        ? "Round of 16"
        : remaining === 8
          ? "Quarterfinals"
          : remaining === 4
            ? "Semifinals"
            : "Grand Final";
    const seriesFormat: SeriesFormat =
      name === "Grand Final"
        ? "MD5"
        : tournament.format === "OpenQualifier" && remaining > 4
          ? "MD1"
          : "MD3";

    stages.push({ name, seriesFormat });
    remaining = Math.ceil(remaining / 2);
  }

  return stages.length
    ? stages
    : [{ name: "Grand Final", seriesFormat: "MD5" as SeriesFormat }];
}

function createStageMatches(params: {
  tournamentId: string;
  stageId: string;
  stageName: string;
  seriesFormat: SeriesFormat;
  teamIds: string[];
  roundLabel: string;
}): TournamentRunMatch[] {
  const paired = [...params.teamIds];
  const matches: TournamentRunMatch[] = [];

  for (let index = 0; index < paired.length; index += 2) {
    const teamAId = paired[index];
    const teamBId = paired[index + 1] ?? paired[0];

    if (!teamAId || !teamBId || teamAId === teamBId) {
      continue;
    }

    matches.push({
      id: `${params.stageId}-match-${matches.length + 1}`,
      tournamentId: params.tournamentId,
      stageId: params.stageId,
      stageName: params.stageName,
      roundLabel: params.roundLabel,
      seriesFormat: params.seriesFormat,
      teamAId,
      teamBId,
      status: "Pending",
    });
  }

  return matches;
}

function nearestPowerOfTwo(value: number) {
  if (value >= 16) {
    return 16;
  }

  if (value >= 8) {
    return 8;
  }

  return 4;
}
