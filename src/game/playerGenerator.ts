import type { AcademyRarity, DevelopmentStatus } from "../types/Academy";
import { RARITY_CHANCES } from "../types/Academy";
import type { CSRole, RealPlayer } from "../types/RealPlayer";
import { createSeededRandom } from "./random";

const FIRST_NAMES = [
  "Lucas", "Gabriel", "Pedro", "Rafael", "Matheus", "Gustavo", "Felipe", "Bruno",
  "Thiago", "Daniel", "Leonardo", "Victor", "Andre", "Henrique", "Diego",
  "Alex", "Ivan", "Dmitri", "Sergei", "Nikita", "Mikhail", "Pavel", "Andrei",
  "Erik", "Johan", "Lukas", "Max", "Oliver", "Oscar", "Liam", "Noah",
  "Jakub", "Tomasz", "Adam", "Jan", "Mateusz", "Kamil", "Krzysztof",
  "Wei", "Chen", "Hao", "Jin", "Kai", "Lin", "Ming", "Yong",
  "James", "William", "Ethan", "Mason", "Logan", "Jake", "Ryan", "Kyle",
  "Finn", "Lars", "Hans", "Karl", "Sven", "Emil", "Anton", "Marco",
  "Kenji", "Taro", "Ryo", "Yuki", "Sora", "Ren", "Hiro", "Shin",
  "Carlos", "Miguel", "Santiago", "Alejandro", "Martin", "Nicolas", "Tomas", "Franco",
];

const NICK_PREFIXES = [
  "x", "z", "k", "sk", "bl", "fr", "dr", "st", "sh", "gl", "cr", "tr", "sw", "fl", "pr",
  "N", "K", "D", "S", "X", "Z", "V", "M", "T", "R", "J", "L", "F", "G", "B", "W", "H",
];

const NICK_SUFFIXES = [
  "zy", "ix", "on", "er", "ko", "ra", "ze", "to", "nx", "ky", "zz", "ke", "sh", "ow",
  "1", "0", "9", "7", "3", "x", "z", "4", "2",
  "oo", "ee", "ii", "aa", "uu",
  "ck", "nd", "lt", "mp", "rt", "nk", "sk", "st",
];

const NATIONALITIES_BY_REGION: Record<string, string[]> = {
  Brazil: ["Brazil"],
  "South America": ["Argentina", "Chile", "Uruguay", "Colombia", "Peru"],
  "North America": ["United States", "Canada", "Mexico"],
  Europe: ["France", "Germany", "Denmark", "Sweden", "Poland", "Finland", "United Kingdom", "Spain", "Portugal", "Norway", "Netherlands", "Czech Republic", "Serbia", "Romania", "Hungary", "Slovakia", "Estonia", "Latvia", "Lithuania", "Israel", "Turkey", "Bosnia and Herzegovina", "Croatia", "Bulgaria"],
  CIS: ["Russia", "Ukraine", "Kazakhstan", "Belarus"],
  Asia: ["China", "South Korea", "Japan", "Mongolia", "India", "Indonesia", "Philippines"],
  Oceania: ["Australia", "New Zealand"],
  "Middle East": ["Saudi Arabia", "Jordan", "United Arab Emirates"],
  Global: ["United States", "France", "Germany", "Denmark", "Sweden"],
};

const ROLES: CSRole[] = ["IGL", "AWPer", "Rifler", "Entry", "Support", "Lurker", "Anchor"];

