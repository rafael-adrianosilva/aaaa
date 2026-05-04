import initialData from "../data/initial-data.json";
import { realPlayers } from "../data/players.real";
import { realTeams } from "../data/teams.real";
import type {
  CareerState,
  Difficulty,
  InitialData,
  NewsItem,
  Player,
  PlayerPosition,
  PlayerSeed,
  Team,
  TeamSeed,
} from "../types/game";
import type { RealPlayer } from "../types/RealPlayer";
import type { RealTeam } from "../types/RealTeam";
import { generateRoundRobinSchedule } from "./championship";
import { clamp, createSeededRandom, roundTo } from "./random";

const data = initialData as InitialData;

const difficultyMoney: Record<Difficulty, number> = {
  rookie: 70000,
  pro: 0,
  elite: -60000,
};

const difficultyReputation: Record<Difficulty, number> = {
  rookie: 3,
  pro: 0,
  elite: -2,
};

export function createCareer(params: {
  managerName: string;
  difficulty: Difficulty;
  teamId: string;
}): CareerState {
  if (realTeams.some((team) => team.id === params.teamId)) {
    return createRealCareer(params);
  }

  const players = data.players.map(createPlayerFromSeed);
  const teams = data.teams.map<Team>((teamSeed) => {
    const roster = players
      .filter((player) => player.teamId === teamSeed.id)
      .map((player) => player.id);
    const starters = players
      .filter(
        (player) => player.teamId === teamSeed.id && player.status === "starter",
      )
      .map((player) => player.id)
      .slice(0, 5);
    const isUserTeam = teamSeed.id === params.teamId;

    return {
      ...teamSeed,
      money: teamSeed.money + (isUserTeam ? difficultyMoney[params.difficulty] : 0),
      reputation: clamp(
        teamSeed.reputation +
          (isUserTeam ? difficultyReputation[params.difficulty] : 0),
        1,
        100,
      ),
      roster,
      starters,
      wins: 0,
      losses: 0,
      points: 0,
      roundDiff: 0,
    };
  });

  const now = new Date().toISOString();
  const userTeam = teams.find((team) => team.id === params.teamId);
  const schedule = generateRoundRobinSchedule(teams);

  return {
    id: `career-${Date.now()}`,
    managerName: params.managerName.trim(),
    difficulty: params.difficulty,
    userTeamId: params.teamId,
    teams,
    players,
    schedule,
    currentRound: 1,
    matchSeed: 1,
    strategy: "balanced",
    news: [
      createNews(
        "Nova carreira iniciada",
        `${params.managerName.trim()} assume o comando da ${userTeam?.name ?? "organizacao"} para a temporada nacional.`,
        "positive",
      ),
      createNews(
        "Janela de mercado aberta",
        "Free agents ja podem ser contratados, desde que o caixa suporte a taxa e a folha semanal.",
        "market",
      ),
      createNews(
        "Liga confirma fase de pontos",
        "Os 10 clubes se enfrentam em turno unico. Vitoria vale tres pontos.",
        "info",
      ),
    ],
    lastMatch: null,
    createdAt: now,
    updatedAt: now,
  };
}

export function getInitialTeamSeeds() {
  return realTeams.map(realTeamToSeed);
}

