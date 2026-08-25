import { describe, it, expect } from 'vitest';
import {
  canonicalSubjectName,
  cleanSubjectName,
  resolveKnowledgeArea,
  coerceKnowledgeArea,
} from './subjects';

describe('cleanSubjectName', () => {
  it('remove o nome da turma grudado no nome da disciplina', () => {
    expect(cleanSubjectName('TECNOLOGIA E INOVACAO 8º ANO A INTEGRAL 9H ANUAL')).toBe(
      'TECNOLOGIA E INOVACAO'
    );
    expect(cleanSubjectName('APROFUNDAMENTO DE GEOGRAFIA 3ª SERIE B INTEGRAL 9H ANUAL')).toBe(
      'APROFUNDAMENTO DE GEOGRAFIA'
    );
    expect(cleanSubjectName('PRATICAS EXPERIMENTAIS 6º ANO B INTEGRAL 9H ANUAL')).toBe(
      'PRATICAS EXPERIMENTAIS'
    );
  });

  it('remove o codigo do curso tecnico anexado a disciplina', () => {
    expect(cleanSubjectName('PROGRAMAÇÃO FRONT-END 6082 - DESENVOLVIMENTO DE SIST…')).toBe(
      'PROGRAMAÇÃO FRONT-END'
    );
    expect(cleanSubjectName('LOGICA E LINGUAGENS DE PROGR… 6082 - DESENVOLVIMENTO DE SIST…')).toBe(
      'LOGICA E LINGUAGENS DE PROGR…'
    );
  });

  it('preserva disciplinas que ja estao limpas', () => {
    ['MATEMATICA', 'LINGUA PORTUGUESA', 'REDAÇÃO E LEITURA', 'ESPORTE-MÚSICA-ARTE'].forEach((s) =>
      expect(cleanSubjectName(s)).toBe(s)
    );
  });

  it('remove marcadores de carga horaria e normaliza espacos', () => {
    expect(cleanSubjectName('Educação Financeira (2)')).toBe('Educação Financeira');
    expect(cleanSubjectName('  ARTE   ')).toBe('ARTE');
  });

  it('nunca devolve string vazia para uma entrada preenchida', () => {
    expect(cleanSubjectName('6º ANO A INTEGRAL 9H ANUAL')).not.toBe('');
    expect(cleanSubjectName('')).toBe('');
  });
});

describe('canonicalSubjectName', () => {
  it('unifica as grafias da mesma disciplina', () => {
    ['EDUCACAO FISICA', 'Educação Fisica', 'educação física'].forEach((s) =>
      expect(canonicalSubjectName(s)).toBe('Educação Física')
    );
    ['EDUCAÇÃO FINANCEIRA', 'Educação Financeira'].forEach((s) =>
      expect(canonicalSubjectName(s)).toBe('Educação Financeira')
    );
  });

  it('corrige a acentuação das disciplinas escritas sem acento', () => {
    expect(canonicalSubjectName('MATEMATICA')).toBe('Matemática');
    expect(canonicalSubjectName('CIENCIAS')).toBe('Ciências');
    expect(canonicalSubjectName('HISTORIA')).toBe('História');
    expect(canonicalSubjectName('ROBOTICA')).toBe('Robótica');
    expect(canonicalSubjectName('TECNOLOGIA E INOVACAO')).toBe('Tecnologia e Inovação');
  });

  it('limpa o nome da turma antes de padronizar', () => {
    expect(canonicalSubjectName('TECNOLOGIA E INOVACAO 8º ANO A INTEGRAL 9H ANUAL')).toBe(
      'Tecnologia e Inovação'
    );
    expect(canonicalSubjectName('PROGRAMAÇÃO FRONT-END 6082 - DESENVOLVIMENTO DE SIST…')).toBe(
      'Programação Front-End'
    );
  });

  it('mantém preposições em minúsculo no meio do nome', () => {
    expect(canonicalSubjectName('PROJETO DE VIDA')).toBe('Projeto de Vida');
    expect(canonicalSubjectName('APROFUNDAMENTO DE GEOGRAFIA')).toBe('Aprofundamento de Geografia');
  });

  it('aplica Title Case em disciplinas fora do dicionário', () => {
    expect(canonicalSubjectName('EDUCACAO PARA O TRANSITO')).toBe('Educacao para o Transito');
    expect(canonicalSubjectName('xadrez')).toBe('Xadrez');
  });

  it('é idempotente', () => {
    ['Educação Física', 'Matemática', 'Projeto de Vida', 'Esporte-Música-Arte'].forEach((s) =>
      expect(canonicalSubjectName(canonicalSubjectName(s))).toBe(canonicalSubjectName(s))
    );
  });

  it('não altera a área de conhecimento resolvida', () => {
    ['EDUCACAO FISICA', 'CIENCIAS', 'MATEMATICA', 'ROBOTICA'].forEach((s) =>
      expect(resolveKnowledgeArea(canonicalSubjectName(s))).toBe(resolveKnowledgeArea(s))
    );
  });
});

