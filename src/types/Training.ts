export type TrainingType =
  | "aim"
  | "reflex"
  | "mechanics"
  | "gameSense"
  | "utility"
  | "clutch"
  | "communication"
  | "consistency"
  | "mental"
  | "leadership"
  | "awp"
  | "entry"
  | "support"
  | "lurker"
  | "igl";

export type TrainingPlan = {
  playerId: string;
  type: TrainingType;
  weeksActive: number;
};

export type TrainingDefinition = {
  id: TrainingType;
  label: string;
  description: string;
  attributes: string[];
  compatibleRoles: string[];
};

export const TRAINING_DEFINITIONS: TrainingDefinition[] = [
  { id: "aim", label: "Mira", description: "Treino de aim, reflex e mecânica", attributes: ["aim", "reflex", "mechanics"], compatibleRoles: ["Rifler", "AWPer", "Entry"] },
  { id: "reflex", label: "Reflexo", description: "Treino de reação e velocidade", attributes: ["reflex", "aim", "clutch"], compatibleRoles: ["Entry", "AWPer", "Rifler"] },
  { id: "mechanics", label: "Mecânica", description: "Treino de movimentação e spray", attributes: ["mechanics", "aim", "consistency"], compatibleRoles: ["Rifler", "Entry", "Lurker"] },
  { id: "gameSense", label: "Game Sense", description: "Treino de leitura de jogo", attributes: ["gameSense", "communication", "mental"], compatibleRoles: ["IGL", "Support", "Lurker"] },
  { id: "utility", label: "Utilitárias", description: "Treino de smokes, flashes e molotovs", attributes: ["utility", "gameSense", "communication"], compatibleRoles: ["Support", "IGL", "Anchor"] },
  { id: "clutch", label: "Clutch", description: "Treino de situações 1vX", attributes: ["clutch", "mental", "aim", "gameSense"], compatibleRoles: ["Lurker", "AWPer", "Rifler"] },
  { id: "communication", label: "Comunicação", description: "Treino de calls e info", attributes: ["communication", "gameSense", "leadership"], compatibleRoles: ["IGL", "Support", "Anchor"] },
  { id: "consistency", label: "Consistência", description: "Treino de regularidade", attributes: ["consistency", "mental", "mechanics"], compatibleRoles: ["Rifler", "Support", "Anchor"] },
  { id: "mental", label: "Mental", description: "Treino de mentalidade competitiva", attributes: ["mental", "clutch", "consistency"], compatibleRoles: ["IGL", "AWPer", "Lurker"] },
  { id: "leadership", label: "Liderança", description: "Treino de liderança e tomada de decisão", attributes: ["leadership", "communication", "gameSense"], compatibleRoles: ["IGL"] },
  { id: "awp", label: "AWP", description: "Treino específico de AWP", attributes: ["aim", "reflex", "clutch", "consistency"], compatibleRoles: ["AWPer"] },
  { id: "entry", label: "Entry", description: "Treino de entrada em site", attributes: ["reflex", "aim", "mechanics", "mental"], compatibleRoles: ["Entry"] },
  { id: "support", label: "Support", description: "Treino de suporte tático", attributes: ["utility", "communication", "consistency", "gameSense"], compatibleRoles: ["Support"] },
  { id: "lurker", label: "Lurker", description: "Treino de timing e rotação", attributes: ["gameSense", "clutch", "mental", "consistency"], compatibleRoles: ["Lurker"] },
  { id: "igl", label: "IGL", description: "Treino de estratégia e liderança", attributes: ["gameSense", "communication", "leadership", "mental"], compatibleRoles: ["IGL"] },
];
