import type { RealPlayer } from "../../types/RealPlayer";
import type { WinCondition } from "../../types/Round";

const eventTemplates: Record<WinCondition, string[]> = {
  Elimination: [
    "{mvp} abriu o bombsite e fechou o round na troca final.",
    "{mvp} venceu o duelo de impacto e quebrou a defesa.",
    "{mvp} encontrou dois abates decisivos no meio do mapa.",
  ],
  BombPlanted: [
    "{mvp} garantiu o plant e segurou o retake.",
    "{mvp} criou espaco para o plant e converteu o pos-plant.",
    "{mvp} sobreviveu no clutch depois da bomba armada.",
  ],
  BombDefused: [
    "{mvp} comandou o retake e defusou no limite.",
    "{mvp} limpou o bombsite para a defesa recuperar o controle.",
    "{mvp} encaixou utilitaria perfeita no retake.",
  ],
  Time: [
    "{mvp} travou o avanco e venceu pelo relogio.",
    "{mvp} segurou a execucao ate o tempo acabar.",
    "{mvp} leu o fake e impediu o plant.",
  ],
};

export function createRoundEvent(
  condition: WinCondition,
  mvp: RealPlayer | undefined,
  random: () => number,
) {
  const templates = eventTemplates[condition];
  const template = templates[Math.floor(random() * templates.length)];
  return template.replace("{mvp}", mvp?.nickname ?? "MVP");
}

export function chooseWinCondition(winnerSide: "CT" | "T", random: () => number): WinCondition {
  const roll = random();

  if (winnerSide === "CT") {
    if (roll > 0.72) {
      return "BombDefused";
    }

    if (roll > 0.58) {
      return "Time";
    }

    return "Elimination";
  }

  if (roll > 0.68) {
    return "BombPlanted";
  }

  return "Elimination";
}
