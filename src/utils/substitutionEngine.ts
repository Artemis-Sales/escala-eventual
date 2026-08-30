import type {
  DayOfWeek,
  Teacher,
  ScheduleSlot,
  ClassGroup,
  PeriodDefinition,
  SubstitutionItem,
  DailySubstitutionPlan,
  SubstitutionCandidate,
} from '../types';
import { normalizeText } from './text';

export function getEligibleCandidates(
  periodId: number,
  dayOfWeek: DayOfWeek,
  originalTeacher: Teacher,
  absentTeacherIds: string[],
  allTeachers: Teacher[],
  allSlots: ScheduleSlot[],
  dailyAllocationsCount: Record<string, number>,
  periodAllocatedTeacherIds: Set<string>
): SubstitutionCandidate[] {
  const candidates: SubstitutionCandidate[] = [];

  for (const teacher of allTeachers) {
    // 1. Professores isentos de realizar substituições (flag isento)
    if (teacher.isExemptFromSubstitutions) {
      continue;
    }

    // 2. Não pode ser um professor que faltou no dia
    if (absentTeacherIds.includes(teacher.id)) {
      continue;
    }

    // 3. Não pode já ter sido alocado nesta mesma aula/período em outra turma
    if (periodAllocatedTeacherIds.has(teacher.id)) {
      continue;
    }

    // 4. Verificar o slot do professor neste dia e período
    const slot = allSlots.find(
      (s) => s.teacherId === teacher.id && s.dayOfWeek === dayOfWeek && s.periodId === periodId
    );

    if (slot) {
      // Se estiver em aula regular com sua própria turma
      if (slot.type === 'AULA') {
        continue;
      }
      // Se estiver em curso de formação (Multiplica SP ou ATPC)
      if (slot.type === 'CURSO_FORMACAO') {
        continue;
      }
    }

    // 5. Determinar o Tier do Docente/Gestor
    const isAreaCoordinator = teacher.role === 'COORDENADOR_AREA';
    const isManagementTeam = teacher.role === 'EQUIPE_GESTORA';

    let tier: 1 | 2 | 3 = 1;
    let matchType: 'MESMA_MATERIA' | 'MESMA_AREA' | 'DISPONIVEL' | 'COORDENADOR_AREA' | 'EQUIPE_GESTORA' = 'DISPONIVEL';

    if (isManagementTeam) {
      tier = 3;
      matchType = 'EQUIPE_GESTORA';
    } else if (isAreaCoordinator) {
      tier = 2;
      matchType = 'COORDENADOR_AREA';
    } else {
      tier = 1;
      const origSubj = normalizeText(originalTeacher.mainSubject || '');
      const tSubj = normalizeText(teacher.mainSubject || '');

      const isSameSubject =
        tSubj === origSubj ||
        teacher.secondarySubjects?.some((sub) => normalizeText(sub) === origSubj);

      const isSameArea =
        normalizeText(teacher.knowledgeArea) === normalizeText(originalTeacher.knowledgeArea);

      if (isSameSubject) {
        matchType = 'MESMA_MATERIA';
      } else if (isSameArea) {
        matchType = 'MESMA_AREA';
      }
    }

    // 6. Pontuação de equidade
    const subsDone = teacher.totalSubstitutionsCount || 0;
    const dailySubs = dailyAllocationsCount[teacher.id] || 0;

    let affinityBonus = 0;
    if (matchType === 'MESMA_MATERIA') affinityBonus = 40;
    else if (matchType === 'MESMA_AREA') affinityBonus = 20;

    // Penalidade por Tier: Tier 2 (Coord. Área) = +500, Tier 3 (Equipe Gestora) = +1000
    let tierPenalty = 0;
    if (tier === 2) tierPenalty = 500;
    else if (tier === 3) tierPenalty = 1000;

    // As substituições já feitas hoje não entram no score: elas são critério de
    // desempate anterior a ele, aplicado na ordenação abaixo.
    const score = tierPenalty + subsDone * 10 - affinityBonus;

    candidates.push({
      teacher,
      matchType,
      tier,
      substitutionsDone: subsDone,
      dailySubsAllocatedToday: dailySubs,
      score,
    });
  }

  // Ordem de escolha:
  //
  // 1. Quem ainda não substituiu hoje vem sempre antes de quem já substituiu. Uma
  //    segunda aula no mesmo dia é último caso: só acontece quando todos os outros
  //    disponíveis já entraram em sala — inclusive coordenadores de área e equipe
  //    gestora, que por isso podem ser acionados antes de alguém repetir.
  // 2. Entre quem já substituiu, prefere quem substituiu menos vezes hoje.
  // 3. Depois o Tier (Professor > Coord. de Área > Equipe Gestora).
  // 4. Por fim o score (equidade no acumulado e afinidade com a disciplina).
  return candidates.sort((a, b) => {
    const aJaSubstituiu = a.dailySubsAllocatedToday > 0 ? 1 : 0;
    const bJaSubstituiu = b.dailySubsAllocatedToday > 0 ? 1 : 0;
    if (aJaSubstituiu !== bJaSubstituiu) {
      return aJaSubstituiu - bJaSubstituiu;
    }

    if (a.dailySubsAllocatedToday !== b.dailySubsAllocatedToday) {
      return a.dailySubsAllocatedToday - b.dailySubsAllocatedToday;
    }

    if (a.tier !== b.tier) {
      return a.tier - b.tier;
    }
    return a.score - b.score;
  });
}

