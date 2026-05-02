import { createPrizeDistribution } from "../../data/prizeDistributions";
import type { PrizeDistribution } from "../../types/PrizeDistribution";
import type { RealTeam } from "../../types/RealTeam";
import type { Tournament, TournamentTier } from "../../types/Tournament";
import type { RankingEntry } from "../../types/Ranking";

export type PrizeApplication = {
  teamId: string;
  tournamentId: string;
  placement: string;
  moneyDelta: number;
  reputationDelta: number;
  fanbaseDelta: number;
  rankingPointsDelta: number;
};

export function generatePrizeDistribution(
  prizePool: number,
  tier: TournamentTier,
  teamsCount: number,
): PrizeDistribution[] {
  return createPrizeDistribution(prizePool, tier, teamsCount);
}

export function applyTournamentPrize(
  teamId: string,
  tournamentId: string,
  placement: string,
  context?: {
    teams: RealTeam[];
    tournaments: Tournament[];
    rankings: RankingEntry[];
  },
):
  | {
      teams: RealTeam[];
      rankings: RankingEntry[];
      application: PrizeApplication;
    }
  | undefined {
  if (!context) {
    return undefined;
  }

  const tournament = context.tournaments.find((item) => item.id === tournamentId);
  const prize = tournament?.prizeDistribution.find(
    (item) => item.placement === placement,
  );

  if (!tournament || !prize) {
    return undefined;
  }

  const application: PrizeApplication = {
    teamId,
    tournamentId,
    placement,
    moneyDelta: prize.amount,
    reputationDelta: prize.reputationBonus,
    fanbaseDelta: prize.fanbaseBonus,
    rankingPointsDelta: prize.rankingPoints,
  };

  return {
    teams: context.teams.map((team) =>
      team.id === teamId
        ? {
            ...team,
            budget: team.budget + prize.amount,
            reputation: Math.min(100, team.reputation + prize.reputationBonus),
            fanbase: team.fanbase + prize.fanbaseBonus,
            valvePoints: (team.valvePoints ?? 0) + prize.rankingPoints,
            tournamentHistory: [
              `${tournament.displayName}: ${placement}`,
              ...team.tournamentHistory,
            ].slice(0, 24),
            trophies:
              placement === "1st"
                ? [tournament.displayName, ...team.trophies]
                : team.trophies,
          }
        : team,
    ),
    rankings: context.rankings.map((entry) =>
      entry.teamId === teamId
        ? {
            ...entry,
            points: entry.points + prize.rankingPoints,
            trend: "up",
          }
        : entry,
    ),
    application,
  };
}

export function getChampionPrize(tournament: Tournament) {
  return tournament.prizeDistribution.find((item) => item.placement === "1st");
}
