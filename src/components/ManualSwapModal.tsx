import React from 'react';
import {
  X,
  Check,
  AlertTriangle,
  BookOpen,
  Clock,
  ShieldCheck,
  UserMinus,
  GraduationCap,
  Ban,
  Crown,
  Briefcase,
} from 'lucide-react';
import type { SubstitutionItem } from '../types';
import { useSchool } from '../context/SchoolContext';

interface ManualSwapModalProps {
  item: SubstitutionItem;
  onClose: () => void;
}

export const ManualSwapModal: React.FC<ManualSwapModalProps> = ({ item, onClose }) => {
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

  const teacherOptions = teachers.map((teacher) => {
    const isAbsent = absentTeacherIds.includes(teacher.id);
    const isCurrentSub = teacher.id === item.substituteTeacherId;
    const isAlreadyAssignedInPeriod = alreadyAllocatedInPeriod.has(teacher.id);
    const isExempt = teacher.isExemptFromSubstitutions;
    const isAreaCoordinator = teacher.role === 'COORDENADOR_AREA';
    const isManagementTeam = teacher.role === 'EQUIPE_GESTORA';

    const slot = scheduleSlots.find(
      (s) => s.teacherId === teacher.id && s.dayOfWeek === selectedDay && s.periodId === item.periodId
    );

    let status: 'LIVRE' | 'AULA' | 'CURSO' | 'MULTIPLICA' | 'AUSENTE' | 'ALOCADO_OUTRA_TURMA' | 'ISENTO' | 'COORD_AREA' | 'GESTAO' = 'LIVRE';
    let detail = 'Disponível (Janela Livre)';
    let tier: 1 | 2 | 3 = 1;

    if (isExempt) {
      status = 'ISENTO';
      detail = 'Isento de Substituições (Curso Técnico)';
    } else if (isAbsent) {
      status = 'AUSENTE';
      detail = 'Ausente no dia';
    } else if (slot?.type === 'AULA') {
      status = 'AULA';
      detail = `Em aula (${slot.subject || 'Lecionando'})`;
    } else if (slot?.type === 'ELETIVA' || slot?.type === 'ATIVIDADE') {
      status = 'AULA';
      detail = slot.trainingName || (slot.type === 'ELETIVA' ? 'Eletiva' : 'Atividade');
    } else if (slot?.type === 'CURSO_FORMACAO') {
      if (slot.trainingName?.includes('Multiplica')) {
        status = 'MULTIPLICA';
        detail = 'Em Multiplica SP (1h30)';
      } else {
        status = 'CURSO';
        detail = `Em formação (${slot.trainingName || 'ATPC'})`;
      }
    } else if (isAlreadyAssignedInPeriod) {
      status = 'ALOCADO_OUTRA_TURMA';
      detail = 'Já escalado em outra turma neste período';
    } else if (isManagementTeam) {
      tier = 3;
      status = 'GESTAO';
      detail = 'Equipe Gestora (Último recurso em caso extremo)';
    } else if (isAreaCoordinator) {
      tier = 2;
      status = 'COORD_AREA';
      detail = 'Coordenação de Área (Entra apenas se não houver opção)';
    }

    const isSameSubject =
      originalTeacher &&
      (teacher.mainSubject.toLowerCase() === originalTeacher.mainSubject.toLowerCase() ||
        teacher.secondarySubjects?.some(
          (sub) => sub.toLowerCase() === originalTeacher.mainSubject.toLowerCase()
        ));

    const isSameArea =
      originalTeacher && teacher.knowledgeArea === originalTeacher.knowledgeArea;

    let affinityTag = '';
    if (isSameSubject) affinityTag = 'Mesma Disciplina';
    else if (isSameArea) affinityTag = 'Mesma Área';
    else if (isAreaCoordinator) affinityTag = 'Coord. de Área';
    else if (isManagementTeam) affinityTag = 'Equipe Gestora';

    const isEligible =
      status === 'LIVRE' || status === 'COORD_AREA' || status === 'GESTAO';

    return {
      teacher,
      status,
      detail,
      tier,
      isCurrentSub,
      isEligible,
      affinityTag,
      subCount: teacher.totalSubstitutionsCount,
    };
  });

  teacherOptions.sort((a, b) => {
    if (a.isEligible && !b.isEligible) return -1;
    if (!a.isEligible && b.isEligible) return 1;
    if (a.tier !== b.tier) return a.tier - b.tier;
    return a.subCount - b.subCount;
  });

  const handleSelect = (teacherId: string | null) => {
    updateSubstitutionItem(item.id, teacherId);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Substituição Manual</h3>
            <p className="modal-subtitle">
              {item.periodLabel} ({item.periodTime}) • <strong>{item.className}</strong> •{' '}
              {item.originalSubject} (Ausente: {item.originalTeacherName})
            </p>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="selection-instructions">
            <span>Selecione um professor disponível ou deixe a aula sem substituto:</span>
            <button
              onClick={() => handleSelect(null)}
              className="btn-danger-outline btn-xs"
            >
              <UserMinus size={14} />
              Deixar Sem Substituto
            </button>
          </div>

          <div className="candidates-list">
            {teacherOptions.map((opt) => {
              const isSelected = opt.isCurrentSub;

              return (
                <div
                  key={opt.teacher.id}
                  className={`candidate-card ${
                    opt.isEligible ? 'eligible' : 'ineligible'
                  } ${isSelected ? 'selected' : ''} ${
                    opt.tier === 2 ? 'candidate-pca' : ''
                  } ${opt.tier === 3 ? 'candidate-gestao' : ''}`}
                  onClick={() => opt.isEligible && handleSelect(opt.teacher.id)}
                >
                  <div className="candidate-left">
                    <div
                      className="candidate-avatar"
                      style={{ backgroundColor: opt.teacher.color || '#3B82F6' }}
                    >
                      {opt.teacher.name.charAt(0)}
                    </div>
                    <div>
                      <div className="candidate-name-row">
                        <span className="candidate-name">{opt.teacher.name}</span>
                        {isSelected && (
                          <span className="badge-current-sub">
                            <Check size={12} /> Atual
                          </span>
                        )}
                        {opt.tier === 2 && (
                          <span className="badge-pca-tag">
                            <Crown size={11} /> Coord. Área
                          </span>
                        )}
                        {opt.tier === 3 && (
                          <span className="badge-gestao-tag">
                            <Briefcase size={11} /> Gestão
                          </span>
                        )}
                        {opt.affinityTag && opt.tier === 1 && (
                          <span className="badge-affinity">{opt.affinityTag}</span>
                        )}
                        {opt.status === 'ISENTO' && (
                          <span className="badge-exempt">
                            <Ban size={11} /> Não Substitui
                          </span>
                        )}
                      </div>
                      <div className="candidate-subject">
                        {opt.teacher.mainSubject} • {opt.teacher.knowledgeArea}
                      </div>
                    </div>
                  </div>

                  <div className="candidate-right">
                    <div className="sub-count-tag">
                      <strong>{opt.subCount}</strong> subs feitas
                    </div>

                    <div className={`status-badge status-${opt.status.toLowerCase()}`}>
                      {opt.status === 'LIVRE' && <ShieldCheck size={14} />}
                      {opt.status === 'COORD_AREA' && <Crown size={14} />}
                      {opt.status === 'GESTAO' && <Briefcase size={14} />}
                      {opt.status === 'AULA' && <BookOpen size={14} />}
                      {opt.status === 'CURSO' && <Clock size={14} />}
                      {opt.status === 'MULTIPLICA' && <GraduationCap size={14} />}
                      {opt.status === 'AUSENTE' && <AlertTriangle size={14} />}
                      {opt.status === 'ISENTO' && <Ban size={14} />}
                      <span>{opt.detail}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
