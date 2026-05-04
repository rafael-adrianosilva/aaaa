import { create } from "zustand";
import { csMaps } from "../data/maps.cs";
import { realPlayers } from "../data/players.real";
import { sponsors as sponsorData } from "../data/sponsors";
import { realTeams } from "../data/teams.real";
import { realTournaments } from "../data/tournaments.real";
import { createCareer } from "../game/careerFactory";
import { createCustomTeam as buildCustomTeam } from "../game/teamCreator";
import {
  createAcademyState,
  dismissAcademyPlayer as dismissAcadPlayer,
  generateNewTalents,
  initializeAcademyPlayers,
  promoteAcademyPlayer as promoteAcadPlayer,
  upgradeAcademy as upgradeAcad,
} from "../game/academyManager";
import { trainPlayer } from "../game/trainingManager";
import type { AcademyState } from "../types/Academy";
import type { TeamCreationParams } from "../types/TeamCreation";
import type { TrainingType } from "../types/Training";
import {
  acceptSponsor,
  hireFreeAgent,
  playNextRound,
  runTraining,
  scoutSoloQueue,
  toggleStarter,
} from "../game/operations";
import {
  applySeriesRankingImpact,
  createInitialRankings,
  recalculateRankings,
} from "../game/ranking/rankingManager";
import {
  deleteCareerSlot,
  loadCareerFromSlot,
  loadGamePayloadFromSlot,
  loadSaveSlots,
  saveGamePayloadToSlot,
} from "../game/saveSystem";
import {
  applySponsorBonuses as applySponsorBonusesToTeams,
  processMonthlySponsors as processMonthlySponsorPayments,
  renewSponsorContract,
  signSponsorContract,
  terminateSponsorContract,
} from "../game/sponsors/sponsorManager";
import {
  getDefaultTournamentStage,
  buildTournamentCalendar,
  createTournamentRun,
  getCurrentTournamentMatch,
  getSeriesFormatForTournament,
  markTournamentPlayed,
  recordSeriesResultInRun,
  upsertTournamentRun,
} from "../game/tournaments/tournamentManager";
import { applyTournamentPrize } from "../game/tournaments/prizeManager";
import { runAutoVeto } from "../game/veto/autoVetoAI";
import { applyVetoAction, createEmptyVeto } from "../game/veto/mapVetoManager";
import {
  createLiveSeriesState,
  skipMap as advanceMap,
  skipRound as advanceRound,
  skipSeries as advanceSeries,
} from "../game/match/seriesSimulator";
import type { CompetitiveSaveData } from "../types/Competitive";
import type { CalendarEvent, RankingEntry } from "../types/Ranking";
import type { RealPlayer } from "../types/RealPlayer";
import type { RealTeam } from "../types/RealTeam";
import type { ActiveSponsorContract, Sponsor } from "../types/Sponsor";
import type { LiveSeriesState, SeriesResult } from "../types/Series";
import type { Tournament, TournamentRun } from "../types/Tournament";
import type { SeriesVetoResult, Side } from "../types/Veto";
import type {
  CareerState,
  DashboardView,
  Difficulty,
  GameScreen,
  SaveSlotMeta,
  Strategy,
} from "../types/game";

