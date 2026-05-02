import type { RoundResult } from "./Round";
import type { SeriesFormat, SeriesVetoResult } from "./Veto";

export type MapResult = {
  mapId: string;
  teamAId: string;
  teamBId: string;
  scoreA: number;
  scoreB: number;
  winnerTeamId: string;
  rounds: RoundResult[];
};

export type SeriesResult = {
  tournamentId: string;
  stageId: string;
  seriesFormat: SeriesFormat;
  teamAId: string;
  teamBId: string;
  maps: MapResult[];
  winnerTeamId: string;
  loserTeamId: string;
  mvpPlayerId: string;
};

export type LiveSeriesState = {
  tournamentId: string;
  stageId: string;
  veto: SeriesVetoResult;
  result: SeriesResult;
  currentMapIndex: number;
  currentRoundIndex: number;
  finished: boolean;
  autoPlay: boolean;
};
