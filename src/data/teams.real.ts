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
  // --- Required teams from prompt ---
  team({ id: "sharks", name: "Sharks", country: "Brazil", region: "Brazil", rankingGlobal: 52, rankingRegional: 9, valvePoints: 480, hltvRank: 52, reputation: 60, fanbase: 180000, budget: 700000, monthlyCosts: 68000, coach: "tacitus", focusMaps: ["mirage", "dust2"] }),
  team({ id: "case", name: "Case", country: "Brazil", region: "Brazil", rankingGlobal: 58, rankingRegional: 10, valvePoints: 400, hltvRank: 58, reputation: 55, fanbase: 120000, budget: 550000, monthlyCosts: 55000, coach: "conti", focusMaps: ["inferno", "anubis"] }),
  team({ id: "bestia", name: "BESTIA", country: "Argentina", region: "South America", rankingGlobal: 48, rankingRegional: 1, valvePoints: 540, hltvRank: 48, reputation: 62, fanbase: 210000, budget: 800000, monthlyCosts: 75000, coach: "meyern", focusMaps: ["ancient", "mirage"] }),
  team({ id: "9z", name: "9z", country: "Argentina", region: "South America", rankingGlobal: 50, rankingRegional: 2, valvePoints: 510, hltvRank: 50, reputation: 64, fanbase: 280000, budget: 900000, monthlyCosts: 80000, coach: "nqz9z", focusMaps: ["mirage", "nuke"] }),
  team({ id: "kru", name: "KRÜ", country: "Argentina", region: "South America", rankingGlobal: 55, rankingRegional: 3, valvePoints: 440, hltvRank: 55, reputation: 60, fanbase: 350000, budget: 750000, monthlyCosts: 70000, coach: "mith", focusMaps: ["inferno", "dust2"] }),
  team({ id: "nrg", name: "NRG", country: "United States", region: "North America", rankingGlobal: 19, rankingRegional: 2, valvePoints: 1260, hltvRank: 19, reputation: 82, fanbase: 1100000, budget: 5100000, monthlyCosts: 400000, coach: "Chet", focusMaps: ["ancient", "nuke", "mirage"] }),
  team({ id: "m80", name: "M80", country: "United States", region: "North America", rankingGlobal: 32, rankingRegional: 4, valvePoints: 900, hltvRank: 32, reputation: 72, fanbase: 520000, budget: 2800000, monthlyCosts: 220000, coach: "daps", focusMaps: ["mirage", "anubis"] }),
  team({ id: "wildcard", name: "Wildcard", country: "Australia", region: "Oceania", rankingGlobal: 42, rankingRegional: 2, valvePoints: 660, hltvRank: 42, reputation: 68, fanbase: 280000, budget: 1800000, monthlyCosts: 150000, coach: "Hatz", focusMaps: ["nuke", "ancient"] }),
  team({ id: "eternal-fire", name: "Eternal Fire", country: "Turkey", region: "Europe", rankingGlobal: 11, rankingRegional: 6, valvePoints: 1700, hltvRank: 11, reputation: 86, fanbase: 1300000, budget: 6500000, monthlyCosts: 510000, coach: "hardstyle", focusMaps: ["nuke", "mirage", "inferno"] }),
  team({ id: "parivision", name: "PARIVISION", country: "Russia", region: "CIS", rankingGlobal: 27, rankingRegional: 5, valvePoints: 1040, hltvRank: 27, reputation: 74, fanbase: 440000, budget: 3500000, monthlyCosts: 280000, coach: "johnta", focusMaps: ["overpass", "ancient"] }),
  team({ id: "rare-atom", name: "Rare Atom", country: "China", region: "Asia", rankingGlobal: 45, rankingRegional: 4, valvePoints: 590, hltvRank: 45, reputation: 66, fanbase: 600000, budget: 2200000, monthlyCosts: 180000, coach: "tb", focusMaps: ["mirage", "ancient"] }),
  // --- Additional teams to reach 100 ---
  team({ id: "apeks", name: "Apeks", country: "Norway", region: "Europe", rankingGlobal: 35, rankingRegional: 18, valvePoints: 820, hltvRank: 35, reputation: 72, fanbase: 390000, budget: 2400000, monthlyCosts: 195000, coach: "appe", focusMaps: ["nuke", "inferno"] }),
  team({ id: "monte", name: "Monte", country: "Ukraine", region: "Europe", rankingGlobal: 37, rankingRegional: 20, valvePoints: 780, hltvRank: 37, reputation: 70, fanbase: 350000, budget: 2100000, monthlyCosts: 170000, coach: "lmbt", focusMaps: ["dust2", "mirage"] }),
  team({ id: "og", name: "OG", country: "Serbia", region: "Europe", rankingGlobal: 40, rankingRegional: 21, valvePoints: 700, hltvRank: 40, reputation: 76, fanbase: 680000, budget: 3100000, monthlyCosts: 250000, coach: "kassad", focusMaps: ["inferno", "ancient"] }),
  team({ id: "passion-ua", name: "Passion UA", country: "Ukraine", region: "Europe", rankingGlobal: 43, rankingRegional: 22, valvePoints: 640, hltvRank: 43, reputation: 62, fanbase: 190000, budget: 1100000, monthlyCosts: 95000, coach: "ceh9", focusMaps: ["mirage", "nuke"] }),
  team({ id: "nemiga", name: "Nemiga", country: "Belarus", region: "CIS", rankingGlobal: 46, rankingRegional: 6, valvePoints: 570, hltvRank: 46, reputation: 64, fanbase: 220000, budget: 1300000, monthlyCosts: 105000, coach: "lessly", focusMaps: ["ancient", "inferno"] }),
  team({ id: "nouns", name: "Nouns", country: "United States", region: "North America", rankingGlobal: 49, rankingRegional: 5, valvePoints: 520, hltvRank: 49, reputation: 60, fanbase: 280000, budget: 1500000, monthlyCosts: 125000, coach: "steel", focusMaps: ["dust2", "nuke"] }),
  team({ id: "boss", name: "BOSS", country: "United States", region: "North America", rankingGlobal: 51, rankingRegional: 6, valvePoints: 490, hltvRank: 51, reputation: 58, fanbase: 200000, budget: 1200000, monthlyCosts: 100000, coach: "laski", focusMaps: ["mirage", "overpass"] }),
  team({ id: "partido", name: "Party Astronauts", country: "United States", region: "North America", rankingGlobal: 53, rankingRegional: 7, valvePoints: 460, hltvRank: 53, reputation: 56, fanbase: 160000, budget: 900000, monthlyCosts: 80000, coach: "JBA", focusMaps: ["anubis", "nuke"] }),
  team({ id: "imperial-fe", name: "Isurus", country: "Argentina", region: "South America", rankingGlobal: 56, rankingRegional: 4, valvePoints: 430, hltvRank: 56, reputation: 58, fanbase: 190000, budget: 650000, monthlyCosts: 60000, coach: "nica", focusMaps: ["mirage", "inferno"] }),
  team({ id: "mindfreak", name: "Mindfreak", country: "Australia", region: "Oceania", rankingGlobal: 57, rankingRegional: 3, valvePoints: 410, hltvRank: 57, reputation: 55, fanbase: 120000, budget: 700000, monthlyCosts: 62000, coach: "aliStairC", focusMaps: ["ancient", "mirage"] }),
  team({ id: "rooster", name: "Rooster", country: "Australia", region: "Oceania", rankingGlobal: 60, rankingRegional: 4, valvePoints: 370, hltvRank: 60, reputation: 52, fanbase: 100000, budget: 550000, monthlyCosts: 50000, coach: "Grayhound", focusMaps: ["nuke", "dust2"] }),
  team({ id: "sinners", name: "SINNERS", country: "Czech Republic", region: "Europe", rankingGlobal: 61, rankingRegional: 23, valvePoints: 360, hltvRank: 61, reputation: 60, fanbase: 250000, budget: 1400000, monthlyCosts: 115000, coach: "denton", focusMaps: ["inferno", "mirage"] }),
  team({ id: "into-the-breach", name: "Into the Breach", country: "United Kingdom", region: "Europe", rankingGlobal: 62, rankingRegional: 24, valvePoints: 350, hltvRank: 62, reputation: 58, fanbase: 200000, budget: 1200000, monthlyCosts: 100000, coach: "Rejin", focusMaps: ["nuke", "ancient"] }),
  team({ id: "ecstatic", name: "ECSTATIC", country: "Denmark", region: "Europe", rankingGlobal: 63, rankingRegional: 25, valvePoints: 340, hltvRank: 63, reputation: 60, fanbase: 220000, budget: 1300000, monthlyCosts: 108000, coach: "tep", focusMaps: ["mirage", "anubis"] }),
  team({ id: "preasy", name: "Preasy", country: "Denmark", region: "Europe", rankingGlobal: 64, rankingRegional: 26, valvePoints: 330, hltvRank: 64, reputation: 55, fanbase: 140000, budget: 900000, monthlyCosts: 78000, coach: "cbb", focusMaps: ["dust2", "inferno"] }),
  team({ id: "revenant", name: "Revenant", country: "India", region: "Asia", rankingGlobal: 65, rankingRegional: 5, valvePoints: 320, hltvRank: 65, reputation: 50, fanbase: 300000, budget: 600000, monthlyCosts: 52000, coach: "Coach R", focusMaps: ["mirage", "nuke"] }),
  team({ id: "bleed", name: "BLEED", country: "Singapore", region: "Asia", rankingGlobal: 66, rankingRegional: 6, valvePoints: 310, hltvRank: 66, reputation: 55, fanbase: 180000, budget: 1000000, monthlyCosts: 85000, coach: "Coach BL", focusMaps: ["ancient", "anubis"] }),
  team({ id: "the-huns", name: "The Huns", country: "Australia", region: "Oceania", rankingGlobal: 67, rankingRegional: 5, valvePoints: 300, hltvRank: 67, reputation: 48, fanbase: 80000, budget: 450000, monthlyCosts: 42000, coach: "Coach TH", focusMaps: ["overpass", "mirage"] }),
  team({ id: "permitta", name: "Permitta", country: "Poland", region: "Europe", rankingGlobal: 68, rankingRegional: 27, valvePoints: 290, hltvRank: 68, reputation: 52, fanbase: 160000, budget: 800000, monthlyCosts: 70000, coach: "Coach PM", focusMaps: ["inferno", "nuke"] }),
  team({ id: "insilio", name: "Insilio", country: "Russia", region: "CIS", rankingGlobal: 69, rankingRegional: 7, valvePoints: 280, hltvRank: 69, reputation: 50, fanbase: 130000, budget: 700000, monthlyCosts: 62000, coach: "Coach IN", focusMaps: ["dust2", "ancient"] }),
  team({ id: "sashi", name: "Sashi", country: "Denmark", region: "Europe", rankingGlobal: 70, rankingRegional: 28, valvePoints: 270, hltvRank: 70, reputation: 50, fanbase: 110000, budget: 650000, monthlyCosts: 58000, coach: "Coach SS", focusMaps: ["mirage", "overpass"] }),
  team({ id: "zero-tenacity", name: "Zero Tenacity", country: "Bulgaria", region: "Europe", rankingGlobal: 71, rankingRegional: 29, valvePoints: 260, hltvRank: 71, reputation: 48, fanbase: 90000, budget: 500000, monthlyCosts: 46000, coach: "Coach ZT", focusMaps: ["nuke", "anubis"] }),
  team({ id: "solid", name: "Solid", country: "Brazil", region: "Brazil", rankingGlobal: 72, rankingRegional: 11, valvePoints: 250, hltvRank: 72, reputation: 50, fanbase: 100000, budget: 450000, monthlyCosts: 42000, coach: "Coach SO", focusMaps: ["ancient", "mirage"] }),
  team({ id: "bounty-hunters", name: "Bounty Hunters", country: "Brazil", region: "Brazil", rankingGlobal: 73, rankingRegional: 12, valvePoints: 240, hltvRank: 73, reputation: 48, fanbase: 85000, budget: 400000, monthlyCosts: 38000, coach: "Coach BH", focusMaps: ["dust2", "inferno"] }),
  team({ id: "havu", name: "HAVU", country: "Finland", region: "Europe", rankingGlobal: 74, rankingRegional: 30, valvePoints: 230, hltvRank: 74, reputation: 55, fanbase: 180000, budget: 800000, monthlyCosts: 68000, coach: "Coach HV", focusMaps: ["mirage", "nuke"] }),
  team({ id: "forze", name: "forZe", country: "Russia", region: "CIS", rankingGlobal: 75, rankingRegional: 8, valvePoints: 220, hltvRank: 75, reputation: 58, fanbase: 250000, budget: 1000000, monthlyCosts: 82000, coach: "Coach FZ", focusMaps: ["overpass", "inferno"] }),
  team({ id: "endpoint", name: "Endpoint", country: "United Kingdom", region: "Europe", rankingGlobal: 76, rankingRegional: 31, valvePoints: 210, hltvRank: 76, reputation: 52, fanbase: 150000, budget: 700000, monthlyCosts: 60000, coach: "Coach EP", focusMaps: ["ancient", "dust2"] }),
  team({ id: "spirit-academy", name: "Spirit Academy", country: "Russia", region: "CIS", rankingGlobal: 77, rankingRegional: 9, valvePoints: 200, hltvRank: 77, reputation: 56, fanbase: 200000, budget: 900000, monthlyCosts: 75000, coach: "Coach SA", focusMaps: ["mirage", "anubis"] }),
  team({ id: "nexus", name: "Nexus", country: "Romania", region: "Europe", rankingGlobal: 78, rankingRegional: 32, valvePoints: 190, hltvRank: 78, reputation: 48, fanbase: 100000, budget: 500000, monthlyCosts: 46000, coach: "Coach NX", focusMaps: ["inferno", "nuke"] }),
  team({ id: "atox", name: "ATOX", country: "China", region: "Asia", rankingGlobal: 79, rankingRegional: 7, valvePoints: 180, hltvRank: 79, reputation: 52, fanbase: 220000, budget: 800000, monthlyCosts: 68000, coach: "Coach AT", focusMaps: ["dust2", "mirage"] }),
  team({ id: "chinggis-warriors", name: "Chinggis Warriors", country: "Mongolia", region: "Asia", rankingGlobal: 80, rankingRegional: 8, valvePoints: 170, hltvRank: 80, reputation: 46, fanbase: 160000, budget: 500000, monthlyCosts: 44000, coach: "Coach CW", focusMaps: ["ancient", "overpass"] }),
  team({ id: "ex-sprout", name: "Sprout", country: "Germany", region: "Europe", rankingGlobal: 81, rankingRegional: 33, valvePoints: 160, hltvRank: 81, reputation: 56, fanbase: 190000, budget: 900000, monthlyCosts: 76000, coach: "Coach SP", focusMaps: ["nuke", "mirage"] }),
  team({ id: "500", name: "500", country: "Kazakhstan", region: "CIS", rankingGlobal: 82, rankingRegional: 10, valvePoints: 150, hltvRank: 82, reputation: 48, fanbase: 120000, budget: 600000, monthlyCosts: 52000, coach: "Coach 500", focusMaps: ["anubis", "inferno"] }),
  team({ id: "onyx-ravens", name: "ENCE Academy", country: "Finland", region: "Europe", rankingGlobal: 83, rankingRegional: 34, valvePoints: 145, hltvRank: 83, reputation: 46, fanbase: 80000, budget: 400000, monthlyCosts: 38000, coach: "Coach EA", focusMaps: ["dust2", "ancient"] }),
  team({ id: "fluxo-demons", name: "W7M", country: "Brazil", region: "Brazil", rankingGlobal: 84, rankingRegional: 13, valvePoints: 140, hltvRank: 84, reputation: 48, fanbase: 95000, budget: 420000, monthlyCosts: 40000, coach: "Coach W7", focusMaps: ["mirage", "inferno"] }),
  team({ id: "los-grandes", name: "Leviatán", country: "Chile", region: "South America", rankingGlobal: 85, rankingRegional: 5, valvePoints: 135, hltvRank: 85, reputation: 50, fanbase: 140000, budget: 500000, monthlyCosts: 46000, coach: "Coach LV", focusMaps: ["nuke", "dust2"] }),
  team({ id: "daotsu", name: "DAOTSU", country: "Brazil", region: "Brazil", rankingGlobal: 86, rankingRegional: 14, valvePoints: 130, hltvRank: 86, reputation: 44, fanbase: 70000, budget: 350000, monthlyCosts: 34000, coach: "Coach DAO", focusMaps: ["ancient", "anubis"] }),
  team({ id: "gr", name: "GR", country: "Argentina", region: "South America", rankingGlobal: 87, rankingRegional: 6, valvePoints: 125, hltvRank: 87, reputation: 44, fanbase: 80000, budget: 350000, monthlyCosts: 34000, coach: "Coach GR", focusMaps: ["mirage", "overpass"] }),
  team({ id: "twisted-minds", name: "Twisted Minds", country: "Saudi Arabia", region: "Middle East", rankingGlobal: 88, rankingRegional: 2, valvePoints: 120, hltvRank: 88, reputation: 52, fanbase: 200000, budget: 2000000, monthlyCosts: 165000, coach: "Coach TM", focusMaps: ["inferno", "nuke"] }),
  team({ id: "nigma-galaxy", name: "Nigma Galaxy", country: "Jordan", region: "Middle East", rankingGlobal: 89, rankingRegional: 3, valvePoints: 115, hltvRank: 89, reputation: 48, fanbase: 150000, budget: 1200000, monthlyCosts: 100000, coach: "Coach NG", focusMaps: ["dust2", "ancient"] }),
  team({ id: "team-one", name: "Team oNe", country: "Brazil", region: "Brazil", rankingGlobal: 90, rankingRegional: 15, valvePoints: 110, hltvRank: 90, reputation: 46, fanbase: 90000, budget: 380000, monthlyCosts: 36000, coach: "Coach T1", focusMaps: ["mirage", "inferno"] }),
  team({ id: "gaimin-gladiators", name: "Gaimin Gladiators", country: "Latvia", region: "Europe", rankingGlobal: 91, rankingRegional: 35, valvePoints: 105, hltvRank: 91, reputation: 54, fanbase: 200000, budget: 1100000, monthlyCosts: 92000, coach: "Coach GG", focusMaps: ["nuke", "anubis"] }),
  team({ id: "bad-news-eagles", name: "Bad News Eagles", country: "Kosovo", region: "Europe", rankingGlobal: 92, rankingRegional: 36, valvePoints: 100, hltvRank: 92, reputation: 52, fanbase: 160000, budget: 600000, monthlyCosts: 52000, coach: "Coach BNE", focusMaps: ["overpass", "mirage"] }),
  team({ id: "gen-g", name: "Gen.G", country: "South Korea", region: "Asia", rankingGlobal: 93, rankingRegional: 9, valvePoints: 95, hltvRank: 93, reputation: 58, fanbase: 400000, budget: 2000000, monthlyCosts: 165000, coach: "Coach GEN", focusMaps: ["ancient", "dust2"] }),
  team({ id: "nip-impact", name: "NIP Impact", country: "Sweden", region: "Europe", rankingGlobal: 94, rankingRegional: 37, valvePoints: 90, hltvRank: 94, reputation: 46, fanbase: 120000, budget: 550000, monthlyCosts: 50000, coach: "Coach NI", focusMaps: ["inferno", "mirage"] }),
  team({ id: "grayhound", name: "Grayhound", country: "Australia", region: "Oceania", rankingGlobal: 95, rankingRegional: 6, valvePoints: 85, hltvRank: 95, reputation: 48, fanbase: 90000, budget: 450000, monthlyCosts: 42000, coach: "Coach GH", focusMaps: ["nuke", "overpass"] }),
  team({ id: "encore", name: "ENCORE", country: "Kazakhstan", region: "CIS", rankingGlobal: 96, rankingRegional: 11, valvePoints: 80, hltvRank: 96, reputation: 44, fanbase: 80000, budget: 400000, monthlyCosts: 38000, coach: "Coach EN", focusMaps: ["dust2", "anubis"] }),
  team({ id: "metizport", name: "Metizport", country: "Sweden", region: "Europe", rankingGlobal: 97, rankingRegional: 38, valvePoints: 75, hltvRank: 97, reputation: 48, fanbase: 100000, budget: 550000, monthlyCosts: 48000, coach: "Coach MP", focusMaps: ["mirage", "ancient"] }),
  team({ id: "dusty-roots", name: "Dusty Roots", country: "Brazil", region: "Brazil", rankingGlobal: 98, rankingRegional: 16, valvePoints: 70, hltvRank: 98, reputation: 40, fanbase: 50000, budget: 280000, monthlyCosts: 28000, coach: "Coach DR", focusMaps: ["inferno", "nuke"] }),
  team({ id: "detonate", name: "DETONATE", country: "Japan", region: "Asia", rankingGlobal: 99, rankingRegional: 10, valvePoints: 65, hltvRank: 99, reputation: 44, fanbase: 150000, budget: 500000, monthlyCosts: 44000, coach: "Coach DT", focusMaps: ["overpass", "dust2"] }),
  team({ id: "dplus", name: "DPlus", country: "South Korea", region: "Asia", rankingGlobal: 100, rankingRegional: 11, valvePoints: 60, hltvRank: 100, reputation: 46, fanbase: 180000, budget: 600000, monthlyCosts: 52000, coach: "Coach DP", focusMaps: ["mirage", "anubis"] }),
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
