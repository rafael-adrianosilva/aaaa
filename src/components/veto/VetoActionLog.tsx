import { getVetoLogLine } from "../../game/veto/mapVetoManager";
import type { CSMap } from "../../types/CSMap";
import type { RealTeam } from "../../types/RealTeam";
import type { SeriesVetoResult } from "../../types/Veto";

export function VetoActionLog({
  veto,
  teams,
  maps,
}: {
  veto: SeriesVetoResult;
  teams: RealTeam[];
  maps: CSMap[];
}) {
  return (
    <div className="grid gap-2">
      {veto.actions.length === 0 ? (
        <p className="rounded-md border border-line/70 bg-ink/25 px-3 py-3 text-sm text-paper/60">
          Nenhuma acao de veto ainda.
        </p>
      ) : (
        veto.actions.map((action) => (
          <p
            key={`${action.order}-${action.action}`}
            className="rounded-md border border-line/70 bg-ink/25 px-3 py-3 text-sm text-paper/70"
          >
            {getVetoLogLine(action, teams, maps)}
          </p>
        ))
      )}
    </div>
  );
}
