import { describe, it, expect } from 'vitest';
import {
  MAX_AULAS_SEMANAIS,
  electiveLessonsFor,
  scheduledLessonsFor,
  schoolWeekKey,
  weeklyLessonsFor,
  weeklySubstitutionCounts,
} from './workload';
import { INITIAL_TEACHERS, OFFICIAL_SCHEDULE_SLOTS } from '../data/mockData';
import type { HistoryRecord, ScheduleSlot, Teacher } from '../types';

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

describe('schoolWeekKey', () => {
  it('agrupa os dias úteis da mesma semana na segunda-feira', () => {
    // 2026-08-31 é uma segunda; 2026-09-04, a sexta seguinte.
    ['2026-08-31', '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04'].forEach((d) =>
      expect(schoolWeekKey(d)).toBe('2026-08-31')
    );
  });

  it('separa semanas diferentes', () => {
    expect(schoolWeekKey('2026-09-07')).not.toBe(schoolWeekKey('2026-09-04'));
  });

  it('trata o domingo como fim da semana que começou na segunda anterior', () => {
    expect(schoolWeekKey('2026-09-06')).toBe('2026-08-31');
  });
});

describe('weeklySubstitutionCounts', () => {
  const registro = (date: string, teacherId: string, quantas: number): HistoryRecord => ({
    id: `h-${date}-${teacherId}`,
    date,
    dayOfWeek: 'segunda',
    absentTeachersNames: [],
    timestamp: '',
    substitutions: Array.from({ length: quantas }, (_, i) => ({
      id: `s${i}`,
      periodId: i + 1,
      periodLabel: '',
      periodTime: '',
      classId: '6A',
      className: '6A',
      originalTeacherId: 'x',
      originalTeacherName: 'x',
      originalSubject: 'x',
      substituteTeacherId: teacherId,
      substituteTeacherName: teacherId,
    })),
  });

  it('soma apenas as substituições da mesma semana', () => {
    const history = [registro('2026-09-01', 't1', 2), registro('2026-09-08', 't1', 5)];

    expect(weeklySubstitutionCounts(history, '2026-09-03')).toEqual({ t1: 2 });
  });

  it('ignora a própria data, que é recontada pelo plano atual', () => {
    const history = [registro('2026-09-01', 't1', 2), registro('2026-09-03', 't1', 4)];

    expect(weeklySubstitutionCounts(history, '2026-09-03')).toEqual({ t1: 2 });
  });

  it('devolve vazio quando não há histórico na semana', () => {
    expect(weeklySubstitutionCounts([], '2026-09-03')).toEqual({});
  });
});

describe('dados oficiais', () => {
  it('somente a Adriana está bloqueada, e apenas na 6ª aula', () => {
    const bloqueados = INITIAL_TEACHERS.filter((t) => t.blockedSubstitutionPeriods?.length).map(
      (t) => `${t.name}: ${t.blockedSubstitutionPeriods?.join(',')}`
    );

    expect(bloqueados).toEqual(['ADRIANA BEGOSSO PINHEIRO: 6']);
  });

  it('nenhum professor começa a semana acima do teto de 32 aulas', () => {
    const acima = INITIAL_TEACHERS.filter(
      (t) => weeklyLessonsFor(t, OFFICIAL_SCHEDULE_SLOTS) > MAX_AULAS_SEMANAIS
    ).map((t) => `${t.name}: ${weeklyLessonsFor(t, OFFICIAL_SCHEDULE_SLOTS)}`);

    expect(acima).toEqual([]);
  });

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
