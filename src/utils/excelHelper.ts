import * as XLSX from 'xlsx';
import type {
  DailySubstitutionPlan,
  Teacher,
  PeriodDefinition,
  ScheduleSlot,
  DayOfWeek,
  SlotType,
  StaffRole,
} from '../types';
import { normalizeText } from './text';
import { canonicalSubjectName, coerceKnowledgeArea } from './subjects';

type SheetRow = Record<string, unknown>;

function cellToString(value: unknown): string {
  return value === undefined || value === null ? '' : String(value).trim();
}

function normalizeDayOfWeek(raw: unknown): DayOfWeek | null {
  const n = normalizeText(cellToString(raw));
  if (n.startsWith('SEG')) return 'segunda';
  if (n.startsWith('TER')) return 'terca';
  if (n.startsWith('QUA')) return 'quarta';
  if (n.startsWith('QUI')) return 'quinta';
  if (n.startsWith('SEX')) return 'sexta';
  return null;
}

function normalizeSlotType(raw: unknown): SlotType {
  const n = normalizeText(cellToString(raw));
  if (n === 'AULA') return 'AULA';
  if (n.includes('ELETIVA')) return 'ELETIVA';
  if (n.startsWith('CURSO') || n.includes('FORMACAO') || n.includes('ATPC') || n.includes('MULTIPLICA')) {
    return 'CURSO_FORMACAO';
  }
  if (n.includes('TUTORIA') || n === 'ATIVIDADE') return 'ATIVIDADE';
  return 'LIVRE';
}

function normalizeRole(raw: unknown): StaffRole {
  const n = normalizeText(cellToString(raw));
  if (n.includes('GESTORA') || n.includes('GESTAO') || n.includes('DIRECAO')) return 'EQUIPE_GESTORA';
  if (n.includes('COORDENADOR') || n.includes('COORD')) return 'COORDENADOR_AREA';
  return 'PROFESSOR';
}

function normalizeBoolean(raw: unknown): boolean {
  const n = normalizeText(cellToString(raw));
  return n === 'SIM' || n === 'TRUE' || n === '1' || n === 'X';
}

export function exportDailyPlanToExcel(
  plan: DailySubstitutionPlan,
  allTeachers: Teacher[],
  fileName = `Escala_Substituicao_${plan.date}.xlsx`
) {
  const wb = XLSX.utils.book_new();

  const scaleRows = plan.substitutions.map((sub) => ({
    'Período': sub.periodLabel,
    'Horário': sub.periodTime,
    'Turma': sub.className,
    'Disciplina': sub.originalSubject,
    'Professor Ausente': sub.originalTeacherName,
    'Professor Substituto': sub.substituteTeacherName || 'NENHUM (SEM COBERTURA)',
    'Afinidade / Motivo':
      sub.matchType === 'MESMA_MATERIA'
        ? 'Mesma Matéria'
        : sub.matchType === 'MESMA_AREA'
        ? 'Mesma Área'
        : sub.matchType === 'MANUAL'
        ? 'Ajuste Manual'
        : sub.matchType === 'SEM_SUBSTITUTO'
        ? 'Indisponível'
        : 'Horário Livre',
    'Observações': sub.notes || '',
  }));

  const wsScale = XLSX.utils.json_to_sheet(scaleRows);
  XLSX.utils.book_append_sheet(wb, wsScale, 'Escala do Dia');

  const equityRows = allTeachers
    .slice()
    .sort((a, b) => b.totalSubstitutionsCount - a.totalSubstitutionsCount)
    .map((t, idx) => ({
      'Posição': idx + 1,
      'Professor': t.name,
      'Disciplina Principal': t.mainSubject,
      'Área de Conhecimento': t.knowledgeArea,
      'Total de Substituições Feitas': t.totalSubstitutionsCount,
      'Telefone/Contato': t.phone || '',
    }));

  const wsEquity = XLSX.utils.json_to_sheet(equityRows);
  XLSX.utils.book_append_sheet(wb, wsEquity, 'Controle de Substituições');

  XLSX.writeFile(wb, fileName);
}

export function downloadExcelTemplate(_periods?: PeriodDefinition[]) {
  const wb = XLSX.utils.book_new();

  const teachersExample = [
    {
      'Nome': 'Prof. Carlos Silva',
      'Disciplina_Principal': 'Matemática',
      'Area_Conhecimento': 'Ciências da Natureza',
      'Disciplinas_Secundarias': 'Física, Raciocínio Lógico',
      'Telefone': '(11) 98765-4321',
      'Cargo': 'PROFESSOR',
      'Isento_Substituicao': 'NAO',
    },
    {
      'Nome': 'Profa. Beatriz Lima',
      'Disciplina_Principal': 'Língua Portuguesa',
      'Area_Conhecimento': 'Linguagens',
      'Disciplinas_Secundarias': 'Redação, Literatura',
      'Telefone': '(11) 98765-4444',
      'Cargo': 'COORDENADOR_AREA',
      'Isento_Substituicao': 'NAO',
    },
  ];
  const wsT = XLSX.utils.json_to_sheet(teachersExample);
  XLSX.utils.book_append_sheet(wb, wsT, 'Professores');

  const scheduleExample = [
    {
      'Dia_Semana': 'segunda',
      'Periodo_Numero': 1,
      'Nome_Professor': 'Prof. Carlos Silva',
      'Tipo': 'AULA',
      'Turma': '6º Ano A',
      'Disciplina_ou_Curso': 'Matemática',
    },
    {
      'Dia_Semana': 'terca',
      'Periodo_Numero': 7,
      'Nome_Professor': 'Profa. Beatriz Lima',
      'Tipo': 'CURSO_FORMACAO',
      'Turma': '',
      'Disciplina_ou_Curso': 'ATPC Linguagens',
    },
    {
      'Dia_Semana': 'quarta',
      'Periodo_Numero': 2,
      'Nome_Professor': 'Prof. Carlos Silva',
      'Tipo': 'LIVRE',
      'Turma': '',
      'Disciplina_ou_Curso': 'Horário de Permanência Livre',
    },
  ];
  const wsS = XLSX.utils.json_to_sheet(scheduleExample);
  XLSX.utils.book_append_sheet(wb, wsS, 'Grade_e_Cursos');

  XLSX.writeFile(wb, 'Modelo_Grade_Escola_Integral.xlsx');
}

