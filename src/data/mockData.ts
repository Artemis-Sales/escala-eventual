import type { Teacher, ClassGroup, PeriodDefinition, ScheduleSlot, DayOfWeek } from '../types';

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

export const INITIAL_TEACHERS: Teacher[] = [
  {
    "id": "t_1",
    "name": "ADRIANA BEGOSSO PINHEIRO",
    "mainSubject": "Educação Física",
    "knowledgeArea": "Linguagens",
    "secondarySubjects": [],
    "totalSubstitutionsCount": 0,
    "color": "#2563EB",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "COORDENADOR_AREA"
  },
  {
    "id": "t_2",
    "name": "ALAIR JORGE CYRINO DO AMARAL",
    "mainSubject": "Matemática",
    "knowledgeArea": "Exatas",
    "secondarySubjects": [
      "Projeto de Vida",
      "Física",
      "Orientação de Estudo – Matem…"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#7C3AED",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_3",
    "name": "ALEXANDRE CUSTODIO DOS SANTOS",
    "mainSubject": "História",
    "knowledgeArea": "Ciências Humanas",
    "secondarySubjects": [
      "Projeto de Vida"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#059669",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "COORDENADOR_AREA"
  },
  {
    "id": "t_4",
    "name": "DANILO",
    "mainSubject": "Modelagem e Desenvolviment…",
    "knowledgeArea": "Parte Diversificada",
    "secondarySubjects": [
      "Redes de Computadores e Seg…",
      "Carreira e Competências para …",
      "Projeto Multidisciplinar",
      "Inteligência Artificial",
      "Lógica e Linguagens de Progr…",
      "Processos de Desenvolviment…"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#D97706",
    "phone": "",
    "isExemptFromSubstitutions": true,
    "exemptReason": "Professor do Curso Técnico (Não realiza substituições)",
    "role": "PROFESSOR"
  },
  {
    "id": "t_5",
    "name": "ELIANE DA SILVA",
    "mainSubject": "Robótica",
    "knowledgeArea": "Parte Diversificada",
    "secondarySubjects": [
      "Orientação de Estudo – Matem…"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#DC2626",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_6",
    "name": "ELISANGELA GREJO AZZELLA",
    "mainSubject": "Química",
    "knowledgeArea": "Ciências da Natureza",
    "secondarySubjects": [
      "Física",
      "Biologia",
      "Práticas Experimentais"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#0891B2",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_7",
    "name": "GISELLE MOREIRA ARAUJO CARVALHO",
    "mainSubject": "Geografia",
    "knowledgeArea": "Ciências Humanas",
    "secondarySubjects": [
      "Atualidades",
      "Projeto de Vida",
      "Aprofundamento de Geografia"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#4F46E5",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_8",
    "name": "LARISSA BATISTA FRAGOSSO",
    "mainSubject": "Língua Portuguesa",
    "knowledgeArea": "Linguagens",
    "secondarySubjects": [
      "Redação e Leitura"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#9333EA",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_9",
    "name": "LEANDRO PARIJIANI DE LUCCA",
    "mainSubject": "Educação Financeira",
    "knowledgeArea": "Parte Diversificada",
    "secondarySubjects": [
      "Matemática",
      "Empreendedorismo"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#2563EB",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_10",
    "name": "LEONELIA DA CONCEICAO DE PONTES FARIA",
    "mainSubject": "Língua Inglesa",
    "knowledgeArea": "Linguagens",
    "secondarySubjects": [],
    "totalSubstitutionsCount": 0,
    "color": "#7C3AED",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_11",
    "name": "MARCIA PEREIRA DA SILVA",
    "mainSubject": "Ciências",
    "knowledgeArea": "Ciências da Natureza",
    "secondarySubjects": [
      "Práticas Experimentais"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#059669",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "COORDENADOR_AREA"
  },
  {
    "id": "t_12",
    "name": "PEDRO MARQUES FERREIRA",
    "mainSubject": "Programação Mobile",
    "knowledgeArea": "Parte Diversificada",
    "secondarySubjects": [
      "Versionamento de Código e Sistemas …",
      "Programação Front-End",
      "Programação Back-End"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#D97706",
    "phone": "",
    "isExemptFromSubstitutions": true,
    "exemptReason": "Professor do Curso Técnico (Não realiza substituições)",
    "role": "PROFESSOR"
  },
  {
    "id": "t_13",
    "name": "REBECA INGRID BRANDAO LUPIANHES",
    "mainSubject": "Tecnologia e Inovação",
    "knowledgeArea": "Parte Diversificada",
    "secondarySubjects": [
      "Ciências",
      "Programação",
      "Projeto de Vida",
      "Práticas Experimentais"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#DC2626",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_14",
    "name": "RITA DE CASSIA ANTUNES",
    "mainSubject": "Orientação de Estudo – Língua…",
    "knowledgeArea": "Linguagens",
    "secondarySubjects": [
      "Redação e Leitura"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#0891B2",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_15",
    "name": "ROODNEY GOMES NAZARETH",
    "mainSubject": "Educação Física",
    "knowledgeArea": "Linguagens",
    "secondarySubjects": [
      "Esporte-Música-Arte"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#4F46E5",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_16",
    "name": "ROSANA CRISTINA DOS SANTOS",
    "mainSubject": "Redação e Leitura",
    "knowledgeArea": "Linguagens",
    "secondarySubjects": [
      "Língua Portuguesa",
      "Língua Inglesa"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#9333EA",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_17",
    "name": "SINDERLANDIA SANTOS DE MORAES",
    "mainSubject": "Ciências",
    "knowledgeArea": "Ciências da Natureza",
    "secondarySubjects": [
      "Práticas Experimentais",
      "Biologia"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#2563EB",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_18",
    "name": "SONIA REGINA BREGNOLLI LEME",
    "mainSubject": "Arte",
    "knowledgeArea": "Linguagens",
    "secondarySubjects": [
      "Esporte-Música-Arte"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#7C3AED",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_19",
    "name": "VANESSA GONÇALVES LIMA DE SANTANA",
    "mainSubject": "Língua Portuguesa",
    "knowledgeArea": "Linguagens",
    "secondarySubjects": [],
    "totalSubstitutionsCount": 0,
    "color": "#059669",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_20",
    "name": "VINICIUS BEZERRA RIBEIRO",
    "mainSubject": "Sociologia",
    "knowledgeArea": "Ciências Humanas",
    "secondarySubjects": [
      "Filosofia",
      "Projeto de Vida",
      "Geografia",
      "Aprofundamento de Filosofia",
      "Aprofundamento de Sociologia"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#D97706",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_21",
    "name": "VINICIUS VIRGILIO MENSATO",
    "mainSubject": "História",
    "knowledgeArea": "Ciências Humanas",
    "secondarySubjects": [
      "Projeto de Vida"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#DC2626",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_22",
    "name": "WESLEY DE JESUS OLIVEIRA",
    "mainSubject": "Matemática",
    "knowledgeArea": "Exatas",
    "secondarySubjects": [
      "Orientação de Estudo – Matem…"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#0891B2",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "t_23",
    "name": "WILLIAM RODRIGUES DA SILVA",
    "mainSubject": "Matemática",
    "knowledgeArea": "Exatas",
    "secondarySubjects": [
      "Orientação de Estudo – Matem…"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#4F46E5",
    "phone": "",
    "isExemptFromSubstitutions": false,
    "role": "PROFESSOR"
  },
  {
    "id": "gestao_1",
    "name": "GENILSON",
    "mainSubject": "Direção Escolar",
    "knowledgeArea": "Gestão Escolar",
    "secondarySubjects": [
      "Gestão Pedagógica",
      "Acompanhamento Pedagógico"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#1E1B4B",
    "phone": "",
    "role": "EQUIPE_GESTORA",
    "isExemptFromSubstitutions": false
  },
  {
    "id": "gestao_2",
    "name": "DÉBORA",
    "mainSubject": "Vice-Direção",
    "knowledgeArea": "Gestão Escolar",
    "secondarySubjects": [
      "Gestão de Convivência",
      "Apoio Pedagógico"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#312E81",
    "phone": "",
    "role": "EQUIPE_GESTORA",
    "isExemptFromSubstitutions": false
  },
  {
    "id": "gestao_3",
    "name": "RENATA",
    "mainSubject": "Coordenação Pedagógica Geral (CGP)",
    "knowledgeArea": "Gestão Escolar",
    "secondarySubjects": [
      "Currículo Paulista",
      "Formação Geral"
    ],
    "totalSubstitutionsCount": 0,
    "color": "#4338CA",
    "phone": "",
    "role": "EQUIPE_GESTORA",
    "isExemptFromSubstitutions": false
  }
];

export const OFFICIAL_SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    "id": "slot_t_1_segunda_1",
    "teacherId": "t_1",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "7B",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_terca_1",
    "teacherId": "t_1",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_quarta_1",
    "teacherId": "t_1",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_quinta_1",
    "teacherId": "t_1",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "7A",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_sexta_1",
    "teacherId": "t_1",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "9B",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_segunda_2",
    "teacherId": "t_1",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_terca_2",
    "teacherId": "t_1",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "8A",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_quarta_2",
    "teacherId": "t_1",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_quinta_2",
    "teacherId": "t_1",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "6B",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_sexta_2",
    "teacherId": "t_1",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "8A",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_segunda_3",
    "teacherId": "t_1",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_terca_3",
    "teacherId": "t_1",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "6A",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_quarta_3",
    "teacherId": "t_1",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_quinta_3",
    "teacherId": "t_1",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "6A",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_sexta_3",
    "teacherId": "t_1",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_segunda_4",
    "teacherId": "t_1",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_terca_4",
    "teacherId": "t_1",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "9B",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_quarta_4",
    "teacherId": "t_1",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_quinta_4",
    "teacherId": "t_1",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "9A",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_sexta_4",
    "teacherId": "t_1",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_segunda_5",
    "teacherId": "t_1",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "6B",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_terca_5",
    "teacherId": "t_1",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "9A",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_quarta_5",
    "teacherId": "t_1",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_quinta_5",
    "teacherId": "t_1",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_sexta_5",
    "teacherId": "t_1",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_segunda_6",
    "teacherId": "t_1",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_terca_6",
    "teacherId": "t_1",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_quarta_6",
    "teacherId": "t_1",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_quinta_6",
    "teacherId": "t_1",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_sexta_6",
    "teacherId": "t_1",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_segunda_7",
    "teacherId": "t_1",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_terca_7",
    "teacherId": "t_1",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "7B",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_quarta_7",
    "teacherId": "t_1",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_quinta_7",
    "teacherId": "t_1",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_sexta_7",
    "teacherId": "t_1",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_segunda_8",
    "teacherId": "t_1",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_terca_8",
    "teacherId": "t_1",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "7A",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_1_quarta_8",
    "teacherId": "t_1",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_quinta_8",
    "teacherId": "t_1",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_sexta_8",
    "teacherId": "t_1",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_segunda_9",
    "teacherId": "t_1",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_terca_9",
    "teacherId": "t_1",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_quarta_9",
    "teacherId": "t_1",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_quinta_9",
    "teacherId": "t_1",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_1_sexta_9",
    "teacherId": "t_1",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_segunda_1",
    "teacherId": "t_2",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_2_terca_1",
    "teacherId": "t_2",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_quarta_1",
    "teacherId": "t_2",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "6B",
    "subject": "Projeto de Vida"
  },
  {
    "id": "slot_t_2_quinta_1",
    "teacherId": "t_2",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_2_sexta_1",
    "teacherId": "t_2",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_segunda_2",
    "teacherId": "t_2",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_2_terca_2",
    "teacherId": "t_2",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_quarta_2",
    "teacherId": "t_2",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_2_quinta_2",
    "teacherId": "t_2",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_2_sexta_2",
    "teacherId": "t_2",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_segunda_3",
    "teacherId": "t_2",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_2_terca_3",
    "teacherId": "t_2",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_2_quarta_3",
    "teacherId": "t_2",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Física"
  },
  {
    "id": "slot_t_2_quinta_3",
    "teacherId": "t_2",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_2_sexta_3",
    "teacherId": "t_2",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_segunda_4",
    "teacherId": "t_2",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_2_terca_4",
    "teacherId": "t_2",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_2_quarta_4",
    "teacherId": "t_2",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Física"
  },
  {
    "id": "slot_t_2_quinta_4",
    "teacherId": "t_2",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_2_sexta_4",
    "teacherId": "t_2",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_segunda_5",
    "teacherId": "t_2",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "6A",
    "subject": "Projeto de Vida"
  },
  {
    "id": "slot_t_2_terca_5",
    "teacherId": "t_2",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "6A",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_2_quarta_5",
    "teacherId": "t_2",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_quinta_5",
    "teacherId": "t_2",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "6B",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_2_sexta_5",
    "teacherId": "t_2",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_segunda_6",
    "teacherId": "t_2",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_2_terca_6",
    "teacherId": "t_2",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "6A",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_2_quarta_6",
    "teacherId": "t_2",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_quinta_6",
    "teacherId": "t_2",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "6B",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_2_sexta_6",
    "teacherId": "t_2",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_segunda_7",
    "teacherId": "t_2",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Física"
  },
  {
    "id": "slot_t_2_terca_7",
    "teacherId": "t_2",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_2_quarta_7",
    "teacherId": "t_2",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "7B",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_2_quinta_7",
    "teacherId": "t_2",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_sexta_7",
    "teacherId": "t_2",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_segunda_8",
    "teacherId": "t_2",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Física"
  },
  {
    "id": "slot_t_2_terca_8",
    "teacherId": "t_2",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_quarta_8",
    "teacherId": "t_2",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_quinta_8",
    "teacherId": "t_2",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "7A",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_2_sexta_8",
    "teacherId": "t_2",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_segunda_9",
    "teacherId": "t_2",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_terca_9",
    "teacherId": "t_2",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_quarta_9",
    "teacherId": "t_2",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_quinta_9",
    "teacherId": "t_2",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_2_sexta_9",
    "teacherId": "t_2",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_3_segunda_1",
    "teacherId": "t_3",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "História"
  },
  {
    "id": "slot_t_3_terca_1",
    "teacherId": "t_3",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_quarta_1",
    "teacherId": "t_3",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_quinta_1",
    "teacherId": "t_3",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_sexta_1",
    "teacherId": "t_3",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_segunda_2",
    "teacherId": "t_3",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "História"
  },
  {
    "id": "slot_t_3_terca_2",
    "teacherId": "t_3",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_quarta_2",
    "teacherId": "t_3",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_quinta_2",
    "teacherId": "t_3",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_sexta_2",
    "teacherId": "t_3",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_segunda_3",
    "teacherId": "t_3",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "História"
  },
  {
    "id": "slot_t_3_terca_3",
    "teacherId": "t_3",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_quarta_3",
    "teacherId": "t_3",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_quinta_3",
    "teacherId": "t_3",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "História"
  },
  {
    "id": "slot_t_3_sexta_3",
    "teacherId": "t_3",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_segunda_4",
    "teacherId": "t_3",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_terca_4",
    "teacherId": "t_3",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "História"
  },
  {
    "id": "slot_t_3_quarta_4",
    "teacherId": "t_3",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_quinta_4",
    "teacherId": "t_3",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "História"
  },
  {
    "id": "slot_t_3_sexta_4",
    "teacherId": "t_3",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_segunda_5",
    "teacherId": "t_3",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_terca_5",
    "teacherId": "t_3",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "História"
  },
  {
    "id": "slot_t_3_quarta_5",
    "teacherId": "t_3",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "História"
  },
  {
    "id": "slot_t_3_quinta_5",
    "teacherId": "t_3",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_sexta_5",
    "teacherId": "t_3",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_segunda_6",
    "teacherId": "t_3",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_terca_6",
    "teacherId": "t_3",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Projeto de Vida"
  },
  {
    "id": "slot_t_3_quarta_6",
    "teacherId": "t_3",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "História"
  },
  {
    "id": "slot_t_3_quinta_6",
    "teacherId": "t_3",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_sexta_6",
    "teacherId": "t_3",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_segunda_7",
    "teacherId": "t_3",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_terca_7",
    "teacherId": "t_3",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "História"
  },
  {
    "id": "slot_t_3_quarta_7",
    "teacherId": "t_3",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_quinta_7",
    "teacherId": "t_3",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "História"
  },
  {
    "id": "slot_t_3_sexta_7",
    "teacherId": "t_3",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_segunda_8",
    "teacherId": "t_3",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_terca_8",
    "teacherId": "t_3",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Projeto de Vida"
  },
  {
    "id": "slot_t_3_quarta_8",
    "teacherId": "t_3",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_quinta_8",
    "teacherId": "t_3",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "História"
  },
  {
    "id": "slot_t_3_sexta_8",
    "teacherId": "t_3",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_segunda_9",
    "teacherId": "t_3",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_terca_9",
    "teacherId": "t_3",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_quarta_9",
    "teacherId": "t_3",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_quinta_9",
    "teacherId": "t_3",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_3_sexta_9",
    "teacherId": "t_3",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_segunda_1",
    "teacherId": "t_4",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Modelagem e Desenvolviment…"
  },
  {
    "id": "slot_t_4_terca_1",
    "teacherId": "t_4",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_quarta_1",
    "teacherId": "t_4",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Redes de Computadores e Seg…"
  },
  {
    "id": "slot_t_4_quinta_1",
    "teacherId": "t_4",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Carreira e Competências para …"
  },
  {
    "id": "slot_t_4_sexta_1",
    "teacherId": "t_4",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_segunda_2",
    "teacherId": "t_4",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Modelagem e Desenvolviment…"
  },
  {
    "id": "slot_t_4_terca_2",
    "teacherId": "t_4",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Carreira e Competências para …"
  },
  {
    "id": "slot_t_4_quarta_2",
    "teacherId": "t_4",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_quinta_2",
    "teacherId": "t_4",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Carreira e Competências para …"
  },
  {
    "id": "slot_t_4_sexta_2",
    "teacherId": "t_4",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_segunda_3",
    "teacherId": "t_4",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_terca_3",
    "teacherId": "t_4",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Projeto Multidisciplinar"
  },
  {
    "id": "slot_t_4_quarta_3",
    "teacherId": "t_4",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_quinta_3",
    "teacherId": "t_4",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Redes de Computadores e Seg…"
  },
  {
    "id": "slot_t_4_sexta_3",
    "teacherId": "t_4",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_segunda_4",
    "teacherId": "t_4",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_terca_4",
    "teacherId": "t_4",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Inteligência Artificial"
  },
  {
    "id": "slot_t_4_quarta_4",
    "teacherId": "t_4",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_quinta_4",
    "teacherId": "t_4",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Inteligência Artificial"
  },
  {
    "id": "slot_t_4_sexta_4",
    "teacherId": "t_4",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Redes de Computadores e Seg…"
  },
  {
    "id": "slot_t_4_segunda_5",
    "teacherId": "t_4",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Lógica e Linguagens de Progr…"
  },
  {
    "id": "slot_t_4_terca_5",
    "teacherId": "t_4",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_quarta_5",
    "teacherId": "t_4",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Lógica e Linguagens de Progr…"
  },
  {
    "id": "slot_t_4_quinta_5",
    "teacherId": "t_4",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Inteligência Artificial"
  },
  {
    "id": "slot_t_4_sexta_5",
    "teacherId": "t_4",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Projeto Multidisciplinar"
  },
  {
    "id": "slot_t_4_segunda_6",
    "teacherId": "t_4",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Lógica e Linguagens de Progr…"
  },
  {
    "id": "slot_t_4_terca_6",
    "teacherId": "t_4",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_quarta_6",
    "teacherId": "t_4",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Lógica e Linguagens de Progr…"
  },
  {
    "id": "slot_t_4_quinta_6",
    "teacherId": "t_4",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Processos de Desenvolviment…"
  },
  {
    "id": "slot_t_4_sexta_6",
    "teacherId": "t_4",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Projeto Multidisciplinar"
  },
  {
    "id": "slot_t_4_segunda_7",
    "teacherId": "t_4",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Processos de Desenvolviment…"
  },
  {
    "id": "slot_t_4_terca_7",
    "teacherId": "t_4",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_quarta_7",
    "teacherId": "t_4",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_quinta_7",
    "teacherId": "t_4",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_sexta_7",
    "teacherId": "t_4",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Modelagem e Desenvolviment…"
  },
  {
    "id": "slot_t_4_segunda_8",
    "teacherId": "t_4",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Processos de Desenvolviment…"
  },
  {
    "id": "slot_t_4_terca_8",
    "teacherId": "t_4",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_quarta_8",
    "teacherId": "t_4",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_quinta_8",
    "teacherId": "t_4",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_sexta_8",
    "teacherId": "t_4",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Modelagem e Desenvolviment…"
  },
  {
    "id": "slot_t_4_segunda_9",
    "teacherId": "t_4",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_terca_9",
    "teacherId": "t_4",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_quarta_9",
    "teacherId": "t_4",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_quinta_9",
    "teacherId": "t_4",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_4_sexta_9",
    "teacherId": "t_4",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_segunda_1",
    "teacherId": "t_5",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "9B",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_terca_1",
    "teacherId": "t_5",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "7A",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_quarta_1",
    "teacherId": "t_5",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_quinta_1",
    "teacherId": "t_5",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "9A",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_sexta_1",
    "teacherId": "t_5",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "6B",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_segunda_2",
    "teacherId": "t_5",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "9B",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_terca_2",
    "teacherId": "t_5",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "7A",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_quarta_2",
    "teacherId": "t_5",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_quinta_2",
    "teacherId": "t_5",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "9A",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_sexta_2",
    "teacherId": "t_5",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "6B",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_segunda_3",
    "teacherId": "t_5",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "8A",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_terca_3",
    "teacherId": "t_5",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_quarta_3",
    "teacherId": "t_5",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_quinta_3",
    "teacherId": "t_5",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "8B",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_sexta_3",
    "teacherId": "t_5",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_segunda_4",
    "teacherId": "t_5",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "8A",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_terca_4",
    "teacherId": "t_5",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_quarta_4",
    "teacherId": "t_5",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_quinta_4",
    "teacherId": "t_5",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "8B",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_sexta_4",
    "teacherId": "t_5",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_segunda_5",
    "teacherId": "t_5",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_terca_5",
    "teacherId": "t_5",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_quarta_5",
    "teacherId": "t_5",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_quinta_5",
    "teacherId": "t_5",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_sexta_5",
    "teacherId": "t_5",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_segunda_6",
    "teacherId": "t_5",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_terca_6",
    "teacherId": "t_5",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_quarta_6",
    "teacherId": "t_5",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_quinta_6",
    "teacherId": "t_5",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_sexta_6",
    "teacherId": "t_5",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_segunda_7",
    "teacherId": "t_5",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "7B",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_terca_7",
    "teacherId": "t_5",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_quarta_7",
    "teacherId": "t_5",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "8A",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_5_quinta_7",
    "teacherId": "t_5",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "6A",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_sexta_7",
    "teacherId": "t_5",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_segunda_8",
    "teacherId": "t_5",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "7B",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_terca_8",
    "teacherId": "t_5",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "8B",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_5_quarta_8",
    "teacherId": "t_5",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_quinta_8",
    "teacherId": "t_5",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "6A",
    "subject": "Robótica"
  },
  {
    "id": "slot_t_5_sexta_8",
    "teacherId": "t_5",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_segunda_9",
    "teacherId": "t_5",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_terca_9",
    "teacherId": "t_5",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_quarta_9",
    "teacherId": "t_5",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_quinta_9",
    "teacherId": "t_5",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_5_sexta_9",
    "teacherId": "t_5",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_segunda_1",
    "teacherId": "t_6",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Química"
  },
  {
    "id": "slot_t_6_terca_1",
    "teacherId": "t_6",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Física"
  },
  {
    "id": "slot_t_6_quarta_1",
    "teacherId": "t_6",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Química"
  },
  {
    "id": "slot_t_6_quinta_1",
    "teacherId": "t_6",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Biologia"
  },
  {
    "id": "slot_t_6_sexta_1",
    "teacherId": "t_6",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_segunda_2",
    "teacherId": "t_6",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Química"
  },
  {
    "id": "slot_t_6_terca_2",
    "teacherId": "t_6",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Física"
  },
  {
    "id": "slot_t_6_quarta_2",
    "teacherId": "t_6",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Química"
  },
  {
    "id": "slot_t_6_quinta_2",
    "teacherId": "t_6",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Biologia"
  },
  {
    "id": "slot_t_6_sexta_2",
    "teacherId": "t_6",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_segunda_3",
    "teacherId": "t_6",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_terca_3",
    "teacherId": "t_6",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_quarta_3",
    "teacherId": "t_6",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_quinta_3",
    "teacherId": "t_6",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_6_sexta_3",
    "teacherId": "t_6",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_segunda_4",
    "teacherId": "t_6",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Física"
  },
  {
    "id": "slot_t_6_terca_4",
    "teacherId": "t_6",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_6_quarta_4",
    "teacherId": "t_6",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_quinta_4",
    "teacherId": "t_6",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_6_sexta_4",
    "teacherId": "t_6",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_segunda_5",
    "teacherId": "t_6",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_6_terca_5",
    "teacherId": "t_6",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Física"
  },
  {
    "id": "slot_t_6_quarta_5",
    "teacherId": "t_6",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_quinta_5",
    "teacherId": "t_6",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_sexta_5",
    "teacherId": "t_6",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_segunda_6",
    "teacherId": "t_6",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_terca_6",
    "teacherId": "t_6",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Biologia"
  },
  {
    "id": "slot_t_6_quarta_6",
    "teacherId": "t_6",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_6_quinta_6",
    "teacherId": "t_6",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_sexta_6",
    "teacherId": "t_6",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_segunda_7",
    "teacherId": "t_6",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Química"
  },
  {
    "id": "slot_t_6_terca_7",
    "teacherId": "t_6",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_quarta_7",
    "teacherId": "t_6",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Biologia"
  },
  {
    "id": "slot_t_6_quinta_7",
    "teacherId": "t_6",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Química"
  },
  {
    "id": "slot_t_6_sexta_7",
    "teacherId": "t_6",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Física"
  },
  {
    "id": "slot_t_6_segunda_8",
    "teacherId": "t_6",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Química"
  },
  {
    "id": "slot_t_6_terca_8",
    "teacherId": "t_6",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Física"
  },
  {
    "id": "slot_t_6_quarta_8",
    "teacherId": "t_6",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_quinta_8",
    "teacherId": "t_6",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Química"
  },
  {
    "id": "slot_t_6_sexta_8",
    "teacherId": "t_6",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Física"
  },
  {
    "id": "slot_t_6_segunda_9",
    "teacherId": "t_6",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_terca_9",
    "teacherId": "t_6",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_quarta_9",
    "teacherId": "t_6",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_quinta_9",
    "teacherId": "t_6",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_6_sexta_9",
    "teacherId": "t_6",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Física"
  },
  {
    "id": "slot_t_7_segunda_1",
    "teacherId": "t_7",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_terca_1",
    "teacherId": "t_7",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Atualidades"
  },
  {
    "id": "slot_t_7_quarta_1",
    "teacherId": "t_7",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "8A",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_quinta_1",
    "teacherId": "t_7",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_sexta_1",
    "teacherId": "t_7",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_segunda_2",
    "teacherId": "t_7",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_terca_2",
    "teacherId": "t_7",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Atualidades"
  },
  {
    "id": "slot_t_7_quarta_2",
    "teacherId": "t_7",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "9B",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_quinta_2",
    "teacherId": "t_7",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_sexta_2",
    "teacherId": "t_7",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_segunda_3",
    "teacherId": "t_7",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_terca_3",
    "teacherId": "t_7",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_quarta_3",
    "teacherId": "t_7",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "8B",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_quinta_3",
    "teacherId": "t_7",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_sexta_3",
    "teacherId": "t_7",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_segunda_4",
    "teacherId": "t_7",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_terca_4",
    "teacherId": "t_7",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "8B",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_quarta_4",
    "teacherId": "t_7",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "9A",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_quinta_4",
    "teacherId": "t_7",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_sexta_4",
    "teacherId": "t_7",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_segunda_5",
    "teacherId": "t_7",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_terca_5",
    "teacherId": "t_7",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_quarta_5",
    "teacherId": "t_7",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_quinta_5",
    "teacherId": "t_7",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "8A",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_sexta_5",
    "teacherId": "t_7",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_segunda_6",
    "teacherId": "t_7",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "8A",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_terca_6",
    "teacherId": "t_7",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "9A",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_quarta_6",
    "teacherId": "t_7",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "9A",
    "subject": "Projeto de Vida"
  },
  {
    "id": "slot_t_7_quinta_6",
    "teacherId": "t_7",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "9B",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_sexta_6",
    "teacherId": "t_7",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_segunda_7",
    "teacherId": "t_7",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "9B",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_terca_7",
    "teacherId": "t_7",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "9A",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_quarta_7",
    "teacherId": "t_7",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "9B",
    "subject": "Projeto de Vida"
  },
  {
    "id": "slot_t_7_quinta_7",
    "teacherId": "t_7",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_sexta_7",
    "teacherId": "t_7",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_segunda_8",
    "teacherId": "t_7",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "8B",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_terca_8",
    "teacherId": "t_7",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_quarta_8",
    "teacherId": "t_7",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_quinta_8",
    "teacherId": "t_7",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_7_sexta_8",
    "teacherId": "t_7",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Aprofundamento de Geografia"
  },
  {
    "id": "slot_t_7_segunda_9",
    "teacherId": "t_7",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_terca_9",
    "teacherId": "t_7",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_quarta_9",
    "teacherId": "t_7",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_quinta_9",
    "teacherId": "t_7",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_7_sexta_9",
    "teacherId": "t_7",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Aprofundamento de Geografia"
  },
  {
    "id": "slot_t_8_segunda_1",
    "teacherId": "t_8",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_terca_1",
    "teacherId": "t_8",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_quarta_1",
    "teacherId": "t_8",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_quinta_1",
    "teacherId": "t_8",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_sexta_1",
    "teacherId": "t_8",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_segunda_2",
    "teacherId": "t_8",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_terca_2",
    "teacherId": "t_8",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_quarta_2",
    "teacherId": "t_8",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_quinta_2",
    "teacherId": "t_8",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_sexta_2",
    "teacherId": "t_8",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_segunda_3",
    "teacherId": "t_8",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_terca_3",
    "teacherId": "t_8",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "9A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_quarta_3",
    "teacherId": "t_8",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "9B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_quinta_3",
    "teacherId": "t_8",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_sexta_3",
    "teacherId": "t_8",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "9B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_segunda_4",
    "teacherId": "t_8",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_terca_4",
    "teacherId": "t_8",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "9A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_quarta_4",
    "teacherId": "t_8",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "9B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_quinta_4",
    "teacherId": "t_8",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_sexta_4",
    "teacherId": "t_8",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "9B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_segunda_5",
    "teacherId": "t_8",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_8_terca_5",
    "teacherId": "t_8",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "9B",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_8_quarta_5",
    "teacherId": "t_8",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "9A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_8_quinta_5",
    "teacherId": "t_8",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_sexta_5",
    "teacherId": "t_8",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_segunda_6",
    "teacherId": "t_8",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_8_terca_6",
    "teacherId": "t_8",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "9B",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_8_quarta_6",
    "teacherId": "t_8",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_quinta_6",
    "teacherId": "t_8",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_sexta_6",
    "teacherId": "t_8",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_segunda_7",
    "teacherId": "t_8",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "9A",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_8_terca_7",
    "teacherId": "t_8",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_8_quarta_7",
    "teacherId": "t_8",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_quinta_7",
    "teacherId": "t_8",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_sexta_7",
    "teacherId": "t_8",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_8_segunda_8",
    "teacherId": "t_8",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "9A",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_8_terca_8",
    "teacherId": "t_8",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_8_quarta_8",
    "teacherId": "t_8",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_quinta_8",
    "teacherId": "t_8",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_sexta_8",
    "teacherId": "t_8",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_8_segunda_9",
    "teacherId": "t_8",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_terca_9",
    "teacherId": "t_8",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_quarta_9",
    "teacherId": "t_8",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_quinta_9",
    "teacherId": "t_8",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_8_sexta_9",
    "teacherId": "t_8",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "9A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_9_segunda_1",
    "teacherId": "t_9",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_terca_1",
    "teacherId": "t_9",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "7B",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_quarta_1",
    "teacherId": "t_9",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "7A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_9_quinta_1",
    "teacherId": "t_9",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_sexta_1",
    "teacherId": "t_9",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_segunda_2",
    "teacherId": "t_9",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_terca_2",
    "teacherId": "t_9",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "7B",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_quarta_2",
    "teacherId": "t_9",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "7A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_9_quinta_2",
    "teacherId": "t_9",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_sexta_2",
    "teacherId": "t_9",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_segunda_3",
    "teacherId": "t_9",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_terca_3",
    "teacherId": "t_9",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "8B",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_quarta_3",
    "teacherId": "t_9",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_quinta_3",
    "teacherId": "t_9",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_sexta_3",
    "teacherId": "t_9",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_9_segunda_4",
    "teacherId": "t_9",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "7A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_9_terca_4",
    "teacherId": "t_9",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_quarta_4",
    "teacherId": "t_9",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_9_quinta_4",
    "teacherId": "t_9",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_sexta_4",
    "teacherId": "t_9",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_9_segunda_5",
    "teacherId": "t_9",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "8B",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_terca_5",
    "teacherId": "t_9",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "8A",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_quarta_5",
    "teacherId": "t_9",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_9_quinta_5",
    "teacherId": "t_9",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_sexta_5",
    "teacherId": "t_9",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_segunda_6",
    "teacherId": "t_9",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_terca_6",
    "teacherId": "t_9",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "8A",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_quarta_6",
    "teacherId": "t_9",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_quinta_6",
    "teacherId": "t_9",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "7A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_9_sexta_6",
    "teacherId": "t_9",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_segunda_7",
    "teacherId": "t_9",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_terca_7",
    "teacherId": "t_9",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Empreendedorismo"
  },
  {
    "id": "slot_t_9_quarta_7",
    "teacherId": "t_9",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_quinta_7",
    "teacherId": "t_9",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_sexta_7",
    "teacherId": "t_9",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "7A",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_segunda_8",
    "teacherId": "t_9",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_terca_8",
    "teacherId": "t_9",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_quarta_8",
    "teacherId": "t_9",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_quinta_8",
    "teacherId": "t_9",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_sexta_8",
    "teacherId": "t_9",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "7A",
    "subject": "Educação Financeira"
  },
  {
    "id": "slot_t_9_segunda_9",
    "teacherId": "t_9",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_terca_9",
    "teacherId": "t_9",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_quarta_9",
    "teacherId": "t_9",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_quinta_9",
    "teacherId": "t_9",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_9_sexta_9",
    "teacherId": "t_9",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "7A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_10_segunda_1",
    "teacherId": "t_10",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "8A",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_terca_1",
    "teacherId": "t_10",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_quarta_1",
    "teacherId": "t_10",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "7B",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_quinta_1",
    "teacherId": "t_10",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "9B",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_sexta_1",
    "teacherId": "t_10",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_segunda_2",
    "teacherId": "t_10",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "8A",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_terca_2",
    "teacherId": "t_10",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_quarta_2",
    "teacherId": "t_10",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "7B",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_quinta_2",
    "teacherId": "t_10",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "9B",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_sexta_2",
    "teacherId": "t_10",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_segunda_3",
    "teacherId": "t_10",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_terca_3",
    "teacherId": "t_10",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_quarta_3",
    "teacherId": "t_10",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_quinta_3",
    "teacherId": "t_10",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_sexta_3",
    "teacherId": "t_10",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "7A",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_segunda_4",
    "teacherId": "t_10",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_terca_4",
    "teacherId": "t_10",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_quarta_4",
    "teacherId": "t_10",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "8B",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_quinta_4",
    "teacherId": "t_10",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_sexta_4",
    "teacherId": "t_10",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "7A",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_segunda_5",
    "teacherId": "t_10",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "9A",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_terca_5",
    "teacherId": "t_10",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_quarta_5",
    "teacherId": "t_10",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "8B",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_quinta_5",
    "teacherId": "t_10",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_sexta_5",
    "teacherId": "t_10",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_segunda_6",
    "teacherId": "t_10",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "9A",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_terca_6",
    "teacherId": "t_10",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_quarta_6",
    "teacherId": "t_10",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_quinta_6",
    "teacherId": "t_10",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_sexta_6",
    "teacherId": "t_10",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_segunda_7",
    "teacherId": "t_10",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_terca_7",
    "teacherId": "t_10",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_quarta_7",
    "teacherId": "t_10",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_quinta_7",
    "teacherId": "t_10",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_sexta_7",
    "teacherId": "t_10",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_segunda_8",
    "teacherId": "t_10",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_terca_8",
    "teacherId": "t_10",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_10_quarta_8",
    "teacherId": "t_10",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_quinta_8",
    "teacherId": "t_10",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_sexta_8",
    "teacherId": "t_10",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_segunda_9",
    "teacherId": "t_10",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_terca_9",
    "teacherId": "t_10",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_quarta_9",
    "teacherId": "t_10",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_quinta_9",
    "teacherId": "t_10",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_10_sexta_9",
    "teacherId": "t_10",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_11_segunda_1",
    "teacherId": "t_11",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "7A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_11_terca_1",
    "teacherId": "t_11",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "6A",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_11_quarta_1",
    "teacherId": "t_11",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quinta_1",
    "teacherId": "t_11",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_sexta_1",
    "teacherId": "t_11",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_segunda_2",
    "teacherId": "t_11",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "6B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_11_terca_2",
    "teacherId": "t_11",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "6B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_11_quarta_2",
    "teacherId": "t_11",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quinta_2",
    "teacherId": "t_11",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_sexta_2",
    "teacherId": "t_11",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_segunda_3",
    "teacherId": "t_11",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "6A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_11_terca_3",
    "teacherId": "t_11",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quarta_3",
    "teacherId": "t_11",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quinta_3",
    "teacherId": "t_11",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "7A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_11_sexta_3",
    "teacherId": "t_11",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_segunda_4",
    "teacherId": "t_11",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "6A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_11_terca_4",
    "teacherId": "t_11",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quarta_4",
    "teacherId": "t_11",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quinta_4",
    "teacherId": "t_11",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_sexta_4",
    "teacherId": "t_11",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_segunda_5",
    "teacherId": "t_11",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_terca_5",
    "teacherId": "t_11",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quarta_5",
    "teacherId": "t_11",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "7A",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_11_quinta_5",
    "teacherId": "t_11",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "7A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_11_sexta_5",
    "teacherId": "t_11",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_segunda_6",
    "teacherId": "t_11",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_terca_6",
    "teacherId": "t_11",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quarta_6",
    "teacherId": "t_11",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quinta_6",
    "teacherId": "t_11",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "6A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_11_sexta_6",
    "teacherId": "t_11",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_segunda_7",
    "teacherId": "t_11",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_terca_7",
    "teacherId": "t_11",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quarta_7",
    "teacherId": "t_11",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quinta_7",
    "teacherId": "t_11",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "6B",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_11_sexta_7",
    "teacherId": "t_11",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_segunda_8",
    "teacherId": "t_11",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_terca_8",
    "teacherId": "t_11",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quarta_8",
    "teacherId": "t_11",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quinta_8",
    "teacherId": "t_11",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "6B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_11_sexta_8",
    "teacherId": "t_11",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_segunda_9",
    "teacherId": "t_11",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_terca_9",
    "teacherId": "t_11",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quarta_9",
    "teacherId": "t_11",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_quinta_9",
    "teacherId": "t_11",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_11_sexta_9",
    "teacherId": "t_11",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_segunda_1",
    "teacherId": "t_12",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_terca_1",
    "teacherId": "t_12",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_quarta_1",
    "teacherId": "t_12",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Programação Mobile"
  },
  {
    "id": "slot_t_12_quinta_1",
    "teacherId": "t_12",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_sexta_1",
    "teacherId": "t_12",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Versionamento de Código e Sistemas …"
  },
  {
    "id": "slot_t_12_segunda_2",
    "teacherId": "t_12",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_terca_2",
    "teacherId": "t_12",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_quarta_2",
    "teacherId": "t_12",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Programação Mobile"
  },
  {
    "id": "slot_t_12_quinta_2",
    "teacherId": "t_12",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_sexta_2",
    "teacherId": "t_12",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Programação Mobile"
  },
  {
    "id": "slot_t_12_segunda_3",
    "teacherId": "t_12",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_terca_3",
    "teacherId": "t_12",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_quarta_3",
    "teacherId": "t_12",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Versionamento de Código e Sistemas …"
  },
  {
    "id": "slot_t_12_quinta_3",
    "teacherId": "t_12",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_sexta_3",
    "teacherId": "t_12",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Programação Mobile"
  },
  {
    "id": "slot_t_12_segunda_4",
    "teacherId": "t_12",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_terca_4",
    "teacherId": "t_12",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_quarta_4",
    "teacherId": "t_12",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Versionamento de Código e Sistemas …"
  },
  {
    "id": "slot_t_12_quinta_4",
    "teacherId": "t_12",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_sexta_4",
    "teacherId": "t_12",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Programação Front-End"
  },
  {
    "id": "slot_t_12_segunda_5",
    "teacherId": "t_12",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_terca_5",
    "teacherId": "t_12",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Programação Back-End"
  },
  {
    "id": "slot_t_12_quarta_5",
    "teacherId": "t_12",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Programação Front-End"
  },
  {
    "id": "slot_t_12_quinta_5",
    "teacherId": "t_12",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_sexta_5",
    "teacherId": "t_12",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_segunda_6",
    "teacherId": "t_12",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_terca_6",
    "teacherId": "t_12",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Programação Back-End"
  },
  {
    "id": "slot_t_12_quarta_6",
    "teacherId": "t_12",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Programação Front-End"
  },
  {
    "id": "slot_t_12_quinta_6",
    "teacherId": "t_12",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_sexta_6",
    "teacherId": "t_12",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_segunda_7",
    "teacherId": "t_12",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_terca_7",
    "teacherId": "t_12",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_quarta_7",
    "teacherId": "t_12",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_quinta_7",
    "teacherId": "t_12",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_sexta_7",
    "teacherId": "t_12",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_segunda_8",
    "teacherId": "t_12",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_terca_8",
    "teacherId": "t_12",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_quarta_8",
    "teacherId": "t_12",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_quinta_8",
    "teacherId": "t_12",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Programação Back-End"
  },
  {
    "id": "slot_t_12_sexta_8",
    "teacherId": "t_12",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_segunda_9",
    "teacherId": "t_12",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_terca_9",
    "teacherId": "t_12",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_quarta_9",
    "teacherId": "t_12",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_quinta_9",
    "teacherId": "t_12",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_12_sexta_9",
    "teacherId": "t_12",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_segunda_1",
    "teacherId": "t_13",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_terca_1",
    "teacherId": "t_13",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_quarta_1",
    "teacherId": "t_13",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_quinta_1",
    "teacherId": "t_13",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "8A",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_sexta_1",
    "teacherId": "t_13",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "7B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_13_segunda_2",
    "teacherId": "t_13",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_terca_2",
    "teacherId": "t_13",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_quarta_2",
    "teacherId": "t_13",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_quinta_2",
    "teacherId": "t_13",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "8A",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_sexta_2",
    "teacherId": "t_13",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "7B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_13_segunda_3",
    "teacherId": "t_13",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_terca_3",
    "teacherId": "t_13",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "7A",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_quarta_3",
    "teacherId": "t_13",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "6B",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_quinta_3",
    "teacherId": "t_13",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "9B",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_sexta_3",
    "teacherId": "t_13",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "6A",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_segunda_4",
    "teacherId": "t_13",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_terca_4",
    "teacherId": "t_13",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "7A",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_quarta_4",
    "teacherId": "t_13",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "6B",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_quinta_4",
    "teacherId": "t_13",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "9B",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_sexta_4",
    "teacherId": "t_13",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "6A",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_segunda_5",
    "teacherId": "t_13",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Programação"
  },
  {
    "id": "slot_t_13_terca_5",
    "teacherId": "t_13",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_quarta_5",
    "teacherId": "t_13",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "7B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_13_quinta_5",
    "teacherId": "t_13",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "7B",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_sexta_5",
    "teacherId": "t_13",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_segunda_6",
    "teacherId": "t_13",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Programação"
  },
  {
    "id": "slot_t_13_terca_6",
    "teacherId": "t_13",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_quarta_6",
    "teacherId": "t_13",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "7B",
    "subject": "Projeto de Vida"
  },
  {
    "id": "slot_t_13_quinta_6",
    "teacherId": "t_13",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "7B",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_sexta_6",
    "teacherId": "t_13",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_segunda_7",
    "teacherId": "t_13",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_terca_7",
    "teacherId": "t_13",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_quarta_7",
    "teacherId": "t_13",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "7A",
    "subject": "Projeto de Vida"
  },
  {
    "id": "slot_t_13_quinta_7",
    "teacherId": "t_13",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "8B",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_sexta_7",
    "teacherId": "t_13",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "9A",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_segunda_8",
    "teacherId": "t_13",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_terca_8",
    "teacherId": "t_13",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_quarta_8",
    "teacherId": "t_13",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_quinta_8",
    "teacherId": "t_13",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "8B",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_sexta_8",
    "teacherId": "t_13",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "9A",
    "subject": "Tecnologia e Inovação"
  },
  {
    "id": "slot_t_13_segunda_9",
    "teacherId": "t_13",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_terca_9",
    "teacherId": "t_13",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_quarta_9",
    "teacherId": "t_13",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_quinta_9",
    "teacherId": "t_13",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_13_sexta_9",
    "teacherId": "t_13",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "7B",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_14_segunda_1",
    "teacherId": "t_14",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_terca_1",
    "teacherId": "t_14",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "9A",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_quarta_1",
    "teacherId": "t_14",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_quinta_1",
    "teacherId": "t_14",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_sexta_1",
    "teacherId": "t_14",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_14_segunda_2",
    "teacherId": "t_14",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_terca_2",
    "teacherId": "t_14",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "9A",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_quarta_2",
    "teacherId": "t_14",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_quinta_2",
    "teacherId": "t_14",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_sexta_2",
    "teacherId": "t_14",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_14_segunda_3",
    "teacherId": "t_14",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_terca_3",
    "teacherId": "t_14",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_quarta_3",
    "teacherId": "t_14",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "7B",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_14_quinta_3",
    "teacherId": "t_14",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_sexta_3",
    "teacherId": "t_14",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "7B",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_segunda_4",
    "teacherId": "t_14",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_terca_4",
    "teacherId": "t_14",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_quarta_4",
    "teacherId": "t_14",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "7B",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_14_quinta_4",
    "teacherId": "t_14",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_sexta_4",
    "teacherId": "t_14",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_segunda_5",
    "teacherId": "t_14",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "9B",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_terca_5",
    "teacherId": "t_14",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "8B",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_14_quarta_5",
    "teacherId": "t_14",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "6B",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_quinta_5",
    "teacherId": "t_14",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_sexta_5",
    "teacherId": "t_14",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_segunda_6",
    "teacherId": "t_14",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "9B",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_terca_6",
    "teacherId": "t_14",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "8B",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_14_quarta_6",
    "teacherId": "t_14",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "6B",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_quinta_6",
    "teacherId": "t_14",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_sexta_6",
    "teacherId": "t_14",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_segunda_7",
    "teacherId": "t_14",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "8A",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_14_terca_7",
    "teacherId": "t_14",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "6A",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_quarta_7",
    "teacherId": "t_14",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_quinta_7",
    "teacherId": "t_14",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "7A",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_sexta_7",
    "teacherId": "t_14",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "8A",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_segunda_8",
    "teacherId": "t_14",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "8A",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_14_terca_8",
    "teacherId": "t_14",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "6A",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_quarta_8",
    "teacherId": "t_14",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_quinta_8",
    "teacherId": "t_14",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_sexta_8",
    "teacherId": "t_14",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_14_segunda_9",
    "teacherId": "t_14",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_terca_9",
    "teacherId": "t_14",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_quarta_9",
    "teacherId": "t_14",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_quinta_9",
    "teacherId": "t_14",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_14_sexta_9",
    "teacherId": "t_14",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "8B",
    "subject": "Orientação de Estudo – Língua…"
  },
  {
    "id": "slot_t_15_segunda_1",
    "teacherId": "t_15",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_terca_1",
    "teacherId": "t_15",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_15_quarta_1",
    "teacherId": "t_15",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "8B",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_quinta_1",
    "teacherId": "t_15",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "7B",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_sexta_1",
    "teacherId": "t_15",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_segunda_2",
    "teacherId": "t_15",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "7A",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_terca_2",
    "teacherId": "t_15",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_quarta_2",
    "teacherId": "t_15",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "8B",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_quinta_2",
    "teacherId": "t_15",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "7B",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_sexta_2",
    "teacherId": "t_15",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_segunda_3",
    "teacherId": "t_15",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "7A",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_terca_3",
    "teacherId": "t_15",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_quarta_3",
    "teacherId": "t_15",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_15_quinta_3",
    "teacherId": "t_15",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "8A",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_sexta_3",
    "teacherId": "t_15",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_15_segunda_4",
    "teacherId": "t_15",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_terca_4",
    "teacherId": "t_15",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_quarta_4",
    "teacherId": "t_15",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_15_quinta_4",
    "teacherId": "t_15",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "8A",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_sexta_4",
    "teacherId": "t_15",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "8B",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_15_segunda_5",
    "teacherId": "t_15",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_terca_5",
    "teacherId": "t_15",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_quarta_5",
    "teacherId": "t_15",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "6A",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_quinta_5",
    "teacherId": "t_15",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_15_sexta_5",
    "teacherId": "t_15",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_segunda_6",
    "teacherId": "t_15",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_terca_6",
    "teacherId": "t_15",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_quarta_6",
    "teacherId": "t_15",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "6A",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_quinta_6",
    "teacherId": "t_15",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "8B",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_15_sexta_6",
    "teacherId": "t_15",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_segunda_7",
    "teacherId": "t_15",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_terca_7",
    "teacherId": "t_15",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_quarta_7",
    "teacherId": "t_15",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_15_quinta_7",
    "teacherId": "t_15",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_15_sexta_7",
    "teacherId": "t_15",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "6B",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_segunda_8",
    "teacherId": "t_15",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_terca_8",
    "teacherId": "t_15",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_quarta_8",
    "teacherId": "t_15",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_quinta_8",
    "teacherId": "t_15",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_sexta_8",
    "teacherId": "t_15",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "6B",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_15_segunda_9",
    "teacherId": "t_15",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_terca_9",
    "teacherId": "t_15",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_quarta_9",
    "teacherId": "t_15",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_quinta_9",
    "teacherId": "t_15",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_15_sexta_9",
    "teacherId": "t_15",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Educação Física"
  },
  {
    "id": "slot_t_16_segunda_1",
    "teacherId": "t_16",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_16_terca_1",
    "teacherId": "t_16",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_quarta_1",
    "teacherId": "t_16",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "6A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_16_quinta_1",
    "teacherId": "t_16",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "6A",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_16_sexta_1",
    "teacherId": "t_16",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "7A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_16_segunda_2",
    "teacherId": "t_16",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_16_terca_2",
    "teacherId": "t_16",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_quarta_2",
    "teacherId": "t_16",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "6A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_16_quinta_2",
    "teacherId": "t_16",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "6A",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_16_sexta_2",
    "teacherId": "t_16",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "7A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_16_segunda_3",
    "teacherId": "t_16",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "6B",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_16_terca_3",
    "teacherId": "t_16",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_quarta_3",
    "teacherId": "t_16",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "7A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_16_quinta_3",
    "teacherId": "t_16",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "6B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_16_sexta_3",
    "teacherId": "t_16",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "6B",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_16_segunda_4",
    "teacherId": "t_16",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "6B",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_16_terca_4",
    "teacherId": "t_16",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_quarta_4",
    "teacherId": "t_16",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "7A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_16_quinta_4",
    "teacherId": "t_16",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "6B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_16_sexta_4",
    "teacherId": "t_16",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "6B",
    "subject": "Língua Inglesa"
  },
  {
    "id": "slot_t_16_segunda_5",
    "teacherId": "t_16",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "7A",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_16_terca_5",
    "teacherId": "t_16",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_quarta_5",
    "teacherId": "t_16",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_quinta_5",
    "teacherId": "t_16",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_16_sexta_5",
    "teacherId": "t_16",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_segunda_6",
    "teacherId": "t_16",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "7A",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_16_terca_6",
    "teacherId": "t_16",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_quarta_6",
    "teacherId": "t_16",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_quinta_6",
    "teacherId": "t_16",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_16_sexta_6",
    "teacherId": "t_16",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_segunda_7",
    "teacherId": "t_16",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "6A",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_16_terca_7",
    "teacherId": "t_16",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "6B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_16_quarta_7",
    "teacherId": "t_16",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_quinta_7",
    "teacherId": "t_16",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_sexta_7",
    "teacherId": "t_16",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "6A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_16_segunda_8",
    "teacherId": "t_16",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "6A",
    "subject": "Redação e Leitura"
  },
  {
    "id": "slot_t_16_terca_8",
    "teacherId": "t_16",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "6B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_16_quarta_8",
    "teacherId": "t_16",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_quinta_8",
    "teacherId": "t_16",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_sexta_8",
    "teacherId": "t_16",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "6A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_16_segunda_9",
    "teacherId": "t_16",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_terca_9",
    "teacherId": "t_16",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_quarta_9",
    "teacherId": "t_16",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_quinta_9",
    "teacherId": "t_16",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_16_sexta_9",
    "teacherId": "t_16",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_segunda_1",
    "teacherId": "t_17",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_terca_1",
    "teacherId": "t_17",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "8B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_quarta_1",
    "teacherId": "t_17",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "9B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_quinta_1",
    "teacherId": "t_17",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "8B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_sexta_1",
    "teacherId": "t_17",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_segunda_2",
    "teacherId": "t_17",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_terca_2",
    "teacherId": "t_17",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "8B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_quarta_2",
    "teacherId": "t_17",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "8A",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_17_quinta_2",
    "teacherId": "t_17",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "8B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_sexta_2",
    "teacherId": "t_17",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_segunda_3",
    "teacherId": "t_17",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_terca_3",
    "teacherId": "t_17",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "8A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_quarta_3",
    "teacherId": "t_17",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "9A",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_17_quinta_3",
    "teacherId": "t_17",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Biologia"
  },
  {
    "id": "slot_t_17_sexta_3",
    "teacherId": "t_17",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "9A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_segunda_4",
    "teacherId": "t_17",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_terca_4",
    "teacherId": "t_17",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "8A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_quarta_4",
    "teacherId": "t_17",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_quinta_4",
    "teacherId": "t_17",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Biologia"
  },
  {
    "id": "slot_t_17_sexta_4",
    "teacherId": "t_17",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "9A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_segunda_5",
    "teacherId": "t_17",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_terca_5",
    "teacherId": "t_17",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Biologia"
  },
  {
    "id": "slot_t_17_quarta_5",
    "teacherId": "t_17",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_quinta_5",
    "teacherId": "t_17",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "9B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_sexta_5",
    "teacherId": "t_17",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_segunda_6",
    "teacherId": "t_17",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_terca_6",
    "teacherId": "t_17",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Biologia"
  },
  {
    "id": "slot_t_17_quarta_6",
    "teacherId": "t_17",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_quinta_6",
    "teacherId": "t_17",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_sexta_6",
    "teacherId": "t_17",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_segunda_7",
    "teacherId": "t_17",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "8B",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_17_terca_7",
    "teacherId": "t_17",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_quarta_7",
    "teacherId": "t_17",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_quinta_7",
    "teacherId": "t_17",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "9A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_sexta_7",
    "teacherId": "t_17",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "9B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_segunda_8",
    "teacherId": "t_17",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "9B",
    "subject": "Práticas Experimentais"
  },
  {
    "id": "slot_t_17_terca_8",
    "teacherId": "t_17",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "9B",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_quarta_8",
    "teacherId": "t_17",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_quinta_8",
    "teacherId": "t_17",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "9A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_sexta_8",
    "teacherId": "t_17",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "8A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_17_segunda_9",
    "teacherId": "t_17",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_terca_9",
    "teacherId": "t_17",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_quarta_9",
    "teacherId": "t_17",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_quinta_9",
    "teacherId": "t_17",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_17_sexta_9",
    "teacherId": "t_17",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "8A",
    "subject": "Ciências"
  },
  {
    "id": "slot_t_18_segunda_1",
    "teacherId": "t_18",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "8B",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_terca_1",
    "teacherId": "t_18",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "6B",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_quarta_1",
    "teacherId": "t_18",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_quinta_1",
    "teacherId": "t_18",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_sexta_1",
    "teacherId": "t_18",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_segunda_2",
    "teacherId": "t_18",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "7B",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_terca_2",
    "teacherId": "t_18",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "9B",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_18_quarta_2",
    "teacherId": "t_18",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_quinta_2",
    "teacherId": "t_18",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_sexta_2",
    "teacherId": "t_18",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_segunda_3",
    "teacherId": "t_18",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "7B",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_terca_3",
    "teacherId": "t_18",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "9B",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_18_quarta_3",
    "teacherId": "t_18",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_18_quinta_3",
    "teacherId": "t_18",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_sexta_3",
    "teacherId": "t_18",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_segunda_4",
    "teacherId": "t_18",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "9A",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_18_terca_4",
    "teacherId": "t_18",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_quarta_4",
    "teacherId": "t_18",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_18_quinta_4",
    "teacherId": "t_18",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "6A",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_sexta_4",
    "teacherId": "t_18",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_segunda_5",
    "teacherId": "t_18",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_terca_5",
    "teacherId": "t_18",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "7A",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_quarta_5",
    "teacherId": "t_18",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_quinta_5",
    "teacherId": "t_18",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "6A",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_sexta_5",
    "teacherId": "t_18",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_segunda_6",
    "teacherId": "t_18",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "6B",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_terca_6",
    "teacherId": "t_18",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "7A",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_quarta_6",
    "teacherId": "t_18",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "8A",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_quinta_6",
    "teacherId": "t_18",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "9A",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_sexta_6",
    "teacherId": "t_18",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_segunda_7",
    "teacherId": "t_18",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_18_terca_7",
    "teacherId": "t_18",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_18_quarta_7",
    "teacherId": "t_18",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "9A",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_18_quinta_7",
    "teacherId": "t_18",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_sexta_7",
    "teacherId": "t_18",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_segunda_8",
    "teacherId": "t_18",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_18_terca_8",
    "teacherId": "t_18",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Esporte-Música-Arte"
  },
  {
    "id": "slot_t_18_quarta_8",
    "teacherId": "t_18",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_quinta_8",
    "teacherId": "t_18",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_sexta_8",
    "teacherId": "t_18",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Arte"
  },
  {
    "id": "slot_t_18_segunda_9",
    "teacherId": "t_18",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_terca_9",
    "teacherId": "t_18",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_quarta_9",
    "teacherId": "t_18",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_quinta_9",
    "teacherId": "t_18",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_18_sexta_9",
    "teacherId": "t_18",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "9B",
    "subject": "Arte"
  },
  {
    "id": "slot_t_19_segunda_1",
    "teacherId": "t_19",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_terca_1",
    "teacherId": "t_19",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_quarta_1",
    "teacherId": "t_19",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_quinta_1",
    "teacherId": "t_19",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_sexta_1",
    "teacherId": "t_19",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "8B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_segunda_2",
    "teacherId": "t_19",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_terca_2",
    "teacherId": "t_19",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_quarta_2",
    "teacherId": "t_19",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_quinta_2",
    "teacherId": "t_19",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_sexta_2",
    "teacherId": "t_19",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "8B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_segunda_3",
    "teacherId": "t_19",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_terca_3",
    "teacherId": "t_19",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "7B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_quarta_3",
    "teacherId": "t_19",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_quinta_3",
    "teacherId": "t_19",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "7B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_sexta_3",
    "teacherId": "t_19",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_segunda_4",
    "teacherId": "t_19",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_terca_4",
    "teacherId": "t_19",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "7B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_quarta_4",
    "teacherId": "t_19",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_quinta_4",
    "teacherId": "t_19",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "7B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_sexta_4",
    "teacherId": "t_19",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_segunda_5",
    "teacherId": "t_19",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "8A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_terca_5",
    "teacherId": "t_19",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_quarta_5",
    "teacherId": "t_19",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_quinta_5",
    "teacherId": "t_19",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_sexta_5",
    "teacherId": "t_19",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_segunda_6",
    "teacherId": "t_19",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "8B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_terca_6",
    "teacherId": "t_19",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_quarta_6",
    "teacherId": "t_19",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_quinta_6",
    "teacherId": "t_19",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_sexta_6",
    "teacherId": "t_19",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_segunda_7",
    "teacherId": "t_19",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_terca_7",
    "teacherId": "t_19",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "8A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_quarta_7",
    "teacherId": "t_19",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "8B",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_quinta_7",
    "teacherId": "t_19",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "8A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_sexta_7",
    "teacherId": "t_19",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_segunda_8",
    "teacherId": "t_19",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_terca_8",
    "teacherId": "t_19",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "8A",
    "subject": "Língua Portuguesa"
  },
  {
    "id": "slot_t_19_quarta_8",
    "teacherId": "t_19",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_quinta_8",
    "teacherId": "t_19",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_sexta_8",
    "teacherId": "t_19",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_segunda_9",
    "teacherId": "t_19",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_terca_9",
    "teacherId": "t_19",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_quarta_9",
    "teacherId": "t_19",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_quinta_9",
    "teacherId": "t_19",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_19_sexta_9",
    "teacherId": "t_19",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_segunda_1",
    "teacherId": "t_20",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_terca_1",
    "teacherId": "t_20",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Sociologia"
  },
  {
    "id": "slot_t_20_quarta_1",
    "teacherId": "t_20",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Sociologia"
  },
  {
    "id": "slot_t_20_quinta_1",
    "teacherId": "t_20",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_sexta_1",
    "teacherId": "t_20",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Filosofia"
  },
  {
    "id": "slot_t_20_segunda_2",
    "teacherId": "t_20",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_terca_2",
    "teacherId": "t_20",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Filosofia"
  },
  {
    "id": "slot_t_20_quarta_2",
    "teacherId": "t_20",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "2EMB",
    "subject": "Sociologia"
  },
  {
    "id": "slot_t_20_quinta_2",
    "teacherId": "t_20",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_sexta_2",
    "teacherId": "t_20",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Filosofia"
  },
  {
    "id": "slot_t_20_segunda_3",
    "teacherId": "t_20",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_terca_3",
    "teacherId": "t_20",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Filosofia"
  },
  {
    "id": "slot_t_20_quarta_3",
    "teacherId": "t_20",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "8A",
    "subject": "Projeto de Vida"
  },
  {
    "id": "slot_t_20_quinta_3",
    "teacherId": "t_20",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_sexta_3",
    "teacherId": "t_20",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "2EMA_DS",
    "subject": "Sociologia"
  },
  {
    "id": "slot_t_20_segunda_4",
    "teacherId": "t_20",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_terca_4",
    "teacherId": "t_20",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "6A",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_20_quarta_4",
    "teacherId": "t_20",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "6A",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_20_quinta_4",
    "teacherId": "t_20",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_sexta_4",
    "teacherId": "t_20",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "7B",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_20_segunda_5",
    "teacherId": "t_20",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_terca_5",
    "teacherId": "t_20",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "6B",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_20_quarta_5",
    "teacherId": "t_20",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Aprofundamento de Filosofia"
  },
  {
    "id": "slot_t_20_quinta_5",
    "teacherId": "t_20",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_sexta_5",
    "teacherId": "t_20",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_segunda_6",
    "teacherId": "t_20",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_terca_6",
    "teacherId": "t_20",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "6B",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_20_quarta_6",
    "teacherId": "t_20",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Aprofundamento de Filosofia"
  },
  {
    "id": "slot_t_20_quinta_6",
    "teacherId": "t_20",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_sexta_6",
    "teacherId": "t_20",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_segunda_7",
    "teacherId": "t_20",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "7A",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_20_terca_7",
    "teacherId": "t_20",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "7A",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_20_quarta_7",
    "teacherId": "t_20",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "6B",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_20_quinta_7",
    "teacherId": "t_20",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Aprofundamento de Sociologia"
  },
  {
    "id": "slot_t_20_sexta_7",
    "teacherId": "t_20",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "7B",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_20_segunda_8",
    "teacherId": "t_20",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "7A",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_20_terca_8",
    "teacherId": "t_20",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "7B",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_20_quarta_8",
    "teacherId": "t_20",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_quinta_8",
    "teacherId": "t_20",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Aprofundamento de Sociologia"
  },
  {
    "id": "slot_t_20_sexta_8",
    "teacherId": "t_20",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "8B",
    "subject": "Projeto de Vida"
  },
  {
    "id": "slot_t_20_segunda_9",
    "teacherId": "t_20",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_terca_9",
    "teacherId": "t_20",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_quarta_9",
    "teacherId": "t_20",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_quinta_9",
    "teacherId": "t_20",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_20_sexta_9",
    "teacherId": "t_20",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "6A",
    "subject": "Geografia"
  },
  {
    "id": "slot_t_21_segunda_1",
    "teacherId": "t_21",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "6A",
    "subject": "História"
  },
  {
    "id": "slot_t_21_terca_1",
    "teacherId": "t_21",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quarta_1",
    "teacherId": "t_21",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quinta_1",
    "teacherId": "t_21",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "6B",
    "subject": "História"
  },
  {
    "id": "slot_t_21_sexta_1",
    "teacherId": "t_21",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "8A",
    "subject": "História"
  },
  {
    "id": "slot_t_21_segunda_2",
    "teacherId": "t_21",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "8B",
    "subject": "História"
  },
  {
    "id": "slot_t_21_terca_2",
    "teacherId": "t_21",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quarta_2",
    "teacherId": "t_21",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quinta_2",
    "teacherId": "t_21",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "7A",
    "subject": "História"
  },
  {
    "id": "slot_t_21_sexta_2",
    "teacherId": "t_21",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "9B",
    "subject": "História"
  },
  {
    "id": "slot_t_21_segunda_3",
    "teacherId": "t_21",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "9A",
    "subject": "História"
  },
  {
    "id": "slot_t_21_terca_3",
    "teacherId": "t_21",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quarta_3",
    "teacherId": "t_21",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quinta_3",
    "teacherId": "t_21",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "9A",
    "subject": "História"
  },
  {
    "id": "slot_t_21_sexta_3",
    "teacherId": "t_21",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "8B",
    "subject": "História"
  },
  {
    "id": "slot_t_21_segunda_4",
    "teacherId": "t_21",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "7B",
    "subject": "História"
  },
  {
    "id": "slot_t_21_terca_4",
    "teacherId": "t_21",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quarta_4",
    "teacherId": "t_21",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quinta_4",
    "teacherId": "t_21",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "AULA",
    "classId": "7A",
    "subject": "História"
  },
  {
    "id": "slot_t_21_sexta_4",
    "teacherId": "t_21",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "AULA",
    "classId": "8A",
    "subject": "História"
  },
  {
    "id": "slot_t_21_segunda_5",
    "teacherId": "t_21",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_terca_5",
    "teacherId": "t_21",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quarta_5",
    "teacherId": "t_21",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quinta_5",
    "teacherId": "t_21",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "8B",
    "subject": "História"
  },
  {
    "id": "slot_t_21_sexta_5",
    "teacherId": "t_21",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_segunda_6",
    "teacherId": "t_21",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "6A",
    "subject": "História"
  },
  {
    "id": "slot_t_21_terca_6",
    "teacherId": "t_21",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quarta_6",
    "teacherId": "t_21",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "7A",
    "subject": "História"
  },
  {
    "id": "slot_t_21_quinta_6",
    "teacherId": "t_21",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "8A",
    "subject": "História"
  },
  {
    "id": "slot_t_21_sexta_6",
    "teacherId": "t_21",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_segunda_7",
    "teacherId": "t_21",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "6B",
    "subject": "História"
  },
  {
    "id": "slot_t_21_terca_7",
    "teacherId": "t_21",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "9B",
    "subject": "História"
  },
  {
    "id": "slot_t_21_quarta_7",
    "teacherId": "t_21",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "6A",
    "subject": "História"
  },
  {
    "id": "slot_t_21_quinta_7",
    "teacherId": "t_21",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "7B",
    "subject": "História"
  },
  {
    "id": "slot_t_21_sexta_7",
    "teacherId": "t_21",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Projeto de Vida"
  },
  {
    "id": "slot_t_21_segunda_8",
    "teacherId": "t_21",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "6B",
    "subject": "História"
  },
  {
    "id": "slot_t_21_terca_8",
    "teacherId": "t_21",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "AULA",
    "classId": "9A",
    "subject": "História"
  },
  {
    "id": "slot_t_21_quarta_8",
    "teacherId": "t_21",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quinta_8",
    "teacherId": "t_21",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "7B",
    "subject": "História"
  },
  {
    "id": "slot_t_21_sexta_8",
    "teacherId": "t_21",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "9B",
    "subject": "História"
  },
  {
    "id": "slot_t_21_segunda_9",
    "teacherId": "t_21",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_terca_9",
    "teacherId": "t_21",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quarta_9",
    "teacherId": "t_21",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_quinta_9",
    "teacherId": "t_21",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_21_sexta_9",
    "teacherId": "t_21",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "1EMA",
    "subject": "Projeto de Vida"
  },
  {
    "id": "slot_t_22_segunda_1",
    "teacherId": "t_22",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "9A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_terca_1",
    "teacherId": "t_22",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "9B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_quarta_1",
    "teacherId": "t_22",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "AULA",
    "classId": "9A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_quinta_1",
    "teacherId": "t_22",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_sexta_1",
    "teacherId": "t_22",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "9A",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_22_segunda_2",
    "teacherId": "t_22",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "9A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_terca_2",
    "teacherId": "t_22",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_quarta_2",
    "teacherId": "t_22",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "9A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_quinta_2",
    "teacherId": "t_22",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_sexta_2",
    "teacherId": "t_22",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "9A",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_22_segunda_3",
    "teacherId": "t_22",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "9B",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_22_terca_3",
    "teacherId": "t_22",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_quarta_3",
    "teacherId": "t_22",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_quinta_3",
    "teacherId": "t_22",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_sexta_3",
    "teacherId": "t_22",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_segunda_4",
    "teacherId": "t_22",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "9B",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_22_terca_4",
    "teacherId": "t_22",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_quarta_4",
    "teacherId": "t_22",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_quinta_4",
    "teacherId": "t_22",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_sexta_4",
    "teacherId": "t_22",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_segunda_5",
    "teacherId": "t_22",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_22_terca_5",
    "teacherId": "t_22",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_quarta_5",
    "teacherId": "t_22",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "9B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_quinta_5",
    "teacherId": "t_22",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "AULA",
    "classId": "9A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_sexta_5",
    "teacherId": "t_22",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_segunda_6",
    "teacherId": "t_22",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_22_terca_6",
    "teacherId": "t_22",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_quarta_6",
    "teacherId": "t_22",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "9B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_quinta_6",
    "teacherId": "t_22",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_sexta_6",
    "teacherId": "t_22",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_segunda_7",
    "teacherId": "t_22",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_terca_7",
    "teacherId": "t_22",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_quarta_7",
    "teacherId": "t_22",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "3EMB",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_22_quinta_7",
    "teacherId": "t_22",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "AULA",
    "classId": "9B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_sexta_7",
    "teacherId": "t_22",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_segunda_8",
    "teacherId": "t_22",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "AULA",
    "classId": "3EMA_DS",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_terca_8",
    "teacherId": "t_22",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_quarta_8",
    "teacherId": "t_22",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_quinta_8",
    "teacherId": "t_22",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "9B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_22_sexta_8",
    "teacherId": "t_22",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_segunda_9",
    "teacherId": "t_22",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_terca_9",
    "teacherId": "t_22",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_quarta_9",
    "teacherId": "t_22",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_quinta_9",
    "teacherId": "t_22",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_22_sexta_9",
    "teacherId": "t_22",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_segunda_1",
    "teacherId": "t_23",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "AULA",
    "classId": "6B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_terca_1",
    "teacherId": "t_23",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "AULA",
    "classId": "8A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_quarta_1",
    "teacherId": "t_23",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_quinta_1",
    "teacherId": "t_23",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_sexta_1",
    "teacherId": "t_23",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "AULA",
    "classId": "6A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_segunda_2",
    "teacherId": "t_23",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "AULA",
    "classId": "6A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_terca_2",
    "teacherId": "t_23",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "AULA",
    "classId": "6A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_quarta_2",
    "teacherId": "t_23",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "AULA",
    "classId": "6B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_quinta_2",
    "teacherId": "t_23",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_sexta_2",
    "teacherId": "t_23",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "AULA",
    "classId": "6A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_segunda_3",
    "teacherId": "t_23",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "AULA",
    "classId": "8B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_terca_3",
    "teacherId": "t_23",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "AULA",
    "classId": "6B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_quarta_3",
    "teacherId": "t_23",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "AULA",
    "classId": "6A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_quinta_3",
    "teacherId": "t_23",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_sexta_3",
    "teacherId": "t_23",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "AULA",
    "classId": "8A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_segunda_4",
    "teacherId": "t_23",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "AULA",
    "classId": "8B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_terca_4",
    "teacherId": "t_23",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "AULA",
    "classId": "6B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_quarta_4",
    "teacherId": "t_23",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "AULA",
    "classId": "8A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_quinta_4",
    "teacherId": "t_23",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_sexta_4",
    "teacherId": "t_23",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_segunda_5",
    "teacherId": "t_23",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "AULA",
    "classId": "7B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_terca_5",
    "teacherId": "t_23",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "AULA",
    "classId": "7B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_quarta_5",
    "teacherId": "t_23",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "AULA",
    "classId": "8A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_quinta_5",
    "teacherId": "t_23",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_sexta_5",
    "teacherId": "t_23",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_segunda_6",
    "teacherId": "t_23",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "AULA",
    "classId": "7B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_terca_6",
    "teacherId": "t_23",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "AULA",
    "classId": "7B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_quarta_6",
    "teacherId": "t_23",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "AULA",
    "classId": "8B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_quinta_6",
    "teacherId": "t_23",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_sexta_6",
    "teacherId": "t_23",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_segunda_7",
    "teacherId": "t_23",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_terca_7",
    "teacherId": "t_23",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "AULA",
    "classId": "8B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_quarta_7",
    "teacherId": "t_23",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "AULA",
    "classId": "1EMB",
    "subject": "Orientação de Estudo – Matem…"
  },
  {
    "id": "slot_t_23_quinta_7",
    "teacherId": "t_23",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_sexta_7",
    "teacherId": "t_23",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "AULA",
    "classId": "8B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_segunda_8",
    "teacherId": "t_23",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_terca_8",
    "teacherId": "t_23",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_quarta_8",
    "teacherId": "t_23",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_quinta_8",
    "teacherId": "t_23",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "AULA",
    "classId": "8A",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_sexta_8",
    "teacherId": "t_23",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "AULA",
    "classId": "7B",
    "subject": "Matemática"
  },
  {
    "id": "slot_t_23_segunda_9",
    "teacherId": "t_23",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_terca_9",
    "teacherId": "t_23",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_quarta_9",
    "teacherId": "t_23",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_quinta_9",
    "teacherId": "t_23",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_t_23_sexta_9",
    "teacherId": "t_23",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "AULA",
    "classId": "6B",
    "subject": "Matemática"
  },
  {
    "id": "slot_gestao_1_segunda_1",
    "teacherId": "gestao_1",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_segunda_2",
    "teacherId": "gestao_1",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_segunda_3",
    "teacherId": "gestao_1",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_segunda_4",
    "teacherId": "gestao_1",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_segunda_5",
    "teacherId": "gestao_1",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_segunda_6",
    "teacherId": "gestao_1",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_segunda_7",
    "teacherId": "gestao_1",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_segunda_8",
    "teacherId": "gestao_1",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_segunda_9",
    "teacherId": "gestao_1",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_terca_1",
    "teacherId": "gestao_1",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_terca_2",
    "teacherId": "gestao_1",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_terca_3",
    "teacherId": "gestao_1",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_terca_4",
    "teacherId": "gestao_1",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_terca_5",
    "teacherId": "gestao_1",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_terca_6",
    "teacherId": "gestao_1",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_terca_7",
    "teacherId": "gestao_1",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_terca_8",
    "teacherId": "gestao_1",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_terca_9",
    "teacherId": "gestao_1",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quarta_1",
    "teacherId": "gestao_1",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quarta_2",
    "teacherId": "gestao_1",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quarta_3",
    "teacherId": "gestao_1",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quarta_4",
    "teacherId": "gestao_1",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quarta_5",
    "teacherId": "gestao_1",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quarta_6",
    "teacherId": "gestao_1",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quarta_7",
    "teacherId": "gestao_1",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quarta_8",
    "teacherId": "gestao_1",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quarta_9",
    "teacherId": "gestao_1",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quinta_1",
    "teacherId": "gestao_1",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quinta_2",
    "teacherId": "gestao_1",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quinta_3",
    "teacherId": "gestao_1",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quinta_4",
    "teacherId": "gestao_1",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quinta_5",
    "teacherId": "gestao_1",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quinta_6",
    "teacherId": "gestao_1",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quinta_7",
    "teacherId": "gestao_1",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quinta_8",
    "teacherId": "gestao_1",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_quinta_9",
    "teacherId": "gestao_1",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_sexta_1",
    "teacherId": "gestao_1",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_sexta_2",
    "teacherId": "gestao_1",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_sexta_3",
    "teacherId": "gestao_1",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_sexta_4",
    "teacherId": "gestao_1",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_sexta_5",
    "teacherId": "gestao_1",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_sexta_6",
    "teacherId": "gestao_1",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_sexta_7",
    "teacherId": "gestao_1",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_sexta_8",
    "teacherId": "gestao_1",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_1_sexta_9",
    "teacherId": "gestao_1",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_segunda_1",
    "teacherId": "gestao_2",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_segunda_2",
    "teacherId": "gestao_2",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_segunda_3",
    "teacherId": "gestao_2",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_segunda_4",
    "teacherId": "gestao_2",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_segunda_5",
    "teacherId": "gestao_2",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_segunda_6",
    "teacherId": "gestao_2",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_segunda_7",
    "teacherId": "gestao_2",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_segunda_8",
    "teacherId": "gestao_2",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_segunda_9",
    "teacherId": "gestao_2",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_terca_1",
    "teacherId": "gestao_2",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_terca_2",
    "teacherId": "gestao_2",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_terca_3",
    "teacherId": "gestao_2",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_terca_4",
    "teacherId": "gestao_2",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_terca_5",
    "teacherId": "gestao_2",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_terca_6",
    "teacherId": "gestao_2",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_terca_7",
    "teacherId": "gestao_2",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_terca_8",
    "teacherId": "gestao_2",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_terca_9",
    "teacherId": "gestao_2",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quarta_1",
    "teacherId": "gestao_2",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quarta_2",
    "teacherId": "gestao_2",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quarta_3",
    "teacherId": "gestao_2",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quarta_4",
    "teacherId": "gestao_2",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quarta_5",
    "teacherId": "gestao_2",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quarta_6",
    "teacherId": "gestao_2",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quarta_7",
    "teacherId": "gestao_2",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quarta_8",
    "teacherId": "gestao_2",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quarta_9",
    "teacherId": "gestao_2",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quinta_1",
    "teacherId": "gestao_2",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quinta_2",
    "teacherId": "gestao_2",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quinta_3",
    "teacherId": "gestao_2",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quinta_4",
    "teacherId": "gestao_2",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quinta_5",
    "teacherId": "gestao_2",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quinta_6",
    "teacherId": "gestao_2",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quinta_7",
    "teacherId": "gestao_2",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quinta_8",
    "teacherId": "gestao_2",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_quinta_9",
    "teacherId": "gestao_2",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_sexta_1",
    "teacherId": "gestao_2",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_sexta_2",
    "teacherId": "gestao_2",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_sexta_3",
    "teacherId": "gestao_2",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_sexta_4",
    "teacherId": "gestao_2",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_sexta_5",
    "teacherId": "gestao_2",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_sexta_6",
    "teacherId": "gestao_2",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_sexta_7",
    "teacherId": "gestao_2",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_sexta_8",
    "teacherId": "gestao_2",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_2_sexta_9",
    "teacherId": "gestao_2",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_segunda_1",
    "teacherId": "gestao_3",
    "dayOfWeek": "segunda",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_segunda_2",
    "teacherId": "gestao_3",
    "dayOfWeek": "segunda",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_segunda_3",
    "teacherId": "gestao_3",
    "dayOfWeek": "segunda",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_segunda_4",
    "teacherId": "gestao_3",
    "dayOfWeek": "segunda",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_segunda_5",
    "teacherId": "gestao_3",
    "dayOfWeek": "segunda",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_segunda_6",
    "teacherId": "gestao_3",
    "dayOfWeek": "segunda",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_segunda_7",
    "teacherId": "gestao_3",
    "dayOfWeek": "segunda",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_segunda_8",
    "teacherId": "gestao_3",
    "dayOfWeek": "segunda",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_segunda_9",
    "teacherId": "gestao_3",
    "dayOfWeek": "segunda",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_terca_1",
    "teacherId": "gestao_3",
    "dayOfWeek": "terca",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_terca_2",
    "teacherId": "gestao_3",
    "dayOfWeek": "terca",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_terca_3",
    "teacherId": "gestao_3",
    "dayOfWeek": "terca",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_terca_4",
    "teacherId": "gestao_3",
    "dayOfWeek": "terca",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_terca_5",
    "teacherId": "gestao_3",
    "dayOfWeek": "terca",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_terca_6",
    "teacherId": "gestao_3",
    "dayOfWeek": "terca",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_terca_7",
    "teacherId": "gestao_3",
    "dayOfWeek": "terca",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_terca_8",
    "teacherId": "gestao_3",
    "dayOfWeek": "terca",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_terca_9",
    "teacherId": "gestao_3",
    "dayOfWeek": "terca",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quarta_1",
    "teacherId": "gestao_3",
    "dayOfWeek": "quarta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quarta_2",
    "teacherId": "gestao_3",
    "dayOfWeek": "quarta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quarta_3",
    "teacherId": "gestao_3",
    "dayOfWeek": "quarta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quarta_4",
    "teacherId": "gestao_3",
    "dayOfWeek": "quarta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quarta_5",
    "teacherId": "gestao_3",
    "dayOfWeek": "quarta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quarta_6",
    "teacherId": "gestao_3",
    "dayOfWeek": "quarta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quarta_7",
    "teacherId": "gestao_3",
    "dayOfWeek": "quarta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quarta_8",
    "teacherId": "gestao_3",
    "dayOfWeek": "quarta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quarta_9",
    "teacherId": "gestao_3",
    "dayOfWeek": "quarta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quinta_1",
    "teacherId": "gestao_3",
    "dayOfWeek": "quinta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quinta_2",
    "teacherId": "gestao_3",
    "dayOfWeek": "quinta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quinta_3",
    "teacherId": "gestao_3",
    "dayOfWeek": "quinta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quinta_4",
    "teacherId": "gestao_3",
    "dayOfWeek": "quinta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quinta_5",
    "teacherId": "gestao_3",
    "dayOfWeek": "quinta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quinta_6",
    "teacherId": "gestao_3",
    "dayOfWeek": "quinta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quinta_7",
    "teacherId": "gestao_3",
    "dayOfWeek": "quinta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quinta_8",
    "teacherId": "gestao_3",
    "dayOfWeek": "quinta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_quinta_9",
    "teacherId": "gestao_3",
    "dayOfWeek": "quinta",
    "periodId": 9,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_sexta_1",
    "teacherId": "gestao_3",
    "dayOfWeek": "sexta",
    "periodId": 1,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_sexta_2",
    "teacherId": "gestao_3",
    "dayOfWeek": "sexta",
    "periodId": 2,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_sexta_3",
    "teacherId": "gestao_3",
    "dayOfWeek": "sexta",
    "periodId": 3,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_sexta_4",
    "teacherId": "gestao_3",
    "dayOfWeek": "sexta",
    "periodId": 4,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_sexta_5",
    "teacherId": "gestao_3",
    "dayOfWeek": "sexta",
    "periodId": 5,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_sexta_6",
    "teacherId": "gestao_3",
    "dayOfWeek": "sexta",
    "periodId": 6,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_sexta_7",
    "teacherId": "gestao_3",
    "dayOfWeek": "sexta",
    "periodId": 7,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_sexta_8",
    "teacherId": "gestao_3",
    "dayOfWeek": "sexta",
    "periodId": 8,
    "type": "LIVRE"
  },
  {
    "id": "slot_gestao_3_sexta_9",
    "teacherId": "gestao_3",
    "dayOfWeek": "sexta",
    "periodId": 9,
    "type": "LIVRE"
  }
];

export function generateInitialSchedule(): ScheduleSlot[] {
  return OFFICIAL_SCHEDULE_SLOTS;
}
