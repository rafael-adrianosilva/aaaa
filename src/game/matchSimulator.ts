import type {
  CareerState,
  Fixture,
  MatchResult,
  Strategy,
  TeamMatchStats,
} from "../types/game";
import { participationPrize, victoryPrize } from "./finance";
import { average, clamp, createSeededRandom, pickWeighted } from "./random";
import {
  calculateTeamPower,
  getPlayer,
  getStarters,
  getTeam,
  strategyLabels,
} from "./selectors";

const aiStrategies: Strategy[] = [
  "balanced",
  "aggressive",
  "controlled",
  "development",
];

export function simulateMatch(params: {
  career: CareerState;
  fixture: Fixture;
  userStrategy: Strategy;
  seed: string;
}): MatchResult {
  const { career, fixture, userStrategy, seed } = params;
  const random = createSeededRandom(seed);
  const homeTeam = getTeam(career, fixture.homeTeamId);
  const awayTeam = getTeam(career, fixture.awayTeamId);

  if (!homeTeam || !awayTeam) {
    throw new Error("Fixture invalida para simulacao.");
  }

  const homeStrategy =
    homeTeam.id === career.userTeamId ? userStrategy : pickAiStrategy(random);
  const awayStrategy =
    awayTeam.id === career.userTeamId ? userStrategy : pickAiStrategy(random);
  const homePower = calculateTeamPower(career, homeTeam.id, homeStrategy);
  const awayPower = calculateTeamPower(career, awayTeam.id, awayStrategy);
  const randomControl = (random() - 0.5) * 9;
  const homeWinChance = clamp(
    0.5 + (homePower - awayPower + 1.5 + randomControl) / 36,
    0.18,
    0.82,
  );
  const homeWins = random() < homeWinChance;
  const dominance = Math.abs(homePower - awayPower) + random() * 10;
  const cleanWin = dominance > 13 || random() > 0.72;
  const score = homeWins
    ? { home: 2, away: cleanWin ? 0 : 1 }
    : { home: cleanWin ? 0 : 1, away: 2 };
  const winnerTeamId = homeWins ? homeTeam.id : awayTeam.id;
  const loserTeamId = homeWins ? awayTeam.id : homeTeam.id;
  const winnerStarters = getStarters(career, winnerTeamId);
  const mvp = pickWeighted(
    winnerStarters,
    (player) =>
      player.overall * 1.2 +
      player.form * 0.5 +
      player.morale * 0.35 +
      player.consistency * 0.25,
    random,
  );
  const mvpPlayerId = mvp?.id ?? winnerStarters[0]?.id ?? career.players[0]?.id;
  const homeStats = buildStats(career, homeTeam.id, homePower, homeWins, random);
  const awayStats = buildStats(career, awayTeam.id, awayPower, !homeWins, random);
  const winner = homeWins ? homeTeam : awayTeam;
  const loser = homeWins ? awayTeam : homeTeam;
  const mvpName = getPlayer(career, mvpPlayerId)?.nick ?? "MVP";

  return {
    id: `match-${fixture.id}-${Date.now()}`,
    fixtureId: fixture.id,
    round: fixture.round,
    homeTeamId: homeTeam.id,
    awayTeamId: awayTeam.id,
    winnerTeamId,
    score,
    mvpPlayerId,
    stats: {
      home: homeStats,
      away: awayStats,
    },
    log: [
      `${homeTeam.name} entrou com postura ${strategyLabels[homeStrategy].toLowerCase()}; ${awayTeam.name} respondeu com ${strategyLabels[awayStrategy].toLowerCase()}.`,
      `O primeiro mapa teve controle de objetivos em ${Math.max(homeStats.objectivePressure, awayStats.objectivePressure)} pontos de pressao.`,
      `${winner.name} venceu os duelos decisivos e fechou a serie em ${score.home} x ${score.away}.`,
      `${mvpName} foi eleito MVP pela combinacao de forma, consistencia e impacto nos momentos finais.`,
      `${loser.name} perde moral, mas ainda soma experiencia para a proxima rodada.`,
    ],
    moneyDeltaByTeam: {
      [winnerTeamId]: victoryPrize,
      [loserTeamId]: participationPrize,
    },
    fansDeltaByTeam: {
      [winnerTeamId]: 950,
      [loserTeamId]: -360,
    },
    moraleDeltaByTeam: {
      [winnerTeamId]: 6,
      [loserTeamId]: -5,
    },
    playedAt: new Date().toISOString(),
  };
}

function pickAiStrategy(random: () => number): Strategy {
  return aiStrategies[Math.floor(random() * aiStrategies.length)];
}

function buildStats(
  career: CareerState,
  teamId: string,
  power: number,
  won: boolean,
  random: () => number,
): TeamMatchStats {
  const starters = getStarters(career, teamId);
  const mental = average(starters.map((player) => player.composure));
  const communication = average(starters.map((player) => player.communication));

  return {
    focus: clamp(Math.round(power + mental * 0.18 + random() * 10), 35, 99),
    objectivePressure: clamp(
      Math.round(power * 0.72 + communication * 0.22 + (won ? 8 : -2) + random() * 12),
      20,
      99,
    ),
    clutchRounds: clamp(Math.round((won ? 5 : 2) + mental / 22 + random() * 4), 0, 12),
    errors: clamp(Math.round(21 - power / 6 + (won ? -3 : 3) + random() * 7), 2, 28),
  };
}
