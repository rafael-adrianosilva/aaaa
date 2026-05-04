import type { CSMap } from "../../types/CSMap";
import type { RealPlayer } from "../../types/RealPlayer";
import type { RealTeam } from "../../types/RealTeam";
import type { MapResult } from "../../types/Series";
import type { SeriesMap, Side } from "../../types/Veto";
import { simulateRound } from "./roundSimulator";

export function simulateMap(params: {
  seriesMap: SeriesMap;
  map: CSMap;
  teamA: RealTeam;
  teamB: RealTeam;
  players: RealPlayer[];
  seed: string;
}): MapResult {
  let scoreA = 0;
  let scoreB = 0;
  let economyTeamA = 800;
  let economyTeamB = 800;
  let momentum = 0;
  const rounds = [];
  let roundNumber = 1;

  while (!hasMapWinner(scoreA, scoreB, roundNumber - 1) && roundNumber <= 60) {
    const sideTeamA = sideForRound(
      roundNumber,
      params.seriesMap.startingSideTeamA,
    );
    const sideTeamB: Side = sideTeamA === "CT" ? "T" : "CT";

    if (roundNumber === 13) {
      economyTeamA = 800;
      economyTeamB = 800;
    }

    if (roundNumber === 25) {
      economyTeamA = 10000;
      economyTeamB = 10000;
    }

    const result = simulateRound({
      roundNumber,
      teamA: params.teamA,
      teamB: params.teamB,
      players: params.players,
      map: params.map,
      sideTeamA,
      sideTeamB,
      economyTeamA,
      economyTeamB,
      scoreA,
      scoreB,
      momentum,
      seed: `${params.seed}-${roundNumber}`,
    });

    rounds.push(result);
    scoreA = result.scoreA;
    scoreB = result.scoreB;
    economyTeamA = result.economyTeamA;
    economyTeamB = result.economyTeamB;
    momentum = result.winnerTeamId === params.teamA.id
      ? Math.min(8, momentum + 1.4)
      : Math.max(-8, momentum - 1.4);
    roundNumber += 1;
  }

  const playerStats = calculateStats(params.players, rounds);

  return {
    mapId: params.map.id,
    teamAId: params.teamA.id,
    teamBId: params.teamB.id,
    scoreA,
    scoreB,
    winnerTeamId: scoreA > scoreB ? params.teamA.id : params.teamB.id,
    rounds,
    playerStats,
  };
}

function calculateStats(players: RealPlayer[], rounds: import("../../types/Round").RoundResult[]): import("../../types/Round").PlayerMatchStats[] {
  const statsMap = new Map<string, import("../../types/Round").PlayerMatchStats>();
  
  for (const round of rounds) {
    for (const kill of round.killFeed) {
      // Killer stats
      const kStats = statsMap.get(kill.killerId) || {
        playerId: kill.killerId,
        kills: 0,
        deaths: 0,
        assists: 0,
        adr: 0,
        rating: 0,
        hsp: 0,
      };
      kStats.kills += 1;
      if (kill.isHeadshot) kStats.hsp += 1;
      statsMap.set(kill.killerId, kStats);

      // Victim stats
      const vStats = statsMap.get(kill.victimId) || {
        playerId: kill.victimId,
        kills: 0,
        deaths: 0,
        assists: 0,
        adr: 0,
        rating: 0,
        hsp: 0,
      };
      vStats.deaths += 1;
      statsMap.set(kill.victimId, vStats);
    }
  }

  return [...statsMap.values()].map(s => ({
    ...s,
    hsp: Math.round((s.hsp / (s.kills || 1)) * 100),
    adr: 70 + Math.floor(s.kills * 2.5 - s.deaths * 1.5 + Math.random() * 20),
    rating: Number((0.8 + (s.kills / (rounds.length || 1)) * 1.2 - (s.deaths / (rounds.length || 1)) * 0.4).toFixed(2)),
  }));
}

export function skipMap(params: Parameters<typeof simulateMap>[0]) {
  return simulateMap(params);
}

function sideForRound(roundNumber: number, startingSideTeamA: Side): Side {
  if (roundNumber <= 12) {
    return startingSideTeamA;
  }

  if (roundNumber <= 24) {
    return startingSideTeamA === "CT" ? "T" : "CT";
  }

  const overtimeRound = roundNumber - 25;
  const block = Math.floor(overtimeRound / 3);
  const usesStartingSide = block % 2 === 0;

  return usesStartingSide ? startingSideTeamA : startingSideTeamA === "CT" ? "T" : "CT";
}

function hasMapWinner(scoreA: number, scoreB: number, roundsPlayed: number) {
  if (roundsPlayed < 24) {
    return scoreA >= 13 || scoreB >= 13;
  }

  if (roundsPlayed === 24 && scoreA !== scoreB) {
    return scoreA >= 13 || scoreB >= 13;
  }

  if (roundsPlayed >= 30 && (roundsPlayed - 24) % 6 === 0 && scoreA !== scoreB) {
    return true;
  }

  return false;
}