export function generatePlayer(params: {
  teamId: string;
  region: string;
  overallRange: [number, number];
  potentialBonus: [number, number];
  ageRange?: [number, number];
  role?: CSRole;
  status?: "Starter" | "Substitute" | "Academy";
  rarityBonus?: number;
  seed: string;
}): RealPlayer {
  const random = createSeededRandom(params.seed);

  const nationality = pickNationality(params.region, random);
  const firstName = FIRST_NAMES[Math.floor(random() * FIRST_NAMES.length)];
  const nickname = generateNickname(random);
  const age = params.ageRange
    ? params.ageRange[0] + Math.floor(random() * (params.ageRange[1] - params.ageRange[0] + 1))
    : 16 + Math.floor(random() * 14);

  const role = params.role ?? pickRole(random);
  const overall = clamp(
    params.overallRange[0] + Math.floor(random() * (params.overallRange[1] - params.overallRange[0] + 1)),
    45, 99
  );

  const rarity = params.status === "Academy"
    ? rollRarity(random, params.rarityBonus ?? 0)
    : undefined;

  const potentialMin = overall + Math.max(5, params.potentialBonus[0]);
  const potentialMax = overall + params.potentialBonus[1];
  let potential = clamp(
    potentialMin + Math.floor(random() * (potentialMax - potentialMin + 1)),
    overall + 5,
    99
  );

  if (rarity === "Wonderkid") {
    potential = clamp(potential + 5, 85, 99);
  } else if (rarity === "Generational") {
    potential = clamp(potential + 10, 90, 99);
  }

  const isAcademy = params.status === "Academy";
  const developmentStatus = isAcademy ? getDevelopmentStatus(overall) : undefined;

  const id = slug(`gen-${nickname}-${params.seed.slice(-6)}`);

  const roleBonus = role === "IGL" ? 8 : role === "AWPer" ? 5 : 0;
  const youngBonus = age <= 21 ? 4 : 0;

  return {
    id,
    nickname,
    realName: firstName,
    nationality,
    age,
    teamId: params.teamId,
    role,
    rating: undefined,
    overall,
    potential,
    salary: Math.round((overall * 4200 + potential * 1200) / 1000) * 1000,
    marketValue: Math.round((overall * 46000 + potential * 21000) / 10000) * 10000,
    morale: 55 + Math.floor(random() * 20),
    form: 55 + Math.floor(random() * 20),
    mechanics: clamp(overall + (role === "Rifler" ? 4 : 0) + Math.floor((random() - 0.4) * 8), 45, 99),
    aim: clamp(overall + (role === "AWPer" || role === "Entry" ? 5 : 1) + Math.floor((random() - 0.4) * 8), 45, 99),
    reflex: clamp(overall + (role === "Entry" ? 5 : 0) + youngBonus + Math.floor((random() - 0.4) * 6), 45, 99),
    gameSense: clamp(overall + (role === "IGL" ? 7 : 0) + Math.floor((random() - 0.4) * 6), 45, 99),
    utility: clamp(overall + (role === "Support" ? 7 : 0) + Math.floor((random() - 0.4) * 6), 45, 99),
    clutch: clamp(overall + (role === "Lurker" || role === "AWPer" ? 5 : 0) + Math.floor((random() - 0.4) * 6), 45, 99),
    communication: clamp(overall + roleBonus + Math.floor((random() - 0.4) * 6), 45, 99),
    consistency: clamp(overall + (age >= 27 ? 2 : 0) + Math.floor((random() - 0.4) * 6), 45, 99),
    mental: clamp(overall + (age >= 27 ? 4 : 0) + Math.floor((random() - 0.4) * 6), 45, 99),
    leadership: clamp(overall + (role === "IGL" ? 12 : -2) + Math.floor((random() - 0.4) * 6), 35, 99),
    experience: clamp(age * 3 + (role === "IGL" ? 8 : 0), 35, 99),
    preferredMaps: pickMaps(random, 2),
    weakMaps: pickMaps(random, 1),
    status: params.status ?? "Starter",
    isGenerated: true,
    rarity,
    developmentStatus,
    fatigue: 0,
  };
}

