import type { RealPlayer } from "../types/RealPlayer";

export const realAcademyPlayers: Partial<RealPlayer>[] = [
  // FURIA Academy
  { nickname: "kauez", teamId: "furia", overall: 68, potential: 82, age: 19, role: "Rifler", status: "Academy", nationality: "Brazil", rarity: "Rare", developmentStatus: "Promissor" },
  { nickname: "zmb", teamId: "furia", overall: 65, potential: 78, age: 20, role: "Entry", status: "Academy", nationality: "Brazil", rarity: "Uncommon", developmentStatus: "Bruto" },
  
  // NAVI Junior
  { nickname: "froster", teamId: "natus-vincere", overall: 70, potential: 85, age: 17, role: "AWPer", status: "Academy", nationality: "Ukraine", rarity: "Wonderkid", developmentStatus: "PotencialEstrela" },
  { nickname: "krutoi", teamId: "natus-vincere", overall: 64, potential: 79, age: 16, role: "Rifler", status: "Academy", nationality: "Ukraine", rarity: "Rare", developmentStatus: "Promissor" },

  // MOUZ NXT
  { nickname: "sirah", teamId: "mouz", overall: 72, potential: 84, age: 18, role: "Entry", status: "Academy", nationality: "Denmark", rarity: "Rare", developmentStatus: "ProntoTier2" },
  { nickname: "Burmylo", teamId: "mouz", overall: 67, potential: 81, age: 19, role: "Rifler", status: "Academy", nationality: "Ukraine", rarity: "Rare", developmentStatus: "Promissor" },

  // Vitality (Talent)
  { nickname: "Kyojin", teamId: "vitality", overall: 69, potential: 77, age: 22, role: "Rifler", status: "Academy", nationality: "France", rarity: "Common", developmentStatus: "ProntoTier3" },
  
  // G2 (Academy Project)
  { nickname: "nexa", teamId: "g2", overall: 71, potential: 78, age: 21, role: "Support", status: "Academy", nationality: "Serbia", rarity: "Uncommon", developmentStatus: "ProntoTier2" },
];