interface GameStore {
  screen: GameScreen;
  selectedView: DashboardView;
  career: CareerState | null;
  saveSlots: SaveSlotMeta[];
  teams: RealTeam[];
  players: RealPlayer[];
  tournaments: Tournament[];
  currentTournament: Tournament | null;
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
  openCareerSetup: () => void;
  goToMenu: () => void;
  createNewCareer: (params: {
    managerName: string;
    difficulty: Difficulty;
    teamId: string;
  }) => void;
  setView: (view: DashboardView) => void;
  setStrategy: (strategy: Strategy) => void;
  playNextMatch: () => void;
  hirePlayer: (playerId: string) => void;
  togglePlayerStarter: (playerId: string) => void;
  trainTeam: () => void;
  signSponsor: (sponsorId: "regional" | "stream" | "hardware" | string) => void;
  renewSponsor: (sponsorId: string) => void;
  terminateSponsor: (sponsorId: string) => void;
  scoutQueue: () => void;
  selectTournament: (tournamentId: string) => void;
  startVeto: (tournamentId?: string) => void;
  confirmVetoAction: (mapId?: string, side?: Side) => void;
  autoVeto: () => void;
  startSeries: () => void;
  simulateNextRound: () => void;
  toggleAutoPlay: () => void;
  pauseAutoPlay: () => void;
  skipRound: () => void;
  skipMap: () => void;
  skipSeries: () => void;
  finishSeries: () => void;
  applyPrize: (placement?: string) => void;
  processMonthlySponsors: () => void;
  applySponsorBonuses: (
    event?: "Win" | "Title" | "Playoff" | "Qualification" | "MajorQualification",
  ) => void;
  createCustomTeam: (params: TeamCreationParams) => void;
  promoteAcademyPlayer: (playerId: string) => void;
  dismissAcademyPlayer: (playerId: string) => void;
  upgradeAcademy: () => void;
  generateTalents: () => void;
  trainIndividual: (playerId: string, trainingType: TrainingType) => void;
  academies: Record<string, AcademyState>;
  saveGame: (slot: 1 | 2 | 3) => void;
  loadGame: (slot: 1 | 2 | 3) => void;
  deleteSave: (slot: 1 | 2 | 3) => void;
}

const defaultCompetitive = createDefaultCompetitiveData();

