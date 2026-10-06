import type { KnowledgeArea, SubstitutionItem } from '../types';

// Partículas que ficam em minúsculas no meio de um nome próprio.
const PARTICULAS = new Set(['da', 'das', 'de', 'do', 'dos', 'e']);

/**
 * Os nomes vêm da planilha em caixa alta ("LEONELIA DA CONCEICAO DE PONTES FARIA").
 * Na tela eles são lidos, não conferidos contra o PDF: caixa normal é mais rápida de ler
 * e diferencia os dois VINICIUS pelo sobrenome sem esforço.
 */
export function displayName(raw: string | null | undefined): string {
  if (!raw) return '';
  return raw
    .toLocaleLowerCase('pt-BR')
    .split(/\s+/)
    .filter(Boolean)
    .map((parte, i) =>
      i > 0 && PARTICULAS.has(parte)
        ? parte
        : parte.charAt(0).toLocaleUpperCase('pt-BR') + parte.slice(1)
    )
    .join(' ');
}

/**
 * Todas as turmas são integrais de 9h, então o sufixo não diferencia nada.
 * "6º ANO A INTEGRAL 9H" → "6º A"; "2ª SÉRIE A (DS) INTEGRAL 9H" → "2ª A · DS".
 */
export function shortClassName(raw: string | null | undefined): string {
  if (!raw) return '';
  const semSufixo = raw.replace(/\s*INTEGRAL\s*9H\s*$/i, '').trim();
  const m = semSufixo.match(/^(\d+[ºª])\s*(?:ANO|SÉRIE|SERIE)\s+([A-Z])\s*(?:\((\w+)\))?$/i);
  if (!m) return semSufixo;
  const [, serie, letra, curso] = m;
  return curso ? `${serie} ${letra} · ${curso.toUpperCase()}` : `${serie} ${letra}`;
}

/** Nível de ensino da turma, curto, para a segunda linha. */
export function classLevel(raw: string | null | undefined): string {
  if (!raw) return '';
  return /S[ÉE]RIE/i.test(raw) ? 'Ensino Médio' : 'Fundamental II';
}

const AREA_KEYS: Record<KnowledgeArea, string> = {
  Linguagens: 'linguagens',
  'Ciências da Natureza': 'natureza',
  'Ciências Humanas': 'humanas',
  'Parte Diversificada': 'diversificada',
  'Gestão Escolar': 'gestao',
};

/** Chave do token de cor da área: `var(--area-${areaKey(area)})`. */
export function areaKey(area: KnowledgeArea | string | undefined): string {
  return AREA_KEYS[area as KnowledgeArea] ?? 'gestao';
}

export type CoverageState = 'coberta' | 'ultimo-recurso' | 'descoberta';

/** Coberta por professor, coberta por PCA/Gestão (último recurso) ou sem cobertura. */
export function coverageOf(item: SubstitutionItem): CoverageState {
  if (!item.substituteTeacherId) return 'descoberta';
  return item.tier === 2 || item.tier === 3 ? 'ultimo-recurso' : 'coberta';
}

/** O motivo da escolha, na linguagem da escola. */
export function reasonOf(item: SubstitutionItem): string {
  if (!item.substituteTeacherId) return 'Sem professor livre';
  if (item.tier === 3) return 'Equipe gestora';
  if (item.tier === 2) return 'Coordenação de área';
  switch (item.matchType) {
    case 'MESMA_MATERIA':
      return 'Mesma disciplina';
    case 'MESMA_AREA':
      return 'Mesma área';
    case 'MANUAL':
      return 'Escolha manual';
    default:
      return 'Horário livre';
  }
}

/** "terça-feira, 6 de outubro" a partir de "2026-10-06". */
export function longDate(isoDate: string): string {
  const d = new Date(isoDate + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
}

/** Primeira hora do intervalo "07:10 - 08:00". */
export function startTime(range: string): string {
  return range.split('-')[0]?.trim() ?? range;
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
