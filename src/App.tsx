import { CareerSetup } from "./pages/CareerSetup";
import { Dashboard } from "./pages/Dashboard";
import { MainMenu } from "./pages/MainMenu";
import { useGameStore } from "./store/gameStore";

export default function App() {
  const screen = useGameStore((state) => state.screen);
  const career = useGameStore((state) => state.career);

  if (screen === "career-setup") {
    return <CareerSetup />;
  }

  if (screen === "game" && career) {
    return <Dashboard />;
  }

  return <MainMenu />;
}
