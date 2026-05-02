import type { Team, TeamSeed } from "../types/game";

interface TeamBadgeProps {
  team: Team | TeamSeed;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
};

export function TeamBadge({ team, size = "md" }: TeamBadgeProps) {
  return (
    <div
      className={`${sizeClasses[size]} grid shrink-0 place-items-center rounded-md border border-paper/20 font-black text-ink shadow-insetline`}
      style={{ backgroundColor: team.color }}
      title={team.name}
    >
      {team.crest}
    </div>
  );
}