export function generateDailyPlan(
  date: string,
  dayOfWeek: DayOfWeek,
  absentTeacherIds: string[],
  allTeachers: Teacher[],
  allSlots: ScheduleSlot[],
  allClasses: ClassGroup[],
  periods: PeriodDefinition[]
): DailySubstitutionPlan {
  const substitutions: SubstitutionItem[] = [];
  const dailyAllocationsCount: Record<string, number> = {};

  allTeachers.forEach((t) => {
    dailyAllocationsCount[t.id] = 0;
  });

  interface NeededSub {
    periodId: number;
    periodDef: PeriodDefinition;
    classId: string;
    className: string;
    originalTeacher: Teacher;
    subject: string;
  }

  const neededSubs: NeededSub[] = [];

  absentTeacherIds.forEach((absentId) => {
    const teacher = allTeachers.find((t) => t.id === absentId);
    if (!teacher) return;

    // Encontrar todas as aulas que o professor faltante daria neste dia da semana
    const teacherDaySlots = allSlots.filter(
      (s) => s.teacherId === absentId && s.dayOfWeek === dayOfWeek && s.type === 'AULA'
    );

    teacherDaySlots.forEach((slot) => {
      const pDef = periods.find((p) => p.id === slot.periodId);
      const cGroup = allClasses.find((c) => c.id === slot.classId);

      if (pDef) {
        let className = 'Turma Regular';
        if (cGroup) {
          className = cGroup.name;
        } else if (slot.classId) {
          className = `Turma ${slot.classId}`;
        }

        neededSubs.push({
          periodId: slot.periodId,
          periodDef: pDef,
          classId: slot.classId || 'GERAL',
          className,
          originalTeacher: teacher,
          subject: slot.subject || teacher.mainSubject || 'Aula Regular',
        });
      }
    });
  });

  // Ordenar por período cronológico (1ª aula, 2ª aula, ...)
  neededSubs.sort((a, b) => a.periodId - b.periodId);

  const periodAllocations: Record<number, Set<string>> = {};
  periods.forEach((p) => {
    periodAllocations[p.id] = new Set<string>();
  });

  let uncoveredCount = 0;

  neededSubs.forEach((need, index) => {
    const periodSet = periodAllocations[need.periodId];

    const eligible = getEligibleCandidates(
      need.periodId,
      dayOfWeek,
      need.originalTeacher,
      absentTeacherIds,
      allTeachers,
      allSlots,
      dailyAllocationsCount,
      periodSet
    );

    if (eligible.length > 0) {
      const chosen = eligible[0];
      periodSet.add(chosen.teacher.id);
      dailyAllocationsCount[chosen.teacher.id] = (dailyAllocationsCount[chosen.teacher.id] || 0) + 1;

      substitutions.push({
        id: `sub-${need.periodId}-${need.classId}-${index}-${Date.now()}`,
        periodId: need.periodId,
        periodLabel: need.periodDef.label,
        periodTime: need.periodDef.time,
        classId: need.classId,
        className: need.className,
        originalTeacherId: need.originalTeacher.id,
        originalTeacherName: need.originalTeacher.name,
        originalSubject: need.subject,
        substituteTeacherId: chosen.teacher.id,
        substituteTeacherName: chosen.teacher.name,
        matchType: chosen.matchType,
        tier: chosen.tier,
        isManualOverride: false,
      });
    } else {
      uncoveredCount++;
      substitutions.push({
        id: `sub-${need.periodId}-${need.classId}-${index}-${Date.now()}`,
        periodId: need.periodId,
        periodLabel: need.periodDef.label,
        periodTime: need.periodDef.time,
        classId: need.classId,
        className: need.className,
        originalTeacherId: need.originalTeacher.id,
        originalTeacherName: need.originalTeacher.name,
        originalSubject: need.subject,
        substituteTeacherId: null,
        substituteTeacherName: null,
        matchType: 'SEM_SUBSTITUTO',
        isManualOverride: false,
        notes: 'Nenhum professor, coordenador ou membro da gestão disponível neste período.',
      });
    }
  });

  return {
    id: `plan-${date}-${Date.now()}`,
    date,
    dayOfWeek,
    absentTeacherIds,
    substitutions,
    uncoveredCount,
    createdAt: new Date().toISOString(),
    isOfficial: false,
  };
}

