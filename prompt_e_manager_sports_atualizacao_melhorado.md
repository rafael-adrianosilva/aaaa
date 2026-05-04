# Prompt Melhorado — Atualização do E-Manager Sports

## Contexto

Quero melhorar e expandir meu jogo web chamado **E-Manager Sports**.

O jogo é um **manager de Counter-Strike** feito para diversão/pessoal. Quero usar nomes reais de times, jogadores, coaches, campeonatos e mapas como texto, mas sem usar logos oficiais, fotos oficiais, artes protegidas, imagens de jogadores ou assets visuais oficiais. Para logos, escudos e avatares, use placeholders, iniciais, ícones genéricos ou elementos fictícios.

A stack desejada é:

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- LocalStorage para save/load
- Estrutura modular
- Interface web responsiva
- Tema escuro em estilo dashboard esportivo

O objetivo é deixar o jogo mais completo, com mais profundidade de manager, sistema de Academy, geração de talentos, criação de time, treino individual, opção de jogar ou simular partidas, veto de mapas e partida round a round.

---

# Objetivo da atualização

Adicionar e melhorar os seguintes sistemas:

1. Banco com 100 times reais de Counter-Strike.
2. Opção de criar o próprio time.
3. Escolha do nível/ranking inicial do time criado.
4. Jogadores gerados automaticamente para times criados.
5. Sistema de Academy/base para todos os times.
6. Academy com jogadores reais para times reais, quando houver dados.
7. Academy aleatória para times criados pelo jogador.
8. Sistema de overall, potencial e raridade para jogadores da base.
9. Treinamento individual inspirado no FIFA/EA FC, mas adaptado ao CS.
10. Opção de **Jogar** ou **Simular** partida.
11. Veto manual de mapas para MD1, MD3 e MD5 na opção Jogar.
12. Veto automático na opção Simular.
13. Tela de partida round a round.
14. Log de kills mostrando quem matou quem.
15. KDA em tempo real.
16. Placar em tempo real.
17. Overtime no formato correto.
18. Botões para próximo round, autoplay, pausar, pular mapa e pular série.
19. Integração com moral, forma, ranking, finanças e evolução dos jogadores.

---

# 1. Banco com 100 times reais

Adicione ao jogo uma base inicial com **100 times reais de Counter-Strike**.

Os times devem vir de várias regiões:

- Brasil
- América do Sul
- América do Norte
- Europa
- CIS
- Ásia
- Oceania
- Oriente Médio

A lista deve incluir obrigatoriamente times como:

- FURIA
- MIBR
- Imperial
- paiN Gaming
- Fluxo
- RED Canids
- ODDIK
- Legacy
- Sharks
- Case
- BESTIA
- 9z
- KRÜ
- Liquid
- Complexity
- NRG
- M80
- Wildcard
- Vitality
- NAVI
- FaZe
- G2
- Spirit
- MOUZ
- Astralis
- Falcons
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
- PARIVISION
- Eternal Fire
- The MongolZ
- Lynn Vision
- TYLOO
- FlyQuest
- Rare Atom

Complete a lista até chegar em **100 times reais**.

Cada time deve ter:

- ID
- Nome
- País
- Região
- Ranking global
- Ranking regional
- Reputação
- Torcida/fanbase
- Orçamento
- Custos mensais
- 5 jogadores titulares
- Reservas
- Jogadores Academy
- Coach
- Patrocínios ativos
- Histórico de campeonatos
- Troféus
- Forma atual
- Moral
- Força individual em cada mapa

Regras importantes:

- Use nomes reais apenas em texto.
- Não use logos oficiais.
- Se não houver elenco real suficiente, complete com jogadores gerados.
- Jogadores gerados devem ser marcados internamente como gerados.
- Times reais devem ter dados fáceis de editar.
- Não coloque dados fixos espalhados em componentes React. Use arquivos de dados separados.

---

# 2. Criação do próprio time

Adicione uma opção para o jogador criar seu próprio time.

A tela de criação deve permitir escolher:

- Nome do time
- Sigla/tag
- País
- Região
- Cor principal
- Cor secundária
- Nome do manager
- Nível inicial do time

