export type DayOfWeek = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta';

export type KnowledgeArea =
  | 'Exatas'
  | 'Linguagens'
  | 'Ciências da Natureza'
  | 'Ciências Humanas'
  | 'Parte Diversificada'
  | 'Gestão Escolar';

export type StaffRole = 'PROFESSOR' | 'COORDENADOR_AREA' | 'EQUIPE_GESTORA';

export interface PeriodDefinition {
  id: number;
  label: string; // Ex: "1ª Aula"
  time: string;  // Ex: "07:10 - 08:00"
  isBreak?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  mainSubject: string;
  knowledgeArea: KnowledgeArea;
  secondarySubjects?: string[];
  totalSubstitutionsCount: number;
  color?: string;
  phone?: string;
  isExemptFromSubstitutions?: boolean; // Se true, não realiza substituições (Ex: Danilo, Pedro)
  exemptReason?: string;
  role?: StaffRole; // 'PROFESSOR' | 'COORDENADOR_AREA' (Adriana, Alexandre, Marcia) | 'EQUIPE_GESTORA' (Genilson, Débora, Renata)
}

export interface ClassGroup {
  id: string;
  name: string;
  segment: 'Ensino Fundamental II' | 'Ensino Médio';
}

export type SlotType = 'AULA' | 'CURSO_FORMACAO' | 'LIVRE';

export interface ScheduleSlot {
  id: string;
  teacherId: string;
  dayOfWeek: DayOfWeek;
  periodId: number;
  type: SlotType;
  classId?: string;
  subject?: string;
  trainingName?: string;
}

export interface SubstitutionCandidate {
  teacher: Teacher;
  matchType: 'MESMA_MATERIA' | 'MESMA_AREA' | 'DISPONIVEL' | 'COORDENADOR_AREA' | 'EQUIPE_GESTORA';
  tier: 1 | 2 | 3; // 1 = Regular, 2 = Coordenador de Área, 3 = Equipe Gestora
  substitutionsDone: number;
  dailySubsAllocatedToday: number;
  score: number;
}

export interface SubstitutionItem {
  id: string;
  periodId: number;
  periodLabel: string;
  periodTime: string;
  classId: string;
  className: string;
  originalTeacherId: string;
  originalTeacherName: string;
  originalSubject: string;
  substituteTeacherId: string | null;
  substituteTeacherName: string | null;
  matchType?: 'MESMA_MATERIA' | 'MESMA_AREA' | 'DISPONIVEL' | 'COORDENADOR_AREA' | 'EQUIPE_GESTORA' | 'MANUAL' | 'SEM_SUBSTITUTO';
  tier?: 1 | 2 | 3;
  isManualOverride?: boolean;
  notes?: string;
}

export interface DailySubstitutionPlan {
  id: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: DayOfWeek;
  absentTeacherIds: string[];
  substitutions: SubstitutionItem[];
  uncoveredCount: number;
  createdAt: string;
  isOfficial?: boolean;
  officializedAt?: string;
}

export interface HistoryRecord {
  id: string;
  date: string;
  dayOfWeek: DayOfWeek;
  absentTeachersNames: string[];
  substitutions: SubstitutionItem[];
  timestamp: string;
}
