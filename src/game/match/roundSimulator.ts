import type { CSMap } from "../../types/CSMap";
import type { RealPlayer } from "../../types/RealPlayer";
import type { RealTeam } from "../../types/RealTeam";
import type { BuyType, RoundResult } from "../../types/Round";
import type { Side } from "../../types/Veto";
import { createSeededRandom, pickWeighted } from "../random";
import {
  buyPower,
  getBuyType,
  normalizeAntiEco,
  updateEconomy,
} from "./economySimulator";
import { chooseWinCondition, createRoundEvent } from "./matchEvents";

export type RoundSimulationInput = {
  roundNumber: number;
  teamA: RealTeam;
  teamB: RealTeam;
  players: RealPlayer[];
  map: CSMap;
  sideTeamA: Side;
  sideTeamB: Side;
  economyTeamA: number;
  economyTeamB: number;
  scoreA: number;
  scoreB: number;
  momentum: number;
  seed: string;
};

export function simulateRound(input: RoundSimulationInput): RoundResult {
  const random = createSeededRandom(input.seed);
  const rawBuyA = getBuyType(input.economyTeamA, input.roundNumber);
  const rawBuyB = getBuyType(input.economyTeamB, input.roundNumber);
  const buyTypeTeamA = normalizeAntiEco(rawBuyA, rawBuyB);
  const buyTypeTeamB = normalizeAntiEco(rawBuyB, rawBuyA);
  const powerA = roundPower(input.teamA, input.players, input.map, input.sideTeamA, buyTypeTeamA) + input.momentum;
  const powerB = roundPower(input.teamB, input.players, input.map, input.sideTeamB, buyTypeTeamB) - input.momentum;
  const chanceA = clamp(0.5 + (powerA - powerB) / 80, 0.16, 0.84);
  const aWins = random() < chanceA;
  const winnerTeamId = aWins ? input.teamA.id : input.teamB.id;
  const loserTeamId = aWins ? input.teamB.id : input.teamA.id;
  const winnerSide = aWins ? input.sideTeamA : input.sideTeamB;
  const winCondition = chooseWinCondition(winnerSide, random);
  const winnerPlayers = input.players.filter(
    (player) => player.teamId === winnerTeamId && player.status === "Starter",
  );
  const mvp = pickWeighted(
    winnerPlayers,
    (player) =>
      player.aim * 0.35 +
      player.clutch * 0.28 +
      player.form * 0.22 +
      player.experience * 0.15,
    random,
  );
  const economy = updateEconomy({
    winner: aWins ? "A" : "B",
    economyTeamA: input.economyTeamA,
    economyTeamB: input.economyTeamB,
    bombPlanted: winCondition === "BombPlanted" || random() > 0.68,
  });

  return {
    roundNumber: input.roundNumber,
    winnerTeamId,
    loserTeamId,
    winCondition,
    mvpPlayerId: mvp?.id ?? winnerPlayers[0]?.id ?? "",
    keyEvent: createRoundEvent(winCondition, mvp ?? undefined, random),
    economyTeamA: economy.economyTeamA,
    economyTeamB: economy.economyTeamB,
    buyTypeTeamA,
    buyTypeTeamB,
    scoreA: input.scoreA + (aWins ? 1 : 0),
    scoreB: input.scoreB + (aWins ? 0 : 1),
    sideTeamA: input.sideTeamA,
    sideTeamB: input.sideTeamB,
  };
}

export function skipRound(input: RoundSimulationInput) {
  return simulateRound(input);
}

function roundPower(
  team: RealTeam,
  players: RealPlayer[],
  map: CSMap,
  side: Side,
  buyType: BuyType,
) {
  const starters = players.filter(
    (player) => player.teamId === team.id && player.status === "Starter",
  );
  const avg = average(
    starters.map(
      (player) =>
        player.overall * 0.22 +
        player.aim * 0.16 +
        player.reflex * 0.1 +
        player.gameSense * 0.15 +
        player.utility * 0.12 +
        player.clutch * 0.12 +
        player.mental * 0.13,
    ),
  );
  const igl = starters.find((player) => player.role === "IGL");
  const awper = starters.find((player) => player.role === "AWPer");
  const sideBias = side === "CT" ? map.ctBias - 50 : map.tBias - 50;
  const mapStrength = team.mapPoolStrengths[map.id] ?? 60;

  return (
    avg * 0.54 +
    mapStrength * 0.18 +
    team.morale * 0.08 +
    team.currentForm * 0.08 +
    (igl?.leadership ?? 55) * 0.05 +
    (awper?.aim ?? 55) * 0.04 +
    buyPower(buyType) +
    sideBias * 0.45
  );
}

function average(values: number[]) {
  if (!values.length) {
    return 52;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