O nível inicial deve funcionar como em modo carreira de jogos tipo FIFA/EA FC, onde o jogador escolhe se quer começar pequeno, médio ou grande.

Níveis sugeridos:

- Amador
- Regional
- Nacional
- Tier 3
- Tier 2
- Tier 1
- Elite

Cada nível deve influenciar:

- Ranking global inicial
- Ranking regional inicial
- Orçamento inicial
- Reputação
- Torcida
- Qualidade dos jogadores gerados
- Salários
- Valor de mercado dos jogadores
- Qualidade da Academy
- Chance de atrair patrocinadores
- Força inicial em mapas

Ao criar o time, gerar automaticamente:

- 5 titulares
- 2 reservas
- 5 jogadores Academy
- 1 coach fictício
- Ranking global
- Ranking regional
- Orçamento
- Reputação
- Torcida
- Moral inicial
- Forma inicial
- Força em cada mapa

Os jogadores gerados devem possuir:

- Nome fictício
- Nickname
- Nacionalidade
- Idade
- Função
- Overall
- Potencial
- Salário
- Valor de mercado
- Moral
- Forma
- Atributos individuais de CS
- Mapas favoritos
- Mapas fracos
- Status

Funções possíveis:

- IGL
- AWPer
- Rifler
- Entry
- Support
- Lurker
- Anchor

---

# 3. Sistema de Academy/base

Todos os times devem ter Academy.

Regras:

- Times reais devem ter jogadores Academy reais quando houver dados disponíveis.
- Times reais sem dados de Academy podem receber jogadores jovens gerados.
- Times criados pelo jogador sempre terão Academy com jogadores aleatórios.
- O jogador pode promover jogadores da Academy para o elenco principal.
- O jogador pode dispensar jogadores da Academy.
- O jogador pode treinar jogadores da Academy individualmente.
- O jogador pode melhorar o nível da Academy.
- Melhorar a Academy aumenta a chance de revelar talentos melhores.
- Academy deve ter custo mensal.
- Academy deve ter limite de jogadores.
- Academy melhor deve permitir mais jogadores e melhores chances de raridade.

Cada jogador Academy deve ter:

- ID
- Nome
- Nickname
- Nacionalidade
- Idade
- Time
- Se é real ou gerado
- Função
- Overall
- Potencial
- Raridade
- Moral
- Forma
- Atributos individuais
- Mapas favoritos
- Mapas fracos
- Status de desenvolvimento
- Plano de treino atual

Status de desenvolvimento sugeridos:

- Bruto
- Promissor
- Pronto para Tier 3
- Pronto para Tier 2
- Pronto para Tier 1
- Potencial de estrela

---

# 4. Overall, potencial e raridade da Academy

Jogadores da Academy devem nascer com overall baixo ou alto.

## Overall baixo

Jogadores comuns devem nascer com overall entre:

- 57 e 70

Esses jogadores devem ser a maioria.

Regra obrigatória:

- Todo jogador com overall baixo deve ter potencial pelo menos 5 pontos acima do overall atual.

Exemplos:

- Overall 57 precisa ter potencial mínimo 62.
- Overall 65 precisa ter potencial mínimo 70.
- Overall 70 precisa ter potencial mínimo 75.

## Overall alto

Jogadores raros devem nascer com overall entre:

- 71 e 80

Esses jogadores devem ser raros.

Regras:

- Over alto deve ter baixa chance de aparecer.
- Jogadores com over alto normalmente devem ter bom potencial.
- Não pode gerar vários jogadores raros com muita facilidade.
- A qualidade da Academy pode aumentar um pouco a chance, mas não deve quebrar o balanceamento.

## Potenciais possíveis

O potencial pode variar assim:

- Potencial comum: overall atual +5 até +10
- Bom potencial: 75 a 84
- Grande potencial: 85 a 89
- Craque: 90 a 94
- Fenômeno: 95 a 99

Potenciais de 90 a 99 devem ser muito raros.

Raridades sugeridas:

- Common
- Uncommon
- Rare
- Wonderkid
- Generational

Chances sugeridas:

- Common: 55%
- Uncommon: 28%
- Rare: 12%
- Wonderkid: 4%
- Generational: 1%

