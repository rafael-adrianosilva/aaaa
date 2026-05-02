export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function average(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((total, value) => total + value, 0) / values.length;
}

export function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

export function hashStringToSeed(input: string) {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function createSeededRandom(input: string | number) {
  let state =
    typeof input === "number" ? input >>> 0 : hashStringToSeed(String(input));

  return () => {
    state = Math.imul(1664525, state) + 1013904223;
    return (state >>> 0) / 4294967296;
  };
}

export function pickWeighted<T>(
  items: T[],
  weightFor: (item: T) => number,
  random: () => number,
) {
  const totalWeight = items.reduce(
    (total, item) => total + Math.max(0, weightFor(item)),
    0,
  );

  if (items.length === 0) {
    return null;
  }

  if (totalWeight <= 0) {
    return items[Math.floor(random() * items.length)];
  }

  let cursor = random() * totalWeight;

  for (const item of items) {
    cursor -= Math.max(0, weightFor(item));
    if (cursor <= 0) {
      return item;
    }
  }

  return items[items.length - 1];
}
