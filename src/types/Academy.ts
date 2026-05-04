export type AcademyRarity = "Common" | "Uncommon" | "Rare" | "Wonderkid" | "Generational";

export type DevelopmentStatus =
  | "Bruto"
  | "Promissor"
  | "ProntoTier3"
  | "ProntoTier2"
  | "ProntoTier1"
  | "PotencialEstrela";

export type AcademyLevel = 1 | 2 | 3 | 4 | 5;

export type AcademyConfig = {
  level: AcademyLevel;
  maxPlayers: number;
  monthlyCost: number;
  upgradeCost: number;
  rarityBonus: number;
  label: string;
};

export const ACADEMY_CONFIGS: Record<AcademyLevel, AcademyConfig> = {
  1: { level: 1, maxPlayers: 5, monthlyCost: 8000, upgradeCost: 0, rarityBonus: 0, label: "Básica" },
  2: { level: 2, maxPlayers: 7, monthlyCost: 15000, upgradeCost: 80000, rarityBonus: 2, label: "Intermediária" },
  3: { level: 3, maxPlayers: 10, monthlyCost: 28000, upgradeCost: 200000, rarityBonus: 5, label: "Avançada" },
  4: { level: 4, maxPlayers: 12, monthlyCost: 45000, upgradeCost: 450000, rarityBonus: 8, label: "Elite" },
  5: { level: 5, maxPlayers: 15, monthlyCost: 75000, upgradeCost: 900000, rarityBonus: 12, label: "Mundial" },
};

export const RARITY_CHANCES: Record<AcademyRarity, number> = {
  Common: 55,
  Uncommon: 28,
  Rare: 12,
  Wonderkid: 4,
  Generational: 1,
};

export const RARITY_COLORS: Record<AcademyRarity, string> = {
  Common: "#9ca3af",
  Uncommon: "#22c55e",
  Rare: "#3b82f6",
  Wonderkid: "#a855f7",
  Generational: "#f59e0b",
};

export type AcademyState = {
  teamId: string;
  level: AcademyLevel;
  playerIds: string[];
  lastTalentGeneration: string;
  canGenerateTalents: boolean;
};
