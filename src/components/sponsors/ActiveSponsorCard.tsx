import { RefreshCcw, X } from "lucide-react";
import { formatUSD } from "../../game/selectors";
import type { ActiveSponsorContract, Sponsor } from "../../types/Sponsor";

export function ActiveSponsorCard({
  contract,
  sponsor,
  onRenew,
  onTerminate,
}: {
  contract: ActiveSponsorContract;
  sponsor: Sponsor | undefined;
  onRenew: (sponsorId: string) => void;
  onTerminate: (sponsorId: string) => void;
}) {
  if (!sponsor) {
    return null;
  }

  return (
    <article className="rounded-lg border border-line/80 bg-ink/28 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-black">{sponsor.name}</h3>
          <p className="mt-1 text-sm text-paper/58">
            {contract.monthsRemaining} meses · {formatUSD(sponsor.baseMonthlyPayment)}/mes
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-line bg-paper/8 text-paper hover:border-mint hover:text-mint"
            type="button"
            title="Renovar"
            onClick={() => onRenew(sponsor.id)}
          >
            <RefreshCcw size={16} />
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-line bg-paper/8 text-coral hover:border-coral"
            type="button"
            title="Encerrar"
            onClick={() => onTerminate(sponsor.id)}
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="mt-3 grid gap-2">
        {sponsor.objectives.map((objective) => (
          <p key={objective.id} className="text-sm text-paper/66">
            {objective.description}:{" "}
            {contract.objectivesProgress[objective.id] ?? 0}/{objective.target}
          </p>
        ))}
      </div>
    </article>
  );
}
