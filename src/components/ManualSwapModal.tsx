import React from 'react';
import { Check } from 'lucide-react';
import type { SubstitutionItem } from '../types';
import { useSchool } from '../context/SchoolContext';
import { Modal } from './Modal';
import { areaKey, displayName, shortClassName, startTime } from '../utils/display';

interface ManualSwapModalProps {
  item: SubstitutionItem;
  onClose: () => void;
  onChanged?: (itemId: string) => void;
}

type Status =
  | 'LIVRE'
  | 'AULA'
  | 'CURSO'
  | 'MULTIPLICA'
  | 'AUSENTE'
  | 'ALOCADO_OUTRA_TURMA'
  | 'ISENTO'
  | 'COORD_AREA'
  | 'GESTAO';

export const ManualSwapModal: React.FC<ManualSwapModalProps> = ({ item, onClose, onChanged }) => {
  const {
    teachers,
    scheduleSlots,
    selectedDay,
    absentTeacherIds,
    currentPlan,
    updateSubstitutionItem,
  } = useSchool();

  const originalTeacher = teachers.find((t) => t.id === item.originalTeacherId);

  const alreadyAllocatedInPeriod = new Set<string>();
  currentPlan?.substitutions.forEach((sub) => {
    if (sub.periodId === item.periodId && sub.id !== item.id && sub.substituteTeacherId) {
      alreadyAllocatedInPeriod.add(sub.substituteTeacherId);
    }
  });

  const options = teachers.map((teacher) => {
    const isAreaCoordinator = teacher.role === 'COORDENADOR_AREA';
    const isManagementTeam = teacher.role === 'EQUIPE_GESTORA';

    const slot = scheduleSlots.find(
      (s) => s.teacherId === teacher.id && s.dayOfWeek === selectedDay && s.periodId === item.periodId
    );

    let status: Status = 'LIVRE';
    let detail = 'Livre neste horário';
    let tier: 1 | 2 | 3 = 1;

    if (teacher.isExemptFromSubstitutions) {
      status = 'ISENTO';
      detail = 'Isento de substituições';
    } else if (absentTeacherIds.includes(teacher.id)) {
      status = 'AUSENTE';
      detail = 'Também faltou';
    } else if (slot?.type === 'AULA') {
      status = 'AULA';
      detail = `Em aula${slot.classId ? ` · ${shortClassName(slot.classId)}` : ''}`;
    } else if (slot?.type === 'ELETIVA' || slot?.type === 'ATIVIDADE') {
      status = 'AULA';
      detail = slot.trainingName || (slot.type === 'ELETIVA' ? 'Eletiva' : 'Tutoria');
    } else if (slot?.type === 'CURSO_FORMACAO') {
      if (slot.trainingName?.includes('Multiplica')) {
        status = 'MULTIPLICA';
        detail = 'No Multiplica SP';
      } else {
        status = 'CURSO';
        detail = slot.trainingName || 'ATPC';
      }
    } else if (alreadyAllocatedInPeriod.has(teacher.id)) {
      status = 'ALOCADO_OUTRA_TURMA';
      detail = 'Já cobre outra turma neste horário';
    } else if (isManagementTeam) {
      tier = 3;
      status = 'GESTAO';
      detail = 'Equipe gestora';
    } else if (isAreaCoordinator) {
      tier = 2;
      status = 'COORD_AREA';
      detail = 'Coordenação de área';
    }

    const subject = originalTeacher?.mainSubject.toLowerCase();
    const isSameSubject =
      !!subject &&
      (teacher.mainSubject.toLowerCase() === subject ||
        !!teacher.secondarySubjects?.some((s) => s.toLowerCase() === subject));
    const isSameArea = !!originalTeacher && teacher.knowledgeArea === originalTeacher.knowledgeArea;

    const affinity = tier === 1 ? (isSameSubject ? 'Mesma disciplina' : isSameArea ? 'Mesma área' : '') : '';

    return {
      teacher,
      status,
      detail,
      tier,
      affinity,
      isCurrent: teacher.id === item.substituteTeacherId,
      isEligible: status === 'LIVRE' || status === 'COORD_AREA' || status === 'GESTAO',
    };
  });

  options.sort((a, b) => {
    if (a.isEligible !== b.isEligible) return a.isEligible ? -1 : 1;
    if (a.tier !== b.tier) return a.tier - b.tier;
    if (!!a.affinity !== !!b.affinity) return a.affinity ? -1 : 1;
    return a.teacher.totalSubstitutionsCount - b.teacher.totalSubstitutionsCount;
  });

  const eligible = options.filter((o) => o.isEligible);
  const unavailable = options.filter((o) => !o.isEligible);

  const choose = (teacherId: string | null) => {
    updateSubstitutionItem(item.id, teacherId);
    onChanged?.(item.id);
    onClose();
  };

  return (
    <Modal
      title="Trocar substituto"
      size="md"
      onClose={onClose}
      subtitle={
        <>
          {item.periodLabel} · {startTime(item.periodTime)} · {shortClassName(item.className)} ·{' '}
          {item.originalSubject} — falta de {displayName(item.originalTeacherName)}
        </>
      }
      footer={
        <>
          {item.substituteTeacherId ? (
            <button type="button" className="btn btn-perigo" onClick={() => choose(null)}>
              Deixar sem cobertura
            </button>
          ) : (
            <span />
          )}
          <button type="button" className="btn btn-secundario" onClick={onClose}>
            Fechar
          </button>
        </>
      }
    >
      <h3 className="grupo-titulo">
        Livres agora <span className="grupo-contagem">{eligible.length}</span>
      </h3>
      {eligible.length === 0 ? (
        <p className="grupo-vazio">Ninguém está livre neste horário.</p>
      ) : (
        <ul className="candidatos">
          {eligible.map((opt) => (
            <li key={opt.teacher.id}>
              <button
                type="button"
                className={`candidato ${opt.isCurrent ? 'is-atual' : ''}`}
                onClick={() => choose(opt.teacher.id)}
                aria-current={opt.isCurrent || undefined}
              >
                <span className="candidato-texto">
                  <span className="candidato-nome">{displayName(opt.teacher.name)}</span>
                  <span className="candidato-meta">
                    <span
                      className={`area-ponto area-${areaKey(opt.teacher.knowledgeArea)}`}
                      aria-hidden="true"
                    />
                    {opt.teacher.mainSubject}
                    {opt.affinity && <span className="cor-coberta"> · {opt.affinity}</span>}
                    {opt.tier > 1 && <span className="cor-ultimo-recurso"> · {opt.detail}</span>}
                  </span>
                </span>
                <span className="candidato-contador">
                  {opt.isCurrent && (
                    <span className="candidato-atual">
                      <Check size={12} aria-hidden="true" /> Atual
                    </span>
                  )}
                  {opt.teacher.totalSubstitutionsCount}
                  <span className="candidato-contador-rotulo"> subst.</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <details className="indisponiveis">
        <summary>
          Indisponíveis <span className="grupo-contagem">{unavailable.length}</span>
        </summary>
        <ul className="candidatos">
          {unavailable.map((opt) => (
            <li key={opt.teacher.id} className="candidato is-indisponivel">
              <span className="candidato-texto">
                <span className="candidato-nome">{displayName(opt.teacher.name)}</span>
                <span className="candidato-meta">{opt.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </details>
    </Modal>
  );
};
