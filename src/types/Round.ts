import type { Side } from "./Veto";

export type WinCondition = "Elimination" | "BombPlanted" | "BombDefused" | "Time";

export type BuyType =
  | "Pistol"
  | "Eco"
  | "Force"
  | "HalfBuy"
  | "FullBuy"
  | "AntiEco";

export type RoundResult = {
  roundNumber: number;
  winnerTeamId: string;
  loserTeamId: string;
  winCondition: WinCondition;
  mvpPlayerId: string;
  keyEvent: string;
  economyTeamA: number;
  economyTeamB: number;
  buyTypeTeamA: BuyType;
  buyTypeTeamB: BuyType;
  scoreA: number;
  scoreB: number;
  sideTeamA: Side;
  sideTeamB: Side;
};
