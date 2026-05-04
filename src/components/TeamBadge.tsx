import type { Team, TeamSeed } from "../types/game";
import type { RealTeam } from "../types/RealTeam";

interface TeamBadgeProps {
  team: Team | TeamSeed | RealTeam | any | null;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-8 w-8 text-[10px]",
  md: "h-10 w-10 text-xs",
  lg: "h-14 w-14 text-sm",
  xl: "h-20 w-20 text-xl",
};

export function TeamBadge({ team, size = "md" }: TeamBadgeProps) {
  if (!team) return null;

  // Use type assertion to handle different team object structures safely
  const t = team as any;
  const color = t.color || t.primaryColor || "#333";
  const crest = t.crest || t.tag?.slice(0, 2) || t.name?.slice(0, 2) || "??";

  return (
    <div
      className={`${sizeClasses[size as keyof typeof sizeClasses]} grid shrink-0 place-items-center rounded-xl border border-line/40 font-black text-ink shadow-hard transition group-hover:scale-105`}
      style={{ backgroundColor: color }}
      title={t.name}
    >
      <span className="drop-shadow-sm uppercase">{crest}</span>
    </div>
  );
}
