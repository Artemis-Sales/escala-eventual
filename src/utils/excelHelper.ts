import * as XLSX from 'xlsx';
import type { DailySubstitutionPlan, Teacher, PeriodDefinition } from '../types';

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
      'Area_Conhecimento': 'Exatas',
      'Disciplinas_Secundarias': 'Física, Raciocínio Lógico',
      'Telefone': '(11) 98765-4321',
    },
    {
      'Nome': 'Profa. Beatriz Lima',
      'Disciplina_Principal': 'Língua Portuguesa',
      'Area_Conhecimento': 'Linguagens',
      'Disciplinas_Secundarias': 'Redação, Literatura',
      'Telefone': '(11) 98765-4444',
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

export async function parseUploadedExcel(file: File): Promise<{
  importedTeachers?: Partial<Teacher>[];
  importedSlots?: any[];
  error?: string;
}> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        let importedTeachers: Partial<Teacher>[] = [];
        let importedSlots: any[] = [];

        if (workbook.SheetNames.includes('Professores')) {
          const rawTeachers = XLSX.utils.sheet_to_json<any>(workbook.Sheets['Professores']);
          importedTeachers = rawTeachers.map((row, idx) => ({
            id: `imp-t-${idx}-${Date.now()}`,
            name: row['Nome'] || row['nome'] || `Professor ${idx + 1}`,
            mainSubject: row['Disciplina_Principal'] || row['disciplina'] || 'Geral',
            knowledgeArea: row['Area_Conhecimento'] || 'Linguagens',
            secondarySubjects: row['Disciplinas_Secundarias']
              ? String(row['Disciplinas_Secundarias']).split(',').map((s) => s.trim())
              : [],
            totalSubstitutionsCount: 0,
            phone: row['Telefone'] || '',
          }));
        }

        const scheduleSheetName =
          workbook.SheetNames.find((s) => s.toLowerCase().includes('grade') || s.toLowerCase().includes('horario')) ||
          workbook.SheetNames[0];

        if (scheduleSheetName && scheduleSheetName !== 'Professores') {
          const rawSchedule = XLSX.utils.sheet_to_json<any>(workbook.Sheets[scheduleSheetName]);
          importedSlots = rawSchedule;
        }

        resolve({ importedTeachers, importedSlots });
      } catch (err: any) {
        resolve({ error: `Erro ao processar planilha: ${err.message}` });
      }
    };

    reader.onerror = () => resolve({ error: 'Falha ao ler o arquivo selecionado.' });
    reader.readAsArrayBuffer(file);
  });
}
