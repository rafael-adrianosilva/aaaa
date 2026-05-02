import { CalendarDays, DollarSign, Eye, Play } from "lucide-react";
import { formatUSD } from "../../game/selectors";
import { getChampionPrize } from "../../game/tournaments/prizeManager";
import type { Tournament } from "../../types/Tournament";

export function TournamentCard({
  tournament,
  onDetails,
  onPlay,
}: {
  tournament: Tournament;
  onDetails: (id: string) => void;
  onPlay: (id: string) => void;
}) {
  const championPrize = getChampionPrize(tournament);

  return (
    <article className="panel rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-mint/12 px-2 py-1 text-xs font-black text-mint">
              {tournament.tier}
            </span>
            <span className="rounded-md bg-paper/8 px-2 py-1 text-xs text-paper/68">
              {tournament.region}
            </span>
            <span className="rounded-md bg-paper/8 px-2 py-1 text-xs text-paper/68">
              {tournament.status}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-black">{tournament.displayName}</h3>
          <p className="mt-1 text-sm text-paper/60">
            {tournament.organizer} · {tournament.teamsCount} times ·{" "}
            {tournament.format}
          </p>
        </div>
        <DollarSign className="text-amber" size={22} />
      </div>

      <div className="mt-4 grid gap-2 text-sm text-paper/70">
        <p className="flex items-center gap-2">
          <CalendarDays size={15} />
          {tournament.startDate} ate {tournament.endDate}
        </p>
        <p>Prize pool: {formatUSD(tournament.prizePool)}</p>
        <p>Campeao: {formatUSD(championPrize?.amount ?? 0)}</p>
        <p>Classificacao: {tournament.qualificationMethod}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-md border border-line bg-paper/8 font-bold text-paper hover:border-sky hover:text-sky"
          type="button"
          onClick={() => onDetails(tournament.id)}
        >
          <Eye size={16} />
          Detalhes
        </button>
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-md bg-mint font-black text-ink hover:brightness-110"
          type="button"
          onClick={() => onPlay(tournament.id)}
        >
          <Play size={16} />
          Jogar
        </button>
      </div>
    </article>
  );
}
