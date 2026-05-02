import { Check, FastForward, Play } from "lucide-react";
import type { Side, VetoStep } from "../../types/Veto";

export function PickBanPanel({
  step,
  selectedMapId,
  selectedSide,
  vetoComplete,
  onSideChange,
  onConfirm,
  onAuto,
  onStart,
}: {
  step: VetoStep | null;
  selectedMapId?: string;
  selectedSide: Side;
  vetoComplete: boolean;
  onSideChange: (side: Side) => void;
  onConfirm: () => void;
  onAuto: () => void;
  onStart: () => void;
}) {
  return (
    <section className="panel rounded-lg p-4">
      <p className="text-xs font-semibold uppercase text-paper/55">Proxima acao</p>
      <h3 className="mt-2 text-xl font-black">
        {vetoComplete ? "Veto pronto" : step?.description ?? "Sem acao"}
      </h3>

      {step?.action === "ChooseSide" ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {(["CT", "T"] as const).map((side) => (
            <button
              key={side}
              className={`h-10 rounded-md border font-black ${
                selectedSide === side
                  ? "border-amber bg-amber text-ink"
                  : "border-line bg-paper/8 text-paper"
              }`}
              type="button"
              onClick={() => onSideChange(side)}
            >
              {side}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-4 grid gap-2">
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-md bg-mint font-black text-ink disabled:opacity-40"
          type="button"
          disabled={vetoComplete || (step?.action !== "ChooseSide" && !selectedMapId)}
          onClick={onConfirm}
        >
          <Check size={16} />
          Confirmar acao
        </button>
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-md border border-line bg-paper/8 font-bold text-paper hover:border-sky"
          type="button"
          onClick={onAuto}
        >
          <FastForward size={16} />
          Auto-veto
        </button>
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-md bg-coral font-black text-ink disabled:opacity-40"
          type="button"
          disabled={!vetoComplete}
          onClick={onStart}
        >
          <Play size={16} />
          Iniciar serie
        </button>
      </div>
    </section>
  );
}
