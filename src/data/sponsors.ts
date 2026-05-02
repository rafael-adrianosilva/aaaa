import type { Sponsor, SponsorCategory, SponsorTier } from "../types/Sponsor";

type SponsorSpec = {
  id: string;
  name: string;
  category: SponsorCategory;
  tier: SponsorTier;
  baseMonthlyPayment: number;
  signingBonus: number;
  reputationRequirement: number;
  fanbaseRequirement: number;
  contractMonths: number;
};

export const sponsors: Sponsor[] = [
  sponsor({ id: "vertice-hardware", name: "Vertice Hardware", category: "Hardware", tier: "Premium", baseMonthlyPayment: 95000, signingBonus: 220000, reputationRequirement: 86, fanbaseRequirement: 900000, contractMonths: 12 }),
  sponsor({ id: "nova-peripherals", name: "Nova Peripherals", category: "Peripherals", tier: "International", baseMonthlyPayment: 62000, signingBonus: 120000, reputationRequirement: 76, fanbaseRequirement: 450000, contractMonths: 10 }),
  sponsor({ id: "frame-monitor", name: "Frame Monitor", category: "Monitor", tier: "National", baseMonthlyPayment: 38000, signingBonus: 65000, reputationRequirement: 62, fanbaseRequirement: 180000, contractMonths: 8 }),
  sponsor({ id: "rush-energy", name: "Rush Energy", category: "EnergyDrink", tier: "International", baseMonthlyPayment: 54000, signingBonus: 95000, reputationRequirement: 70, fanbaseRequirement: 300000, contractMonths: 10 }),
  sponsor({ id: "arena-odds", name: "Arena Odds", category: "Betting", tier: "Premium", baseMonthlyPayment: 120000, signingBonus: 260000, reputationRequirement: 84, fanbaseRequirement: 850000, contractMonths: 12 }),
  sponsor({ id: "nexus-bank", name: "Nexus Bank", category: "Bank", tier: "National", baseMonthlyPayment: 44000, signingBonus: 80000, reputationRequirement: 66, fanbaseRequirement: 240000, contractMonths: 10 }),
  sponsor({ id: "fiberlink", name: "FiberLink", category: "Telecom", tier: "Regional", baseMonthlyPayment: 24000, signingBonus: 38000, reputationRequirement: 48, fanbaseRequirement: 80000, contractMonths: 6 }),
  sponsor({ id: "pulse-stream", name: "Pulse Stream", category: "Streaming", tier: "International", baseMonthlyPayment: 58000, signingBonus: 100000, reputationRequirement: 72, fanbaseRequirement: 340000, contractMonths: 10 }),
  sponsor({ id: "training-lab", name: "Training Lab", category: "TrainingPlatform", tier: "Regional", baseMonthlyPayment: 28000, signingBonus: 45000, reputationRequirement: 54, fanbaseRequirement: 90000, contractMonths: 6 }),
  sponsor({ id: "market-base", name: "Market Base", category: "Marketplace", tier: "National", baseMonthlyPayment: 36000, signingBonus: 58000, reputationRequirement: 58, fanbaseRequirement: 160000, contractMonths: 8 }),
  sponsor({ id: "lan-cafe", name: "LAN Cafe", category: "LocalBusiness", tier: "Local", baseMonthlyPayment: 9000, signingBonus: 12000, reputationRequirement: 20, fanbaseRequirement: 10000, contractMonths: 4 }),
];

function sponsor(spec: SponsorSpec): Sponsor {
  const multiplier = tierMultiplier(spec.tier);

  return {
    ...spec,
    winBonus: Math.round(spec.baseMonthlyPayment * 0.18),
    tournamentQualificationBonus: Math.round(spec.baseMonthlyPayment * 0.45),
    playoffBonus: Math.round(spec.baseMonthlyPayment * 0.75),
    titleBonus: Math.round(spec.baseMonthlyPayment * 1.6),
    majorQualificationBonus: Math.round(spec.baseMonthlyPayment * 2.2),
    objectives: [
      {
        id: `${spec.id}-wins`,
        description: `Vencer ${Math.max(3, Math.round(4 * multiplier))} series no contrato`,
        type: "WinMatches",
        target: Math.max(3, Math.round(4 * multiplier)),
        reward: Math.round(spec.baseMonthlyPayment * 0.6),
      },
      {
        id: `${spec.id}-ranking`,
        description: "Subir ou manter ranking competitivo",
        type: "ReachRanking",
        target: spec.tier === "Premium" ? 10 : spec.tier === "International" ? 20 : 40,
        reward: Math.round(spec.baseMonthlyPayment * 0.7),
      },
    ],
    penalties: [
      {
        id: `${spec.id}-negative-balance`,
        description: "Penalidade por fechar mes com saldo negativo",
        type: "NegativeBalance",
        penaltyAmount: Math.round(spec.baseMonthlyPayment * 0.5),
      },
      {
        id: `${spec.id}-ranking-drop`,
        description: "Penalidade por queda brusca no ranking",
        type: "DropRanking",
        penaltyAmount: Math.round(spec.baseMonthlyPayment * 0.35),
      },
    ],
  };
}

function tierMultiplier(tier: SponsorTier) {
  return {
    Local: 0.8,
    Regional: 1,
    National: 1.2,
    International: 1.5,
    Premium: 2,
  }[tier];
}
