import type { RankingEntry } from "../../types/Ranking";
import type { RealTeam } from "../../types/RealTeam";
import type { Tournament } from "../../types/Tournament";

export function canEnterTournament(
  team: RealTeam,
  tournament: Tournament,
  rankings: RankingEntry[],
) {
  const ranking = rankings.find((entry) => entry.teamId === team.id);

  if (tournament.status === "Finished") {
    return false;
  }

  if (tournament.region === "Brazil" && team.region !== "Brazil") {
    return false;
  }

  if (tournament.region === "Europe" && team.region !== "Europe") {
    return false;
  }

  if (tournament.region === "Asia" && team.region !== "Asia") {
    return false;
  }

  if (tournament.region === "Oceania" && team.region !== "Oceania") {
    return false;
  }

  if (tournament.qualificationMethod === "OpenQualifier") {
    return true;
  }

  if (tournament.qualificationMethod === "Invite") {
    return team.reputation >= tournament.prestige - 12;
  }

  if (tournament.qualificationMethod === "Ranking" || tournament.qualificationMethod === "VRS") {
    return (ranking?.globalRank ?? 999) <= Math.max(32, tournament.teamsCount * 2);
  }

  if (tournament.qualificationMethod === "RegionalRanking") {
    return (ranking?.regionalRank ?? 999) <= Math.max(16, tournament.teamsCount);
  }

  return team.reputation >= Math.max(35, tournament.prestige - 24);
}

export function getEligibleTournaments(
  team: RealTeam,
  tournaments: Tournament[],
  rankings: RankingEntry[],
) {
  return tournaments.filter((tournament) =>
    canEnterTournament(team, tournament, rankings),
  );
}

export function qualifyTeamForTournament(team: RealTeam, tournament: Tournament): RealTeam {
  return {
    ...team,
    tournamentHistory: [
      `Qualified: ${tournament.displayName}`,
      ...team.tournamentHistory,
    ].slice(0, 24),
    reputation: Math.min(100, team.reputation + Math.max(1, Math.round(tournament.prestige / 30))),
  };
}
