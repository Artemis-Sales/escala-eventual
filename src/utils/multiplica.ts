import type { PeriodDefinition } from '../types';

/** Duração padrão da formação do Multiplica SP, em minutos. */
export const MULTIPLICA_DURACAO_MINUTOS = 90;

/** Horários de início mais usados pela escola, oferecidos como atalho no formulário. */
export const INICIOS_FREQUENTES = ['08:00', '09:00', '09:30', '10:00', '13:00', '14:00'];

export function timeToMinutes(time: string): number {
  const [h, m] = time.trim().split(':').map(Number);
  return h * 60 + m;
}

export function minutesToTime(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;

  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Horário de término do curso a partir do início e da duração. */
export function courseEndTime(startTime: string, duracao = MULTIPLICA_DURACAO_MINUTOS): string {
  return minutesToTime(timeToMinutes(startTime) + duracao);
}

function periodRange(period: PeriodDefinition): { inicio: number; fim: number } {
  const [inicio, fim] = period.time.split(' - ');
  return { inicio: timeToMinutes(inicio), fim: timeToMinutes(fim) };
}

/**
 * Aulas da grade que o curso atravessa. O curso e independente da grade: ele comeca
 * num horario proprio e dura 1h30, entao pode cobrir duas ou tres aulas, e pode
 * comecar no meio de uma delas ou durante o intervalo. Toda aula que tiver qualquer
 * sobreposicao com o curso fica bloqueada para substituicao.
 */
export function periodsOverlappedBy(
  startTime: string,
  periods: PeriodDefinition[],
  duracao = MULTIPLICA_DURACAO_MINUTOS
): number[] {
  const inicioCurso = timeToMinutes(startTime);
  const fimCurso = inicioCurso + duracao;

  return periods
    .filter((p) => !p.isBreak)
    .filter((p) => {
      const { inicio, fim } = periodRange(p);
      // Sobreposicao real: encostar exatamente no limite nao conta.
      return inicioCurso < fim && fimCurso > inicio;
    })
    .map((p) => p.id)
    .sort((a, b) => a - b);
}

/** Rótulo do intervalo do curso, ex: "09:30 - 11:00". */
export function courseTimeLabel(startTime: string, duracao = MULTIPLICA_DURACAO_MINUTOS): string {
  return `${startTime} - ${courseEndTime(startTime, duracao)}`;
}
