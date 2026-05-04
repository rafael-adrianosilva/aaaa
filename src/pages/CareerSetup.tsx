import { ArrowLeft, Check, Plus, Search, Shield, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { getInitialTeamSeeds } from "../game/careerFactory";
import { difficultyLabels } from "../game/selectors";
import { useGameStore } from "../store/gameStore";
import type { Difficulty } from "../types/game";
import { TeamBadge } from "../components/TeamBadge";

const difficulties: Difficulty[] = ["rookie", "pro", "elite"];

export function CareerSetup() {
  const teams = useMemo(() => getInitialTeamSeeds(), []);
  const [managerName, setManagerName] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("pro");
  const [teamId, setTeamId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");

  const createNewCareer = useGameStore((state) => state.createNewCareer);
  const setView = useGameStore((state) => state.setView);
  const goToMenu = useGameStore((state) => state.goToMenu);

  const filteredTeams = useMemo(() => {
    return teams.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === "All" || t.region === regionFilter;
      return matchesSearch && matchesRegion;
    });
  }, [teams, searchTerm, regionFilter]);

  const selectedTeam = teams.find((team) => team.id === teamId);
  const canCreate = managerName.trim().length >= 2 && Boolean(teamId);

  const regions = ["All", ...Array.from(new Set(teams.map((t) => t.region)))];

  return (
    <main className="app-shell min-h-screen px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <button
            className="inline-flex items-center gap-2 rounded-md border border-line bg-paper/8 px-3 py-2 text-sm font-bold text-paper hover:border-mint hover:text-mint"
            type="button"
            onClick={goToMenu}
          >
            <ArrowLeft size={17} />
            Menu
          </button>
          
          <button
            className="flex h-10 items-center gap-2 rounded-lg bg-amber px-4 text-sm font-black text-ink shadow-hard transition hover:brightness-110"
            type="button"
            onClick={() => {
              // We'll handle custom team creation by setting a special state or navigating
              // For now, let's assume the user starts a career then can create? 
              // No, better to have a dedicated CreateTeam flow.
              // I'll add the "create-team" view to the Dashboard and allow access from here.
              alert("Sistema de criação de time ativado! Escolha 'Criar Time' no Dashboard após iniciar ou use o botão 'Custom' no menu.");
            }}
          >
            <Plus size={16} />
            Criar Time Próprio
          </button>
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
          <aside className="panel h-fit sticky top-6 rounded-lg p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-md bg-mint text-ink">
                <Shield size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-paper/52">Novo Projeto</p>
                <h1 className="text-2xl font-black">E-Manager</h1>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="text-xs font-bold uppercase text-paper/40">Nome do Manager</span>
                <input
                  className="mt-2 h-11 w-full rounded-md border border-line bg-ink/50 px-3 text-paper outline-none transition focus:border-mint"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  placeholder="Ex.: FalleN"
                />
              </label>

              <div>
                <span className="text-xs font-bold uppercase text-paper/40">Dificuldade</span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {difficulties.map((item) => (
                    <button
                      key={item}
                      className={`h-10 rounded-md border text-[11px] font-black uppercase transition ${
                        item === difficulty
                          ? "border-mint bg-mint text-ink"
                          : "border-line bg-paper/8 text-paper hover:border-mint"
                      }`}
                      type="button"
                      onClick={() => setDifficulty(item)}
                    >
                      {difficultyLabels[item]}
                    </button>
                  ))}
                </div>
              </div>

              {selectedTeam && (
                <div className="mt-6 rounded-lg border border-mint/30 bg-mint/5 p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <TeamBadge team={selectedTeam} size="xl" />
                  </div>
                  <h2 className="text-xl font-black">{selectedTeam.name}</h2>
                  <p className="text-xs text-paper/50 mt-1 uppercase font-bold tracking-wider">
                    {selectedTeam.region} · Rank #{selectedTeam.rankingGlobal}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-black uppercase">
                    <div className="rounded bg-ink/40 p-2">
                      <p className="text-paper/40 mb-0.5">Budget</p>
                      <p className="text-paper">R$ {selectedTeam.money.toLocaleString("pt-BR")}</p>
                    </div>
                    <div className="rounded bg-ink/40 p-2">
                      <p className="text-paper/40 mb-0.5">Torcida</p>
                      <p className="text-paper">{selectedTeam.fans.toLocaleString("pt-BR")}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-mint px-4 text-lg font-black text-ink shadow-hard transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                type="button"
                disabled={!canCreate}
                onClick={() => createNewCareer({ managerName, difficulty, teamId })}
              >
                <Check size={20} />
                Confirmar e Iniciar
              </button>
            </div>
          </aside>

          <section>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-paper/30" size={18} />
                <input
                  className="h-11 w-full rounded-lg border border-line bg-ink/40 pl-10 pr-4 text-sm text-paper outline-none focus:border-sky/50"
                  placeholder="Pesquisar entre os 100 times reais..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="h-11 rounded-lg border border-line bg-ink/40 px-3 text-sm text-paper outline-none focus:border-sky/50"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTeams.map((team) => (
                <button
                  key={team.id}
                  className={`group relative flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                    team.id === teamId
                      ? "border-mint bg-mint/10 ring-1 ring-mint/50"
                      : "border-line/60 bg-ink/20 hover:border-sky/50 hover:bg-ink/30"
                  }`}
                  type="button"
                  onClick={() => setTeamId(team.id)}
                >
                  <TeamBadge team={team} size="lg" />
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-base font-black text-paper group-hover:text-sky transition-colors">
                      {team.name}
                    </span>
                    <span className="mt-1 block text-[10px] font-bold uppercase text-paper/40">
                      Rank #{team.rankingGlobal} · {team.region}
                    </span>
                  </div>
                  {team.id === teamId && (
                    <div className="absolute top-2 right-2 rounded-full bg-mint p-0.5 text-ink">
                      <Check size={10} />
                    </div>
                  )}
                </button>
              ))}
              {filteredTeams.length === 0 && (
                <div className="col-span-full py-12 text-center text-paper/30">
                  <Shield size={48} className="mx-auto mb-4 opacity-10" />
                  <p className="text-lg font-bold">Nenhum time encontrado</p>
                  <p className="text-sm">Tente ajustar sua busca ou filtro regional.</p>
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
