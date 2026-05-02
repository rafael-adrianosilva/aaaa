import { Trophy } from "lucide-react";
import { PlayerStatsTable } from "../components/match/PlayerStatsTable";
import { formatUSD } from "../game/selectors";
import { getChampionPrize } from "../game/tournaments/prizeManager";
import { useGameStore } from "../store/gameStore";

export function SeriesResultPage() {
  const result = useGameStore((state) => state.latestSeriesResult);
  const teams = useGameStore((state) => state.teams);
  const players = useGameStore((state) => state.players);
  const tournaments = useGameStore((state) => state.tournaments);
  const sponsors = useGameStore((state) => state.sponsors);
  const activeSponsors = useGameStore((state) => state.activeSponsors);
  const startVeto = useGameStore((state) => state.startVeto);

  if (!result) {
    return (
      <section className="panel rounded-lg p-5">
        <p className="text-paper/65">Nenhum resultado de serie ainda.</p>
      </section>
    );
  }

  const tournament = tournaments.find((item) => item.id === result.tournamentId);
  const winner = teams.find((team) => team.id === result.winnerTeamId);
  const loser = teams.find((team) => team.id === result.loserTeamId);
  const mvp = players.find((player) => player.id === result.mvpPlayerId);
  const championPrize = tournament ? getChampionPrize(tournament) : undefined;
  const runnerPrize = tournament?.prizeDistribution.find(
    (prize) => prize.placement === "2nd",
  );
  const sponsorBonus = activeSponsors
    .filter((contract) => contract.teamId === result.winnerTeamId)
    .reduce((total, contract) => {
      const sponsor = sponsors.find((item) => item.id === contract.sponsorId);
      return total + (sponsor?.winBonus ?? 0);
    }, 0);
  const rounds = result.maps.flatMap((map) => map.rounds);
  const seriesPlayers = players.filter(
    (player) => player.teamId === result.teamAId || player.teamId === result.teamBId,
  );

  return (
    <div className="grid gap-5">
      <section className="panel rounded-lg p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-paper/55">
              Resultado final · {tournament?.displayName ?? "Campeonato"}
            </p>
            <h3 className="mt-2 text-3xl font-black">{winner?.name} venceu</h3>
            <p className="mt-2 text-paper/65">
              Contra {loser?.name} · MVP {mvp?.nickname ?? "-"}
            </p>
          </div>
          <Trophy className="text-amber" size={42} />
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-4">
        <Info label="Dinheiro vencedor" value={`+${formatUSD(championPrize?.amount ?? 0)}`} />
        <Info label="Dinheiro vice" value={`+${formatUSD(runnerPrize?.amount ?? 0)}`} />
        <Info
          label="Torcida"
          value={`+${(championPrize?.fanbaseBonus ?? 0).toLocaleString("pt-BR")} fans`}
        />
        <Info label="Moral" value="+5 vencedor / -4 derrotado" />
        <Info
          label="Ranking"
          value={`+${championPrize?.rankingPoints ?? 0} pts campeao`}
        />
        <Info label="Bonus patrocinador" value={`+${formatUSD(sponsorBonus)}`} />
        <Info
          label="Reputacao"
          value={`+${championPrize?.reputationBonus ?? 0} campeao`}
        />
        <Info label="Proxima partida" value="Disponivel no calendario" />
      </div>

      <section className="panel rounded-lg p-4">
        <h3 className="mb-3 text-xl font-black">Mapas</h3>
        <div className="grid gap-2">
          {result.maps.map((map) => (
            <p
              key={map.mapId}
              className="rounded-md border border-line/70 bg-ink/25 px-3 py-3 text-sm text-paper/72"
            >
              {map.mapId}: {map.scoreA} x {map.scoreB} · vencedor{" "}
              {teams.find((team) => team.id === map.winnerTeamId)?.name}
            </p>
          ))}
        </div>
      </section>

      <PlayerStatsTable players={seriesPlayers} rounds={rounds} />

      <button
        className="h-11 rounded-md bg-mint px-4 font-black text-ink hover:brightness-110"
        type="button"
        onClick={() => startVeto()}
      >
        Proxima partida
      </button>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <section className="panel rounded-lg p-4">
      <p className="text-xs font-semibold uppercase text-paper/55">{label}</p>
      <p className="mt-2 text-xl font-black">{value}</p>
    </section>
  );
}
