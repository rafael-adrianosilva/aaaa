import type { CSRegion } from "./RealTeam";
import type { PrizeDistribution } from "./PrizeDistribution";
import type { SeriesFormat } from "./Veto";
import type { SeriesResult } from "./Series";

export type TournamentTier =
  | "Major"
  | "S"
  | "A"
  | "B"
  | "C"
  | "Regional"
  | "Qualifier"
  | "Academy"
  | "Female";

export type TournamentFormat =
  | "SingleElimination"
  | "DoubleElimination"
  | "Swiss"
  | "Groups"
  | "GSLGroups"
  | "RoundRobin"
  | "SwissPlusPlayoffs"
  | "GroupsPlusPlayoffs"
  | "OpenQualifier"
  | "ClosedQualifier";

export type TournamentStatus = "Upcoming" | "Ongoing" | "Finished";

export type TournamentMatchStatus = "Pending" | "Ongoing" | "Finished";

export type QualificationMethod =
  | "Invite"
  | "Ranking"
  | "VRS"
  | "OpenQualifier"
  | "ClosedQualifier"
  | "RegionalRanking"
  | "Mixed";

export type TournamentStage = {
  id: string;
  name: string;
  format: TournamentFormat;
  seriesFormat: "MD1" | "MD3" | "MD5";
  teamsCount: number;
  advances?: number;
};

export type TournamentRunMatch = {
  id: string;
  tournamentId: string;
  stageId: string;
  stageName: string;
  roundLabel: string;
  seriesFormat: SeriesFormat;
  teamAId: string;
  teamBId: string;
  status: TournamentMatchStatus;
  winnerTeamId?: string;
  loserTeamId?: string;
  result?: SeriesResult;
};

export type TournamentRunStage = {
  id: string;
  name: string;
  seriesFormat: SeriesFormat;
  order: number;
  matches: TournamentRunMatch[];
};

export type TournamentRun = {
  id: string;
  tournamentId: string;
  participantTeamIds: string[];
  stages: TournamentRunStage[];
  currentStageIndex: number;
  currentMatchId?: string;
  status: TournamentStatus;
  championTeamId?: string;
  createdAt: string;
  updatedAt: string;
};

export type Tournament = {
  id: string;
  realName: string;
  displayName: string;
  organizer: string;
  tier: TournamentTier;
  region: CSRegion;
  country?: string;
  city?: string;
  prizePool: number;
  currency: "USD";
  prestige: number;
  teamsCount: number;
  format: TournamentFormat;
  qualificationMethod: QualificationMethod;
  startDate: string;
  endDate: string;
  mapPoolId: string;
  sponsors: string[];
  stages: TournamentStage[];
  prizeDistribution: PrizeDistribution[];
  status: TournamentStatus;
};
