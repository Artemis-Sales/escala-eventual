import { describe, it, expect } from 'vitest';
import {
  INITIAL_CLASSES,
  INITIAL_TEACHERS,
  OFFICIAL_SCHEDULE_SLOTS,
  PERIODS_DEFINITION,
} from './mockData';
import { canonicalSubjectName, cleanSubjectName, resolveKnowledgeArea } from '../utils/subjects';

const lessonSlots = OFFICIAL_SCHEDULE_SLOTS.filter((s) => s.type === 'AULA');

describe('grade oficial', () => {
  // Regressao: as duas turmas de Desenvolvimento de Sistemas (2ª e 3ª série A) vinham
  // truncadas e identicas na planilha de professores, e todas as aulas da 3ª série A
  // acabavam atribuidas a 2ª série A — a turma sumia por completo da aba de grade.
  it('nenhuma turma cadastrada fica sem aulas', () => {
    const semAulas = INITIAL_CLASSES.filter(
      (c) => !lessonSlots.some((s) => s.classId === c.id)
    ).map((c) => c.id);

    expect(semAulas).toEqual([]);
  });

  it('todo slot de aula aponta para uma turma cadastrada', () => {
    const idsValidos = new Set(INITIAL_CLASSES.map((c) => c.id));
    const orfaos = [...new Set(lessonSlots.map((s) => s.classId).filter((id) => !idsValidos.has(id!)))];

    expect(orfaos).toEqual([]);
  });

  it('nenhum professor tem duas aulas no mesmo dia e periodo', () => {
    const vistos = new Map<string, string>();
    const conflitos: string[] = [];

    lessonSlots.forEach((s) => {
      const chave = `${s.teacherId}_${s.dayOfWeek}_${s.periodId}`;
      const anterior = vistos.get(chave);
      if (anterior) conflitos.push(`${chave}: ${anterior} vs ${s.classId}`);
      else vistos.set(chave, s.classId ?? '');
    });

    expect(conflitos).toEqual([]);
  });

  // Regressao: a planilha cola o nome da turma na celula da disciplina, e o nome sujo
  // ("TECNOLOGIA E INOVACAO 8º ANO A INTEGRAL 9H ANUAL") vazava para a grade e para a
  // mensagem de WhatsApp.
  it('nenhuma disciplina carrega o nome da turma junto', () => {
    const sujas = [...new Set(lessonSlots.map((s) => s.subject ?? ''))].filter(
      (s) => cleanSubjectName(s) !== s
    );

    expect(sujas).toEqual([]);
  });

  // As abas da planilha escreviam a mesma disciplina de formas diferentes
  // ("EDUCACAO FISICA" e "Educação Fisica"), o que duplicava a materia na interface.
  it('todas as disciplinas usam a grafia canônica', () => {
    const foraDoPadrao = [...new Set(lessonSlots.map((s) => s.subject ?? ''))].filter(
      (s) => canonicalSubjectName(s) !== s
    );

    expect(foraDoPadrao).toEqual([]);
  });

  it('a mesma disciplina não aparece com duas grafias', () => {
    const porChave = new Map<string, Set<string>>();
    lessonSlots.forEach((s) => {
      const chave = canonicalSubjectName(s.subject);
      if (!porChave.has(chave)) porChave.set(chave, new Set());
      porChave.get(chave)!.add(s.subject ?? '');
    });

    const duplicadas = [...porChave.entries()]
      .filter(([, grafias]) => grafias.size > 1)
      .map(([chave, grafias]) => `${chave}: ${[...grafias].join(' / ')}`);

    expect(duplicadas).toEqual([]);
  });

  it('todo professor esta na area de conhecimento da sua disciplina', () => {
    const errados = INITIAL_TEACHERS.filter(
      (t) => resolveKnowledgeArea(t.mainSubject) !== t.knowledgeArea
    ).map((t) => `${t.name}: ${t.mainSubject} esta em ${t.knowledgeArea}`);

    expect(errados).toEqual([]);
  });

  it('todo slot cai num periodo valido', () => {
    const idsValidos = new Set(PERIODS_DEFINITION.map((p) => p.id));
    const invalidos = OFFICIAL_SCHEDULE_SLOTS.filter((s) => !idsValidos.has(s.periodId));

    expect(invalidos).toEqual([]);
  });
});
