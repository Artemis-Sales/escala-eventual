const XLSX = require('xlsx');
const fs = require('fs');

const profWorkbook = XLSX.readFile('C:\\Projetos\\escala eventual\\horario-professores-individual Agosto .xlsx');

const PERIOD_TIMES = [
  '07:10', // 1
  '08:00', // 2
  '08:50', // 3
  '10:00', // 4
  '10:50', // 5
  '11:40', // 6
  '13:30', // 7
  '14:20', // 8
  '15:10', // 9
];

const DAYS = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

function extractClassId(cellText) {
  if (!cellText) return '';
  const text = cellText.toUpperCase();
  
  if (text.includes('6º ANO A') || text.includes('6 ANO A') || text.includes('6° ANO A')) return '6A';
  if (text.includes('6º ANO B') || text.includes('6 ANO B') || text.includes('6° ANO B')) return '6B';
  if (text.includes('7º ANO A') || text.includes('7 ANO A') || text.includes('7° ANO A')) return '7A';
  if (text.includes('7º ANO B') || text.includes('7 ANO B') || text.includes('7° ANO B')) return '7B';
  if (text.includes('8º ANO A') || text.includes('8 ANO A') || text.includes('8° ANO A')) return '8A';
  if (text.includes('8º ANO B') || text.includes('8 ANO B') || text.includes('8° ANO B')) return '8B';
  if (text.includes('9º ANO A') || text.includes('9 ANO A') || text.includes('9° ANO A')) return '9A';
  if (text.includes('9º ANO B') || text.includes('9 ANO B') || text.includes('9° ANO B')) return '9B';
  
  if (text.includes('1ª SERIE A') || text.includes('1 SERIE A') || text.includes('1ª SÉRIE A') || text.includes('1 SÉRIE A')) return '1EMA';
  if (text.includes('1ª SERIE B') || text.includes('1 SERIE B') || text.includes('1ª SÉRIE B') || text.includes('1 SÉRIE B')) return '1EMB';
  if (text.includes('2ª SERIE A') || text.includes('2 SERIE A') || text.includes('2ª SÉRIE A') || text.includes('6082') || text.includes('DESENVOLVIMENTO DE SIST')) return '2EMA_DS';
  if (text.includes('2ª SERIE B') || text.includes('2 SERIE B') || text.includes('2ª SÉRIE B') || text.includes('2 SÉRIE B')) return '2EMB';
  if (text.includes('3ª SERIE A') || text.includes('3 SERIE A') || text.includes('3ª SÉRIE A')) return '3EMA_DS';
  if (text.includes('3ª SERIE B') || text.includes('3 SERIE B') || text.includes('3ª SÉRIE B')) return '3EMB';

  return 'OUTRA';
}

function extractSubject(cellText) {
  if (!cellText) return '';
  const lines = cellText.split(/\r?\n/);
  let subj = lines[0].trim();
  subj = subj.replace(/\(\d+\)/g, '').trim();
  return subj;
}

function guessKnowledgeArea(subject) {
  const s = subject.toUpperCase();
  if (s.includes('MATEMATICA') || s.includes('FISICA') || s.includes('QUIMICA') || s.includes('BIOLOGIA') || s.includes('CIENCIAS') || s.includes('TECNOLOGIA') || s.includes('ROBOTICA') || s.includes('DESENVOLVIMENTO')) {
    return 'Exatas';
  }
  if (s.includes('PORTUGUES') || s.includes('INGLES') || s.includes('ARTE') || s.includes('EDUCACAO FISICA') || s.includes('EDUCAÇÃO FISICA') || s.includes('LEITURA')) {
    return 'Linguagens';
  }
  if (s.includes('HISTORIA') || s.includes('HISTÓRIA') || s.includes('GEOGRAFIA') || s.includes('FILOSOFIA') || s.includes('SOCIOLOGIA')) {
    return 'Ciências Humanas';
  }
  if (s.includes('CIENCIAS') || s.includes('CIÊNCIAS') || s.includes('BIOLOGIA') || s.includes('QUIMICA') || s.includes('QUÍMICA') || s.includes('FISICA') || s.includes('FÍSICA')) {
    return 'Ciências da Natureza';
  }
  return 'Parte Diversificada';
}

const teachers = [];
const slots = [];
let teacherIdCounter = 1;