Regras obrigatórias:

- Nunca gerar potencial menor que overall +5.
- Nunca gerar overall maior que potencial.
- Potencial 95 a 99 deve ser extremamente raro.
- Times grandes podem ter uma pequena vantagem na geração de talentos.
- Times pequenos também podem revelar craques, mas com chance menor.
- Jogadores da Academy devem evoluir com treino, tempo e oportunidades.

---

# 5. Treinamento individual

Melhore o sistema de treinamento para ser individual, inspirado no FIFA/EA FC, mas adaptado ao Counter-Strike.

O jogador deve poder escolher um atleta específico e aplicar um plano de treino.

Tipos de treino desejados:

- Mira
- Reflexo
- Mecânica
- Game sense
- Utilitárias
- Clutch
- Comunicação
- Consistência
- Mental
- Liderança
- AWP
- Entry
- Support
- Lurker
- IGL

Cada treino deve evoluir atributos específicos.

Exemplos:

## Treino de mira

Melhora:

- Aim
- Reflex
- Mechanics

## Treino de AWP

Melhora:

- Aim
- Reflex
- Clutch
- Consistency

## Treino de IGL

Melhora:

- Game sense
- Communication
- Leadership
- Mental

## Treino de support

Melhora:

- Utility
- Communication
- Consistency
- Game sense

## Treino de clutch

Melhora:

- Clutch
- Mental
- Aim
- Game sense

Regras de treinamento:

- Jogadores jovens evoluem mais rápido.
- Jogadores com potencial alto evoluem mais rápido.
- Jogadores próximos do potencial evoluem mais devagar.
- Academy evolui mais rápido que jogadores veteranos.
- Treino intenso gera fadiga.
- Fadiga alta reduz forma e desempenho.
- Treino compatível com a função do jogador dá bônus.
- Treino incompatível evolui menos.
- Moral baixa reduz eficiência do treino.
- Alta consistência gera evolução mais estável.
- Jogadores que atuam em partidas importantes podem ganhar experiência extra.

A tela de treinamento deve mostrar:

- Lista de jogadores
- Overall atual
- Potencial
- Idade
- Função
- Moral
- Forma
- Fadiga
- Plano de treino atual
- Atributos principais
- Progresso até o próximo overall
- Botão para escolher treino individual

---

# 6. Jogar ou simular partida

Antes de cada partida, o jogador deve escolher entre:

- Jogar
- Simular

## Simular

A opção **Simular** resolve a partida automaticamente.

A simulação deve considerar:

- Overall dos times
- Forma
- Moral
- Ranking
- Força no mapa
- Estratégia
- Fator aleatório
- MD1, MD3 ou MD5
- Veto automático
- Força dos jogadores
- Momento da equipe
- Economia simulada
- Experiência dos jogadores
- Consistência dos jogadores
- Força do IGL
- Força do AWPer

O resultado da simulação deve mostrar:

- Vencedor
- Placar da série
- Placar dos mapas
- Estatísticas
- MVP
- KDA
- Impacto financeiro
- Alteração de moral
- Alteração de ranking
- Alteração de torcida
- Alteração de forma

## Jogar

A opção **Jogar** permite acompanhar a partida round a round.

Antes da partida:

- O jogador faz veto manual de mapas.
- O adversário faz veto automático.
- A série pode ser MD1, MD3 ou MD5.

Durante a partida:

- O usuário acompanha cada round.
- Pode clicar em próximo round.
- Pode ativar autoplay.
- Pode pausar autoplay.
- Pode pular mapa.
- Pode pular série/partida.
- Pode ver estatísticas ao vivo.

---

# 7. Veto de mapas MD1, MD3 e MD5

Use mapas reais do Counter-Strike como texto:

- Dust2
- Mirage
- Inferno
- Nuke
- Overpass
- Ancient
- Anubis

Cada time deve ter força individual em cada mapa.

Exemplos:

- Um time pode ser muito forte na Nuke.
- Outro pode ser fraco na Anubis.
- Outro pode ter Mirage como melhor mapa.

O sistema de veto deve considerar:

- Força do próprio time em cada mapa
- Fraqueza do adversário
- Formato da série
- Escolhas do jogador
- Decisão automática do adversário

## MD1

Fluxo:

1. Time A bane 1 mapa
2. Time B bane 1 mapa
3. Time A bane 1 mapa
4. Time B bane 1 mapa
5. Time A bane 1 mapa
6. Time B bane 1 mapa
7. Mapa restante será jogado

## MD3

Fluxo:

1. Time A bane 1 mapa
2. Time B bane 1 mapa
3. Time A escolhe mapa 1
4. Time B escolhe lado no mapa 1
5. Time B escolhe mapa 2
6. Time A escolhe lado no mapa 2
7. Time A bane 1 mapa
8. Time B bane 1 mapa
9. Mapa restante será o decider

## MD5

Fluxo:

1. Time A bane 1 mapa
2. Time B bane 1 mapa
3. Time A escolhe mapa 1
4. Time B escolhe lado no mapa 1
5. Time B escolhe mapa 2
6. Time A escolhe lado no mapa 2
7. Time A escolhe mapa 3
8. Time B escolhe lado no mapa 3
9. Time B escolhe mapa 4
10. Time A escolhe lado no mapa 4
11. Mapa restante será o decider

A tela de veto deve mostrar:

- Campeonato
- Fase
- Time A
- Time B
- Formato da série
- Map pool
- Mapas disponíveis
- Mapas banidos
- Mapas escolhidos
- Decider
- Lado inicial
- Histórico das ações de veto
- Botão confirmar ação
- Botão auto-veto
- Botão iniciar partida

---

# 8. Partida round a round

Na opção **Jogar**, a partida deve passar round a round.

Regras da partida:

- Formato CS2 MR12.
- Primeiro time a fazer 13 rounds vence no tempo normal.
- Se ficar 12x12, vai para overtime.
- Overtime em blocos.
- No primeiro overtime, vence quem chegar a 16.
- Se empatar 15x15, começa novo overtime.
- No segundo overtime, vence quem chegar a 19.
- Se empatar 18x18, começa novo overtime.
- Depois vence quem chegar a 22, 25, 28 e assim por diante.

A tela da partida deve mostrar:

- Campeonato
- Fase
- Formato da série: MD1, MD3 ou MD5
- Mapa atual
- Placar da série
- Placar do mapa
- Round atual
- Lado CT/TR de cada time
- Economia de cada time
- Momentum
- Último round
- Log de kills
- KDA dos jogadores
- Estatísticas ao vivo
- MVP atual
- Botões de controle

Botões necessários:

- Próximo round
- Autoplay
- Pausar
- Pular mapa
- Pular partida/série
- Ver estatísticas

---

# 9. Sistema de kills, KDA e round log

Cada round deve gerar eventos de partida.

Exemplos de eventos:

- Jogador A matou Jogador B com AK-47.
- Jogador A matou Jogador B com AWP.
- Jogador A fez double kill.
- Jogador A fez triple kill.
- Jogador A venceu clutch 1v2.
- Time A plantou a bomba.
- Time B defusou a bomba.
- Time A venceu por eliminação.
- Time B venceu por tempo.
- Time A venceu eco.
- Time B venceu force buy.

Cada kill deve registrar:

- Round
- Jogador que matou
- Jogador que morreu
- Assistência, se houver
- Arma usada
- Headshot ou não
- Trade kill ou não
- First kill ou não
- Tempo aproximado dentro do round

O KDA deve atualizar em tempo real:

- Kills
- Deaths
- Assists
- ADR
- KAST
- Opening kills
- Clutches vencidos
- Rating da partida

Regras importantes:

- Cada round deve ter entre 3 e 10 eventos de kill, dependendo da condição.
- Um jogador morto não deve continuar fazendo kills no mesmo round.
- O total de mortes no round não deve ultrapassar 5 jogadores por time.
- O vencedor do round deve ser coerente com os eventos.
- O MVP do round deve ser o jogador de maior impacto.
- O log deve ser claro e fácil de ler.

---

# 10. Economia da partida

Adicionar economia básica por round.

A economia deve influenciar as chances de vitória.

Tipos de compra:

- Pistol
- Eco
- Force
- Half buy
- Full buy
- Anti-eco

