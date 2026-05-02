import type {
  CareerState,
  MatchResult,
  NewsItem,
  Strategy,
  Team,
} from "../types/game";
import { getRoundCount } from "./championship";
import {
  calculateWeeklyPayroll,
  calculateWeeklyRevenue,
  trainingCost,
} from "./finance";
import { clamp } from "./random";
import { simulateMatch } from "./matchSimulator";
import {
  getFreeAgents,
  getPlayer,
  getReservePlayers,
  getStarters,
  getTeam,
  getUserTeam,
} from "./selectors";

export function playNextRound(career: CareerState): CareerState {
  const roundFixtures = career.schedule.filter(
    (fixture) => fixture.round === career.currentRound && !fixture.played,
  );

  if (roundFixtures.length === 0) {
    return addNews(career, {
      title: "Temporada pausada",
      body: "Nao ha partidas pendentes nesta rodada.",
      tone: "info",
    });
  }

  let nextCareer = cloneCareer(career);
  let userMatch: MatchResult | null = null;

  for (const fixture of roundFixtures) {
    const result = simulateMatch({
      career: nextCareer,
      fixture,
      userStrategy: nextCareer.strategy,
      seed: `${nextCareer.id}-${nextCareer.currentRound}-${fixture.id}-${nextCareer.matchSeed}`,
    });

    nextCareer = applyMatchResult(nextCareer, result);

    if (
      fixture.homeTeamId === nextCareer.userTeamId ||
      fixture.awayTeamId === nextCareer.userTeamId
    ) {
      userMatch = result;
    }
  }

  nextCareer = applyWeeklyFinance(nextCareer);

  const roundCount = getRoundCount(nextCareer.schedule);
  const nextRound = Math.min(nextCareer.currentRound + 1, roundCount + 1);
  const userTeam = getUserTeam(nextCareer);
  const won = userMatch?.winnerTeamId === nextCareer.userTeamId;
  const opponentId =
    userMatch?.homeTeamId === nextCareer.userTeamId
      ? userMatch.awayTeamId
      : userMatch?.homeTeamId;
  const opponent = opponentId ? getTeam(nextCareer, opponentId) : null;
  const financeNet = userTeam ? calculateWeeklyRevenue(userTeam) - calculateWeeklyPayroll(nextCareer, userTeam.id) : 0;

  return addNews(
    {
      ...nextCareer,
      currentRound: nextRound,
      matchSeed: nextCareer.matchSeed + 1,
      lastMatch: userMatch,
      updatedAt: new Date().toISOString(),
    },
    {
      title: userMatch
        ? won
          ? "Vitoria na rodada"
          : "Derrota na rodada"
        : "Rodada simulada",
      body: userMatch
        ? `${userTeam?.name ?? "Seu time"} ${won ? "venceu" : "perdeu"} contra ${opponent?.name ?? "o adversario"} por ${userMatch.score.home} x ${userMatch.score.away}. Balanco semanal: ${financeNet >= 0 ? "+" : ""}${Math.round(financeNet).toLocaleString("pt-BR")} BRL.`
        : "Os demais clubes atualizaram a tabela da liga.",
      tone: won ? "positive" : "negative",
    },
  );
}

export function hireFreeAgent(career: CareerState, playerId: string): CareerState {
  const player = getPlayer(career, playerId);
  const userTeam = getUserTeam(career);

  if (!player || !userTeam || player.teamId || player.status !== "free-agent") {
    return career;
  }

  if (userTeam.money < player.marketValue) {
    return addNews(career, {
      title: "Contratacao bloqueada",
      body: `O caixa nao comporta a taxa de ${player.nick}.`,
      tone: "negative",
    });
  }

  const nextCareer = cloneCareer(career);
  const team = getUserTeam(nextCareer);
  const signedPlayer = getPlayer(nextCareer, playerId);

  if (!team || !signedPlayer) {
    return career;
  }

  team.money -= signedPlayer.marketValue;
  team.roster.push(signedPlayer.id);
  signedPlayer.teamId = team.id;
  signedPlayer.status = "reserve";
  signedPlayer.contractWeeks = 52;

  return addNews(nextCareer, {
    title: "Novo jogador contratado",
    body: `${signedPlayer.nick} assinou com a ${team.name} e entra como reserva imediato.`,
    tone: "market",
  });
}

