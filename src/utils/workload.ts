import type { HistoryRecord, ScheduleSlot, Teacher } from '../types';

/**
 * Teto de aulas que um professor pode dar na semana, somando a grade, as eletivas e
 * as substituicoes. Nenhuma substituicao pode fazer a carga passar deste valor.
 */
export const MAX_AULAS_SEMANAIS = 32;

/**
 * Aulas de eletiva que todo professor assume por semana. Elas nao ocupam um horario
 * fixo na grade (por isso nao aparecem como slots e nao interferem na disponibilidade
 * para substituicao), mas contam na carga individual de cada professor.
 */
export const ELETIVAS_POR_SEMANA = 2;

/**
 * Quantas aulas de eletiva o professor assume na semana. A equipe gestora nao assume
 * eletivas, assim como quem estiver marcado com isExemptFromElectives.
 */
export function electiveLessonsFor(teacher: Teacher): number {
  if (teacher.role === 'EQUIPE_GESTORA') return 0;
  if (teacher.isExemptFromElectives) return 0;

  return ELETIVAS_POR_SEMANA;
}

/** Aulas do professor que ocupam um horario na grade semanal. */
export function scheduledLessonsFor(teacher: Teacher, slots: ScheduleSlot[]): number {
  return slots.filter((s) => s.teacherId === teacher.id && s.type === 'AULA').length;
}

/** Carga semanal individual: aulas da grade mais as eletivas. */
export function weeklyLessonsFor(teacher: Teacher, slots: ScheduleSlot[]): number {
  return scheduledLessonsFor(teacher, slots) + electiveLessonsFor(teacher);
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