describe('resolveKnowledgeArea', () => {
  // Caso que motivou a correcao: 'EDUCACAO FISICA'.includes('FISICA') classificava
  // Educacao Fisica junto com Fisica.
  it('classifica Educação Física em Linguagens, e não junto com Física', () => {
    expect(resolveKnowledgeArea('Educação Fisica')).toBe('Linguagens');
    expect(resolveKnowledgeArea('EDUCACAO FISICA')).toBe('Linguagens');
    expect(resolveKnowledgeArea('FISICA')).toBe('Ciências da Natureza');
  });

  // Modelo da escola: Biologia, Fisica, Matematica e Quimica formam Ciencias da
  // Natureza (Ciencias, no Fundamental).
  it('classifica ciências da natureza, incluindo matemática', () => {
    ['CIENCIAS', 'BIOLOGIA', 'QUIMICA', 'FISICA', 'MATEMATICA', 'PRATICAS EXPERIMENTAIS',
      'ORIENTAÇÃO DE ESTUDO – MATEM…'].forEach((s) =>
      expect(resolveKnowledgeArea(s)).toBe('Ciências da Natureza')
    );
  });

  // Modelo da escola: Lingua Portuguesa, Lingua Inglesa, Artes e Educacao Fisica.
  it('classifica linguagens', () => {
    ['LINGUA PORTUGUESA', 'LINGUA INGLESA', 'REDAÇÃO E LEITURA', 'ARTE', 'ESPORTE-MÚSICA-ARTE',
      'ORIENTAÇÃO DE ESTUDO – LÍNGUA…'].forEach((s) =>
      expect(resolveKnowledgeArea(s)).toBe('Linguagens')
    );
  });

  it('classifica ciências humanas', () => {
    ['HISTORIA', 'GEOGRAFIA', 'FILOSOFIA', 'SOCIOLOGIA', 'Atualidades',
      'APROFUNDAMENTO DE SOCIOLOGIA'].forEach((s) =>
      expect(resolveKnowledgeArea(s)).toBe('Ciências Humanas')
    );
  });

  it('classifica o curso técnico e a parte diversificada', () => {
    ['ROBOTICA', 'TECNOLOGIA E INOVACAO', 'PROJETO DE VIDA', 'EDUCAÇÃO FINANCEIRA',
      'PROGRAMAÇÃO MOBILE', 'INTELIGÊNCIA ARTIFICIAL', 'Empreendedorismo',
      'LOGICA E LINGUAGENS DE PROGR…', 'REDES DE COMPUTADORES E SEG…',
      'MODELAGEM E DESENVOLVIMENT…', 'PROJETO MULTIDISCIPLINAR'].forEach((s) =>
      expect(resolveKnowledgeArea(s)).toBe('Parte Diversificada')
    );
  });

  it('classifica a equipe gestora', () => {
    ['Direção Escolar', 'Vice-Direção', 'Coordenação Pedagógica Geral'].forEach((s) =>
      expect(resolveKnowledgeArea(s)).toBe('Gestão Escolar')
    );
  });

  it('classifica pelo nome ja sujo, sem depender da limpeza previa', () => {
    expect(resolveKnowledgeArea('APROFUNDAMENTO DE GEOGRAFIA 3ª SERIE B INTEGRAL 9H ANUAL')).toBe(
      'Ciências Humanas'
    );
  });
});

describe('coerceKnowledgeArea', () => {
  it('respeita a área informada quando ela é válida', () => {
    expect(coerceKnowledgeArea('Ciências Humanas', 'MATEMATICA')).toBe('Ciências Humanas');
  });

  it('deduz pela disciplina quando a área vem vazia ou inválida', () => {
    expect(coerceKnowledgeArea('', 'Educação Fisica')).toBe('Linguagens');
    expect(coerceKnowledgeArea('Area Inexistente', 'QUIMICA')).toBe('Ciências da Natureza');
  });
});
