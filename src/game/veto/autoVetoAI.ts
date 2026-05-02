import type { CSMap } from "../../types/CSMap";
import type { RealTeam } from "../../types/RealTeam";
import type { SeriesVetoResult, Side } from "../../types/Veto";
import {
  applyVetoAction,
  getAvailableMapIds,
  getNextVetoStep,
  isVetoComplete,
} from "./mapVetoManager";

export function runAutoVeto(params: {
  veto: SeriesVetoResult;
  maps: CSMap[];
  teams: RealTeam[];
}) {
  let next = params.veto;
  let guard = 0;

  while (!isVetoComplete(next) && guard < 16) {
    const step = getNextVetoStep(next);
    if (!step) {
      break;
    }

    const team = params.teams.find((item) => item.id === step.teamId);
    const mapId =
      step.action === "Ban"
        ? pickWeakestAvailableMap(team, next, params.maps)
        : step.action === "Pick"
          ? pickStrongestAvailableMap(team, next, params.maps)
          : undefined;
    const side =
      step.action === "ChooseSide"
        ? choosePreferredSide(team, next, params.maps)
        : undefined;

    next = applyVetoAction({
      veto: next,
      maps: params.maps,
      mapId,
      side,
    });
    guard += 1;
  }

  return next;
}

function pickStrongestAvailableMap(
  team: RealTeam | undefined,
  veto: SeriesVetoResult,
  maps: CSMap[],
) {
  return pickByStrength(team, veto, maps, "max");
}

function pickWeakestAvailableMap(
  team: RealTeam | undefined,
  veto: SeriesVetoResult,
  maps: CSMap[],
) {
  return pickByStrength(team, veto, maps, "min");
}

function pickByStrength(
  team: RealTeam | undefined,
  veto: SeriesVetoResult,
  maps: CSMap[],
  mode: "min" | "max",
) {
  const available = getAvailableMapIds(veto, maps);

  if (!team) {
    return available[0];
  }

  return [...available].sort((a, b) => {
    const diff = (team.mapPoolStrengths[a] ?? 50) - (team.mapPoolStrengths[b] ?? 50);
    return mode === "min" ? diff : -diff;
  })[0];
}

function choosePreferredSide(
  team: RealTeam | undefined,
  veto: SeriesVetoResult,
  maps: CSMap[],
): Side {
  const targetMap = veto.pickedMaps[veto.actions.filter((item) => item.action === "ChooseSide").length];
  const map = maps.find((item) => item.id === targetMap?.mapId);

  if (!team || !map) {
    return "CT";
  }

  const teamStrength = team.mapPoolStrengths[map.id] ?? 50;

  if (map.ctBias >= map.tBias && teamStrength >= 55) {
    return "CT";
  }

  return map.tBias > map.ctBias ? "T" : "CT";
}
