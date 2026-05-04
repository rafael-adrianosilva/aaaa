import { useState } from "react";
import { Dumbbell, Flame, TrendingUp, Zap } from "lucide-react";
import { TRAINING_DEFINITIONS } from "../types/Training";
import type { TrainingType } from "../types/Training";
import { getProgressToNextOverall } from "../game/trainingManager";
import { useGameStore } from "../store/gameStore";

export function TrainingPage() {
  const players = useGameStore((s) => s.players);
  const career = useGameStore((s) => s.career);
  const trainIndividual = useGameStore((s) => s.trainIndividual);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const teamId = career?.userTeamId;
  const teamPlayers = players.filter(
    (p) => p.teamId === teamId && (p.status === "Starter" || p.status === "Substitute" || p.status === "Academy")
  );

  const selected = teamPlayers.find((p) => p.id === selectedPlayer);

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
      {/* Player list */}
      <div className="thin-scrollbar overflow-x-auto rounded-lg border border-line/80">
        <table className="min-w-[800px] w-full border-collapse text-left text-sm">
          <thead className="bg-paper/8 text-xs uppercase text-paper/55">
            <tr>
              <th className="px-3 py-3">Jogador</th>
              <th className="px-3 py-3">Função</th>
              <th className="px-3 py-3">OVR</th>
              <th className="px-3 py-3">POT</th>
              <th className="px-3 py-3">Idade</th>
              <th className="px-3 py-3">Moral</th>
              <th className="px-3 py-3">Forma</th>
              <th className="px-3 py-3">Fadiga</th>
              <th className="px-3 py-3">Treino</th>
              <th className="px-3 py-3">Progresso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/50">
            {teamPlayers
              .sort((a, b) => b.overall - a.overall)
              .map((p) => {
                const progress = getProgressToNextOverall(p);
                const isSelected = selectedPlayer === p.id;
                return (
                  <tr
                    key={p.id}
                    className={`cursor-pointer transition ${isSelected ? "bg-mint/10" : "bg-ink/20 hover:bg-ink/40"}`}
                    onClick={() => setSelectedPlayer(p.id)}
                  >
                    <td className="px-3 py-3">
                      <span className="font-bold">{p.nickname}</span>
                      <span className="ml-1 text-xs text-paper/40">{p.status === "Academy" ? "🎓" : ""}</span>
                    </td>
                    <td className="px-3 py-3 text-xs font-bold">{p.role}</td>
                    <td className="px-3 py-3 font-black">{p.overall}</td>
                    <td className="px-3 py-3 font-black text-mint">{p.potential}</td>
                    <td className="px-3 py-3">{p.age ?? "?"}</td>
                    <td className="px-3 py-3">{p.morale}</td>
                    <td className="px-3 py-3">{p.form}</td>
                    <td className="px-3 py-3">
                      <FatigueBar value={p.fatigue} />
                    </td>
                    <td className="px-3 py-3 text-xs">
                      {p.trainingPlan
                        ? TRAINING_DEFINITIONS.find((d) => d.id === p.trainingPlan)?.label ?? "-"
                        : "-"}
                    </td>
                    <td className="px-3 py-3">
                      <ProgressBar value={progress} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Training panel */}
      <aside className="panel sticky top-4 self-start rounded-lg p-5">
        {selected ? (
          <>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-mint/15 text-mint font-black text-lg">
                {selected.overall}
              </div>
              <div>
                <p className="text-lg font-black">{selected.nickname}</p>
                <p className="text-xs text-paper/50">{selected.role} · {selected.nationality} · {selected.age} anos</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {[
                ["Aim", selected.aim],
                ["Reflex", selected.reflex],
                ["Mecânica", selected.mechanics],
                ["Game Sense", selected.gameSense],
                ["Utilitárias", selected.utility],
                ["Clutch", selected.clutch],
                ["Comunicação", selected.communication],
                ["Consistência", selected.consistency],
                ["Mental", selected.mental],
                ["Liderança", selected.leadership],
              ].map(([label, value]) => (
                <div key={label as string} className="flex justify-between rounded border border-line/40 bg-ink/30 px-2 py-1.5">
                  <span className="text-paper/55">{label}</span>
                  <span className="font-black">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-xs font-bold uppercase text-paper/50">Escolher Treino</p>
              <div className="mt-2 grid gap-1.5 max-h-[320px] overflow-y-auto thin-scrollbar">
                {TRAINING_DEFINITIONS.map((def) => {
                  const isCompatible = def.compatibleRoles.includes(selected.role);
                  return (
                    <button
                      key={def.id}
                      className={`flex items-start gap-2 rounded-md border p-2 text-left transition ${
                        selected.trainingPlan === def.id
                          ? "border-mint bg-mint/10"
                          : isCompatible
                            ? "border-line/50 bg-ink/20 hover:border-mint/50"
                            : "border-line/30 bg-ink/10 opacity-60 hover:opacity-80"
                      }`}
                      onClick={() => trainIndividual?.(selected.id, def.id)}
                      type="button"
                    >
                      <Dumbbell size={14} className={isCompatible ? "text-mint mt-0.5" : "text-paper/30 mt-0.5"} />
                      <div>
                        <p className="text-sm font-bold">{def.label} {isCompatible && <span className="text-mint text-xs">✓</span>}</p>
                        <p className="text-xs text-paper/45">{def.attributes.join(", ")}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="grid place-items-center py-12 text-center text-paper/40">
            <Dumbbell size={40} className="mb-3 opacity-30" />
            <p className="font-bold">Selecione um jogador</p>
            <p className="text-sm">Clique em um jogador na tabela para ver atributos e escolher treino individual.</p>
          </div>
        )}
      </aside>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="h-1.5 w-16 rounded-full bg-line/40">
        <div className="h-full rounded-full bg-mint transition-all" style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-paper/50">{value}%</span>
    </div>
  );
}

function FatigueBar({ value }: { value: number }) {
  const color = value >= 70 ? "bg-coral" : value >= 40 ? "bg-amber" : "bg-mint";
  return (
    <div className="flex items-center gap-1">
      <div className="h-1.5 w-10 rounded-full bg-line/40">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-paper/50">{value}</span>
    </div>
  );
}
