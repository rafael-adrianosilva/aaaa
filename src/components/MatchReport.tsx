import type { CareerState, MatchResult } from "../types/game";
import { formatMoney, getPlayer, getTeam } from "../game/selectors";
import { TeamBadge } from "./TeamBadge";

interface MatchReportProps {
  career: CareerState;
  result: MatchResult | null;
}

export function MatchReport({ career, result }: MatchReportProps) {
  if (!result) {
    return (
      <section className="panel rounded-lg p-4">
        <p className="text-xs font-semibold uppercase text-paper/55">Ultima partida</p>
        <p className="mt-3 text-sm text-paper/64">
          A temporada ainda nao teve partida simulada.
        </p>
      </section>
    );
  }

  const homeTeam = getTeam(career, result.homeTeamId);
  const awayTeam = getTeam(career, result.awayTeamId);
  const mvp = getPlayer(career, result.mvpPlayerId);
  const userDelta = result.moneyDeltaByTeam[career.userTeamId] ?? 0;

  return (
    <section className="panel rounded-lg p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-paper/55">
            Ultima partida · Rodada {result.round}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {homeTeam ? <TeamBadge team={homeTeam} /> : null}
            <span className="font-bold text-paper">{homeTeam?.name}</span>
            <span className="text-2xl font-black text-amber">
              {result.score.home} x {result.score.away}
            </span>
            <span className="font-bold text-paper">{awayTeam?.name}</span>
            {awayTeam ? <TeamBadge team={awayTeam} /> : null}
          </div>
        </div>
        <div className="grid gap-1 text-sm text-paper/70">
          <span>
            MVP: <strong className="text-paper">{mvp?.nick ?? "N/A"}</strong>
          </span>
          <span>
            Caixa da partida:{" "}
            <strong className={userDelta >= 0 ? "text-mint" : "text-coral"}>
              {formatMoney(userDelta)}
            </strong>
          </span>
        </div>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {result.log.slice(0, 4).map((entry) => (
          <p
            key={entry}
            className="rounded-md border border-line/60 bg-ink/28 px-3 py-2 text-sm text-paper/70"
          >
            {entry}
          </p>
        ))}
      </div>
    </section>
  );
}
