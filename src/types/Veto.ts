export type SeriesFormat = "MD1" | "MD3" | "MD5";

export type Side = "CT" | "T";

export type MapVetoAction = {
  order: number;
  teamId: string;
  action: "Ban" | "Pick" | "ChooseSide" | "Decider";
  mapId?: string;
  side?: Side;
};

export type SeriesMap = {
  mapId: string;
  pickedByTeamId?: string;
  startingSideTeamA: Side;
  startingSideTeamB: Side;
  status: "Picked" | "Decider";
};

export type SeriesVetoResult = {
  seriesFormat: SeriesFormat;
  teamAId: string;
  teamBId: string;
  bannedMaps: string[];
  pickedMaps: SeriesMap[];
  deciderMapId?: string;
  actions: MapVetoAction[];
};

export type VetoStep = {
  order: number;
  teamId: string;
  action: "Ban" | "Pick" | "ChooseSide" | "Decider";
  description: string;
};
