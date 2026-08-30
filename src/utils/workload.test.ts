import { describe, it, expect } from 'vitest';
import { electiveLessonsFor, scheduledLessonsFor, weeklyLessonsFor } from './workload';
import { INITIAL_TEACHERS, OFFICIAL_SCHEDULE_SLOTS } from '../data/mockData';
import type { ScheduleSlot, Teacher } from '../types';

function teacher(overrides: Partial<Teacher> & Pick<Teacher, 'id' | 'name'>): Teacher {
  return {
    mainSubject: 'Matemática',
    knowledgeArea: 'Ciências da Natureza',
    totalSubstitutionsCount: 0,
    ...overrides,
  };
}

const slots: ScheduleSlot[] = [
  { id: 's1', teacherId: 't1', dayOfWeek: 'segunda', periodId: 1, type: 'AULA', classId: '6A' },
  { id: 's2', teacherId: 't1', dayOfWeek: 'segunda', periodId: 2, type: 'AULA', classId: '6A' },
  { id: 's3', teacherId: 't1', dayOfWeek: 'terca', periodId: 1, type: 'LIVRE' },
  { id: 's4', teacherId: 't1', dayOfWeek: 'quarta', periodId: 1, type: 'CURSO_FORMACAO' },
];

describe('electiveLessonsFor', () => {
  it('dá 2 aulas de eletiva ao professor', () => {
    expect(electiveLessonsFor(teacher({ id: 't1', name: 'Professor' }))).toBe(2);
  });

  it('dá 2 aulas de eletiva ao coordenador de área', () => {
    expect(electiveLessonsFor(teacher({ id: 't2', name: 'Coord', role: 'COORDENADOR_AREA' }))).toBe(2);
  });

  it('não dá eletiva a quem está marcado como isento', () => {
    expect(
      electiveLessonsFor(teacher({ id: 't3', name: 'Vanessa', isExemptFromElectives: true }))
    ).toBe(0);
  });

  it('não dá eletiva à equipe gestora', () => {
    expect(electiveLessonsFor(teacher({ id: 't4', name: 'Diretor', role: 'EQUIPE_GESTORA' }))).toBe(0);
  });
});

describe('weeklyLessonsFor', () => {
  it('soma as eletivas às aulas da grade', () => {
    const t = teacher({ id: 't1', name: 'Professor' });
    expect(scheduledLessonsFor(t, slots)).toBe(2);
    expect(weeklyLessonsFor(t, slots)).toBe(4);
  });

  it('conta apenas a grade para quem não assume eletiva', () => {
    const t = teacher({ id: 't1', name: 'Vanessa', isExemptFromElectives: true });
    expect(weeklyLessonsFor(t, slots)).toBe(2);
  });
});

describe('dados oficiais', () => {
  it('somente a Vanessa está isenta das eletivas', () => {
    const isentos = INITIAL_TEACHERS.filter((t) => t.isExemptFromElectives).map((t) => t.name);
    expect(isentos).toEqual(['VANESSA GONÇALVES LIMA DE SANTANA']);
  });

  it('todo professor com aulas na grade recebe +2, menos a Vanessa', () => {
    const comAulas = INITIAL_TEACHERS.filter(
      (t) => t.role !== 'EQUIPE_GESTORA' && scheduledLessonsFor(t, OFFICIAL_SCHEDULE_SLOTS) > 0
    );

    comAulas.forEach((t) => {
      const esperado = t.isExemptFromElectives ? 0 : 2;
      expect(
        weeklyLessonsFor(t, OFFICIAL_SCHEDULE_SLOTS) - scheduledLessonsFor(t, OFFICIAL_SCHEDULE_SLOTS)
      ).toBe(esperado);
    });

    expect(comAulas.length).toBeGreaterThan(0);
  });
});
