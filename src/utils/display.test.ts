import { describe, expect, it } from 'vitest';
import { areaKey, coverageOf, displayName, reasonOf, shortClassName, startTime } from './display';
import type { SubstitutionItem } from '../types';

const item = (over: Partial<SubstitutionItem>): SubstitutionItem => ({
  id: 'x',
  periodId: 1,
  periodLabel: '1ª Aula',
  periodTime: '07:10 - 08:00',
  classId: '6A',
  className: '6º ANO A INTEGRAL 9H',
  originalTeacherId: 't_1',
  originalTeacherName: 'FULANO',
  originalSubject: 'Matemática',
  substituteTeacherId: 't_2',
  substituteTeacherName: 'CICLANO',
  tier: 1,
  matchType: 'MESMA_MATERIA',
  ...over,
});

describe('displayName', () => {
  it('passa de caixa alta para nome próprio, com partículas em minúsculas', () => {
    expect(displayName('LEONELIA DA CONCEICAO DE PONTES FARIA')).toBe(
      'Leonelia da Conceicao de Pontes Faria'
    );
  });

  it('mantém a primeira palavra maiúscula mesmo se for partícula', () => {
    expect(displayName('DE SOUZA')).toBe('De Souza');
  });

  it('aceita vazio', () => {
    expect(displayName(null)).toBe('');
  });
});

describe('shortClassName', () => {
  it('encurta ano do fundamental', () => {
    expect(shortClassName('6º ANO A INTEGRAL 9H')).toBe('6º A');
  });

  it('encurta série do médio e preserva o curso técnico', () => {
    expect(shortClassName('2ª SÉRIE A (DS) INTEGRAL 9H')).toBe('2ª A · DS');
    expect(shortClassName('1ª SÉRIE B INTEGRAL 9H')).toBe('1ª B');
  });

  it('devolve o original quando não reconhece o formato', () => {
    expect(shortClassName('7B')).toBe('7B');
  });
});

describe('coverageOf e reasonOf', () => {
  it('professor regular cobre normalmente', () => {
    expect(coverageOf(item({}))).toBe('coberta');
    expect(reasonOf(item({}))).toBe('Mesma disciplina');
  });

  it('PCA e gestão são último recurso', () => {
    expect(coverageOf(item({ tier: 2 }))).toBe('ultimo-recurso');
    expect(reasonOf(item({ tier: 3 }))).toBe('Equipe gestora');
  });

  it('sem substituto é aula descoberta', () => {
    const vazio = item({ substituteTeacherId: null, substituteTeacherName: null });
    expect(coverageOf(vazio)).toBe('descoberta');
    expect(reasonOf(vazio)).toBe('Sem professor livre');
  });
});

describe('areaKey e startTime', () => {
  it('mapeia as cinco áreas e cai em gestão para valor desconhecido', () => {
    expect(areaKey('Ciências da Natureza')).toBe('natureza');
    expect(areaKey('Exatas')).toBe('gestao');
  });

  it('pega o início do intervalo', () => {
    expect(startTime('07:10 - 08:00')).toBe('07:10');
  });
});
