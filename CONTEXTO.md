# Escala Eventual — contexto do projeto

Resumo de trabalho acumulado, para retomar sem reler todo o histórico.
Última atualização: 06/10/2026 (redesign Quadro).

---

## 1. O que é

App React + TypeScript + Vite de **gestão de escala de substituição eventual** da
**Escola Estadual Coronel Ary Gomes** (PEI, integral 9h). Quando professores faltam, o
sistema decide quem cobre cada aula do dia, respeitando um conjunto de regras.

- **Usuária real:** coordenação pedagógica, com pressa, no início da manhã, às vezes no celular.
- **Saídas:** mensagem de WhatsApp, impressão A4 (1 folha) e planilha Excel.
- **Repositório:** https://github.com/Artemis-Sales/escala-eventual — deploy automático na Vercel a partir de `main`.
- Sem backend. Estado global em Context API, persistência em `localStorage`.

---

## 2. Regras da escala (estado atual, todas implementadas)

### Quem é descartado (filtros absolutos)

1. Marcado como **isento de substituições** (`isExemptFromSubstitutions`) — hoje Danilo e Pedro, do curso técnico.
2. Também **faltou** naquele dia.
3. **Já escalado naquele mesmo horário** em outra turma.
4. O horário está **bloqueado para ele** (`blockedSubstitutionPeriods`) — hoje só Adriana, na 6ª aula.
5. Atingiria o **teto de 32 aulas semanais** (grade + eletivas + substituições já oficializadas na semana + as já alocadas no plano do dia; semana agrupada de segunda a sexta).
6. **Não está com o horário livre** — qualquer compromisso ocupa: aula, eletiva, tutoria, Multiplica SP, ATPC, Escola de Gestão.

### Ordem de escolha (cascata, em `src/utils/substitutionEngine.ts`)

1. **Quem ainda não substituiu hoje** — vem sempre antes. Uma 2ª substituição no mesmo dia é último caso, e isso fica **acima do nível hierárquico**: coordenadores e gestão são acionados *antes* de alguém repetir.
2. Entre os que já substituíram, quem substituiu **menos vezes hoje**.
3. **Nível:** Professor → Coordenador de Área → Equipe Gestora.
4. **Afinidade:** mesma disciplina → mesma área.
5. **Menos aulas próprias no dia** (aulas regulares + eletiva).
6. **Score** — equidade no histórico: `penalidade_de_nível + (substituições_no_histórico × 10)`.
   Penalidades: Coordenador +500, Gestão +1000.

> **Consequência conhecida:** como a afinidade virou critério próprio (nível 4), ela agora
> vence sempre a equidade acumulada. Antes o bônus de 40 pontos era superado por uma
> diferença de 4 substituições no histórico. Foi efeito colateral inevitável de fazer a
> afinidade ser a exceção da regra "menos aulas no dia", conforme pedido.

Sem candidato elegível, a aula fica **SEM COBERTURA** — o teto de 32 é rígido e prefere a
lacuna visível a estourar a carga de alguém em silêncio.

### Outras regras

- **Eletivas:** 2 aulas por professor (sexta, 5ª e 6ª), vindas da planilha. 20 professores têm; **Vanessa, Danilo e Pedro não**.
- **Multiplica SP:** dura 1h30 a partir de um horário livre e bloqueia **toda aula que atravessar** — por isso ocupa 2 ou 3 aulas conforme a hora de início. Encostar no limite não conta (curso das 08:00 não bloqueia a 1ª aula, que termina nesse minuto).
- **Áreas de conhecimento** (modelo da escola, *não* é a BNCC):
  - Linguagens: Língua Portuguesa, Língua Inglesa, Artes, Educação Física
  - Ciências da Natureza: Biologia, Física, **Matemática** e Química (Ciências, no Fundamental)
  - Ciências Humanas: História, Geografia, Filosofia, Sociologia
  - O resto: Parte Diversificada ou Gestão Escolar. **Não existe mais a área "Exatas"** — foi removida do tipo `KnowledgeArea`.
- **Oficializar** é a única ação irreversível: só ela grava no histórico e mexe nos contadores. Gerar, imprimir ou mandar no WhatsApp não gravam nada.

---

## 3. Pipeline de dados

