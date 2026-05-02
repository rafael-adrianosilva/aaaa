Quero que você continue o desenvolvimento do meu jogo web já existente chamado:

E-Manager Sports

A base do jogo já foi criada anteriormente usando React, TypeScript, Vite, Tailwind CSS, Zustand e LocalStorage.

Agora quero fazer uma atualização grande no projeto.

O jogo será apenas 4fun/pessoal, então quero usar tudo real em texto:
- Times reais de Counter-Strike
- Jogadores reais
- Coaches reais
- Campeonatos reais
- Campeonatos regionais reais
- Mapas reais do CS
- Premiações reais ou aproximadas por campeonato

Importante:
O projeto é apenas 4fun. Quero usar nomes reais em texto, mas não quero usar logos oficiais, fotos oficiais, imagens de jogadores, artes protegidas ou assets visuais de organizações. Para logos, use placeholders, escudos genéricos ou iniciais do time.

O objetivo desta atualização é transformar o jogo em um manager de Counter-Strike mais completo, com campeonatos reais, regionais, premiações, patrocínios, MD1/MD3/MD5, veto de mapas e tela de partida round a round.

---

# CONTEXTO DO PROJETO ATUAL

O projeto já possui uma base com:

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- LocalStorage
- Menu inicial
- Novo jogo
- Criar carreira
- Escolher time
- Dashboard
- Elenco
- Tabela
- Simulação básica
- Save/load

Agora quero adicionar novos sistemas sem quebrar a base existente.

Trabalhe de forma incremental.

Antes de criar código, analise a arquitetura existente e proponha como encaixar os novos módulos.

---

# OBJETIVO DA ATUALIZAÇÃO

Adicionar ao jogo:

1. Banco de dados com times reais de CS
2. Banco de dados com jogadores reais de CS
3. Banco de dados com campeonatos reais
4. Campeonatos grandes, médios, regionais, qualificatórios, academy e femininos
5. Premiação em dólar para cada campeonato
6. Major com premiação fixa de US$ 4.000.000
7. Sistema de patrocínios
8. Sistema de calendário competitivo
9. Sistema de ranking global e regional
10. Sistema de qualificação para torneios
11. MD1, MD3 e MD5
12. Picks/bans de mapas reais do CS
13. Tela de veto de mapas
14. Tela in-game round a round
15. Botões para pular round, mapa e série
16. Tela de resultado final da série
17. Integração dos resultados com finanças, ranking, torcida e moral

---

# TIMES REAIS

Crie uma estrutura para cadastrar times reais.

Exemplos de times que devem estar na base inicial:

- FURIA
- MIBR
- Imperial
- paiN Gaming
- Fluxo
- RED Canids
- ODDIK
- Legacy
- Vitality
- NAVI
- FaZe
- G2
- Spirit
- MOUZ
- Astralis
- Liquid
- Complexity
- Falcons
- The MongolZ
- Virtus.pro
- ENCE
- BIG
- fnatic
- Ninjas in Pyjamas
- GamerLegion
- 3DMAX
- Aurora
- SAW
- HEROIC
- Cloud9
- BetBoom
- B8
- Lynn Vision
- TYLOO
- FlyQuest

Cada time deve ter:

- id
- name
- country
- region
- rankingGlobal
- rankingRegional
- valvePoints
- hltvRank
- reputation
- fanbase
- budget
- monthlyCosts
- players
- substitutes
- academyPlayers
- coach
- activeSponsors
- tournamentHistory
- trophies
- currentForm
- morale
- mapPoolStrengths

Crie ou atualize o tipo:

