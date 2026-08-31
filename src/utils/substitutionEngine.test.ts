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

  it('nunca escolhe coordenador/gestão à frente de um professor que ainda não substituiu hoje', () => {
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

  // Regra: a 2a substituicao no mesmo dia so acontece quando todos os outros
  // disponiveis ja entraram em sala.
  it('só repete um professor depois que todos os outros disponíveis já substituíram', () => {
    const jaSubstituiu = teacher({ id: 't_repete', name: 'Repete', mainSubject: 'Matemática' });
    const livre = teacher({ id: 't_livre', name: 'Livre', mainSubject: 'História', totalSubstitutionsCount: 50 });

    const result = getEligibleCandidates(
      1, 'segunda', absentTeacher, [], [jaSubstituiu, livre], [], { t_repete: 1 }, new Set()
    );

    // Mesmo com mesma matéria e histórico melhor, quem já entrou em sala hoje fica atrás.
    expect(result[0].teacher.id).toBe('t_livre');
    expect(result[1].teacher.id).toBe('t_repete');
  });

  it('aciona coordenador e gestão antes de dar a segunda aula a um professor', () => {
    const professor = teacher({ id: 't_prof', name: 'Professor' });
    const coord = teacher({ id: 't_coord', name: 'Coord', role: 'COORDENADOR_AREA' });
    const gestao = teacher({ id: 't_gestao', name: 'Gestao', role: 'EQUIPE_GESTORA' });

    const result = getEligibleCandidates(
      1, 'segunda', absentTeacher, [], [professor, coord, gestao], [], { t_prof: 1 }, new Set()
    );

    expect(result.map((c) => c.teacher.id)).toEqual(['t_coord', 't_gestao', 't_prof']);
  });

  it('entre quem já substituiu hoje, prefere quem substituiu menos vezes', () => {
    const uma = teacher({ id: 't_uma', name: 'Uma', totalSubstitutionsCount: 99 });
    const duas = teacher({ id: 't_duas', name: 'Duas' });

    const result = getEligibleCandidates(
      1, 'segunda', absentTeacher, [], [duas, uma], [], { t_uma: 1, t_duas: 2 }, new Set()
    );

    expect(result[0].teacher.id).toBe('t_uma');
  });

  it('mantém o tier entre candidatos que ainda não substituíram hoje', () => {
    const coord = teacher({ id: 't_coord', name: 'Coord', role: 'COORDENADOR_AREA' });
    const professor = teacher({ id: 't_prof', name: 'Professor', totalSubstitutionsCount: 30 });

    const result = getEligibleCandidates(
      1, 'segunda', absentTeacher, [], [coord, professor], [], {}, new Set()
    );

    expect(result[0].teacher.id).toBe('t_prof');
  });

  // Regra: a Adriana nunca entra na 6a aula.
  it('não escala um professor num horário bloqueado para ele', () => {
    const bloqueado = teacher({ id: 't_bloq', name: 'Adriana', blockedSubstitutionPeriods: [6] });
    const livre = teacher({ id: 't_livre', name: 'Outro', totalSubstitutionsCount: 99 });
    const todos = [bloqueado, livre];

    const na6a = getEligibleCandidates(6, 'segunda', absentTeacher, [], todos, [], {}, new Set());
    expect(na6a.map((c) => c.teacher.id)).toEqual(['t_livre']);

    // Nos demais horários continua disponível, e na frente por ter feito menos.
    const na5a = getEligibleCandidates(5, 'segunda', absentTeacher, [], todos, [], {}, new Set());
    expect(na5a[0].teacher.id).toBe('t_bloq');
  });

  // Regra: a carga semanal (grade + eletivas + substituicoes) nao passa de 32 aulas.
  it('não escala quem já atingiu o teto de aulas semanais', () => {
    const noLimite = teacher({ id: 't_cheio', name: 'Cheio' });
    const comFolga = teacher({ id: 't_folga', name: 'Folga', totalSubstitutionsCount: 99 });

    const result = getEligibleCandidates(
      1, 'segunda', absentTeacher, [], [noLimite, comFolga], [], {}, new Set(),
      { lessonsByTeacher: { t_cheio: 32, t_folga: 20 }, substitutionsByTeacher: {} }
    );

    expect(result.map((c) => c.teacher.id)).toEqual(['t_folga']);
  });

  it('conta as substituições já feitas na semana no teto', () => {
    const quase = teacher({ id: 't_quase', name: 'Quase' });

    const cabeMaisUma = getEligibleCandidates(
      1, 'segunda', absentTeacher, [], [quase], [], {}, new Set(),
      { lessonsByTeacher: { t_quase: 28 }, substitutionsByTeacher: { t_quase: 3 } }
    );
    expect(cabeMaisUma).toHaveLength(1); // 28 + 3 = 31, a 32a aula ainda cabe

    const estourou = getEligibleCandidates(
      1, 'segunda', absentTeacher, [], [quase], [], {}, new Set(),
      { lessonsByTeacher: { t_quase: 28 }, substitutionsByTeacher: { t_quase: 4 } }
    );
    expect(estourou).toHaveLength(0); // 28 + 4 = 32, no teto
  });

  it('conta também as substituições já alocadas no plano do dia', () => {
    const t = teacher({ id: 't_dia', name: 'Dia' });

    const result = getEligibleCandidates(
      1, 'segunda', absentTeacher, [], [t], [], { t_dia: 2 }, new Set(),
      { lessonsByTeacher: { t_dia: 30 }, substitutionsByTeacher: {} }
    );

    expect(result).toHaveLength(0); // 30 + 2 já alocadas = 32
  });

  it('sem contexto semanal, não aplica o teto', () => {
    const t = teacher({ id: 't_sem', name: 'Sem contexto' });
    const result = getEligibleCandidates(1, 'segunda', absentTeacher, [], [t], [], {}, new Set());

    expect(result).toHaveLength(1);
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
