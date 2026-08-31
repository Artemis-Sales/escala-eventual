import { describe, it, expect } from 'vitest';
import {
  courseEndTime,
  courseTimeLabel,
  minutesToTime,
  periodsOverlappedBy,
  timeToMinutes,
} from './multiplica';
import { PERIODS_DEFINITION } from '../data/mockData';

describe('conversão de horários', () => {
  it('converte ida e volta', () => {
    expect(timeToMinutes('09:30')).toBe(570);
    expect(minutesToTime(570)).toBe('09:30');
    expect(minutesToTime(timeToMinutes('08:00') + 90)).toBe('09:30');
  });

  it('calcula o término somando 1h30', () => {
    expect(courseEndTime('08:00')).toBe('09:30');
    expect(courseEndTime('09:30')).toBe('11:00');
    expect(courseEndTime('14:00')).toBe('15:30');
    expect(courseTimeLabel('13:00')).toBe('13:00 - 14:30');
  });
});

describe('periodsOverlappedBy', () => {
  // Horarios reais informados pela escola. O curso e independente da grade: dependendo
  // do inicio, ele cobre duas ou tres aulas.
  it('cobre as aulas certas para cada horário de início usado pela escola', () => {
    const casos: [string, number[]][] = [
      ['08:00', [2, 3]], // 08:00 - 09:30
      ['09:00', [3, 4]], // 09:00 - 10:30, atravessa o intervalo
      ['09:30', [3, 4, 5]], // 09:30 - 11:00, pega o fim da 3ª e o começo da 5ª
      ['10:00', [4, 5]], // 10:00 - 11:30
      ['13:00', [7, 8]], // 13:00 - 14:30, começa durante o almoço
      ['14:00', [7, 8, 9]], // 14:00 - 15:30
    ];

    casos.forEach(([inicio, esperado]) =>
      expect(periodsOverlappedBy(inicio, PERIODS_DEFINITION)).toEqual(esperado)
    );
  });

  it('não bloqueia a aula que termina exatamente quando o curso começa', () => {
    // 1ª aula vai até 08:00; um curso que começa 08:00 não a atravessa.
    expect(periodsOverlappedBy('08:00', PERIODS_DEFINITION)).not.toContain(1);
  });

  it('não bloqueia a aula que começa exatamente quando o curso termina', () => {
    // 08:00 + 1h30 = 09:30, e a 4ª aula só começa 10:00.
    expect(periodsOverlappedBy('08:00', PERIODS_DEFINITION)).not.toContain(4);
  });

  it('cobre a aula em que o curso começa no meio', () => {
    // 3ª aula é 08:50 - 09:40; começando 09:30 ainda pega os últimos 10 minutos.
    expect(periodsOverlappedBy('09:30', PERIODS_DEFINITION)).toContain(3);
  });

  it('aceita começar durante o intervalo ou o almoço', () => {
    expect(periodsOverlappedBy('09:45', PERIODS_DEFINITION)).toEqual([4, 5]); // intervalo
    expect(periodsOverlappedBy('12:45', PERIODS_DEFINITION)).toEqual([7]); // almoço
  });

  it('respeita uma duração diferente', () => {
    expect(periodsOverlappedBy('08:00', PERIODS_DEFINITION, 50)).toEqual([2]);
  });

  it('nunca devolve horário fora da grade', () => {
    expect(periodsOverlappedBy('20:00', PERIODS_DEFINITION)).toEqual([]);
  });
});
