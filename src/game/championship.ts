import type { Fixture, Team } from "../types/game";

export function generateRoundRobinSchedule(teams: Team[]): Fixture[] {
  const teamIds = teams.map((team) => team.id);
  const ids = teamIds.length % 2 === 0 ? teamIds : [...teamIds, "bye"];
  const rounds = ids.length - 1;
  const matchesPerRound = ids.length / 2;
  const schedule: Fixture[] = [];
  let rotation = [...ids];

  for (let roundIndex = 0; roundIndex < rounds; roundIndex += 1) {
    for (let matchIndex = 0; matchIndex < matchesPerRound; matchIndex += 1) {
      const left = rotation[matchIndex];
      const right = rotation[rotation.length - 1 - matchIndex];

      if (left !== "bye" && right !== "bye") {
        const swapHome = roundIndex % 2 === 1;
        const homeTeamId = swapHome ? right : left;
        const awayTeamId = swapHome ? left : right;

        schedule.push({
          id: `round-${roundIndex + 1}-match-${matchIndex + 1}`,
          round: roundIndex + 1,
          homeTeamId,
          awayTeamId,
          played: false,
        });
      }
    }

    rotation = [
      rotation[0],
      rotation[rotation.length - 1],
      ...rotation.slice(1, rotation.length - 1),
    ];
  }

  return schedule;
}

export function getRoundCount(schedule: Fixture[]) {
  return schedule.reduce((max, fixture) => Math.max(max, fixture.round), 0);
}
