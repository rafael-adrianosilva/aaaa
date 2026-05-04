import type { CSRole, RealPlayer, RealPlayerStatus } from "../types/RealPlayer";

type PlayerSpec = {
  nickname: string;
  nationality: string;
  teamId?: string;
  role: CSRole;
  age?: number;
  rating?: number;
  overall: number;
  potential?: number;
  status?: RealPlayerStatus;
  preferredMaps?: string[];
  weakMaps?: string[];
};

const defaultPreferred = ["mirage", "inferno", "nuke"];
const defaultWeak = ["anubis"];

export const realPlayers: RealPlayer[] = [
  makePlayer({ nickname: "FalleN", nationality: "Brazil", teamId: "furia", role: "IGL", age: 34, rating: 1.03, overall: 82, potential: 82, preferredMaps: ["inferno", "nuke", "mirage"] }),
  makePlayer({ nickname: "KSCERATO", nationality: "Brazil", teamId: "furia", role: "Rifler", age: 26, rating: 1.15, overall: 88, potential: 90, preferredMaps: ["mirage", "ancient", "nuke"] }),
  makePlayer({ nickname: "yuurih", nationality: "Brazil", teamId: "furia", role: "Rifler", age: 26, rating: 1.09, overall: 85, potential: 87 }),
  makePlayer({ nickname: "molodoy", nationality: "Kazakhstan", teamId: "furia", role: "AWPer", age: 20, rating: 1.10, overall: 84, potential: 91, preferredMaps: ["dust2", "mirage", "anubis"] }),
  makePlayer({ nickname: "YEKINDAR", nationality: "Latvia", teamId: "furia", role: "Entry", age: 26, rating: 1.02, overall: 83, potential: 85, preferredMaps: ["dust2", "mirage"] }),

  makePlayer({ nickname: "insani", nationality: "Brazil", teamId: "mibr", role: "Entry", age: 21, rating: 1.12, overall: 84, potential: 89, preferredMaps: ["mirage", "ancient"] }),
  makePlayer({ nickname: "exit", nationality: "Brazil", teamId: "mibr", role: "IGL", age: 28, rating: 1.01, overall: 78, potential: 80, preferredMaps: ["inferno", "overpass"] }),
  makePlayer({ nickname: "decenty", nationality: "Brazil", teamId: "mibr", role: "Rifler", age: 21, rating: 1.05, overall: 78, potential: 84 }),
  makePlayer({ nickname: "lux", nationality: "Brazil", teamId: "mibr", role: "Support", age: 23, rating: 1.01, overall: 76, potential: 81 }),
  makePlayer({ nickname: "nqz", nationality: "Brazil", teamId: "mibr", role: "AWPer", age: 20, rating: 1.08, overall: 80, potential: 87, preferredMaps: ["dust2", "mirage"] }),

  makePlayer({ nickname: "biguzera", nationality: "Brazil", teamId: "pain-gaming", role: "IGL", age: 28, rating: 1.10, overall: 82, potential: 84, preferredMaps: ["nuke", "inferno"] }),
  makePlayer({ nickname: "snow", nationality: "Brazil", teamId: "pain-gaming", role: "Rifler", age: 18, rating: 1.07, overall: 79, potential: 88 }),

  makePlayer({ nickname: "donk", nationality: "Russia", teamId: "spirit", role: "Entry", age: 19, rating: 1.30, overall: 96, potential: 99, preferredMaps: ["ancient", "mirage", "dust2"] }),
  makePlayer({ nickname: "sh1ro", nationality: "Russia", teamId: "spirit", role: "AWPer", age: 24, rating: 1.21, overall: 92, potential: 94, preferredMaps: ["mirage", "nuke"] }),
  makePlayer({ nickname: "chopper", nationality: "Russia", teamId: "spirit", role: "IGL", age: 28, rating: 0.99, overall: 82, potential: 83, preferredMaps: ["ancient", "nuke"] }),
  makePlayer({ nickname: "magixx", nationality: "Russia", teamId: "spirit", role: "Support", age: 22, rating: 1.04, overall: 84, potential: 87 }),
  makePlayer({ nickname: "zont1x", nationality: "Ukraine", teamId: "spirit", role: "Rifler", age: 20, rating: 1.06, overall: 84, potential: 90 }),

  makePlayer({ nickname: "ZywOo", nationality: "France", teamId: "vitality", role: "AWPer", age: 25, rating: 1.28, overall: 97, potential: 99, preferredMaps: ["nuke", "mirage", "inferno"] }),
  makePlayer({ nickname: "apEX", nationality: "France", teamId: "vitality", role: "IGL", age: 32, rating: 1.00, overall: 83, potential: 83, preferredMaps: ["inferno", "nuke"] }),
  makePlayer({ nickname: "flameZ", nationality: "Israel", teamId: "vitality", role: "Entry", age: 22, rating: 1.12, overall: 88, potential: 91 }),
  makePlayer({ nickname: "Spinx", nationality: "Israel", teamId: "vitality", role: "Rifler", age: 24, rating: 1.11, overall: 88, potential: 90 }),
  makePlayer({ nickname: "mezii", nationality: "United Kingdom", teamId: "vitality", role: "Support", age: 27, rating: 1.03, overall: 82, potential: 84 }),

  makePlayer({ nickname: "m0NESY", nationality: "Russia", teamId: "g2", role: "AWPer", age: 20, rating: 1.22, overall: 94, potential: 98, preferredMaps: ["mirage", "dust2"] }),
  makePlayer({ nickname: "NiKo", nationality: "Bosnia and Herzegovina", teamId: "g2", role: "Rifler", age: 29, rating: 1.16, overall: 92, potential: 93, preferredMaps: ["inferno", "mirage"] }),
  makePlayer({ nickname: "malbsMd", nationality: "Guatemala", teamId: "g2", role: "Entry", age: 23, rating: 1.10, overall: 86, potential: 90 }),
  makePlayer({ nickname: "huNter-", nationality: "Bosnia and Herzegovina", teamId: "g2", role: "Rifler", age: 30, rating: 1.06, overall: 84, potential: 84 }),
  makePlayer({ nickname: "Snax", nationality: "Poland", teamId: "g2", role: "IGL", age: 32, rating: 0.98, overall: 80, potential: 80 }),

  makePlayer({ nickname: "ropz", nationality: "Estonia", teamId: "faze", role: "Lurker", age: 26, rating: 1.14, overall: 90, potential: 92, preferredMaps: ["nuke", "inferno"] }),
  makePlayer({ nickname: "frozen", nationality: "Slovakia", teamId: "faze", role: "Rifler", age: 23, rating: 1.13, overall: 88, potential: 91 }),
  makePlayer({ nickname: "rain", nationality: "Norway", teamId: "faze", role: "Entry", age: 31, rating: 1.04, overall: 83, potential: 83 }),
  makePlayer({ nickname: "karrigan", nationality: "Denmark", teamId: "faze", role: "IGL", age: 35, rating: 0.94, overall: 82, potential: 82, preferredMaps: ["nuke", "inferno"] }),

  makePlayer({ nickname: "s1mple", nationality: "Ukraine", teamId: "navi", role: "AWPer", age: 28, rating: 1.18, overall: 91, potential: 92, preferredMaps: ["mirage", "dust2"] }),
  makePlayer({ nickname: "b1t", nationality: "Ukraine", teamId: "navi", role: "Rifler", age: 23, rating: 1.10, overall: 88, potential: 91 }),
  makePlayer({ nickname: "iM", nationality: "Romania", teamId: "navi", role: "Rifler", age: 26, rating: 1.07, overall: 84, potential: 86 }),
  makePlayer({ nickname: "w0nderful", nationality: "Ukraine", teamId: "navi", role: "AWPer", age: 21, rating: 1.13, overall: 87, potential: 93 }),

  makePlayer({ nickname: "Jimpphat", nationality: "Finland", teamId: "mouz", role: "Anchor", age: 19, rating: 1.12, overall: 86, potential: 93 }),
  makePlayer({ nickname: "torzsi", nationality: "Hungary", teamId: "mouz", role: "AWPer", age: 23, rating: 1.09, overall: 84, potential: 87 }),
  makePlayer({ nickname: "siuhy", nationality: "Poland", teamId: "mouz", role: "IGL", age: 23, rating: 1.02, overall: 84, potential: 89 }),
  makePlayer({ nickname: "xertioN", nationality: "Israel", teamId: "mouz", role: "Entry", age: 21, rating: 1.09, overall: 85, potential: 90 }),

  makePlayer({ nickname: "dev1ce", nationality: "Denmark", teamId: "astralis", role: "AWPer", age: 30, rating: 1.13, overall: 88, potential: 88, preferredMaps: ["nuke", "inferno"] }),
  makePlayer({ nickname: "blameF", nationality: "Denmark", teamId: "astralis", role: "Rifler", age: 28, rating: 1.11, overall: 86, potential: 87 }),

  makePlayer({ nickname: "EliGE", nationality: "United States", teamId: "liquid", role: "Rifler", age: 28, rating: 1.11, overall: 87, potential: 88, preferredMaps: ["mirage", "ancient"] }),
  makePlayer({ nickname: "NAF", nationality: "Canada", teamId: "liquid", role: "Lurker", age: 28, rating: 1.10, overall: 86, potential: 86 }),
  makePlayer({ nickname: "Twistzz", nationality: "Canada", teamId: "liquid", role: "Rifler", age: 26, rating: 1.08, overall: 86, potential: 88 }),

  makePlayer({ nickname: "n1ssim", nationality: "Brazil", teamId: "legacy", role: "Rifler", age: 24, rating: 1.08, overall: 79, potential: 83 }),
  makePlayer({ nickname: "dumau", nationality: "Brazil", teamId: "legacy", role: "Rifler", age: 21, rating: 1.07, overall: 80, potential: 86 }),
  makePlayer({ nickname: "try", nationality: "Argentina", teamId: "legacy", role: "AWPer", age: 21, rating: 1.07, overall: 80, potential: 86 }),

  makePlayer({ nickname: "Jame", nationality: "Russia", teamId: "virtus-pro", role: "IGL", age: 27, rating: 1.09, overall: 85, potential: 86 }),
  makePlayer({ nickname: "electroNic", nationality: "Russia", teamId: "virtus-pro", role: "Rifler", age: 27, rating: 1.08, overall: 85, potential: 86 }),
  makePlayer({ nickname: "tabseN", nationality: "Germany", teamId: "big", role: "IGL", age: 31, rating: 1.02, overall: 80, potential: 80 }),
  makePlayer({ nickname: "dexter", nationality: "Australia", teamId: "flyquest", role: "IGL", age: 31, rating: 0.98, overall: 78, potential: 78 }),
  makePlayer({ nickname: "Liazz", nationality: "Australia", teamId: "flyquest", role: "Rifler", age: 28, rating: 1.02, overall: 79, potential: 80 }),

  makePlayer({ nickname: "VINI", nationality: "Brazil", teamId: "imperial", role: "IGL", age: 26, rating: 1.00, overall: 77, potential: 79 }),
  makePlayer({ nickname: "felps", nationality: "Brazil", teamId: "imperial", role: "Rifler", age: 29, rating: 1.06, overall: 79, potential: 79 }),
  makePlayer({ nickname: "boltz", nationality: "Brazil", teamId: "imperial", role: "Support", age: 28, rating: 1.02, overall: 76, potential: 77 }),
  makePlayer({ nickname: "noway", nationality: "Brazil", teamId: "imperial", role: "Entry", age: 20, rating: 1.04, overall: 75, potential: 82 }),
  makePlayer({ nickname: "HEN1", nationality: "Brazil", teamId: "imperial", role: "AWPer", age: 30, rating: 1.06, overall: 78, potential: 78 }),

  makePlayer({ nickname: "dav1deuS", nationality: "Brazil", teamId: "pain-gaming", role: "Rifler", age: 24, rating: 1.06, overall: 79, potential: 82 }),
  makePlayer({ nickname: "kauez", nationality: "Brazil", teamId: "pain-gaming", role: "Support", age: 22, rating: 1.03, overall: 77, potential: 82 }),
  makePlayer({ nickname: "nyezin", nationality: "Brazil", teamId: "pain-gaming", role: "Entry", age: 21, rating: 1.05, overall: 78, potential: 84 }),

  makePlayer({ nickname: "PKL", nationality: "Brazil", teamId: "fluxo", role: "IGL", age: 30, rating: 0.98, overall: 73, potential: 73 }),
  makePlayer({ nickname: "vsm", nationality: "Brazil", teamId: "fluxo", role: "Rifler", age: 26, rating: 1.07, overall: 78, potential: 80 }),
  makePlayer({ nickname: "Lucaozy", nationality: "Brazil", teamId: "fluxo", role: "Rifler", age: 23, rating: 1.06, overall: 77, potential: 82 }),
  makePlayer({ nickname: "zevy", nationality: "Brazil", teamId: "fluxo", role: "AWPer", age: 23, rating: 1.05, overall: 76, potential: 82 }),
  makePlayer({ nickname: "arT", nationality: "Brazil", teamId: "fluxo", role: "Entry", age: 30, rating: 1.01, overall: 76, potential: 76 }),

  makePlayer({ nickname: "coldzera", nationality: "Brazil", teamId: "red-canids", role: "Rifler", age: 31, rating: 1.02, overall: 78, potential: 78 }),
  makePlayer({ nickname: "latto", nationality: "Brazil", teamId: "red-canids", role: "Rifler", age: 23, rating: 1.05, overall: 76, potential: 81 }),
  makePlayer({ nickname: "venomzera", nationality: "Brazil", teamId: "red-canids", role: "Entry", age: 21, rating: 1.04, overall: 74, potential: 80 }),
  makePlayer({ nickname: "nython", nationality: "Brazil", teamId: "red-canids", role: "AWPer", age: 27, rating: 1.03, overall: 74, potential: 76 }),
  makePlayer({ nickname: "ckzao", nationality: "Brazil", teamId: "red-canids", role: "Support", age: 27, rating: 0.99, overall: 72, potential: 74 }),

  makePlayer({ nickname: "WOOD7", nationality: "Brazil", teamId: "oddik", role: "IGL", age: 30, rating: 0.99, overall: 72, potential: 72 }),
  makePlayer({ nickname: "ponter", nationality: "Brazil", teamId: "oddik", role: "Rifler", age: 24, rating: 1.05, overall: 74, potential: 78 }),
  makePlayer({ nickname: "matios", nationality: "Brazil", teamId: "oddik", role: "Entry", age: 22, rating: 1.04, overall: 73, potential: 79 }),
  makePlayer({ nickname: "remix", nationality: "Brazil", teamId: "oddik", role: "Support", age: 25, rating: 1.00, overall: 71, potential: 74 }),
  makePlayer({ nickname: "togs", nationality: "Brazil", teamId: "oddik", role: "AWPer", age: 22, rating: 1.04, overall: 73, potential: 80 }),

  makePlayer({ nickname: "lattoLegacy", nationality: "Brazil", teamId: "legacy", role: "Rifler", age: 23, rating: 1.04, overall: 77, potential: 81 }),
  makePlayer({ nickname: "saadzin", nationality: "Brazil", teamId: "legacy", role: "Support", age: 22, rating: 1.01, overall: 74, potential: 79 }),

  makePlayer({ nickname: "Aleksib", nationality: "Finland", teamId: "navi", role: "IGL", age: 28, rating: 0.98, overall: 83, potential: 83 }),
  makePlayer({ nickname: "jL", nationality: "Lithuania", teamId: "navi", role: "Rifler", age: 26, rating: 1.09, overall: 86, potential: 87 }),
  makePlayer({ nickname: "broky", nationality: "Latvia", teamId: "faze", role: "AWPer", age: 25, rating: 1.08, overall: 86, potential: 87 }),
  makePlayer({ nickname: "Brollan", nationality: "Sweden", teamId: "mouz", role: "Rifler", age: 23, rating: 1.06, overall: 83, potential: 86 }),
  makePlayer({ nickname: "stavn", nationality: "Denmark", teamId: "astralis", role: "Rifler", age: 24, rating: 1.07, overall: 84, potential: 86 }),
  makePlayer({ nickname: "jabbi", nationality: "Denmark", teamId: "astralis", role: "Rifler", age: 22, rating: 1.06, overall: 83, potential: 87 }),
  makePlayer({ nickname: "Staehr", nationality: "Denmark", teamId: "astralis", role: "Entry", age: 21, rating: 1.05, overall: 81, potential: 86 }),
  makePlayer({ nickname: "HooXi", nationality: "Denmark", teamId: "astralis", role: "IGL", age: 30, rating: 0.92, overall: 76, potential: 76 }),
  makePlayer({ nickname: "ultimate", nationality: "Poland", teamId: "liquid", role: "AWPer", age: 21, rating: 1.06, overall: 81, potential: 88 }),
  makePlayer({ nickname: "NertZ", nationality: "Israel", teamId: "liquid", role: "Entry", age: 26, rating: 1.09, overall: 85, potential: 86 }),

  makePlayer({ nickname: "JT", nationality: "South Africa", teamId: "complexity", role: "IGL", age: 26, rating: 0.97, overall: 76, potential: 77 }),
  makePlayer({ nickname: "Grim", nationality: "United States", teamId: "complexity", role: "Rifler", age: 25, rating: 1.07, overall: 81, potential: 83 }),
  makePlayer({ nickname: "floppy", nationality: "United States", teamId: "complexity", role: "Support", age: 26, rating: 1.02, overall: 78, potential: 79 }),
  makePlayer({ nickname: "hallzerk", nationality: "Norway", teamId: "complexity", role: "AWPer", age: 25, rating: 1.06, overall: 80, potential: 82 }),
  makePlayer({ nickname: "FaNg", nationality: "Canada", teamId: "complexity", role: "Entry", age: 23, rating: 1.02, overall: 77, potential: 81 }),

  makePlayer({ nickname: "Magisk", nationality: "Denmark", teamId: "falcons", role: "Rifler", age: 28, rating: 1.06, overall: 85, potential: 85 }),
  makePlayer({ nickname: "Snappi", nationality: "Denmark", teamId: "falcons", role: "IGL", age: 35, rating: 0.93, overall: 78, potential: 78 }),
  makePlayer({ nickname: "SunPayus", nationality: "Spain", teamId: "falcons", role: "AWPer", age: 27, rating: 1.10, overall: 86, potential: 87 }),
  makePlayer({ nickname: "Maden", nationality: "Montenegro", teamId: "falcons", role: "Entry", age: 26, rating: 1.04, overall: 80, potential: 81 }),
  makePlayer({ nickname: "BOROS", nationality: "Jordan", teamId: "falcons", role: "Rifler", age: 21, rating: 1.05, overall: 80, potential: 87 }),

  makePlayer({ nickname: "bLitz", nationality: "Mongolia", teamId: "the-mongolz", role: "IGL", age: 24, rating: 1.05, overall: 82, potential: 85 }),
  makePlayer({ nickname: "Techno", nationality: "Mongolia", teamId: "the-mongolz", role: "Entry", age: 20, rating: 1.10, overall: 84, potential: 90 }),
  makePlayer({ nickname: "Senzu", nationality: "Mongolia", teamId: "the-mongolz", role: "Rifler", age: 18, rating: 1.13, overall: 85, potential: 93 }),
  makePlayer({ nickname: "910", nationality: "Mongolia", teamId: "the-mongolz", role: "AWPer", age: 22, rating: 1.09, overall: 83, potential: 88 }),
  makePlayer({ nickname: "mzinho", nationality: "Mongolia", teamId: "the-mongolz", role: "Support", age: 17, rating: 1.05, overall: 79, potential: 89 }),

  makePlayer({ nickname: "FL1T", nationality: "Russia", teamId: "virtus-pro", role: "Rifler", age: 24, rating: 1.07, overall: 83, potential: 85 }),
  makePlayer({ nickname: "fame", nationality: "Russia", teamId: "virtus-pro", role: "Rifler", age: 22, rating: 1.06, overall: 82, potential: 86 }),
  makePlayer({ nickname: "n0rb3r7", nationality: "Russia", teamId: "virtus-pro", role: "Support", age: 24, rating: 1.00, overall: 78, potential: 80 }),

  makePlayer({ nickname: "gla1ve", nationality: "Denmark", teamId: "ence", role: "IGL", age: 30, rating: 0.96, overall: 78, potential: 78 }),
  makePlayer({ nickname: "sdy", nationality: "Ukraine", teamId: "ence", role: "Rifler", age: 28, rating: 1.05, overall: 80, potential: 80 }),
  makePlayer({ nickname: "Goofy", nationality: "Poland", teamId: "ence", role: "Support", age: 24, rating: 1.01, overall: 76, potential: 79 }),
  makePlayer({ nickname: "hades", nationality: "Poland", teamId: "ence", role: "AWPer", age: 25, rating: 1.06, overall: 79, potential: 80 }),
  makePlayer({ nickname: "Kylar", nationality: "Poland", teamId: "ence", role: "Entry", age: 24, rating: 1.04, overall: 77, potential: 80 }),

  makePlayer({ nickname: "Krimbo", nationality: "Germany", teamId: "big", role: "Rifler", age: 23, rating: 1.09, overall: 82, potential: 86 }),
  makePlayer({ nickname: "syrsoN", nationality: "Germany", teamId: "big", role: "AWPer", age: 29, rating: 1.05, overall: 79, potential: 79 }),
  makePlayer({ nickname: "JDC", nationality: "Germany", teamId: "big", role: "Support", age: 25, rating: 1.01, overall: 76, potential: 78 }),
  makePlayer({ nickname: "prosus", nationality: "Germany", teamId: "big", role: "Entry", age: 21, rating: 1.03, overall: 75, potential: 81 }),

  makePlayer({ nickname: "KRIMZ", nationality: "Sweden", teamId: "fnatic", role: "Support", age: 31, rating: 1.02, overall: 80, potential: 80 }),
  makePlayer({ nickname: "MATYS", nationality: "Slovakia", teamId: "fnatic", role: "Entry", age: 22, rating: 1.07, overall: 79, potential: 84 }),
  makePlayer({ nickname: "bodyy", nationality: "France", teamId: "fnatic", role: "IGL", age: 28, rating: 1.00, overall: 77, potential: 78 }),
  makePlayer({ nickname: "afro", nationality: "France", teamId: "fnatic", role: "AWPer", age: 25, rating: 1.04, overall: 77, potential: 79 }),
  makePlayer({ nickname: "kRYSTAL", nationality: "Germany", teamId: "fnatic", role: "Rifler", age: 31, rating: 0.98, overall: 74, potential: 74 }),

  makePlayer({ nickname: "REZ", nationality: "Sweden", teamId: "ninjas-in-pyjamas", role: "Rifler", age: 28, rating: 1.04, overall: 80, potential: 80 }),
  makePlayer({ nickname: "r1nkle", nationality: "Ukraine", teamId: "ninjas-in-pyjamas", role: "AWPer", age: 20, rating: 1.09, overall: 81, potential: 89 }),
  makePlayer({ nickname: "alex", nationality: "Spain", teamId: "ninjas-in-pyjamas", role: "IGL", age: 30, rating: 0.98, overall: 76, potential: 76 }),
  makePlayer({ nickname: "maxster", nationality: "Sweden", teamId: "ninjas-in-pyjamas", role: "Entry", age: 20, rating: 1.02, overall: 75, potential: 82 }),
  makePlayer({ nickname: "isak", nationality: "Sweden", teamId: "ninjas-in-pyjamas", role: "Support", age: 24, rating: 1.01, overall: 76, potential: 78 }),

  makePlayer({ nickname: "volt", nationality: "United Kingdom", teamId: "gamerlegion", role: "Rifler", age: 23, rating: 1.05, overall: 78, potential: 82 }),
  makePlayer({ nickname: "ztr", nationality: "Sweden", teamId: "gamerlegion", role: "IGL", age: 22, rating: 0.99, overall: 76, potential: 81 }),
  makePlayer({ nickname: "acoR", nationality: "Denmark", teamId: "gamerlegion", role: "AWPer", age: 28, rating: 1.04, overall: 78, potential: 78 }),
  makePlayer({ nickname: "Tauson", nationality: "Denmark", teamId: "gamerlegion", role: "Entry", age: 20, rating: 1.05, overall: 77, potential: 84 }),
  makePlayer({ nickname: "sl3nd", nationality: "Hungary", teamId: "gamerlegion", role: "Support", age: 20, rating: 1.03, overall: 76, potential: 83 }),

  makePlayer({ nickname: "Maka", nationality: "France", teamId: "3dmax", role: "AWPer", age: 28, rating: 1.05, overall: 78, potential: 78 }),
  makePlayer({ nickname: "Lucky", nationality: "France", teamId: "3dmax", role: "Rifler", age: 27, rating: 1.04, overall: 77, potential: 78 }),
  makePlayer({ nickname: "Ex3rcice", nationality: "France", teamId: "3dmax", role: "Entry", age: 25, rating: 1.05, overall: 77, potential: 79 }),
  makePlayer({ nickname: "Djoko", nationality: "France", teamId: "3dmax", role: "Support", age: 27, rating: 1.01, overall: 75, potential: 76 }),
  makePlayer({ nickname: "Graviti", nationality: "France", teamId: "3dmax", role: "IGL", age: 26, rating: 0.99, overall: 74, potential: 76 }),

  makePlayer({ nickname: "woxic", nationality: "Turkey", teamId: "aurora", role: "AWPer", age: 27, rating: 1.08, overall: 84, potential: 84 }),
  makePlayer({ nickname: "XANTARES", nationality: "Turkey", teamId: "aurora", role: "Rifler", age: 30, rating: 1.12, overall: 87, potential: 87 }),
  makePlayer({ nickname: "MAJ3R", nationality: "Turkey", teamId: "aurora", role: "IGL", age: 34, rating: 0.99, overall: 80, potential: 80 }),
  makePlayer({ nickname: "Wicadia", nationality: "Turkey", teamId: "aurora", role: "Entry", age: 20, rating: 1.08, overall: 82, potential: 89 }),
  makePlayer({ nickname: "Calyx", nationality: "Turkey", teamId: "aurora", role: "Support", age: 27, rating: 1.04, overall: 80, potential: 80 }),

  makePlayer({ nickname: "MUTiRiS", nationality: "Portugal", teamId: "saw", role: "IGL", age: 32, rating: 0.98, overall: 76, potential: 76 }),
  makePlayer({ nickname: "roman", nationality: "Portugal", teamId: "saw", role: "Rifler", age: 31, rating: 1.03, overall: 78, potential: 78 }),
  makePlayer({ nickname: "story", nationality: "Portugal", teamId: "saw", role: "AWPer", age: 22, rating: 1.07, overall: 79, potential: 85 }),
  makePlayer({ nickname: "arrozdoce", nationality: "Portugal", teamId: "saw", role: "Entry", age: 23, rating: 1.06, overall: 78, potential: 82 }),
  makePlayer({ nickname: "ewjerkz", nationality: "Portugal", teamId: "saw", role: "Rifler", age: 23, rating: 1.08, overall: 80, potential: 84 }),

  makePlayer({ nickname: "kyxsan", nationality: "Macedonia", teamId: "heroic", role: "IGL", age: 25, rating: 1.00, overall: 79, potential: 82 }),
  makePlayer({ nickname: "degster", nationality: "Russia", teamId: "heroic", role: "AWPer", age: 24, rating: 1.09, overall: 83, potential: 86 }),
  makePlayer({ nickname: "TeSeS", nationality: "Denmark", teamId: "heroic", role: "Rifler", age: 25, rating: 1.05, overall: 81, potential: 82 }),
  makePlayer({ nickname: "sjuush", nationality: "Denmark", teamId: "heroic", role: "Support", age: 27, rating: 1.01, overall: 78, potential: 78 }),
  makePlayer({ nickname: "NertZHeroic", nationality: "Israel", teamId: "heroic", role: "Entry", age: 26, rating: 1.08, overall: 82, potential: 83 }),

  makePlayer({ nickname: "Ax1Le", nationality: "Russia", teamId: "cloud9", role: "Rifler", age: 24, rating: 1.08, overall: 84, potential: 86 }),
  makePlayer({ nickname: "Boombl4", nationality: "Russia", teamId: "cloud9", role: "IGL", age: 27, rating: 0.98, overall: 79, potential: 79 }),
  makePlayer({ nickname: "Perfecto", nationality: "Russia", teamId: "cloud9", role: "Support", age: 26, rating: 1.03, overall: 81, potential: 82 }),
  makePlayer({ nickname: "HObbit", nationality: "Kazakhstan", teamId: "cloud9", role: "Rifler", age: 32, rating: 1.02, overall: 80, potential: 80 }),
  makePlayer({ nickname: "ICY", nationality: "Kazakhstan", teamId: "cloud9", role: "AWPer", age: 20, rating: 1.06, overall: 79, potential: 87 }),

  makePlayer({ nickname: "nafany", nationality: "Russia", teamId: "betboom", role: "IGL", age: 25, rating: 0.99, overall: 78, potential: 81 }),
  makePlayer({ nickname: "zorte", nationality: "Russia", teamId: "betboom", role: "AWPer", age: 26, rating: 1.08, overall: 82, potential: 83 }),
  makePlayer({ nickname: "s1ren", nationality: "Russia", teamId: "betboom", role: "Rifler", age: 22, rating: 1.05, overall: 80, potential: 85 }),
  makePlayer({ nickname: "KaiR0N", nationality: "Russia", teamId: "betboom", role: "Entry", age: 21, rating: 1.06, overall: 80, potential: 86 }),
  makePlayer({ nickname: "magnojez", nationality: "Russia", teamId: "betboom", role: "Support", age: 22, rating: 1.03, overall: 78, potential: 83 }),

  makePlayer({ nickname: "npl", nationality: "Ukraine", teamId: "b8", role: "Rifler", age: 20, rating: 1.07, overall: 80, potential: 88 }),
  makePlayer({ nickname: "headtr1ck", nationality: "Ukraine", teamId: "b8", role: "AWPer", age: 21, rating: 1.08, overall: 81, potential: 89 }),
  makePlayer({ nickname: "alex666", nationality: "Ukraine", teamId: "b8", role: "IGL", age: 23, rating: 0.99, overall: 75, potential: 80 }),
  makePlayer({ nickname: "esenthial", nationality: "Ukraine", teamId: "b8", role: "Support", age: 22, rating: 1.02, overall: 75, potential: 81 }),
  makePlayer({ nickname: "kensizor", nationality: "Ukraine", teamId: "b8", role: "Entry", age: 21, rating: 1.04, overall: 76, potential: 83 }),

  makePlayer({ nickname: "westmelon", nationality: "China", teamId: "lynn-vision", role: "IGL", age: 26, rating: 1.00, overall: 75, potential: 76 }),
  makePlayer({ nickname: "Starry", nationality: "China", teamId: "lynn-vision", role: "Rifler", age: 20, rating: 1.08, overall: 80, potential: 87 }),
  makePlayer({ nickname: "z4kr", nationality: "China", teamId: "lynn-vision", role: "Entry", age: 22, rating: 1.05, overall: 77, potential: 82 }),
  makePlayer({ nickname: "EmiliaQAQ", nationality: "China", teamId: "lynn-vision", role: "Support", age: 24, rating: 1.01, overall: 74, potential: 78 }),
  makePlayer({ nickname: "JeeLV", nationality: "China", teamId: "lynn-vision", role: "AWPer", age: 21, rating: 1.05, overall: 77, potential: 84 }),

  makePlayer({ nickname: "advent", nationality: "China", teamId: "tyloo", role: "IGL", age: 32, rating: 0.96, overall: 74, potential: 74 }),
  makePlayer({ nickname: "JamYoung", nationality: "China", teamId: "tyloo", role: "Rifler", age: 24, rating: 1.09, overall: 82, potential: 85 }),
  makePlayer({ nickname: "Mercury", nationality: "China", teamId: "tyloo", role: "Entry", age: 24, rating: 1.05, overall: 78, potential: 81 }),
  makePlayer({ nickname: "Moseyuh", nationality: "China", teamId: "tyloo", role: "Rifler", age: 22, rating: 1.06, overall: 79, potential: 84 }),
  makePlayer({ nickname: "Jee", nationality: "China", teamId: "tyloo", role: "AWPer", age: 21, rating: 1.05, overall: 77, potential: 84 }),

  makePlayer({ nickname: "INS", nationality: "Australia", teamId: "flyquest", role: "Rifler", age: 26, rating: 1.08, overall: 82, potential: 83 }),
  makePlayer({ nickname: "aliStair", nationality: "Australia", teamId: "flyquest", role: "AWPer", age: 26, rating: 1.05, overall: 79, potential: 80 }),
  makePlayer({ nickname: "Vexite", nationality: "Australia", teamId: "flyquest", role: "Entry", age: 20, rating: 1.07, overall: 80, potential: 87 }),

  makePlayer({ nickname: "free1", nationality: "Brazil", role: "Rifler", age: 20, rating: 1.04, overall: 73, potential: 82, status: "FreeAgent" }),
  makePlayer({ nickname: "free2", nationality: "Europe", role: "Support", age: 22, rating: 1.01, overall: 72, potential: 80, status: "FreeAgent" }),
];

