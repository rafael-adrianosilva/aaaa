import {
  Activity,
  Banknote,
  BookOpen,
  CalendarDays,
  Database,
  Dumbbell,
  GraduationCap,
  Handshake,
  Home,
  LogOut,
  Megaphone,
  Play,
  Radio,
  Save,
  Search,
  Share2,
  Shield,
  ShoppingBag,
  Swords,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MatchReport } from "../components/MatchReport";
import { PhaserMatchPreview } from "../components/PhaserMatchPreview";
import { PlayerTable } from "../components/PlayerTable";
import { StatCard } from "../components/StatCard";
import { TeamBadge } from "../components/TeamBadge";
import { LiveMatch } from "./LiveMatch";
import { MapVeto } from "./MapVeto";
import { PlayerDatabase } from "./PlayerDatabase";
import { SeriesResultPage } from "./SeriesResult";
import { Sponsors } from "./Sponsors";
import { TeamDatabase } from "./TeamDatabase";
import { TournamentDetails } from "./TournamentDetails";
import { Tournaments } from "./Tournaments";
import { getRoundCount } from "../game/championship";
import {
  calculateWeeklyBalance,
  calculateWeeklyPayroll,
  calculateWeeklyRevenue,
  trainingCost,
  victoryPrize,
} from "../game/finance";
import {
  difficultyLabels,
  formatMoney,
  formatNumber,
  getAverageMorale,
  getFreeAgents,
  getNextFixture,
  getOpponentForFixture,
  getReservePlayers,
  getStandings,
  getStarters,
  getTeam,
  getTeamPlayers,
  getTeamPosition,
  getUserTeam,
  strategyLabels,
} from "../game/selectors";
import { useGameStore } from "../store/gameStore";
import type { CareerState, DashboardView, Strategy } from "../types/game";

const navItems: Array<{
  view: DashboardView;
  label: string;
  icon: LucideIcon;
}> = [
  { view: "overview", label: "Dashboard", icon: Home },
  { view: "roster", label: "Elenco", icon: Users },
  { view: "transfers", label: "Transferencias", icon: ShoppingBag },
  { view: "standings", label: "Tabela", icon: Trophy },
  { view: "training", label: "Treino", icon: Dumbbell },
  { view: "finances", label: "Financas", icon: Wallet },
  { view: "sponsors", label: "Patrocinios", icon: Handshake },
  { view: "tournaments", label: "Campeonatos", icon: CalendarDays },
  { view: "team-database", label: "Times CS", icon: Database },
  { view: "player-database", label: "Jogadores CS", icon: BookOpen },
  { view: "map-veto", label: "Veto", icon: Swords },
  { view: "live-match", label: "Live Match", icon: Play },
  { view: "series-result", label: "Resultado", icon: Trophy },
  { view: "academy", label: "Academy", icon: GraduationCap },
  { view: "solo-queue", label: "Solo Queue", icon: Search },
  { view: "social", label: "Rede Social", icon: Share2 },
];

const strategies: Strategy[] = [
  "balanced",
  "aggressive",
  "controlled",
  "development",
];

