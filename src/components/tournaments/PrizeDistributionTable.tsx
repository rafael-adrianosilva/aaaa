import { formatUSD } from "../../game/selectors";
import type { PrizeDistribution } from "../../types/PrizeDistribution";

export function PrizeDistributionTable({
  prizes,
}: {
  prizes: PrizeDistribution[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line/80">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-paper/8 text-xs uppercase text-paper/55">
          <tr>
            <th className="px-3 py-3">Colocacao</th>
            <th className="px-3 py-3">Premio</th>
            <th className="px-3 py-3">Reputacao</th>
            <th className="px-3 py-3">Ranking</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line/60">
          {prizes.map((prize) => (
            <tr key={prize.placement} className="bg-ink/20">
              <td className="px-3 py-3 font-bold">{prize.placement}</td>
              <td className="px-3 py-3 text-mint">{formatUSD(prize.amount)}</td>
              <td className="px-3 py-3">+{prize.reputationBonus}</td>
              <td className="px-3 py-3">+{prize.rankingPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