export const useGameStore = create<GameStore>((set, get) => ({
  screen: "menu",
  selectedView: "overview",
  career: null,
  saveSlots: loadSaveSlots(),
  ...defaultCompetitive,
  academies: {},

  openCareerSetup: () =>
    set({
      screen: "career-setup",
    }),

  goToMenu: () =>
    set({
      screen: "menu",
      selectedView: "overview",
      career: null,
      saveSlots: loadSaveSlots(),
    }),

  createNewCareer: (params) => {
    const career = createCareer(params);
    const competitive = createDefaultCompetitiveData();

    set({
      ...competitive,
      screen: "game",
      selectedView: "overview",
      career,
    });
  },

  setView: (view) =>
    set({
      selectedView: view,
    }),

  setStrategy: (strategy) =>
    set((state) => ({
      career: state.career
        ? {
            ...state.career,
            strategy,
            updatedAt: new Date().toISOString(),
          }
        : state.career,
    })),

  playNextMatch: () =>
    set((state) => ({
      career: state.career ? playNextRound(state.career) : state.career,
      selectedView: "overview",
    })),

  hirePlayer: (playerId) =>
    set((state) => ({
      career: state.career ? hireFreeAgent(state.career, playerId) : state.career,
    })),

  togglePlayerStarter: (playerId) =>
    set((state) => ({
      career: state.career ? toggleStarter(state.career, playerId) : state.career,
    })),

  trainTeam: () =>
    set((state) => ({
      career: state.career ? runTraining(state.career) : state.career,
    })),

  signSponsor: (sponsorId) =>
    set((state) => {
      const sponsor = state.sponsors.find((item) => item.id === sponsorId);
      const teamId = getCompetitiveTeamId(state);

      if (!sponsor || !teamId) {
        return {
          career:
            state.career && ["regional", "stream", "hardware"].includes(sponsorId)
              ? acceptSponsor(
                  state.career,
                  sponsorId as "regional" | "stream" | "hardware",
                )
              : state.career,
        };
      }

      const result = signSponsorContract({
        sponsors: state.sponsors,
        teams: state.teams,
        activeSponsors: state.activeSponsors,
        sponsorId,
        teamId,
      });

      return {
        teams: result.teams,
        activeSponsors: result.activeSponsors,
      };
    }),

  renewSponsor: (sponsorId) =>
    set((state) => ({
      activeSponsors: renewSponsorContract({
        sponsors: state.sponsors,
        activeSponsors: state.activeSponsors,
        sponsorId,
        teamId: getCompetitiveTeamId(state) ?? "",
      }),
    })),

  terminateSponsor: (sponsorId) =>
    set((state) => {
      const teamId = getCompetitiveTeamId(state);

      if (!teamId) {
        return {};
      }

      return terminateSponsorContract({
        teams: state.teams,
        activeSponsors: state.activeSponsors,
        sponsorId,
        teamId,
      });
    }),

  scoutQueue: () =>
    set((state) => ({
      career: state.career ? scoutSoloQueue(state.career) : state.career,
    })),

  createCustomTeam: (params) => {
    const { team, players: newPlayers } = buildCustomTeam(params);
    const academy = createAcademyState(team.id, team.academyLevel);
    academy.playerIds = newPlayers.filter((p) => p.status === "Academy").map((p) => p.id);
    const career = createCareer({
      managerName: params.managerName,
      difficulty: "pro",
      teamId: team.id,
    });
    set((state) => {
      const competitive = createDefaultCompetitiveData();
      return {
        ...competitive,
        screen: "game" as const,
        selectedView: "overview" as const,
        career,
        teams: [team, ...competitive.teams],
        players: [...newPlayers, ...competitive.players],
        academies: { ...state.academies, [team.id]: academy },
      };
    });
  },

  promoteAcademyPlayer: (playerId) =>
    set((state) => {
      const teamId = getCompetitiveTeamId(state);
      if (!teamId) return {};
      const team = state.teams.find((t) => t.id === teamId);
      const academy = state.academies[teamId];
      if (!team || !academy) return {};
      const result = promoteAcadPlayer({ playerId, players: state.players, team, academy });
      if (!result) return {};
      return {
        players: result.players,
        teams: state.teams.map((t) => (t.id === teamId ? result.team : t)),
        academies: { ...state.academies, [teamId]: result.academy },
      };
    }),

  dismissAcademyPlayer: (playerId) =>
    set((state) => {
      const teamId = getCompetitiveTeamId(state);
      if (!teamId) return {};
      const academy = state.academies[teamId];
      if (!academy) return {};
      const result = dismissAcadPlayer({ playerId, players: state.players, academy });
      if (!result) return {};
      return {
        players: result.players,
        academies: { ...state.academies, [teamId]: result.academy },
      };
    }),

  upgradeAcademy: () =>
    set((state) => {
      const teamId = getCompetitiveTeamId(state);
      if (!teamId) return {};
      const team = state.teams.find((t) => t.id === teamId);
      const academy = state.academies[teamId];
      if (!team || !academy) return {};
      const result = upgradeAcad({ team, academy });
      if (!result) return {};
      return {
        teams: state.teams.map((t) => (t.id === teamId ? result.team : t)),
        academies: { ...state.academies, [teamId]: result.academy },
      };
    }),

  generateTalents: () =>
    set((state) => {
      const teamId = getCompetitiveTeamId(state);
      if (!teamId) return {};
      const team = state.teams.find((t) => t.id === teamId);
      const academy = state.academies[teamId] ?? createAcademyState(teamId, team?.academyLevel ?? 1);
      if (!team) return {};
      const result = generateNewTalents({
        academy,
        team,
        existingPlayers: state.players,
        seed: `talent-${Date.now()}`,
      });
      return {
        players: [...state.players, ...result.players],
        academies: { ...state.academies, [teamId]: result.academy },
      };
    }),

  trainIndividual: (playerId, trainingType) =>
    set((state) => {
      const player = state.players.find((p) => p.id === playerId);
      if (!player) return {};
      const result = trainPlayer(player, trainingType);
      return {
        players: state.players.map((p) => (p.id === playerId ? result.player : p)),
      };
    }),

  selectTournament: (tournamentId) =>
    set((state) => ({
      selectedTournamentId: tournamentId,
      currentTournamentId: tournamentId,
      currentTournament:
        state.tournaments.find((tournament) => tournament.id === tournamentId) ??
        null,
      selectedView: "tournament-details",
    })),

  startVeto: (tournamentId) =>
    set((state) => {
      const teamId = getCompetitiveTeamId(state);
      const tournament =
        state.tournaments.find((item) => item.id === (tournamentId ?? state.selectedTournamentId)) ??
        state.tournaments.find((item) => item.status !== "Finished") ??
        state.tournaments[0];

      if (!teamId || !tournament) {
        return {};
      }

      const existingRun =
        state.currentTournamentRun?.tournamentId === tournament.id &&
        state.currentTournamentRun.status !== "Finished"
          ? state.currentTournamentRun
          : state.tournamentRuns.find(
              (run) => run.tournamentId === tournament.id && run.status !== "Finished",
            );
      const run = existingRun ?? createTournamentRun(tournament, state.teams, teamId);
      const match = getCurrentTournamentMatch(run);

      if (!match) {
        return {};
      }

      return {
        currentTournament: tournament,
        currentTournamentId: tournament.id,
        currentTournamentRun: run,
        tournamentRuns: upsertTournamentRun(state.tournamentRuns, run),
        selectedTournamentId: tournament.id,
        currentVeto: createEmptyVeto({
          seriesFormat: match.seriesFormat,
          teamAId: match.teamAId,
          teamBId: match.teamBId,
        }),
        selectedView: "map-veto",
      };
    }),

  confirmVetoAction: (mapId, side) =>
    set((state) => ({
      currentVeto: state.currentVeto
        ? applyVetoAction({
            veto: state.currentVeto,
            maps: csMaps,
            mapId,
            side,
          })
        : state.currentVeto,
    })),

  autoVeto: () =>
    set((state) => ({
      currentVeto: state.currentVeto
        ? runAutoVeto({
            veto: state.currentVeto,
            maps: csMaps,
            teams: state.teams,
          })
        : state.currentVeto,
    })),

  startSeries: () =>
    set((state) => {
      const tournament =
        state.currentTournament ??
        state.tournaments.find((item) => item.id === state.selectedTournamentId);
      const match = getCurrentTournamentMatch(state.currentTournamentRun);

      if (!state.currentVeto || !tournament) {
        return {};
      }

      const stage = match ? { id: match.stageId } : getDefaultTournamentStage(tournament);
      const liveSeries = createLiveSeriesState({
        tournamentId: tournament.id,
        stageId: stage.id,
        veto: state.currentVeto,
        maps: csMaps,
        teams: state.teams,
        players: state.players,
        seed: `${tournament.id}-${Date.now()}`,
      });

      return {
        currentSeries: liveSeries,
        currentMatch: liveSeries,
        selectedView: "live-match",
      };
    }),

  simulateNextRound: () =>
    set((state) => applySeriesProgress(state, state.currentSeries ? advanceRound(state.currentSeries) : null)),

  toggleAutoPlay: () =>
    set((state) => {
      const nextAutoPlay = !state.currentSeries?.autoPlay;

      return {
        currentSeries: state.currentSeries
          ? { ...state.currentSeries, autoPlay: nextAutoPlay }
          : state.currentSeries,
        currentMatch: state.currentMatch
          ? { ...state.currentMatch, autoPlay: nextAutoPlay }
          : state.currentMatch,
      };
    }),

  pauseAutoPlay: () =>
    set((state) => ({
      currentSeries: state.currentSeries
        ? { ...state.currentSeries, autoPlay: false }
        : state.currentSeries,
      currentMatch: state.currentMatch
        ? { ...state.currentMatch, autoPlay: false }
        : state.currentMatch,
    })),

  skipRound: () =>
    set((state) => applySeriesProgress(state, state.currentSeries ? advanceRound(state.currentSeries) : null)),

  skipMap: () =>
    set((state) => applySeriesProgress(state, state.currentSeries ? advanceMap(state.currentSeries) : null)),

  skipSeries: () =>
    set((state) => applySeriesProgress(state, state.currentSeries ? advanceSeries(state.currentSeries) : null)),

  finishSeries: () =>
    set((state) => {
      if (!state.currentSeries) {
        return {};
      }

      return finishSeriesState(state, advanceSeries(state.currentSeries));
    }),

  applyPrize: (placement = "1st") =>
    set((state) => {
      const teamId = getCompetitiveTeamId(state);
      const tournamentId =
        state.currentTournament?.id ?? state.selectedTournamentId ?? state.tournaments[0]?.id;

      if (!teamId || !tournamentId) {
        return {};
      }

      const result = applyTournamentPrize(teamId, tournamentId, placement, {
        teams: state.teams,
        tournaments: state.tournaments,
        rankings: state.rankings,
      });

      if (!result) {
        return {};
      }

      return {
        teams: result.teams,
        rankings: recalculateRankings(result.teams, result.rankings),
      };
    }),

  processMonthlySponsors: () =>
    set((state) => {
      const result = processMonthlySponsorPayments({
        sponsors: state.sponsors,
        teams: state.teams,
        activeSponsors: state.activeSponsors,
      });

      return result;
    }),

  applySponsorBonuses: (event = "Win") =>
    set((state) => {
      const teamId = getCompetitiveTeamId(state);

      if (!teamId) {
        return {};
      }

      const result = applySponsorBonusesToTeams({
        sponsors: state.sponsors,
        teams: state.teams,
        activeSponsors: state.activeSponsors,
        teamId,
        event,
      });

      return {
        teams: result.teams,
      };
    }),

  saveGame: (slot) => {
    const state = get();

    if (!state.career) {
      return;
    }

    const payload = saveGamePayloadToSlot(slot, {
      version: 2,
      career: state.career,
      competitive: selectCompetitiveSaveData(state),
    });

    set({
      career: payload.career,
      saveSlots: loadSaveSlots(),
    });
  },

  loadGame: (slot) => {
    const payload = loadGamePayloadFromSlot(slot);
    const legacyCareer = payload ? null : loadCareerFromSlot(slot);
    const career = payload?.career ?? legacyCareer;

    if (!career) {
      return;
    }

    const competitive = hydrateCompetitiveSaveData(payload?.competitive);

    set({
      ...competitive,
      screen: "game",
      selectedView: "overview",
      career,
      saveSlots: loadSaveSlots(),
    });
  },

  deleteSave: (slot) => {
    deleteCareerSlot(slot);
    set({
      saveSlots: loadSaveSlots(),
    });
  },
}));