A escola entrega o horário em **PDF** (antes era `.xlsx`). O gerador versionado é
`generatePdfData.mjs`, que regera `src/data/mockData.ts`:

- `horario individual.pdf` → as aulas de cada professor
- `horario geral.pdf` → a grade de cada turma, usada para **desambiguar** quando o nome vem truncado no individual

Os PDFs estão no `.gitignore` (contêm nomes reais). Depende de `pdfjs-dist` (devDependency).

### Armadilhas descobertas nesse pipeline

- **O texto do PDF precisa ser lido por coordenada**, não por linha. `pdftotext -layout` não serve: as células são altas e multi-linha, e as colunas não alinham com a coluna de horários.
- **Células mescladas** no Excel guardavam o valor só no canto superior esquerdo. Ignorar isso fazia a eletiva contar 1 aula em vez de 2, e o mesmo com ATPC Geral.
- **A planilha trunca nomes de turma.** As duas turmas de Desenvolvimento de Sistemas (2ª e 3ª série A) apareciam idênticas como `6082 - DESENVOLVIMENTO DE SIST…`. Resolver pela planilha/PDF de turmas, cruzando professor + dia + horário.
- **Nunca inventar turma por fallback.** Havia um `classId || '6A'` que mandava silenciosamente 4 aulas para o 6º ano A. Sem turma resolvida, o gerador avisa.
- **Disciplinas vêm com o nome da turma grudado** quando o separador é espaço em vez de quebra de linha. `src/utils/subjects.ts` limpa, aplica aliases por padrão (a "Orientação de Estudo" aparecia com 8 grafias) e fixa uma grafia canônica.

### `localStorage`

Chave de slots em **`escala_escola_oficial_slots_v8`**. Trocar a chave recarrega a grade
nova **preservando histórico e contadores**, que ficam em chaves separadas. Há também uma
migração versionada (`escala_escola_oficial_data_version`), que roda uma vez e padroniza
grafia/área sem destruir edições manuais posteriores.

> **Lição recorrente:** corrigir só o `mockData.ts` não chega ao usuário — o `localStorage`
> salvo tem precedência. Toda mudança de dados precisa decidir entre trocar a chave (perde
> edições da grade) ou migrar (preserva).

---

## 4. Bugs corrigidos (e por que importam)

| Bug | Causa | Correção |
|---|---|---|
| 3ª série A sem nenhuma aula | Regra de `extractClassId` testava `DESENVOLVIMENTO DE SIST` antes da série; primeiro match vencia | Resolvedor genérico pela grade de turmas |
| Disciplinas com nome de turma junto | `extractSubject` pegava `lines[0]`; quando o separador era espaço, vinha tudo | `cleanSubjectName` + dicionário canônico |
| Educação Física em "Exatas" | `'EDUCACAO FISICA'.includes('FISICA')` + regra de Exatas antes de Ciências da Natureza (que virava código morto) | Regras ordenadas, da mais específica para a genérica |
| **Oficializar contava o mesmo dia duas vezes** | Sem confirmação e sem guarda de `isOfficial`; regerar trazia o botão de volta | `src/utils/equity.ts` — desconta o que a escala anterior da data creditou e substitui o registro |
| "Restaurar Dados Oficiais" apagava tudo | Zerava histórico, contadores e Multiplica, com aviso genérico | Preserva histórico e contadores; aviso lista o que se perde |
| Eletiva contando 1 aula | Células mescladas ignoradas na leitura | Expansão das mesclagens + completar o par |

---

## 5. Redesign visual (em andamento)

**Diagnóstico:** nota heurística **18/40**. O usuário descreveu como "cara de vibe code", e
a evidência confirma: a paleta inteira era **Tailwind sem uma única alteração** (`#2563EB` =
`blue-600`, `#10B981` = `emerald-500`, `#F8FAFC` = `slate-50`), sombras idênticas ao padrão,
74 cores hex escritas à mão contra 31 tokens em **dois `:root` que se contradizem**, e 25
tamanhos de fonte (doze deles entre 0,65 e 0,88rem).