export function formatWhatsAppMessage(
  plan: DailySubstitutionPlan,
  allTeachers: Teacher[]
): string {
  const formattedDate = new Date(plan.date + 'T00:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const absentNames = plan.absentTeacherIds
    .map((id) => allTeachers.find((t) => t.id === id)?.name || id)
    .join(', ');

  let msg = `📋 *ESCALA DE SUBSTITUIÇÃO*\n`;
  msg += `📅 *Data:* ${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}\n`;
  msg += `👤 *Professores Ausentes:* ${absentNames || 'Nenhum'}\n\n`;
  msg += `────────────────────────────\n`;

  if (plan.substitutions.length === 0) {
    msg += `✅ *Nenhuma aula necessita de substituição no dia de hoje.*\n`;
    return msg;
  }

  const byPeriod: Record<number, SubstitutionItem[]> = {};
  plan.substitutions.forEach((sub) => {
    if (!byPeriod[sub.periodId]) byPeriod[sub.periodId] = [];
    byPeriod[sub.periodId].push(sub);
  });

  Object.keys(byPeriod)
    .map(Number)
    .sort((a, b) => a - b)
    .forEach((pId) => {
      const items = byPeriod[pId];
      const pHeader = `${items[0].periodLabel} (${items[0].periodTime})`;
      msg += `\n⏰ *${pHeader}*\n`;

      items.forEach((item) => {
        const subName = item.substituteTeacherName
          ? `👉 *${item.substituteTeacherName}*`
          : `⚠️ *SEM COBERTURA (Aguardando)*`;

        let tag = '';
        if (item.matchType === 'MESMA_MATERIA') tag = ' *(Mesma Disciplina)*';
        else if (item.matchType === 'MESMA_AREA') tag = ' *(Mesma Área)*';
        else if (item.matchType === 'COORDENADOR_AREA') tag = ' *(Coord. de Área)*';
        else if (item.matchType === 'EQUIPE_GESTORA') tag = ' *(Equipe Gestora)*';

        msg += `📚 *${item.className}* | ${item.originalSubject} (Ausente: ${item.originalTeacherName})\n`;
        msg += `  ${subName}${tag}\n`;
      });
    });

  msg += `\n────────────────────────────\n`;
  msg += `_Contamos com a colaboração e compromisso de toda a equipe pedagógica!_ ✨`;

  return msg;
}