export function Dashboard() {
  const career = useGameStore((state) => state.career);
  const selectedView = useGameStore((state) => state.selectedView);
  const setView = useGameStore((state) => state.setView);
  const setStrategy = useGameStore((state) => state.setStrategy);
  const playNextMatch = useGameStore((state) => state.playNextMatch);
  const saveGame = useGameStore((state) => state.saveGame);
  const goToMenu = useGameStore((state) => state.goToMenu);
  const saveSlots = useGameStore((state) => state.saveSlots);

  if (!career) {
    return null;
  }

  const userTeam = getUserTeam(career);
  const roundCount = getRoundCount(career.schedule);
  const nextFixture = getNextFixture(career);
  const seasonDone = career.currentRound > roundCount;

  if (!userTeam) {
    return null;
  }

  return (
    <main className="app-shell min-h-screen">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-line/80 bg-ink/72 p-4 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <TeamBadge team={userTeam} size="lg" />
            <div>
              <p className="text-xs font-semibold uppercase text-paper/50">
                {difficultyLabels[career.difficulty]}
              </p>
              <h1 className="text-xl font-black">{userTeam.name}</h1>
              <p className="text-sm text-paper/56">{career.managerName}</p>
            </div>
          </div>

          <nav className="mt-6 grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const selected = selectedView === item.view;

              return (
                <button
                  key={item.view}
                  className={`flex h-10 items-center gap-3 rounded-md border px-3 text-left text-sm font-bold transition ${
                    selected
                      ? "border-mint bg-mint text-ink"
                      : "border-transparent bg-transparent text-paper/72 hover:border-line hover:bg-paper/8 hover:text-paper"
                  }`}
                  type="button"
                  onClick={() => setView(item.view)}
                >
                  <Icon size={17} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <section className="mt-6 rounded-lg border border-line/80 bg-paper/6 p-3">
            <p className="text-xs font-semibold uppercase text-paper/52">Estrategia</p>
            <div className="mt-3 grid gap-2">
              {strategies.map((strategy) => (
                <button
                  key={strategy}
                  className={`h-9 rounded-md border px-2 text-left text-sm font-bold transition ${
                    career.strategy === strategy
                      ? "border-amber bg-amber text-ink"
                      : "border-line bg-ink/30 text-paper/72 hover:border-amber"
                  }`}
                  type="button"
                  onClick={() => setStrategy(strategy)}
                >
                  {strategyLabels[strategy]}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-4 grid grid-cols-3 gap-2">
            {saveSlots.map((slot) => (
              <button
                key={slot.slot}
                className="grid h-10 place-items-center rounded-md border border-line bg-paper/8 text-paper hover:border-mint hover:text-mint"
                type="button"
                title={`Salvar no slot ${slot.slot}`}
                onClick={() => saveGame(slot.slot)}
              >
                <Save size={16} />
              </button>
            ))}
          </section>

          <button
            className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-md border border-line bg-paper/8 text-sm font-bold text-paper/70 hover:border-coral hover:text-coral"
            type="button"
            onClick={goToMenu}
          >
            <LogOut size={16} />
            Menu inicial
          </button>
        </aside>

        <section className="min-w-0 p-4 md:p-6">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase text-paper/50">
                Rodada {Math.min(career.currentRound, roundCount)} de {roundCount}
              </p>
              <h2 className="text-3xl font-black text-paper">
                {navItems.find((item) => item.view === selectedView)?.label}
              </h2>
            </div>
            <button
              className="flex h-12 items-center justify-center gap-2 rounded-md bg-coral px-5 font-black text-ink shadow-hard transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
              type="button"
              disabled={seasonDone || !nextFixture}
              onClick={playNextMatch}
            >
              <Play size={18} />
              Jogar proxima partida
            </button>
          </header>

          <div className="mt-6">
            {selectedView === "overview" ? (
              <OverviewView career={career} />
            ) : selectedView === "roster" ? (
              <RosterView career={career} />
            ) : selectedView === "transfers" ? (
              <TransfersView career={career} />
            ) : selectedView === "standings" ? (
              <StandingsView career={career} />
            ) : selectedView === "training" ? (
              <TrainingView career={career} />
            ) : selectedView === "finances" ? (
              <FinanceView career={career} />
            ) : selectedView === "sponsors" ? (
              <Sponsors />
            ) : selectedView === "tournaments" ? (
              <Tournaments />
            ) : selectedView === "tournament-details" ? (
              <TournamentDetails />
            ) : selectedView === "team-database" ? (
              <TeamDatabase />
            ) : selectedView === "player-database" ? (
              <PlayerDatabase />
            ) : selectedView === "map-veto" ? (
              <MapVeto />
            ) : selectedView === "live-match" ? (
              <LiveMatch />
            ) : selectedView === "series-result" ? (
              <SeriesResultPage />
            ) : selectedView === "academy" ? (
              <AcademyView career={career} />
            ) : selectedView === "solo-queue" ? (
              <SoloQueueView career={career} />
            ) : (
              <SocialView career={career} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function OverviewView({ career }: { career: CareerState }) {
  const setView = useGameStore((state) => state.setView);
  const userTeam = getUserTeam(career)!;
  const nextFixture = getNextFixture(career);
  const opponent = getOpponentForFixture(career, nextFixture);
  const roundCount = getRoundCount(career.schedule);
  const previewFixture = career.lastMatch
    ? career.schedule.find((fixture) => fixture.id === career.lastMatch?.fixtureId) ?? null
    : nextFixture;
  const previewHome = career.lastMatch
    ? getTeam(career, career.lastMatch.homeTeamId)
    : previewFixture
      ? getTeam(career, previewFixture.homeTeamId)
      : userTeam;
  const previewAway = career.lastMatch
    ? getTeam(career, career.lastMatch.awayTeamId)
    : previewFixture
      ? getTeam(career, previewFixture.awayTeamId)
      : opponent;

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Saldo" value={formatMoney(userTeam.money)} icon={<Banknote />} />
        <StatCard
          label="Torcida"
          value={formatNumber(userTeam.fans)}
          icon={<Megaphone />}
          accent="sky"
        />
        <StatCard
          label="Moral media"
          value={`${getAverageMorale(career, userTeam.id)}`}
          icon={<Activity />}
          accent="amber"
        />
        <StatCard
          label="Posicao"
          value={`${getTeamPosition(career, userTeam.id)}o`}
          detail={`Rodada ${Math.min(career.currentRound, roundCount)} de ${roundCount}`}
          icon={<Trophy />}
          accent="coral"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5">
          <PhaserMatchPreview
            homeTeam={previewHome}
            awayTeam={previewAway}
            fixture={previewFixture}
            result={career.lastMatch}
          />
          <MatchReport career={career} result={career.lastMatch} />
        </div>

        <section className="panel rounded-lg p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-paper/55">
                Proximo adversario
              </p>
              <h3 className="mt-2 text-2xl font-black">
                {opponent?.name ?? "Temporada encerrada"}
              </h3>
            </div>
            {opponent ? <TeamBadge team={opponent} size="lg" /> : <CalendarDays />}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {[
              ["Elenco", "roster"],
              ["Transferencias", "transfers"],
              ["Tabela", "standings"],
              ["Treino", "training"],
              ["Patrocinios", "sponsors"],
              ["Campeonatos", "tournaments"],
              ["Times CS", "team-database"],
              ["Jogadores CS", "player-database"],
              ["Academy", "academy"],
              ["Solo Queue", "solo-queue"],
              ["Rede Social", "social"],
            ].map(([label, view]) => (
              <button
                key={view}
                className="h-10 rounded-md border border-line bg-paper/8 px-2 text-sm font-bold text-paper/78 transition hover:border-mint hover:text-mint"
                type="button"
                onClick={() => setView(view as DashboardView)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase text-paper/55">
              Ultimas noticias
            </p>
            <div className="mt-3 grid gap-2">
              {career.news.slice(0, 5).map((item) => (
                <article
                  key={item.id}
                  className="rounded-md border border-line/70 bg-ink/26 px-3 py-2"
                >
                  <p className="font-bold text-paper">{item.title}</p>
                  <p className="mt-1 text-sm text-paper/62">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function RosterView({ career }: { career: CareerState }) {
  const togglePlayerStarter = useGameStore((state) => state.togglePlayerStarter);
  const userTeam = getUserTeam(career)!;
  const starters = getStarters(career, userTeam.id);
  const reserves = getReservePlayers(career, userTeam.id);

  return (
    <div className="grid gap-5">
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Shield className="text-mint" size={20} />
          <h3 className="text-xl font-black">Titulares</h3>
        </div>
        <PlayerTable
          players={starters}
          starterIds={userTeam.starters}
          action="toggle"
          onAction={togglePlayerStarter}
        />
      </section>
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Users className="text-sky" size={20} />
          <h3 className="text-xl font-black">Reservas</h3>
        </div>
        <PlayerTable
          players={reserves}
          starterIds={userTeam.starters}
          action="toggle"
          onAction={togglePlayerStarter}
        />
      </section>
    </div>
  );
}

function TransfersView({ career }: { career: CareerState }) {
  const hirePlayer = useGameStore((state) => state.hirePlayer);
  const userTeam = getUserTeam(career)!;
  const freeAgents = getFreeAgents(career);
  const disabledIds = new Set(
    freeAgents
      .filter((player) => player.marketValue > userTeam.money)
      .map((player) => player.id),
  );

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 md:grid-cols-3">
        <StatCard label="Saldo do clube" value={formatMoney(userTeam.money)} icon={<Banknote />} />
        <StatCard
          label="Free agents"
          value={`${freeAgents.length}`}
          icon={<ShoppingBag />}
          accent="sky"
        />
        <StatCard
          label="Folha semanal"
          value={formatMoney(calculateWeeklyPayroll(career, userTeam.id))}
          icon={<Wallet />}
          accent="amber"
        />
      </div>
      <PlayerTable
        players={freeAgents}
        action="hire"
        onAction={hirePlayer}
        disabledActionIds={disabledIds}
      />
    </div>
  );
}

function StandingsView({ career }: { career: CareerState }) {
  const standings = getStandings(career.teams);

  return (
    <div className="thin-scrollbar overflow-x-auto rounded-lg border border-line/80">
      <table className="min-w-[760px] w-full border-collapse text-left text-sm">
        <thead className="bg-paper/8 text-xs uppercase text-paper/58">
          <tr>
            <th className="px-3 py-3">#</th>
            <th className="px-3 py-3">Time</th>
            <th className="px-3 py-3">Pontos</th>
            <th className="px-3 py-3">Vitorias</th>
            <th className="px-3 py-3">Derrotas</th>
            <th className="px-3 py-3">Saldo</th>
            <th className="px-3 py-3">Torcida</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line/60">
          {standings.map((team, index) => (
            <tr
              key={team.id}
              className={team.id === career.userTeamId ? "bg-mint/10" : "bg-ink/20"}
            >
              <td className="px-3 py-3 font-black">{index + 1}</td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-3">
                  <TeamBadge team={team} size="sm" />
                  <span className="font-bold">{team.name}</span>
                </div>
              </td>
              <td className="px-3 py-3 font-black text-mint">{team.points}</td>
              <td className="px-3 py-3">{team.wins}</td>
              <td className="px-3 py-3">{team.losses}</td>
              <td className="px-3 py-3">{team.roundDiff}</td>
              <td className="px-3 py-3">{formatNumber(team.fans)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TrainingView({ career }: { career: CareerState }) {
  const trainTeam = useGameStore((state) => state.trainTeam);
  const userTeam = getUserTeam(career)!;
  const players = getTeamPlayers(career, userTeam.id);

  return (
    <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
      <section className="panel rounded-lg p-4">
        <p className="text-xs font-semibold uppercase text-paper/55">Centro de treino</p>
        <h3 className="mt-2 text-2xl font-black">Semana tática</h3>
        <div className="mt-5 grid gap-3 text-sm text-paper/70">
          <p className="rounded-md border border-line/70 bg-ink/28 px-3 py-3">
            Custo: <strong className="text-paper">{formatMoney(trainingCost)}</strong>
          </p>
          <p className="rounded-md border border-line/70 bg-ink/28 px-3 py-3">
            Entrosamento atual: <strong className="text-paper">{userTeam.synergy}</strong>
          </p>
        </div>
        <button
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-mint px-4 font-black text-ink disabled:opacity-40"
          type="button"
          disabled={userTeam.money < trainingCost}
          onClick={trainTeam}
        >
          <Dumbbell size={18} />
          Treinar elenco
        </button>
      </section>
      <PlayerTable players={players} starterIds={userTeam.starters} />
    </div>
  );
}

function FinanceView({ career }: { career: CareerState }) {
  const userTeam = getUserTeam(career)!;
  const revenue = calculateWeeklyRevenue(userTeam);
  const payroll = calculateWeeklyPayroll(career, userTeam.id);
  const balance = calculateWeeklyBalance(career, userTeam);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Saldo do clube" value={formatMoney(userTeam.money)} icon={<Banknote />} />
      <StatCard
        label="Receita semanal"
        value={formatMoney(revenue)}
        icon={<Radio />}
        accent="sky"
      />
      <StatCard
        label="Salarios semanais"
        value={formatMoney(payroll)}
        icon={<Wallet />}
        accent="coral"
      />
      <StatCard
        label="Balanco previsto"
        value={formatMoney(balance)}
        icon={<Activity />}
        accent={balance >= 0 ? "mint" : "coral"}
      />
      <section className="panel rounded-lg p-4 md:col-span-2 xl:col-span-4">
        <p className="text-xs font-semibold uppercase text-paper/55">Premiacao</p>
        <p className="mt-3 text-lg font-bold text-paper">
          Vitoria em rodada: {formatMoney(victoryPrize)}
        </p>
        <p className="mt-2 text-sm text-paper/62">
          A cada rodada, o clube recebe receita recorrente e paga a folha salarial
          apos as partidas.
        </p>
      </section>
    </div>
  );
}

function SponsorsView() {
  const signSponsor = useGameStore((state) => state.signSponsor);
  const offers = [
    { id: "regional" as const, name: "Circuito Regional", money: 28000, fans: 650 },
    { id: "stream" as const, name: "Canal de Transmissao", money: 42000, fans: 1150 },
    { id: "hardware" as const, name: "Equipamentos Vertice", money: 65000, fans: 400 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {offers.map((offer) => (
        <section key={offer.id} className="panel rounded-lg p-4">
          <Handshake className="text-amber" size={24} />
          <h3 className="mt-4 text-xl font-black">{offer.name}</h3>
          <p className="mt-3 text-sm text-paper/65">
            Caixa {formatMoney(offer.money)} · Torcida +{offer.fans}
          </p>
          <button
            className="mt-5 h-10 w-full rounded-md bg-amber px-3 font-black text-ink hover:brightness-110"
            type="button"
            onClick={() => signSponsor(offer.id)}
          >
            Assinar
          </button>
        </section>
      ))}
    </div>
  );
}

function AcademyView({ career }: { career: CareerState }) {
  const userTeam = getUserTeam(career)!;
  const prospects = getTeamPlayers(career, userTeam.id)
    .filter((player) => player.age <= 20 || player.status === "reserve")
    .sort((a, b) => b.potential - a.potential);

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 md:grid-cols-3">
        <StatCard
          label="Talentos monitorados"
          value={`${prospects.length}`}
          icon={<GraduationCap />}
        />
        <StatCard
          label="Maior potencial"
          value={`${prospects[0]?.potential ?? 0}`}
          icon={<Activity />}
          accent="sky"
        />
        <StatCard
          label="Entrosamento base"
          value={`${userTeam.synergy}`}
          icon={<Shield />}
          accent="amber"
        />
      </div>
      <PlayerTable players={prospects} starterIds={userTeam.starters} />
    </div>
  );
}

function SoloQueueView({ career }: { career: CareerState }) {
  const scoutQueue = useGameStore((state) => state.scoutQueue);
  const candidates = getFreeAgents(career)
    .filter((player) => player.age <= 24)
    .sort((a, b) => b.potential - a.potential)
    .slice(0, 8);

  return (
    <div className="grid gap-5">
      <section className="panel rounded-lg p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-paper/55">
              Relatorio de solo queue
            </p>
            <h3 className="mt-2 text-2xl font-black">Radar de talentos</h3>
          </div>
          <button
            className="flex h-10 items-center justify-center gap-2 rounded-md bg-sky px-4 font-black text-ink hover:brightness-110"
            type="button"
            onClick={scoutQueue}
          >
            <Search size={17} />
            Scoutar
          </button>
        </div>
      </section>
      <PlayerTable players={candidates} />
    </div>
  );
}

function SocialView({ career }: { career: CareerState }) {
  return (
    <div className="grid gap-3">
      {career.news.map((item) => (
        <article key={item.id} className="panel rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-paper/10 text-mint">
              <Share2 size={18} />
            </div>
            <div>
              <p className="font-black text-paper">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-paper/66">{item.body}</p>
              <p className="mt-2 text-xs uppercase text-paper/42">
                {new Date(item.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
