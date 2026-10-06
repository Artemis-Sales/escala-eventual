// Regera src/data/mockData.ts a partir dos dois PDFs do horario:
//
//   horario individual.pdf  -> a grade de aulas de cada professor
//   horario geral.pdf       -> a grade de cada turma, usada para descobrir a turma
//                              quando o PDF individual traz o nome truncado
//                              ("6082 - DESENVOLVIMENTO DE SIST…")
//
// O PDF nao traz eletiva, tutoria, Multiplica SP, ATPC nem Escola de Gestao do lado do
// professor. Esses compromissos sao preservados do mockData.ts atual: eletiva e tutoria
// estao confirmadas pelo PDF geral (sexta 5a/6a e 9a aula de segunda, terca e quinta),
// e as formacoes seguem nos horarios ja cadastrados.
//
// Uso:  node generatePdfData.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const RAIZ = path.dirname(fileURLToPath(import.meta.url));
const PDF_INDIVIDUAL = path.join(RAIZ, 'horario individual.pdf');
const PDF_GERAL = path.join(RAIZ, 'horario geral.pdf');
const MOCK = path.join(RAIZ, 'src', 'data', 'mockData.ts');

const DIAS = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
const HORARIOS = ['07:10', '08:00', '08:50', '10:00', '10:50', '11:40', '13:30', '14:20', '15:10'];

// ---------------------------------------------------------------- leitura do PDF

// O modo texto do pdftotext nao serve: as celulas sao altas e multi-linha, e as colunas
// nao se alinham com a coluna de horarios. Lemos cada pedaco de texto com sua posicao e
// reconstruimos a grade pela geometria.
const X_COLUNA_HORARIO = 48;
const COLUNA_INICIO = 48;
const COLUNA_LARGURA = 96;

async function lerPaginas(arquivo) {
  const doc = await getDocument({ data: new Uint8Array(fs.readFileSync(arquivo)) }).promise;
  const paginas = [];

  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const { items } = await page.getTextContent();
    const { height } = page.getViewport({ scale: 1 });

    paginas.push(
      items
        .filter((i) => i.str.trim())
        .map((i) => ({
          texto: i.str.trim(),
          x: i.transform[4],
          y: height - i.transform[5], // y do PDF cresce para cima
          largura: i.width,
        }))
    );
  }

  return paginas;
}

/** Devolve [{ nome, grade: { 'segunda_1': 'texto da celula' } }] para cada tabela do PDF. */
function montarGrades(paginas) {
  const blocos = [];

  for (const itens of paginas) {
    const cabecalhos = itens
      .filter((i) => i.texto === 'Seg' && i.x < 150)
      .sort((a, b) => a.y - b.y);

    cabecalhos.forEach((cab, idx) => {
      const limite = cabecalhos[idx + 1] ? cabecalhos[idx + 1].y - 20 : Infinity;

      // O titulo (professor ou turma) e o texto logo acima da linha Seg/Ter/Qua/Qui/Sex.
      const titulo = itens
        .filter((i) => i.y < cab.y && i.y > cab.y - 25 && i.texto.length > 4)
        .sort((a, b) => b.y - a.y)[0];
      if (!titulo) return;

      const linhas = itens
        .filter(
          (i) => i.x < X_COLUNA_HORARIO && i.y > cab.y && i.y < limite && /^\d{2}:\d{2}$/.test(i.texto)
        )
        .map((i) => ({ hora: i.texto, y: i.y }))
        .sort((a, b) => a.y - b.y);

      const grade = {};
      linhas.forEach((linha, li) => {
        const periodId = HORARIOS.indexOf(linha.hora) + 1;
        if (periodId === 0) return; // 12:30 e o almoco

        const yFim = linhas[li + 1] ? linhas[li + 1].y : linha.y + 15.5;

        itens
          .filter((i) => i.x + i.largura / 2 >= COLUNA_INICIO && i.y >= linha.y && i.y < yFim)
          .sort((a, b) => a.y - b.y || a.x - b.x)
          .forEach((i) => {
            const col = Math.floor((i.x + i.largura / 2 - COLUNA_INICIO) / COLUNA_LARGURA);
            if (col < 0 || col > 4) return;

            const chave = `${DIAS[col]}_${periodId}`;
            grade[chave] = grade[chave] ? `${grade[chave]}\n${i.texto}` : i.texto;
          });
      });

      blocos.push({ nome: titulo.texto, grade });
    });
  }

  return blocos;
}

// ------------------------------------------------------------------ disciplinas

