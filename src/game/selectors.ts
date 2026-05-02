import type {
  CareerState,
  Difficulty,
  Fixture,
  Player,
  Strategy,
  Team,
} from "../types/game";
import { average, clamp } from "./random";

export const strategyLabels: Record<Strategy, string> = {
  balanced: "Equilibrada",
  aggressive: "Pressao alta",
  controlled: "Controle de ritmo",
  development: "Dar experiencia",
};

export const difficultyLabels: Record<Difficulty, string> = {
  rookie: "Acesso",
  pro: "Profissional",
  elite: "Elite",
};

export function formatMoney(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatUSD(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function formatNumber(value: number) {
  return value.toLocaleString("pt-BR");
}

export function getUserTeam(career: CareerState) {
  return career.teams.find((team) => team.id === career.userTeamId) ?? null;
}

export function getTeam(career: CareerState, teamId: string) {
  return career.teams.find((team) => team.id === teamId) ?? null;
}

export function getPlayer(career: CareerState, playerId: string) {
  return career.players.find((player) => player.id === playerId) ?? null;
}

export function getTeamPlayers(career: CareerState, teamId: string) {
  return career.players
    .filter((player) => player.teamId === teamId)
    .sort((a, b) => b.overall - a.overall);
}

export function getStarters(career: CareerState, teamId: string) {
  const team = getTeam(career, teamId);

  if (!team) {
    return [];
  }

  const playersById = new Map(
    career.players.map((player) => [player.id, player] as const),
  );

  const selected = team.starters
    .map((playerId) => playersById.get(playerId))
    .filter((player): player is Player => Boolean(player));

  if (selected.length >= 5) {
    return selected.slice(0, 5);
  }

  return getTeamPlayers(career, teamId).slice(0, 5);
}

export function getReservePlayers(career: CareerState, teamId: string) {
  const team = getTeam(career, teamId);
  const starterIds = new Set(team?.starters ?? []);

  return getTeamPlayers(career, teamId).filter(
    (player) => !starterIds.has(player.id),
  );
}

export function getFreeAgents(career: CareerState) {
  return career.players
    .filter((player) => player.status === "free-agent" || !player.teamId)
    .sort((a, b) => b.overall - a.overall);
}

export function getAverageMorale(career: CareerState, teamId: string) {
  return Math.round(average(getTeamPlayers(career, teamId).map((p) => p.morale)));
}

export function getWeeklySalary(career: CareerState, teamId: string) {
  return getTeamPlayers(career, teamId).reduce(
    (total, player) => total + player.weeklySalary,
    0,
  );
}

export function calculateTeamPower(
  career: CareerState,
  teamId: string,
  strategy: Strategy,
) {
  const team = getTeam(career, teamId);
  const starters = getStarters(career, teamId);

  if (!team || starters.length === 0) {
    return 40;
  }

  const overall = average(starters.map((player) => player.overall));
  const morale = average(starters.map((player) => player.morale));
  const form = average(starters.map((player) => player.form));
  const mechanics = average(starters.map((player) => player.mechanics));
  const gameSense = average(starters.map((player) => player.gameSense));
  const communication = average(starters.map((player) => player.communication));
  const aggression = average(starters.map((player) => player.aggression));
  const composure = average(starters.map((player) => player.composure));

  const strategyBoost: Record<Strategy, number> = {
    balanced: (communication + composure) * 0.03,
    aggressive: (mechanics + aggression) * 0.04 - composure * 0.015,
    controlled: (gameSense + composure) * 0.04 - aggression * 0.01,
    development: (communication + form) * 0.025 - overall * 0.025,
  };

  return clamp(
    overall * 0.46 +
      morale * 0.12 +
      form * 0.14 +
      team.synergy * 0.13 +
      team.reputation * 0.06 +
      strategyBoost[strategy],
    30,
    99,
  );
}

export function getStandings(teams: Team[]) {
  return [...teams].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }

    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    }

    if (b.roundDiff !== a.roundDiff) {
      return b.roundDiff - a.roundDiff;
    }

    return b.reputation - a.reputation;
  });
}

export function getTeamPosition(career: CareerState, teamId: string) {
  const standings = getStandings(career.teams);
  return standings.findIndex((team) => team.id === teamId) + 1;
}

export function getCurrentRoundFixtures(career: CareerState) {
  return career.schedule.filter((fixture) => fixture.round === career.currentRound);
}

export function getNextFixture(career: CareerState): Fixture | null {
  return (
    career.schedule.find(
      (fixture) =>
        !fixture.played &&
        (fixture.homeTeamId === career.userTeamId ||
          fixture.awayTeamId === career.userTeamId),
    ) ?? null
  );
}

export function getOpponentForFixture(career: CareerState, fixture: Fixture | null) {
  if (!fixture) {
    return null;
  }

  const opponentId =
    fixture.homeTeamId === career.userTeamId ? fixture.awayTeamId : fixture.homeTeamId;

  return getTeam(career, opponentId);
}
