import { Handshake } from "lucide-react";
import { formatUSD } from "../../game/selectors";
import type { Sponsor } from "../../types/Sponsor";

export function SponsorCard({
  sponsor,
  disabled,
  onSign,
}: {
  sponsor: Sponsor;
  disabled?: boolean;
  onSign: (id: string) => void;
}) {
  return (
    <article className="panel rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <span className="rounded-md bg-amber/12 px-2 py-1 text-xs font-black text-amber">
            {sponsor.tier}
          </span>
          <h3 className="mt-3 text-xl font-black">{sponsor.name}</h3>
          <p className="mt-1 text-sm text-paper/56">{sponsor.category}</p>
        </div>
        <Handshake className="text-amber" size={22} />
      </div>
      <div className="mt-4 grid gap-2 text-sm text-paper/70">
        <p>Mensal: {formatUSD(sponsor.baseMonthlyPayment)}</p>
        <p>Assinatura: {formatUSD(sponsor.signingBonus)}</p>
        <p>Vitoria: {formatUSD(sponsor.winBonus)}</p>
        <p>Playoffs: {formatUSD(sponsor.playoffBonus)}</p>
        <p>Titulo: {formatUSD(sponsor.titleBonus)}</p>
        <p>Major: {formatUSD(sponsor.majorQualificationBonus)}</p>
        <p>Duracao: {sponsor.contractMonths} meses</p>
      </div>
      <div className="mt-4 rounded-md border border-line/70 bg-ink/25 p-3 text-xs text-paper/60">
        Rep. {sponsor.reputationRequirement}+ · Fans{" "}
        {sponsor.fanbaseRequirement.toLocaleString("pt-BR")}+
      </div>
      <div className="mt-3 grid gap-2 text-xs text-paper/58">
        {sponsor.objectives.slice(0, 2).map((objective) => (
          <p key={objective.id}>Objetivo: {objective.description}</p>
        ))}
        {sponsor.penalties.slice(0, 1).map((penalty) => (
          <p key={penalty.id} className="text-coral/80">
            Penalidade: {penalty.description} ({formatUSD(penalty.penaltyAmount)})
          </p>
        ))}
      </div>
      <button
        className="mt-4 h-10 w-full rounded-md bg-amber font-black text-ink hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        type="button"
        disabled={disabled}
        onClick={() => onSign(sponsor.id)}
      >
        Assinar contrato
      </button>
    </article>
  );
}
