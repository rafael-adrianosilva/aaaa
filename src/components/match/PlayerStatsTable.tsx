import type { RoundResult } from "../../types/Round";
import type { RealPlayer } from "../../types/RealPlayer";

export function PlayerStatsTable({
  players,
  rounds,
}: {
  players: RealPlayer[];
  rounds: RoundResult[];
}) {
  const mvpCounts = new Map<string, number>();

  for (const round of rounds) {
    mvpCounts.set(round.mvpPlayerId, (mvpCounts.get(round.mvpPlayerId) ?? 0) + 1);
  }

  return (
    <div className="thin-scrollbar overflow-x-auto rounded-lg border border-line/80">
      <table className="min-w-[680px] w-full border-collapse text-left text-sm">
        <thead className="bg-paper/8 text-xs uppercase text-paper/55">
          <tr>
            <th className="px-3 py-3">Jogador</th>
            <th className="px-3 py-3">Role</th>
            <th className="px-3 py-3">MVP rounds</th>
            <th className="px-3 py-3">Aim</th>
            <th className="px-3 py-3">Clutch</th>
            <th className="px-3 py-3">Mental</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line/60">
          {players.map((player) => (
            <tr key={player.id} className="bg-ink/20">
              <td className="px-3 py-3 font-black">{player.nickname}</td>
              <td className="px-3 py-3">{player.role}</td>
              <td className="px-3 py-3 text-mint">{mvpCounts.get(player.id) ?? 0}</td>
              <td className="px-3 py-3">{player.aim}</td>
              <td className="px-3 py-3">{player.clutch}</td>
              <td className="px-3 py-3">{player.mental}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
