---
name: Escala Eventual
description: Escala de substituições do dia, lida como um quadro de horários impresso.
colors:
  papel: "#FBFAF7"
  papel-fundo: "#F2F0EA"
  papel-fundo-2: "#E9E6DE"
  regua: "#DFDBD1"
  regua-forte: "#C4BEB1"
  campo: "#FFFFFF"
  tinta-900: "#171A1F"
  tinta-700: "#3A4049"
  tinta-500: "#5C636E"
  tinta-400: "#636A74"
  acento: "#1C5C4F"
  acento-hover: "#154A3F"
  acento-fraco: "#E4EEE9"
  area-linguagens: "#9A3412"
  area-natureza: "#166534"
  area-humanas: "#155E75"
  area-diversificada: "#6B21A8"
  area-gestao: "#44403C"
  coberta: "#15603A"
  coberta-fundo: "#E3EFE7"
  ultimo-recurso: "#8A5A00"
  ultimo-recurso-fundo: "#F6ECD4"
  descoberta: "#A11A1A"
  descoberta-fundo: "#F8E4E1"
typography:
  headline:
    fontFamily: "'Public Sans Variable', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
    fontFeature: "tnum"
  title:
    fontFamily: "'Public Sans Variable', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.25
    fontFeature: "tnum"
  body:
    fontFamily: "'Public Sans Variable', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tnum"
  apoio:
    fontFamily: "'Public Sans Variable', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "tnum"
  botao:
    fontFamily: "'Public Sans Variable', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    fontFeature: "tnum"
  label:
    fontFamily: "'Public Sans Variable', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.06em"
    fontFeature: "tnum"
rounded:
  ponto: "2px"
  selo: "3px"
  raio: "4px"
  painel: "6px"
spacing:
  e-1: "4px"
  e-2: "8px"
  e-3: "12px"
  e-4: "16px"
  e-5: "24px"
  e-6: "32px"
  e-7: "48px"
  e-8: "64px"
components:
  button-primary:
    backgroundColor: "{colors.acento}"
    textColor: "{colors.papel}"
    typography: "{typography.botao}"
    rounded: "{rounded.raio}"
    padding: "0 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.acento-hover}"
    textColor: "{colors.papel}"
  button-primary-disabled:
    backgroundColor: "{colors.papel-fundo-2}"
    textColor: "{colors.tinta-500}"
  button-secondary:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta-900}"
    typography: "{typography.botao}"
    rounded: "{rounded.raio}"
    padding: "0 16px"
    height: "40px"
  button-secondary-hover:
    backgroundColor: "{colors.papel-fundo}"
    textColor: "{colors.tinta-900}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.tinta-700}"
    typography: "{typography.botao}"
    rounded: "{rounded.raio}"
    padding: "0 12px"
    height: "32px"
  button-ghost-hover:
    backgroundColor: "{colors.papel-fundo}"
    textColor: "{colors.tinta-900}"
  button-danger:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.descoberta}"
    typography: "{typography.botao}"
    rounded: "{rounded.raio}"
    padding: "0 16px"
    height: "40px"
  button-danger-hover:
    backgroundColor: "{colors.descoberta-fundo}"
    textColor: "{colors.descoberta}"
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.tinta-500}"
    rounded: "{rounded.raio}"
    size: "32px"
  input:
    backgroundColor: "{colors.campo}"
    textColor: "{colors.tinta-900}"
    typography: "{typography.body}"
    rounded: "{rounded.raio}"
    padding: "0 12px"
    height: "40px"
  segment-selected:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta-900}"
    typography: "{typography.botao}"
    rounded: "{rounded.raio}"
    padding: "0 12px"
    height: "32px"
  chip-toggle-on:
    backgroundColor: "{colors.acento-fraco}"
    textColor: "{colors.acento}"
    typography: "{typography.apoio}"
    rounded: "{rounded.raio}"
    padding: "0 8px"
    height: "28px"
  selo:
    backgroundColor: "{colors.papel-fundo-2}"
    textColor: "{colors.tinta-700}"
    typography: "{typography.label}"
    rounded: "{rounded.selo}"
    padding: "1px 6px"
  painel:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta-700}"
    rounded: "{rounded.painel}"
    padding: "24px"
  dialogo:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta-700}"
    rounded: "{rounded.painel}"
    padding: "24px"
  aviso:
    backgroundColor: "{colors.tinta-900}"
    textColor: "{colors.papel}"
    typography: "{typography.apoio}"
    rounded: "{rounded.painel}"
    padding: "12px 16px"
  linha-selecionada:
    backgroundColor: "{colors.acento-fraco}"
    textColor: "{colors.tinta-900}"
  linha-sem-cobertura:
    backgroundColor: "{colors.descoberta-fundo}"
    textColor: "{colors.descoberta}"
