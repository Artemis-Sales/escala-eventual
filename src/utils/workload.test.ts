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
  { id: 's5', teacherId: 't1', dayOfWeek: 'sexta', periodId: 5, type: 'ELETIVA' },
  { id: 's6', teacherId: 't1', dayOfWeek: 'sexta', periodId: 9, type: 'ATIVIDADE' },
  { id: 's7', teacherId: 't2', dayOfWeek: 'segunda', periodId: 1, type: 'AULA', classId: '6B' },
];

// As eletivas vem marcadas na planilha oficial, nao de uma regra fixa por professor.
describe('electiveLessonsFor', () => {
  it('conta as eletivas marcadas na grade', () => {
    expect(electiveLessonsFor(teacher({ id: 't1', name: 'Professor' }), slots)).toBe(1);
  });

  it('não conta eletiva para quem não tem nenhuma marcada', () => {
    expect(electiveLessonsFor(teacher({ id: 't2', name: 'Outro' }), slots)).toBe(0);
  });
});

describe('weeklyLessonsFor', () => {
  it('soma as eletivas às aulas regulares', () => {
    const t = teacher({ id: 't1', name: 'Professor' });
    expect(scheduledLessonsFor(t, slots)).toBe(2);
    expect(weeklyLessonsFor(t, slots)).toBe(3);
  });

  it('não conta tutoria nem formação como aula dada', () => {
    // O professor tem 1 CURSO_FORMACAO e 1 ATIVIDADE, que ocupam mas não são aulas dele.
    const t = teacher({ id: 't1', name: 'Professor' });
    expect(weeklyLessonsFor(t, slots)).toBe(3);
  });

  it('conta apenas as aulas regulares de quem não tem eletiva', () => {
    expect(weeklyLessonsFor(teacher({ id: 't2', name: 'Outro' }), slots)).toBe(1);
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

  // Na planilha atualizada a eletiva e uma marcacao da propria grade. Sao 20 celulas:
  // todo professor tem a sua, menos Vanessa, Danilo e Pedro.
  it('as eletivas vêm da grade e cobrem todos menos Vanessa, Danilo e Pedro', () => {
    const semEletiva = INITIAL_TEACHERS.filter(
      (t) =>
        t.role !== 'EQUIPE_GESTORA' &&
        scheduledLessonsFor(t, OFFICIAL_SCHEDULE_SLOTS) > 0 &&
        electiveLessonsFor(t, OFFICIAL_SCHEDULE_SLOTS) === 0
    ).map((t) => t.name);

    expect(semEletiva.sort()).toEqual([
      'DANILO',
      'PEDRO MARQUES FERREIRA',
      'VANESSA GONÇALVES LIMA DE SANTANA',
    ]);
  });

  // A eletiva ocupa duas aulas seguidas — na planilha ela vem numa célula mesclada.
  it('toda eletiva ocupa exatamente duas aulas', () => {
    const porProfessorEDia = new Map<string, number[]>();

    OFFICIAL_SCHEDULE_SLOTS.filter((s) => s.type === 'ELETIVA').forEach((s) => {
      const chave = `${s.teacherId}_${s.dayOfWeek}`;
      if (!porProfessorEDia.has(chave)) porProfessorEDia.set(chave, []);
      porProfessorEDia.get(chave)!.push(s.periodId);
    });

    const blocosErrados = [...porProfessorEDia.entries()]
      .filter(([, periodos]) => periodos.length !== 2)
      .map(([chave, periodos]) => `${chave}: ${periodos.length} aula(s)`);

    expect(blocosErrados).toEqual([]);
    expect(porProfessorEDia.size).toBe(20);
  });

  it('as duas aulas da eletiva são seguidas', () => {
    const porProfessorEDia = new Map<string, number[]>();

    OFFICIAL_SCHEDULE_SLOTS.filter((s) => s.type === 'ELETIVA').forEach((s) => {
      const chave = `${s.teacherId}_${s.dayOfWeek}`;
      if (!porProfessorEDia.has(chave)) porProfessorEDia.set(chave, []);
      porProfessorEDia.get(chave)!.push(s.periodId);
    });

    const naoSeguidas = [...porProfessorEDia.entries()]
      .filter(([, p]) => Math.abs(p[0] - p[1]) !== 1)
      .map(([chave]) => chave);

    expect(naoSeguidas).toEqual([]);
  });

  it('todo professor com eletiva recebe 2 aulas na carga semanal', () => {
    INITIAL_TEACHERS.forEach((t) => {
      const eletivas = electiveLessonsFor(t, OFFICIAL_SCHEDULE_SLOTS);
      expect(eletivas === 0 || eletivas === 2, `${t.name}: ${eletivas}`).toBe(true);
    });
  });

  it('a equipe gestora não tem aulas nem eletivas na grade', () => {
    const gestao = INITIAL_TEACHERS.filter((t) => t.role === 'EQUIPE_GESTORA');

    gestao.forEach((t) => expect(weeklyLessonsFor(t, OFFICIAL_SCHEDULE_SLOTS)).toBe(0));
    expect(gestao.length).toBe(3);
  });
});
