import type { RoundResult } from "../../types/Round";
import type { RealPlayer } from "../../types/RealPlayer";
import type { RealTeam } from "../../types/RealTeam";

export function RoundLog({
  rounds,
  teams,
  players,
}: {
  rounds: RoundResult[];
  teams: RealTeam[];
  players: RealPlayer[];
}) {
  return (
    <div className="thin-scrollbar grid max-h-[520px] gap-2 overflow-y-auto pr-1">
      {rounds.length === 0 ? (
        <p className="rounded-md border border-line bg-ink/25 px-3 py-3 text-sm text-paper/62">
          Aguardando o primeiro round.
        </p>
      ) : (
        [...rounds].reverse().map((round) => {
          const winner = teams.find((team) => team.id === round.winnerTeamId);
          const mvp = players.find((player) => player.id === round.mvpPlayerId);

          return (
            <article
              key={round.roundNumber}
              className="rounded-md border border-line/70 bg-ink/25 px-3 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-black">
                  Round {round.roundNumber} · {winner?.name ?? "Time"}
                </p>
                <span className="text-sm text-mint">
                  {round.scoreA} x {round.scoreB}
                </span>
              </div>
              <p className="mt-1 text-sm text-paper/66">{round.keyEvent}</p>
              <p className="mt-2 text-xs text-paper/45">
                MVP {mvp?.nickname ?? "-"} · {round.winCondition} ·{" "}
                {round.buyTypeTeamA}/{round.buyTypeTeamB}
              </p>
            </article>
          );
        })
      )}
    </div>
  );
}