export interface ParsedExcelResult {
  importedTeachers?: Teacher[];
  importedSlots?: ScheduleSlot[];
  warnings?: string[];
  error?: string;
}

export async function parseUploadedExcel(file: File): Promise<ParsedExcelResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const importBatchId = Date.now();

        let importedTeachers: Teacher[] = [];
        const warnings: string[] = [];

        if (workbook.SheetNames.includes('Professores')) {
          const rawTeachers = XLSX.utils.sheet_to_json<SheetRow>(workbook.Sheets['Professores']);
          importedTeachers = rawTeachers.map((row, idx) => {
            const isExempt = normalizeBoolean(row['Isento_Substituicao'] ?? row['Isento']);
            const mainSubject =
              canonicalSubjectName(cellToString(row['Disciplina_Principal'] ?? row['disciplina'])) || 'Geral';
            return {
              id: `imp-t-${idx}-${importBatchId}`,
              name: cellToString(row['Nome'] ?? row['nome']) || `Professor ${idx + 1}`,
              mainSubject,
              // Quando a planilha nao traz a area (ou traz um valor invalido), deduzimos
              // pela disciplina em vez de assumir um padrao fixo.
              knowledgeArea: coerceKnowledgeArea(cellToString(row['Area_Conhecimento']), mainSubject),
              secondarySubjects: row['Disciplinas_Secundarias']
                ? cellToString(row['Disciplinas_Secundarias'])
                    .split(',')
                    .map(canonicalSubjectName)
                    .filter(Boolean)
                : [],
              totalSubstitutionsCount: 0,
              phone: cellToString(row['Telefone']),
              role: normalizeRole(row['Cargo'] ?? row['Funcao']),
              isExemptFromSubstitutions: isExempt,
              exemptReason: isExempt ? cellToString(row['Motivo_Isencao']) || undefined : undefined,
            };
          });
        }

        const scheduleSheetName = workbook.SheetNames.find(
          (s) => normalizeText(s).includes('GRADE') || normalizeText(s).includes('HORARIO')
        );

        let importedSlots: ScheduleSlot[] = [];

        if (scheduleSheetName) {
          const teacherIdByName = new Map<string, string>();
          importedTeachers.forEach((t) => teacherIdByName.set(normalizeText(t.name), t.id));

          const rawSchedule = XLSX.utils.sheet_to_json<SheetRow>(workbook.Sheets[scheduleSheetName]);

          importedSlots = rawSchedule.reduce<ScheduleSlot[]>((acc, row, idx) => {
            const dayOfWeek = normalizeDayOfWeek(row['Dia_Semana'] ?? row['dia']);
            const periodId = Number(row['Periodo_Numero'] ?? row['periodo']);
            const teacherName = cellToString(row['Nome_Professor'] ?? row['professor']);
            const teacherId = teacherIdByName.get(normalizeText(teacherName));

            if (!dayOfWeek || !Number.isFinite(periodId) || !teacherId) {
              warnings.push(
                `Linha ${idx + 2} da grade ignorada (dia/período/professor não reconhecido: "${teacherName || '—'}").`
              );
              return acc;
            }

            const type = normalizeSlotType(row['Tipo']);
            const rawSubjectOrCourse = cellToString(row['Disciplina_ou_Curso']);
            const subjectOrCourse = rawSubjectOrCourse || undefined;
            const cleanSubject = canonicalSubjectName(rawSubjectOrCourse) || undefined;

            acc.push({
              id: `slot_${teacherId}_${dayOfWeek}_${periodId}`,
              teacherId,
              dayOfWeek,
              periodId,
              type,
              classId: type === 'AULA' ? cellToString(row['Turma']) || undefined : undefined,
              subject: type === 'AULA' ? cleanSubject : undefined,
              trainingName: type === 'CURSO_FORMACAO' ? subjectOrCourse : undefined,
            });
            return acc;
          }, []);
        }

        resolve({ importedTeachers, importedSlots, warnings });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        resolve({ error: `Erro ao processar planilha: ${message}` });
      }
    };

    reader.onerror = () => resolve({ error: 'Falha ao ler o arquivo selecionado.' });
    reader.readAsArrayBuffer(file);
  });
}