function createRealCareer(params: {
  managerName: string;
  difficulty: Difficulty;
  teamId: string;
}): CareerState {
  const basePlayers = realPlayers.map(createPlayerFromRealPlayer);

  // Auto-generate players for teams without full rosters
  const generatedPlayers: Player[] = [];
  for (const team of realTeams) {
    const existing = basePlayers.filter((p) => p.teamId === team.id);
    const starterCount = existing.filter((p) => p.status === "starter").length;
    if (starterCount < 5) {
      const needed = 5 - starterCount;
      const overallBase = Math.max(55, Math.min(85, Math.round(100 - team.rankingGlobal * 0.4)));
      const roles: PlayerPosition[] = ["Entrada", "Suporte", "Estrategista", "Controle", "Flex"];
      for (let i = 0; i < needed; i++) {
        const role = roles[(starterCount + i) % roles.length];
        const age = 19 + Math.floor(Math.random() * 10);
        const overall = clamp(overallBase + Math.floor((Math.random() - 0.4) * 8), 50, 92);
        const potential = clamp(overall + 3 + Math.floor(Math.random() * 10), overall + 5, 99);
        const id = `gen-${team.id}-${i}`;
        generatedPlayers.push({
          id,
          teamId: team.id,
          name: `Player ${i + 1}`,
          nick: `${team.name.slice(0, 3)}${i + 1}`,
          age,
          nationality: team.country,
          position: role,
          overall,
          potential,
          weeklySalary: Math.round((overall * 820 + potential * 260) / 250) * 250,
          marketValue: Math.round((overall * 1800 + potential * 2100) / 1000) * 1000,
          contractWeeks: 52,
          morale: 60 + Math.floor(Math.random() * 15),
          form: 60 + Math.floor(Math.random() * 15),
          mechanics: clamp(overall + Math.floor((Math.random() - 0.4) * 8), 45, 99),
          gameSense: clamp(overall + Math.floor((Math.random() - 0.4) * 8), 45, 99),
          communication: clamp(overall + Math.floor((Math.random() - 0.4) * 6), 45, 99),
          consistency: clamp(overall + Math.floor((Math.random() - 0.4) * 6), 45, 99),
          aggression: clamp(overall + Math.floor((Math.random() - 0.4) * 6), 45, 99),
          composure: clamp(overall + Math.floor((Math.random() - 0.4) * 6), 45, 99),
          status: "starter",
        });
      }
    }
  }

  const players = [...basePlayers, ...generatedPlayers];
  const teams = realTeams.map<Team>((team) => {
    const roster = players
      .filter((player) => player.teamId === team.id)
      .map((player) => player.id);
    const starters = players
      .filter((player) => player.teamId === team.id && player.status === "starter")
      .map((player) => player.id)
      .slice(0, 5);
    const isUserTeam = team.id === params.teamId;

    return {
      id: team.id,
      name: team.name,
      tag: team.name.slice(0, 4).toUpperCase(),
      crest: team.name
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      color: colorFromTeam(team),
      money: team.budget + (isUserTeam ? difficultyMoney[params.difficulty] : 0),
      fans: team.fanbase,
      reputation: clamp(
        team.reputation +
          (isUserTeam ? difficultyReputation[params.difficulty] : 0),
        1,
        100,
      ),
      roster,
      starters,
      wins: 0,
      losses: 0,
      points: 0,
      roundDiff: 0,
      synergy: clamp(team.currentForm, 1, 100),
    };
  });
  const leagueTeams = teams.some((team) => team.id === params.teamId && teams.indexOf(team) >= 10)
    ? [teams.find((team) => team.id === params.teamId)!, ...teams.filter((team) => team.id !== params.teamId).slice(0, 9)]
    : teams.slice(0, 10);
  const schedule = generateRoundRobinSchedule(leagueTeams);
  const userTeam = teams.find((team) => team.id === params.teamId);
  const now = new Date().toISOString();

  return {
    id: `career-${Date.now()}`,
    managerName: params.managerName.trim(),
    difficulty: params.difficulty,
    userTeamId: params.teamId,
    teams,
    players,
    schedule,
    currentRound: 1,
    matchSeed: 1,
    strategy: "balanced",
    news: [
      createNews(
        "Carreira CS iniciada",
        `${params.managerName.trim()} assume a ${userTeam?.name ?? "organizacao"} em uma temporada com torneios reais em texto.`,
        "positive",
      ),
      createNews(
        "Circuito competitivo disponivel",
        "Campeonatos, veto de mapas, patrocinadores e ranking global foram ativados.",
        "info",
      ),
    ],
    lastMatch: null,
    createdAt: now,
    updatedAt: now,
  };
}

function realTeamToSeed(team: RealTeam): TeamSeed {
  return {
    id: team.id,
    name: team.name,
    tag: team.name.slice(0, 4).toUpperCase(),
    crest: team.name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    color: colorFromTeam(team),
    money: team.budget,
    fans: team.fanbase,
    reputation: team.reputation,
    synergy: team.currentForm,
  };
}

