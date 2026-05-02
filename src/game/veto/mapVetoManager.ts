import type { CSMap } from "../../types/CSMap";
import type { RealTeam } from "../../types/RealTeam";
import type {
  MapVetoAction,
  SeriesFormat,
  SeriesMap,
  SeriesVetoResult,
  Side,
  VetoStep,
} from "../../types/Veto";

export function createEmptyVeto(params: {
  seriesFormat: SeriesFormat;
  teamAId: string;
  teamBId: string;
}): SeriesVetoResult {
  return {
    seriesFormat: params.seriesFormat,
    teamAId: params.teamAId,
    teamBId: params.teamBId,
    bannedMaps: [],
    pickedMaps: [],
    actions: [],
  };
}

export function getAvailableMapIds(veto: SeriesVetoResult, maps: CSMap[]) {
  const pickedIds = new Set(veto.pickedMaps.map((item) => item.mapId));
  const bannedIds = new Set(veto.bannedMaps);

  return maps
    .map((map) => map.id)
    .filter((mapId) => !pickedIds.has(mapId) && !bannedIds.has(mapId));
}

export function getNextVetoStep(veto: SeriesVetoResult): VetoStep | null {
  const sequence = buildVetoSequence(veto.seriesFormat, veto.teamAId, veto.teamBId);
  const next = sequence[veto.actions.length];

  if (!next) {
    return null;
  }

  return {
    ...next,
    description: describeStep(next, veto),
  };
}

export function isVetoComplete(veto: SeriesVetoResult) {
  return Boolean(veto.deciderMapId) && veto.pickedMaps.length === mapsNeeded(veto.seriesFormat);
}

export function applyVetoAction(params: {
  veto: SeriesVetoResult;
  maps: CSMap[];
  mapId?: string;
  side?: Side;
}) {
  const step = getNextVetoStep(params.veto);

  if (!step) {
    return params.veto;
  }

  const available = getAvailableMapIds(params.veto, params.maps);
  const fallbackMapId = available[0];
  const selectedMapId = params.mapId && available.includes(params.mapId)
    ? params.mapId
    : fallbackMapId;

  let next: SeriesVetoResult = {
    ...params.veto,
    bannedMaps: [...params.veto.bannedMaps],
    pickedMaps: params.veto.pickedMaps.map((map) => ({ ...map })),
    actions: [...params.veto.actions],
  };

  if (step.action === "Ban") {
    if (!selectedMapId) {
      return next;
    }

    next.bannedMaps.push(selectedMapId);
    next.actions.push(action(step, { mapId: selectedMapId }));
  }

  if (step.action === "Pick") {
    if (!selectedMapId) {
      return next;
    }

    next.pickedMaps.push({
      mapId: selectedMapId,
      pickedByTeamId: step.teamId,
      startingSideTeamA: "T",
      startingSideTeamB: "CT",
      status: "Picked",
    });
    next.actions.push(action(step, { mapId: selectedMapId }));
  }

  if (step.action === "ChooseSide") {
    const side = params.side ?? "CT";
    const sideActionCount = next.actions.filter(
      (item) => item.action === "ChooseSide",
    ).length;
    const targetMap = next.pickedMaps[sideActionCount];

    if (!targetMap) {
      return next;
    }

    next.pickedMaps = next.pickedMaps.map((map) =>
      map.mapId === targetMap.mapId
        ? chooseSideForMap(map, step.teamId, next.teamAId, side)
        : map,
    );
    next.actions.push(action(step, { mapId: targetMap.mapId, side }));
  }

  next = applyAutomaticDecider(next, params.maps);
  return next;
}

export function getVetoLogLine(
  action: MapVetoAction,
  teams: RealTeam[],
  maps: CSMap[],
) {
  const teamName =
    teams.find((team) => team.id === action.teamId)?.name ?? "Time";
  const mapName = maps.find((map) => map.id === action.mapId)?.name ?? "mapa";

  if (action.action === "ChooseSide") {
    return `${teamName} escolheu comecar de ${action.side} em ${mapName}.`;
  }

  if (action.action === "Decider") {
    return `${mapName} ficou como decider.`;
  }

  return `${teamName} ${action.action === "Ban" ? "baniu" : "escolheu"} ${mapName}.`;
}