profWorkbook.SheetNames.forEach((sheetName) => {
  const sheet = profWorkbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  let i = 0;
  while (i < data.length) {
    const row = data[i];
    if (row && row[0] && typeof row[0] === 'string' && !row[0].includes('INTEGRAL') && !row[0].includes('HORÁRIO') && row[0].length > 3) {
      const teacherName = row[0].trim();
      const teacherId = `t_${teacherIdCounter++}`;
      
      const teacherSubjectsSet = new Set();
      let mainSubject = '';
      
      let tableRowIdx = i + 2;
      let periodIdx = 0;

      while (tableRowIdx < data.length && periodIdx < 9) {
        const timeRow = data[tableRowIdx];
        if (!timeRow) {
          tableRowIdx++;
          continue;
        }

        const timeCol = timeRow[1];
        if (timeCol === '12:30') {
          tableRowIdx++;
          continue;
        }

        if (timeCol && PERIOD_TIMES.includes(timeCol)) {
          const periodId = periodIdx + 1;

          for (let d = 0; d < 5; d++) {
            const dayOfWeek = DAYS[d];
            const cellVal = timeRow[d + 2];
            const slotId = `slot_${teacherId}_${dayOfWeek}_${periodId}`;

            if (cellVal && typeof cellVal === 'string' && cellVal.trim() !== '- - -' && cellVal.trim() !== '') {
              const subj = extractSubject(cellVal);
              const classId = extractClassId(cellVal);
              
              if (subj) {
                teacherSubjectsSet.add(subj);
                if (!mainSubject) mainSubject = subj;
              }

              slots.push({
                id: slotId,
                teacherId,
                dayOfWeek,
                periodId,
                type: 'AULA',
                classId: classId || '6A',
                subject: subj || 'AULA REGULAR',
              });
            } else {
              slots.push({
                id: slotId,
                teacherId,
                dayOfWeek,
                periodId,
                type: 'LIVRE',
              });
            }
          }

          periodIdx++;
        }

        tableRowIdx++;
      }

      const subjectsArray = Array.from(teacherSubjectsSet);
      const cleanMainSubject = mainSubject || subjectsArray[0] || 'Geral';
      const knowledgeArea = guessKnowledgeArea(cleanMainSubject);

      const colors = ['#2563EB', '#7C3AED', '#059669', '#D97706', '#DC2626', '#0891B2', '#4F46E5', '#9333EA'];
      const color = colors[(teacherIdCounter - 2) % colors.length];

      // Exceção de substituição para Danilo e Pedro
      const isDaniloOrPedro =
        teacherName.toUpperCase().includes('DANILO') ||
        teacherName.toUpperCase().includes('PEDRO MARQUES');

      // Coordenadores de Área: Alexandre, Adriana e Marcia
      const isAreaCoordinator =
        teacherName.toUpperCase().includes('ADRIANA BEGOSSO') ||
        teacherName.toUpperCase().includes('ALEXANDRE CUSTODIO') ||
        teacherName.toUpperCase().includes('MARCIA PEREIRA');

      let role = 'PROFESSOR';
      if (isAreaCoordinator) role = 'COORDENADOR_AREA';

      teachers.push({
        id: teacherId,
        name: teacherName,
        mainSubject: cleanMainSubject,
        knowledgeArea,
        secondarySubjects: subjectsArray.filter(s => s !== cleanMainSubject),
        totalSubstitutionsCount: 0,
        color,
        phone: '',
        isExemptFromSubstitutions: isDaniloOrPedro,
        exemptReason: isDaniloOrPedro ? 'Professor do Curso Técnico (Não realiza substituições)' : undefined,
        role,
      });

      i = tableRowIdx - 1;
    }
    i++;
  }
});

// Adicionar Equipe Gestora (Genilson, Débora, Renata)
const managementStaff = [
  {
    id: 'gestao_1',
    name: 'GENILSON',
    mainSubject: 'Direção Escolar',
    knowledgeArea: 'Gestão Escolar',
    secondarySubjects: ['Gestão Pedagógica', 'Acompanhamento Pedagógico'],
    totalSubstitutionsCount: 0,
    color: '#1E1B4B',
    phone: '',
    role: 'EQUIPE_GESTORA',
    isExemptFromSubstitutions: false,
  },
  {
    id: 'gestao_2',
    name: 'DÉBORA',
    mainSubject: 'Vice-Direção',
    knowledgeArea: 'Gestão Escolar',
    secondarySubjects: ['Gestão de Convivência', 'Apoio Pedagógico'],
    totalSubstitutionsCount: 0,
    color: '#312E81',
    phone: '',
    role: 'EQUIPE_GESTORA',
    isExemptFromSubstitutions: false,
  },
  {
    id: 'gestao_3',
    name: 'RENATA',
    mainSubject: 'Coordenação Pedagógica Geral (CGP)',
    knowledgeArea: 'Gestão Escolar',
    secondarySubjects: ['Currículo Paulista', 'Formação Geral'],
    totalSubstitutionsCount: 0,
    color: '#4338CA',
    phone: '',
    role: 'EQUIPE_GESTORA',
    isExemptFromSubstitutions: false,
  },
];

