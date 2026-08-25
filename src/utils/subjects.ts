import type { KnowledgeArea } from '../types';
import { normalizeText } from './text';

// As planilhas oficiais exportam o nome da turma junto com o da disciplina na mesma
// celula ("TECNOLOGIA E INOVACAO 8º ANO A INTEGRAL 9H ANUAL"). Quando o separador e
// quebra de linha o nome sai limpo, mas quando e espaco o nome da turma vem junto.
const CLASS_NAME_PATTERNS: RegExp[] = [
  /\s*\d+\s*[ºo°]\s*ANO\s+[AB]\b.*$/i,
  /\s*\d+\s*[ªa]\s*S[EÉ]RIE\s+[AB]\b.*$/i,
  /\s*6082\s*-?\s*DESENVOLVIMENTO\s+DE\s+SIST.*$/i,
  /\s*-?\s*INTEGRAL\s+9\s*H.*$/i,
];

/** Remove o nome da turma grudado no nome da disciplina e normaliza os espacos. */
export function cleanSubjectName(raw: string | undefined | null): string {
  if (!raw) return '';

  let subject = String(raw).replace(/\s+/g, ' ').trim();
  subject = subject.replace(/\(\d+\)/g, ' '); // marcadores de carga horaria, ex: "(2)"

  for (const pattern of CLASS_NAME_PATTERNS) {
    subject = subject.replace(pattern, '');
  }

  subject = subject.replace(/[\s–-]+$/, '').replace(/\s+/g, ' ').trim();

  // Se a limpeza consumiu o nome inteiro, e melhor devolver o original sujo do que vazio.
  return subject || String(raw).replace(/\s+/g, ' ').trim();
}

// As planilhas escrevem a mesma disciplina de formas diferentes em cada aba
// ("EDUCACAO FISICA", "Educação Fisica"). Este dicionario fixa uma grafia unica, com
// acentuacao correta, para o que aparece na grade, na impressao e no WhatsApp.
// A chave e o nome ja limpo e normalizado (sem acento, em caixa alta).
const CANONICAL_SUBJECTS: Record<string, string> = {
  // Linguagens
  'ARTE': 'Arte',
  'EDUCACAO FISICA': 'Educação Física',
  'ESPORTE-MUSICA-ARTE': 'Esporte-Música-Arte',
  'LINGUA INGLESA': 'Língua Inglesa',
  'LINGUA PORTUGUESA': 'Língua Portuguesa',
  'REDACAO E LEITURA': 'Redação e Leitura',
  'ORIENTACAO DE ESTUDO – LINGUA…': 'Orientação de Estudo – Língua…',
  // Ciencias da Natureza (Matematica entra aqui, conforme o modelo da escola)
  'MATEMATICA': 'Matemática',
  'ORIENTACAO DE ESTUDO – MATEM…': 'Orientação de Estudo – Matem…',
  'BIOLOGIA': 'Biologia',
  'CIENCIAS': 'Ciências',
  'FISICA': 'Física',
  'PRATICAS EXPERIMENTAIS': 'Práticas Experimentais',
  'QUIMICA': 'Química',
  // Ciencias Humanas
  'APROFUNDAMENTO DE FILOSOFIA': 'Aprofundamento de Filosofia',
  'APROFUNDAMENTO DE GEOGRAFIA': 'Aprofundamento de Geografia',
  'APROFUNDAMENTO DE SOCIOLOGIA': 'Aprofundamento de Sociologia',
  'ATUALIDADES': 'Atualidades',
  'FILOSOFIA': 'Filosofia',
  'GEOGRAFIA': 'Geografia',
  'HISTORIA': 'História',
  'SOCIOLOGIA': 'Sociologia',
  // Parte Diversificada e curso tecnico
  'CARREIRA E COMPETENCIAS PARA …': 'Carreira e Competências para …',
  'EDUCACAO FINANCEIRA': 'Educação Financeira',
  'EMPREENDEDORISMO': 'Empreendedorismo',
  'INTELIGENCIA ARTIFICIAL': 'Inteligência Artificial',
  'LOGICA E LINGUAGENS DE PROGR…': 'Lógica e Linguagens de Progr…',
  'MODELAGEM E DESENVOLVIMENT…': 'Modelagem e Desenvolviment…',
  'PROCESSOS DE DESENVOLVIMENT…': 'Processos de Desenvolviment…',
  'PROGRAMACAO': 'Programação',
  'PROGRAMACAO BACK-END': 'Programação Back-End',
  'PROGRAMACAO FRONT-END': 'Programação Front-End',
  'PROGRAMACAO MOBILE': 'Programação Mobile',
  'PROJETO DE VIDA': 'Projeto de Vida',
  'PROJETO MULTIDISCIPLINAR': 'Projeto Multidisciplinar',
  'REDES DE COMPUTADORES E SEG…': 'Redes de Computadores e Seg…',
  'ROBOTICA': 'Robótica',
  'TECNOLOGIA E INOVACAO': 'Tecnologia e Inovação',
  'VERSIONAMENTO DE CODIGO E SISTEMAS …': 'Versionamento de Código e Sistemas …',
  // Gestao escolar
  'DIRECAO ESCOLAR': 'Direção Escolar',
  'VICE-DIRECAO': 'Vice-Direção',
  'COORDENACAO PEDAGOGICA GERAL (CGP)': 'Coordenação Pedagógica Geral (CGP)',
};

