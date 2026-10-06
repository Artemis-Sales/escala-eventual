import React, { useMemo, useState } from 'react';
import { Minus, Plus, Search, Trash2 } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { MultiplicaModal } from './MultiplicaModal';
import { Modal } from './Modal';
import type { Teacher, KnowledgeArea, StaffRole } from '../types';
import { areaKey, displayName } from '../utils/display';

const AREAS: KnowledgeArea[] = [
  'Linguagens',
  'Ciências da Natureza',
  'Ciências Humanas',
  'Parte Diversificada',
  'Gestão Escolar',
];

const ROLE_LABEL: Record<StaffRole, string> = {
  PROFESSOR: 'Professor',
  COORDENADOR_AREA: 'Coord. de área',
  EQUIPE_GESTORA: 'Equipe gestora',
};

export const TeachersAndCoursesView: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher, updateTeacherSubCount } = useSchool();

  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState<KnowledgeArea | 'TODAS'>('TODAS');
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isMultiplicaOpen, setIsMultiplicaOpen] = useState(false);

  const q = search.trim().toLowerCase();
  const visible = useMemo(
    () =>
      teachers
        .filter(
          (t) =>
            (selectedArea === 'TODAS' || t.knowledgeArea === selectedArea) &&
            (!q || t.name.toLowerCase().includes(q) || t.mainSubject.toLowerCase().includes(q))
        )
        .sort((a, b) => displayName(a.name).localeCompare(displayName(b.name), 'pt-BR')),
    [teachers, selectedArea, q]
  );

  const handleSave = (data: Omit<Teacher, 'id' | 'totalSubstitutionsCount'>) => {
    if (editingTeacher) {
      updateTeacher({ ...editingTeacher, ...data });
      setEditingTeacher(null);
    } else if (isAddingNew) {
      addTeacher(data);
      setIsAddingNew(false);
    }
  };

  return (
    <div className="pagina">
      <div className="barra">
        <div className="pagina-titulos">
          <h1 className="pagina-titulo">Professores</h1>
          <p className="pagina-sub">
            {teachers.length} pessoas na escala. O contador de substituições é o que a escala usa
            para equilibrar a carga.
          </p>
        </div>
        <div className="barra-direita">
          <button type="button" className="btn btn-secundario" onClick={() => setIsMultiplicaOpen(true)}>
            Multiplica SP
          </button>
          <button type="button" className="btn btn-primario" onClick={() => setIsAddingNew(true)}>
            <Plus size={16} aria-hidden="true" />
            Cadastrar
          </button>
        </div>
      </div>

      <section className="painel">
        <div className="filtros">
          <div className="busca busca-compacta">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              placeholder="Nome ou disciplina"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar professor"
            />
          </div>

          <div className="filtro-areas" role="radiogroup" aria-label="Área">
            <button
              type="button"
              role="radio"
              aria-checked={selectedArea === 'TODAS'}
              className="filtro"
              onClick={() => setSelectedArea('TODAS')}
            >
              Todas <span className="filtro-contagem">{teachers.length}</span>
            </button>
            {AREAS.map((area) => (
              <button
                key={area}
                type="button"
                role="radio"
                aria-checked={selectedArea === area}
                className="filtro"
                onClick={() => setSelectedArea(area)}
              >
                <span className={`area-ponto area-${areaKey(area)}`} aria-hidden="true" />
                {area}{' '}
                <span className="filtro-contagem">
                  {teachers.filter((t) => t.knowledgeArea === area).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="tabela-rolagem">
          <table className="tabela pessoas">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Disciplina</th>
                <th scope="col">Área</th>
                <th scope="col">Nível</th>
                <th scope="col" className="col-numero">Substituições</th>
                <th scope="col" className="col-acao">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((t) => {
                const nome = displayName(t.name);
                return (
                  <tr key={t.id}>
                    <td data-rotulo="Nome">
                      <span className="pessoa-nome">{nome}</span>
                      {t.isExemptFromSubstitutions && (
                        <span className="selo selo-neutro" title={t.exemptReason}>
                          Isento
                        </span>
                      )}
                    </td>
                    <td data-rotulo="Disciplina">{t.mainSubject}</td>
                    <td data-rotulo="Área">
                      <span className="area-rotulo">
                        <span className={`area-ponto area-${areaKey(t.knowledgeArea)}`} aria-hidden="true" />
                        {t.knowledgeArea}
                      </span>
                    </td>
                    <td data-rotulo="Nível">
                      <span className={t.role && t.role !== 'PROFESSOR' ? 'cor-ultimo-recurso' : ''}>
                        {ROLE_LABEL[t.role ?? 'PROFESSOR']}
                      </span>
                    </td>
                    <td data-rotulo="Substituições" className="col-numero">
                      <div className="contador">
                        <button
                          type="button"
                          className="btn-icone"
                          onClick={() => updateTeacherSubCount(t.id, -1)}
                          disabled={t.totalSubstitutionsCount <= 0}
                          aria-label={`Diminuir substituições de ${nome}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="contador-valor">{t.totalSubstitutionsCount}</span>
                        <button
                          type="button"
                          className="btn-icone"
                          onClick={() => updateTeacherSubCount(t.id, 1)}
                          aria-label={`Aumentar substituições de ${nome}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="col-acao">
                      <div className="linha-acoes">
                        <button
                          type="button"
                          className="btn btn-fantasma btn-p"
                          onClick={() => setEditingTeacher(t)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn-icone btn-icone-perigo"
                          onClick={() => {
                            if (window.confirm(`Remover ${nome} do cadastro?`)) deleteTeacher(t.id);
                          }}
                          aria-label={`Remover ${nome}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={6} className="tabela-vazia">
                    Ninguém encontrado com esse filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {(editingTeacher || isAddingNew) && (
        <TeacherFormModal
          teacher={editingTeacher}
          onSave={handleSave}
          onClose={() => {
            setEditingTeacher(null);
            setIsAddingNew(false);
          }}
        />
      )}

      {isMultiplicaOpen && <MultiplicaModal onClose={() => setIsMultiplicaOpen(false)} />}
    </div>
  );
};

interface TeacherFormModalProps {
  teacher: Teacher | null;
  onSave: (data: Omit<Teacher, 'id' | 'totalSubstitutionsCount'>) => void;
  onClose: () => void;
}

const TeacherFormModal: React.FC<TeacherFormModalProps> = ({ teacher, onSave, onClose }) => {
  const [name, setName] = useState(teacher?.name || '');
  const [mainSubject, setMainSubject] = useState(teacher?.mainSubject || '');
  const [knowledgeArea, setKnowledgeArea] = useState<KnowledgeArea>(teacher?.knowledgeArea || 'Linguagens');
  const [role, setRole] = useState<StaffRole>(teacher?.role || 'PROFESSOR');
  const [isExempt, setIsExempt] = useState(teacher?.isExemptFromSubstitutions || false);
  const [exemptReason, setExemptReason] = useState(
    teacher?.exemptReason || 'Professor do curso técnico'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim().toUpperCase(),
      mainSubject: mainSubject.trim(),
      knowledgeArea,
      role,
      isExemptFromSubstitutions: isExempt,
      exemptReason: isExempt ? exemptReason : undefined,
    });
  };

  return (
    <Modal
      title={teacher ? 'Editar cadastro' : 'Cadastrar pessoa'}
      subtitle={teacher ? displayName(teacher.name) : 'Professor, coordenador de área ou gestão.'}
      size="sm"
      onClose={onClose}
    >
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo-grupo">
          <label className="campo-rotulo" htmlFor="pessoa-nome">
            Nome completo
          </label>
          <input
            id="pessoa-nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="campo"
            autoComplete="off"
            required
          />
        </div>

        <div className="campo-grupo">
          <label className="campo-rotulo" htmlFor="pessoa-disciplina">
            Disciplina principal
          </label>
          <input
            id="pessoa-disciplina"
            type="text"
            value={mainSubject}
            onChange={(e) => setMainSubject(e.target.value)}
            className="campo"
            placeholder="Matemática, História…"
            required
          />
        </div>

        <div className="campo-grupo">
          <label className="campo-rotulo" htmlFor="pessoa-area">
            Área de conhecimento
          </label>
          <select
            id="pessoa-area"
            value={knowledgeArea}
            onChange={(e) => setKnowledgeArea(e.target.value as KnowledgeArea)}
            className="campo"
          >
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="campo-grupo">
          <label className="campo-rotulo" htmlFor="pessoa-nivel">
            Nível na escala
          </label>
          <select
            id="pessoa-nivel"
            value={role}
            onChange={(e) => setRole(e.target.value as StaffRole)}
            className="campo"
          >
            <option value="PROFESSOR">Professor — prioridade normal</option>
            <option value="COORDENADOR_AREA">Coordenador de área — só se não houver professor</option>
            <option value="EQUIPE_GESTORA">Equipe gestora — último recurso</option>
          </select>
        </div>

        <div className="campo-grupo">
          <label className="caixa">
            <input type="checkbox" checked={isExempt} onChange={(e) => setIsExempt(e.target.checked)} />
            Não faz substituições
          </label>
          {isExempt && (
            <>
              <label className="campo-rotulo" htmlFor="pessoa-motivo">
                Motivo
              </label>
              <input
                id="pessoa-motivo"
                type="text"
                value={exemptReason}
                onChange={(e) => setExemptReason(e.target.value)}
                className="campo"
              />
            </>
          )}
        </div>

        <div className="formulario-acoes">
          <button type="button" className="btn btn-secundario" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primario">
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
};
