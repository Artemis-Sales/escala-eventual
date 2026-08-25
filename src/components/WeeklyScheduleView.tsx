import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Edit3,
  Check,
  X,
  Users,
  Calendar,
  School,
  Search,
  Filter,
  FileDown,
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { useSchool } from '../context/SchoolContext';
import { DAYS_OF_WEEK } from '../data/mockData';
import { MultiplicaModal } from './MultiplicaModal';
import type { DayOfWeek, ScheduleSlot, SlotType, ClassGroup } from '../types';

export const WeeklyScheduleView: React.FC = () => {
  const { teachers, classes, periods, scheduleSlots, updateSlot } = useSchool();

  // Mode: 'geral_dia' | 'professor' | 'turma'
  const [viewMode, setViewMode] = useState<'geral_dia' | 'professor' | 'turma'>('geral_dia');

  // Filtros
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('segunda');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(teachers[0]?.id || 't_1');
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '6A');
  const [segmentFilter, setSegmentFilter] = useState<'todos' | 'fundamental' | 'medio'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Modais
  const [editingSlot, setEditingSlot] = useState<ScheduleSlot | null>(null);
  const [isMultiplicaOpen, setIsMultiplicaOpen] = useState(false);

  const selectedTeacher = teachers.find((t) => t.id === selectedTeacherId);
  const selectedClass = classes.find((c) => c.id === selectedClassId || c.name === selectedClassId);

  // Filtrar turmas pelo segmento
  const filteredClasses = classes.filter((c) => {
    if (segmentFilter === 'fundamental') return c.segment === 'Ensino Fundamental II';
    if (segmentFilter === 'medio') return c.segment === 'Ensino Médio';
    return true;
  });

  const handleSaveSlot = (updated: ScheduleSlot) => {
    updateSlot(updated);
    setEditingSlot(null);
  };

  // Exportar Grade Geral do Dia para Excel
  const handleExportGeneralExcel = () => {
    const rows: any[] = [];

    filteredClasses.forEach((cls) => {
      const rowObj: any = { 'Turma / Ano': cls.name };

      periods.forEach((p) => {
        const slot = scheduleSlots.find(
          (s) =>
            s.dayOfWeek === selectedDay &&
            s.periodId === p.id &&
            (s.classId === cls.id || s.classId === cls.name) &&
            s.type === 'AULA'
        );

        if (slot) {
          const teacher = teachers.find((t) => t.id === slot.teacherId);
          rowObj[`${p.label} (${p.time})`] = `${slot.subject || teacher?.mainSubject || 'Aula'} - ${teacher?.name || 'Prof'}`;
        } else {
          rowObj[`${p.label} (${p.time})`] = '- - -';
        }
      });

      rows.push(rowObj);
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Grade_${selectedDay.toUpperCase()}`);
    XLSX.writeFile(workbook, `Grade_Geral_${selectedDay.toUpperCase()}_Todas_Turmas.xlsx`);
  };

  return (
    <div className="weekly-schedule-view">
      {/* Barra Superior com Alternador de Modos e Ações Rápidas */}
      <div className="schedule-header-controls">
        <div className="schedule-mode-toggle">
          <button
            className={`btn-mode-tab ${viewMode === 'geral_dia' ? 'active' : ''}`}
            onClick={() => setViewMode('geral_dia')}
          >
            <School size={16} />
            <span>Grade Geral do Dia (Todas as Turmas)</span>
          </button>

          <button
            className={`btn-mode-tab ${viewMode === 'professor' ? 'active' : ''}`}
            onClick={() => setViewMode('professor')}
          >
            <Users size={16} />
            <span>Grade por Professor</span>
          </button>

          <button
            className={`btn-mode-tab ${viewMode === 'turma' ? 'active' : ''}`}
            onClick={() => setViewMode('turma')}
          >
            <BookOpen size={16} />
            <span>Grade por Turma</span>
          </button>
        </div>

        <div className="schedule-header-actions-right">
          <button
            onClick={() => setIsMultiplicaOpen(true)}
            className="btn-multiplica-banner btn-sm"
          >
            <GraduationCap size={15} />
            <span>Multiplica SP (1h30)</span>
          </button>

          <button
            onClick={handleExportGeneralExcel}
            className="btn-secondary btn-sm"
            title="Baixar Grade em Excel"
          >
            <FileDown size={15} />
            <span>Exportar Excel</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODO 1: GRADE GERAL DO DIA (TODAS AS TURMAS) */}
      {/* ========================================================================= */}
      {viewMode === 'geral_dia' && (
        <div className="general-day-schedule-section">
          <div className="filters-bar-card">
            {/* Seletor de Dia */}
            <div className="day-picker-group">
              <label className="filter-label">
                <Calendar size={15} />
                <span>Dia:</span>
              </label>
              <div className="day-buttons-row">
                {DAYS_OF_WEEK.map((d) => (
                  <button
                    key={d.key}
                    className={`btn-day-pill ${selectedDay === d.key ? 'active' : ''}`}
                    onClick={() => setSelectedDay(d.key)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro de Segmento */}
            <div className="segment-filter-group">
              <label className="filter-label">
                <Filter size={15} />
                <span>Segmento:</span>
              </label>
              <div className="segment-buttons-row">
                <button
                  className={`btn-segment-chip ${segmentFilter === 'todos' ? 'active' : ''}`}
                  onClick={() => setSegmentFilter('todos')}
                >
                  Todas ({classes.length})
                </button>
                <button
                  className={`btn-segment-chip ${segmentFilter === 'fundamental' ? 'active' : ''}`}
                  onClick={() => setSegmentFilter('fundamental')}
                >
                  Fundamental II
                </button>
                <button
                  className={`btn-segment-chip ${segmentFilter === 'medio' ? 'active' : ''}`}
                  onClick={() => setSegmentFilter('medio')}
                >
                  Ensino Médio
                </button>
              </div>
            </div>

            {/* Busca Rápida */}
            <div className="search-filter-box">
              <Search size={15} />
              <input
                type="text"
                placeholder="Filtrar professor ou disciplina..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="general-matrix-container">
            <table className="general-matrix-table">
              <thead>
                <tr>
                  <th className="th-class-col">Turma</th>
                  {periods.map((period) => (
                    <th key={period.id} className="th-period-col">
                      <div className="matrix-period-label">{period.label}</div>
                      <div className="matrix-period-time">{period.time}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map((cls) => {
                  return (
                    <tr key={cls.id}>
                      <td className="td-class-header">
                        <div className="matrix-class-title">{cls.name}</div>
                        <span className="matrix-class-segment">{cls.segment}</span>
                      </td>

                      {periods.map((period) => {
                        const slot = scheduleSlots.find(
                          (s) =>
                            s.dayOfWeek === selectedDay &&
                            s.periodId === period.id &&
                            (s.classId === cls.id || s.classId === cls.name) &&
                            s.type === 'AULA'
                        );

                        const teacher = slot ? teachers.find((t) => t.id === slot.teacherId) : null;
                        const subjectName = slot?.subject || teacher?.mainSubject || '';

                        const matchesSearch =
                          !searchQuery ||
                          cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (teacher?.name || '').toLowerCase().includes(searchQuery.toLowerCase());

                        return (
                          <td
                            key={period.id}
                            className={`td-matrix-cell ${slot ? 'cell-has-class' : 'cell-empty'} ${
                              !matchesSearch && searchQuery ? 'cell-dimmed' : ''
                            }`}
                            onClick={() =>
                              setEditingSlot(
                                slot || {
                                  id: `slot_${teacher?.id || 't_1'}_${selectedDay}_${period.id}`,
                                  teacherId: teacher?.id || 't_1',
                                  dayOfWeek: selectedDay,
                                  periodId: period.id,
                                  type: 'AULA',
                                  classId: cls.id,
                                  subject: '',
                                }
                              )
                            }
                          >
                            {slot && teacher ? (
                              <div className="matrix-cell-box">
                                <div className="matrix-subject-name" title={subjectName}>
                                  {subjectName}
                                </div>
                                <div className="matrix-teacher-row">
                                  <div
                                    className="matrix-teacher-avatar"
                                    style={{ backgroundColor: teacher.color || '#3B82F6' }}
                                  >
                                    {teacher.name.charAt(0)}
                                  </div>
                                  <span className="matrix-teacher-name" title={teacher.name}>
                                    {teacher.name}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="matrix-empty-slot">
                                <span>- - -</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODO 2: GRADE INDIVIDUAL POR PROFESSOR */}
      {/* ========================================================================= */}
      {viewMode === 'professor' && (
        <div className="teacher-individual-schedule-section">
          {/* Seletor do Professor */}
          <div className="schedule-top-bar">
            <div className="teacher-select-group">
              <label className="input-label">
                <Users size={16} />
                <span>Professor Selecionado:</span>
              </label>
              <select
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="select-input-custom"
                style={{ minWidth: 320 }}
              >
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {t.mainSubject} ({t.knowledgeArea}) {t.isExemptFromSubstitutions ? '🚫 [Isento]' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Card de Perfil do Professor */}
          {selectedTeacher && (
            <div className="teacher-profile-card">
              <div className="profile-left">
                <div
                  className="profile-avatar"
                  style={{ backgroundColor: selectedTeacher.color || '#3B82F6' }}
                >
                  {selectedTeacher.name.charAt(0)}
                </div>
                <div>
                  <h2 className="profile-name">{selectedTeacher.name}</h2>
                  <div className="profile-badges">
                    <span className="badge-primary">{selectedTeacher.mainSubject}</span>
                    <span className="badge-secondary">{selectedTeacher.knowledgeArea}</span>
                    {selectedTeacher.isExemptFromSubstitutions && (
                      <span className="badge-exempt">🚫 Isento de Substituições</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="profile-stats">
                <div className="mini-stat">
                  <span className="mini-stat-num text-primary">
                    {scheduleSlots.filter((s) => s.teacherId === selectedTeacher.id && s.type === 'AULA').length}
                  </span>
                  <span className="mini-stat-label">Aulas na Semana</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat-num text-warning">
                    {scheduleSlots.filter((s) => s.teacherId === selectedTeacher.id && s.type === 'CURSO_FORMACAO').length}
                  </span>
                  <span className="mini-stat-label">Cursos / ATPC</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat-num text-success">
                    {scheduleSlots.filter((s) => s.teacherId === selectedTeacher.id && s.type === 'LIVRE').length}
                  </span>
                  <span className="mini-stat-label">Horários Livres</span>
                </div>
              </div>
            </div>
          )}

          {/* Legenda de Cores */}
          <div className="schedule-legend">
            <div className="legend-item">
              <div className="legend-box legend-aula"></div>
              <span>Aula com Turma</span>
            </div>
            <div className="legend-item">
              <div className="legend-box legend-multiplica"></div>
              <span>Multiplica SP (1h30)</span>
            </div>
            <div className="legend-item">
              <div className="legend-box legend-curso"></div>
              <span>ATPC / Formação</span>
            </div>
            <div className="legend-item">
              <div className="legend-box legend-livre"></div>
              <span>Livre / Janela (Disponível p/ Substituição)</span>
            </div>
          </div>

          {/* Tabela da Grade Semanal do Professor */}
          <div className="schedule-table-container">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th className="th-period">Período / Horário</th>
                  {DAYS_OF_WEEK.map((d) => (
                    <th key={d.key} className="th-day">
                      {d.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map((period) => (
                  <tr key={period.id}>
                    <td className="td-period-header">
                      <div className="period-label-main">{period.label}</div>
                      <div className="period-time-sub">{period.time}</div>
                    </td>

                    {DAYS_OF_WEEK.map((d) => {
                      const slot = scheduleSlots.find(
                        (s) => s.teacherId === selectedTeacherId && s.dayOfWeek === d.key && s.periodId === period.id
                      );

                      const slotType: SlotType = slot?.type || 'LIVRE';
                      const isMultiplica = slot?.trainingName?.includes('Multiplica');
                      const classGroup = classes.find((c) => c.id === slot?.classId || c.name === slot?.classId);

                      return (
                        <td
                          key={d.key}
                          className={`td-slot slot-${slotType.toLowerCase()} ${isMultiplica ? 'slot-multiplica' : ''}`}
                          onClick={() =>
                            setEditingSlot(
                              slot || {
                                id: `slot_${selectedTeacherId}_${d.key}_${period.id}`,
                                teacherId: selectedTeacherId,
                                dayOfWeek: d.key,
                                periodId: period.id,
                                type: 'LIVRE',
                              }
                            )
                          }
                        >
                          <div className="slot-cell-content">
                            {slotType === 'AULA' && (
                              <>
                                <div className="slot-class-name">
                                  <BookOpen size={12} />
                                  <span title={slot?.classId}>{classGroup?.name || slot?.classId || 'Turma'}</span>
                                </div>
                                <div className="slot-subject-name">
                                  {slot?.subject || selectedTeacher?.mainSubject}
                                </div>
                              </>
                            )}

                            {slotType === 'CURSO_FORMACAO' && (
                              <>
                                <div className={`slot-training-title ${isMultiplica ? 'text-multiplica' : ''}`}>
                                  <GraduationCap size={13} />
                                  <span>{slot?.trainingName || 'ATPC / Formação'}</span>
                                </div>
                                <span className={`slot-blocked-badge ${isMultiplica ? 'badge-multiplica' : ''}`}>
                                  {isMultiplica ? 'Multiplica SP' : 'Bloqueado'}
                                </span>
                              </>
                            )}

                            {slotType === 'LIVRE' && (
                              <div className="slot-free-text">
                                <ShieldCheck size={13} />
                                <span>Livre (Janela)</span>
                              </div>
                            )}

                            <button className="btn-edit-slot-hover" title="Clique para editar este horário">
                              <Edit3 size={11} />
                            </button>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODO 3: GRADE SEMANAL POR TURMA */}
      {/* ========================================================================= */}
      {viewMode === 'turma' && (
        <div className="class-individual-schedule-section">
          {/* Seletor de Turma */}
          <div className="schedule-top-bar">
            <div className="teacher-select-group">
              <label className="input-label">
                <BookOpen size={16} />
                <span>Turma Selecionada:</span>
              </label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="select-input-custom"
                style={{ minWidth: 260 }}
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — ({c.segment})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Banner da Turma */}
          {selectedClass && (
            <div className="class-profile-banner">
              <div className="class-banner-left">
                <div className="class-avatar-box">
                  <School size={24} />
                </div>
                <div>
                  <h2 className="class-banner-title">{selectedClass.name}</h2>
                  <span className="class-banner-segment">{selectedClass.segment}</span>
                </div>
              </div>
              <div className="class-banner-stats">
                <div className="mini-stat">
                  <span className="mini-stat-num text-primary">
                    {
                      scheduleSlots.filter(
                        (s) => (s.classId === selectedClass.id || s.classId === selectedClass.name) && s.type === 'AULA'
                      ).length
                    }
                  </span>
                  <span className="mini-stat-label">Aulas / Semana</span>
                </div>
              </div>
            </div>
          )}

          {/* Tabela Semanal da Turma */}
          <div className="schedule-table-container">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th className="th-period">Período / Horário</th>
                  {DAYS_OF_WEEK.map((d) => (
                    <th key={d.key} className="th-day">
                      {d.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map((period) => (
                  <tr key={period.id}>
                    <td className="td-period-header">
                      <div className="period-label-main">{period.label}</div>
                      <div className="period-time-sub">{period.time}</div>
                    </td>

                    {DAYS_OF_WEEK.map((d) => {
                      const slot = scheduleSlots.find(
                        (s) =>
                          s.dayOfWeek === d.key &&
                          s.periodId === period.id &&
                          (s.classId === selectedClassId || s.classId === selectedClass?.name) &&
                          s.type === 'AULA'
                      );

                      const teacher = slot ? teachers.find((t) => t.id === slot.teacherId) : null;
                      const subjectName = slot?.subject || teacher?.mainSubject || '';

                      return (
                        <td key={d.key} className={`td-slot ${slot ? 'slot-aula' : 'slot-livre'}`}>
                          <div className="slot-cell-content">
                            {slot && teacher ? (
                              <>
                                <div className="slot-subject-name" style={{ color: '#1E40AF', fontWeight: 800 }}>
                                  {subjectName}
                                </div>
                                <div className="matrix-teacher-row" style={{ marginTop: 2 }}>
                                  <div
                                    className="matrix-teacher-avatar"
                                    style={{ backgroundColor: teacher.color || '#3B82F6', width: 18, height: 18 }}
                                  >
                                    {teacher.name.charAt(0)}
                                  </div>
                                  <span className="matrix-teacher-name" style={{ fontWeight: 600 }}>
                                    {teacher.name}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="matrix-empty-slot">
                                <span>- - -</span>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de Edição de Slot */}
      {editingSlot && (
        <SlotEditModal
          slot={editingSlot}
          classes={classes}
          teacherSubject={selectedTeacher?.mainSubject || ''}
          onSave={handleSaveSlot}
          onClose={() => setEditingSlot(null)}
        />
      )}

      {/* Modal do Multiplica SP */}
      {isMultiplicaOpen && (
        <MultiplicaModal onClose={() => setIsMultiplicaOpen(false)} />
      )}
    </div>
  );
};

interface SlotEditModalProps {
  slot: ScheduleSlot;
  classes: ClassGroup[];
  teacherSubject: string;
  onSave: (slot: ScheduleSlot) => void;
  onClose: () => void;
}

const SlotEditModal: React.FC<SlotEditModalProps> = ({
  slot,
  classes,
  teacherSubject,
  onSave,
  onClose,
}) => {
  const [type, setType] = useState<SlotType>(slot.type || 'LIVRE');
  const [classId, setClassId] = useState(slot.classId || classes[0]?.id || '');
  const [subject, setSubject] = useState(slot.subject || teacherSubject);
  const [trainingName, setTrainingName] = useState(
    slot.trainingName || 'ATPC / Formação Pedagógica'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...slot,
      type,
      classId: type === 'AULA' ? classId : undefined,
      subject: type === 'AULA' ? subject : undefined,
      trainingName: type === 'CURSO_FORMACAO' ? trainingName : undefined,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Editar Horário</h3>
          <button className="btn-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="input-label">Tipo de Ocupação:</label>
              <div className="type-toggle-buttons">
                <button
                  type="button"
                  className={`btn-type-toggle ${type === 'AULA' ? 'active aula' : ''}`}
                  onClick={() => setType('AULA')}
                >
                  <BookOpen size={16} />
                  <span>Em Aula</span>
                </button>

                <button
                  type="button"
                  className={`btn-type-toggle ${type === 'CURSO_FORMACAO' ? 'active curso' : ''}`}
                  onClick={() => setType('CURSO_FORMACAO')}
                >
                  <GraduationCap size={16} />
                  <span>Curso / ATPC</span>
                </button>

                <button
                  type="button"
                  className={`btn-type-toggle ${type === 'LIVRE' ? 'active livre' : ''}`}
                  onClick={() => setType('LIVRE')}
                >
                  <ShieldCheck size={16} />
                  <span>Livre / Janela</span>
                </button>
              </div>
            </div>

            {type === 'AULA' && (
              <>
                <div className="form-group">
                  <label className="input-label">Turma:</label>
                  <select
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    className="select-input-custom"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.segment})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="input-label">Disciplina Ministrada:</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="text-input-custom"
                    placeholder="Ex: MATEMÁTICA, HISTÓRIA..."
                    required
                  />
                </div>
              </>
            )}

            {type === 'CURSO_FORMACAO' && (
              <div className="form-group">
                <label className="input-label">Nome do Curso / ATPC / Multiplica:</label>
                <div className="quick-training-presets">
                  <button
                    type="button"
                    className="btn-preset-chip"
                    onClick={() => setTrainingName('Multiplica SP (1h30 - Cursista)')}
                  >
                    Multiplica SP (Cursista)
                  </button>
                  <button
                    type="button"
                    className="btn-preset-chip"
                    onClick={() => setTrainingName('Multiplica SP (1h30 - Formador)')}
                  >
                    Multiplica SP (Formador)
                  </button>
                  <button
                    type="button"
                    className="btn-preset-chip"
                    onClick={() => setTrainingName('ATPC / Formação Pedagógica')}
                  >
                    ATPC Geral
                  </button>
                </div>
                <input
                  type="text"
                  value={trainingName}
                  onChange={(e) => setTrainingName(e.target.value)}
                  className="text-input-custom"
                  style={{ marginTop: 8 }}
                  required
                />
                <small className="help-text">
                  ⚠️ Professores em formação ou no Multiplica SP ficam bloqueados para substituições.
                </small>
              </div>
            )}

            {type === 'LIVRE' && (
              <div className="info-box-livre">
                <ShieldCheck size={18} />
                <span>
                  O professor estará <strong>disponível</strong> para cobrir eventuais faltas neste período.
                </span>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              <Check size={16} /> Salvar Horário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