export function generateSquad(params: {
  teamId: string;
  region: string;
  overallRange: [number, number];
  potentialBonus: [number, number];
  seed: string;
}): { starters: RealPlayer[]; substitutes: RealPlayer[]; academy: RealPlayer[] } {
  const roles: CSRole[] = ["IGL", "AWPer", "Entry", "Rifler", "Support"];
  const starters: RealPlayer[] = roles.map((role, i) =>
    generatePlayer({
      ...params,
      role,
      status: "Starter",
      seed: `${params.seed}-starter-${i}`,
    })
  );

  const subRoles: CSRole[] = ["Rifler", "Support"];
  const substitutes: RealPlayer[] = subRoles.map((role, i) =>
    generatePlayer({
      ...params,
      role,
      status: "Substitute",
      overallRange: [params.overallRange[0] - 4, params.overallRange[1] - 3],
      seed: `${params.seed}-sub-${i}`,
    })
  );

  const academy: RealPlayer[] = Array.from({ length: 5 }, (_, i) =>
    generatePlayer({
      teamId: params.teamId,
      region: params.region,
      overallRange: [57, 70],
      potentialBonus: [5, 15],
      ageRange: [16, 20],
      status: "Academy",
      rarityBonus: 0,
      seed: `${params.seed}-acad-${i}`,
    })
  );

  return { starters, substitutes, academy };
}

export function generateAcademyPlayer(params: {
  teamId: string;
  region: string;
  rarityBonus: number;
  seed: string;
}): RealPlayer {
  return generatePlayer({
    teamId: params.teamId,
    region: params.region,
    overallRange: [57, 70],
    potentialBonus: [5, 15],
    ageRange: [15, 20],
    status: "Academy",
    rarityBonus: params.rarityBonus,
    seed: params.seed,
  });
}

function rollRarity(random: () => number, bonus: number): AcademyRarity {
  const roll = random() * 100;
  const gen = RARITY_CHANCES.Generational + bonus * 0.1;
  const wk = gen + RARITY_CHANCES.Wonderkid + bonus * 0.3;
  const rare = wk + RARITY_CHANCES.Rare + bonus * 0.6;
  const uncommon = rare + RARITY_CHANCES.Uncommon;

  if (roll < gen) return "Generational";
  if (roll < wk) return "Wonderkid";
  if (roll < rare) return "Rare";
  if (roll < uncommon) return "Uncommon";
  return "Common";
}

function getDevelopmentStatus(overall: number): DevelopmentStatus {
  if (overall >= 80) return "PotencialEstrela";
  if (overall >= 75) return "ProntoTier1";
  if (overall >= 72) return "ProntoTier2";
  if (overall >= 68) return "ProntoTier3";
  if (overall >= 63) return "Promissor";
  return "Bruto";
}

function generateNickname(random: () => number): string {
  const prefix = NICK_PREFIXES[Math.floor(random() * NICK_PREFIXES.length)];
  const suffix = NICK_SUFFIXES[Math.floor(random() * NICK_SUFFIXES.length)];
  return prefix + suffix;
}

function pickRole(random: () => number): CSRole {
  const weighted = [
    { role: "Rifler" as CSRole, w: 30 },
    { role: "Entry" as CSRole, w: 20 },
    { role: "Support" as CSRole, w: 18 },
    { role: "AWPer" as CSRole, w: 14 },
    { role: "IGL" as CSRole, w: 8 },
    { role: "Lurker" as CSRole, w: 6 },
    { role: "Anchor" as CSRole, w: 4 },
  ];
  const total = weighted.reduce((s, w) => s + w.w, 0);
  let r = random() * total;
  for (const w of weighted) {
    r -= w.w;
    if (r <= 0) return w.role;
  }
  return "Rifler";
}

function pickNationality(region: string, random: () => number): string {
  const options = NATIONALITIES_BY_REGION[region] ?? NATIONALITIES_BY_REGION["Europe"]!;
  return options[Math.floor(random() * options.length)];
}

function pickMaps(random: () => number, count: number): string[] {
  const maps = ["dust2", "mirage", "inferno", "nuke", "overpass", "ancient", "anubis"];
  const shuffled = [...maps].sort(() => random() - 0.5);
  return shuffled.slice(0, count);
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}