function createDefaultCompetitiveData(): CompetitiveSaveData & {
  currentTournament: Tournament | null;
} {
  const teams = clone(realTeams);
  const tournaments = clone(realTournaments);

  return {
    teams,
    players: clone(realPlayers),
    tournaments,
    currentTournamentId: null,
    currentTournament: null,
    currentTournamentRun: null,
    tournamentRuns: [],
    currentSeries: null,
    currentMatch: null,
    sponsors: clone(sponsorData),
    activeSponsors: [],
    rankings: createInitialRankings(teams),
    calendar: buildTournamentCalendar(tournaments),
    currentVeto: null,
    latestSeriesResult: null,
    selectedTournamentId: null,
  };
}

function hydrateCompetitiveSaveData(
  saved: CompetitiveSaveData | null | undefined,
): CompetitiveSaveData & { currentTournament: Tournament | null } {
  const defaults = createDefaultCompetitiveData();

  if (!saved) {
    return defaults;
  }

  const merged = {
    ...defaults,
    ...saved,
    teams: saved.teams?.length ? saved.teams : defaults.teams,
    players: saved.players?.length ? saved.players : defaults.players,
    tournaments: saved.tournaments?.length ? saved.tournaments : defaults.tournaments,
    sponsors: saved.sponsors?.length ? saved.sponsors : defaults.sponsors,
    activeSponsors: saved.activeSponsors ?? [],
    currentTournamentRun: saved.currentTournamentRun ?? null,
    tournamentRuns: saved.tournamentRuns ?? [],
    rankings: saved.rankings?.length ? saved.rankings : createInitialRankings(saved.teams ?? defaults.teams),
    calendar: saved.calendar?.length
      ? saved.calendar
      : buildTournamentCalendar(saved.tournaments ?? defaults.tournaments),
    academies: saved.academies || {},
  };

  return {
    ...merged,
    currentTournament:
      merged.tournaments.find(
        (tournament) => tournament.id === merged.selectedTournamentId,
      ) ?? null,
  };
}

