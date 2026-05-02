import type { RealPlayer } from "../../types/RealPlayer";
import type { RealTeam } from "../../types/RealTeam";

export function RealPlayerTable({
  players,
  teams,
}: {
  players: RealPlayer[];
  teams: RealTeam[];
}) {
  const teamById = new Map(teams.map((team) => [team.id, team]));

  return (
    <div className="thin-scrollbar overflow-x-auto rounded-lg border border-line/80">
      <table className="min-w-[1100px] w-full border-collapse text-left text-sm">
        <thead className="bg-paper/8 text-xs uppercase text-paper/55">
          <tr>
            <th className="px-3 py-3">Nick</th>
            <th className="px-3 py-3">Time</th>
            <th className="px-3 py-3">Pais</th>
            <th className="px-3 py-3">Role</th>
            <th className="px-3 py-3">Rating</th>
            <th className="px-3 py-3">OVR</th>
            <th className="px-3 py-3">Pot.</th>
            <th className="px-3 py-3">Aim</th>
            <th className="px-3 py-3">Clutch</th>
            <th className="px-3 py-3">Mental</th>
            <th className="px-3 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line/60">
          {players.map((player) => (
            <tr key={player.id} className="bg-ink/20 hover:bg-paper/6">
              <td className="px-3 py-3 font-black">{player.nickname}</td>
              <td className="px-3 py-3">{player.teamId ? teamById.get(player.teamId)?.name ?? player.teamId : "Livre"}</td>
              <td className="px-3 py-3">{player.nationality}</td>
              <td className="px-3 py-3">{player.role}</td>
              <td className="px-3 py-3">{player.rating?.toFixed(2) ?? "-"}</td>
              <td className="px-3 py-3 text-mint font-black">{player.overall}</td>
              <td className="px-3 py-3 text-sky">{player.potential}</td>
              <td className="px-3 py-3">{player.aim}</td>
              <td className="px-3 py-3">{player.clutch}</td>
              <td className="px-3 py-3">{player.mental}</td>
              <td className="px-3 py-3">{player.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
