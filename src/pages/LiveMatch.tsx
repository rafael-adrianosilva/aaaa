import { useEffect, useMemo, useState } from "react";
import { LiveScoreboard } from "../components/match/LiveScoreboard";
import { MatchControls } from "../components/match/MatchControls";
import { PlayerStatsTable } from "../components/match/PlayerStatsTable";
import { RoundLog } from "../components/match/RoundLog";
import { csMaps } from "../data/maps.cs";
import { useGameStore } from "../store/gameStore";

export function LiveMatch() {
  const [showStats, setShowStats] = useState(false);
  const series = useGameStore((state) => state.currentSeries);
  const teams = useGameStore((state) => state.teams);
  const players = useGameStore((state) => state.players);
  const tournament = useGameStore((state) => state.currentTournament);
  const simulateNextRound = useGameStore((state) => state.simulateNextRound);
  const toggleAutoPlay = useGameStore((state) => state.toggleAutoPlay);
  const pauseAutoPlay = useGameStore((state) => state.pauseAutoPlay);
  const skipRound = useGameStore((state) => state.skipRound);
  const skipMap = useGameStore((state) => state.skipMap);
  const skipSeries = useGameStore((state) => state.skipSeries);
  const visibleRounds = useMemo(() => {
    if (!series) {
      return [];
    }

    const map = series.result.maps[series.currentMapIndex];
    return map?.rounds.slice(0, series.currentRoundIndex + 1) ?? [];
  }, [series]);

  useEffect(() => {
    if (!series?.autoPlay || series.finished) {
      return;
    }

    const timer = window.setInterval(() => {
      useGameStore.getState().simulateNextRound();
    }, 850);

    return () => window.clearInterval(timer);
  }, [series?.autoPlay, series?.finished]);

  if (!series) {
    return (
      <section className="panel rounded-lg p-5">
        <p className="text-paper/65">Nenhuma serie em andamento.</p>
      </section>
    );
  }

  const seriesPlayers = players.filter(
    (player) =>
      player.teamId === series.result.teamAId || player.teamId === series.result.teamBId,
  );
  const lastRound = visibleRounds[visibleRounds.length - 1];

  return (
    <div className="grid gap-5">
      <section className="panel rounded-lg p-4">
        <p className="text-xs font-semibold uppercase text-paper/55">
          {tournament?.displayName ?? "Serie"} · fase {series.stageId}
        </p>
        <h3 className="mt-2 text-2xl font-black">Partida round a round</h3>
      </section>

      <LiveScoreboard series={series} teams={teams} maps={csMaps} />
      <MatchControls
        autoPlay={series.autoPlay}
        onNextRound={simulateNextRound}
        onAutoPlay={toggleAutoPlay}
        onPause={pauseAutoPlay}
        onSkipRound={skipRound}
        onSkipMap={skipMap}
        onSkipSeries={skipSeries}
        onStats={() => setShowStats((value) => !value)}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <RoundLog rounds={visibleRounds} teams={teams} players={players} />
        <aside className="panel rounded-lg p-4">
          <p className="text-xs font-semibold uppercase text-paper/55">
            Ultimo round
          </p>
          <h3 className="mt-2 text-xl font-black">
            {lastRound ? `Round ${lastRound.roundNumber}` : "Aguardando"}
          </h3>
          <div className="mt-4 grid gap-2 text-sm text-paper/66">
            <p>Economia A: {lastRound?.economyTeamA ?? 800}</p>
            <p>Economia B: {lastRound?.economyTeamB ?? 800}</p>
            <p>Buy A: {lastRound?.buyTypeTeamA ?? "-"}</p>
            <p>Buy B: {lastRound?.buyTypeTeamB ?? "-"}</p>
            <p>Momentum: {series.finished ? "Finalizada" : "Em andamento"}</p>
          </div>
        </aside>
      </div>

      {showStats ? (
        <PlayerStatsTable players={seriesPlayers} rounds={visibleRounds} />
      ) : null}
    </div>
  );
}
