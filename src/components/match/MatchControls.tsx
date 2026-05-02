import { BarChart3, FastForward, Pause, Play, SkipForward } from "lucide-react";

export function MatchControls({
  autoPlay,
  onNextRound,
  onAutoPlay,
  onPause,
  onSkipRound,
  onSkipMap,
  onSkipSeries,
  onStats,
}: {
  autoPlay: boolean;
  onNextRound: () => void;
  onAutoPlay: () => void;
  onPause: () => void;
  onSkipRound: () => void;
  onSkipMap: () => void;
  onSkipSeries: () => void;
  onStats: () => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-6">
      <button className="control-button bg-mint text-ink" type="button" onClick={onNextRound}>
        <Play size={16} />
        Proximo round
      </button>
      <button className="control-button" type="button" onClick={onAutoPlay}>
        <FastForward size={16} />
        {autoPlay ? "Auto ligado" : "Auto-play"}
      </button>
      <button className="control-button" type="button" onClick={onPause}>
        <Pause size={16} />
        Pausar
      </button>
      <button className="control-button" type="button" onClick={onSkipRound}>
        <SkipForward size={16} />
        Pular round
      </button>
      <button className="control-button" type="button" onClick={onSkipMap}>
        <SkipForward size={16} />
        Pular mapa
      </button>
      <button className="control-button" type="button" onClick={onSkipSeries}>
        <BarChart3 size={16} />
        Pular serie
      </button>
      <button className="control-button sm:col-span-2 xl:col-span-6" type="button" onClick={onStats}>
        <BarChart3 size={16} />
        Ver estatisticas
      </button>
    </div>
  );
}
