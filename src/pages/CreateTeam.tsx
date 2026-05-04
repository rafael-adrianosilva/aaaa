import { useState } from "react";
import {
  ChevronDown,
  Palette,
  Play,
  Shield,
  Star,
  Users,
} from "lucide-react";
import type { TeamTier, TeamCreationParams } from "../types/TeamCreation";
import { TIER_CONFIGS, COUNTRIES_BY_REGION } from "../types/TeamCreation";
import type { CSRegion } from "../types/RealTeam";
import { useGameStore } from "../store/gameStore";

const tiers: TeamTier[] = ["amateur", "regional", "national", "tier3", "tier2", "tier1", "elite"];
const regions: CSRegion[] = ["Brazil", "South America", "North America", "Europe", "CIS", "Asia", "Oceania", "Middle East"];

const tierColors: Record<TeamTier, string> = {
  amateur: "#9ca3af",
  regional: "#22c55e",
  national: "#3b82f6",
  tier3: "#8b5cf6",
  tier2: "#f59e0b",
  tier1: "#ef4444",
  elite: "#fbbf24",
};

export function CreateTeam() {
  const createCustomTeam = useGameStore((s) => s.createCustomTeam);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [country, setCountry] = useState("Brazil");
  const [region, setRegion] = useState<CSRegion>("Brazil");
  const [primaryColor, setPrimaryColor] = useState("#1ad8a1");
  const [secondaryColor, setSecondaryColor] = useState("#101012");
  const [managerName, setManagerName] = useState("");
  const [tier, setTier] = useState<TeamTier>("tier3");

  const config = TIER_CONFIGS[tier];
  const countries = COUNTRIES_BY_REGION[region] ?? ["Brazil"];

  const canCreate = name.trim().length >= 2 && tag.trim().length >= 2 && managerName.trim().length >= 2;

  const handleCreate = () => {
    if (!canCreate) return;
    const params: TeamCreationParams = {
      name: name.trim(),
      tag: tag.trim().toUpperCase(),
      country,
      region,
      primaryColor,
      secondaryColor,
      managerName: managerName.trim(),
      tier,
    };
    createCustomTeam(params);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
      {/* Form */}
      <div className="grid gap-5">
        <section className="panel rounded-lg p-5">
          <h3 className="flex items-center gap-2 text-xl font-black">
            <Shield className="text-mint" size={22} />
            Identidade do Time
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-xs font-bold uppercase text-paper/55">Nome do Time</span>
              <input
                className="h-11 rounded-md border border-line bg-ink/40 px-3 font-bold text-paper focus:border-mint focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Nova Era Gaming"
                maxLength={30}
              />
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-bold uppercase text-paper/55">Sigla / Tag</span>
              <input
                className="h-11 rounded-md border border-line bg-ink/40 px-3 font-bold text-paper uppercase focus:border-mint focus:outline-none"
                value={tag}
                onChange={(e) => setTag(e.target.value.toUpperCase())}
                placeholder="Ex: NEG"
                maxLength={5}
              />
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-bold uppercase text-paper/55">Nome do Manager</span>
              <input
                className="h-11 rounded-md border border-line bg-ink/40 px-3 font-bold text-paper focus:border-mint focus:outline-none"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                placeholder="Seu nome"
                maxLength={20}
              />
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-bold uppercase text-paper/55">Região</span>
              <div className="relative">
                <select
                  className="h-11 w-full appearance-none rounded-md border border-line bg-ink/40 px-3 pr-8 font-bold text-paper focus:border-mint focus:outline-none"
                  value={region}
                  onChange={(e) => {
                    const r = e.target.value as CSRegion;
                    setRegion(r);
                    const c = COUNTRIES_BY_REGION[r];
                    if (c?.[0]) setCountry(c[0]);
                  }}
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-3 text-paper/40" size={16} />
              </div>
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-bold uppercase text-paper/55">País</span>
              <div className="relative">
                <select
                  className="h-11 w-full appearance-none rounded-md border border-line bg-ink/40 px-3 pr-8 font-bold text-paper focus:border-mint focus:outline-none"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-3 text-paper/40" size={16} />
              </div>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1">
                <span className="flex items-center gap-1 text-xs font-bold uppercase text-paper/55">
                  <Palette size={12} /> Cor 1
                </span>
                <input type="color" className="h-11 w-full cursor-pointer rounded-md border border-line bg-ink/40" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
              </label>
              <label className="grid gap-1">
                <span className="flex items-center gap-1 text-xs font-bold uppercase text-paper/55">
                  <Palette size={12} /> Cor 2
                </span>
                <input type="color" className="h-11 w-full cursor-pointer rounded-md border border-line bg-ink/40" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
              </label>
            </div>
          </div>
        </section>

        {/* Tier selector */}
        <section className="panel rounded-lg p-5">
          <h3 className="flex items-center gap-2 text-xl font-black">
            <Star className="text-amber" size={22} />
            Nível Inicial
          </h3>
          <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {tiers.map((t) => {
              const c = TIER_CONFIGS[t];
              const selected = tier === t;
              return (
                <button
                  key={t}
                  className={`rounded-lg border-2 p-3 text-left transition ${
                    selected
                      ? "border-mint bg-mint/10"
                      : "border-line/60 bg-ink/30 hover:border-line"
                  }`}
                  onClick={() => setTier(t)}
                  type="button"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full" style={{ background: tierColors[t] }} />
                    <span className="font-black">{c.label}</span>
                  </div>
                  <p className="mt-1 text-xs text-paper/55">{c.description}</p>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Preview panel */}
      <aside className="panel sticky top-4 self-start rounded-lg p-5">
        <h3 className="flex items-center gap-2 text-lg font-black">
          <Users className="text-sky" size={20} />
          Preview
        </h3>

        <div className="mt-4 flex items-center gap-3">
          <div
            className="grid h-14 w-14 place-items-center rounded-lg text-xl font-black text-ink"
            style={{ background: primaryColor }}
          >
            {tag.slice(0, 2) || "??"}
          </div>
          <div>
            <p className="text-lg font-black">{name || "Nome do Time"}</p>
            <p className="text-sm text-paper/55">{tag || "TAG"} · {country}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-2 text-sm">
          {[
            ["Ranking Global", `${config.rankingGlobalRange[0]}–${config.rankingGlobalRange[1]}`],
            ["Orçamento", `${fmt(config.budgetRange[0])} – ${fmt(config.budgetRange[1])}`],
            ["Reputação", `${config.reputationRange[0]}–${config.reputationRange[1]}`],
            ["Torcida", `${fmtN(config.fanbaseRange[0])} – ${fmtN(config.fanbaseRange[1])}`],
            ["Overall Jogadores", `${config.playerOverallRange[0]}–${config.playerOverallRange[1]}`],
            ["Academy", `Nível ${config.academyQuality}`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between rounded-md border border-line/50 bg-ink/30 px-3 py-2">
              <span className="text-paper/60">{label}</span>
              <span className="font-bold">{value}</span>
            </div>
          ))}
        </div>

        <button
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-mint font-black text-ink transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={!canCreate}
          onClick={handleCreate}
          type="button"
        >
          <Play size={18} />
          Criar Time e Iniciar Carreira
        </button>
        {!canCreate && (
          <p className="mt-2 text-center text-xs text-coral">
            Preencha nome, sigla e nome do manager.
          </p>
        )}
      </aside>
    </div>
  );
}

function fmt(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);
}

function fmtN(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return `${n}`;
}
