import {
  MAJOR_PRIZE_POOL,
  TOURNAMENT_PRIZE_PRESETS,
  createPrizeDistribution,
} from "./prizeDistributions";
import { defaultMapPoolId } from "./maps.cs";
import type {
  QualificationMethod,
  Tournament,
  TournamentFormat,
  TournamentStage,
  TournamentStatus,
  TournamentTier,
} from "../types/Tournament";
import type { CSRegion } from "../types/RealTeam";
import type { SeriesFormat } from "../types/Veto";

type TournamentSpec = {
  id: string;
  realName: string;
  displayName?: string;
  organizer: string;
  tier: TournamentTier;
  region: CSRegion;
  country?: string;
  city?: string;
  prizePool: number;
  prestige: number;
  teamsCount: number;
  format: TournamentFormat;
  qualificationMethod: QualificationMethod;
  startDate: string;
  endDate: string;
  status?: TournamentStatus;
  sponsors?: string[];
};

export const realTournaments: Tournament[] = [
  tournament({ id: "major-championship", realName: "Major Championship", organizer: "Valve", tier: "Major", region: "Global", prizePool: MAJOR_PRIZE_POOL, prestige: 100, teamsCount: 32, format: "SwissPlusPlayoffs", qualificationMethod: "VRS", startDate: "2026-06-01", endDate: "2026-06-21", city: "Global Finals", sponsors: ["vertice-hardware", "nexus-bank"] }),
  tournament({ id: "iem-katowice", realName: "IEM Katowice", organizer: "ESL", tier: "S", region: "Europe", country: "Poland", city: "Katowice", prizePool: TOURNAMENT_PRIZE_PRESETS.S_TIER_HIGH, prestige: 96, teamsCount: 24, format: "GroupsPlusPlayoffs", qualificationMethod: "Mixed", startDate: "2026-01-28", endDate: "2026-02-09" }),
  tournament({ id: "iem-cologne", realName: "IEM Cologne", organizer: "ESL", tier: "S", region: "Europe", country: "Germany", city: "Cologne", prizePool: TOURNAMENT_PRIZE_PRESETS.S_TIER_HIGH, prestige: 96, teamsCount: 24, format: "GroupsPlusPlayoffs", qualificationMethod: "Mixed", startDate: "2026-07-21", endDate: "2026-08-02" }),
  tournament({ id: "iem-rio", realName: "IEM Rio", organizer: "ESL", tier: "S", region: "Brazil", country: "Brazil", city: "Rio de Janeiro", prizePool: TOURNAMENT_PRIZE_PRESETS.S_TIER_LOW, prestige: 88, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "Mixed", startDate: "2026-10-05", endDate: "2026-10-12" }),
  tournament({ id: "iem-dallas", realName: "IEM Dallas", organizer: "ESL", tier: "S", region: "North America", country: "United States", city: "Dallas", prizePool: TOURNAMENT_PRIZE_PRESETS.S_TIER_LOW, prestige: 86, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "Mixed", startDate: "2026-05-18", endDate: "2026-05-24" }),
  tournament({ id: "esl-pro-league", realName: "ESL Pro League", organizer: "ESL", tier: "S", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.S_TIER_MEDIUM, prestige: 90, teamsCount: 32, format: "GroupsPlusPlayoffs", qualificationMethod: "Ranking", startDate: "2026-09-01", endDate: "2026-09-21" }),
  tournament({ id: "esl-challenger", realName: "ESL Challenger", organizer: "ESL", tier: "A", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.A_TIER_MEDIUM, prestige: 74, teamsCount: 8, format: "GSLGroups", qualificationMethod: "Mixed", startDate: "2026-04-10", endDate: "2026-04-13" }),
  tournament({ id: "blast-premier", realName: "BLAST Premier", organizer: "BLAST", tier: "S", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.S_TIER_MEDIUM, prestige: 90, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "Invite", startDate: "2026-02-18", endDate: "2026-03-01" }),
  tournament({ id: "blast-open", realName: "BLAST Open", organizer: "BLAST", tier: "S", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.S_TIER_LOW, prestige: 86, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "Mixed", startDate: "2026-03-18", endDate: "2026-03-30" }),
  tournament({ id: "blast-bounty", realName: "BLAST Bounty", organizer: "BLAST", tier: "A", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.A_TIER_HIGH, prestige: 78, teamsCount: 16, format: "SingleElimination", qualificationMethod: "Invite", startDate: "2026-01-13", endDate: "2026-01-26" }),
  tournament({ id: "blast-rivals", realName: "BLAST Rivals", organizer: "BLAST", tier: "S", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.S_TIER_LOW, prestige: 84, teamsCount: 8, format: "GroupsPlusPlayoffs", qualificationMethod: "Ranking", startDate: "2026-04-28", endDate: "2026-05-04" }),
  tournament({ id: "blast-world-final", realName: "BLAST World Final", organizer: "BLAST", tier: "S", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.S_TIER_HIGH, prestige: 94, teamsCount: 8, format: "SingleElimination", qualificationMethod: "Ranking", startDate: "2026-12-09", endDate: "2026-12-14" }),
  tournament({ id: "pgl-major", realName: "PGL Major", organizer: "PGL", tier: "Major", region: "Global", prizePool: MAJOR_PRIZE_POOL, prestige: 100, teamsCount: 32, format: "SwissPlusPlayoffs", qualificationMethod: "VRS", startDate: "2026-11-23", endDate: "2026-12-13" }),
  tournament({ id: "pgl-masters", realName: "PGL Masters", organizer: "PGL", tier: "S", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.S_TIER_LOW, prestige: 84, teamsCount: 16, format: "SwissPlusPlayoffs", qualificationMethod: "Ranking", startDate: "2026-08-18", endDate: "2026-08-30" }),
  tournament({ id: "starladder", realName: "StarLadder", organizer: "StarLadder", tier: "A", region: "Europe", prizePool: TOURNAMENT_PRIZE_PRESETS.A_TIER_HIGH, prestige: 78, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "Mixed", startDate: "2026-06-25", endDate: "2026-07-05" }),
  tournament({ id: "cct-global-finals", realName: "CCT Global Finals", organizer: "CCT", tier: "A", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.A_TIER_HIGH, prestige: 76, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "Ranking", startDate: "2026-05-01", endDate: "2026-05-11" }),
  tournament({ id: "cct-europe", realName: "CCT Europe", organizer: "CCT", tier: "B", region: "Europe", prizePool: TOURNAMENT_PRIZE_PRESETS.B_TIER_MEDIUM, prestige: 60, teamsCount: 16, format: "SwissPlusPlayoffs", qualificationMethod: "RegionalRanking", startDate: "2026-03-04", endDate: "2026-03-16" }),
  tournament({ id: "cct-south-america", realName: "CCT South America", organizer: "CCT", tier: "B", region: "South America", prizePool: TOURNAMENT_PRIZE_PRESETS.B_TIER_MEDIUM, prestige: 58, teamsCount: 16, format: "SwissPlusPlayoffs", qualificationMethod: "RegionalRanking", startDate: "2026-03-11", endDate: "2026-03-23" }),
  tournament({ id: "cct-north-america", realName: "CCT North America", organizer: "CCT", tier: "B", region: "North America", prizePool: TOURNAMENT_PRIZE_PRESETS.B_TIER_MEDIUM, prestige: 58, teamsCount: 16, format: "SwissPlusPlayoffs", qualificationMethod: "RegionalRanking", startDate: "2026-03-18", endDate: "2026-03-30" }),
  tournament({ id: "cct-oceania", realName: "CCT Oceania", organizer: "CCT", tier: "B", region: "Oceania", prizePool: TOURNAMENT_PRIZE_PRESETS.B_TIER_LOW, prestige: 52, teamsCount: 12, format: "GroupsPlusPlayoffs", qualificationMethod: "RegionalRanking", startDate: "2026-04-01", endDate: "2026-04-10" }),
  tournament({ id: "cct-asia", realName: "CCT Asia", organizer: "CCT", tier: "B", region: "Asia", prizePool: TOURNAMENT_PRIZE_PRESETS.B_TIER_MEDIUM, prestige: 56, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "RegionalRanking", startDate: "2026-04-04", endDate: "2026-04-15" }),
  tournament({ id: "yalla-compass", realName: "YaLLa Compass", organizer: "YaLLa Esports", tier: "A", region: "Middle East", prizePool: TOURNAMENT_PRIZE_PRESETS.A_TIER_MEDIUM, prestige: 72, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "Mixed", startDate: "2026-06-10", endDate: "2026-06-16" }),
  tournament({ id: "thunderpick-world-championship", realName: "Thunderpick World Championship", organizer: "Thunderpick", tier: "A", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.A_TIER_HIGH, prestige: 76, teamsCount: 16, format: "SingleElimination", qualificationMethod: "Mixed", startDate: "2026-10-20", endDate: "2026-11-03" }),
  tournament({ id: "betboom-dacha", realName: "BetBoom Dacha", organizer: "BetBoom", tier: "A", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.A_TIER_HIGH, prestige: 78, teamsCount: 12, format: "GroupsPlusPlayoffs", qualificationMethod: "Invite", startDate: "2026-08-05", endDate: "2026-08-12" }),
  tournament({ id: "fissure-playground", realName: "FISSURE Playground", organizer: "FISSURE", tier: "A", region: "Europe", prizePool: TOURNAMENT_PRIZE_PRESETS.A_TIER_MEDIUM, prestige: 70, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "Mixed", startDate: "2026-07-09", endDate: "2026-07-18" }),
  tournament({ id: "cs-asia-championship", realName: "CS Asia Championship", organizer: "Perfect World", tier: "A", region: "Asia", country: "China", city: "Shanghai", prizePool: TOURNAMENT_PRIZE_PRESETS.A_TIER_HIGH, prestige: 78, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "Mixed", startDate: "2026-11-04", endDate: "2026-11-10" }),
  tournament({ id: "skyesports-championship", realName: "Skyesports Championship", organizer: "Skyesports", tier: "B", region: "Asia", prizePool: TOURNAMENT_PRIZE_PRESETS.B_TIER_HIGH, prestige: 62, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "Mixed", startDate: "2026-09-10", endDate: "2026-09-18" }),
  tournament({ id: "esl-challenger-league-europe", realName: "ESL Challenger League Europe", organizer: "ESL", tier: "B", region: "Europe", prizePool: TOURNAMENT_PRIZE_PRESETS.B_TIER_HIGH, prestige: 64, teamsCount: 24, format: "GroupsPlusPlayoffs", qualificationMethod: "RegionalRanking", startDate: "2026-02-03", endDate: "2026-04-20" }),
  tournament({ id: "esl-challenger-league-north-america", realName: "ESL Challenger League North America", organizer: "ESL", tier: "B", region: "North America", prizePool: TOURNAMENT_PRIZE_PRESETS.B_TIER_MEDIUM, prestige: 58, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "RegionalRanking", startDate: "2026-02-04", endDate: "2026-04-21" }),
  tournament({ id: "esl-challenger-league-south-america", realName: "ESL Challenger League South America", organizer: "ESL", tier: "B", region: "South America", prizePool: TOURNAMENT_PRIZE_PRESETS.B_TIER_MEDIUM, prestige: 58, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "RegionalRanking", startDate: "2026-02-04", endDate: "2026-04-21" }),
  tournament({ id: "esl-challenger-league-asia", realName: "ESL Challenger League Asia", organizer: "ESL", tier: "B", region: "Asia", prizePool: TOURNAMENT_PRIZE_PRESETS.B_TIER_LOW, prestige: 54, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "RegionalRanking", startDate: "2026-02-05", endDate: "2026-04-22" }),
  tournament({ id: "esl-challenger-league-oceania", realName: "ESL Challenger League Oceania", organizer: "ESL", tier: "B", region: "Oceania", prizePool: TOURNAMENT_PRIZE_PRESETS.B_TIER_LOW, prestige: 52, teamsCount: 12, format: "GroupsPlusPlayoffs", qualificationMethod: "RegionalRanking", startDate: "2026-02-05", endDate: "2026-04-22" }),
  tournament({ id: "european-pro-league", realName: "European Pro League", organizer: "EPL", tier: "C", region: "Europe", prizePool: TOURNAMENT_PRIZE_PRESETS.C_TIER_HIGH, prestige: 48, teamsCount: 16, format: "SwissPlusPlayoffs", qualificationMethod: "Mixed", startDate: "2026-01-15", endDate: "2026-01-28" }),
  tournament({ id: "united21", realName: "United21", organizer: "United21", tier: "C", region: "Europe", prizePool: TOURNAMENT_PRIZE_PRESETS.C_TIER_MEDIUM, prestige: 44, teamsCount: 16, format: "SwissPlusPlayoffs", qualificationMethod: "Mixed", startDate: "2026-02-12", endDate: "2026-02-25" }),
  tournament({ id: "regional-major-ranking", realName: "Regional Major Ranking", organizer: "Valve", tier: "Qualifier", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.CLOSED_QUALIFIER, prestige: 82, teamsCount: 32, format: "Swiss", qualificationMethod: "RegionalRanking", startDate: "2026-05-02", endDate: "2026-05-12" }),
  tournament({ id: "open-qualifier-europe", realName: "Open Qualifier Europe", organizer: "ESL", tier: "Qualifier", region: "Europe", prizePool: TOURNAMENT_PRIZE_PRESETS.OPEN_QUALIFIER, prestige: 40, teamsCount: 64, format: "OpenQualifier", qualificationMethod: "OpenQualifier", startDate: "2026-04-01", endDate: "2026-04-03" }),
  tournament({ id: "open-qualifier-americas", realName: "Open Qualifier Americas", organizer: "ESL", tier: "Qualifier", region: "Americas", prizePool: TOURNAMENT_PRIZE_PRESETS.OPEN_QUALIFIER, prestige: 40, teamsCount: 64, format: "OpenQualifier", qualificationMethod: "OpenQualifier", startDate: "2026-04-01", endDate: "2026-04-03" }),
  tournament({ id: "open-qualifier-south-america", realName: "Open Qualifier South America", organizer: "ESL", tier: "Qualifier", region: "South America", prizePool: TOURNAMENT_PRIZE_PRESETS.OPEN_QUALIFIER, prestige: 38, teamsCount: 64, format: "OpenQualifier", qualificationMethod: "OpenQualifier", startDate: "2026-04-04", endDate: "2026-04-06" }),
  tournament({ id: "open-qualifier-asia", realName: "Open Qualifier Asia", organizer: "ESL", tier: "Qualifier", region: "Asia", prizePool: TOURNAMENT_PRIZE_PRESETS.OPEN_QUALIFIER, prestige: 38, teamsCount: 64, format: "OpenQualifier", qualificationMethod: "OpenQualifier", startDate: "2026-04-04", endDate: "2026-04-06" }),
  tournament({ id: "closed-qualifier-europe", realName: "Closed Qualifier Europe", organizer: "ESL", tier: "Qualifier", region: "Europe", prizePool: TOURNAMENT_PRIZE_PRESETS.CLOSED_QUALIFIER, prestige: 55, teamsCount: 16, format: "ClosedQualifier", qualificationMethod: "ClosedQualifier", startDate: "2026-04-08", endDate: "2026-04-13" }),
  tournament({ id: "closed-qualifier-americas", realName: "Closed Qualifier Americas", organizer: "ESL", tier: "Qualifier", region: "Americas", prizePool: TOURNAMENT_PRIZE_PRESETS.CLOSED_QUALIFIER, prestige: 55, teamsCount: 16, format: "ClosedQualifier", qualificationMethod: "ClosedQualifier", startDate: "2026-04-08", endDate: "2026-04-13" }),
  tournament({ id: "closed-qualifier-south-america", realName: "Closed Qualifier South America", organizer: "ESL", tier: "Qualifier", region: "South America", prizePool: TOURNAMENT_PRIZE_PRESETS.CLOSED_QUALIFIER, prestige: 52, teamsCount: 16, format: "ClosedQualifier", qualificationMethod: "ClosedQualifier", startDate: "2026-04-14", endDate: "2026-04-18" }),
  tournament({ id: "closed-qualifier-asia", realName: "Closed Qualifier Asia", organizer: "ESL", tier: "Qualifier", region: "Asia", prizePool: TOURNAMENT_PRIZE_PRESETS.CLOSED_QUALIFIER, prestige: 52, teamsCount: 16, format: "ClosedQualifier", qualificationMethod: "ClosedQualifier", startDate: "2026-04-14", endDate: "2026-04-18" }),
  tournament({ id: "liga-brasileira", realName: "Liga Brasileira", organizer: "CBCS", tier: "Regional", region: "Brazil", country: "Brazil", prizePool: TOURNAMENT_PRIZE_PRESETS.REGIONAL_MEDIUM, prestige: 58, teamsCount: 16, format: "RoundRobin", qualificationMethod: "RegionalRanking", startDate: "2026-05-06", endDate: "2026-06-08" }),
  tournament({ id: "campeonato-brasileiro", realName: "Campeonato Brasileiro", organizer: "CBCS", tier: "Regional", region: "Brazil", country: "Brazil", prizePool: TOURNAMENT_PRIZE_PRESETS.REGIONAL_BIG, prestige: 64, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "RegionalRanking", startDate: "2026-08-12", endDate: "2026-08-24" }),
  tournament({ id: "copa-brasil", realName: "Copa Brasil", organizer: "CBCS", tier: "Regional", region: "Brazil", country: "Brazil", prizePool: TOURNAMENT_PRIZE_PRESETS.REGIONAL_SMALL, prestige: 52, teamsCount: 16, format: "SingleElimination", qualificationMethod: "OpenQualifier", startDate: "2026-11-02", endDate: "2026-11-08" }),
  tournament({ id: "south-america-regional-league", realName: "South America Regional League", organizer: "Regional Circuit", tier: "Regional", region: "South America", prizePool: TOURNAMENT_PRIZE_PRESETS.REGIONAL_MEDIUM, prestige: 55, teamsCount: 16, format: "RoundRobin", qualificationMethod: "RegionalRanking", startDate: "2026-06-18", endDate: "2026-07-12" }),
  tournament({ id: "north-america-regional-league", realName: "North America Regional League", organizer: "Regional Circuit", tier: "Regional", region: "North America", prizePool: TOURNAMENT_PRIZE_PRESETS.REGIONAL_MEDIUM, prestige: 55, teamsCount: 16, format: "RoundRobin", qualificationMethod: "RegionalRanking", startDate: "2026-06-18", endDate: "2026-07-12" }),
  tournament({ id: "europe-regional-league", realName: "Europe Regional League", organizer: "Regional Circuit", tier: "Regional", region: "Europe", prizePool: TOURNAMENT_PRIZE_PRESETS.REGIONAL_BIG, prestige: 62, teamsCount: 24, format: "RoundRobin", qualificationMethod: "RegionalRanking", startDate: "2026-06-18", endDate: "2026-07-12" }),
  tournament({ id: "asia-regional-league", realName: "Asia Regional League", organizer: "Regional Circuit", tier: "Regional", region: "Asia", prizePool: TOURNAMENT_PRIZE_PRESETS.REGIONAL_MEDIUM, prestige: 55, teamsCount: 16, format: "RoundRobin", qualificationMethod: "RegionalRanking", startDate: "2026-06-18", endDate: "2026-07-12" }),
  tournament({ id: "oceania-regional-league", realName: "Oceania Regional League", organizer: "Regional Circuit", tier: "Regional", region: "Oceania", prizePool: TOURNAMENT_PRIZE_PRESETS.REGIONAL_SMALL, prestige: 48, teamsCount: 12, format: "RoundRobin", qualificationMethod: "RegionalRanking", startDate: "2026-06-18", endDate: "2026-07-12" }),
  tournament({ id: "academy-league", realName: "Academy League", organizer: "Youth Circuit", tier: "Academy", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.C_TIER_LOW, prestige: 38, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "Invite", startDate: "2026-09-24", endDate: "2026-10-04" }),
  tournament({ id: "female-league", realName: "Female League", organizer: "Women's Circuit", tier: "Female", region: "Global", prizePool: TOURNAMENT_PRIZE_PRESETS.REGIONAL_MEDIUM, prestige: 54, teamsCount: 16, format: "GroupsPlusPlayoffs", qualificationMethod: "RegionalRanking", startDate: "2026-10-15", endDate: "2026-10-26" }),
];

