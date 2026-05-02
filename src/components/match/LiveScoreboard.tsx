import type { LiveSeriesState } from "../../types/Series";
import type { RealTeam } from "../../types/RealTeam";
import type { CSMap } from "../../types/CSMap";

export function LiveScoreboard({
  series,
  teams,
  maps,
}: {
  series: LiveSeriesState;
  teams: RealTeam[];
  maps: CSMap[];
}) {
  const teamA = teams.find((team) => team.id === series.result.teamAId);
  const teamB = teams.find((team) => team.id === series.result.teamBId);
  const currentMap = series.result.maps[series.currentMapIndex];
  const mapInfo = maps.find((map) => map.id === currentMap?.mapId);
  const visibleRounds = currentMap?.rounds.slice(0, series.currentRoundIndex + 1) ?? [];
  const lastRound = visibleRounds[visibleRounds.length - 1];
  const winsA = series.result.maps.filter((map) => map.winnerTeamId === teamA?.id).length;
  const winsB = series.result.maps.filter((map) => map.winnerTeamId === teamB?.id).length;

  return (
    <section className="panel rounded-lg p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-paper/55">
            {series.result.seriesFormat} · {mapInfo?.name ?? "Mapa"}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-xl font-black">{teamA?.name}</span>
            <span className="rounded-md bg-amber px-3 py-1 text-2xl font-black text-ink">
              {winsA} : {winsB}
            </span>
            <span className="text-xl font-black">{teamB?.name}</span>
          </div>
        </div>
        <div className="grid gap-1 text-sm text-paper/70">
          <span>
            Placar mapa:{" "}
            <strong className="text-paper">
              {lastRound?.scoreA ?? 0} x {lastRound?.scoreB ?? 0}
            </strong>
          </span>
          <span>
            Round: <strong className="text-paper">{lastRound?.roundNumber ?? 0}</strong>
          </span>
          <span>
            Lados: <strong className="text-paper">{lastRound?.sideTeamA ?? "-"} / {lastRound?.sideTeamB ?? "-"}</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
