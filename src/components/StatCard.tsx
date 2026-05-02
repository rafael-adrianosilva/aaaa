import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  detail?: string;
  icon?: ReactNode;
  accent?: "mint" | "coral" | "amber" | "sky";
}

const accentClasses = {
  mint: "text-mint",
  coral: "text-coral",
  amber: "text-amber",
  sky: "text-sky",
};

export function StatCard({
  label,
  value,
  detail,
  icon,
  accent = "mint",
}: StatCardProps) {
  return (
    <section className="panel rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-paper/55">{label}</p>
          <p className="mt-2 text-2xl font-black leading-tight text-paper">{value}</p>
        </div>
        {icon ? <div className={`${accentClasses[accent]} mt-1`}>{icon}</div> : null}
      </div>
      {detail ? <p className="mt-2 text-sm text-paper/62">{detail}</p> : null}
    </section>
  );
}