**O produto tem identidade, mas enterrada:** a escalada por níveis nomeada, a justificativa
inline de cada decisão ("Mesma Disciplina"), e os canais de saída observados (A4 "1 Folha").
O problema é que as duas telas que parecem uma escala escolar — a grade semanal e a tabela
do Estúdio — são uma aba secundária e um modal.

**Contradição estrutural:** o documento impresso é uma **tabela**; a tela mostra **cards**.

### Direção proposta: "Quadro"

Página de spec publicada: https://claude.ai/artifact/DQDNtQoKdx5p13StPebGWM

- **Papel e tinta** `#FBFAF7` com escala de tinta `#171A1F / #3A4049 / #5C636E / #636A74`
- **Cor só onde há significado:** 5 áreas (`#9A3412` Linguagens, `#166534` Ciências da Natureza, `#155E75` Ciências Humanas, `#6B21A8` Parte Diversificada, `#44403C` Gestão) e 3 estados de cobertura
- **Seis degraus de tipo** (12/13/15/18/24/32px) com piso de 12px e **algarismos tabulares**
- **Estrutura:** tabela no centro, seletor com nomes inteiros e contador de substituições ao lado
- **Sai:** confete, a palavra "Inteligente", o "Ranking de Distribuição" com pódio, gradientes, as 26 cores de avatar aleatórias

### Ordem de execução

| # | Item | Estado |
|---|---|---|
| 01 | Bugs de oficialização | **concluído** |
| 02 | Contraste e foco de teclado | **concluído** |
| 03 | Unificar os dois `:root` e resolver a fonte fantasma | **concluído** (branch `redesign/quadro`) |
| 04 | Escala tipográfica e estrutura | **concluído** (branch `redesign/quadro`) |
| 05 | Celular | **concluído** (branch `redesign/quadro`) |

### O que a implementação da Quadro fez (06/10/2026)

- **Um único `:root`** em `index.css`: papel/tinta, verde-quadro `#1C5C4F` só para ação primária
  e seleção, 5 cores de área, 3 estados de cobertura, seis degraus de tipo, espaço base 4.
  `App.css` foi reescrito do zero, sem cor literal fora dos tokens. Sistema registrado em `DESIGN.md`.
- **Fonte:** Public Sans servida localmente (`@fontsource-variable/public-sans`, sem Google
  Fonts), com `tabular-nums` no corpo inteiro. A Plus Jakarta e a Inter fantasma saíram.
- **Escala do dia:** coluna "Quem faltou" (nomes inteiros em caixa normal, área, contador) +
  a escala como **tabela** agrupada por aula, com o motivo de cada escolha. O modal "Estúdio"
  (`ScalePreviewModal`) foi removido: a tabela já é a conferência, com arrastar para trocar
  e o botão Trocar. As regras do motor ficam visíveis em "Como a escala escolhe".
- **Saíram:** confete (`canvas-confetti` desinstalado), "Inteligente", troféu/pódio/ranking
  (o Histórico virou distribuição em ordem alfabética), gradientes, avatares coloridos,
  emojis, o favicon do Vite e os assets do template.
- **Hierarquia de ação:** uma primária por momento — "Gerar escala" antes; "Oficializar"
  depois; "Copiar para o WhatsApp" depois de oficializada.
- **"Restaurar dados oficiais"** saiu do cabeçalho global para a aba **Dados**, como zona de cuidado.
- **Diálogo único** (`components/Modal.tsx`): Esc fecha, foco entra e volta; vira folha
  inferior no celular.
- **Celular:** a escala vira blocos regrados, as cinco abas cabem a 390px, "Gerar" rola até a escala.
- **Medido:** 0 reprovações de contraste em ~1.250 textos (todas as telas + diálogo), nenhum
  texto abaixo de 12px, sem rolagem horizontal a 390px. `src/utils/display.ts` tem testes (108 no total).
- **Correção de brinde:** editar um horário de eletiva/tutoria salvava como outro tipo e
  apagava o nome; agora o salvar fica desabilitado nesses casos.
- **Revisão independente:** 8 apontamentos, 7 resolvidos e conferidos por recaptura.

