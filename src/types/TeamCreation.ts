import type { CSRegion } from "./RealTeam";

export type TeamTier =
  | "amateur"
  | "regional"
  | "national"
  | "tier3"
  | "tier2"
  | "tier1"
  | "elite";

export type TeamCreationParams = {
  name: string;
  tag: string;
  country: string;
  region: CSRegion;
  primaryColor: string;
  secondaryColor: string;
  managerName: string;
  tier: TeamTier;
};

export type TierConfig = {
  tier: TeamTier;
  label: string;
  description: string;
  rankingGlobalRange: [number, number];
  rankingRegionalRange: [number, number];
  budgetRange: [number, number];
  reputationRange: [number, number];
  fanbaseRange: [number, number];
  playerOverallRange: [number, number];
  playerPotentialBonus: [number, number];
  salaryMultiplier: number;
  marketValueMultiplier: number;
  academyQuality: number;
  sponsorChance: number;
  mapStrengthBase: number;
};

export const TIER_CONFIGS: Record<TeamTier, TierConfig> = {
  amateur: {
    tier: "amateur",
    label: "Amador",
    description: "Time recém-fundado, sem experiência competitiva",
    rankingGlobalRange: [85, 100],
    rankingRegionalRange: [15, 25],
    budgetRange: [50000, 150000],
    reputationRange: [10, 25],
    fanbaseRange: [1000, 10000],
    playerOverallRange: [55, 65],
    playerPotentialBonus: [5, 15],
    salaryMultiplier: 0.3,
    marketValueMultiplier: 0.2,
    academyQuality: 1,
    sponsorChance: 5,
    mapStrengthBase: 45,
  },
  regional: {
    tier: "regional",
    label: "Regional",
    description: "Time regional com presença local",
    rankingGlobalRange: [70, 85],
    rankingRegionalRange: [10, 18],
    budgetRange: [200000, 500000],
    reputationRange: [25, 40],
    fanbaseRange: [15000, 60000],
    playerOverallRange: [60, 70],
    playerPotentialBonus: [5, 18],
    salaryMultiplier: 0.5,
    marketValueMultiplier: 0.35,
    academyQuality: 1,
    sponsorChance: 12,
    mapStrengthBase: 52,
  },
  national: {
    tier: "national",
    label: "Nacional",
    description: "Time competitivo no cenário nacional",
    rankingGlobalRange: [55, 70],
    rankingRegionalRange: [6, 12],
    budgetRange: [600000, 1200000],
    reputationRange: [40, 58],
    fanbaseRange: [80000, 250000],
    playerOverallRange: [65, 74],
    playerPotentialBonus: [5, 20],
    salaryMultiplier: 0.7,
    marketValueMultiplier: 0.5,
    academyQuality: 2,
    sponsorChance: 25,
    mapStrengthBase: 58,
  },
  tier3: {
    tier: "tier3",
    label: "Tier 3",
    description: "Time profissional em ascensão internacional",
    rankingGlobalRange: [40, 55],
    rankingRegionalRange: [4, 8],
    budgetRange: [1200000, 2500000],
    reputationRange: [55, 70],
    fanbaseRange: [200000, 500000],
    playerOverallRange: [70, 78],
    playerPotentialBonus: [5, 18],
    salaryMultiplier: 0.85,
    marketValueMultiplier: 0.7,
    academyQuality: 2,
    sponsorChance: 40,
    mapStrengthBase: 64,
  },
  tier2: {
    tier: "tier2",
    label: "Tier 2",
    description: "Time com presença frequente em torneios internacionais",
    rankingGlobalRange: [20, 40],
    rankingRegionalRange: [2, 6],
    budgetRange: [2500000, 5000000],
    reputationRange: [68, 82],
    fanbaseRange: [400000, 1000000],
    playerOverallRange: [75, 83],
    playerPotentialBonus: [4, 15],
    salaryMultiplier: 1.0,
    marketValueMultiplier: 1.0,
    academyQuality: 3,
    sponsorChance: 60,
    mapStrengthBase: 72,
  },
  tier1: {
    tier: "tier1",
    label: "Tier 1",
    description: "Time de elite, disputando títulos regularmente",
    rankingGlobalRange: [8, 20],
    rankingRegionalRange: [1, 4],
    budgetRange: [5000000, 9000000],
    reputationRange: [80, 92],
    fanbaseRange: [800000, 2000000],
    playerOverallRange: [80, 88],
    playerPotentialBonus: [3, 12],
    salaryMultiplier: 1.3,
    marketValueMultiplier: 1.5,
    academyQuality: 4,
    sponsorChance: 80,
    mapStrengthBase: 80,
  },
  elite: {
    tier: "elite",
    label: "Elite",
    description: "Os melhores do mundo, favoritos em qualquer torneio",
    rankingGlobalRange: [1, 8],
    rankingRegionalRange: [1, 2],
    budgetRange: [9000000, 15000000],
    reputationRange: [90, 99],
    fanbaseRange: [1800000, 3500000],
    playerOverallRange: [85, 94],
    playerPotentialBonus: [2, 8],
    salaryMultiplier: 1.8,
    marketValueMultiplier: 2.2,
    academyQuality: 5,
    sponsorChance: 95,
    mapStrengthBase: 88,
  },
};

export const COUNTRIES_BY_REGION: Record<string, string[]> = {
  Brazil: ["Brazil"],
  "South America": ["Argentina", "Chile", "Uruguay", "Colombia", "Peru"],
  "North America": ["United States", "Canada", "Mexico"],
  Europe: ["France", "Germany", "Denmark", "Sweden", "Poland", "Finland", "United Kingdom", "Spain", "Portugal", "Norway", "Netherlands", "Belgium", "Czech Republic", "Serbia", "Bosnia and Herzegovina", "Croatia", "Bulgaria", "Romania", "Hungary", "Slovakia", "Italy", "Austria", "Switzerland", "Greece", "Israel", "Latvia", "Lithuania", "Estonia", "Macedonia", "Montenegro", "Turkey"],
  CIS: ["Russia", "Ukraine", "Kazakhstan", "Belarus", "Armenia", "Georgia", "Uzbekistan"],
  Asia: ["China", "South Korea", "Japan", "Mongolia", "India", "Indonesia", "Philippines", "Thailand", "Vietnam", "Malaysia", "Singapore", "Taiwan"],
  Oceania: ["Australia", "New Zealand"],
  "Middle East": ["Saudi Arabia", "Jordan", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain"],
};
