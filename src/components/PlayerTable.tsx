import { ArrowUpDown, UserPlus } from "lucide-react";
import type { Player } from "../types/game";
import { formatMoney } from "../game/selectors";

interface PlayerTableProps {
  players: Player[];
  starterIds?: string[];
  action?: "toggle" | "hire";
  onAction?: (playerId: string) => void;
  disabledActionIds?: Set<string>;
}

export function PlayerTable({
  players,
  starterIds = [],
  action,
  onAction,
  disabledActionIds,
}: PlayerTableProps) {
  const starters = new Set(starterIds);

  return (
    <div className="thin-scrollbar overflow-x-auto rounded-lg border border-line/80">
      <table className="min-w-[900px] w-full border-collapse text-left text-sm">
        <thead className="bg-paper/8 text-xs uppercase text-paper/58">
          <tr>
            <th className="px-3 py-3">Jogador</th>
            <th className="px-3 py-3">Pos.</th>
            <th className="px-3 py-3">Idade</th>
            <th className="px-3 py-3">OVR</th>
            <th className="px-3 py-3">Pot.</th>
            <th className="px-3 py-3">Moral</th>
            <th className="px-3 py-3">Forma</th>
            <th className="px-3 py-3">Salario</th>
            <th className="px-3 py-3">Valor</th>
            <th className="px-3 py-3">Status</th>
            {action ? <th className="px-3 py-3 text-right">Acao</th> : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-line/60">
          {players.map((player) => {
            const disabled = disabledActionIds?.has(player.id) ?? false;
            const isStarter = starters.has(player.id);

            return (
              <tr key={player.id} className="bg-ink/20 hover:bg-paper/6">
                <td className="px-3 py-3">
                  <div className="font-bold text-paper">{player.nick}</div>
                  <div className="text-xs text-paper/52">
                    {player.name} · {player.nationality}
                  </div>
                </td>
                <td className="px-3 py-3 text-paper/75">{player.position}</td>
                <td className="px-3 py-3 text-paper/75">{player.age}</td>
                <td className="px-3 py-3 font-black text-mint">{player.overall}</td>
                <td className="px-3 py-3 text-sky">{player.potential}</td>
                <td className="px-3 py-3">{player.morale}</td>
                <td className="px-3 py-3">{player.form}</td>
                <td className="px-3 py-3">{formatMoney(player.weeklySalary)}</td>
                <td className="px-3 py-3">{formatMoney(player.marketValue)}</td>
                <td className="px-3 py-3">
                  <span className="rounded-md border border-paper/12 bg-paper/8 px-2 py-1 text-xs text-paper/72">
                    {isStarter
                      ? "Titular"
                      : player.status === "free-agent"
                        ? "Livre"
                        : "Reserva"}
                  </span>
                </td>
                {action ? (
                  <td className="px-3 py-3 text-right">
                    <button
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-paper/8 text-paper transition hover:border-mint hover:text-mint disabled:cursor-not-allowed disabled:opacity-40"
                      type="button"
                      title={action === "hire" ? "Contratar" : "Alterar titularidade"}
                      disabled={disabled}
                      onClick={() => onAction?.(player.id)}
                    >
                      {action === "hire" ? <UserPlus size={17} /> : <ArrowUpDown size={17} />}
                    </button>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
