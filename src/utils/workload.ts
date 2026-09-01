import type { HistoryRecord, ScheduleSlot, Teacher } from '../types';

/**
 * Teto de aulas que um professor pode dar na semana, somando a grade, as eletivas e
 * as substituicoes. Nenhuma substituicao pode fazer a carga passar deste valor.
 */
export const MAX_AULAS_SEMANAIS = 32;

/** Aulas de eletiva marcadas na grade do professor. */
export function electiveLessonsFor(teacher: Teacher, slots: ScheduleSlot[]): number {
  return slots.filter((s) => s.teacherId === teacher.id && s.type === 'ELETIVA').length;
}

/** Aulas regulares do professor, as que tem turma. */
export function scheduledLessonsFor(teacher: Teacher, slots: ScheduleSlot[]): number {
  return slots.filter((s) => s.teacherId === teacher.id && s.type === 'AULA').length;
}

/**
 * Carga semanal individual: aulas regulares mais as eletivas, ambas vindas da planilha
 * oficial. Tutoria, ATPC e demais formacoes ocupam o professor, mas nao sao aulas que
 * ele da, entao nao entram nesta conta nem no teto semanal.
 */
export function weeklyLessonsFor(teacher: Teacher, slots: ScheduleSlot[]): number {
  return scheduledLessonsFor(teacher, slots) + electiveLessonsFor(teacher, slots);
}

/** Segunda-feira da semana da data informada, usada para agrupar a carga semanal. */
export function schoolWeekKey(date: string): string {
  const d = new Date(date + 'T00:00:00');
  const weekday = d.getDay(); // 0 = domingo
  d.setDate(d.getDate() + (weekday === 0 ? -6 : 1 - weekday));

  return d.toISOString().split('T')[0];
}

/**
 * Substituicoes ja oficializadas na mesma semana da data informada, por professor.
 * A propria data fica de fora: o plano do dia esta sendo refeito e suas alocacoes
 * entram pela contagem do plano atual, evitando contar duas vezes.
 */
export function weeklySubstitutionCounts(
  history: HistoryRecord[],
  date: string
): Record<string, number> {
  const week = schoolWeekKey(date);
  const counts: Record<string, number> = {};

  history.forEach((record) => {
    if (record.date === date || schoolWeekKey(record.date) !== week) return;

    record.substitutions.forEach((sub) => {
      if (!sub.substituteTeacherId) return;
      counts[sub.substituteTeacherId] = (counts[sub.substituteTeacherId] ?? 0) + 1;
    });
  });

  return counts;
}

/** Aulas da grade mais eletivas de cada professor, indexado por id. */
export function weeklyLessonsByTeacher(
  teachers: Teacher[],
  slots: ScheduleSlot[]
): Record<string, number> {
  const totals: Record<string, number> = {};
  teachers.forEach((t) => {
    totals[t.id] = weeklyLessonsFor(t, slots);
  });

  return totals;
}
