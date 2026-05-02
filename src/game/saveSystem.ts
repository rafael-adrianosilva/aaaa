import type { CareerState, SaveSlotMeta } from "../types/game";
import type { CompetitiveSaveData } from "../types/Competitive";

const slotKeys = {
  1: "esmbr-save-slot-1",
  2: "esmbr-save-slot-2",
  3: "esmbr-save-slot-3",
} as const;

export type GameSavePayload = {
  version: 2;
  career: CareerState;
  competitive: CompetitiveSaveData;
};

export function loadSaveSlots(): SaveSlotMeta[] {
  return ([1, 2, 3] as const).map((slot) => {
    const payload = loadGamePayloadFromSlot(slot);
    const career = payload?.career ?? loadCareerFromSlot(slot);

    if (!career) {
      return {
        slot,
        occupied: false,
      };
    }

    const team = career.teams.find((item) => item.id === career.userTeamId);

    return {
      slot,
      occupied: true,
      managerName: career.managerName,
      teamName: team?.name,
      round: career.currentRound,
      savedAt: career.updatedAt,
    };
  });
}

export function loadCareerFromSlot(slot: 1 | 2 | 3): CareerState | null {
  const payload = loadGamePayloadFromSlot(slot);

  if (payload) {
    return payload.career;
  }

  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(slotKeys[slot]);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as CareerState;
  } catch {
    return null;
  }
}

export function loadGamePayloadFromSlot(slot: 1 | 2 | 3): GameSavePayload | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(slotKeys[slot]);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<GameSavePayload>;

    if (parsed.version === 2 && parsed.career && parsed.competitive) {
      return parsed as GameSavePayload;
    }

    return null;
  } catch {
    return null;
  }
}

export function saveCareerToSlot(slot: 1 | 2 | 3, career: CareerState) {
  if (typeof window === "undefined") {
    return career;
  }

  const updatedCareer: CareerState = {
    ...career,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(slotKeys[slot], JSON.stringify(updatedCareer));
  return updatedCareer;
}

export function saveGamePayloadToSlot(
  slot: 1 | 2 | 3,
  payload: GameSavePayload,
) {
  if (typeof window === "undefined") {
    return payload;
  }

  const updatedPayload: GameSavePayload = {
    ...payload,
    career: {
      ...payload.career,
      updatedAt: new Date().toISOString(),
    },
  };

  window.localStorage.setItem(slotKeys[slot], JSON.stringify(updatedPayload));
  return updatedPayload;
}

export function deleteCareerSlot(slot: 1 | 2 | 3) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(slotKeys[slot]);
}