```ts
export type RealTeam = {
  id: string;
  name: string;
  country: string;
  region:
    | "Europe"
    | "Americas"
    | "Brazil"
    | "North America"
    | "South America"
    | "Asia"
    | "Oceania"
    | "CIS"
    | "Middle East"
    | "Global";

  rankingGlobal?: number;
  rankingRegional?: number;
  valvePoints?: number;
  hltvRank?: number;

  reputation: number;
  fanbase: number;
  budget: number;
  monthlyCosts: number;

  players: string[];
  substitutes: string[];
  academyPlayers: string[];
  coach?: string;

  activeSponsors: string[];
  tournamentHistory: string[];
  trophies: string[];

  currentForm: number;
  morale: number;

  mapPoolStrengths: Record<string, number>;
};


JOGADORES REAIS

Crie uma estrutura para jogadores reais.

Exemplos de jogadores que podem entrar na base inicial:

FalleN
KSCERATO
yuurih
molodoy
YEKINDAR
insani
exit
decenty
lux
nqz
biguzera
snow
donk
ZywOo
m0NESY
NiKo
ropz
frozen
rain
karrigan
s1mple
b1t
iM
w0nderful
apEX
flameZ
Spinx
mezii
sh1ro
chopper
magixx
Jimpphat
torzsi
siuhy
xertioN
malbsMd
huNter-
dev1ce
blameF
EliGE
NAF
Twistzz

Cada jogador deve ter:

id
nickname
realName
nationality
age
teamId
role
rating
overall
potential
salary
marketValue
morale
form
mechanics
aim
reflex
gameSense
utility
clutch
communication
consistency
mental
leadership
experience
preferredMaps
weakMaps
status


Crie ou atualize o tipo:

export type RealPlayer = {
  id: string;
  nickname: string;
  realName?: string;
  nationality: string;
  age?: number;
  teamId?: string;

  role:
    | "IGL"
    | "AWPer"
    | "Rifler"
    | "Entry"
    | "Support"
    | "Lurker"
    | "Anchor"
    | "Coach";

  rating?: number;

  overall: number;
  potential: number;
  salary: number;
  marketValue: number;
  morale: number;
  form: number;

  mechanics: number;
  aim: number;
  reflex: number;
  gameSense: number;
  utility: number;
  clutch: number;
  communication: number;
  consistency: number;
  mental: number;
  leadership: number;
  experience: number;

  preferredMaps: string[];
  weakMaps: string[];

  status:
    | "Starter"
    | "Substitute"
    | "Academy"
    | "FreeAgent"
    | "Benched"
    | "TransferListed"
    | "Retired";
};

CAMPEONATOS REAIS

Quero adicionar vários campeonatos reais, incluindo campeonatos grandes e regionais.

Categorias:

Major
S-Tier
A-Tier
B-Tier
C-Tier
Regional
Open Qualifier
Closed Qualifier
Academy
Female

Campeonatos que devem existir inicialmente:

Major Championship
IEM Katowice
IEM Cologne
IEM Rio
IEM Dallas
ESL Pro League
ESL Challenger
BLAST Premier
BLAST Open
BLAST Bounty
BLAST Rivals
BLAST World Final
PGL Major
PGL Masters
StarLadder
CCT Global Finals
CCT Europe
CCT South America
CCT North America
CCT Oceania
CCT Asia
YaLLa Compass
Thunderpick World Championship
BetBoom Dacha
FISSURE Playground
CS Asia Championship
Skyesports Championship
ESL Challenger League Europe
ESL Challenger League North America
ESL Challenger League South America
ESL Challenger League Asia
ESL Challenger League Oceania
European Pro League
United21
Regional Major Ranking
Open Qualifier Europe
Open Qualifier Americas
Open Qualifier South America
Open Qualifier Asia
Closed Qualifier Europe
Closed Qualifier Americas
Closed Qualifier South America
Closed Qualifier Asia
Liga Brasileira
Campeonato Brasileiro
Copa Brasil
South America Regional League
North America Regional League
Europe Regional League
Asia Regional League
Oceania Regional League
Academy League
Female League

Cada campeonato deve ter:

id
realName
displayName
organizer
tier
region
country
city
prizePool
currency
prestige
teamsCount
format
qualificationMethod
startDate
endDate
mapPoolId
sponsors
stages
prizeDistribution
status

Crie ou atualize os tipos:

export type TournamentTier =
  | "Major"
  | "S"
  | "A"
  | "B"
  | "C"
  | "Regional"
  | "Qualifier"
  | "Academy"
  | "Female";

export type TournamentFormat =
  | "SingleElimination"
  | "DoubleElimination"
  | "Swiss"
  | "Groups"
  | "GSLGroups"
  | "RoundRobin"
  | "SwissPlusPlayoffs"
  | "GroupsPlusPlayoffs"
  | "OpenQualifier"
  | "ClosedQualifier";

export type TournamentStatus =
  | "Upcoming"
  | "Ongoing"
  | "Finished";

export type Tournament = {
  id: string;
  realName: string;
  displayName: string;
  organizer: string;

  tier: TournamentTier;

  region:
    | "Global"
    | "Europe"
    | "Americas"
    | "North America"
    | "South America"
    | "Brazil"
    | "Asia"
    | "Oceania"
    | "CIS"
    | "Middle East";

  country?: string;
  city?: string;

  prizePool: number;
  currency: "USD";

  prestige: number;
  teamsCount: number;
  format: TournamentFormat;

  qualificationMethod:
    | "Invite"
    | "Ranking"
    | "VRS"
    | "OpenQualifier"
    | "ClosedQualifier"
    | "RegionalRanking"
    | "Mixed";

  startDate: string;
  endDate: string;

  mapPoolId: string;
  sponsors: string[];

  stages: TournamentStage[];
  prizeDistribution: PrizeDistribution[];

  status: TournamentStatus;
};
PREMIAÇÕES

Todo campeonato precisa ter premiação.

Regra fixa:

export const MAJOR_PRIZE_POOL = 4_000_000;

O Major sempre terá US$ 4.000.000 de prize pool no jogo.

Crie presets:

export const TOURNAMENT_PRIZE_PRESETS = {
  MAJOR: 4_000_000,

  S_TIER_HIGH: 1_000_000,
  S_TIER_MEDIUM: 750_000,
  S_TIER_LOW: 500_000,

  A_TIER_HIGH: 300_000,
  A_TIER_MEDIUM: 150_000,
  A_TIER_LOW: 100_000,

  B_TIER_HIGH: 75_000,
  B_TIER_MEDIUM: 50_000,
  B_TIER_LOW: 25_000,

  C_TIER_HIGH: 15_000,
  C_TIER_MEDIUM: 10_000,
  C_TIER_LOW: 5_000,

  REGIONAL_BIG: 100_000,
  REGIONAL_MEDIUM: 50_000,
  REGIONAL_SMALL: 20_000,

  OPEN_QUALIFIER: 0,
  CLOSED_QUALIFIER: 10_000
};

Crie o tipo:

export type PrizeDistribution = {
  placement: string;
  amount: number;
  reputationBonus: number;
  fanbaseBonus: number;
  rankingPoints: number;
};

Crie uma função para gerar premiação automaticamente com base no prize pool e tier:

generatePrizeDistribution(prizePool: number, tier: TournamentTier, teamsCount: number): PrizeDistribution[]

Crie também uma função:

applyTournamentPrize(teamId: string, tournamentId: string, placement: string): void

Ela deve atualizar:

Dinheiro do time
Reputação
Fanbase
Pontos de ranking
Histórico do campeonato
PATROCÍNIOS

Adicionar sistema de patrocínios.

Tipos de patrocinadores:

Hardware
Periféricos
Monitor
Energia
Casa de aposta
Banco
Telecom
Streaming
Plataforma de treino
Marketplace
Local business

Pode usar patrocinadores fictícios para evitar problemas.

Cada patrocinador deve ter:

id
name
category
tier
baseMonthlyPayment
signingBonus
winBonus
tournamentQualificationBonus
playoffBonus
titleBonus
majorQualificationBonus
reputationRequirement
fanbaseRequirement
contractMonths
objectives
penalties

Tipo:

export type SponsorTier =
  | "Local"
  | "Regional"
  | "National"
  | "International"
  | "Premium";

export type SponsorCategory =
  | "Hardware"
  | "Peripherals"
  | "Monitor"
  | "EnergyDrink"
  | "Betting"
  | "Bank"
  | "Telecom"
  | "Streaming"
  | "TrainingPlatform"
  | "Marketplace"
  | "LocalBusiness";

export type Sponsor = {
  id: string;
  name: string;
  category: SponsorCategory;
  tier: SponsorTier;

  baseMonthlyPayment: number;
  signingBonus: number;
  winBonus: number;
  tournamentQualificationBonus: number;
  playoffBonus: number;
  titleBonus: number;
  majorQualificationBonus: number;

  reputationRequirement: number;
  fanbaseRequirement: number;
  contractMonths: number;

  objectives: SponsorObjective[];
  penalties: SponsorPenalty[];
};

export type SponsorObjective = {
  id: string;
  description: string;
  type:
    | "WinMatches"
    | "ReachPlayoffs"
    | "WinTournament"
    | "QualifyMajor"
    | "SignPlayer"
    | "KeepPositiveBalance"
    | "ReachRanking";
  target: number;
  reward: number;
};

export type SponsorPenalty = {
  id: string;
  description: string;
  type:
    | "MissPlayoffs"
    | "LoseMatches"
    | "NegativeBalance"
    | "FailMajorQualification"
    | "DropRanking";
  penaltyAmount: number;
};

Criar sistema para:

Listar patrocinadores disponíveis
Contratar patrocinador
Receber bônus de assinatura
Receber pagamento mensal
Receber bônus por vitória
Receber bônus por título
Receber bônus por classificação ao Major
Aplicar penalidades
Encerrar contrato
Renovar contrato

Limite de patrocinadores ativos:

Time pequeno: 2
Time médio: 3
Time grande: 5
Time elite: 8
MAPAS REAIS DO CS

Adicionar map pool com mapas reais:

Dust2
Mirage
Inferno
Nuke
Overpass
Ancient
Anubis

Tipo:

export type CSMap = {
  id: string;
  name: string;
  type: "Balanced" | "Tactical" | "CT-Sided" | "T-Sided" | "Aim";
  ctBias: number;
  tBias: number;
  tacticalWeight: number;
  aimWeight: number;
  utilityWeight: number;
};

Criar arquivo:

src/data/maps.cs.ts

com os dados dos mapas.

Cada time deve ter força individual em cada mapa através de:

mapPoolStrengths: Record<string, number>
SISTEMA MD1 / MD3 / MD5

Adicionar suporte para:

export type SeriesFormat = "MD1" | "MD3" | "MD5";

Regras:

MD1: vence quem ganhar 1 mapa.
MD3: vence quem ganhar 2 mapas.
MD5: vence quem ganhar 3 mapas.

Uso:

MD1 em open qualifiers, grupos e suíço.
MD3 em eliminação, classificação e playoffs.
MD5 em grandes finais.
SISTEMA DE PICKS/BANS

Criar sistema de veto de mapas para MD1, MD3 e MD5.

MD1
Time A bane 1 mapa
Time B bane 1 mapa
Time A bane 1 mapa
Time B bane 1 mapa
Time A bane 1 mapa
Time B bane 1 mapa
Mapa restante será jogado
MD3
Time A bane 1 mapa
Time B bane 1 mapa
Time A escolhe mapa 1
Time B escolhe lado no mapa 1
Time B escolhe mapa 2
Time A escolhe lado no mapa 2
Time A bane 1 mapa
Time B bane 1 mapa
Mapa restante será o decider
MD5
Time A bane 1 mapa
Time B bane 1 mapa
Time A escolhe mapa 1
Time B escolhe lado no mapa 1
Time B escolhe mapa 2
Time A escolhe lado no mapa 2
Time A escolhe mapa 3
Time B escolhe lado no mapa 3
Time B escolhe mapa 4
Time A escolhe lado no mapa 4
Mapa restante será o decider

Criar:

export type MapVetoAction = {
  order: number;
  teamId: string;
  action: "Ban" | "Pick" | "ChooseSide" | "Decider";
  mapId?: string;
  side?: "CT" | "T";
};

export type SeriesVetoResult = {
  seriesFormat: SeriesFormat;
  teamAId: string;
  teamBId: string;
  bannedMaps: string[];
  pickedMaps: SeriesMap[];
  deciderMapId?: string;
  actions: MapVetoAction[];
};

export type SeriesMap = {
  mapId: string;
  pickedByTeamId?: string;
  startingSideTeamA: "CT" | "T";
  startingSideTeamB: "CT" | "T";
  status: "Picked" | "Decider";
};

Criar:

Veto manual
Auto-veto da IA
Botão de confirmar ban
Botão de confirmar pick
Botão de escolher lado
Botão de iniciar partida
TELA DE VETO

Criar página:

src/pages/MapVeto.tsx

A tela deve mostrar:

Nome do campeonato
Fase
Formato: MD1, MD3 ou MD5
Time A
Time B
Map pool
Mapas disponíveis
Mapas banidos
Mapas escolhidos
Decider
Lado inicial
Log das ações do veto
Botão Auto-veto
Botão Confirmar ação
Botão Iniciar série
SIMULAÇÃO ROUND A ROUND

Adicionar simulação de partida round a round.

Formato:

MR12
12 rounds por lado
Primeiro a 13 vence o mapa
Se ficar 12x12, overtime
Overtime MR3
Troca de lados após 12 rounds

Cada round deve considerar:

Força geral do time
Overall médio
Força no mapa
Lado CT/T
Economia
Moral
Momentum
Forma recente
Atributos dos jogadores
IGL
AWPer
Chance de clutch
Chance de erro individual
Tipo de compra

Tipos de compra:

Pistol
Eco
Force
Half buy
Full buy
Anti-eco

Cada round deve gerar:

Vencedor
Condição de vitória
MVP do round
Evento principal
Economia atualizada
Placar atualizado
Log textual
Estatísticas dos jogadores

Tipos:

export type Side = "CT" | "T";

export type WinCondition =
  | "Elimination"
  | "BombPlanted"
  | "BombDefused"
  | "Time";

export type BuyType =
  | "Pistol"
  | "Eco"
  | "Force"
  | "HalfBuy"
  | "FullBuy"
  | "AntiEco";

export type RoundResult = {
  roundNumber: number;
  winnerTeamId: string;
  loserTeamId: string;
  winCondition: WinCondition;
  mvpPlayerId: string;
  keyEvent: string;
  economyTeamA: number;
  economyTeamB: number;
  buyTypeTeamA: BuyType;
  buyTypeTeamB: BuyType;
  scoreA: number;
  scoreB: number;
  sideTeamA: Side;
  sideTeamB: Side;
};
SIMULAÇÃO DE MAPA E SÉRIE

Criar:

export type MapResult = {
  mapId: string;
  teamAId: string;
  teamBId: string;
  scoreA: number;
  scoreB: number;
  winnerTeamId: string;
  rounds: RoundResult[];
};

export type SeriesResult = {
  tournamentId: string;
  stageId: string;
  seriesFormat: SeriesFormat;
  teamAId: string;
  teamBId: string;
  maps: MapResult[];
  winnerTeamId: string;
  loserTeamId: string;
  mvpPlayerId: string;
};

Criar simuladores:

roundSimulator.ts
mapSimulator.ts
seriesSimulator.ts

Funções esperadas:

simulateRound(...)
simulateMap(...)
simulateSeries(...)
skipRound(...)
skipMap(...)
skipSeries(...)
TELA IN-GAME ROUND A ROUND

Criar página:

src/pages/LiveMatch.tsx

A tela deve mostrar:

Nome do campeonato
Fase
MD1/MD3/MD5
Placar da série
Mapa atual
Placar do mapa
Round atual
Lado de cada time
Economia de cada time
Momentum
Último round
MVP do round
Log dos rounds
Estatísticas dos jogadores
Botão Próximo Round
Botão Auto-play
Botão Pausar
Botão Pular Round
Botão Pular Mapa
Botão Pular Série
Botão Ver Estatísticas

A tela deve funcionar mesmo se o usuário decidir pular tudo.

TELA DE RESULTADO

Criar página:

src/pages/SeriesResult.tsx

Mostrar:

Vencedor da série
Placar da série
Placar de cada mapa
MVP geral
Estatísticas dos jogadores
Alteração de dinheiro
Alteração de torcida
Alteração de moral
Pontos de ranking ganhos/perdidos
Premiação recebida se for campeonato
Bônus de patrocínio
Próxima partida
TELA DE CAMPEONATOS

Criar ou atualizar:

src/pages/Tournaments.tsx
src/pages/TournamentDetails.tsx

A tela de campeonatos deve ter filtros:

Todos
Major
S-Tier
A-Tier
B-Tier
C-Tier
Regionais
Brasil
Europa
Américas
Ásia
Online
LAN
Próximos
Em andamento
Finalizados

Cada campeonato deve mostrar:

Nome
Tier
Região
Data
Número de times
Prize pool
Premiação do campeão
Formato
Status
Método de classificação
Botão Ver detalhes
Botão Jogar/Inscrever/Classificar, quando aplicável
TELA DE PATROCÍNIOS

Criar ou atualizar:

src/pages/Sponsors.tsx

Mostrar:

Patrocínios disponíveis
Patrocínios ativos
Valor mensal
Bônus por vitória
Bônus por título
Bônus por classificação ao Major
Objetivos
Penalidades
Duração
Requisitos
Botão Assinar contrato
Botão Renovar
Botão Encerrar
ARQUIVOS A CRIAR OU ATUALIZAR

Crie ou atualize os seguintes arquivos conforme a estrutura existente do projeto:

src/types/RealTeam.ts
src/types/RealPlayer.ts
src/types/Tournament.ts
src/types/Sponsor.ts
src/types/PrizeDistribution.ts
src/types/Ranking.ts
src/types/CSMap.ts
src/types/Veto.ts
src/types/Round.ts
src/types/Series.ts

src/data/teams.real.ts
src/data/players.real.ts
src/data/tournaments.real.ts
src/data/sponsors.ts
src/data/maps.cs.ts
src/data/prizeDistributions.ts

src/game/tournaments/tournamentManager.ts
src/game/tournaments/qualificationManager.ts
src/game/tournaments/prizeManager.ts

src/game/ranking/rankingManager.ts

src/game/sponsors/sponsorManager.ts

src/game/veto/mapVetoManager.ts
src/game/veto/autoVetoAI.ts

src/game/match/roundSimulator.ts
src/game/match/mapSimulator.ts
src/game/match/seriesSimulator.ts
src/game/match/economySimulator.ts
src/game/match/matchEvents.ts

src/pages/Tournaments.tsx
src/pages/TournamentDetails.tsx
src/pages/Sponsors.tsx
src/pages/TeamDatabase.tsx
src/pages/PlayerDatabase.tsx
src/pages/MapVeto.tsx
src/pages/LiveMatch.tsx
src/pages/SeriesResult.tsx

src/components/tournaments/TournamentCard.tsx
src/components/tournaments/TournamentFilters.tsx
src/components/tournaments/PrizeDistributionTable.tsx

src/components/sponsors/SponsorCard.tsx
src/components/sponsors/ActiveSponsorCard.tsx

src/components/database/TeamTable.tsx
src/components/database/PlayerTable.tsx

src/components/veto/MapPoolGrid.tsx
src/components/veto/VetoActionLog.tsx
src/components/veto/PickBanPanel.tsx

src/components/match/LiveScoreboard.tsx
src/components/match/RoundLog.tsx
src/components/match/MatchControls.tsx
src/components/match/PlayerStatsTable.tsx

Se algum desses arquivos já existir, atualize sem quebrar o código antigo.

INTEGRAÇÃO COM ZUSTAND

Atualize a store global para incluir:

teams
players
tournaments
currentTournament
currentSeries
currentMatch
sponsors
activeSponsors
rankings
calendar
startVeto()
confirmVetoAction()
autoVeto()
startSeries()
simulateNextRound()
skipRound()
skipMap()
skipSeries()
finishSeries()
applyPrize()
signSponsor()
processMonthlySponsors()
applySponsorBonuses()

Não remova funcionalidades existentes.

SAVE/LOAD

Atualize o save/load para salvar também:

Times reais
Jogadores reais
Campeonatos
Calendário
Ranking
Patrocínios ativos
Histórico de campeonatos
Séries em andamento
Resultados
Estatísticas
Estado do veto
Estado da partida round a round

Garanta compatibilidade com saves antigos, criando valores padrão caso campos novos não existam.

ORDEM DE IMPLEMENTAÇÃO

Implemente nesta ordem:

Analisar a estrutura atual do projeto.
Criar/atualizar tipos TypeScript.
Criar dados iniciais de times reais.
Criar dados iniciais de jogadores reais.
Criar dados iniciais de campeonatos reais.
Criar sistema de premiações.
Criar sistema de patrocínios.
Criar sistema de ranking.
Criar sistema de qualificação.
Criar dados dos mapas.
Criar sistema MD1/MD3/MD5.
Criar sistema de veto.
Criar simulador round a round.
Criar simulador de mapa.
Criar simulador de série.
Criar tela de campeonatos.
Criar tela de detalhes do campeonato.
Criar tela de patrocínios.
Criar tela de veto.
Criar tela LiveMatch.
Criar tela SeriesResult.
Integrar tudo com Zustand.
Atualizar save/load.
Testar fluxo completo.
FLUXO FINAL ESPERADO

O jogador deve conseguir:

Criar ou carregar carreira.
Escolher uma organização real.
Ver elenco real.
Ver jogadores reais.
Ver calendário de campeonatos.
Entrar/classificar em campeonato.
Ver premiação do campeonato.
Fazer veto de mapas.
Jogar MD1, MD3 ou MD5.
Acompanhar a partida round a round.
Pular round, mapa ou série.
Receber resultado final.
Receber premiação se aplicável.
Receber bônus de patrocinador se aplicável.
Atualizar ranking, torcida, moral e finanças.
Continuar a carreira.
REGRAS DE QUALIDADE
Não misture regra de negócio dentro dos componentes React.
Componentes devem apenas exibir dados e chamar ações.
Lógica de simulação deve ficar dentro de /game.
Tipos devem ficar em /types.
Dados iniciais devem ficar em /data.
Estado global deve ficar em Zustand.
Código deve ser modular.
Código deve ser fácil de expandir.
Interface deve seguir tema escuro, com cards, tabelas e layout de dashboard.
Use Tailwind CSS.
Não remova sistemas antigos.
Não quebre save/load antigo.
Sempre explique quais arquivos foram criados ou alterados.
Forneça código completo de cada arquivo.
Quando uma implementação for grande demais, divida em etapas.