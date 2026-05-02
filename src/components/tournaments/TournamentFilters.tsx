import type { TournamentStatus, TournamentTier } from "../../types/Tournament";

export type TournamentFilter =
  | "All"
  | TournamentTier
  | "S-Tier"
  | "A-Tier"
  | "B-Tier"
  | "C-Tier"
  | "Regionais"
  | "Brasil"
  | "Europa"
  | "Americas"
  | "Asia"
  | "Online"
  | "LAN"
  | TournamentStatus;

const filters: TournamentFilter[] = [
  "All",
  "Major",
  "S-Tier",
  "A-Tier",
  "B-Tier",
  "C-Tier",
  "Regionais",
  "Brasil",
  "Europa",
  "Americas",
  "Asia",
  "Online",
  "LAN",
  "Upcoming",
  "Ongoing",
  "Finished",
];

export function TournamentFilters({
  selected,
  onChange,
}: {
  selected: TournamentFilter;
  onChange: (filter: TournamentFilter) => void;
}) {
  return (
    <div className="thin-scrollbar flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`h-9 shrink-0 rounded-md border px-3 text-sm font-bold ${
            selected === filter
              ? "border-mint bg-mint text-ink"
              : "border-line bg-paper/8 text-paper/72 hover:border-mint"
          }`}
          type="button"
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