function selectCompetitiveSaveData(state: GameStore): CompetitiveSaveData {
  return {
    teams: state.teams,
    players: state.players,
    tournaments: state.tournaments,
    currentTournamentId: state.currentTournament?.id ?? state.selectedTournamentId,
    currentTournamentRun: state.currentTournamentRun,
    tournamentRuns: state.tournamentRuns,
    currentSeries: state.currentSeries,
    currentMatch: state.currentMatch,
    sponsors: state.sponsors,
    activeSponsors: state.activeSponsors,
    rankings: state.rankings,
    calendar: state.calendar,
    currentVeto: state.currentVeto,
    latestSeriesResult: state.latestSeriesResult,
    selectedTournamentId: state.selectedTournamentId,
    academies: state.academies,
  };
}

function getCompetitiveTeamId(state: Pick<GameStore, "career" | "teams">) {
  const careerTeamId = state.career?.userTeamId;

  if (careerTeamId && state.teams.some((team) => team.id === careerTeamId)) {
    return careerTeamId;
  }

  return state.teams[0]?.id ?? null;
}

function applySeriesProgress(state: GameStore, series: LiveSeriesState | null) {
  if (!series) {
    return {};
  }

  if (series.finished) {
    return finishSeriesState(state, series);
  }

  return {
    currentSeries: series,
    currentMatch: series,
    selectedView: "live-match" as DashboardView,
  };
}

