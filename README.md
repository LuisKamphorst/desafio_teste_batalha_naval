# Batalha Naval

## Especificação

Um tabuleiro-alvo de 10 × 10 contém um porta-aviões de 5 casas, um encouraçado de 4, um submarino de 3 e um destroier de 2. Os navios ocupam segmentos contínuos horizontais ou verticais e podem se tocar, sem sobreposição. Após posicionar toda a frota, cada disparo inédito resulta em água, acerto ou afundamento. A vitória ocorre ao afundar os quatro navios.

## Execução

Com Node.js 18 ou superior, abra o terminal na pasta que contém este README e execute `npm test`. O projeto usa o executor de testes do Node.js e dispensa instalação de dependências. A implementação está em `jogo.js` e os cenários estão em `jogo.test.js`.

## Casos de teste

1. **Frota e dimensões** — Conta os segmentos de cada navio e verifica os limites do tabuleiro 10 × 10.
2. **Posicionamento vertical na borda** — Alinha três segmentos na última coluna até a última linha.
3. **Posições inválidas sem alteração parcial** — Tenta sobreposição, saída pelas bordas, duplicação de tipo, direção diagonal e tipo desconhecido.
4. **Preparação e repetição de tiros** — Bloqueia disparos antes da frota completa e tiros repetidos tanto em água quanto em navio.
5. **Afundamento e vitória** — Atinge os 14 segmentos e verifica que apenas o último de cada navio o afunda e só o quarto afundamento encerra a partida.

## Colaborador

Luis Felipe Kamphorst
