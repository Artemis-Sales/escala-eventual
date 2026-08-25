import { describe, it, expect } from 'vitest';
import { getEligibleCandidates, generateDailyPlan } from './substitutionEngine';
import type { Teacher, ScheduleSlot, ClassGroup, PeriodDefinition } from '../types';

const periods: PeriodDefinition[] = [
  { id: 1, label: '1ª Aula', time: '07:10 - 08:00' },
  { id: 2, label: '2ª Aula', time: '08:00 - 08:50' },
];

const classes: ClassGroup[] = [
  { id: '6A', name: '6º Ano A', segment: 'Ensino Fundamental II' },
  { id: '6B', name: '6º Ano B', segment: 'Ensino Fundamental II' },
];

function teacher(overrides: Partial<Teacher> & Pick<Teacher, 'id' | 'name'>): Teacher {
  return {
    mainSubject: 'Matemática',
    knowledgeArea: 'Ciências da Natureza',
    totalSubstitutionsCount: 0,
    ...overrides,
  };
}

describe('getEligibleCandidates', () => {
  const absentTeacher = teacher({ id: 't_absent', name: 'Ausente' });

  it('exclui professores isentos, mesmo sem correspondência de nome', () => {
    const exempt = teacher({ id: 't_exempt', name: 'Qualquer Nome', isExemptFromSubstitutions: true });
    const result = getEligibleCandidates(1, 'segunda', absentTeacher, [], [exempt], [], {}, new Set());
    expect(result.find((c) => c.teacher.id === 't_exempt')).toBeUndefined();
  });

  it('exclui professor ausente no dia', () => {
    const t1 = teacher({ id: 't1', name: 'Prof 1' });
    const result = getEligibleCandidates(1, 'segunda', absentTeacher, ['t1'], [t1], [], {}, new Set());
    expect(result).toHaveLength(0);
  });

  it('exclui professor já em aula regular no mesmo horário', () => {
    const t1 = teacher({ id: 't1', name: 'Prof 1' });
    const slots: ScheduleSlot[] = [
      { id: 's1', teacherId: 't1', dayOfWeek: 'segunda', periodId: 1, type: 'AULA', classId: '6B' },
    ];
    const result = getEligibleCandidates(1, 'segunda', absentTeacher, [], [t1], slots, {}, new Set());
    expect(result).toHaveLength(0);
  });

  it('exclui professor em curso de formação no mesmo horário', () => {
    const t1 = teacher({ id: 't1', name: 'Prof 1' });
    const slots: ScheduleSlot[] = [
      { id: 's1', teacherId: 't1', dayOfWeek: 'segunda', periodId: 1, type: 'CURSO_FORMACAO', trainingName: 'ATPC' },
    ];
    const result = getEligibleCandidates(1, 'segunda', absentTeacher, [], [t1], slots, {}, new Set());
    expect(result).toHaveLength(0);
  });

  it('exclui professor já alocado em outra turma no mesmo período', () => {
    const t1 = teacher({ id: 't1', name: 'Prof 1' });
    const result = getEligibleCandidates(1, 'segunda', absentTeacher, [], [t1], [], {}, new Set(['t1']));
    expect(result).toHaveLength(0);
  });

  it('classifica por role (não por nome): coordenador e gestão entram como tier 2 e 3', () => {
    const coord = teacher({ id: 't_coord', name: 'Fulano', role: 'COORDENADOR_AREA' });
    const gestao = teacher({ id: 't_gestao', name: 'Ciclano', role: 'EQUIPE_GESTORA' });
    const regular = teacher({ id: 't_reg', name: 'Beltrano' });

    const result = getEligibleCandidates(1, 'segunda', absentTeacher, [], [coord, gestao, regular], [], {}, new Set());

    const byId = Object.fromEntries(result.map((c) => [c.teacher.id, c]));
    expect(byId['t_coord'].tier).toBe(2);
    expect(byId['t_coord'].matchType).toBe('COORDENADOR_AREA');
    expect(byId['t_gestao'].tier).toBe(3);
    expect(byId['t_gestao'].matchType).toBe('EQUIPE_GESTORA');
    expect(byId['t_reg'].tier).toBe(1);
  });

  it('nunca escolhe coordenador/gestão à frente de um professor regular disponível', () => {
    const coord = teacher({ id: 't_coord', name: 'Coord', role: 'COORDENADOR_AREA' });
    const gestao = teacher({ id: 't_gestao', name: 'Gestao', role: 'EQUIPE_GESTORA' });
    const regular = teacher({ id: 't_reg', name: 'Regular', totalSubstitutionsCount: 999 });

    const result = getEligibleCandidates(1, 'segunda', absentTeacher, [], [coord, gestao, regular], [], {}, new Set());

    expect(result[0].teacher.id).toBe('t_reg');
  });

  it('prioriza mesma matéria, depois mesma área, depois disponível', () => {
    const sameSubject = teacher({ id: 't_same_subj', name: 'A', mainSubject: 'Matemática', knowledgeArea: 'Ciências da Natureza' });
    const sameArea = teacher({ id: 't_same_area', name: 'B', mainSubject: 'Física', knowledgeArea: 'Ciências da Natureza' });
    const other = teacher({ id: 't_other', name: 'C', mainSubject: 'História', knowledgeArea: 'Ciências Humanas' });

    const result = getEligibleCandidates(1, 'segunda', absentTeacher, [], [other, sameArea, sameSubject], [], {}, new Set());

    expect(result.map((c) => c.matchType)).toEqual(['MESMA_MATERIA', 'MESMA_AREA', 'DISPONIVEL']);
  });

  it('entre professores empatados em tier/afinidade, prioriza quem fez menos substituições (equidade)', () => {
    const busy = teacher({ id: 't_busy', name: 'Busy', totalSubstitutionsCount: 10 });
    const free = teacher({ id: 't_free', name: 'Free', totalSubstitutionsCount: 0 });

    const result = getEligibleCandidates(1, 'segunda', absentTeacher, [], [busy, free], [], {}, new Set());

    expect(result[0].teacher.id).toBe('t_free');
  });
});

