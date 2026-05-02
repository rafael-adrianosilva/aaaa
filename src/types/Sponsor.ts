export type SponsorTier =
  | "Local"
  | "Regional"
  | "National"
  | "International"
  | "Premium";

export type SponsorCategory =
  | "Hardware"
  | "Peripherals"
  | "Monitor"
  | "EnergyDrink"
  | "Betting"
  | "Bank"
  | "Telecom"
  | "Streaming"
  | "TrainingPlatform"
  | "Marketplace"
  | "LocalBusiness";

export type SponsorObjective = {
  id: string;
  description: string;
  type:
    | "WinMatches"
    | "ReachPlayoffs"
    | "WinTournament"
    | "QualifyMajor"
    | "SignPlayer"
    | "KeepPositiveBalance"
    | "ReachRanking";
  target: number;
  reward: number;
};

export type SponsorPenalty = {
  id: string;
  description: string;
  type:
    | "MissPlayoffs"
    | "LoseMatches"
    | "NegativeBalance"
    | "FailMajorQualification"
    | "DropRanking";
  penaltyAmount: number;
};

export type Sponsor = {
  id: string;
  name: string;
  category: SponsorCategory;
  tier: SponsorTier;
  baseMonthlyPayment: number;
  signingBonus: number;
  winBonus: number;
  tournamentQualificationBonus: number;
  playoffBonus: number;
  titleBonus: number;
  majorQualificationBonus: number;
  reputationRequirement: number;
  fanbaseRequirement: number;
  contractMonths: number;
  objectives: SponsorObjective[];
  penalties: SponsorPenalty[];
};

export type ActiveSponsorContract = {
  sponsorId: string;
  teamId: string;
  monthsRemaining: number;
  signedAt: string;
  objectivesProgress: Record<string, number>;
};
