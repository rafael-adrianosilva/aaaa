import type { RealPlayer } from "../../types/RealPlayer";
import type { WinCondition } from "../../types/Round";

const eventTemplates: Record<WinCondition, string[]> = {
  Elimination: [
    "{mvp} abriu o bombsite e fechou o round na troca final.",
    "{mvp} venceu o duelo de impacto e quebrou a defesa.",
    "{mvp} encontrou dois abates decisivos no meio do mapa.",
  ],
  BombPlanted: [
    "{mvp} garantiu o plant e segurou o retake.",
    "{mvp} criou espaco para o plant e converteu o pos-plant.",
    "{mvp} sobreviveu no clutch depois da bomba armada.",
  ],
  BombDefused: [
    "{mvp} comandou o retake e defusou no limite.",
    "{mvp} limpou o bombsite para a defesa recuperar o controle.",
    "{mvp} encaixou utilitaria perfeita no retake.",
  ],
  Time: [
    "{mvp} travou o avanco e venceu pelo relogio.",
    "{mvp} segurou a execucao ate o tempo acabar.",
    "{mvp} leu o fake e impediu o plant.",
  ],
};

export function createRoundEvent(
  condition: WinCondition,
  mvp: RealPlayer | undefined,
  random: () => number,
) {
  const templates = eventTemplates[condition];
  const template = templates[Math.floor(random() * templates.length)];
  return template.replace("{mvp}", mvp?.nickname ?? "MVP");
}

export function chooseWinCondition(winnerSide: "CT" | "T", random: () => number): WinCondition {
  const roll = random();

  if (winnerSide === "CT") {
    if (roll > 0.72) {
      return "BombDefused";
    }

    if (roll > 0.58) {
      return "Time";
    }

    return "Elimination";
  }

  if (roll > 0.68) {
    return "BombPlanted";
  }

  return "Elimination";
}

const WEAPONS_BY_BUY: Record<import("../../types/Round").BuyType, string[]> = {
  Pistol: ["Glock-18", "USP-S", "P250", "Dual Berettas"],
  Eco: ["Glock-18", "USP-S", "P250", "Desert Eagle"],
  Force: ["Desert Eagle", "MP9", "MAC-10", "Galil AR", "FAMAS", "Scout"],
  HalfBuy: ["MP9", "MAC-10", "Galil AR", "FAMAS", "AK-47", "M4A4"],
  FullBuy: ["AK-47", "M4A4", "M4A1-S", "AWP", "Galil AR", "FAMAS"],
  AntiEco: ["MP9", "MAC-10", "Bizon", "AK-47", "M4A4"],
};

export function generateKillFeed(params: {
  winnerPlayers: RealPlayer[];
  loserPlayers: RealPlayer[];
  random: () => number;
  buyTypeWinner: import("../../types/Round").BuyType;
  buyTypeLoser: import("../../types/Round").BuyType;
}): import("../../types/Round").KillFeedEvent[] {
  const kills: import("../../types/Round").KillFeedEvent[] = [];
  const numKills = 5 + Math.floor(params.random() * 5); // 5 to 9 kills total
  
  const winnerWeapons = WEAPONS_BY_BUY[params.buyTypeWinner];
  const loserWeapons = WEAPONS_BY_BUY[params.buyTypeLoser];

  const shuffledWinners = [...params.winnerPlayers].sort(() => params.random() - 0.5);
  const shuffledLosers = [...params.loserPlayers].sort(() => params.random() - 0.5);

  for (let i = 0; i < numKills; i++) {
    const isWinnerKill = params.random() > 0.3 || i < 5; // Favor winners
    const killer = isWinnerKill 
      ? shuffledWinners[i % params.winnerPlayers.length]
      : shuffledLosers[i % params.loserPlayers.length];
    const victim = isWinnerKill
      ? shuffledLosers[i % params.loserPlayers.length]
      : shuffledWinners[i % params.winnerPlayers.length];
    
    const weapons = isWinnerKill ? winnerWeapons : loserWeapons;
    
    kills.push({
      killerId: killer.id,
      victimId: victim.id,
      weapon: weapons[Math.floor(params.random() * weapons.length)],
      isHeadshot: params.random() > 0.6,
      isWallbang: params.random() > 0.92,
      time: `${Math.floor(params.random() * 1)}:${Math.floor(params.random() * 59).toString().padStart(2, "0")}`,
    });
  }

  return kills.sort((a, b) => b.time.localeCompare(a.time));
}