---

# Design System: Escala Eventual

## Overview

**Creative North Star: "O Quadro de Horários"**

A escala é a folha que a coordenação afixaria no mural da sala dos professores: tinta escura sobre papel morno, réguas finas separando as linhas, e quase nenhuma cor. O que a tela mostra é o que vai para a impressão A4 e para o WhatsApp, então a interface se comporta como um documento que se pode editar, e não como um painel de controle. A densidade é a de uma tabela de secretaria: linhas de 15px, metadados de 13px logo abaixo, números com algarismos tabulares alinhados em coluna.

A estrutura vem das réguas, não das caixas. Grupos se leem por uma régua mais forte no começo de cada aula, cabeçalhos de tabela fecham com um traço de tinta, e as superfícies são no máximo um ou dois painéis por página. A cor é reservada para significado: as cinco áreas de conhecimento da escola, os três estados de cobertura de uma aula, e o verde-quadro que marca a única ação primária do momento e o que está selecionado. Todo o resto é tinta em quatro degraus.

O sistema recusa explicitamente o vocabulário de painel SaaS: grade de cards, degradês, avatares coloridos e botões "Inteligente". A escolha de cada substituto é mostrada como texto (o motivo, logo abaixo do nome), não como selo luminoso ou ícone mágico.

**Key Characteristics:**
- Papel morno (#F2F0EA de fundo, #FBFAF7 nos painéis), tinta grafite em quatro degraus, réguas de 1px.
- Verde-quadro só na ação primária e na seleção; uma ação primária por momento.
- Cor semântica fechada: 5 áreas, 3 estados de cobertura. Nada mais tem matiz.
- Public Sans variável com algarismos tabulares em todo o app; piso de 12px.
- Tabelas e listas com réguas no lugar de cards; o celular converte a tabela em blocos, sem mudar o conteúdo.
- Plano: sombra só no que flutua (diálogo, aviso) e um sopro sob botões secundários.

## Colors

Uma paleta de tinta sobre papel, com um único acento verde-escuro e duas famílias semânticas fechadas.

### Primary
- **Verde-Quadro** (acento): fundo do botão primário (Gerar escala → Oficializar → Copiar para o WhatsApp), anel de foco de teclado, `accent-color` das caixas de seleção, cor do link e do botão de texto. Escurece para **Verde-Quadro Fundo** (acento-hover) no hover.
- **Verde-Giz** (acento-fraco): o lavado da seleção. Professor marcado como ausente, candidato atual na troca, linha-alvo durante o arrastar, o piscar de uma linha alterada, atalho pressionado, anel externo de 3px de um campo em foco, `::selection`.

### Secondary: Áreas de conhecimento
Cinco tons escuros e dessaturados, um por área do modelo da escola. Aparecem apenas como o **marcador de área** (quadradinho de 8px) antes do nome da disciplina ou no meta do professor, e nunca como fundo, borda ou texto corrido.
- **Tijolo** (area-linguagens): Linguagens.
- **Mata** (area-natureza): Ciências da Natureza, incluindo Matemática.
- **Petróleo** (area-humanas): Ciências Humanas.
- **Uva** (area-diversificada): Parte Diversificada.
- **Pedra** (area-gestao): Gestão Escolar; também o fallback quando a área é desconhecida.

### Tertiary: Estados de cobertura
Três pares texto/fundo, um por estado de uma aula na escala. O texto vai no motivo e nos números do resumo; o fundo, nas faixas de aviso e na célula sem cobertura.
- **Coberta** (coberta / coberta-fundo): substituto professor. Também o selo "Oficializada" e o "Livre" da grade.
- **Último recurso** (ultimo-recurso / ultimo-recurso-fundo): coberta por PCA ou equipe gestora. Também o aviso de fim de semana.
- **Sem cobertura** (descoberta / descoberta-fundo): nenhum elegível. O mesmo vermelho marca ações destrutivas (botão de perigo, ícone de remover no hover) e faixas de erro de importação, e nada além disso.

### Neutral
- **Papel** (papel): painéis, diálogos, cabeçalho do app, texto do botão primário e do aviso.
- **Papel de Fundo** (papel-fundo): o fundo da página; também o hover de linhas, listas e botões fantasma.
- **Papel Dobrado** (papel-fundo-2): selos neutros (PCA, Gestão, Isento), botão primário desabilitado, a listra da hachura.
- **Folha do Campo** (campo): branco puro só dentro de campos de texto e busca, para que o que se digita pareça uma folha por cima do papel.
- **Régua** (regua): a linha de 1px entre linhas de tabela e lista, bordas de painel.
- **Régua Forte** (regua-forte): bordas de campos e botões secundários, régua de início de cada aula, separadores do resumo.
- **Tinta 900** (tinta-900): títulos, nomes, turmas, números; o traço sob cabeçalhos de tabela; o fundo do aviso flutuante.
- **Tinta 700** (tinta-700): texto corrido do corpo; barras de distribuição no histórico.
- **Tinta 500** (tinta-500): metadados, subtítulos, cabeçalhos de coluna, horários.
- **Tinta 400** (tinta-400): o mais claro, só para placeholders, contagens, dicas, a alça de arrastar e a numeração das regras. Todos os quatro degraus passam AA sobre papel e papel de fundo.

### Named Rules
**A Regra do Verde Único.** Em cada momento do fluxo existe exatamente um botão verde. Antes de gerar, é "Gerar escala"; com rascunho, "Oficializar" (e Gerar vira secundário); oficializada, "Copiar para o WhatsApp". Se dois botões verdes aparecem juntos, um deles está errado.

**A Regra da Cor com Significado.** Matiz só existe para as 5 áreas, os 3 estados de cobertura e o acento. Um elemento que não carrega nenhum desses significados é tinta ou papel.

**A Regra da Carga Sem Ranking.** Contadores de substituição e barras de distribuição são sempre tinta neutra. Nunca se pinta o maior, o menor ou o "vencedor".

## Typography

**Display Font:** Public Sans Variable (com system-ui, -apple-system, Segoe UI, Roboto, sans-serif)
**Body Font:** Public Sans Variable (mesma pilha)

**Character:** Uma única grotesca institucional, de origem governamental, sóbria e muito legível em tamanhos pequenos. Hierarquia por peso (400/500/600/700) e tamanho, nunca por troca de família. `font-variant-numeric: tabular-nums` está no `body`, então todo número do app alinha em coluna.

### Hierarchy
- **Headline** (600, 24px, 1.25, -0.015em): a data por extenso no topo da escala ("Terça-feira, 6 de outubro") e o título de página nas outras abas. Cai para 18px abaixo de 640px.
- **Title** (600, 18px, 1.25): "Quem faltou", títulos de diálogo, títulos de seção; os números do resumo em 700.
- **Body** (400–600, 15px, 1.5): linhas da tabela, nomes de professor (500, 600 quando marcado), substituto (600), turma (700).
- **Apoio** (400–600, 13px, 1.4): o degrau mais usado. Metadados, motivo da escolha (600, na cor do estado), "falta de…", horários, subtítulos, legendas. Também o tamanho de todo botão (600, 1.2).
- **Label** (600, 12px, 0.06em, CAIXA ALTA): somente cabeçalhos de coluna de tabela e lista e rótulos de ficha de dados (`dt`). Selos usam 12px em caixa normal.

O token `--texto-titulo` (32px) existe no `:root`, mas nenhuma superfície o usa; o build parou em cinco degraus (12/13/15/18/24). Não o reative sem uma superfície que precise dele.

### Named Rules
**A Regra do Piso de 12.** Nenhum texto abaixo de 12px, em nenhum breakpoint e em nenhum selo.

**A Regra da Caixa Alta de Coluna.** Caixa alta com tracking só aparece onde um quadro impresso a teria: cabeçalho de coluna e rótulo de campo de ficha. Nunca acima de um título, nunca como sobretítulo de seção.

**A Regra do Nome Legível.** Nomes chegam em caixa alta da planilha e são exibidos em caixa de título, com partículas (da, de, do, dos, e) em minúscula. Turmas são encurtadas ("6º A", "2ª A · DS").

## Layout

A unidade é 4px: `e-1` a `e-8` (4, 8, 12, 16, 24, 32, 48, 64). O respiro padrão de painel, cabeçalho de seção e diálogo é 24px; dentro de listas, 8–12px; entre botões, 8px. Conteúdo centralizado com largura máxima de 1440px e 24px de margem.

A tela do dia é uma grade de duas colunas: à esquerda um painel fixo de 340px (data, "Quem faltou", busca, lista de professores com contador, rodapé com Gerar e Multiplica SP), grudado no topo e com a lista rolando por dentro; à direita o painel da escala ocupa o resto (data em 24px, estado e ações no cabeçalho, linha de resumo, tabela). Textos de leitura são limitados entre 48ch e 72ch.

Responsivo:
- **≤1180px:** a coluna esquerda estreita para 300px.
- **≤900px:** uma coluna; o cabeçalho empilha marca e abas; a lista de professores rola em até 46vh.
- **≤640px:** margens de 16px; títulos de 24 caem para 18; o botão primário vai para a primeira linha em largura total; a tabela da escala vira blocos (turma e horário em cima, disciplina, depois o substituto separado por régua); a tabela de professores vira blocos rotulados; o diálogo vira folha que sobe da base.
- **Ponteiro grosso:** a altura de controle passa de 40px para 44px, botões de ícone para 44px, segmentos e filtros para 40px.
- **Impressão:** some o cabeçalho, a coluna de faltas, as ações e as regras; o painel perde a borda; fica só a tabela.

### Named Rules
**A Regra das Três Réguas.** Dentro de uma tabela há três espessuras de significado, todas de 1px: tinta 900 fecha o cabeçalho, régua forte abre cada grupo (cada aula), régua comum separa linhas. Grupos se leem pelas réguas, nunca por caixas ou fundos alternados.

## Elevation & Depth

O sistema é plano. Painéis são papel com borda de 1px sobre papel de fundo; profundidade vem do contraste tonal entre os dois papéis e das réguas. Sombra existe apenas para o que de fato flutua sobre a folha (diálogo e aviso), e como um sopro de 1px sob o botão secundário e o segmento selecionado para que pareçam tecla.

### Shadow Vocabulary
- **Flutuante** (`box-shadow: 0 12px 32px -8px rgb(23 26 31 / 0.22), 0 2px 6px rgb(23 26 31 / 0.08)`): diálogos e o aviso flutuante.
- **Controle** (`box-shadow: 0 1px 2px rgb(23 26 31 / 0.08)`): botão secundário em repouso.
- **Segmento** (`box-shadow: 0 1px 2px rgb(23 26 31 / 0.12), 0 0 0 1px var(--regua)`): opção escolhida num controle segmentado.
- **Foco de campo** (`box-shadow: 0 0 0 3px var(--acento-fraco)`): campo e busca em foco, junto com a borda em verde-quadro.

### Named Rules
**A Regra do Só-o-que-Flutua.** Nada que está na folha tem sombra de elevação. Se não se sobrepõe a outra coisa, não projeta sombra.

## Shapes

Cantos quase retos, como papel cortado. Controles, linhas selecionáveis e faixas usam 4px; painéis, diálogos e aviso usam 6px (no celular, o diálogo arredonda só em cima); selos 3px; o marcador de área e a amostra de legenda, 2px. O controle segmentado usa 6px por fora e 4px por dentro. Nada é pílula, nada é círculo.

Bordas são sempre 1px sólidas, com uma exceção: a área de soltar arquivo usa tracejado em régua forte. Horários bloqueados na grade (Multiplica, formação) recebem hachura diagonal de 1px em papel dobrado sobre papel de fundo, o padrão de "riscado" de um quadro de papel.

## Components

### Buttons
Firmes e baixos, com o peso no texto e não no volume.
- **Shape:** cantos levemente arredondados (4px), altura de 40px (44px com ponteiro grosso), 16px de respiro lateral, texto 13px/600, ícone de 16px à esquerda com 8px de intervalo.
- **Primário:** verde-quadro com texto papel. Hover escurece; desabilitado vira papel dobrado com tinta 500. Um por momento (ver A Regra do Verde Único). No rodapé da coluna de faltas cresce para 44px e 15px.
- **Secundário:** papel com borda régua forte, tinta 900, sombra de controle; hover em papel de fundo. É o padrão para WhatsApp em rascunho, Imprimir A4, Excel, Multiplica SP e Fechar.
- **Fantasma:** sem fundo nem borda, tinta 700; hover em papel de fundo. Na variante pequena (32px, 12px de lado) é o "Trocar" de cada linha.
- **Perigo:** papel com borda régua forte e texto vermelho de sem cobertura; hover em fundo vermelho claro com borda vermelha. Só para desfazer cobertura ou apagar.
- **Texto:** verde-quadro, 13px/600, sublinhado que aparece no hover ("Limpar (3)").
- **Ícone:** quadrado de 32px (44px no toque), tinta 500, hover em papel de fundo; a variante de remover fica vermelha no hover.
- **Toque:** todo botão afunda 1px no `:active`. Transições de 150ms em cor, fundo, borda e sombra.

### Chips
- **Atalho:** 28px, borda régua, papel; pressionado vira verde-giz com borda e texto verde-quadro.
- **Filtro de área:** 32px sem borda; marcado ganha papel de fundo, borda régua forte e peso 600.
- **Controle segmentado:** trilho em papel de fundo com borda régua; a opção escolhida vira uma tecla de papel com a sombra de segmento.
- **Selo:** 12px/600 em papel dobrado e tinta 700, cantos de 3px ("PCA", "Gestão", "Isento").

### Cards / Containers
- **Corner Style:** 6px.
- **Background:** papel sobre a página em papel de fundo.
- **Shadow Strategy:** nenhuma (ver Elevation & Depth).
- **Border:** 1px régua.
- **Internal Padding:** 24px (16px abaixo de 640px).
Não há cards de conteúdo; o painel é a folha inteira de uma seção, e tudo dentro dele é tabela ou lista.

### Inputs / Fields
- **Style:** folha branca, borda 1px régua forte, 4px, altura de controle, texto 15px tinta 900. O select desenha a própria seta em tinta 500. A busca leva ícone de lupa em tinta 400 dentro do mesmo contorno.
- **Hover:** borda em tinta 400.
- **Focus:** borda verde-quadro mais anel externo de 3px em verde-giz; nada de contorno duplo.
- **Rótulo:** 13px/600 tinta 900, 8px acima; ajuda em 13px tinta 500 abaixo.
- **Avisos de formulário:** faixa com 4px de canto e borda do estado a 30% (ok, atenção, erro) sobre o fundo do mesmo estado.

### Navigation
Abas em linha no cabeçalho de papel, 15px/500 em tinta 500; hover e ativa em tinta 900, a ativa em 600 com um traço de 2px em tinta 900 que assenta sobre a régua do cabeçalho. Sem fundo, sem pílula. No celular as abas se distribuem pela largura com 44px de altura e trocam o rótulo pela versão curta. Foco de teclado: contorno de 2px em verde-quadro com 2px de afastamento em todo o app (recuado para dentro nas abas e células).

### A Linha da Escala (assinatura)
Cada linha é uma aula a cobrir. Coluna 1, agrupada por aula com `rowspan`: número da aula em 15px/700 e hora de início em 13px. Coluna 2: turma curta em 700. Coluna 3: marcador de área + disciplina em 500, e "falta de Fulano" em 13px tinta 500 abaixo. Coluna 4: nome do substituto em 600 e, abaixo, o **motivo** em 13px/600 na cor do estado ("Mesma disciplina", "Coordenação de área", "Sem professor livre"). Sem cobertura, a célula ganha fundo vermelho claro (no celular, só o texto vermelho). Coluna 5: "Trocar" fantasma e o ícone de remover. A linha aceita arrastar o substituto para outra linha: a alça aparece no hover, a linha arrastada esmaece a 45%, o alvo ganha verde-giz com réguas verdes em cima e embaixo, e a linha alterada pisca em verde-giz por 1,4s.

### O Resumo
Uma frase, não um painel de KPIs: "**12** aulas a cobrir | **9** por professor | **2** por PCA ou gestão | **1** sem cobertura", números em 18px/700 na cor do estado, separados por uma régua vertical de 14px. Abaixo, "Faltaram" seguido dos nomes.

### Lista de Professores
Linha de checkbox de 18px, nome em 15px, meta em 13px com marcador de área e selo de nível, contador de substituições à direita em 13px/600. Marcado: fundo verde-giz e nome em 600. O cabeçalho da lista é um cabeçalho de coluna (12px caixa alta) fechado por traço de tinta 900.

### Diálogo
Um único componente: fundo de tinta a 42%, folha de papel com 6px e sombra flutuante, cabeçalho com título 18px e subtítulo 13px separados do corpo por régua, rodapé com ações nas pontas. Entra em 220ms subindo 8px; no celular vira folha que sobe da base. Esc e clique fora fecham, e o foco volta a quem abriu.

### Aviso flutuante
Barra de tinta 900 com texto papel, 13px/500, ícone de check, centralizada a 24px da base; entra em 240ms subindo 8px.

## Do's and Don'ts

### Do:
- **Do** usar exatamente um botão primário verde-quadro por momento do fluxo: Gerar escala → Oficializar → Copiar para o WhatsApp.
- **Do** separar linhas e grupos com réguas de 1px (régua, régua forte no início do grupo, tinta 900 sob o cabeçalho).
- **Do** mostrar o motivo de cada escolha em texto de 13px/600 na cor do estado, logo abaixo do nome do substituto.
- **Do** marcar área de conhecimento só com o quadradinho de 8px e 2px de canto antes da disciplina.
- **Do** manter algarismos tabulares em todo número e alinhar contadores à direita.
- **Do** deixar a aula sem cobertura visível: célula em vermelho claro no desktop, texto vermelho no celular.
- **Do** usar 44px de altura de controle com ponteiro grosso e manter o piso de 12px de texto.
- **Do** usar a hachura diagonal de 1px (papel dobrado sobre papel de fundo) para horários bloqueados na grade.

### Don't:
- **Don't** montar grades de cards; uma página tem um ou dois painéis, e dentro deles tudo é tabela ou lista.
- **Don't** usar degradê como fundo ou preenchimento de cor; a hachura listrada de horário bloqueado é o único padrão.
- **Don't** usar avatares, coloridos ou não; a pessoa é o nome, a área é o quadradinho.
- **Don't** criar botões "Inteligente", brilhos, ícones mágicos ou qualquer sinal de automação; a regra é mostrada como texto.
- **Don't** introduzir matiz fora das 5 áreas, dos 3 estados de cobertura e do verde-quadro.
- **Don't** usar o vermelho de sem cobertura para nada além de aula descoberta, ação destrutiva e erro.
- **Don't** pintar contadores ou barras de carga para destacar quem substituiu mais ou menos.
- **Don't** pôr sombra em painéis, linhas ou cards que não flutuam.
- **Don't** usar caixa alta fora de cabeçalho de coluna e rótulo de ficha; nada de sobretítulo acima de título.
- **Don't** usar cantos de pílula ou círculo; o maior raio do sistema é 6px.
