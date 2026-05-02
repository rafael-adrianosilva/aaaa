import { useEffect, useMemo, useRef } from "react";
import Phaser from "phaser";
import type { Fixture, MatchResult, Team } from "../types/game";
import { MatchScene, type MatchSceneData } from "../phaser/scenes/MatchScene";

interface PhaserMatchPreviewProps {
  homeTeam: Team | null;
  awayTeam: Team | null;
  fixture: Fixture | null;
  result: MatchResult | null;
}

export function PhaserMatchPreview({
  homeTeam,
  awayTeam,
  fixture,
  result,
}: PhaserMatchPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const payload = useMemo<MatchSceneData | null>(() => {
    if (!homeTeam || !awayTeam) {
      return null;
    }

    const winner =
      result?.winnerTeamId === homeTeam.id
        ? homeTeam
        : result?.winnerTeamId === awayTeam.id
          ? awayTeam
          : null;

    return {
      home: {
        name: homeTeam.name,
        tag: homeTeam.tag,
        color: homeTeam.color,
      },
      away: {
        name: awayTeam.name,
        tag: awayTeam.tag,
        color: awayTeam.color,
      },
      score: result?.score,
      winnerTag: winner?.tag,
      roundLabel: fixture ? `Rodada ${fixture.round}` : "Centro de analise",
    };
  }, [awayTeam, fixture, homeTeam, result]);

  useEffect(() => {
    if (!containerRef.current || !payload) {
      return;
    }

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerRef.current,
      backgroundColor: "#101012",
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 720,
        height: 360,
      },
      scene: [],
      render: {
        antialias: true,
      },
    });

    game.scene.add("match-scene", MatchScene, true, payload);

    return () => {
      game.destroy(true);
    };
  }, [payload]);

  return (
    <div className="panel aspect-[2/1] min-h-[220px] overflow-hidden rounded-lg">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