A economia deve considerar:

- Vitória no round anterior
- Sequência de derrotas
- Plant da bomba
- Defuse
- Economia salva
- Tipo de compra
- Armas disponíveis

A tela deve mostrar a economia de cada time em tempo real.

---

# 11. Simulador de round

O simulador de round deve considerar:

- Overall médio do time
- Força no mapa
- Lado CT/TR
- Economia
- Tipo de compra
- Moral
- Momentum
- Forma
- Atributos dos jogadores
- Função dos jogadores
- Chance de clutch
- Chance de erro individual
- AWPer
- IGL
- Entry
- Support
- Consistência
- Experiência

O resultado do round deve gerar:

- Vencedor
- Condição de vitória
- MVP do round
- Evento principal
- Placar atualizado
- Economia atualizada
- Kill feed
- Estatísticas atualizadas

Condições de vitória:

- Eliminação
- Bomba explodiu
- Bomba defusada
- Tempo acabou

---

# 12. Simulador de mapa

O simulador de mapa deve:

- Iniciar o mapa com placar 0x0.
- Trocar lados após 12 rounds.
- Detectar vitória no tempo normal.
- Detectar 12x12 e iniciar overtime.
- Controlar alvo de overtime: 16, 19, 22, 25...
- Continuar até haver vencedor.
- Registrar todos os rounds.
- Atualizar estatísticas dos jogadores.
- Retornar vencedor do mapa.

---

# 13. Simulador de série

O simulador de série deve:

- Usar os mapas definidos no veto.
- Suportar MD1, MD3 e MD5.
- Encerrar MD1 com 1 mapa vencido.
- Encerrar MD3 com 2 mapas vencidos.
- Encerrar MD5 com 3 mapas vencidos.
- Permitir jogar round a round.
- Permitir simular a série inteira.
- Permitir pular mapa.
- Permitir pular série.
- Retornar vencedor da série.
- Retornar MVP geral.
- Retornar placar dos mapas.
- Retornar estatísticas completas.

---

# 14. Tela de Academy

Criar uma tela específica para a Academy.

A tela deve mostrar:

- Jogadores da Academy
- Overall
- Potencial
- Raridade
- Idade
- Nacionalidade
- Função
- Moral
- Forma
- Status de desenvolvimento
- Plano de treino
- Botão promover ao time principal
- Botão dispensar
- Botão treinar
- Botão melhorar Academy
- Botão gerar nova leva de talentos, se permitido

Regras:

- Gerar nova leva de talentos apenas em períodos específicos.
- Melhorar Academy custa dinheiro.
- Academy melhor aumenta chance de talentos raros.
- Academy melhor aumenta limite de jogadores.
- Academy deve ter custo mensal.

---

# 15. Tela de criação de time

Criar uma tela de criação de time.

A tela deve ter:

- Formulário para nome do time
- Campo para sigla/tag
- Escolha de país
- Escolha de região
- Escolha de cores
- Escolha do nome do manager
- Escolha do nível inicial
- Preview do orçamento
- Preview do ranking inicial
- Preview da qualidade dos jogadores
- Botão para gerar elenco
- Botão para confirmar criação

Ao confirmar, o time criado deve aparecer como time jogável.

---

# 16. Tela pré-jogo

Antes de cada partida, criar uma tela pré-jogo com:

- Time do jogador
- Time adversário
- Campeonato
- Fase
- Formato da série
- Ranking dos times
- Forma recente
- Mapas fortes/fracos
- Botão Jogar
- Botão Simular
- Botão Ver adversário
- Botão Ver histórico

Se escolher Jogar:

- Ir para o veto de mapas.
- Depois iniciar a partida round a round.

Se escolher Simular:

- Fazer veto automático.
- Simular a série.
- Mostrar resultado final.

---

# 17. Tela de resultado

Ao terminar uma partida ou série, mostrar:

- Vencedor
- Placar da série
- Placar de cada mapa
- MVP geral
- KDA dos jogadores
- Estatísticas completas
- Alteração de moral
- Alteração de torcida
- Alteração de ranking
- Dinheiro ganho
- Premiação recebida, se for campeonato
- Bônus de patrocínio, se existir
- Próxima partida