// Preposicoes e conjuncoes ficam em minusculo no meio do nome.
const LOWERCASE_WORDS = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'para', 'com', 'a', 'o', 'as', 'os']);

/** Title Case em portugues, usado para disciplinas fora do dicionario (ex: importadas). */
function toTitleCase(subject: string): string {
  return subject
    .toLocaleLowerCase('pt-BR')
    .split(' ')
    .map((word, index) => {
      if (index > 0 && LOWERCASE_WORDS.has(word)) return word;
      // Preserva hifens internos: "esporte-musica-arte" -> "Esporte-Musica-Arte"
      return word.replace(/(^|[-–/])(\p{L})/gu, (_, sep, letter) => sep + letter.toLocaleUpperCase('pt-BR'));
    })
    .join(' ');
}

/**
 * Devolve a grafia unica da disciplina: limpa o nome da turma, aplica o dicionario
 * oficial e, para nomes desconhecidos, cai num Title Case em portugues.
 */
export function canonicalSubjectName(raw: string | undefined | null): string {
  const clean = cleanSubjectName(raw);
  if (!clean) return '';

  return CANONICAL_SUBJECTS[normalizeText(clean)] ?? toTitleCase(clean);
}

// Modelo de areas adotado pela escola:
//   Linguagens          -> Lingua Portuguesa, Lingua Inglesa, Artes e Educacao Fisica
//   Ciencias da Natureza-> Biologia, Fisica, Matematica e Quimica (Ciencias, no Fundamental)
//   Ciencias Humanas    -> Historia, Geografia, Filosofia e Sociologia
// O que nao pertence a essas tres areas fica em Parte Diversificada (itinerarios,
// curso tecnico, tutoria) ou Gestao Escolar.
//
// A ordem importa: regras mais especificas primeiro. "EDUCACAO FISICA" precisa ser
// testada antes de "FISICA", e "LOGICA E LINGUAGENS DE PROGRAMACAO" antes de "LINGUA".
const AREA_RULES: { pattern: RegExp; area: KnowledgeArea }[] = [
  { pattern: /DIRECAO|COORDENACAO PEDAGOGICA|GESTAO/, area: 'Gestão Escolar' },
  { pattern: /EDUCACAO FISICA|ESPORTE/, area: 'Linguagens' },
  { pattern: /MATEM/, area: 'Ciências da Natureza' },
  {
    pattern:
      /LINGUAGENS DE PROGR|PROGRAMA|DESENVOLVIMENT|MODELAGEM|REDES DE COMPUTADORES|INTELIGENCIA ARTIFICIAL|VERSIONAMENTO|ROBOTICA|TECNOLOGIA|CARREIRA E COMPETENCIAS|PROJETO DE VIDA|PROJETO MULTIDISCIPLINAR|EDUCACAO FINANCEIRA|EMPREENDEDORISMO|TUTORIA|ELETIVA|CLUBE/,
    area: 'Parte Diversificada',
  },
  { pattern: /LINGUA|PORTUGUES|INGLES|REDACAO|LEITURA|ARTE/, area: 'Linguagens' },
  { pattern: /PRATICAS EXPERIMENTAIS|CIENCIAS|BIOLOGIA|QUIMICA|FISICA/, area: 'Ciências da Natureza' },
  { pattern: /HISTORIA|GEOGRAFIA|FILOSOFIA|SOCIOLOGIA|ATUALIDADES/, area: 'Ciências Humanas' },
];

/** Classifica a disciplina na area de conhecimento correspondente. */
export function resolveKnowledgeArea(subject: string | undefined | null): KnowledgeArea {
  const normalized = normalizeText(cleanSubjectName(subject));
  if (!normalized) return 'Parte Diversificada';

  const rule = AREA_RULES.find((r) => r.pattern.test(normalized));
  return rule ? rule.area : 'Parte Diversificada';
}

const VALID_AREAS: KnowledgeArea[] = [
  'Linguagens',
  'Ciências da Natureza',
  'Ciências Humanas',
  'Parte Diversificada',
  'Gestão Escolar',
];

/**
 * Usa a area informada na planilha quando ela e valida; caso contrario deduz a partir
 * da disciplina, em vez de cair num valor padrao fixo.
 */
export function coerceKnowledgeArea(raw: string | undefined | null, subject: string): KnowledgeArea {
  const informed = VALID_AREAS.find((a) => normalizeText(a) === normalizeText(raw || ''));
  return informed ?? resolveKnowledgeArea(subject);
}
