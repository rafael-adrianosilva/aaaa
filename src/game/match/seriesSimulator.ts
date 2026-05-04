import type { CSMap } from "../../types/CSMap";
import type { RealPlayer } from "../../types/RealPlayer";
import type { RealTeam } from "../../types/RealTeam";
import type { LiveSeriesState, MapResult, SeriesResult } from "../../types/Series";
import type { SeriesVetoResult } from "../../types/Veto";
import { simulateMap } from "./mapSimulator";

export function simulateSeries(params: {
  tournamentId: string;
  stageId: string;
  veto: SeriesVetoResult;
  maps: CSMap[];
  teams: RealTeam[];
  players: RealPlayer[];
  seed: string;
}): SeriesResult {
  const teamA = params.teams.find((team) => team.id === params.veto.teamAId);
  const teamB = params.teams.find((team) => team.id === params.veto.teamBId);

  if (!teamA || !teamB) {
    throw new Error("Times invalidos para simular serie.");
  }

  const mapsToWin = winsNeeded(params.veto.seriesFormat);
  const mapResults: MapResult[] = [];
  let winsA = 0;
  let winsB = 0;

  for (const seriesMap of params.veto.pickedMaps) {
    const map = params.maps.find((item) => item.id === seriesMap.mapId);

    if (!map) {
      continue;
    }

    const mapResult = simulateMap({
      seriesMap,
      map,
      teamA,
      teamB,
      players: params.players,
      seed: `${params.seed}-${map.id}`,
    });

    mapResults.push(mapResult);

    if (mapResult.winnerTeamId === teamA.id) {
      winsA += 1;
    } else {
      winsB += 1;
    }

    if (winsA >= mapsToWin || winsB >= mapsToWin) {
      break;
    }
  }

  const winnerTeamId = winsA > winsB ? teamA.id : teamB.id;
  const loserTeamId = winnerTeamId === teamA.id ? teamB.id : teamA.id;

  return {
    tournamentId: params.tournamentId,
    stageId: params.stageId,
    seriesFormat: params.veto.seriesFormat,
    teamAId: teamA.id,
    teamBId: teamB.id,
    maps: mapResults,
    scoreA: winsA,
    scoreB: winsB,
    winnerTeamId,
    loserTeamId,
    mvpPlayerId: chooseSeriesMvp(mapResults),
  };
}

export function createLiveSeriesState(params: Parameters<typeof simulateSeries>[0]) {
  return {
    tournamentId: params.tournamentId,
    stageId: params.stageId,
    veto: params.veto,
    result: simulateSeries(params),
    currentMapIndex: 0,
    currentRoundIndex: 0,
    finished: false,
    autoPlay: false,
  } satisfies LiveSeriesState;
}

export function skipRound(state: LiveSeriesState): LiveSeriesState {
  if (state.finished) {
    return state;
  }

  const map = state.result.maps[state.currentMapIndex];

  if (!map) {
    return { ...state, finished: true };
  }

  const nextRoundIndex = state.currentRoundIndex + 1;

  if (nextRoundIndex >= map.rounds.length) {
    return skipMap({
      ...state,
      currentRoundIndex: nextRoundIndex,
    });
  }

  return {
    ...state,
    currentRoundIndex: nextRoundIndex,
  };
}

export function skipMap(state: LiveSeriesState): LiveSeriesState {
  const nextMapIndex = state.currentMapIndex + 1;

  if (nextMapIndex >= state.result.maps.length) {
    return skipSeries(state);
  }

  return {
    ...state,
    currentMapIndex: nextMapIndex,
    currentRoundIndex: 0,
  };
}

export function skipSeries(state: LiveSeriesState): LiveSeriesState {
  const lastMapIndex = Math.max(0, state.result.maps.length - 1);
  const lastRoundIndex = Math.max(0, (state.result.maps[lastMapIndex]?.rounds.length ?? 1) - 1);

  return {
    ...state,
    currentMapIndex: lastMapIndex,
    currentRoundIndex: lastRoundIndex,
    finished: true,
    autoPlay: false,
  };
}

function winsNeeded(format: SeriesVetoResult["seriesFormat"]) {
  return {
    MD1: 1,
    MD3: 2,
    MD5: 3,
  }[format];
}

function chooseSeriesMvp(maps: MapResult[]) {
  const counts = new Map<string, number>();

  for (const map of maps) {
    for (const round of map.rounds) {
      counts.set(round.mvpPlayerId, (counts.get(round.mvpPlayerId) ?? 0) + 1);
    }
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
}