---

# 18. Save/load

O jogo deve salvar:

- Time escolhido
- Time criado pelo jogador
- Jogadores gerados
- Academy
- Treinos individuais
- Estado da carreira
- Estado da partida ao vivo
- Estado da série
- Histórico de partidas
- KDA acumulado
- Evolução dos jogadores
- Upgrades da Academy
- Finanças
- Ranking
- Campeonatos
- Resultados

O save/load deve usar LocalStorage.

---

# 19. Organização do projeto

Organize o projeto em módulos:

- Dados
- Tipos
- Sistemas de jogo
- Store global
- Páginas
- Componentes

Regras:

- Não misturar lógica de jogo dentro dos componentes visuais.
- Componentes devem exibir dados e chamar ações.
- Lógica de simulação deve ficar separada.
- Lógica de geração de jogadores deve ficar separada.
- Lógica de Academy deve ficar separada.
- Lógica de treinamento deve ficar separada.
- Lógica de partida deve ficar separada.
- O código deve ser modular e fácil de expandir.

---

# 20. Sugestão de telas

Criar ou melhorar as seguintes telas:

- Dashboard
- Database de times
- Database de jogadores
- Criar time
- Elenco
- Academy
- Treinamento
- Pré-jogo
- Veto de mapas
- Live Match
- Resultado da partida
- Calendário
- Campeonatos
- Finanças
- Ranking

---

# 21. Critérios de aceite

A implementação será considerada correta se:

1. Existirem 100 times reais cadastrados.
2. O jogador conseguir criar seu próprio time.
3. O time criado receber jogadores gerados conforme o nível escolhido.
4. Todo time tiver Academy.
5. Times criados tiverem Academy aleatória.
6. Times reais usarem Academy real quando houver dados.
7. Jogadores Academy tiverem overall, potencial e raridade.
8. Jogadores raros forem difíceis de aparecer.
9. Potencial nunca for menor que overall +5.
10. O jogador puder treinar atletas individualmente.
11. O jogador puder escolher entre Jogar e Simular.
12. Ao escolher Jogar, o jogador puder fazer veto de mapas.
13. O veto funcionar em MD1, MD3 e MD5.
14. A partida passar round a round.
15. O placar seguir a regra de primeiro a 13.
16. Em 12x12, a partida ir para overtime.
17. O overtime funcionar com alvos 16, 19, 22, 25 e assim por diante.
18. O log de kills aparecer corretamente.
19. O KDA atualizar em tempo real.
20. O jogador puder pular mapa e pular série.
21. O resultado final atualizar moral, ranking, torcida, dinheiro e estatísticas.
22. A UI continuar organizada, responsiva e com tema escuro.
23. O save/load continuar funcionando corretamente.

---

# 22. Ordem recomendada de implementação

Implemente nesta ordem:

1. Estrutura de dados dos 100 times reais.
2. Estrutura de jogadores reais e gerados.
3. Sistema de criação de time próprio.
4. Gerador de elenco para time criado.
5. Sistema de Academy.
6. Gerador de jogadores Academy.
7. Sistema de potencial e raridade.
8. Tela de Academy.
9. Sistema de treinamento individual.
10. Tela de treinamento individual.
11. Tela pré-jogo com Jogar ou Simular.
12. Sistema de veto MD1, MD3 e MD5.
13. Simulador round a round.
14. Kill feed e KDA.
15. Simulador de mapa.
16. Simulador de série.
17. Tela Live Match.
18. Tela de resultado.
19. Integração com store global.
20. Save/load.
21. Testes do fluxo completo.

---

# 23. Forma de resposta esperada da IA

Ao implementar, siga este formato:

1. Explique rapidamente o que será feito.
2. Liste os arquivos que serão criados.
3. Liste os arquivos que serão alterados.
4. Implemente em etapas.
5. Forneça o código completo de cada arquivo.
6. Explique como testar.
7. Não gere tudo de uma vez se ficar grande demais.
8. Priorize uma implementação funcional, modular e expansível.

Comece pela estrutura de dados dos 100 times reais, criação de time próprio e sistema de Academy.
