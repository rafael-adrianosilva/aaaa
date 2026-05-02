import type { BuyType } from "../../types/Round";

export function getBuyType(economy: number, roundNumber: number): BuyType {
  if (roundNumber === 1 || roundNumber === 13) {
    return "Pistol";
  }

  if (economy < 1900) {
    return "Eco";
  }

  if (economy < 3300) {
    return "Force";
  }

  if (economy < 4300) {
    return "HalfBuy";
  }

  return "FullBuy";
}

export function buyPower(buyType: BuyType) {
  return {
    Pistol: 0,
    Eco: -13,
    Force: -5,
    HalfBuy: -2,
    FullBuy: 6,
    AntiEco: 8,
  }[buyType];
}

export function normalizeAntiEco(teamBuy: BuyType, enemyBuy: BuyType): BuyType {
  return teamBuy === "FullBuy" && enemyBuy === "Eco" ? "AntiEco" : teamBuy;
}

export function updateEconomy(params: {
  winner: "A" | "B";
  economyTeamA: number;
  economyTeamB: number;
  bombPlanted: boolean;
}) {
  const winReward = 3250;
  const lossReward = 1900;
  const plantBonus = params.bombPlanted ? 800 : 0;

  if (params.winner === "A") {
    return {
      economyTeamA: Math.min(16000, params.economyTeamA + winReward + plantBonus),
      economyTeamB: Math.min(16000, params.economyTeamB + lossReward),
    };
  }

  return {
    economyTeamA: Math.min(16000, params.economyTeamA + lossReward),
    economyTeamB: Math.min(16000, params.economyTeamB + winReward + plantBonus),
  };
}