managementStaff.forEach((m) => {
  teachers.push(m);
  // Create default free slots for management staff
  DAYS.forEach((dayOfWeek) => {
    for (let periodId = 1; periodId <= 9; periodId++) {
      slots.push({
        id: `slot_${m.id}_${dayOfWeek}_${periodId}`,
        teacherId: m.id,
        dayOfWeek,
        periodId,
        type: 'LIVRE',
      });
    }
  });
});

console.log(`Total staff: ${teachers.length} (including ${managementStaff.length} management members) and ${slots.length} slots.`);

const mockDataContent = `import type { Teacher, ClassGroup, PeriodDefinition, ScheduleSlot, DayOfWeek } from '../types';

export const PERIODS_DEFINITION: PeriodDefinition[] = [
  { id: 1, label: '1ª Aula', time: '07:10 - 08:00' },
  { id: 2, label: '2ª Aula', time: '08:00 - 08:50' },
  { id: 3, label: '3ª Aula', time: '08:50 - 09:40' },
  { id: 4, label: '4ª Aula', time: '10:00 - 10:50' },
  { id: 5, label: '5ª Aula', time: '10:50 - 11:40' },
  { id: 6, label: '6ª Aula', time: '11:40 - 12:30' },
  { id: 7, label: '7ª Aula', time: '13:30 - 14:20' },
  { id: 8, label: '8ª Aula', time: '14:20 - 15:10' },
  { id: 9, label: '9ª Aula', time: '15:10 - 16:00' },
];

export const DAYS_OF_WEEK: { key: DayOfWeek; label: string; short: string }[] = [
  { key: 'segunda', label: 'Segunda-feira', short: 'Seg' },
  { key: 'terca', label: 'Terça-feira', short: 'Ter' },
  { key: 'quarta', label: 'Quarta-feira', short: 'Qua' },
  { key: 'quinta', label: 'Quinta-feira', short: 'Qui' },
  { key: 'sexta', label: 'Sexta-feira', short: 'Sex' },
];

export const INITIAL_CLASSES: ClassGroup[] = [
  { id: '6A', name: '6º ANO A INTEGRAL 9H', segment: 'Ensino Fundamental II' },
  { id: '6B', name: '6º ANO B INTEGRAL 9H', segment: 'Ensino Fundamental II' },
  { id: '7A', name: '7º ANO A INTEGRAL 9H', segment: 'Ensino Fundamental II' },
  { id: '7B', name: '7º ANO B INTEGRAL 9H', segment: 'Ensino Fundamental II' },
  { id: '8A', name: '8º ANO A INTEGRAL 9H', segment: 'Ensino Fundamental II' },
  { id: '8B', name: '8º ANO B INTEGRAL 9H', segment: 'Ensino Fundamental II' },
  { id: '9A', name: '9º ANO A INTEGRAL 9H', segment: 'Ensino Fundamental II' },
  { id: '9B', name: '9º ANO B INTEGRAL 9H', segment: 'Ensino Fundamental II' },
  { id: '1EMA', name: '1ª SÉRIE A INTEGRAL 9H', segment: 'Ensino Médio' },
  { id: '1EMB', name: '1ª SÉRIE B INTEGRAL 9H', segment: 'Ensino Médio' },
  { id: '2EMA_DS', name: '2ª SÉRIE A (DS) INTEGRAL 9H', segment: 'Ensino Médio' },
  { id: '2EMB', name: '2ª SÉRIE B INTEGRAL 9H', segment: 'Ensino Médio' },
  { id: '3EMA_DS', name: '3ª SÉRIE A (DS) INTEGRAL 9H', segment: 'Ensino Médio' },
  { id: '3EMB', name: '3ª SÉRIE B INTEGRAL 9H', segment: 'Ensino Médio' },
];

export const INITIAL_TEACHERS: Teacher[] = ${JSON.stringify(teachers, null, 2)};

export const OFFICIAL_SCHEDULE_SLOTS: ScheduleSlot[] = ${JSON.stringify(slots, null, 2)};

export function generateInitialSchedule(): ScheduleSlot[] {
  return OFFICIAL_SCHEDULE_SLOTS;
}
`;

fs.writeFileSync('C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\378a411c-0d8c-47b3-b376-0f5d0bd7fb8c\\scratch\\mockData.ts', mockDataContent, 'utf-8');
console.log('mockData.ts created in scratch with Area Coordinators and Management Team!');
