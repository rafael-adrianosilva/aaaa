export type CSMap = {
  id: string;
  name: string;
  type: "Balanced" | "Tactical" | "CT-Sided" | "T-Sided" | "Aim";
  ctBias: number;
  tBias: number;
  tacticalWeight: number;
  aimWeight: number;
  utilityWeight: number;
};
