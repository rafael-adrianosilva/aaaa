import { CalendarDays, Play, Shield, Swords, Trophy, Zap } from "lucide-react";
import { useGameStore } from "../store/gameStore";
import { getNextFixture, getOpponentForFixture, getUserTeam, getTeam } from "../game/selectors";
import { TeamBadge } from "../components/TeamBadge";

export function PreGame() {
  const career = useGameStore((s) => s.career);
  const playNextMatch = useGameStore((s) => s.playNextMatch);
  const startVeto = useGameStore((s) => s.startVeto);
  const setView = useGameStore((s) => s.setView);

  if (!career) return null;

  const userTeam = getUserTeam(career);
  const fixture = getNextFixture(career);
  const opponent = getOpponentForFixture(career, fixture);

  if (!userTeam || !opponent || !fixture) {
    return (
      <div className="panel flex flex-col items-center justify-center rounded-lg p-12 text-center">
        <CalendarDays size={48} className="mb-4 text-paper/20" />
        <h3 className="text-xl font-bold">Nenhuma partida agendada</h3>
        <p className="text-paper/50">Aguarde a próxima rodada ou o início de um novo torneio.</p>
        <button 
          className="mt-6 rounded-md bg-paper/10 px-4 py-2 font-bold hover:bg-paper/20"
          onClick={() => setView("overview")}
        >
          Voltar ao Dashboard
        </button>
      </div>
    );
  }

  const userMapPool = userTeam.mapPoolStrengths;
  const opponentMapPool = opponent.mapPoolStrengths;
  const maps = Object.keys(userMapPool);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="panel overflow-hidden rounded-xl border border-line/80 shadow-2xl">
        {/* Match Header */}
        <div className="bg-ink/40 p-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2 text-xs font-black uppercase text-mint tracking-widest">
            <Trophy size={14} />
            Campeonato Pro Series · Rodada {career.currentRound}
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-4">
              <TeamBadge team={userTeam} size="xl" />
              <div className="text-center">
                <h2 className="text-2xl font-black">{userTeam.name}</h2>
                <p className="text-sm text-paper/50">Rank #{userTeam.rankingGlobal}</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-4xl font-black italic text-paper/20">VS</span>
              <div className="mt-4 rounded-full bg-ink/60 px-3 py-1 text-[10px] font-bold uppercase text-paper/40">
                MD3
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <TeamBadge team={opponent} size="xl" />
              <div className="text-center">
                <h2 className="text-2xl font-black">{opponent.name}</h2>
                <p className="text-sm text-paper/50">Rank #{opponent.rankingGlobal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Strength Comparison */}
        <div className="p-6 md:p-8">
          <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase text-paper/40">
            <Swords size={16} /> Comparativo de Mapas
          </h3>
          
          <div className="grid gap-3">
            {maps.map((mapId) => (
              <div key={mapId} className="group flex items-center gap-4 rounded-lg border border-line/40 bg-ink/20 p-3 transition hover:border-mint/30">
                <div className="w-20 text-xs font-black uppercase text-paper/60">{mapId}</div>
                
                <div className="relative flex-1 h-3 rounded-full bg-ink/60 overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-1/2 -translate-x-full bg-mint/60 transition-all group-hover:bg-mint"
                    style={{ width: `${(userMapPool[mapId] / 100) * 50}%` }}
                  />
                  <div 
                    className="absolute inset-y-0 left-1/2 bg-coral/60 transition-all group-hover:bg-coral"
                    style={{ width: `${(opponentMapPool[mapId] / 100) * 50}%` }}
                  />
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-paper/20" />
                </div>

                <div className="flex w-24 justify-between text-[10px] font-black">
                  <span className="text-mint">{userMapPool[mapId]}%</span>
                  <span className="text-coral">{opponentMapPool[mapId]}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <button
              className="flex h-14 items-center justify-center gap-3 rounded-xl border border-mint/50 bg-mint/10 text-lg font-black text-mint transition hover:bg-mint/20"
              onClick={() => startVeto()}
              type="button"
            >
              <Swords size={20} />
              Entrar no Veto
            </button>
            
            <button
              className="flex h-14 items-center justify-center gap-3 rounded-xl bg-coral text-lg font-black text-ink shadow-hard transition hover:brightness-110"
              onClick={() => playNextMatch()}
              type="button"
            >
              <Zap size={20} />
              Simular Resultado
            </button>
          </div>
          
          <p className="mt-4 text-center text-xs text-paper/30 uppercase font-bold tracking-tight">
            Selecione "Entrar no Veto" para escolher mapas e acompanhar a partida round-a-round.
          </p>
        </div>
      </div>
    </div>
  );
}
