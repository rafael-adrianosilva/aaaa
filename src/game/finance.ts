import type { CareerState, Team } from "../types/game";
import { getWeeklySalary } from "./selectors";

export const victoryPrize = 32000;
export const participationPrize = 7000;
export const trainingCost = 18000;

export function calculateWeeklyRevenue(team: Team) {
  return Math.round(team.fans * 0.05 + team.reputation * 900);
}

export function calculateWeeklyPayroll(career: CareerState, teamId: string) {
  return getWeeklySalary(career, teamId);
}

export function calculateWeeklyBalance(career: CareerState, team: Team) {
  return calculateWeeklyRevenue(team) - calculateWeeklyPayroll(career, team.id);
}
