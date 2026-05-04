import {
  ArrowUpCircle,
  GraduationCap,
  Sparkles,
  Trash2,
  TrendingUp,
  Zap,
} from "lucide-react";
import { ACADEMY_CONFIGS, RARITY_COLORS } from "../types/Academy";
import type { AcademyRarity } from "../types/Academy";
import { useGameStore } from "../store/gameStore";

export function AcademyPage() {
  const teams = useGameStore((s) => s.teams);
  const players = useGameStore((s) => s.players);
  const career = useGameStore((s) => s.career);
  const promotePlayer = useGameStore((s) => s.promoteAcademyPlayer);
  const dismissPlayer = useGameStore((s) => s.dismissAcademyPlayer);
  const upgradeAcademy = useGameStore((s) => s.upgradeAcademy);
  const generateTalents = useGameStore((s) => s.generateTalents);

  const teamId = career?.userTeamId;
  const team = teams.find((t) => t.id === teamId);
  if (!team) return <p className="text-paper/50">Selecione um time primeiro.</p>;

  const academyPlayers = players.filter((p) => p.teamId === team.id && p.status === "Academy");
  const config = ACADEMY_CONFIGS[team.academyLevel];
  const canUpgrade = team.academyLevel < 5;
  const nextConfig = canUpgrade ? ACADEMY_CONFIGS[(team.academyLevel + 1) as 1|2|3|4|5] : null;

  return (
    <div className="grid gap-5">
      {/* Header stats */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatBox icon={<GraduationCap />} label="Nível Academy" value={config.label} accent="mint" />
        <StatBox icon={<Sparkles />} label="Jogadores" value={`${academyPlayers.length} / ${config.maxPlayers}`} accent="sky" />
        <StatBox icon={<Zap />} label="Bônus Raridade" value={`+${config.rarityBonus}%`} accent="amber" />
        <StatBox icon={<TrendingUp />} label="Custo Mensal" value={`R$ ${config.monthlyCost.toLocaleString("pt-BR")}`} accent="coral" />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          className="control-button bg-mint/10 hover:bg-mint/20"
          onClick={() => generateTalents?.()}
          type="button"
          disabled={academyPlayers.length >= config.maxPlayers}
        >
          <Sparkles size={16} /> Gerar Talentos
        </button>
        {canUpgrade && nextConfig && (
          <button
            className="control-button bg-amber/10 hover:bg-amber/20"
            onClick={() => upgradeAcademy?.()}
            type="button"
            disabled={team.budget < nextConfig.upgradeCost}
          >
            <ArrowUpCircle size={16} /> Melhorar Academy (R$ {nextConfig.upgradeCost.toLocaleString("pt-BR")})
          </button>
        )}
      </div>

      {/* Players table */}
      <div className="thin-scrollbar overflow-x-auto rounded-lg border border-line/80">
        <table className="min-w-[900px] w-full border-collapse text-left text-sm">
          <thead className="bg-paper/8 text-xs uppercase text-paper/55">
            <tr>
              <th className="px-3 py-3">Jogador</th>
              <th className="px-3 py-3">Idade</th>
              <th className="px-3 py-3">Função</th>
              <th className="px-3 py-3">OVR</th>
              <th className="px-3 py-3">POT</th>
              <th className="px-3 py-3">Raridade</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Moral</th>
              <th className="px-3 py-3">Forma</th>
              <th className="px-3 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/50">
            {academyPlayers.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-3 py-8 text-center text-paper/40">
                  Nenhum jogador na Academy. Clique em "Gerar Talentos" para revelar novos talentos.
                </td>
              </tr>
            ) : (
              academyPlayers
                .sort((a, b) => b.potential - a.potential)
                .map((p) => (
                  <tr key={p.id} className="bg-ink/20 hover:bg-ink/40 transition">
                    <td className="px-3 py-3">
                      <div>
                        <span className="font-bold text-paper">{p.nickname}</span>
                        <span className="ml-2 text-xs text-paper/40">{p.nationality}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">{p.age ?? "?"}</td>
                    <td className="px-3 py-3 text-xs font-bold">{p.role}</td>
                    <td className="px-3 py-3 font-black text-paper">{p.overall}</td>
                    <td className="px-3 py-3 font-black text-mint">{p.potential}</td>
                    <td className="px-3 py-3">
                      <RarityBadge rarity={p.rarity ?? "Common"} />
                    </td>
                    <td className="px-3 py-3 text-xs">{p.developmentStatus ?? "-"}</td>
                    <td className="px-3 py-3">{p.morale}</td>
                    <td className="px-3 py-3">{p.form}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1">
                        <button
                          className="rounded border border-mint/50 bg-mint/10 px-2 py-1 text-xs font-bold text-mint hover:bg-mint/20"
                          onClick={() => promotePlayer?.(p.id)}
                          type="button"
                          title="Promover ao elenco principal"
                        >
                          Promover
                        </button>
                        <button
                          className="rounded border border-coral/50 bg-coral/10 px-2 py-1 text-xs font-bold text-coral hover:bg-coral/20"
                          onClick={() => dismissPlayer?.(p.id)}
                          type="button"
                          title="Dispensar jogador"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RarityBadge({ rarity }: { rarity: AcademyRarity }) {
  return (
    <span
      className="inline-block rounded-full px-2 py-0.5 text-xs font-black"
      style={{ color: RARITY_COLORS[rarity], borderColor: RARITY_COLORS[rarity], border: "1px solid" }}
    >
      {rarity}
    </span>
  );
}

function StatBox({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent: string }) {
  return (
    <div className="panel flex items-center gap-3 rounded-lg p-4">
      <div className={`grid h-10 w-10 place-items-center rounded-md bg-${accent}/15 text-${accent}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase text-paper/50">{label}</p>
        <p className="text-lg font-black">{value}</p>
      </div>
    </div>
  );
}
