import { ArrowLeft, Check, Shield } from "lucide-react";
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
  const [teamId, setTeamId] = useState(teams[0]?.id ?? "");
  const createNewCareer = useGameStore((state) => state.createNewCareer);
  const goToMenu = useGameStore((state) => state.goToMenu);
  const selectedTeam = teams.find((team) => team.id === teamId);
  const canCreate = managerName.trim().length >= 2 && Boolean(teamId);

  return (
    <main className="app-shell min-h-screen px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <button
          className="inline-flex items-center gap-2 rounded-md border border-line bg-paper/8 px-3 py-2 text-sm font-bold text-paper hover:border-mint hover:text-mint"
          type="button"
          onClick={goToMenu}
        >
          <ArrowLeft size={17} />
          Menu
        </button>

        <section className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="panel rounded-lg p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-md bg-mint text-ink">
                <Shield size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-paper/52">
                  Criacao de carreira
                </p>
                <h1 className="text-2xl font-black">Seu comando</h1>
              </div>
            </div>

            <label className="mt-6 block">
              <span className="text-sm font-bold text-paper/75">Nome do manager</span>
              <input
                className="mt-2 h-11 w-full rounded-md border border-line bg-ink/50 px-3 text-paper outline-none transition focus:border-mint"
                value={managerName}
                onChange={(event) => setManagerName(event.target.value)}
                placeholder="Ex.: Ana Coach"
              />
            </label>

            <div className="mt-5">
              <span className="text-sm font-bold text-paper/75">Dificuldade</span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {difficulties.map((item) => (
                  <button
                    key={item}
                    className={`h-10 rounded-md border px-2 text-sm font-black transition ${
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

            {selectedTeam ? (
              <div className="mt-6 rounded-lg border border-line/70 bg-ink/28 p-4">
                <div className="flex items-center gap-3">
                  <TeamBadge team={selectedTeam} size="lg" />
                  <div>
                    <p className="text-xl font-black">{selectedTeam.name}</p>
                    <p className="text-sm text-paper/58">
                      Reputacao {selectedTeam.reputation} · Torcida{" "}
                      {selectedTeam.fans.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <button
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-mint px-4 font-black text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              type="button"
              disabled={!canCreate}
              onClick={() => createNewCareer({ managerName, difficulty, teamId })}
            >
              <Check size={18} />
              Iniciar carreira
            </button>
          </aside>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {teams.map((team) => (
              <button
                key={team.id}
                className={`flex min-h-32 items-start gap-4 rounded-lg border p-4 text-left transition ${
                  team.id === teamId
                    ? "border-mint bg-mint/12"
                    : "border-line bg-panel/68 hover:border-sky"
                }`}
                type="button"
                onClick={() => setTeamId(team.id)}
              >
                <TeamBadge team={team} size="lg" />
                <span>
                  <span className="block text-lg font-black">{team.name}</span>
                  <span className="mt-2 block text-sm text-paper/62">
                    Caixa inicial {team.money.toLocaleString("pt-BR")} · Entrosamento{" "}
                    {team.synergy}
                  </span>
                </span>
              </button>
            ))}
          </section>
        </section>
      </div>
    </main>
  );
}