function finishSeriesState(state: GameStore, series: LiveSeriesState) {
  if (state.latestSeriesResult === series.result) {
    return {
      selectedView: "series-result" as DashboardView,
    };
  }

  const tournament =
    state.tournaments.find((item) => item.id === series.result.tournamentId) ??
    state.currentTournament;

  if (!tournament) {
    return {
      currentSeries: series,
      currentMatch: series,
      latestSeriesResult: series.result,
      selectedView: "series-result" as DashboardView,
    };
  }

  let nextTeams = state.teams;
  let nextRankings = state.rankings;

  const rankingImpact = applySeriesRankingImpact(
    nextTeams,
    nextRankings,
    series.result,
    tournament,
  );
  nextTeams = rankingImpact.teams;
  nextRankings = rankingImpact.rankings;

  const winnerPrize = applyTournamentPrize(
    series.result.winnerTeamId,
    tournament.id,
    "1st",
    {
      teams: nextTeams,
      tournaments: state.tournaments,
      rankings: nextRankings,
    },
  );

  if (winnerPrize) {
    nextTeams = winnerPrize.teams;
    nextRankings = winnerPrize.rankings;
  }

  const loserPrize = applyTournamentPrize(
    series.result.loserTeamId,
    tournament.id,
    "2nd",
    {
      teams: nextTeams,
      tournaments: state.tournaments,
      rankings: nextRankings,
    },
  );

  if (loserPrize) {
    nextTeams = loserPrize.teams;
    nextRankings = loserPrize.rankings;
  }

  const sponsorBonus = applySponsorBonusesToTeams({
    sponsors: state.sponsors,
    teams: nextTeams,
    activeSponsors: state.activeSponsors,
    teamId: series.result.winnerTeamId,
    event: "Win",
  });
  nextTeams = sponsorBonus.teams;
  const nextRun = state.currentTournamentRun
    ? recordSeriesResultInRun(state.currentTournamentRun, series.result)
    : null;
  const nextTournaments =
    nextRun?.status === "Finished"
      ? markTournamentPlayed(state.tournaments, tournament.id)
      : state.tournaments;

  return {
    teams: nextTeams,
    rankings: recalculateRankings(nextTeams, nextRankings),
    tournaments: nextTournaments,
    calendar: buildTournamentCalendar(nextTournaments),
    currentTournamentRun: nextRun,
    tournamentRuns: nextRun
      ? upsertTournamentRun(state.tournamentRuns, nextRun)
      : state.tournamentRuns,
    currentSeries: series,
    currentMatch: series,
    latestSeriesResult: series.result,
    selectedView: "series-result" as DashboardView,
  };
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