function createPlayerFromRealPlayer(realPlayer: RealPlayer): Player {
  return {
    id: realPlayer.id,
    teamId: realPlayer.teamId ?? null,
    name: realPlayer.realName ?? realPlayer.nickname,
    nick: realPlayer.nickname,
    age: realPlayer.age ?? 22,
    nationality: realPlayer.nationality,
    position: roleToPosition(realPlayer.role),
    overall: realPlayer.overall,
    potential: realPlayer.potential,
    weeklySalary: Math.round(realPlayer.salary / 4),
    marketValue: realPlayer.marketValue,
    contractWeeks: realPlayer.status === "FreeAgent" ? 0 : 52,
    morale: realPlayer.morale,
    form: realPlayer.form,
    mechanics: realPlayer.mechanics,
    gameSense: realPlayer.gameSense,
    communication: realPlayer.communication,
    consistency: realPlayer.consistency,
    aggression: realPlayer.role === "Entry" ? realPlayer.aim : realPlayer.reflex,
    composure: realPlayer.mental,
    status:
      realPlayer.status === "FreeAgent"
        ? "free-agent"
        : realPlayer.status === "Starter"
          ? "starter"
          : "reserve",
  };
}

function roleToPosition(role: RealPlayer["role"]): PlayerPosition {
  if (role === "IGL") {
    return "Estrategista";
  }

  if (role === "AWPer" || role === "Anchor") {
    return "Controle";
  }

  if (role === "Support") {
    return "Suporte";
  }

  if (role === "Entry") {
    return "Entrada";
  }

  return "Flex";
}

function colorFromTeam(team: RealTeam) {
  const colors = [
    "#1ad8a1",
    "#ff6f61",
    "#41b3ff",
    "#ffc857",
    "#b9f26d",
    "#d17cff",
    "#2ed3e6",
    "#f9863a",
  ];
  const index = team.id
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);

  return colors[index % colors.length];
}

function createPlayerFromSeed(seed: PlayerSeed): Player {
  const random = createSeededRandom(seed.id);
  const ageCurve = seed.age <= 19 ? 5 : seed.age >= 26 ? -2 : 1;
  const mechanics = stat(seed.tier, random, seed.position === "Entrada" ? 4 : 0);
  const gameSense = stat(seed.tier, random, seed.position === "Estrategista" ? 5 : 0);
  const communication = stat(seed.tier, random, seed.position === "Suporte" ? 5 : 0);
  const consistency = stat(seed.tier, random, seed.age >= 24 ? 4 : 0);
  const aggression = stat(seed.tier, random, seed.position === "Entrada" ? 5 : -1);
  const composure = stat(seed.tier, random, seed.age >= 23 ? 4 : 0);
  const overall = Math.round(
    (mechanics + gameSense + communication + consistency + composure) / 5,
  );
  const potential = clamp(
    Math.round(seed.tier + ageCurve + random() * 9 + (seed.status === "reserve" ? 3 : 0)),
    overall,
    96,
  );

  return {
    id: seed.id,
    teamId: seed.teamId,
    name: seed.name,
    nick: seed.nick,
    age: seed.age,
    nationality: seed.nationality,
    position: seed.position,
    overall,
    potential,
    weeklySalary: roundTo(overall * 820 + potential * 260 + random() * 4500, 250),
    marketValue: roundTo(overall * 1800 + potential * 2100 + random() * 32000, 1000),
    contractWeeks: seed.status === "free-agent" ? 0 : 24 + Math.floor(random() * 80),
    morale: Math.round(58 + random() * 22),
    form: Math.round(55 + random() * 24),
    mechanics,
    gameSense,
    communication,
    consistency,
    aggression,
    composure,
    status: seed.status,
  };
}

function stat(base: number, random: () => number, bonus = 0) {
  return clamp(Math.round(base + bonus + (random() - 0.46) * 12), 45, 96);
}

function createNews(
  title: string,
  body: string,
  tone: NewsItem["tone"],
): NewsItem {
  return {
    id: `news-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    body,
    tone,
    createdAt: new Date().toISOString(),
  };
}