function tournament(spec: TournamentSpec): Tournament {
  return {
    id: spec.id,
    realName: spec.realName,
    displayName: spec.displayName ?? spec.realName,
    organizer: spec.organizer,
    tier: spec.tier,
    region: spec.region,
    country: spec.country,
    city: spec.city,
    prizePool: spec.tier === "Major" ? MAJOR_PRIZE_POOL : spec.prizePool,
    currency: "USD",
    prestige: spec.prestige,
    teamsCount: spec.teamsCount,
    format: spec.format,
    qualificationMethod: spec.qualificationMethod,
    startDate: spec.startDate,
    endDate: spec.endDate,
    mapPoolId: defaultMapPoolId,
    sponsors: spec.sponsors ?? ["pulse-stream", "training-lab"],
    stages: stagesFor(spec),
    prizeDistribution: createPrizeDistribution(
      spec.tier === "Major" ? MAJOR_PRIZE_POOL : spec.prizePool,
      spec.tier,
      spec.teamsCount,
    ),
    status: spec.status ?? statusFor(spec.startDate, spec.endDate),
  };
}

function stagesFor(spec: TournamentSpec): TournamentStage[] {
  const groupSeries: SeriesFormat = spec.format === "OpenQualifier" ? "MD1" : "MD1";
  const playoffSeries: SeriesFormat =
    spec.tier === "Major" || spec.tier === "S" ? "MD3" : "MD3";

  if (spec.format === "SingleElimination") {
    return [
      { id: `${spec.id}-playoffs`, name: "Playoffs", format: "SingleElimination", seriesFormat: playoffSeries, teamsCount: spec.teamsCount, advances: 1 },
      { id: `${spec.id}-grand-final`, name: "Grand Final", format: "SingleElimination", seriesFormat: "MD5", teamsCount: 2, advances: 1 },
    ];
  }

  if (spec.format === "OpenQualifier" || spec.format === "ClosedQualifier") {
    return [
      { id: `${spec.id}-qualifier`, name: "Qualifier", format: spec.format, seriesFormat: "MD1", teamsCount: spec.teamsCount, advances: Math.min(8, spec.teamsCount / 4) },
      { id: `${spec.id}-decider`, name: "Qualification Match", format: "SingleElimination", seriesFormat: "MD3", teamsCount: 8, advances: 4 },
    ];
  }

  return [
    { id: `${spec.id}-groups`, name: "Group Stage", format: spec.format, seriesFormat: groupSeries, teamsCount: spec.teamsCount, advances: Math.min(8, Math.ceil(spec.teamsCount / 2)) },
    { id: `${spec.id}-playoffs`, name: "Playoffs", format: "SingleElimination", seriesFormat: playoffSeries, teamsCount: Math.min(8, spec.teamsCount), advances: 2 },
    { id: `${spec.id}-grand-final`, name: "Grand Final", format: "SingleElimination", seriesFormat: "MD5", teamsCount: 2, advances: 1 },
  ];
}

function statusFor(start: string, end: string): TournamentStatus {
  const now = new Date("2026-04-28").getTime();
  const startAt = new Date(start).getTime();
  const endAt = new Date(end).getTime();

  if (now < startAt) {
    return "Upcoming";
  }

  if (now > endAt) {
    return "Finished";
  }

  return "Ongoing";
}
