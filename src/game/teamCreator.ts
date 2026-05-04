import { csMaps } from "../data/maps.cs";
import type { AcademyLevel } from "../types/Academy";
import type { CSRegion, RealTeam } from "../types/RealTeam";
import type { RealPlayer } from "../types/RealPlayer";
import type { TeamCreationParams, TeamTier } from "../types/TeamCreation";
import { TIER_CONFIGS } from "../types/TeamCreation";
import { generateSquad } from "./playerGenerator";
import { createSeededRandom } from "./random";

export function createCustomTeam(params: TeamCreationParams): {
  team: RealTeam;
  players: RealPlayer[];
} {
  const config = TIER_CONFIGS[params.tier];
  const seed = `custom-${params.name}-${Date.now()}`;
  const random = createSeededRandom(seed);

  const rankingGlobal = randRange(config.rankingGlobalRange, random);
  const rankingRegional = randRange(config.rankingRegionalRange, random);
  const budget = randRange(config.budgetRange, random);
  const reputation = randRange(config.reputationRange, random);
  const fanbase = randRange(config.fanbaseRange, random);

  const teamId = slug(params.name);

  const { starters, substitutes, academy } = generateSquad({
    teamId,
    region: params.region,
    overallRange: config.playerOverallRange as [number, number],
    potentialBonus: config.playerPotentialBonus as [number, number],
    seed,
  });

  const allPlayers = [...starters, ...substitutes, ...academy];

  const mapStrengths: Record<string, number> = {};
  for (const map of csMaps) {
    const variation = Math.floor((random() - 0.4) * 12);
    mapStrengths[map.id] = clamp(config.mapStrengthBase + variation, 40, 99);
  }

  const academyLevel = config.academyQuality as AcademyLevel;
  const academyCosts: Record<number, number> = { 1: 8000, 2: 15000, 3: 28000, 4: 45000, 5: 75000 };

  const team: RealTeam = {
    id: teamId,
    name: params.name,
    country: params.country,
    region: params.region as CSRegion,
    rankingGlobal,
    rankingRegional,
    valvePoints: Math.max(0, (100 - rankingGlobal) * 28),
    hltvRank: rankingGlobal,
    reputation,
    fanbase,
    budget,
    monthlyCosts: Math.round(budget * 0.08),
    players: starters.map((p) => p.id),
    substitutes: substitutes.map((p) => p.id),
    academyPlayers: academy.map((p) => p.id),
    coach: `Coach ${params.tag}`,
    activeSponsors: [],
    tournamentHistory: [],
    trophies: [],
    currentForm: clamp(reputation - 10 + Math.floor(random() * 20), 40, 95),
    morale: clamp(reputation - 5 + Math.floor(random() * 15), 45, 95),
    mapPoolStrengths: mapStrengths,
    isCustom: true,
    academyLevel,
    academyMonthlyCost: academyCosts[academyLevel] ?? 8000,
  };

  return { team, players: allPlayers };
}

export function getTeamTierPreview(tier: TeamTier) {
  const config = TIER_CONFIGS[tier];
  return {
    label: config.label,
    description: config.description,
    budgetRange: config.budgetRange,
    rankingRange: config.rankingGlobalRange,
    playerOverallRange: config.playerOverallRange,
    reputationRange: config.reputationRange,
    fanbaseRange: config.fanbaseRange,
  };
}

function randRange(range: [number, number], random: () => number): number {
  return Math.round(range[0] + random() * (range[1] - range[0]));
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}
