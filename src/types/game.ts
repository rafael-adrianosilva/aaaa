export type Difficulty = "rookie" | "pro" | "elite";

export type PlayerPosition =
  | "Entrada"
  | "Suporte"
  | "Estrategista"
  | "Controle"
  | "Flex";

export type PlayerStatus = "starter" | "reserve" | "free-agent" | "academy";

export type Strategy = "balanced" | "aggressive" | "controlled" | "development";

export type GameScreen = "menu" | "career-setup" | "game";

export type DashboardView =
  | "overview"
  | "roster"
  | "transfers"
  | "standings"
  | "training"
  | "finances"
  | "sponsors"
  | "academy"
  | "solo-queue"
  | "social"
  | "tournaments"
  | "tournament-details"
  | "team-database"
  | "player-database"
  | "map-veto"
  | "live-match"
  | "series-result"
  | "create-team"
  | "academy-detail"
  | "training-individual"
  | "pre-game";

export interface Team {
  id: string;
  name: string;
  tag: string;
  crest: string;
  color: string;
  money: number;
  fans: number;
  reputation: number;
  roster: string[];
  starters: string[];
  wins: number;
  losses: number;
  points: number;
  roundDiff: number;
  synergy: number;
  region?: string;
  rankingGlobal?: number;
  mapPoolStrengths?: Record<string, number>;
}

export interface Player {
  id: string;
  teamId: string | null;
  name: string;
  nick: string;
  age: number;
  nationality: string;
  position: PlayerPosition;
  overall: number;
  potential: number;
  weeklySalary: number;
  marketValue: number;
  contractWeeks: number;
  morale: number;
  form: number;
  mechanics: number;
  gameSense: number;
  communication: number;
  consistency: number;
  aggression: number;
  composure: number;
  status: PlayerStatus;
}

export interface TeamSeed {
  id: string;
  name: string;
  tag: string;
  crest: string;
  color: string;
  money: number;
  fans: number;
  reputation: number;
  synergy: number;
  region?: string;
  rankingGlobal?: number;
}

export interface PlayerSeed {
  id: string;
  teamId: string | null;
  name: string;
  nick: string;
  age: number;
  nationality: string;
  position: PlayerPosition;
  tier: number;
  status: PlayerStatus;
}

export interface InitialData {
  teams: TeamSeed[];
  players: PlayerSeed[];
}

export interface Fixture {
  id: string;
  round: number;
  homeTeamId: string;
  awayTeamId: string;
  played: boolean;
  result?: MatchResult;
}

export interface TeamMatchStats {
  focus: number;
  objectivePressure: number;
  clutchRounds: number;
  errors: number;
}

export interface MatchResult {
  id: string;
  fixtureId: string;
  round: number;
  homeTeamId: string;
  awayTeamId: string;
  winnerTeamId: string;
  score: {
    home: number;
    away: number;
  };
  mvpPlayerId: string;
  stats: {
    home: TeamMatchStats;
    away: TeamMatchStats;
  };
  log: string[];
  moneyDeltaByTeam: Record<string, number>;
  fansDeltaByTeam: Record<string, number>;
  moraleDeltaByTeam: Record<string, number>;
  playedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  body: string;
  tone: "info" | "positive" | "negative" | "market";
  createdAt: string;
}

export interface CareerState {
  id: string;
  managerName: string;
  difficulty: Difficulty;
  userTeamId: string;
  teams: Team[];
  players: Player[];
  schedule: Fixture[];
  currentRound: number;
  matchSeed: number;
  strategy: Strategy;
  news: NewsItem[];
  lastMatch: MatchResult | null;
  createdAt: string;
  updatedAt: string;
}

export interface SaveSlotMeta {
  slot: 1 | 2 | 3;
  occupied: boolean;
  managerName?: string;
  teamName?: string;
  round?: number;
  savedAt?: string;
}
