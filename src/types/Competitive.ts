import type { AcademyState } from "./Academy";
import type { ActiveSponsorContract, Sponsor } from "./Sponsor";
import type { CalendarEvent, RankingEntry } from "./Ranking";
import type { RealPlayer } from "./RealPlayer";
import type { RealTeam } from "./RealTeam";
import type { LiveSeriesState, SeriesResult } from "./Series";
import type { Tournament } from "./Tournament";
import type { TournamentRun } from "./Tournament";
import type { SeriesVetoResult } from "./Veto";

export type CompetitiveSaveData = {
  teams: RealTeam[];
  players: RealPlayer[];
  tournaments: Tournament[];
  currentTournamentId: string | null;
  currentTournamentRun: TournamentRun | null;
  tournamentRuns: TournamentRun[];
  currentSeries: LiveSeriesState | null;
  currentMatch: LiveSeriesState | null;
  sponsors: Sponsor[];
  activeSponsors: ActiveSponsorContract[];
  rankings: RankingEntry[];
  calendar: CalendarEvent[];
  currentVeto: SeriesVetoResult | null;
  latestSeriesResult: SeriesResult | null;
  selectedTournamentId: string | null;
  academies?: Record<string, AcademyState>;
};

