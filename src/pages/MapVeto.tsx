import { useMemo, useState } from "react";
import { MapPoolGrid } from "../components/veto/MapPoolGrid";
import { PickBanPanel } from "../components/veto/PickBanPanel";
import { VetoActionLog } from "../components/veto/VetoActionLog";
import { csMaps } from "../data/maps.cs";
import {
  getNextVetoStep,
  isVetoComplete,
} from "../game/veto/mapVetoManager";
import { useGameStore } from "../store/gameStore";
import type { Side } from "../types/Veto";

export function MapVeto() {
  const [selectedMapId, setSelectedMapId] = useState<string>();
  const [selectedSide, setSelectedSide] = useState<Side>("CT");
  const veto = useGameStore((state) => state.currentVeto);
  const tournament = useGameStore((state) => state.currentTournament);
  const teams = useGameStore((state) => state.teams);
  const confirmVetoAction = useGameStore((state) => state.confirmVetoAction);
  const autoVeto = useGameStore((state) => state.autoVeto);
  const startSeries = useGameStore((state) => state.startSeries);
  const step = useMemo(() => (veto ? getNextVetoStep(veto) : null), [veto]);
  const complete = veto ? isVetoComplete(veto) : false;

  if (!veto) {
    return (
      <section className="panel rounded-lg p-5">
        <p className="text-paper/65">Inicie um campeonato para abrir o veto.</p>
      </section>
    );
  }

  const teamA = teams.find((team) => team.id === veto.teamAId);
  const teamB = teams.find((team) => team.id === veto.teamBId);

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
      <section className="grid gap-5">
        <div className="panel rounded-lg p-4">
          <p className="text-xs font-semibold uppercase text-paper/55">
            {tournament?.displayName ?? "Campeonato"} · {veto.seriesFormat}
          </p>
          <h3 className="mt-2 text-2xl font-black">
            {teamA?.name} vs {teamB?.name}
          </h3>
          <p className="mt-2 text-sm text-paper/62">
            Bans: {veto.bannedMaps.length} · Picks: {veto.pickedMaps.length} ·
            Decider: {veto.deciderMapId ?? "-"}
          </p>
        </div>

        <MapPoolGrid
          maps={csMaps}
          bannedMapIds={veto.bannedMaps}
          pickedMapIds={veto.pickedMaps.map((map) => map.mapId)}
          selectedMapId={selectedMapId}
          onSelect={setSelectedMapId}
        />

        <section className="grid gap-3 md:grid-cols-2">
          <div className="panel rounded-lg p-4">
            <h3 className="font-black">Mapas banidos</h3>
            <p className="mt-2 text-sm text-paper/62">
              {veto.bannedMaps
                .map((id) => csMaps.find((map) => map.id === id)?.name)
                .filter(Boolean)
                .join(", ") || "Nenhum"}
            </p>
          </div>
          <div className="panel rounded-lg p-4">
            <h3 className="font-black">Mapas escolhidos</h3>
            <p className="mt-2 text-sm text-paper/62">
              {veto.pickedMaps
                .map((item) => {
                  const mapName = csMaps.find((map) => map.id === item.mapId)?.name;
                  return `${mapName} (${item.status}, A ${item.startingSideTeamA})`;
                })
                .join(", ") || "Nenhum"}
            </p>
          </div>
        </section>
      </section>

      <aside className="grid content-start gap-5">
        <PickBanPanel
          step={step}
          selectedMapId={selectedMapId}
          selectedSide={selectedSide}
          vetoComplete={complete}
          onSideChange={setSelectedSide}
          onConfirm={() => {
            confirmVetoAction(selectedMapId, selectedSide);
            setSelectedMapId(undefined);
          }}
          onAuto={autoVeto}
          onStart={startSeries}
        />
        <section className="panel rounded-lg p-4">
          <h3 className="mb-3 font-black">Log do veto</h3>
          <VetoActionLog veto={veto} teams={teams} maps={csMaps} />
        </section>
      </aside>
    </div>
  );
}
