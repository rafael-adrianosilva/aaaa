import type { RealPlayer } from "../types/RealPlayer";
import type { TrainingType } from "../types/Training";
import { TRAINING_DEFINITIONS } from "../types/Training";

type TrainResult = {
  player: RealPlayer;
  gains: Record<string, number>;
  overallChanged: boolean;
  fatigueGained: number;
};

export function trainPlayer(
  player: RealPlayer,
  trainingType: TrainingType
): TrainResult {
  const definition = TRAINING_DEFINITIONS.find((d) => d.id === trainingType);
  if (!definition) {
    return { player, gains: {}, overallChanged: false, fatigueGained: 0 };
  }

  const ageFactor = getAgeFactor(player.age ?? 22);
  const potentialFactor = getPotentialFactor(player.overall, player.potential);
  const moraleFactor = player.morale >= 70 ? 1.0 : player.morale >= 50 ? 0.75 : 0.5;
  const fatiguePenalty = player.fatigue >= 80 ? 0.3 : player.fatigue >= 60 ? 0.6 : player.fatigue >= 40 ? 0.85 : 1.0;
  const roleBonus = definition.compatibleRoles.includes(player.role) ? 1.3 : 0.7;
  const academyBonus = player.status === "Academy" ? 1.4 : 1.0;

  const baseGain = 0.8;
  const totalMultiplier = ageFactor * potentialFactor * moraleFactor * fatiguePenalty * roleBonus * academyBonus;

  const gains: Record<string, number> = {};
  let updatedPlayer = { ...player };

  for (const attr of definition.attributes) {
    const gain = Math.max(0, Math.round((baseGain + Math.random() * 0.6) * totalMultiplier * 10) / 10);
    gains[attr] = gain;

    const currentVal = getPlayerAttribute(player, attr);
    if (currentVal !== null && currentVal < player.potential) {
      const newVal = Math.min(99, Math.min(player.potential, currentVal + Math.ceil(gain)));
      updatedPlayer = setPlayerAttribute(updatedPlayer, attr, newVal);
    }
  }

  const fatigueGained = Math.round(8 + Math.random() * 7);
  updatedPlayer.fatigue = Math.min(100, updatedPlayer.fatigue + fatigueGained);
  updatedPlayer.trainingPlan = trainingType;

  const newOverall = calculateOverall(updatedPlayer);
  const overallChanged = newOverall !== player.overall;
  updatedPlayer.overall = newOverall;

  return { player: updatedPlayer, gains, overallChanged, fatigueGained };
}

export function restPlayer(player: RealPlayer): RealPlayer {
  return {
    ...player,
    fatigue: Math.max(0, player.fatigue - 15),
    form: Math.min(99, player.form + 2),
    morale: Math.min(99, player.morale + 1),
  };
}

export function getProgressToNextOverall(player: RealPlayer): number {
  const attrs = [
    player.aim, player.reflex, player.mechanics, player.gameSense,
    player.utility, player.clutch, player.communication, player.consistency,
    player.mental, player.leadership,
  ];
  const avg = attrs.reduce((s, v) => s + v, 0) / attrs.length;
  const nextOverall = player.overall + 1;
  if (avg >= nextOverall) return 100;
  const progress = ((avg - player.overall) / 1) * 100;
  return Math.max(0, Math.min(99, Math.round(progress)));
}

function getAgeFactor(age: number): number {
  if (age <= 18) return 1.5;
  if (age <= 20) return 1.3;
  if (age <= 23) return 1.1;
  if (age <= 26) return 1.0;
  if (age <= 29) return 0.7;
  if (age <= 32) return 0.4;
  return 0.2;
}

function getPotentialFactor(overall: number, potential: number): number {
  const gap = potential - overall;
  if (gap >= 15) return 1.5;
  if (gap >= 10) return 1.3;
  if (gap >= 5) return 1.0;
  if (gap >= 2) return 0.6;
  return 0.2;
}

function calculateOverall(player: RealPlayer): number {
  const attrs = [
    player.aim * 0.15,
    player.reflex * 0.10,
    player.mechanics * 0.12,
    player.gameSense * 0.14,
    player.utility * 0.08,
    player.clutch * 0.10,
    player.communication * 0.08,
    player.consistency * 0.10,
    player.mental * 0.08,
    player.leadership * 0.05,
  ];
  return Math.round(attrs.reduce((s, v) => s + v, 0));
}

function getPlayerAttribute(player: RealPlayer, attr: string): number | null {
  const map: Record<string, number> = {
    aim: player.aim,
    reflex: player.reflex,
    mechanics: player.mechanics,
    gameSense: player.gameSense,
    utility: player.utility,
    clutch: player.clutch,
    communication: player.communication,
    consistency: player.consistency,
    mental: player.mental,
    leadership: player.leadership,
  };
  return map[attr] ?? null;
}

function setPlayerAttribute(player: RealPlayer, attr: string, value: number): RealPlayer {
  const p = { ...player };
  switch (attr) {
    case "aim": p.aim = value; break;
    case "reflex": p.reflex = value; break;
    case "mechanics": p.mechanics = value; break;
    case "gameSense": p.gameSense = value; break;
    case "utility": p.utility = value; break;
    case "clutch": p.clutch = value; break;
    case "communication": p.communication = value; break;
    case "consistency": p.consistency = value; break;
    case "mental": p.mental = value; break;
    case "leadership": p.leadership = value; break;
  }
  return p;
}
