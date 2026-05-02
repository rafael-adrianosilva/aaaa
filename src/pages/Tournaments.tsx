import { useState } from "react";
import { TournamentCard } from "../components/tournaments/TournamentCard";
import {
  TournamentFilters,
  type TournamentFilter,
} from "../components/tournaments/TournamentFilters";
import { useGameStore } from "../store/gameStore";
import type { Tournament } from "../types/Tournament";

export function Tournaments() {
  const [filter, setFilter] = useState<TournamentFilter>("All");
  const tournaments = useGameStore((state) => state.tournaments);
  const calendar = useGameStore((state) => state.calendar);
  const rankings = useGameStore((state) => state.rankings);
  const teams = useGameStore((state) => state.teams);
  const selectTournament = useGameStore((state) => state.selectTournament);
  const startVeto = useGameStore((state) => state.startVeto);
  const filtered = tournaments.filter((tournament) => matchesFilter(tournament, filter));

  return (
    <div className="grid gap-5">
      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="panel rounded-lg p-4">
          <p className="text-xs font-semibold uppercase text-paper/55">
            Calendario competitivo
          </p>
          <div className="mt-3 grid gap-2">
            {calendar.slice(0, 6).map((event) => (
              <button
                key={event.id}
                className="flex items-center justify-between gap-3 rounded-md border border-line/70 bg-ink/25 px-3 py-3 text-left hover:border-mint"
                type="button"
                onClick={() => selectTournament(event.tournamentId)}
              >
                <span>
                  <span className="block font-bold">{event.name}</span>
                  <span className="text-xs text-paper/52">
                    {event.startDate} · {event.region}
                  </span>
                </span>
                <span className="text-xs text-paper/52">{event.status}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="panel rounded-lg p-4">
          <p className="text-xs font-semibold uppercase text-paper/55">
            Ranking global
          </p>
          <div className="mt-3 grid gap-2">
            {rankings.slice(0, 8).map((entry) => {
              const team = teams.find((item) => item.id === entry.teamId);

              return (
                <p
                  key={entry.teamId}
                  className="flex items-center justify-between rounded-md border border-line/70 bg-ink/25 px-3 py-2 text-sm"
                >
                  <span>
                    #{entry.globalRank} {team?.name ?? entry.teamId}
                  </span>
                  <span className="text-mint">{entry.points}</span>
                </p>
              );
            })}
          </div>
        </div>
      </section>
      <TournamentFilters selected={filter} onChange={setFilter} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            onDetails={selectTournament}
            onPlay={startVeto}
          />
        ))}
      </div>
    </div>
  );
}

function matchesFilter(tournament: Tournament, filter: TournamentFilter) {
  if (filter === "All") {
    return true;
  }

  if (filter === "S-Tier") {
    return tournament.tier === "S";
  }

  if (filter === "A-Tier") {
    return tournament.tier === "A";
  }

  if (filter === "B-Tier") {
    return tournament.tier === "B";
  }

  if (filter === "C-Tier") {
    return tournament.tier === "C";
  }

  if (filter === "Regionais") {
    return tournament.tier === "Regional";
  }

  if (filter === "Brasil") {
    return tournament.region === "Brazil";
  }

  if (filter === "Europa") {
    return tournament.region === "Europe";
  }

  if (filter === "Americas") {
    return tournament.region === "Americas" || tournament.region.includes("America");
  }

  if (filter === "Asia") {
    return tournament.region === "Asia";
  }

  if (filter === "Online") {
    return !tournament.city;
  }

  if (filter === "LAN") {
    return Boolean(tournament.city);
  }

  if (filter === "Upcoming" || filter === "Ongoing" || filter === "Finished") {
    return tournament.status === filter;
  }

  return tournament.tier === filter;
}