export function toggleStarter(career: CareerState, playerId: string): CareerState {
  const userTeam = getUserTeam(career);
  const player = getPlayer(career, playerId);

  if (!userTeam || !player || player.teamId !== userTeam.id) {
    return career;
  }

  const nextCareer = cloneCareer(career);
  const team = getUserTeam(nextCareer);

  if (!team) {
    return career;
  }

  const alreadyStarter = team.starters.includes(playerId);

  if (alreadyStarter) {
    const reserves = getReservePlayers(nextCareer, team.id);
    const bestReserve = reserves[0];

    if (!bestReserve) {
      return career;
    }

    team.starters = team.starters
      .filter((starterId) => starterId !== playerId)
      .concat(bestReserve.id)
      .slice(0, 5);
  } else if (team.starters.length < 5) {
    team.starters.push(playerId);
  } else {
    const starters = getStarters(nextCareer, team.id);
    const lowestStarter = [...starters].sort((a, b) => a.overall - b.overall)[0];
    team.starters = team.starters.map((starterId) =>
      starterId === lowestStarter.id ? playerId : starterId,
    );
  }

  const starterIds = new Set(team.starters);
  nextCareer.players = nextCareer.players.map((candidate) =>
    candidate.teamId === team.id
      ? {
          ...candidate,
          status: starterIds.has(candidate.id) ? "starter" : "reserve",
        }
      : candidate,
  );

  return {
    ...nextCareer,
    updatedAt: new Date().toISOString(),
  };
}

export function runTraining(career: CareerState): CareerState {
  const nextCareer = cloneCareer(career);
  const team = getUserTeam(nextCareer);

  if (!team) {
    return career;
  }

  if (team.money < trainingCost) {
    return addNews(career, {
      title: "Treino cancelado",
      body: "O caixa nao cobre a estrutura desta semana.",
      tone: "negative",
    });
  }

  team.money -= trainingCost;
  team.synergy = clamp(team.synergy + 3, 1, 100);
  nextCareer.players = nextCareer.players.map((player) =>
    player.teamId === team.id
      ? {
          ...player,
          form: clamp(player.form + 2, 1, 100),
          morale: clamp(player.morale + 1, 1, 100),
          gameSense: clamp(player.gameSense + (player.age <= 20 ? 2 : 1), 1, 100),
        }
      : player,
  );

  return addNews(nextCareer, {
    title: "Semana de treino concluida",
    body: `${team.name} ganhou entrosamento e ajustou leitura de jogo antes da proxima rodada.`,
    tone: "positive",
  });
}

export function acceptSponsor(
  career: CareerState,
  sponsor: "regional" | "stream" | "hardware",
): CareerState {
  const sponsorValues = {
    regional: { money: 28000, fans: 650, label: "Circuito Regional" },
    stream: { money: 42000, fans: 1150, label: "Canal de Transmissao" },
    hardware: { money: 65000, fans: 400, label: "Equipamentos Vertice" },
  };
  const nextCareer = cloneCareer(career);
  const team = getUserTeam(nextCareer);

  if (!team) {
    return career;
  }

  const offer = sponsorValues[sponsor];
  team.money += offer.money;
  team.fans += offer.fans;

  return addNews(nextCareer, {
    title: "Patrocinio fechado",
    body: `${team.name} assinou com ${offer.label}. O acordo melhora caixa e exposicao.`,
    tone: "market",
  });
}

export function scoutSoloQueue(career: CareerState): CareerState {
  const candidates = getFreeAgents(career)
    .filter((player) => player.age <= 21)
    .slice(0, 3)
    .map((player) => player.nick)
    .join(", ");

  return addNews(career, {
    title: "Relatorio de scouting",
    body: candidates
      ? `A rede de solo queue destacou ${candidates} como nomes de alto potencial.`
      : "Nenhum talento jovem se destacou nesta rodada.",
    tone: "info",
  });
}

