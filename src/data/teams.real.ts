import { csMaps } from "./maps.cs";
import { realPlayers } from "./players.real";
import type { CSRegion, RealTeam } from "../types/RealTeam";

type TeamSpec = {
  id: string;
  name: string;
  country: string;
  region: CSRegion;
  rankingGlobal: number;
  rankingRegional: number;
  valvePoints: number;
  hltvRank: number;
  reputation: number;
  fanbase: number;
  budget: number;
  monthlyCosts: number;
  coach?: string;
  focusMaps?: string[];
  trophies?: string[];
};

export const realTeams: RealTeam[] = [
  team({ id: "furia", name: "FURIA", country: "Brazil", region: "Brazil", rankingGlobal: 9, rankingRegional: 1, valvePoints: 1860, hltvRank: 9, reputation: 88, fanbase: 1450000, budget: 5200000, monthlyCosts: 410000, coach: "guerri", focusMaps: ["mirage", "nuke", "ancient"], trophies: ["Regional titles"] }),
  team({ id: "mibr", name: "MIBR", country: "Brazil", region: "Brazil", rankingGlobal: 18, rankingRegional: 2, valvePoints: 1320, hltvRank: 18, reputation: 78, fanbase: 980000, budget: 2800000, monthlyCosts: 240000, coach: "nak", focusMaps: ["inferno", "mirage"] }),
  team({ id: "imperial", name: "Imperial", country: "Brazil", region: "Brazil", rankingGlobal: 31, rankingRegional: 5, valvePoints: 920, hltvRank: 31, reputation: 72, fanbase: 760000, budget: 1900000, monthlyCosts: 170000, coach: "zakk", focusMaps: ["dust2", "inferno"] }),
  team({ id: "pain-gaming", name: "paiN Gaming", country: "Brazil", region: "Brazil", rankingGlobal: 16, rankingRegional: 3, valvePoints: 1400, hltvRank: 16, reputation: 80, fanbase: 1020000, budget: 3200000, monthlyCosts: 260000, coach: "rikz", focusMaps: ["nuke", "inferno", "anubis"] }),
  team({ id: "fluxo", name: "Fluxo", country: "Brazil", region: "Brazil", rankingGlobal: 38, rankingRegional: 6, valvePoints: 740, hltvRank: 38, reputation: 70, fanbase: 690000, budget: 1600000, monthlyCosts: 145000, coach: "Xamp", focusMaps: ["mirage", "dust2"] }),
  team({ id: "red-canids", name: "RED Canids", country: "Brazil", region: "Brazil", rankingGlobal: 44, rankingRegional: 7, valvePoints: 610, hltvRank: 44, reputation: 66, fanbase: 430000, budget: 1200000, monthlyCosts: 105000, coach: "nak", focusMaps: ["ancient", "inferno"] }),
  team({ id: "oddik", name: "ODDIK", country: "Brazil", region: "Brazil", rankingGlobal: 47, rankingRegional: 8, valvePoints: 560, hltvRank: 47, reputation: 62, fanbase: 230000, budget: 850000, monthlyCosts: 82000, coach: "rdn", focusMaps: ["anubis", "ancient"] }),
  team({ id: "legacy", name: "Legacy", country: "Brazil", region: "Brazil", rankingGlobal: 28, rankingRegional: 4, valvePoints: 1020, hltvRank: 28, reputation: 70, fanbase: 350000, budget: 1700000, monthlyCosts: 150000, coach: "chucky", focusMaps: ["mirage", "anubis"] }),

  team({ id: "vitality", name: "Vitality", country: "France", region: "Europe", rankingGlobal: 1, rankingRegional: 1, valvePoints: 2860, hltvRank: 1, reputation: 98, fanbase: 2200000, budget: 10000000, monthlyCosts: 830000, coach: "XTQZZZ", focusMaps: ["nuke", "mirage", "inferno"], trophies: ["Major", "S-Tier trophies"] }),
  team({ id: "navi", name: "NAVI", country: "Ukraine", region: "Europe", rankingGlobal: 2, rankingRegional: 2, valvePoints: 2720, hltvRank: 2, reputation: 97, fanbase: 2500000, budget: 9800000, monthlyCosts: 790000, coach: "B1ad3", focusMaps: ["mirage", "ancient", "nuke"], trophies: ["Major", "S-Tier trophies"] }),
  team({ id: "faze", name: "FaZe", country: "United States", region: "Global", rankingGlobal: 3, rankingRegional: 1, valvePoints: 2650, hltvRank: 3, reputation: 97, fanbase: 2700000, budget: 10500000, monthlyCosts: 860000, coach: "NEO", focusMaps: ["nuke", "inferno", "dust2"], trophies: ["Major", "Grand Slam"] }),
  team({ id: "g2", name: "G2", country: "Germany", region: "Europe", rankingGlobal: 4, rankingRegional: 3, valvePoints: 2540, hltvRank: 4, reputation: 96, fanbase: 2600000, budget: 10300000, monthlyCosts: 850000, coach: "TaZ", focusMaps: ["mirage", "dust2", "inferno"], trophies: ["S-Tier trophies"] }),
  team({ id: "spirit", name: "Spirit", country: "Russia", region: "CIS", rankingGlobal: 5, rankingRegional: 1, valvePoints: 2480, hltvRank: 5, reputation: 94, fanbase: 1700000, budget: 8700000, monthlyCosts: 690000, coach: "hally", focusMaps: ["ancient", "mirage", "dust2"], trophies: ["S-Tier trophies"] }),
  team({ id: "mouz", name: "MOUZ", country: "Germany", region: "Europe", rankingGlobal: 6, rankingRegional: 4, valvePoints: 2380, hltvRank: 6, reputation: 92, fanbase: 1400000, budget: 7600000, monthlyCosts: 590000, coach: "sycrone", focusMaps: ["nuke", "ancient", "mirage"] }),
  team({ id: "astralis", name: "Astralis", country: "Denmark", region: "Europe", rankingGlobal: 14, rankingRegional: 8, valvePoints: 1480, hltvRank: 14, reputation: 91, fanbase: 2100000, budget: 6800000, monthlyCosts: 520000, coach: "ruggah", focusMaps: ["nuke", "inferno"] }),
  team({ id: "liquid", name: "Liquid", country: "United States", region: "North America", rankingGlobal: 12, rankingRegional: 1, valvePoints: 1620, hltvRank: 12, reputation: 90, fanbase: 1900000, budget: 7900000, monthlyCosts: 610000, coach: "mithR", focusMaps: ["mirage", "ancient"] }),
  team({ id: "complexity", name: "Complexity", country: "United States", region: "North America", rankingGlobal: 20, rankingRegional: 2, valvePoints: 1220, hltvRank: 20, reputation: 78, fanbase: 820000, budget: 3900000, monthlyCosts: 320000, coach: "T.c", focusMaps: ["anubis", "nuke"] }),
  team({ id: "falcons", name: "Falcons", country: "Saudi Arabia", region: "Middle East", rankingGlobal: 10, rankingRegional: 1, valvePoints: 1780, hltvRank: 10, reputation: 88, fanbase: 950000, budget: 11200000, monthlyCosts: 900000, coach: "zonic", focusMaps: ["dust2", "mirage", "nuke"] }),
  team({ id: "the-mongolz", name: "The MongolZ", country: "Mongolia", region: "Asia", rankingGlobal: 8, rankingRegional: 1, valvePoints: 1960, hltvRank: 8, reputation: 86, fanbase: 1250000, budget: 4300000, monthlyCosts: 350000, coach: "maaRaa", focusMaps: ["ancient", "mirage", "anubis"] }),
  team({ id: "virtus-pro", name: "Virtus.pro", country: "Armenia", region: "CIS", rankingGlobal: 15, rankingRegional: 2, valvePoints: 1460, hltvRank: 15, reputation: 88, fanbase: 1500000, budget: 6200000, monthlyCosts: 500000, coach: "Xoma", focusMaps: ["inferno", "overpass", "nuke"] }),
  team({ id: "ence", name: "ENCE", country: "Finland", region: "Europe", rankingGlobal: 26, rankingRegional: 13, valvePoints: 1060, hltvRank: 26, reputation: 79, fanbase: 850000, budget: 3800000, monthlyCosts: 310000, coach: "sAw", focusMaps: ["nuke", "ancient"] }),
  team({ id: "big", name: "BIG", country: "Germany", region: "Europe", rankingGlobal: 30, rankingRegional: 15, valvePoints: 950, hltvRank: 30, reputation: 78, fanbase: 920000, budget: 3600000, monthlyCosts: 300000, coach: "gob b", focusMaps: ["dust2", "nuke"] }),
  team({ id: "fnatic", name: "fnatic", country: "United Kingdom", region: "Europe", rankingGlobal: 33, rankingRegional: 17, valvePoints: 880, hltvRank: 33, reputation: 86, fanbase: 1400000, budget: 4200000, monthlyCosts: 340000, coach: "keita", focusMaps: ["inferno", "overpass"] }),
  team({ id: "ninjas-in-pyjamas", name: "Ninjas in Pyjamas", country: "Sweden", region: "Europe", rankingGlobal: 34, rankingRegional: 18, valvePoints: 860, hltvRank: 34, reputation: 87, fanbase: 1500000, budget: 4500000, monthlyCosts: 360000, coach: "THREAT", focusMaps: ["nuke", "mirage"] }),
  team({ id: "gamerlegion", name: "GamerLegion", country: "Germany", region: "Europe", rankingGlobal: 21, rankingRegional: 10, valvePoints: 1200, hltvRank: 21, reputation: 76, fanbase: 620000, budget: 3300000, monthlyCosts: 260000, coach: "ash", focusMaps: ["ancient", "anubis"] }),
  team({ id: "3dmax", name: "3DMAX", country: "France", region: "Europe", rankingGlobal: 23, rankingRegional: 11, valvePoints: 1140, hltvRank: 23, reputation: 74, fanbase: 480000, budget: 2500000, monthlyCosts: 210000, coach: "YouKnow", focusMaps: ["nuke", "inferno"] }),
  team({ id: "aurora", name: "Aurora", country: "Russia", region: "CIS", rankingGlobal: 13, rankingRegional: 3, valvePoints: 1520, hltvRank: 13, reputation: 82, fanbase: 720000, budget: 5200000, monthlyCosts: 410000, coach: "starix", focusMaps: ["ancient", "mirage"] }),
  team({ id: "saw", name: "SAW", country: "Portugal", region: "Europe", rankingGlobal: 25, rankingRegional: 12, valvePoints: 1080, hltvRank: 25, reputation: 77, fanbase: 700000, budget: 2800000, monthlyCosts: 230000, coach: "Mucha", focusMaps: ["nuke", "inferno"] }),
  team({ id: "heroic", name: "HEROIC", country: "Norway", region: "Europe", rankingGlobal: 22, rankingRegional: 10, valvePoints: 1160, hltvRank: 22, reputation: 84, fanbase: 990000, budget: 4700000, monthlyCosts: 380000, coach: "sAw", focusMaps: ["nuke", "ancient"] }),
  team({ id: "cloud9", name: "Cloud9", country: "United States", region: "North America", rankingGlobal: 29, rankingRegional: 3, valvePoints: 980, hltvRank: 29, reputation: 86, fanbase: 1600000, budget: 5400000, monthlyCosts: 420000, coach: "groove", focusMaps: ["mirage", "dust2"] }),
  team({ id: "betboom", name: "BetBoom", country: "Russia", region: "CIS", rankingGlobal: 17, rankingRegional: 4, valvePoints: 1360, hltvRank: 17, reputation: 80, fanbase: 760000, budget: 5600000, monthlyCosts: 430000, coach: "hooch", focusMaps: ["ancient", "overpass"] }),
  team({ id: "b8", name: "B8", country: "Ukraine", region: "Europe", rankingGlobal: 36, rankingRegional: 19, valvePoints: 800, hltvRank: 36, reputation: 73, fanbase: 520000, budget: 2300000, monthlyCosts: 180000, coach: "maddened", focusMaps: ["mirage", "anubis"] }),
  team({ id: "lynn-vision", name: "Lynn Vision", country: "China", region: "Asia", rankingGlobal: 39, rankingRegional: 2, valvePoints: 720, hltvRank: 39, reputation: 72, fanbase: 850000, budget: 2600000, monthlyCosts: 210000, coach: "k4Mi", focusMaps: ["ancient", "dust2"] }),
  team({ id: "tyloo", name: "TYLOO", country: "China", region: "Asia", rankingGlobal: 41, rankingRegional: 3, valvePoints: 680, hltvRank: 41, reputation: 75, fanbase: 1050000, budget: 3000000, monthlyCosts: 240000, coach: "karsa", focusMaps: ["mirage", "inferno"] }),
  team({ id: "flyquest", name: "FlyQuest", country: "Australia", region: "Oceania", rankingGlobal: 24, rankingRegional: 1, valvePoints: 1100, hltvRank: 24, reputation: 78, fanbase: 680000, budget: 3400000, monthlyCosts: 270000, coach: "mithR", focusMaps: ["nuke", "mirage"] }),
];