**Nomes cortados do curso técnico:** a planilha corta os nomes ("Modelagem e
Desenvolviment…"). A escola definiu a forma curta em 06/10/2026: **Lógica e Linguagens,
Modelagem, Processos, Redes de Computadores, Versionamento de Código e Carreira e
Competências** — no dicionário de
`subjects.ts` (espelhado no gerador) e numa migração v2 do `localStorage` que **só renomeia**
(rodar a v1 de novo recalcularia as áreas e apagaria edições manuais). "Lógica e Linguagens"
contém "LINGUA" e cairia em Linguagens: a regra de área ganhou `LOGICA E LINGUAGENS`.
Não sobrou nenhum nome cortado nos dados.

**Cor da aula = área da disciplina**, não do professor (`subjectAreaKey`): Matemática dada por
quem é de Educação Financeira continua verde.

---

## 6. Acessibilidade (item 02, concluído)

De **36 elementos reprovados para zero**, medido em 2.178 textos nas 7 telas e nos 3 estados
do fluxo (painel vazio, com faltantes, com escala gerada).

- `--text-muted` `#94A3B8` (2,45:1) → `#636A74` (5,22:1)
- **`--text-muted-dark` `#A8B2C1`** para header e banners escuros
- 3 cores de avatar escurecidas; `randomTeacherColor` agora sorteia de lista conferida
- Regra `:focus-visible` global — antes não havia **nenhuma** em 3.177 linhas
- Botão WhatsApp: mantém o verde `#25D366` da marca e **escurece o texto** (1,98 → 8,80:1)
- `- - -` das células vazias: marcado `aria-hidden`, mantido apagado de propósito (decisão registrada em comentário no CSS)

> **Armadilha que apareceu duas vezes:** escurecer uma cor para fundo claro **piora** sobre
> os banners escuros. Sempre verificar as duas superfícies. Daí existirem
> `--text-muted-dark` e as regras `.profile-stats .text-primary / .text-success`.

> **Como medir:** a varredura precisa de **composição de alfa** e **resolução de gradiente**.
> Sem isso aparecem 4 falsos positivos (texto branco sobre o header, lido como transparente)
> e, pior, **falhas reais ficam escondidas** atrás de fundos semitransparentes.

---

## 7. Como trabalhar neste projeto

- **Mostrar o resultado e pedir confirmação antes de alterar.** Preferência explícita do usuário. Demonstrar injetando CSS na página ao vivo pelo navegador funciona bem: mostra o efeito real sem tocar em arquivo.
- **Commit e push são automáticos** depois do aval. Push direto em `main` (a Vercel faz deploy de produção dela).
- **Verificar no navegador, não só nos testes.** Vários defeitos só aparecem em estados específicos: o selo "FALTA" exige um faltante marcado; cinco reprovações de contraste só existiam na escala gerada.
- **Testes:** 97, em `src/utils/*.test.ts` e `src/data/mockData.test.ts`. Rodar `npm test`, `npx tsc -b`, `npm run lint` e `npm run build`.
- **Confirmar que um teste de regressão falha sem a correção** antes de considerá-lo pronto.

### Arquivos que importam

| Arquivo | Papel |
|---|---|
| `src/utils/substitutionEngine.ts` | O motor: elegibilidade e ordem de escolha |
| `src/utils/equity.ts` | Contadores de substituição, idempotente por data |
| `src/utils/workload.ts` | Carga semanal, teto de 32, aulas do dia |
| `src/utils/subjects.ts` | Limpeza, grafia canônica e área de conhecimento |
| `src/utils/multiplica.ts` | Sobreposição do curso de 1h30 com as aulas |
| `src/context/SchoolContext.tsx` | Estado global, `localStorage`, migração |
| `src/data/mockData.ts` | Dados gerados — **não editar à mão**, regerar |
| `generatePdfData.mjs` | Gerador a partir dos PDFs |
| `src/App.css` | 3.177 linhas, 351 classes — o alvo do item 03 |

### Pendências menores

- `generateCleanData.cjs` ficou órfão (lia os `.xlsx` que foram apagados). Pode ser removido.
- Uma célula do Alair diz `MULTIPLICA / ELETIVA`: tratada como atividade que bloqueia mas não conta como eletiva. Se a escola esclarecer qual vale, ajustar.
- `"Orientação de Estudo – LÍNGUA…"` foi expandido para **"Orientação de Língua Portuguesa"** — é inferência, não confirmado pela escola.