function applyAutomaticDecider(veto: SeriesVetoResult, maps: CSMap[]) {
  const nextStep = getNextVetoStep(veto);

  if (!nextStep || nextStep.action !== "Decider") {
    return veto;
  }

  const available = getAvailableMapIds(veto, maps);
  const deciderMapId = available[0];

  if (!deciderMapId) {
    return veto;
  }

  const decider: SeriesMap = {
    mapId: deciderMapId,
    startingSideTeamA: "CT",
    startingSideTeamB: "T",
    status: "Decider",
  };

  return {
    ...veto,
    deciderMapId,
    pickedMaps: [...veto.pickedMaps, decider],
    actions: [...veto.actions, action(nextStep, { mapId: deciderMapId })],
  };
}

function buildVetoSequence(
  format: SeriesFormat,
  teamAId: string,
  teamBId: string,
): Array<Omit<VetoStep, "description">> {
  if (format === "MD1") {
    return [
      step(1, teamAId, "Ban"),
      step(2, teamBId, "Ban"),
      step(3, teamAId, "Ban"),
      step(4, teamBId, "Ban"),
      step(5, teamAId, "Ban"),
      step(6, teamBId, "Ban"),
      step(7, "system", "Decider"),
    ];
  }

  if (format === "MD3") {
    return [
      step(1, teamAId, "Ban"),
      step(2, teamBId, "Ban"),
      step(3, teamAId, "Pick"),
      step(4, teamBId, "ChooseSide"),
      step(5, teamBId, "Pick"),
      step(6, teamAId, "ChooseSide"),
      step(7, teamAId, "Ban"),
      step(8, teamBId, "Ban"),
      step(9, "system", "Decider"),
    ];
  }

  return [
    step(1, teamAId, "Ban"),
    step(2, teamBId, "Ban"),
    step(3, teamAId, "Pick"),
    step(4, teamBId, "ChooseSide"),
    step(5, teamBId, "Pick"),
    step(6, teamAId, "ChooseSide"),
    step(7, teamAId, "Pick"),
    step(8, teamBId, "ChooseSide"),
    step(9, teamBId, "Pick"),
    step(10, teamAId, "ChooseSide"),
    step(11, "system", "Decider"),
  ];
}

function step(
  order: number,
  teamId: string,
  actionType: VetoStep["action"],
): Omit<VetoStep, "description"> {
  return {
    order,
    teamId,
    action: actionType,
  };
}

function action(
  stepData: Omit<VetoStep, "description">,
  values: Pick<MapVetoAction, "mapId" | "side">,
): MapVetoAction {
  return {
    order: stepData.order,
    teamId: stepData.teamId,
    action: stepData.action,
    ...values,
  };
}

function chooseSideForMap(
  map: SeriesMap,
  choosingTeamId: string,
  teamAId: string,
  side: Side,
): SeriesMap {
  const otherSide: Side = side === "CT" ? "T" : "CT";

  if (choosingTeamId === teamAId) {
    return {
      ...map,
      startingSideTeamA: side,
      startingSideTeamB: otherSide,
    };
  }

  return {
    ...map,
    startingSideTeamA: otherSide,
    startingSideTeamB: side,
  };
}

function describeStep(
  stepData: Omit<VetoStep, "description">,
  veto: SeriesVetoResult,
) {
  if (stepData.action === "Decider") {
    return "Mapa restante vira decider";
  }

  const teamLabel =
    stepData.teamId === veto.teamAId ? "Time A" : stepData.teamId === veto.teamBId ? "Time B" : "Sistema";

  if (stepData.action === "ChooseSide") {
    return `${teamLabel} escolhe lado inicial`;
  }

  return `${teamLabel} ${stepData.action === "Ban" ? "bane" : "escolhe"} um mapa`;
}

function mapsNeeded(format: SeriesFormat) {
  return {
    MD1: 1,
    MD3: 3,
    MD5: 5,
  }[format];
}