const CLASS_NAME_PATTERNS = [
  /\s*\d+\s*[ºo°]\s*ANO\s+[AB]\b.*$/i,
  /\s*\d+\s*[ªa]\s*S[EÉ]RIE\s+[AB]?\b.*$/i,
  /\s*6082\s*-?\s*DESENVOLVIMENTO\s+DE\s+SIST.*$/i,
  /\s*-?\s*INTEGRAL\s+9\s*H.*$/i,
];

function normalizar(v) {
  return String(v || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

function limparDisciplina(bruto) {
  let s = String(bruto || '').replace(/\s+/g, ' ').trim();
  s = s.replace(/\(\d+\)/g, ' ');
  for (const p of CLASS_NAME_PATTERNS) s = s.replace(p, '');
  s = s.replace(/[\s–-]+$/, '').replace(/\s+/g, ' ').trim();

  return s || String(bruto || '').replace(/\s+/g, ' ').trim();
}

// Espelha src/utils/subjects.ts. O teste "todas as disciplinas usam a grafia canonica"
// em src/data/mockData.test.ts falha se os dois sairem de sincronia.
const SUBJECT_ALIASES = [
  { pattern: /^ORIENTACAO.*MATEM/, canonical: 'Orientação de Matemática' },
  { pattern: /^ORIENTACAO.*LINGUA/, canonical: 'Orientação de Língua Portuguesa' },
  { pattern: /^ORIENTACAO DE ESTUDO/, canonical: 'Orientação de Estudo' },
];

const CANONICAL_SUBJECTS = {
  ARTE: 'Arte',
  'EDUCACAO FISICA': 'Educação Física',
  'ESPORTE-MUSICA-ARTE': 'Esporte-Música-Arte',
  'LINGUA INGLESA': 'Língua Inglesa',
  'LINGUA PORTUGUESA': 'Língua Portuguesa',
  'REDACAO E LEITURA': 'Redação e Leitura',
  MATEMATICA: 'Matemática',
  BIOLOGIA: 'Biologia',
  CIENCIAS: 'Ciências',
  FISICA: 'Física',
  'PRATICAS EXPERIMENTAIS': 'Práticas Experimentais',
  QUIMICA: 'Química',
  'APROFUNDAMENTO DE FILOSOFIA': 'Aprofundamento de Filosofia',
  'APROFUNDAMENTO DE GEOGRAFIA': 'Aprofundamento de Geografia',
  'APROFUNDAMENTO DE SOCIOLOGIA': 'Aprofundamento de Sociologia',
  ATUALIDADES: 'Atualidades',
  FILOSOFIA: 'Filosofia',
  GEOGRAFIA: 'Geografia',
  HISTORIA: 'História',
  SOCIOLOGIA: 'Sociologia',
  'CARREIRA E COMPETENCIAS PARA …': 'Carreira e Competências para …',
  'EDUCACAO FINANCEIRA': 'Educação Financeira',
  EMPREENDEDORISMO: 'Empreendedorismo',
  'INTELIGENCIA ARTIFICIAL': 'Inteligência Artificial',
  'LOGICA E LINGUAGENS DE PROGR…': 'Lógica e Linguagens',
  'LOGICA E LINGUAGENS': 'Lógica e Linguagens',
  'MODELAGEM E DESENVOLVIMENT…': 'Modelagem',
  MODELAGEM: 'Modelagem',
  'PROCESSOS DE DESENVOLVIMENT…': 'Processos',
  PROCESSOS: 'Processos',
  PROGRAMACAO: 'Programação',
  'PROGRAMACAO BACK-END': 'Programação Back-End',
  'PROGRAMACAO FRONT-END': 'Programação Front-End',
  'PROGRAMACAO MOBILE': 'Programação Mobile',
  'PROJETO DE VIDA': 'Projeto de Vida',
  'PROJETO MULTIDISCIPLINAR': 'Projeto Multidisciplinar',
  'REDES DE COMPUTADORES E SEG…': 'Redes de Computadores',
  'REDES DE COMPUTADORES': 'Redes de Computadores',
  ROBOTICA: 'Robótica',
  'TECNOLOGIA E INOVACAO': 'Tecnologia e Inovação',
  'VERSIONAMENTO DE CODIGO E SISTEMAS …': 'Versionamento de Código',
  'VERSIONAMENTO DE CODIGO': 'Versionamento de Código',
  'DIRECAO ESCOLAR': 'Direção Escolar',
  'VICE-DIRECAO': 'Vice-Direção',
  'COORDENACAO PEDAGOGICA GERAL (CGP)': 'Coordenação Pedagógica Geral (CGP)',
};

const MINUSCULAS = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'para', 'com', 'a', 'o', 'as', 'os']);

