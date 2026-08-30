import type { ScheduleSlot, Teacher } from '../types';

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
