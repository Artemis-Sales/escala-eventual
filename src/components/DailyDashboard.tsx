import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Share2,
  Printer,
  FileDown,
  Search,
  Check,
  UserX,
  Clock,
  ArrowRight,
  SlidersHorizontal,
  GraduationCap,
  Info,
  Eye,
  Crown,
  Briefcase,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSchool } from '../context/SchoolContext';
import { DAYS_OF_WEEK } from '../data/mockData';
import type { SubstitutionItem } from '../types';
import { ManualSwapModal } from './ManualSwapModal';
import { MultiplicaModal } from './MultiplicaModal';
import { ScalePreviewModal } from './ScalePreviewModal';
import { formatWhatsAppMessage } from '../utils/substitutionEngine';
import { exportDailyPlanToExcel } from '../utils/excelHelper';
import { printScaleDocument } from '../utils/printHelper';

export const DailyDashboard: React.FC = () => {
  const {
    teachers,
    selectedDate,
    selectedDay,
    setSelectedDate,
    absentTeacherIds,
    toggleAbsentTeacher,
    clearAbsentTeachers,
    generateSchedule,
    currentPlan,
    confirmAndSavePlan,
    scheduleSlots,
  } = useSchool();

  const [searchTeacher, setSearchTeacher] = useState('');
  const [editingItem, setEditingItem] = useState<SubstitutionItem | null>(null);
  const [isMultiplicaOpen, setIsMultiplicaOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleGenerate = () => {
    if (absentTeacherIds.length === 0) {
      alert('Por favor, selecione ao menos um professor faltante para gerar a escala.');
      return;
    }
    generateSchedule();

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }, 150);
  };

  const handleWhatsAppCopy = () => {
    if (!currentPlan) return;
    const text = formatWhatsAppMessage(currentPlan, teachers);
    navigator.clipboard.writeText(text);
    showToast('📋 Mensagem copiada com sucesso! Pronta para colar no WhatsApp.');
  };

  const handlePrint = () => {
    if (!currentPlan) return;
    printScaleDocument(currentPlan, teachers);
  };

  const handleExcelExport = () => {
    if (!currentPlan) return;
    exportDailyPlanToExcel(currentPlan, teachers);
    showToast('📊 Planilha Excel gerada e baixada com sucesso!');
  };

  const handleConfirmSave = () => {
    if (!currentPlan) return;
    confirmAndSavePlan();
    showToast('✅ Escala oficializada com sucesso no histórico e contadores de professores atualizados!');
  };

  const multiplicaTodayCount = new Set(
    scheduleSlots
      .filter(
        (s) =>
          s.dayOfWeek === selectedDay &&
          s.type === 'CURSO_FORMACAO' &&
          s.trainingName?.includes('Multiplica')
      )
      .map((s) => s.teacherId)
  ).size;

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTeacher.toLowerCase()) ||
      t.mainSubject.toLowerCase().includes(searchTeacher.toLowerCase()) ||
      t.knowledgeArea.toLowerCase().includes(searchTeacher.toLowerCase())
  );

  const dayObj = DAYS_OF_WEEK.find((d) => d.key === selectedDay);

  const pcaCount = currentPlan?.substitutions.filter((s) => s.tier === 2).length || 0;
  const gestaoCount = currentPlan?.substitutions.filter((s) => s.tier === 3).length || 0;

  return (
    <div className="daily-dashboard">
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="dashboard-screen-content">
        <section className="dashboard-control-card">
          <div className="control-card-header">
            <div className="date-picker-group">
              <label className="input-label">
                <Calendar size={16} />
                <span>Data da Escala:</span>
              </label>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                />
                <span className="day-badge">
                  <Clock size={13} />
                  {dayObj?.label || 'Dia Letivo'}
                </span>
              </div>
            </div>

            <div className="control-header-right-actions">
              <button
                onClick={() => setIsMultiplicaOpen(true)}
                className="btn-multiplica-trigger"
                title="Gerenciar horários do curso Multiplica SP (1h30)"
              >
                <GraduationCap size={16} />
                <span>Multiplica SP (1h30)</span>
                {multiplicaTodayCount > 0 && (
                  <span className="badge-multiplica-count">{multiplicaTodayCount} hoje</span>
                )}
              </button>

              <div className="absent-summary-stat">
                <span className="stat-label">Professores Faltantes:</span>
                <span className="stat-number">{absentTeacherIds.length}</span>
              </div>
            </div>
          </div>

          <div className="absent-selector-section">
            <div className="section-title-row">
              <div className="title-with-badge">
                <UserX className="text-danger" size={18} />
                <h3 className="section-title">1. Selecione os Professores Faltantes do Dia</h3>
              </div>

              <div className="selector-actions">
                <div className="search-box">
                  <Search size={15} />
                  <input
                    type="text"
                    placeholder="Buscar professor ou disciplina..."
                    value={searchTeacher}
                    onChange={(e) => setSearchTeacher(e.target.value)}
                  />
                </div>

                {absentTeacherIds.length > 0 && (
                  <button onClick={clearAbsentTeachers} className="btn-text-danger btn-xs">
                    Limpar Seleção ({absentTeacherIds.length})
                  </button>
                )}
              </div>
            </div>

            <div className="teacher-chips-grid">
              {filteredTeachers.map((teacher) => {
                const isAbsent = absentTeacherIds.includes(teacher.id);

                return (
                  <button
                    key={teacher.id}
                    type="button"
                    className={`teacher-chip ${isAbsent ? 'chip-absent' : ''}`}
                    onClick={() => toggleAbsentTeacher(teacher.id)}
                  >
                    <div
                      className="chip-avatar"
                      style={{ backgroundColor: isAbsent ? '#EF4444' : teacher.color || '#3B82F6' }}
                    >
                      {isAbsent ? <UserX size={14} /> : teacher.name.charAt(0)}
                    </div>
                    <div className="chip-info">
                      <span className="chip-name">{teacher.name}</span>
                      <span className="chip-subject">{teacher.mainSubject}</span>
                    </div>
                    {teacher.role === 'COORDENADOR_AREA' && (
                      <span className="chip-badge-pca" title="Coordenador de Área (Último recurso)">PCA</span>
                    )}
                    {teacher.role === 'EQUIPE_GESTORA' && (
                      <span className="chip-badge-gestao" title="Equipe Gestora (Caso extremo)">GESTÃO</span>
                    )}
                    {isAbsent && <span className="chip-badge-absent">FALTA</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="generate-cta-container">
            <button
              onClick={handleGenerate}
              disabled={absentTeacherIds.length === 0}
              className="btn-generate-scale"
            >
              <Sparkles size={20} className="sparkle-icon" />
              <span>Gerar Escala Inteligente de Substituição</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {currentPlan && (
          <section className="scale-results-section">
            {currentPlan.substitutions.length === 0 ? (
              <div className="alert-banner-warning" style={{ justifyContent: 'center', textAlign: 'center', padding: '24px' }}>
                <Info size={24} />
                <div>
                  <strong>Nenhuma aula encontrada para substituição neste dia!</strong>
                  <p style={{ margin: '6px 0 0 0', fontSize: '0.88rem' }}>
                    Os professores selecionados como ausentes não possuem aulas cadastradas nesta {dayObj?.label || 'data'}.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Official / Draft Status Bar */}
                <div className="scale-status-banner">
                  <div className="status-banner-left">
                    {currentPlan.isOfficial ? (
                      <div className="status-pill status-pill-official">
                        <ShieldCheck size={16} />
                        <span>ESCALA OFICIALIZADA</span>
                      </div>
                    ) : (
                      <div className="status-pill status-pill-draft">
                        <Clock size={16} />
                        <span>MODO RASCUNHO / CONFERÊNCIA</span>
                      </div>
                    )}

                    <span className="status-banner-desc">
                      {currentPlan.isOfficial
                        ? 'Esta escala já foi conferida, oficializada e registrada nos contadores de equidade.'
                        : 'Revise as substituições sugeridas abaixo ou use o botão "Pré-Visualizar & Oficializar" para conferir no estúdio interativo.'}
                    </span>
                  </div>

                  <div className="status-banner-right">
                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="btn-preview-trigger"
                    >
                      <Eye size={16} />
                      <span>Pré-Visualizar & Ajustar (Estúdio)</span>
                    </button>
                  </div>
                </div>

                <div className="results-header-card">
                  <div className="results-stats">
                    <div className="stat-card">
                      <span className="stat-title">Aulas Desfalcadas</span>
                      <span className="stat-value text-primary">{currentPlan.substitutions.length}</span>
                    </div>

                    <div className="stat-card">
                      <span className="stat-title">Aulas Cobertas</span>
                      <span className="stat-value text-success">
                        {currentPlan.substitutions.length - currentPlan.uncoveredCount}
                      </span>
                    </div>

                    {pcaCount > 0 && (
                      <div className="stat-card pca-card">
                        <span className="stat-title">Coord. de Área (PCA)</span>
                        <span className="stat-value text-warning">{pcaCount}</span>
                      </div>
                    )}

                    {gestaoCount > 0 && (
                      <div className="stat-card gestao-card">
                        <span className="stat-title">Equipe Gestora</span>
                        <span className="stat-value text-gestao">{gestaoCount}</span>
                      </div>
                    )}

                    {currentPlan.uncoveredCount > 0 && (
                      <div className="stat-card alert-card">
                        <span className="stat-title">Sem Substituto</span>
                        <span className="stat-value text-danger">{currentPlan.uncoveredCount}</span>
                      </div>
                    )}
                  </div>

                  <div className="results-export-actions">
                    <button onClick={handleWhatsAppCopy} className="btn-action-whatsapp">
                      <Share2 size={16} />
                      <span>Copiar WhatsApp</span>
                    </button>

                    <button onClick={handlePrint} className="btn-action-print">
                      <Printer size={16} />
                      <span>Imprimir A4 (1 Folha)</span>
                    </button>

                    <button onClick={handleExcelExport} className="btn-action-excel">
                      <FileDown size={16} />
                      <span>Exportar Excel</span>
                    </button>

                    {!currentPlan.isOfficial && (
                      <button onClick={handleConfirmSave} className="btn-action-save">
                        <Check size={16} />
                        <span>Oficializar Escala</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Banners Informativos de Tier */}
                {pcaCount > 0 && (
                  <div className="alert-banner-warning">
                    <Crown size={20} />
                    <div>
                      <strong>Coordenação de Área Acionada:</strong> {pcaCount} aula(s) foram atribuídas a
                      Coordenadores de Área (Alexandre, Adriana ou Marcia) como último recurso.
                    </div>
                  </div>
                )}

                {gestaoCount > 0 && (
                  <div className="alert-banner-info" style={{ borderColor: '#4338CA', background: '#EEF2FF', color: '#312E81' }}>
                    <Briefcase size={20} />
                    <div>
                      <strong>Caso Extremo (Equipe Gestora):</strong> {gestaoCount} aula(s) foram atribuídas à
                      Direção/Coordenação Geral (Genilson, Débora ou Renata).
                    </div>
                  </div>
                )}

                {currentPlan.uncoveredCount > 0 && (
                  <div className="alert-banner-warning">
                    <AlertTriangle size={20} />
                    <div>
                      <strong>Atenção:</strong> Há {currentPlan.uncoveredCount} aula(s) sem cobertura disponível.
                    </div>
                  </div>
                )}

                <div className="scale-periods-container">
                  {Array.from(new Set(currentPlan.substitutions.map((s) => s.periodId)))
                    .sort((a, b) => a - b)
                    .map((periodId) => {
                      const subsInPeriod = currentPlan.substitutions.filter(
                        (s) => s.periodId === periodId
                      );
                      const periodHeader = `${subsInPeriod[0].periodLabel} (${subsInPeriod[0].periodTime})`;

                      return (
                        <div key={periodId} className="period-substitution-group">
                          <div className="period-group-header">
                            <div className="period-time-badge">
                              <Clock size={15} />
                              <span>{periodHeader}</span>
                            </div>
                            <span className="period-subs-count">
                              {subsInPeriod.length} aula(s) neste horário
                            </span>
                          </div>

                          <div className="subs-cards-grid">
                            {subsInPeriod.map((item) => {
                              const hasSubstitute = !!item.substituteTeacherId;

                              return (
                                <div
                                  key={item.id}
                                  className={`substitution-card ${
                                    !hasSubstitute
                                      ? 'card-uncovered'
                                      : item.tier === 3
                                      ? 'card-gestao'
                                      : item.tier === 2
                                      ? 'card-pca'
                                      : 'card-allocated'
                                  }`}
                                >
                                  <div className="card-top">
                                    <div className="class-badge-pill">{item.className}</div>
                                    <div className="subject-tag">{item.originalSubject}</div>
                                  </div>

                                  <div className="card-body-details">
                                    <div className="teacher-role-row">
                                      <span className="role-label">Ausente:</span>
                                      <span className="teacher-absent-name">
                                        {item.originalTeacherName}
                                      </span>
                                    </div>

                                    <div className="substitute-assigned-box">
                                      <span className="role-label">Substituto Escalado:</span>
                                      <div className="substitute-name-row">
                                        {hasSubstitute ? (
                                          <>
                                            <span className="substitute-name">
                                              {item.substituteTeacherName}
                                            </span>
                                            {item.tier === 3 ? (
                                              <span className="badge-gestao-tag">
                                              <Briefcase size={11} /> Equipe Gestora
                                              </span>
                                            ) : item.tier === 2 ? (
                                              <span className="badge-pca-tag">
                                              <Crown size={11} /> Coord. Área
                                              </span>
                                            ) : item.matchType === 'MESMA_MATERIA' ? (
                                              <span className="badge-match match-subject">
                                                Mesma Disciplina
                                              </span>
                                            ) : item.matchType === 'MESMA_AREA' ? (
                                              <span className="badge-match match-area">
                                                Mesma Área
                                              </span>
                                            ) : item.matchType === 'MANUAL' ? (
                                              <span className="badge-match match-manual">
                                                Manual
                                              </span>
                                            ) : (
                                              <span className="badge-match match-disponivel">
                                                Disponível
                                              </span>
                                            )}
                                          </>
                                        ) : (
                                          <span className="uncovered-text">
                                            <AlertTriangle size={14} /> Sem Substituto Livre
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card-footer-actions">
                                    <button
                                      onClick={() => setEditingItem(item)}
                                      className="btn-swap-sub"
                                    >
                                      <SlidersHorizontal size={14} />
                                      <span>Trocar Substituto</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </section>
        )}
      </div>

      {editingItem && (
        <ManualSwapModal item={editingItem} onClose={() => setEditingItem(null)} />
      )}

      {isMultiplicaOpen && (
        <MultiplicaModal onClose={() => setIsMultiplicaOpen(false)} />
      )}

      {isPreviewOpen && currentPlan && (
        <ScalePreviewModal
          plan={currentPlan}
          teachers={teachers}
          onOfficialize={handleConfirmSave}
          onClose={() => setIsPreviewOpen(false)}
          onEditItem={(item) => setEditingItem(item)}
        />
      )}
    </div>
  );
};