function team(spec: TeamSpec): RealTeam {
  const players = realPlayers
    .filter((player) => player.teamId === spec.id && player.status === "Starter")
    .map((player) => player.id);

  return {
    id: spec.id,
    name: spec.name,
    country: spec.country,
    region: spec.region,
    rankingGlobal: spec.rankingGlobal,
    rankingRegional: spec.rankingRegional,
    valvePoints: spec.valvePoints,
    hltvRank: spec.hltvRank,
    reputation: spec.reputation,
    fanbase: spec.fanbase,
    budget: spec.budget,
    monthlyCosts: spec.monthlyCosts,
    players,
    substitutes: [],
    academyPlayers: [],
    coach: spec.coach,
    activeSponsors: [],
    tournamentHistory: [],
    trophies: spec.trophies ?? [],
    currentForm: Math.max(45, Math.min(95, 100 - spec.rankingGlobal + 8)),
    morale: Math.max(50, Math.min(96, spec.reputation - 4)),
    mapPoolStrengths: mapStrengths(72 + Math.max(0, 28 - spec.rankingGlobal), spec.focusMaps ?? []),
    isCustom: false,
    academyLevel: spec.rankingGlobal <= 10 ? 4 as const : spec.rankingGlobal <= 25 ? 3 as const : spec.rankingGlobal <= 50 ? 2 as const : 1 as const,
    academyMonthlyCost: spec.rankingGlobal <= 10 ? 45000 : spec.rankingGlobal <= 25 ? 28000 : spec.rankingGlobal <= 50 ? 15000 : 8000,
  };
}

function mapStrengths(base: number, focusMaps: string[]) {
  return Object.fromEntries(
    csMaps.map((map, index) => {
      const focusBonus = focusMaps.includes(map.id) ? 8 : 0;
      const variation = ((index * 7 + Math.round(base)) % 11) - 5;
      return [map.id, Math.max(40, Math.min(99, Math.round(base + focusBonus + variation)))];
    }),
  );
}
