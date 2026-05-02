import type { PrizeDistribution } from "../types/PrizeDistribution";
import type { TournamentTier } from "../types/Tournament";

export const MAJOR_PRIZE_POOL = 4_000_000;

export const TOURNAMENT_PRIZE_PRESETS = {
  MAJOR: MAJOR_PRIZE_POOL,
  S_TIER_HIGH: 1_000_000,
  S_TIER_MEDIUM: 750_000,
  S_TIER_LOW: 500_000,
  A_TIER_HIGH: 300_000,
  A_TIER_MEDIUM: 150_000,
  A_TIER_LOW: 100_000,
  B_TIER_HIGH: 75_000,
  B_TIER_MEDIUM: 50_000,
  B_TIER_LOW: 25_000,
  C_TIER_HIGH: 15_000,
  C_TIER_MEDIUM: 10_000,
  C_TIER_LOW: 5_000,
  REGIONAL_BIG: 100_000,
  REGIONAL_MEDIUM: 50_000,
  REGIONAL_SMALL: 20_000,
  OPEN_QUALIFIER: 0,
  CLOSED_QUALIFIER: 10_000,
} as const;

export function createPrizeDistribution(
  prizePool: number,
  tier: TournamentTier,
  teamsCount: number,
): PrizeDistribution[] {
  if (prizePool <= 0) {
    return [
      placement("1st", 0, tier, 1),
      placement("2nd", 0, tier, 2),
      placement("3rd-4th", 0, tier, 4),
    ];
  }

  const schema =
    teamsCount >= 24
      ? [
          ["1st", 0.4],
          ["2nd", 0.2],
          ["3rd-4th", 0.1],
          ["5th-8th", 0.05],
          ["9th-16th", 0.0125],
        ]
      : teamsCount >= 16
        ? [
            ["1st", 0.45],
            ["2nd", 0.22],
            ["3rd-4th", 0.11],
            ["5th-8th", 0.0275],
          ]
        : [
            ["1st", 0.5],
            ["2nd", 0.25],
            ["3rd-4th", 0.1],
            ["5th-8th", 0.025],
          ];

  return schema.map(([place, share], index) =>
    placement(String(place), Math.round(prizePool * Number(share)), tier, index + 1),
  );
}

function placement(
  placementName: string,
  amount: number,
  tier: TournamentTier,
  index: number,
): PrizeDistribution {
  const tierMultiplier: Record<TournamentTier, number> = {
    Major: 4,
    S: 3,
    A: 2,
    B: 1.4,
    C: 1,
    Regional: 1.4,
    Qualifier: 1,
    Academy: 0.8,
    Female: 1,
  };
  const multiplier = tierMultiplier[tier];
  const winnerBoost = index === 1 ? 1.4 : 1;

  return {
    placement: placementName,
    amount,
    reputationBonus: Math.round((12 / index) * multiplier * winnerBoost),
    fanbaseBonus: Math.round((6000 / index) * multiplier * winnerBoost),
    rankingPoints: Math.round((450 / index) * multiplier * winnerBoost),
  };
}
