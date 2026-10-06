---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Escala do dia (app inteiro)

Mode: Operate. Público: coordenação pedagógica, com pressa, 7h, desktop e celular.
Tarefa: marcar faltas → gerar → conferir e ajustar → oficializar → enviar (WhatsApp/A4/Excel).

## Direction contract

THESIS: A escala é um quadro de horários impresso, não um painel SaaS. Recusa o card grid, o gradiente, o avatar colorido e o botão "Inteligente".

OWN-WORLD: Tinta sobre papel (#FBFAF7 / #F2F0EA, tinta #171A1F→#636A74), réguas de 1px #DFDBD1, verde-quadro #1C5C4F só para ação primária e seleção. Cor apenas para as 5 áreas e os 3 estados de cobertura. Public Sans com algarismos tabulares; seis degraus 12/13/15/18/24/32.

STORY: Ela vê quem pode faltar, marca, lê a tabela com o motivo de cada escolha, troca o que quiser, oficializa e copia para o WhatsApp.

FIRST VIEWPORT: Coluna esquerda 340px com data e lista de professores (nome inteiro, área, contador); à direita a data por extenso em 24px e a tabela da escala ocupando o resto; ação primária no topo da tabela.

FORM: Quadro (direção fixada pelo usuário em 05/10/2026, spec publicada); seed: pinned-by-user.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
