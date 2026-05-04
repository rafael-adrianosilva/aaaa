import { Check, ChevronRight, Home, Share2, Trophy, Users } from "lucide-react";
import { useGameStore } from "../store/gameStore";
import { TeamBadge } from "../components/TeamBadge";

export function SeriesResultPage() {
  const latestResult = useGameStore((s) => s.latestSeriesResult);
  const finishSeries = useGameStore((s) => s.finishSeries);
  const setView = useGameStore((s) => s.setView);
  const teams = useGameStore((s) => s.teams);
  const players = useGameStore((s) => s.players);

  if (!latestResult) return null;

  const teamA = teams.find(t => t.id === latestResult.teamAId);
  const teamB = teams.find(t => t.id === latestResult.teamBId);
  const winner = latestResult.winnerTeamId === teamA?.id ? teamA : teamB;
  const isUserWinner = winner?.id === useGameStore.getState().career?.userTeamId;

  // Consolidate stats from all maps
  const allStats = latestResult.maps.flatMap(m => m.playerStats || []);
  const uniquePlayerIds = Array.from(new Set(allStats.map(s => s.playerId)));

  const consolidatedStats = uniquePlayerIds.map(pid => {
    const pStats = allStats.filter(s => s.playerId === pid);
    const p = players.find(player => player.id === pid);
    return {
      nickname: p?.nickname || "Player",
      teamId: p?.teamId,
      kills: pStats.reduce((sum, s) => sum + s.kills, 0),
      deaths: pStats.reduce((sum, s) => sum + s.deaths, 0),
      rating: Number((pStats.reduce((sum, s) => sum + s.rating, 0) / pStats.length).toFixed(2)),
      adr: Math.round(pStats.reduce((sum, s) => sum + s.adr, 0) / pStats.length)
    };
  }).sort((a, b) => b.rating - a.rating);

  const mvp = consolidatedStats[0];

  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-in fade-in zoom-in-95 duration-700">
      {/* Victory/Defeat Banner */}
      <div className={`panel overflow-hidden rounded-3xl border-2 ${isUserWinner ? 'border-mint bg-mint/5' : 'border-coral/50 bg-coral/5 shadow-2xl'}`}>
        <div className="flex flex-col items-center p-10 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink p-2 rounded-full border border-line">
            <Trophy size={48} className={isUserWinner ? 'text-amber' : 'text-paper/20'} />
          </div>

          <h1 className={`mt-4 text-5xl font-black italic uppercase tracking-tighter ${isUserWinner ? 'text-mint' : 'text-coral'}`}>
            {isUserWinner ? 'Vitória Dominante' : 'Derrota Amarga'}
          </h1>
          <p className="mt-2 text-paper/40 font-bold uppercase tracking-widest text-sm">
            Final da Série · Pro Series 2026
          </p>

          <div className="mt-10 flex items-center justify-center gap-12">
            <div className="flex flex-col items-center gap-4">
              <TeamBadge team={teamA!} size="xl" />
              <p className="text-xl font-black">{teamA?.name}</p>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="text-7xl font-black tabular-nums">{latestResult.scoreA}</span>
              <span className="text-3xl font-black text-paper/10">/</span>
              <span className="text-7xl font-black tabular-nums">{latestResult.scoreB}</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <TeamBadge team={teamB!} size="xl" />
              <p className="text-xl font-black">{teamB?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        {/* Consolidated Stats */}
        <div className="panel rounded-3xl overflow-hidden border border-line/60 bg-ink/20">
          <div className="bg-ink/40 px-8 py-5 border-b border-line/40 flex justify-between items-center">
            <h3 className="text-xs font-black uppercase text-paper/40 tracking-widest flex items-center gap-2">
              <Users size={16} /> Estatísticas da Série
            </h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-ink/10 text-[10px] uppercase font-black text-paper/20">
              <tr>
                <th className="px-8 py-4">Jogador</th>
                <th className="px-8 py-4 text-center">K/D</th>
                <th className="px-8 py-4 text-center">ADR</th>
                <th className="px-8 py-4 text-center">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/10">
              {consolidatedStats.map((s, idx) => (
                <tr key={idx} className="hover:bg-ink/40 transition">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      {idx === 0 && <span className="text-amber">★</span>}
                      <span className={`font-black ${s.teamId === teamA?.id ? 'text-mint' : 'text-coral'}`}>
                        {s.nickname}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center font-bold tabular-nums">
                    {s.kills} / <span className="text-paper/40">{s.deaths}</span>
                  </td>
                  <td className="px-8 py-5 text-center text-paper/60 font-black">{s.adr}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-black ${s.rating > 1.2 ? 'bg-mint text-ink' : 'bg-ink/60 text-paper/60'}`}>
                      {s.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MVP Card & Actions */}
        <div className="space-y-6">
          <div className="panel rounded-3xl p-8 border border-amber/30 bg-amber/5 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xs font-black uppercase text-amber tracking-[0.3em] mb-6">Match MVP</h3>
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto rounded-full bg-amber/20 border-2 border-amber/40 grid place-items-center mb-4">
                <span className="text-3xl font-black text-amber">{mvp?.nickname[0]}</span>
              </div>
              <p className="text-2xl font-black text-paper">{mvp?.nickname}</p>
              <p className="text-xs text-paper/40 font-bold mt-1">Impacto Absoluto</p>

              <div className="mt-6 pt-6 border-t border-amber/10 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase text-amber/40">Kills</p>
                  <p className="text-xl font-black text-paper">{mvp?.kills}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-amber/40">Rating</p>
                  <p className="text-xl font-black text-paper">{mvp?.rating}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-mint font-black text-ink shadow-hard hover:brightness-110 active:scale-95 transition"
            onClick={() => setView("overview")}
          >
            <Home size={20} /> Continuar para Dashboard
          </button>

          <button
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-line/60 bg-ink/40 text-xs font-black uppercase hover:bg-ink/60 transition"
          >
            <Share2 size={16} /> Compartilhar Resultados
          </button>
        </div>
      </div>
    </div>
  );
}
