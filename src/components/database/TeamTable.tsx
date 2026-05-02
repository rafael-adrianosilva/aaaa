import { TeamBadge } from "../TeamBadge";
import type { RankingEntry } from "../../types/Ranking";
import type { RealTeam } from "../../types/RealTeam";

export function TeamTable({
  teams,
  rankings,
}: {
  teams: RealTeam[];
  rankings: RankingEntry[];
}) {
  const rankingByTeam = new Map(rankings.map((entry) => [entry.teamId, entry]));

  return (
    <div className="thin-scrollbar overflow-x-auto rounded-lg border border-line/80">
      <table className="min-w-[920px] w-full border-collapse text-left text-sm">
        <thead className="bg-paper/8 text-xs uppercase text-paper/55">
          <tr>
            <th className="px-3 py-3">Time</th>
            <th className="px-3 py-3">Pais</th>
            <th className="px-3 py-3">Regiao</th>
            <th className="px-3 py-3">Global</th>
            <th className="px-3 py-3">Regional</th>
            <th className="px-3 py-3">VRS</th>
            <th className="px-3 py-3">Fans</th>
            <th className="px-3 py-3">Moral</th>
            <th className="px-3 py-3">Coach</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line/60">
          {teams.map((team) => {
            const ranking = rankingByTeam.get(team.id);

            return (
              <tr key={team.id} className="bg-ink/20 hover:bg-paper/6">
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <TeamBadge
                      team={{
                        id: team.id,
                        name: team.name,
                        tag: team.name,
                        crest: team.name.slice(0, 2).toUpperCase(),
                        color: "#1ad8a1",
                        money: team.budget,
                        fans: team.fanbase,
                        reputation: team.reputation,
                        synergy: team.currentForm,
                      }}
                      size="sm"
                    />
                    <span className="font-bold">{team.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3">{team.country}</td>
                <td className="px-3 py-3">{team.region}</td>
                <td className="px-3 py-3 font-black text-mint">
                  #{ranking?.globalRank ?? team.rankingGlobal ?? "-"}
                </td>
                <td className="px-3 py-3">#{ranking?.regionalRank ?? team.rankingRegional ?? "-"}</td>
                <td className="px-3 py-3">{team.valvePoints ?? 0}</td>
                <td className="px-3 py-3">{team.fanbase.toLocaleString("pt-BR")}</td>
                <td className="px-3 py-3">{team.morale}</td>
                <td className="px-3 py-3">{team.coach ?? "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
