import type { AcademyLevel } from "./Academy";

export type CSRegion =
  | "Europe"
  | "Americas"
  | "Brazil"
  | "North America"
  | "South America"
  | "Asia"
  | "Oceania"
  | "CIS"
  | "Middle East"
  | "Global";

export type RealTeam = {
  id: string;
  name: string;
  country: string;
  region: CSRegion;
  rankingGlobal?: number;
  rankingRegional?: number;
  valvePoints?: number;
  hltvRank?: number;
  reputation: number;
  fanbase: number;
  budget: number;
  monthlyCosts: number;
  players: string[];
  substitutes: string[];
  academyPlayers: string[];
  coach?: string;
  activeSponsors: string[];
  tournamentHistory: string[];
  trophies: string[];
  currentForm: number;
  morale: number;
  mapPoolStrengths: Record<string, number>;
  isCustom: boolean;
  academyLevel: AcademyLevel;
  academyMonthlyCost: number;
};