function titleCase(s) {
  return s
    .toLocaleLowerCase('pt-BR')
    .split(' ')
    .map((p, i) =>
      i > 0 && MINUSCULAS.has(p)
        ? p
        : p.replace(/(^|[-–/])(\p{L})/gu, (_, sep, l) => sep + l.toLocaleUpperCase('pt-BR'))
    )
    .join(' ');
}

function disciplinaCanonica(bruto) {
  const limpo = limparDisciplina(bruto);
  if (!limpo) return '';

  const n = normalizar(limpo);
  const alias = SUBJECT_ALIASES.find((a) => a.pattern.test(n));

  return alias ? alias.canonical : CANONICAL_SUBJECTS[n] ?? titleCase(limpo);
}

// ----------------------------------------------------------------------- turmas

function extrairTurma(texto) {
  const t = normalizar(texto);

  for (const n of [6, 7, 8, 9]) {
    if (t.includes(`${n}º ANO A`) || t.includes(`${n}O ANO A`)) return `${n}A`;
    if (t.includes(`${n}º ANO B`) || t.includes(`${n}O ANO B`)) return `${n}B`;
  }
  if (/1[ªA] SERIE A/.test(t)) return '1EMA';
  if (/1[ªA] SERIE B/.test(t)) return '1EMB';
  if (/2[ªA] SERIE A/.test(t)) return '2EMA_DS';
  if (/2[ªA] SERIE B/.test(t)) return '2EMB';
  if (/3[ªA] SERIE A/.test(t)) return '3EMA_DS';
  if (/3[ªA] SERIE B/.test(t)) return '3EMB';

  // O PDF individual trunca o nome das turmas do curso tecnico, deixando as duas
  // indistinguiveis. Resolvemos pelo PDF geral, que traz o nome completo.
  if (t.includes('6082') || t.includes('DESENVOLVIMENTO DE SIST')) return 'AMBIGUA';

  return '';
}

/** Maior prefixo do nome do professor encontrado na celula (os nomes vem truncados). */
function tamanhoDoCasamento(celula, nomeProfessor) {
  const alvo = normalizar(celula);
  const nome = normalizar(nomeProfessor);

  for (let len = nome.length; len >= 5; len--) {
    if (alvo.includes(nome.slice(0, len))) return len;
  }

  return 0;
}

// ------------------------------------------------------------------------ main

const paginasIndividual = await lerPaginas(PDF_INDIVIDUAL);
const paginasGeral = await lerPaginas(PDF_GERAL);

const professores = montarGrades(paginasIndividual);
const turmas = montarGrades(paginasGeral).map((t) => ({ ...t, classId: extrairTurma(t.nome) }));

function resolverTurma(nomeProfessor, dia, periodId) {
  let melhor = { classId: '', tamanho: 0 };

  turmas.forEach((t) => {
    if (!t.classId || t.classId === 'AMBIGUA') return;

    const tamanho = tamanhoDoCasamento(t.grade[`${dia}_${periodId}`], nomeProfessor);
    if (tamanho > melhor.tamanho) melhor = { classId: t.classId, tamanho };
  });

  if (!melhor.classId) {
    console.warn(`Turma indefinida para ${nomeProfessor} em ${dia} periodo ${periodId}`);
  }

  return melhor.classId;
}

// Cadastro e compromissos vem do mockData atual; o PDF so traz as aulas.
const fonte = fs.readFileSync(MOCK, 'utf-8');

function lerArray(marcador) {
  const inicio = fonte.indexOf(marcador) + marcador.length;
  const resto = fonte.slice(inicio);
  return JSON.parse(fonte.slice(inicio, inicio + resto.indexOf('\n];') + 2));
}

const cadastro = lerArray('INITIAL_TEACHERS: Teacher[] = ');
const slotsAtuais = lerArray('OFFICIAL_SCHEDULE_SLOTS: ScheduleSlot[] = ');

const COMPROMISSOS = ['ELETIVA', 'ATIVIDADE', 'CURSO_FORMACAO'];
const marcadores = new Map(
  slotsAtuais.filter((s) => COMPROMISSOS.includes(s.type)).map((s) => [s.id, s])
);

const vazia = (v) => !v || v.replace(/\s/g, '') === '---';

const slots = [];
const disciplinasPorProfessor = {};
let aulas = 0;
let conflitos = 0;