describe('generateDailyPlan', () => {
  it('cobre a aula com o candidato mais elegível e não deixa a turma descoberta', () => {
    const absent = teacher({ id: 't_absent', name: 'Ausente', mainSubject: 'Matemática' });
    const sub = teacher({ id: 't_sub', name: 'Substituto', mainSubject: 'Matemática' });

    const slots: ScheduleSlot[] = [
      { id: 's1', teacherId: 't_absent', dayOfWeek: 'segunda', periodId: 1, type: 'AULA', classId: '6A', subject: 'Matemática' },
    ];

    const plan = generateDailyPlan('2026-08-24', 'segunda', ['t_absent'], [absent, sub], slots, classes, periods);

    expect(plan.uncoveredCount).toBe(0);
    expect(plan.substitutions).toHaveLength(1);
    expect(plan.substitutions[0].substituteTeacherId).toBe('t_sub');
  });

  it('marca como sem cobertura quando ninguém está disponível', () => {
    const absent = teacher({ id: 't_absent', name: 'Ausente' });
    const slots: ScheduleSlot[] = [
      { id: 's1', teacherId: 't_absent', dayOfWeek: 'segunda', periodId: 1, type: 'AULA', classId: '6A' },
    ];

    const plan = generateDailyPlan('2026-08-24', 'segunda', ['t_absent'], [absent], slots, classes, periods);

    expect(plan.uncoveredCount).toBe(1);
    expect(plan.substitutions[0].substituteTeacherId).toBeNull();
    expect(plan.substitutions[0].matchType).toBe('SEM_SUBSTITUTO');
  });

  it('não escala o mesmo substituto duas vezes no mesmo período em turmas diferentes', () => {
    const absent1 = teacher({ id: 't_absent1', name: 'Ausente 1', mainSubject: 'Matemática' });
    const absent2 = teacher({ id: 't_absent2', name: 'Ausente 2', mainSubject: 'Matemática' });
    const onlyCandidate = teacher({ id: 't_sub', name: 'Único Livre', mainSubject: 'Matemática' });

    const slots: ScheduleSlot[] = [
      { id: 's1', teacherId: 't_absent1', dayOfWeek: 'segunda', periodId: 1, type: 'AULA', classId: '6A', subject: 'Matemática' },
      { id: 's2', teacherId: 't_absent2', dayOfWeek: 'segunda', periodId: 1, type: 'AULA', classId: '6B', subject: 'Matemática' },
    ];

    const plan = generateDailyPlan(
      '2026-08-24',
      'segunda',
      ['t_absent1', 't_absent2'],
      [absent1, absent2, onlyCandidate],
      slots,
      classes,
      periods
    );

    const covered = plan.substitutions.filter((s) => s.substituteTeacherId === 't_sub');
    expect(covered).toHaveLength(1);
    expect(plan.uncoveredCount).toBe(1);
  });
});
