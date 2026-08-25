export function randomTeacherColor(): string {
  const value = Math.floor(Math.random() * 16777215).toString(16);
  return `#${value.padStart(6, '0')}`;
}