cadastro.forEach((professor) => {
  const bloco = professores.find((p) => p.nome === professor.name);

  DIAS.forEach((dia) => {
    for (let periodId = 1; periodId <= 9; periodId++) {
      const id = `slot_${professor.id}_${dia}_${periodId}`;
      const celula = bloco?.grade[`${dia}_${periodId}`];

      if (!vazia(celula)) {
        const [linhaDisciplina, linhaTurma = ''] = celula.split('\n');
        const subject = disciplinaCanonica(linhaDisciplina);

        let classId = extrairTurma(linhaTurma);
        if (classId === 'AMBIGUA' || !classId) {
          classId = resolverTurma(professor.name, dia, periodId);
        }

        if (marcadores.has(id)) conflitos++;

        (disciplinasPorProfessor[professor.id] ??= []).push(subject);
        slots.push({ id, teacherId: professor.id, dayOfWeek: dia, periodId, type: 'AULA', classId, subject });
        aulas++;
        continue;
      }

      const marcador = marcadores.get(id);
      slots.push(marcador ? { ...marcador } : { id, teacherId: professor.id, dayOfWeek: dia, periodId, type: 'LIVRE' });
    }
  });
});

// Disciplina principal e secundarias saem da grade nova; o resto do cadastro fica igual.
const AREA_RULES = [
  { pattern: /DIRECAO|COORDENACAO PEDAGOGICA|GESTAO/, area: 'Gestão Escolar' },
  { pattern: /EDUCACAO FISICA|ESPORTE/, area: 'Linguagens' },
  { pattern: /MATEM/, area: 'Ciências da Natureza' },
  {
    pattern:
      /LINGUAGENS DE PROGR|LOGICA E LINGUAGENS|^PROCESSOS|PROGRAMA|DESENVOLVIMENT|MODELAGEM|REDES DE COMPUTADORES|INTELIGENCIA ARTIFICIAL|VERSIONAMENTO|ROBOTICA|TECNOLOGIA|CARREIRA E COMPETENCIAS|PROJETO DE VIDA|PROJETO MULTIDISCIPLINAR|EDUCACAO FINANCEIRA|EMPREENDEDORISMO|TUTORIA|ELETIVA|CLUBE/,
    area: 'Parte Diversificada',
  },
  { pattern: /LINGUA|PORTUGUES|INGLES|REDACAO|LEITURA|ARTE/, area: 'Linguagens' },
  { pattern: /PRATICAS EXPERIMENTAIS|CIENCIAS|BIOLOGIA|QUIMICA|FISICA/, area: 'Ciências da Natureza' },
  { pattern: /HISTORIA|GEOGRAFIA|FILOSOFIA|SOCIOLOGIA|ATUALIDADES/, area: 'Ciências Humanas' },
];

function area(disciplina) {
  const n = normalizar(disciplina);
  if (!n) return 'Parte Diversificada';

  return AREA_RULES.find((r) => r.pattern.test(n))?.area ?? 'Parte Diversificada';
}

const teachers = cadastro.map((t) => {
  const dadas = disciplinasPorProfessor[t.id];
  if (!dadas?.length) return t; // equipe gestora nao tem aulas na grade

  // A principal e a que ele mais da; as demais entram como secundarias.
  const contagem = {};
  dadas.forEach((d) => (contagem[d] = (contagem[d] ?? 0) + 1));
  const ordenadas = Object.entries(contagem).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const mainSubject = ordenadas[0][0];

  return {
    ...t,
    mainSubject,
    secondarySubjects: ordenadas.slice(1).map(([d]) => d),
    knowledgeArea: area(mainSubject),
  };
});

// Reescreve apenas os dois arrays, preservando o resto do arquivo.
function trocarArray(texto, marcador, valor) {
  const inicio = texto.indexOf(marcador) + marcador.length;
  const resto = texto.slice(inicio);
  const fim = inicio + resto.indexOf('\n];') + 2;

  return texto.slice(0, inicio) + JSON.stringify(valor, null, 2) + texto.slice(fim);
}

let saida = trocarArray(fonte, 'INITIAL_TEACHERS: Teacher[] = ', teachers);
saida = trocarArray(saida, 'OFFICIAL_SCHEDULE_SLOTS: ScheduleSlot[] = ', slots);
fs.writeFileSync(MOCK, saida, 'utf-8');

const tipos = {};
slots.forEach((s) => (tipos[s.type] = (tipos[s.type] ?? 0) + 1));

console.log(`professores: ${teachers.length} | slots: ${slots.length} | aulas: ${aulas}`);
console.log('tipos:', tipos);
console.log(`compromissos preservados: ${slots.filter((s) => COMPROMISSOS.includes(s.type)).length} de ${marcadores.size}`);
if (conflitos) console.warn(`ATENCAO: ${conflitos} compromissos foram substituidos por uma aula nova`);
