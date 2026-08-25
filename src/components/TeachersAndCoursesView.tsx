import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  Ban,
  Crown,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { MultiplicaModal } from './MultiplicaModal';
import type { Teacher, KnowledgeArea, StaffRole } from '../types';

export const TeachersAndCoursesView: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher, updateTeacherSubCount } = useSchool();

  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('TODAS');
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isMultiplicaOpen, setIsMultiplicaOpen] = useState(false);

  const areas: KnowledgeArea[] = [
    'Exatas',
    'Linguagens',
    'Ciências da Natureza',
    'Ciências Humanas',
    'Parte Diversificada',
    'Gestão Escolar',
  ];

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.mainSubject.toLowerCase().includes(search.toLowerCase());
    const matchesArea = selectedArea === 'TODAS' || t.knowledgeArea === selectedArea;
    return matchesSearch && matchesArea;
  });

  const handleSave = (teacherData: any) => {
    if (editingTeacher) {
      updateTeacher({ ...editingTeacher, ...teacherData });
      setEditingTeacher(null);
    } else if (isAddingNew) {
      addTeacher(teacherData);
      setIsAddingNew(false);
    }
  };

  return (
    <div className="teachers-view">
      <div className="teachers-header-card">
        <div className="search-filter-row">
          <div className="search-input-wrapper">
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar por nome ou disciplina..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input-modern"
            />
          </div>

          <div className="filter-chips">
            <button
              className={`filter-chip ${selectedArea === 'TODAS' ? 'active' : ''}`}
              onClick={() => setSelectedArea('TODAS')}
            >
              Todas as Áreas ({teachers.length})
            </button>
            {areas.map((area) => {
              const count = teachers.filter((t) => t.knowledgeArea === area).length;
              return (
                <button
                  key={area}
                  className={`filter-chip ${selectedArea === area ? 'active' : ''}`}
                  onClick={() => setSelectedArea(area)}
                >
                  {area} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div className="header-actions">
          <button
            onClick={() => setIsMultiplicaOpen(true)}
            className="btn-multiplica-banner"
          >
            <GraduationCap size={18} />
            <span>Gerenciar Multiplica SP (1h30)</span>
          </button>

          <button onClick={() => setIsAddingNew(true)} className="btn-primary">
            <Plus size={18} />
            <span>Cadastrar Professor / Gestor</span>
          </button>
        </div>
      </div>

      <div className="teachers-grid">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="teacher-card">
            <div className="tcard-top">
              <div
                className="tcard-avatar"
                style={{ backgroundColor: teacher.color || '#3B82F6' }}
              >
                {teacher.name.charAt(0)}
              </div>
              <div className="tcard-info">
                <h4 className="tcard-name">{teacher.name}</h4>
                <span className="tcard-subject">{teacher.mainSubject}</span>
                <span className="tcard-area">{teacher.knowledgeArea}</span>
              </div>
            </div>

            <div className="tcard-badges-row">
              {teacher.role === 'COORDENADOR_AREA' && (
                <span className="badge-pca-tag">
                  <Crown size={11} /> Coord. de Área (Último Recurso)
                </span>
              )}

              {teacher.role === 'EQUIPE_GESTORA' && (
                <span className="badge-gestao-tag">
                  <Briefcase size={11} /> Equipe Gestora (Caso Extremo)
                </span>
              )}

              {teacher.isExemptFromSubstitutions && (
                <div className="tcard-exempt-badge">
                  <Ban size={12} />
                  <span>Isento de Substituições</span>
                </div>
              )}
            </div>

            <div className="tcard-stats">
              <div className="tcard-stat-box">
                <span className="tstat-label">Substituições Realizadas:</span>
                <div className="tstat-counter-row">
                  <button
                    onClick={() => updateTeacherSubCount(teacher.id, -1)}
                    className="btn-counter-ctrl"
                    title="Diminuir"
                  >
                    -
                  </button>
                  <span className="tstat-number">{teacher.totalSubstitutionsCount}</span>
                  <button
                    onClick={() => updateTeacherSubCount(teacher.id, 1)}
                    className="btn-counter-ctrl"
                    title="Aumentar"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="tcard-actions">
              <button
                onClick={() => setEditingTeacher(teacher)}
                className="btn-card-edit"
                title="Editar dados"
              >
                <Edit2 size={15} />
                <span>Editar</span>
              </button>
              <button
                onClick={() => {
                  if (confirm(`Deseja realmente remover o docente ${teacher.name}?`)) {
                    deleteTeacher(teacher.id);
                  }
                }}
                className="btn-card-delete"
                title="Excluir"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {(editingTeacher || isAddingNew) && (
        <TeacherFormModal
          teacher={editingTeacher}
          areas={areas}
          onSave={handleSave}
          onClose={() => {
            setEditingTeacher(null);
            setIsAddingNew(false);
          }}
        />
      )}

      {isMultiplicaOpen && (
        <MultiplicaModal onClose={() => setIsMultiplicaOpen(false)} />
      )}
    </div>
  );
};

interface TeacherFormModalProps {
  teacher: Teacher | null;
  areas: KnowledgeArea[];
  onSave: (data: any) => void;
  onClose: () => void;
}

const TeacherFormModal: React.FC<TeacherFormModalProps> = ({
  teacher,
  areas,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(teacher?.name || '');
  const [mainSubject, setMainSubject] = useState(teacher?.mainSubject || '');
  const [knowledgeArea, setKnowledgeArea] = useState<KnowledgeArea>(
    teacher?.knowledgeArea || 'Exatas'
  );
  const [role, setRole] = useState<StaffRole>(teacher?.role || 'PROFESSOR');
  const [isExempt, setIsExempt] = useState(teacher?.isExemptFromSubstitutions || false);
  const [exemptReason, setExemptReason] = useState(
    teacher?.exemptReason || 'Professor do Curso Técnico (Não realiza substituições)'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim().toUpperCase(),
      mainSubject: mainSubject.trim().toUpperCase(),
      knowledgeArea,
      role,
      isExemptFromSubstitutions: isExempt,
      exemptReason: isExempt ? exemptReason : undefined,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {teacher ? 'Editar Integrante' : 'Cadastrar Novo Docente / Gestor'}
          </h3>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="input-label">Nome Completo:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-input-custom"
                required
                placeholder="Ex: PROF. CARLOS EDUARDO"
              />
            </div>

            <div className="form-group">
              <label className="input-label">Função / Cargo:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as StaffRole)}
                className="select-input-custom"
              >
                <option value="PROFESSOR">Professor Regular (Prioridade Padrão)</option>
                <option value="COORDENADOR_AREA">🌟 Coordenador de Área (Entra apenas se não houver outra opção)</option>
                <option value="EQUIPE_GESTORA">👔 Equipe Gestora - Direção/Coord. Geral (Caso Extremo)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="input-label">Disciplina Principal:</label>
              <input
                type="text"
                value={mainSubject}
                onChange={(e) => setMainSubject(e.target.value)}
                className="text-input-custom"
                required
                placeholder="Ex: MATEMATICA, FISICA..."
              />
            </div>

            <div className="form-group">
              <label className="input-label">Área do Conhecimento:</label>
              <select
                value={knowledgeArea}
                onChange={(e) => setKnowledgeArea(e.target.value as KnowledgeArea)}
                className="select-input-custom"
              >
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ background: '#FEF2F2', padding: 12, borderRadius: 8, border: '1px solid #FECACA' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 700, color: '#991B1B' }}>
                <input
                  type="checkbox"
                  checked={isExempt}
                  onChange={(e) => setIsExempt(e.target.checked)}
                  style={{ width: 18, height: 18 }}
                />
                <span>🚫 Isentar este docente de realizar substituições</span>
              </label>

              {isExempt && (
                <div style={{ marginTop: 8 }}>
                  <label className="input-label" style={{ fontSize: '0.78rem', color: '#7F1D1D' }}>
                    Motivo da Isenção:
                  </label>
                  <input
                    type="text"
                    value={exemptReason}
                    onChange={(e) => setExemptReason(e.target.value)}
                    className="text-input-custom"
                    placeholder="Ex: Professor do Curso Técnico..."
                  />
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              <Check size={16} /> Salvar Integrante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
