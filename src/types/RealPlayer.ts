import type { AcademyRarity, DevelopmentStatus } from "./Academy";
import type { TrainingType } from "./Training";

export type CSRole =
  | "IGL"
  | "AWPer"
  | "Rifler"
  | "Entry"
  | "Support"
  | "Lurker"
  | "Anchor"
  | "Coach";

export type RealPlayerStatus =
  | "Starter"
  | "Substitute"
  | "Academy"
  | "FreeAgent"
  | "Benched"
  | "TransferListed"
  | "Retired";

export type RealPlayer = {
  id: string;
  nickname: string;
  realName?: string;
  nationality: string;
  age?: number;
  teamId?: string;
  role: CSRole;
  rating?: number;
  overall: number;
  potential: number;
  salary: number;
  marketValue: number;
  morale: number;
  form: number;
  mechanics: number;
  aim: number;
  reflex: number;
  gameSense: number;
  utility: number;
  clutch: number;
  communication: number;
  consistency: number;
  mental: number;
  leadership: number;
  experience: number;
  preferredMaps: string[];
  weakMaps: string[];
  status: RealPlayerStatus;
  isGenerated: boolean;
  rarity?: AcademyRarity;
  developmentStatus?: DevelopmentStatus;
  trainingPlan?: TrainingType;
  fatigue: number;
};
