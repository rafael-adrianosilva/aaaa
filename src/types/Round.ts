import type { Side } from "./Veto";

export type BuyType = "Pistol" | "Eco" | "Force" | "HalfBuy" | "FullBuy" | "AntiEco";

export type WinCondition = "Elimination" | "BombPlanted" | "BombDefused" | "Time";

export type KillFeedEvent = {
  killerId: string;
  victimId: string;
  weapon: string;
  isHeadshot: boolean;
  isWallbang: boolean;
  time: string; // e.g., "1:24"
};

export type PlayerMatchStats = {
  playerId: string;
  kills: number;
  deaths: number;
  assists: number;
  adr: number;
  rating: number;
  hsp: number; // Headshot percentage
};

export type RoundResult = {
  roundNumber: number;
  winnerTeamId: string;
  loserTeamId: string;
  winCondition: WinCondition;
  mvpPlayerId: string;
  keyEvent: string;
  killFeed: KillFeedEvent[];
  economyTeamA: number;
  economyTeamB: number;
  buyTypeTeamA: BuyType;
  buyTypeTeamB: BuyType;
  scoreA: number;
  scoreB: number;
  sideTeamA: Side;
  sideTeamB: Side;
};