function makePlayer(spec: PlayerSpec): RealPlayer {
  const id = slug(spec.nickname);
  const roleBonus = spec.role === "IGL" ? 8 : spec.role === "AWPer" ? 5 : 0;
  const potential = spec.potential ?? Math.min(99, spec.overall + 4);
  const youngBonus = spec.age && spec.age <= 21 ? 4 : 0;

  return {
    id,
    nickname: spec.nickname,
    nationality: spec.nationality,
    age: spec.age,
    teamId: spec.teamId,
    role: spec.role,
    rating: spec.rating,
    overall: spec.overall,
    potential,
    salary: Math.round((spec.overall * 4200 + potential * 1200) / 1000) * 1000,
    marketValue: Math.round((spec.overall * 46000 + potential * 21000) / 10000) * 10000,
    morale: 68,
    form: 70 + Math.max(0, Math.round((spec.rating ?? 1) * 8 - 8)),
    mechanics: clamp(spec.overall + (spec.role === "Rifler" ? 4 : 0), 45, 99),
    aim: clamp(spec.overall + (spec.role === "AWPer" || spec.role === "Entry" ? 5 : 1), 45, 99),
    reflex: clamp(spec.overall + (spec.role === "Entry" ? 5 : 0) + youngBonus, 45, 99),
    gameSense: clamp(spec.overall + (spec.role === "IGL" ? 7 : 0), 45, 99),
    utility: clamp(spec.overall + (spec.role === "Support" ? 7 : 0), 45, 99),
    clutch: clamp(spec.overall + (spec.role === "Lurker" || spec.role === "AWPer" ? 5 : 0), 45, 99),
    communication: clamp(spec.overall + roleBonus, 45, 99),
    consistency: clamp(spec.overall + (spec.age && spec.age >= 27 ? 2 : 0), 45, 99),
    mental: clamp(spec.overall + (spec.age && spec.age >= 27 ? 4 : 0), 45, 99),
    leadership: clamp(spec.overall + (spec.role === "IGL" ? 12 : -2), 35, 99),
    experience: clamp((spec.age ?? 23) * 3 + (spec.role === "IGL" ? 8 : 0), 35, 99),
    preferredMaps: spec.preferredMaps ?? defaultPreferred,
    weakMaps: spec.weakMaps ?? defaultWeak,
    status: spec.status ?? "Starter",
    isGenerated: false,
    fatigue: 0,
  };
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
