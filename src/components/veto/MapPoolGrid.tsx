import type { CSMap } from "../../types/CSMap";

export function MapPoolGrid({
  maps,
  bannedMapIds,
  pickedMapIds,
  selectedMapId,
  onSelect,
}: {
  maps: CSMap[];
  bannedMapIds: string[];
  pickedMapIds: string[];
  selectedMapId?: string;
  onSelect: (mapId: string) => void;
}) {
  const banned = new Set(bannedMapIds);
  const picked = new Set(pickedMapIds);

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {maps.map((map) => {
        const unavailable = banned.has(map.id) || picked.has(map.id);
        const selected = selectedMapId === map.id;

        return (
          <button
            key={map.id}
            className={`min-h-28 rounded-lg border p-3 text-left transition ${
              selected
                ? "border-mint bg-mint/14"
                : unavailable
                  ? "border-line/70 bg-ink/35 opacity-45"
                  : "border-line bg-panel/70 hover:border-mint"
            }`}
            type="button"
            disabled={unavailable}
            onClick={() => onSelect(map.id)}
          >
            <span className="block text-lg font-black">{map.name}</span>
            <span className="mt-2 block text-sm text-paper/58">{map.type}</span>
            <span className="mt-3 block text-xs text-paper/48">
              CT {map.ctBias} · T {map.tBias}
            </span>
          </button>
        );
      })}
    </div>
  );
}
