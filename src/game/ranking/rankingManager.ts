import type { RankingEntry } from "../../types/Ranking";
import type { RealTeam } from "../../types/RealTeam";
import type { SeriesResult } from "../../types/Series";
import type { Tournament } from "../../types/Tournament";

export function createInitialRankings(teams: RealTeam[]): RankingEntry[] {
  const globalSorted = [...teams].sort(
    (a, b) =>
      (b.valvePoints ?? 0) + b.reputation * 12 - ((a.valvePoints ?? 0) + a.reputation * 12),
  );
  const regionalCounters = new Map<string, number>();

  return globalSorted.map((team, index) => {
    const regionRank = (regionalCounters.get(team.region) ?? 0) + 1;
    regionalCounters.set(team.region, regionRank);

    return {
      teamId: team.id,
      region: team.region,
      globalRank: index + 1,
      regionalRank: regionRank,
      points: (team.valvePoints ?? 0) + team.reputation * 12,
      trend: "stable",
    };
  });
}

export function recalculateRankings(
  teams: RealTeam[],
  previous: RankingEntry[] = [],
): RankingEntry[] {
  const previousRanks = new Map(previous.map((entry) => [entry.teamId, entry.globalRank]));
  const sorted = [...teams].sort(
    (a, b) =>
      (b.valvePoints ?? 0) + b.reputation * 12 - ((a.valvePoints ?? 0) + a.reputation * 12),
  );
  const regionalCounters = new Map<string, number>();

  return sorted.map((team, index) => {
    const globalRank = index + 1;
    const oldRank = previousRanks.get(team.id) ?? globalRank;
    const regionalRank = (regionalCounters.get(team.region) ?? 0) + 1;
    regionalCounters.set(team.region, regionalRank);

    return {
      teamId: team.id,
      region: team.region,
      globalRank,
      regionalRank,
      points: (team.valvePoints ?? 0) + team.reputation * 12,
      trend: globalRank < oldRank ? "up" : globalRank > oldRank ? "down" : "stable",
    };
  });
}

export function applySeriesRankingImpact(
  teams: RealTeam[],
  rankings: RankingEntry[],
  result: SeriesResult,
  tournament: Tournament,
) {
  const tierImpact = {
    Major: 180,
    S: 120,
    A: 80,
    B: 45,
    C: 25,
    Regional: 42,
    Qualifier: 35,
    Academy: 20,
    Female: 30,
  }[tournament.tier];

  const nextTeams = teams.map((team) => {
    if (team.id === result.winnerTeamId) {
      return {
        ...team,
        valvePoints: (team.valvePoints ?? 0) + tierImpact,
        currentForm: Math.min(100, team.currentForm + 4),
        morale: Math.min(100, team.morale + 5),
        fanbase: team.fanbase + Math.round(tournament.prestige * 120),
      };
    }

    if (team.id === result.loserTeamId) {
      return {
        ...team,
        valvePoints: Math.max(0, (team.valvePoints ?? 0) - Math.round(tierImpact * 0.18)),
        currentForm: Math.max(1, team.currentForm - 2),
        morale: Math.max(1, team.morale - 4),
      };
    }

    return team;
  });

  return {
    teams: nextTeams,
    rankings: recalculateRankings(nextTeams, rankings),
  };
}
