import {
  CreditCard,
  FolderOpen,
  Play,
  Settings,
  Trash2,
  Trophy,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useGameStore } from "../store/gameStore";

type MenuPanel = "home" | "load" | "settings" | "credits";

export function MainMenu() {
  const [panel, setPanel] = useState<MenuPanel>("home");
  const openCareerSetup = useGameStore((state) => state.openCareerSetup);
  const loadGame = useGameStore((state) => state.loadGame);
  const deleteSave = useGameStore((state) => state.deleteSave);
  const saveSlots = useGameStore((state) => state.saveSlots);

  return (
    <main className="app-shell grid min-h-screen place-items-center px-4 py-8">
      <section className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex min-h-[560px] flex-col justify-between rounded-lg border border-line/80 bg-ink/60 p-6 shadow-hard">
          <div>
            <div className="inline-flex items-center gap-3 rounded-md border border-mint/35 bg-mint/10 px-3 py-2 text-mint">
              <Trophy size={18} />
              <span className="text-sm font-bold uppercase">Temporada nacional</span>
            </div>
            <h1 className="mt-8 max-w-2xl text-5xl font-black leading-none text-paper md:text-7xl">
              E-Sports Manager BR
            </h1>
            <p className="mt-5 max-w-xl text-lg text-paper/68">
              Monte elenco, controle caixa, treine talentos e dispute uma liga
              ficticia criada para o navegador.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <MenuButton icon={<Play size={19} />} onClick={openCareerSetup}>
              Novo jogo
            </MenuButton>
            <MenuButton icon={<FolderOpen size={19} />} onClick={() => setPanel("load")}>
              Carregar jogo
            </MenuButton>
            <MenuButton icon={<Settings size={19} />} onClick={() => setPanel("settings")}>
              Configuracoes
            </MenuButton>
            <MenuButton icon={<CreditCard size={19} />} onClick={() => setPanel("credits")}>
              Creditos
            </MenuButton>
          </div>
        </div>

        <aside className="panel rounded-lg p-5">
          {panel === "home" ? (
            <PanelIntro />
          ) : panel === "load" ? (
            <div>
              <h2 className="text-xl font-black">Slots de save</h2>
              <div className="mt-4 grid gap-3">
                {saveSlots.map((slot) => (
                  <div
                    key={slot.slot}
                    className="rounded-lg border border-line/70 bg-ink/28 p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold">Slot {slot.slot}</p>
                        <p className="mt-1 text-sm text-paper/58">
                          {slot.occupied
                            ? `${slot.managerName} · ${slot.teamName} · Rodada ${slot.round}`
                            : "Vazio"}
                        </p>
                      </div>
                      {slot.occupied ? (
                        <button
                          className="grid h-9 w-9 place-items-center rounded-md border border-line bg-paper/8 text-coral hover:border-coral"
                          type="button"
                          title="Excluir save"
                          onClick={() => deleteSave(slot.slot)}
                        >
                          <Trash2 size={16} />
                        </button>
                      ) : null}
                    </div>
                    <button
                      className="mt-3 h-10 w-full rounded-md bg-mint px-3 font-black text-ink disabled:cursor-not-allowed disabled:opacity-40"
                      type="button"
                      disabled={!slot.occupied}
                      onClick={() => loadGame(slot.slot)}
                    >
                      Carregar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : panel === "settings" ? (
            <div>
              <h2 className="text-xl font-black">Configuracoes</h2>
              <div className="mt-4 grid gap-3 text-sm text-paper/70">
                <label className="flex items-center justify-between rounded-md border border-line/70 bg-ink/28 px-3 py-3">
                  <span>Reducao de movimento</span>
                  <input className="h-4 w-4 accent-mint" type="checkbox" />
                </label>
                <label className="flex items-center justify-between rounded-md border border-line/70 bg-ink/28 px-3 py-3">
                  <span>Sons de interface</span>
                  <input className="h-4 w-4 accent-mint" type="checkbox" />
                </label>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-black">Creditos</h2>
              <p className="mt-4 text-sm leading-6 text-paper/70">
                Prototipo original sem times, marcas, campeonatos ou jogadores reais.
                Base construida com React, TypeScript, Tailwind, Zustand, Vite e
                Phaser.
              </p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function PanelIntro() {
  return (
    <div>
      <h2 className="text-xl font-black">Central do manager</h2>
      <div className="mt-5 grid gap-3">
        {["Liga com 10 clubes ficticios", "Save local em 3 slots", "Simulador por atributos", "Mercado de free agents"].map(
          (item) => (
            <p
              key={item}
              className="rounded-md border border-line/70 bg-ink/28 px-3 py-3 text-sm text-paper/70"
            >
              {item}
            </p>
          ),
        )}
      </div>
    </div>
  );
}

function MenuButton({
  children,
  icon,
  onClick,
}: {
  children: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="flex h-12 items-center justify-center gap-2 rounded-md border border-line bg-paper/8 px-4 font-black text-paper transition hover:border-mint hover:bg-mint hover:text-ink"
      type="button"
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}
