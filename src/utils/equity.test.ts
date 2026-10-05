import { describe, it, expect } from 'vitest';
import { applyCounterDelta, officializationDelta, substitutionCountsOf } from './equity';
import type { DailySubstitutionPlan, HistoryRecord, SubstitutionItem, Teacher } from '../types';

function item(substituteTeacherId: string | null, i = 0): SubstitutionItem {
  return {
    id: `s${i}-${substituteTeacherId}`,
    periodId: i + 1,
    periodLabel: '',
    periodTime: '',
    classId: '6A',
    className: '6A',
    originalTeacherId: 't_ausente',
    originalTeacherName: 'Ausente',
    originalSubject: 'Matemática',
    substituteTeacherId,
    substituteTeacherName: substituteTeacherId,
  };
}

function plano(ids: (string | null)[], date = '2026-10-05'): DailySubstitutionPlan {
  return {
    id: 'p1',
    date,
    dayOfWeek: 'segunda',
    absentTeacherIds: ['t_ausente'],
    substitutions: ids.map((id, i) => item(id, i)),
    uncoveredCount: ids.filter((i) => !i).length,
    createdAt: '',
  };
}

function registro(ids: (string | null)[], date = '2026-10-05'): HistoryRecord {
  return {
    id: `hist-${date}`,
    date,
    dayOfWeek: 'segunda',
    absentTeachersNames: [],
    substitutions: ids.map((id, i) => item(id, i)),
    timestamp: '',
  };
}

function professor(id: string, total: number): Teacher {
  return {
    id,
    name: id,
    mainSubject: 'Matemática',
    knowledgeArea: 'Ciências da Natureza',
    totalSubstitutionsCount: total,
  };
}

describe('substitutionCountsOf', () => {
  it('conta quantas aulas cada substituto assumiu', () => {
    expect(substitutionCountsOf(plano(['t_a', 't_b', 't_a']).substitutions)).toEqual({
      t_a: 2,
      t_b: 1,
    });
  });

  it('ignora as aulas sem cobertura', () => {
    expect(substitutionCountsOf(plano(['t_a', null, null]).substitutions)).toEqual({ t_a: 1 });
  });
});

describe('officializationDelta', () => {
  it('na primeira vez, credita tudo', () => {
    expect(officializationDelta(plano(['t_a', 't_b', 't_a']))).toEqual({ t_a: 2, t_b: 1 });
  });

  // Regressao: oficializar o mesmo dia duas vezes contava as substituicoes em dobro e
  // distorcia a equidade de forma permanente.
  it('não credita nada ao oficializar a mesma escala de novo', () => {
    const p = plano(['t_a', 't_b']);
    expect(officializationDelta(p, [registro(['t_a', 't_b'])])).toEqual({});
  });

  it('credita e debita apenas a diferença quando a escala do dia muda', () => {
    // Antes: t_a cobria 2 e t_b 1. Agora t_a cobre 1, t_b 1 e entra t_c.
    const delta = officializationDelta(plano(['t_a', 't_b', 't_c']), [
      registro(['t_a', 't_a', 't_b']),
    ]);

    expect(delta).toEqual({ t_a: -1, t_c: 1 });
  });

  it('desconta quem saiu completamente da escala', () => {
    expect(officializationDelta(plano(['t_a']), [registro(['t_a', 't_b'])])).toEqual({ t_b: -1 });
  });

  // Dados gravados antes desta correcao podem ter o mesmo dia duplicado no historico.
  it('corrige um dia que já estava duplicado no histórico', () => {
    const duplicado = [registro(['t_a', 't_b']), registro(['t_a', 't_b'])];

    expect(officializationDelta(plano(['t_a', 't_b']), duplicado)).toEqual({ t_a: -1, t_b: -1 });
  });

  it('não considera registros de outras datas', () => {
    const outraData = registro(['t_a', 't_a'], '2026-10-02');

    expect(officializationDelta(plano(['t_a']), [])).toEqual({ t_a: 1 });
    expect(outraData.date).not.toBe(plano(['t_a']).date);
  });
});

describe('applyCounterDelta', () => {
  it('soma e subtrai nos professores certos', () => {
    const resultado = applyCounterDelta(
      [professor('t_a', 5), professor('t_b', 2), professor('t_c', 0)],
      { t_a: 2, t_b: -1 }
    );

    expect(resultado.map((t) => t.totalSubstitutionsCount)).toEqual([7, 1, 0]);
  });

  it('nunca deixa um contador negativo', () => {
    const resultado = applyCounterDelta([professor('t_a', 1)], { t_a: -5 });

    expect(resultado[0].totalSubstitutionsCount).toBe(0);
  });

  it('não altera o objeto de quem não está no ajuste', () => {
    const original = [professor('t_a', 3)];
    const resultado = applyCounterDelta(original, {});

    expect(resultado[0]).toBe(original[0]);
  });
});

describe('ciclo completo de oficialização', () => {
  it('oficializar, refazer e oficializar de novo deixa o contador correto', () => {
    let professores = [professor('t_a', 0), professor('t_b', 0), professor('t_c', 0)];
    let historico: HistoryRecord[] = [];

    const oficializar = (p: DailySubstitutionPlan) => {
      const anteriores = historico.filter((h) => h.date === p.date);
      professores = applyCounterDelta(professores, officializationDelta(p, anteriores));
      historico = [registro(p.substitutions.map((s) => s.substituteTeacherId), p.date),
        ...historico.filter((h) => h.date !== p.date)];
    };

    oficializar(plano(['t_a', 't_a', 't_b']));
    expect(professores.map((t) => t.totalSubstitutionsCount)).toEqual([2, 1, 0]);

    // Coordenação refaz a escala do mesmo dia e oficializa outra vez.
    oficializar(plano(['t_a', 't_c', 't_c']));
    expect(professores.map((t) => t.totalSubstitutionsCount)).toEqual([1, 0, 2]);

    // Oficializar o mesmo resultado mais uma vez não muda nada.
    oficializar(plano(['t_a', 't_c', 't_c']));
    expect(professores.map((t) => t.totalSubstitutionsCount)).toEqual([1, 0, 2]);

    expect(historico.filter((h) => h.date === '2026-10-05')).toHaveLength(1);
  });
});
