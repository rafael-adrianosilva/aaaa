Quero que você atue como um desenvolvedor sênior de jogos web usando React, TypeScript e Tailwind CSS.

Estou criando um jogo web chamado "E-Sports Manager BR".

O jogo será um manager/simulador de e-sports jogável diretamente no navegador, inspirado em jogos de gerenciamento de equipes competitivas, mas totalmente original. Não use nomes reais de jogos, campeonatos, times, jogadores, marcas, logos ou propriedades protegidas.

O jogo deve funcionar como uma aplicação web SPA, com interface baseada em dashboard, cards, tabelas, menus e simulações.

Stack obrigatória:
- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand para estado global
- LocalStorage para save/load no MVP
- Dados iniciais em JSON

Objetivo do jogo:
O jogador assume o papel de coach/manager de uma organização fictícia de e-sports. Ele deve montar elenco, contratar jogadores, treinar talentos, administrar finanças, disputar campeonatos, ganhar títulos, lidar com torcida, patrocínios, notícias, academy, scouting/solo queue e rede social fictícia.

MVP inicial:
1. Menu inicial com:
   - Novo jogo
   - Carregar jogo
   - Configurações
   - Créditos

2. Criação de carreira:
   - Nome do manager
   - Escolha de dificuldade
   - Escolha de time inicial

3. Times:
   - 10 times fictícios
   - Cada time com dinheiro, torcida, reputação, elenco, vitórias, derrotas e pontos

4. Jogadores:
   Cada jogador deve ter:
   - Id
   - Nome
   - Nick
   - Idade
   - Nacionalidade
   - Posição
   - Overall
   - Potencial
   - Salário semanal
   - Valor de mercado
   - Contrato restante
   - Moral
   - Forma
   - Mecânica
   - Inteligência de jogo
   - Comunicação
   - Consistência
   - Agressividade
   - Controle emocional
   - Status

5. Dashboard:
   Mostrar:
   - Nome do time
   - Nome do manager
   - Saldo
   - Torcida
   - Moral média
   - Rodada atual
   - Próximo adversário
   - Posição na tabela
   - Últimas notícias
   - Botões para Elenco, Transferências, Tabela, Treino, Patrocínios, Academy, Solo Queue, Rede Social e Jogar Próxima Partida

6. Elenco:
   - Mostrar titulares
   - Mostrar reservas
   - Alterar titular/reserva
   - Ver atributos do jogador

7. Campeonato:
   - 10 times
   - Fase de pontos
   - Cada vitória soma pontos
   - Tabela ordenada por pontos, vitórias e saldo fictício
   - Rodadas geradas automaticamente

8. Simulação de partida:
   O resultado deve considerar:
   - Overall médio dos titulares
   - Moral média
   - Forma recente
   - Entrosamento
   - Estratégia escolhida
   - Fator aleatório controlado

   A simulação deve retornar:
   - Vencedor
   - Placar
   - MVP
   - Estatísticas básicas
   - Log textual da partida
   - Alteração de dinheiro
   - Alteração de torcida
   - Alteração de moral
   - Atualização da tabela

9. Transferências:
   - Lista de free agents
   - Contratar jogador se houver dinheiro
   - Atualizar folha salarial
   - Impedir contratação se o time estiver sem saldo

10. Finanças:
   - Saldo do clube
   - Receita semanal
   - Despesa com salários
   - Premiação por vitória
   - Penalidade por derrota futuramente

11. Save/load:
   - Salvar carreira no LocalStorage
   - Carregar carreira
   - Excluir save
   - Ter pelo menos 3 slots de save

Arquitetura desejada:
- Separar tipos TypeScript em /types
- Separar lógica de jogo em /game
- Separar estado global em /store
- Separar telas em /pages
- Separar componentes reutilizáveis em /components
- Separar dados iniciais em /data
- Não misturar regra de negócio diretamente dentro dos componentes React

Crie primeiro:
1. Estrutura de pastas.
2. Lista de arquivos.
3. Tipos TypeScript.
4. Dados fictícios iniciais.
5. Store global com Zustand.
6. Sistema de save/load.
7. Simulador de partidas.
8. Gerador de campeonato.
9. Telas principais.

Sempre que gerar código, informe:
- Caminho do arquivo
- Código completo
- Como testar
- Como conectar com o restante do projeto

Comece criando a base do projeto com Vite + React + TypeScript + Tailwind + Zustand.