import { RealPlayerTable } from "../components/database/PlayerTable";
import { useGameStore } from "../store/gameStore";

export function PlayerDatabase() {
  const players = useGameStore((state) => state.players);
  const teams = useGameStore((state) => state.teams);

  return (
    <div className="grid gap-4">
      <section className="panel rounded-lg p-4">
        <p className="text-xs font-semibold uppercase text-paper/55">
          Banco de dados
        </p>
        <h3 className="mt-2 text-2xl font-black">Jogadores reais em texto</h3>
      </section>
      <RealPlayerTable players={players} teams={teams} />
    </div>
  );
}
