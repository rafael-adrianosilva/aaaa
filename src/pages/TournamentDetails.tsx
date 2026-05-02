import { ArrowLeft, Play } from "lucide-react";
import { PrizeDistributionTable } from "../components/tournaments/PrizeDistributionTable";
import { formatUSD } from "../game/selectors";
import { getEligibleTournaments } from "../game/tournaments/qualificationManager";
import { useGameStore } from "../store/gameStore";

export function TournamentDetails() {
  const tournament = useGameStore((state) => state.currentTournament);
  const currentRun = useGameStore((state) => state.currentTournamentRun);
  const tournaments = useGameStore((state) => state.tournaments);
  const teams = useGameStore((state) => state.teams);
  const rankings = useGameStore((state) => state.rankings);
  const career = useGameStore((state) => state.career);
  const setView = useGameStore((state) => state.setView);
  const startVeto = useGameStore((state) => state.startVeto);
  const team = teams.find((item) => item.id === career?.userTeamId) ?? teams[0];
  const eligible = team
    ? getEligibleTournaments(team, tournaments, rankings).some(
        (item) => item.id === tournament?.id,
      )
    : false;

  if (!tournament) {
    return (
      <section className="panel rounded-lg p-5">
        <p className="text-paper/65">Selecione um campeonato na lista.</p>
      </section>
    );
  }

  return (
    <div className="grid gap-5">
      <button
        className="inline-flex w-fit items-center gap-2 rounded-md border border-line bg-paper/8 px-3 py-2 text-sm font-bold text-paper hover:border-mint"
        type="button"
        onClick={() => setView("tournaments")}
      >
        <ArrowLeft size={16} />
        Voltar
      </button>

      <section className="panel rounded-lg p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-mint/12 px-2 py-1 text-xs font-black text-mint">
                {tournament.tier}
              </span>
              <span className="rounded-md bg-paper/8 px-2 py-1 text-xs text-paper/65">
                {tournament.region}
              </span>
              <span className="rounded-md bg-paper/8 px-2 py-1 text-xs text-paper/65">
                {tournament.status}
              </span>
            </div>
            <h3 className="mt-4 text-3xl font-black">{tournament.displayName}</h3>
            <p className="mt-2 max-w-2xl text-paper/64">
              {tournament.organizer} · {tournament.format} ·{" "}
              {tournament.qualificationMethod}
            </p>
          </div>
          <button
            className="flex h-11 items-center justify-center gap-2 rounded-md bg-coral px-4 font-black text-ink disabled:opacity-40"
            type="button"
            disabled={!eligible}
            onClick={() => startVeto(tournament.id)}
          >
            <Play size={17} />
            Jogar/Inscrever
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <Info label="Prize pool" value={formatUSD(tournament.prizePool)} />
          <Info label="Times" value={`${tournament.teamsCount}`} />
          <Info label="Prestigio" value={`${tournament.prestige}`} />
          <Info label="Data" value={`${tournament.startDate} / ${tournament.endDate}`} />
        </div>
      </section>

      <section className="panel rounded-lg p-5">
        <h3 className="text-xl font-black">Fases</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {tournament.stages.map((stage) => (
            <article key={stage.id} className="rounded-lg border border-line/70 bg-ink/25 p-3">
              <p className="font-black">{stage.name}</p>
              <p className="mt-1 text-sm text-paper/62">
                {stage.format} · {stage.seriesFormat} · {stage.teamsCount} times
              </p>
            </article>
          ))}
        </div>
      </section>

      {currentRun?.tournamentId === tournament.id ? (
        <section className="panel rounded-lg p-5">
          <h3 className="text-xl font-black">Chaveamento em andamento</h3>
          <div className="mt-4 grid gap-4 xl:grid-cols-3">
            {currentRun.stages.map((stage) => (
              <div key={stage.id} className="rounded-lg border border-line/70 bg-ink/25 p-3">
                <p className="font-black">
                  {stage.name} · {stage.seriesFormat}
                </p>
                <div className="mt-3 grid gap-2">
                  {stage.matches.length === 0 ? (
                    <p className="text-sm text-paper/52">Aguardando classificados</p>
                  ) : (
                    stage.matches.map((match) => {
                      const teamA = teams.find((team) => team.id === match.teamAId);
                      const teamB = teams.find((team) => team.id === match.teamBId);

                      return (
                        <p
                          key={match.id}
                          className={`rounded-md border px-3 py-2 text-sm ${
                            currentRun.currentMatchId === match.id
                              ? "border-mint bg-mint/10"
                              : "border-line/70 bg-paper/5"
                          }`}
                        >
                          {teamA?.name} vs {teamB?.name} · {match.status}
                        </p>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="panel rounded-lg p-5">
        <h3 className="mb-4 text-xl font-black">Premiacao</h3>
        <PrizeDistributionTable prizes={tournament.prizeDistribution} />
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line/70 bg-ink/25 p-3">
      <p className="text-xs uppercase text-paper/45">{label}</p>
      <p className="mt-2 font-black">{value}</p>
    </div>
  );
}
