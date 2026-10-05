/**
 * Cores de avatar dos professores. Todas passam em AA (4,5:1) com o texto branco que
 * aparece por cima — sortear um hex qualquer, como era feito antes, podia devolver um
 * tom claro demais e deixar a inicial ilegivel.
 *
 * Por enquanto a cor e so decorativa: ela nao codifica nada sobre o professor.
 */
export const TEACHER_COLORS = [
  '#047857', // verde
  '#0E7490', // ciano
  '#2563EB', // azul
  '#4F46E5', // indigo
  '#7C3AED', // violeta
  '#9333EA', // roxo
  '#B45309', // ambar
  '#DC2626', // vermelho
] as const;

export function randomTeacherColor(): string {
  return TEACHER_COLORS[Math.floor(Math.random() * TEACHER_COLORS.length)];
}
