# E-Manager Sports

Manager web de Counter-Strike 4fun/pessoal com React, TypeScript, Vite, Tailwind CSS, Zustand, LocalStorage e uma visualizacao Phaser leve para partidas.

## Como testar

```bash
npm.cmd install
npm.cmd run dev -- --port 5173
npm.cmd run build
```

O servidor local usa `http://127.0.0.1:5173`.

## Estrutura

- `src/types/game.ts`: contratos TypeScript de carreira, times, jogadores, saves, tabela e partidas.
- `src/types/RealTeam.ts`, `RealPlayer.ts`, `Tournament.ts`, `Sponsor.ts`, `Veto.ts`, `Round.ts`, `Series.ts`: contratos do modo CS.
- `src/data/initial-data.json`: 10 times ficticios e sementes dos jogadores/free agents.
- `src/data/teams.real.ts`, `players.real.ts`, `tournaments.real.ts`, `maps.cs.ts`, `sponsors.ts`: bancos iniciais em texto.
- `src/game/`: regras puras de carreira, campeonato, simulacao, finanças, save/load e seletores.
- `src/game/tournaments`, `ranking`, `sponsors`, `veto`, `match`: sistemas de premiação, classificação, ranking, patrocinio, veto MD1/MD3/MD5 e simulacao MR12.
- `src/store/gameStore.ts`: estado global Zustand e a ponte entre UI e regras.
- `src/pages/`: menu inicial, criacao de carreira, dashboard, campeonatos, detalhes, patrocinadores, bancos, veto, live match e resultado.
- `src/components/`: cards, tabelas, badges, relatorio e visualizacao Phaser.
- `src/phaser/scenes/MatchScene.ts`: scene fina que desenha a arena e anima tokens sem guardar regras de jogo.

## Fluxo de integracao

1. A carreira nasce em `createCareer`, usando o JSON inicial.
2. `generateRoundRobinSchedule` monta as rodadas de 10 times.
3. O dashboard chama a store, e a store chama funcoes em `src/game`.
4. `playNextRound` simula todas as partidas da rodada, atualiza tabela, moral, torcida e caixa.
5. `saveSystem` grava e carrega tres slots no LocalStorage.
6. `PhaserMatchPreview` recebe dados ja calculados e apenas renderiza a partida.

## Fluxo CS

1. Escolha uma organizacao real na criacao de carreira.
2. Abra `Campeonatos`, selecione um torneio e inicie o veto.
3. Faca veto manual ou use auto-veto.
4. Inicie a serie e avance round a round, ou pule round/mapa/serie.
5. O resultado aplica premio, ranking, moral, torcida e bonus de patrocinio.
