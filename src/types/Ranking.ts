import type { CSRegion } from "./RealTeam";

export type RankingEntry = {
  teamId: string;
  region: CSRegion;
  globalRank: number;
  regionalRank: number;
  points: number;
  trend: "up" | "down" | "stable";
};

export type CalendarEvent = {
  id: string;
  tournamentId: string;
  name: string;
  startDate: string;
  endDate: string;
  region: CSRegion;
  status: "Upcoming" | "Ongoing" | "Finished";
};
