import { TeamTable } from "../components/database/TeamTable";
import { useGameStore } from "../store/gameStore";

export function TeamDatabase() {
  const teams = useGameStore((state) => state.teams);
  const rankings = useGameStore((state) => state.rankings);

  return (
    <div className="grid gap-4">
      <section className="panel rounded-lg p-4">
        <p className="text-xs font-semibold uppercase text-paper/55">
          Banco de dados
        </p>
        <h3 className="mt-2 text-2xl font-black">Times reais em texto</h3>
      </section>
      <TeamTable teams={teams} rankings={rankings} />
    </div>
  );
}
