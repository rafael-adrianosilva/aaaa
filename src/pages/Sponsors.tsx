import { ActiveSponsorCard } from "../components/sponsors/ActiveSponsorCard";
import { SponsorCard } from "../components/sponsors/SponsorCard";
import { getSponsorLimit, listAvailableSponsors } from "../game/sponsors/sponsorManager";
import { useGameStore } from "../store/gameStore";

export function Sponsors() {
  const career = useGameStore((state) => state.career);
  const teams = useGameStore((state) => state.teams);
  const sponsors = useGameStore((state) => state.sponsors);
  const activeSponsors = useGameStore((state) => state.activeSponsors);
  const signSponsor = useGameStore((state) => state.signSponsor);
  const renewSponsor = useGameStore((state) => state.renewSponsor);
  const terminateSponsor = useGameStore((state) => state.terminateSponsor);
  const processMonthlySponsors = useGameStore((state) => state.processMonthlySponsors);
  const team = teams.find((item) => item.id === career?.userTeamId) ?? teams[0];
  const active = activeSponsors.filter((contract) => contract.teamId === team?.id);
  const available = team ? listAvailableSponsors(sponsors, team, activeSponsors) : [];
  const limit = team ? getSponsorLimit(team) : 0;

  return (
    <div className="grid gap-5">
      <section className="panel rounded-lg p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-paper/55">
              Patrocinios ativos
            </p>
            <h3 className="mt-2 text-2xl font-black">
              {active.length}/{limit} contratos
            </h3>
          </div>
          <button
            className="h-10 rounded-md bg-mint px-4 font-black text-ink hover:brightness-110"
            type="button"
            onClick={processMonthlySponsors}
          >
            Processar mensalidade
          </button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {active.map((contract) => (
            <ActiveSponsorCard
              key={contract.sponsorId}
              contract={contract}
              sponsor={sponsors.find((sponsor) => sponsor.id === contract.sponsorId)}
              onRenew={renewSponsor}
              onTerminate={terminateSponsor}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-black">Disponiveis</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.id}
              sponsor={sponsor}
              disabled={!available.some((item) => item.id === sponsor.id) || active.length >= limit}
              onSign={signSponsor}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
