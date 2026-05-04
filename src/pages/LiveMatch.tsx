import { useEffect, useState, useRef, useMemo } from "react";
import { 
  ChevronRight, 
  FastForward, 
  Pause, 
  Play, 
  SkipForward, 
  Trophy, 
  Zap,
  Target,
  Shield,
  History
} from "lucide-react";
import { useGameStore } from "../store/gameStore";
import { TeamBadge } from "../components/TeamBadge";
import type { KillFeedEvent, PlayerMatchStats } from "../types/Round";
import { csMaps } from "../data/maps.cs";

export function LiveMatch() {
  const series = useGameStore((s) => s.currentSeries);
  const simulateNextRound = useGameStore((s) => s.simulateNextRound);
  const toggleAutoPlay = useGameStore((s) => s.toggleAutoPlay);
  const skipMap = useGameStore((s) => s.skipMap);
  const skipSeries = useGameStore((s) => s.skipSeries);
  const finishSeries = useGameStore((s) => s.finishSeries);
  const players = useGameStore((s) => s.players);
  const teams = useGameStore((s) => s.teams);

  const [visibleKills, setVisibleKills] = useState<KillFeedEvent[]>([]);

  if (!series) return (
    <div className="panel p-10 text-center rounded-xl border border-line/50">
      <p className="text-paper/40 font-bold">Nenhuma partida em andamento.</p>
    </div>
  );

  const currentMapIndex = series.currentMapIndex;
  const mapResult = series.result.maps[currentMapIndex];
  const rounds = mapResult?.rounds || [];
  const lastRound = rounds[rounds.length - 1];
  const isFinished = series.finished;
  
  const teamA = teams.find(t => t.id === series.result.teamAId);
  const teamB = teams.find(t => t.id === series.result.teamBId);
  const csMap = csMaps.find(m => m.id === mapResult?.mapId);

  // Kill Feed Animation
  useEffect(() => {
    if (lastRound?.killFeed) {
      setVisibleKills([]);
      let i = 0;
      const interval = setInterval(() => {
        if (i < lastRound.killFeed.length) {
          setVisibleKills(prev => [...prev, lastRound.killFeed[i]]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [rounds.length]);

  const getPlayerNickname = (id: string) => players.find(p => p.id === id)?.nickname || "Player";

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        {/* Scoreboard Header */}
        <div className="panel overflow-hidden rounded-2xl bg-ink/40 border border-line/60 shadow-2xl relative">
          {/* Map Background Overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-cover bg-center" style={{ backgroundImage: `url(/maps/${csMap?.id}.jpg)` }} />
          
          <div className="flex items-center justify-between p-6 md:p-10 relative z-10">
            <div className="flex flex-1 items-center gap-5">
              <div className="text-right">
                <p className="text-2xl font-black tracking-tight">{teamA?.name}</p>
                <p className="text-xs text-mint uppercase font-black">{lastRound?.sideTeamA || "T"}</p>
              </div>
              <TeamBadge team={teamA!} size="xl" />
            </div>

            <div className="flex flex-col items-center gap-2 px-10 text-center">
              <div className="flex items-baseline gap-5">
                <span className={`text-6xl font-black tabular-nums ${mapResult?.scoreA > mapResult?.scoreB ? 'text-mint' : 'text-paper'}`}>
                  {mapResult?.scoreA || 0}
                </span>
                <span className="text-3xl font-black text-paper/10">-</span>
                <span className={`text-6xl font-black tabular-nums ${mapResult?.scoreB > mapResult?.scoreA ? 'text-mint' : 'text-paper'}`}>
                  {mapResult?.scoreB || 0}
                </span>
              </div>
              <div className="rounded-full bg-mint/10 border border-mint/20 px-4 py-1 text-[10px] font-black uppercase text-mint tracking-[0.2em]">
                Round {rounds.length + 1}
              </div>
            </div>

            <div className="flex flex-1 items-center justify-end gap-5">
              <TeamBadge team={teamB!} size="xl" />
              <div className="text-left">
                <p className="text-2xl font-black tracking-tight">{teamB?.name}</p>
                <p className="text-xs text-coral uppercase font-black">{lastRound?.sideTeamB || "CT"}</p>
              </div>
            </div>
          </div>

          {/* Kill Feed Area */}
          <div className="h-44 bg-ink/40 p-5 relative overflow-hidden flex flex-col justify-end gap-1.5 border-t border-line/40 backdrop-blur-sm">
             {visibleKills.slice(-4).map((kill, idx) => (
               <div key={idx} className="flex items-center justify-end gap-3 text-xs font-bold animate-in slide-in-from-right-8 fade-in duration-500">
                  <span className={`px-2 py-0.5 rounded ${teamA?.id === findGlobalPlayer(kill.killerId, players)?.teamId ? 'bg-mint/10 text-mint' : 'bg-coral/10 text-coral'}`}>
                    {getPlayerNickname(kill.killerId)}
                  </span>
                  <div className="flex items-center gap-1.5 text-paper/30 scale-90">
                    {kill.isHeadshot && <Target size={14} className="text-amber animate-pulse" />}
                    <span className="uppercase text-[9px] tracking-tighter border border-paper/10 px-1 rounded">{kill.weapon}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded ${teamA?.id === findGlobalPlayer(kill.victimId, players)?.teamId ? 'bg-mint/10 text-mint' : 'bg-coral/10 text-coral'}`}>
                    {getPlayerNickname(kill.victimId)}
                  </span>
               </div>
             ))}
             {visibleKills.length === 0 && (
               <div className="absolute inset-0 grid place-items-center opacity-5">
                 <Zap size={80} className="text-paper" />
               </div>
             )}
          </div>
        </div>

        {/* Stats Table */}
        <div className="panel rounded-2xl overflow-hidden border border-line/60 shadow-xl bg-ink/20">
           <div className="bg-ink/40 px-6 py-4 border-b border-line/40 flex justify-between items-center">
              <h3 className="text-xs font-black uppercase text-paper/50 tracking-widest flex items-center gap-2">
                <Shield size={14} /> Performance Individual
              </h3>
              <span className="text-[10px] font-bold text-mint uppercase">Live Stats</span>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead className="bg-ink/20 text-[10px] uppercase font-black text-paper/30">
                  <tr>
                    <th className="px-6 py-4">Jogador</th>
                    <th className="px-6 py-4 text-center">K</th>
                    <th className="px-6 py-4 text-center">D</th>
                    <th className="px-6 py-4 text-center">A</th>
                    <th className="px-6 py-4 text-center">ADR</th>
                    <th className="px-6 py-4 text-center">Rating</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-line/10">
                  {/* Team A */}
                  <tr className="bg-mint/5"><td colSpan={6} className="px-6 py-1 text-[9px] font-black uppercase text-mint/60">{teamA?.name}</td></tr>
                  {players.filter(p => p.teamId === teamA?.id && p.status === "Starter").map(p => (
                    <PlayerRow key={p.id} player={p} rounds={rounds} />
                  ))}
                  {/* Team B */}
                  <tr className="bg-coral/5"><td colSpan={6} className="px-6 py-1 text-[9px] font-black uppercase text-coral/60">{teamB?.name}</td></tr>
                  {players.filter(p => p.teamId === teamB?.id && p.status === "Starter").map(p => (
                    <PlayerRow key={p.id} player={p} rounds={rounds} />
                  ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>

      {/* Sidebar Controls & Info */}
      <aside className="space-y-5">
        <div className="panel rounded-2xl p-6 border border-line/60 bg-ink/40 shadow-xl">
          <h3 className="text-[10px] font-black uppercase text-paper/30 mb-5 tracking-[0.2em]">Match Control</h3>
          
          <div className="grid gap-3">
             {!isFinished ? (
               <>
                <button 
                  className="flex h-14 items-center justify-center gap-3 rounded-xl bg-mint font-black text-ink hover:brightness-110 transition shadow-hard active:scale-95"
                  onClick={() => simulateNextRound()}
                >
                  <Play size={20} fill="currentColor" /> Próximo Round
                </button>
                <button 
                  className={`flex h-12 items-center justify-center gap-3 rounded-xl font-black transition border-2 ${series.autoPlay ? 'bg-amber border-amber text-ink' : 'bg-ink/60 border-line text-paper hover:border-mint'}`}
                  onClick={() => toggleAutoPlay()}
                >
                  {series.autoPlay ? <Pause size={18} fill="currentColor" /> : <FastForward size={18} />} 
                  {series.autoPlay ? 'Pausar Auto' : 'Auto-Play'}
                </button>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button 
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-line/60 text-[10px] font-black uppercase hover:bg-ink/60 transition"
                    onClick={() => skipMap()}
                  >
                    Pular Mapa
                  </button>
                  <button 
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-line/60 text-[10px] font-black uppercase hover:bg-ink/60 transition"
                    onClick={() => skipSeries()}
                  >
                    Simular Tudo
                  </button>
                </div>
               </>
             ) : (
               <button 
                className="flex h-16 items-center justify-center gap-3 rounded-2xl bg-coral font-black text-ink shadow-hard hover:brightness-110 transition animate-in zoom-in-95 duration-500"
                onClick={() => finishSeries()}
              >
                <Trophy size={24} /> Ver Resultados
              </button>
             )}
          </div>
        </div>

        {/* Round Log */}
        <div className="panel rounded-2xl p-6 border border-line/60 bg-ink/20 shadow-xl overflow-hidden flex flex-col h-[500px]">
           <h3 className="text-[10px] font-black uppercase text-paper/30 mb-5 tracking-[0.2em] flex items-center gap-2">
             <History size={14} /> Histórico de Rounds
           </h3>
           <div className="space-y-3 overflow-y-auto thin-scrollbar pr-2">
              {rounds.slice().reverse().map((r, i) => (
                <div key={i} className="group flex items-start gap-3 p-3.5 rounded-xl bg-ink/40 border border-line/10 hover:border-mint/30 transition">
                   <div className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 shadow-sm ${r.winnerTeamId === teamA?.id ? 'bg-mint' : 'bg-coral'}`} />
                   <div className="min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black text-paper/80 uppercase">Round {r.roundNumber}</span>
                        <span className="text-[9px] font-bold text-paper/30">{r.winCondition}</span>
                      </div>
                      <p className="text-xs text-paper/60 leading-relaxed truncate group-hover:whitespace-normal transition-all">{r.keyEvent}</p>
                   </div>
                </div>
              ))}
              {rounds.length === 0 && (
                <div className="py-10 text-center text-paper/20 italic text-sm">
                  Aguardando início...
                </div>
              )}
           </div>
        </div>
      </aside>
    </div>
  );
}

function PlayerRow({ player, rounds }: { player: any, rounds: any[] }) {
  // Logic to calculate live stats from rounds
  const stats = useMemo(() => {
    let k = 0, d = 0;
    rounds.forEach(r => {
      r.killFeed.forEach((f: any) => {
        if (f.killerId === player.id) k++;
        if (f.victimId === player.id) d++;
      });
    });
    const adr = 70 + (k * 4) - (d * 2);
    const rating = (0.8 + (k / (rounds.length || 1)) * 1.5).toFixed(2);
    return { k, d, adr, rating };
  }, [rounds, player.id]);

  return (
    <tr className="hover:bg-ink/40 transition">
      <td className="px-6 py-4 font-black">{player.nickname}</td>
      <td className="px-6 py-4 text-center font-black tabular-nums">{stats.k}</td>
      <td className="px-6 py-4 text-center text-paper/40 tabular-nums">{stats.d}</td>
      <td className="px-6 py-4 text-center text-paper/40 tabular-nums">{Math.floor(stats.k / 3)}</td>
      <td className="px-6 py-4 text-center font-bold text-paper/60">{stats.adr.toFixed(0)}</td>
      <td className={`px-6 py-4 text-center font-black ${Number(stats.rating) > 1.1 ? 'text-mint' : 'text-paper/40'}`}>{stats.rating}</td>
    </tr>
  );
}

function findGlobalPlayer(id: string, players: any[]) {
  return players.find(p => p.id === id);
}