function applyMatchResult(career: CareerState, result: MatchResult): CareerState {
  const nextCareer = cloneCareer(career);
  const fixture = nextCareer.schedule.find((item) => item.id === result.fixtureId);
  const homeTeam = getTeam(nextCareer, result.homeTeamId);
  const awayTeam = getTeam(nextCareer, result.awayTeamId);
  const winner = getTeam(nextCareer, result.winnerTeamId);
  const loserTeamId =
    result.winnerTeamId === result.homeTeamId
      ? result.awayTeamId
      : result.homeTeamId;
  const loser = getTeam(nextCareer, loserTeamId);

  if (!fixture || !homeTeam || !awayTeam || !winner || !loser) {
    return career;
  }

  fixture.played = true;
  fixture.result = result;

  winner.wins += 1;
  winner.points += 3;
  loser.losses += 1;

  const homeDiff = result.score.home - result.score.away;
  homeTeam.roundDiff += homeDiff;
  awayTeam.roundDiff -= homeDiff;

  updateTeamAfterResult(winner, result, true);
  updateTeamAfterResult(loser, result, false);
  updatePlayersAfterResult(nextCareer, winner.id, true);
  updatePlayersAfterResult(nextCareer, loser.id, false);

  return nextCareer;
}

function updateTeamAfterResult(team: Team, result: MatchResult, won: boolean) {
  team.money += result.moneyDeltaByTeam[team.id] ?? 0;
  team.fans = Math.max(0, team.fans + (result.fansDeltaByTeam[team.id] ?? 0));
  team.synergy = clamp(team.synergy + (won ? 2 : -1), 1, 100);
}

function updatePlayersAfterResult(
  career: CareerState,
  teamId: string,
  won: boolean,
) {
  const team = getTeam(career, teamId);
  const starterIds = new Set(team?.starters ?? []);

  career.players = career.players.map((player) => {
    if (player.teamId !== teamId) {
      return player;
    }

    const starterModifier = starterIds.has(player.id) ? 1 : 0.45;
    const moraleDelta = (won ? 6 : -5) * starterModifier;
    const formDelta = (won ? 4 : -3) * starterModifier;

    return {
      ...player,
      morale: clamp(Math.round(player.morale + moraleDelta), 1, 100),
      form: clamp(Math.round(player.form + formDelta), 1, 100),
      contractWeeks: Math.max(0, player.contractWeeks - 1),
    };
  });
}

function applyWeeklyFinance(career: CareerState): CareerState {
  const nextCareer = cloneCareer(career);

  nextCareer.teams = nextCareer.teams.map((team) => {
    const revenue = calculateWeeklyRevenue(team);
    const payroll = calculateWeeklyPayroll(nextCareer, team.id);

    return {
      ...team,
      money: team.money + revenue - payroll,
    };
  });

  return nextCareer;
}

function addNews(
  career: CareerState,
  item: Omit<NewsItem, "id" | "createdAt">,
): CareerState {
  const news: NewsItem = {
    ...item,
    id: `news-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  return {
    ...career,
    news: [news, ...career.news].slice(0, 18),
    updatedAt: new Date().toISOString(),
  };
}

function cloneCareer(career: CareerState): CareerState {
  return {
    ...career,
    teams: career.teams.map((team) => ({
      ...team,
      roster: [...team.roster],
      starters: [...team.starters],
    })),
    players: career.players.map((player) => ({ ...player })),
    schedule: career.schedule.map((fixture) => ({
      ...fixture,
      result: fixture.result
        ? {
            ...fixture.result,
            score: { ...fixture.result.score },
            stats: {
              home: { ...fixture.result.stats.home },
              away: { ...fixture.result.stats.away },
            },
            log: [...fixture.result.log],
            moneyDeltaByTeam: { ...fixture.result.moneyDeltaByTeam },
            fansDeltaByTeam: { ...fixture.result.fansDeltaByTeam },
            moraleDeltaByTeam: { ...fixture.result.moraleDeltaByTeam },
          }
        : undefined,
    })),
    news: career.news.map((item) => ({ ...item })),
    lastMatch: career.lastMatch
      ? {
          ...career.lastMatch,
          score: { ...career.lastMatch.score },
          stats: {
            home: { ...career.lastMatch.stats.home },
            away: { ...career.lastMatch.stats.away },
          },
          log: [...career.lastMatch.log],
          moneyDeltaByTeam: { ...career.lastMatch.moneyDeltaByTeam },
          fansDeltaByTeam: { ...career.lastMatch.fansDeltaByTeam },
          moraleDeltaByTeam: { ...career.lastMatch.moraleDeltaByTeam },
        }
      : null,
  };
}
