import type { DailySubstitutionPlan, HistoryRecord, SubstitutionItem, Teacher } from '../types';

/** Quantas substituições cada professor recebeu num conjunto de itens da escala. */
export function substitutionCountsOf(substitutions: SubstitutionItem[]): Record<string, number> {
  const counts: Record<string, number> = {};

  substitutions.forEach((item) => {
    if (!item.substituteTeacherId) return;
    counts[item.substituteTeacherId] = (counts[item.substituteTeacherId] ?? 0) + 1;
  });

  return counts;
}

/**
 * Ajuste a aplicar nos contadores ao oficializar um plano.
 *
 * A escala de um mesmo dia pode ser oficializada mais de uma vez — basta corrigir uma
 * substituição e oficializar de novo. Por isso descontamos o que as escalas anteriores
 * daquela data já haviam creditado, em vez de somar por cima: sem isso, refazer a escala
 * de um dia conta as substituições duas vezes e distorce a equidade para sempre.
 *
 * Recebe todos os registros anteriores da data (e não apenas um) para tambem corrigir
 * dados que ja tenham sido duplicados antes desta correção existir.
 */
export function officializationDelta(
  plan: DailySubstitutionPlan,
  previousRecords: HistoryRecord[] = []
): Record<string, number> {
  const novo = substitutionCountsOf(plan.substitutions);

  const anterior: Record<string, number> = {};
  previousRecords.forEach((record) => {
    Object.entries(substitutionCountsOf(record.substitutions)).forEach(([id, n]) => {
      anterior[id] = (anterior[id] ?? 0) + n;
    });
  });

  const delta: Record<string, number> = {};
  new Set([...Object.keys(novo), ...Object.keys(anterior)]).forEach((id) => {
    const diferenca = (novo[id] ?? 0) - (anterior[id] ?? 0);
    if (diferenca !== 0) delta[id] = diferenca;
  });

  return delta;
}

/** Aplica o ajuste no cadastro, sem deixar nenhum contador ficar negativo. */
export function applyCounterDelta(
  teachers: Teacher[],
  delta: Record<string, number>
): Teacher[] {
  return teachers.map((teacher) => {
    const diferenca = delta[teacher.id];
    if (!diferenca) return teacher;

    return {
      ...teacher,
      totalSubstitutionsCount: Math.max(0, teacher.totalSubstitutionsCount + diferenca),
    };
  });
}
