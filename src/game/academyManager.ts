import type { AcademyLevel, AcademyState } from "../types/Academy";
import { ACADEMY_CONFIGS } from "../types/Academy";
import type { RealPlayer } from "../types/RealPlayer";
import type { RealTeam } from "../types/RealTeam";
import { generateAcademyPlayer } from "./playerGenerator";

export function createAcademyState(teamId: string, level: AcademyLevel = 1): AcademyState {
  return {
    teamId,
    level,
    playerIds: [],
    lastTalentGeneration: new Date().toISOString(),
    canGenerateTalents: true,
  };
}

export function initializeAcademyPlayers(params: {
  teamId: string;
  region: string;
  level: AcademyLevel;
  count?: number;
  seed: string;
}): RealPlayer[] {
  const config = ACADEMY_CONFIGS[params.level];
  const count = Math.min(params.count ?? 5, config.maxPlayers);
  const players: RealPlayer[] = [];

  for (let i = 0; i < count; i++) {
    players.push(
      generateAcademyPlayer({
        teamId: params.teamId,
        region: params.region,
        rarityBonus: config.rarityBonus,
        seed: `${params.seed}-academy-init-${i}`,
      })
    );
  }

  return players;
}

export function generateNewTalents(params: {
  academy: AcademyState;
  team: RealTeam;
  existingPlayers: RealPlayer[];
  seed: string;
}): { players: RealPlayer[]; academy: AcademyState } {
  const config = ACADEMY_CONFIGS[params.academy.level];
  const currentCount = params.existingPlayers.filter(
    (p) => p.teamId === params.team.id && p.status === "Academy"
  ).length;
  const slotsAvailable = config.maxPlayers - currentCount;

  if (slotsAvailable <= 0) {
    return { players: [], academy: params.academy };
  }

  const newCount = Math.min(3, slotsAvailable);
  const players: RealPlayer[] = [];

  for (let i = 0; i < newCount; i++) {
    players.push(
      generateAcademyPlayer({
        teamId: params.team.id,
        region: params.team.region,
        rarityBonus: config.rarityBonus,
        seed: `${params.seed}-talent-${Date.now()}-${i}`,
      })
    );
  }

  return {
    players,
    academy: {
      ...params.academy,
      playerIds: [...params.academy.playerIds, ...players.map((p) => p.id)],
      lastTalentGeneration: new Date().toISOString(),
      canGenerateTalents: false,
    },
  };
}

export function promoteAcademyPlayer(params: {
  playerId: string;
  players: RealPlayer[];
  team: RealTeam;
  academy: AcademyState;
}): { players: RealPlayer[]; team: RealTeam; academy: AcademyState } | null {
  const player = params.players.find((p) => p.id === params.playerId);
  if (!player || player.status !== "Academy" || player.teamId !== params.team.id) {
    return null;
  }

  const rosterCount = params.players.filter(
    (p) => p.teamId === params.team.id && (p.status === "Starter" || p.status === "Substitute")
  ).length;

  const newStatus = rosterCount < 5 ? "Starter" : "Substitute";

  const updatedPlayers = params.players.map((p) =>
    p.id === params.playerId
      ? { ...p, status: newStatus as typeof p.status, developmentStatus: undefined, rarity: undefined }
      : p
  );

  const updatedTeam: RealTeam = {
    ...params.team,
    players: newStatus === "Starter"
      ? [...params.team.players, params.playerId]
      : params.team.players,
    substitutes: newStatus === "Substitute"
      ? [...params.team.substitutes, params.playerId]
      : params.team.substitutes,
    academyPlayers: params.team.academyPlayers.filter((id) => id !== params.playerId),
  };

  const updatedAcademy: AcademyState = {
    ...params.academy,
    playerIds: params.academy.playerIds.filter((id) => id !== params.playerId),
  };

  return { players: updatedPlayers, team: updatedTeam, academy: updatedAcademy };
}

export function dismissAcademyPlayer(params: {
  playerId: string;
  players: RealPlayer[];
  academy: AcademyState;
}): { players: RealPlayer[]; academy: AcademyState } | null {
  const player = params.players.find((p) => p.id === params.playerId);
  if (!player || player.status !== "Academy") {
    return null;
  }

  return {
    players: params.players.filter((p) => p.id !== params.playerId),
    academy: {
      ...params.academy,
      playerIds: params.academy.playerIds.filter((id) => id !== params.playerId),
    },
  };
}

export function upgradeAcademy(params: {
  team: RealTeam;
  academy: AcademyState;
}): { team: RealTeam; academy: AcademyState } | null {
  const currentLevel = params.academy.level;
  if (currentLevel >= 5) return null;

  const nextLevel = (currentLevel + 1) as AcademyLevel;
  const nextConfig = ACADEMY_CONFIGS[nextLevel];

  if (params.team.budget < nextConfig.upgradeCost) return null;

  return {
    team: {
      ...params.team,
      budget: params.team.budget - nextConfig.upgradeCost,
      academyLevel: nextLevel,
      academyMonthlyCost: nextConfig.monthlyCost,
    },
    academy: {
      ...params.academy,
      level: nextLevel,
    },
  };
}

export function getAcademyPlayersForTeam(
  players: RealPlayer[],
  teamId: string
): RealPlayer[] {
  return players.filter((p) => p.teamId === teamId && p.status === "Academy");
}
