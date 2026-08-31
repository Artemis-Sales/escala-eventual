import React, { useMemo, useState } from 'react';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  Trash2,
  Plus,
  AlertCircle,
  X,
  UserCheck,
  Calendar,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { DAYS_OF_WEEK } from '../data/mockData';
import type { DayOfWeek } from '../types';

interface MultiplicaModalProps {
  onClose: () => void;
}

export const MultiplicaModal: React.FC<MultiplicaModalProps> = ({ onClose }) => {
  const { teachers, scheduleSlots, periods, addMultiplicaCourse, removeMultiplicaCourse } =
    useSchool();

  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(teachers[0]?.id || '');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('terca');
  const [role, setRole] = useState<'cursista' | 'multiplicador'>('cursista');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // O curso ocupa duas aulas seguidas (1h30). Montamos um bloco para cada aula em que
  // ele pode começar, a partir dos horários reais da grade — antes a lista era fixa e
  // não oferecia os blocos que atravessam o intervalo (3ª/4ª) ou o almoço (6ª/7ª),
  // o que impedia o cadastro quando a formação começava nesses horários.
  const timeBlocks = useMemo(() => {
    const aulas = periods.filter((p) => !p.isBreak).sort((a, b) => a.id - b.id);

    return aulas.slice(0, -1).map((aula, i) => {
      const seguinte = aulas[i + 1];
      const [inicio, fimPrimeira] = aula.time.split(' - ');
      const [inicioSeguinte, fim] = seguinte.time.split(' - ');

      return {
        id: `${aula.id}_${seguinte.id}`,
        label: `${aula.label} e ${seguinte.label} (${inicio} - ${fim})`,
        periods: [aula.id, seguinte.id],
        // Aulas não emendadas: existe intervalo ou almoço entre elas.
        hasGap: fimPrimeira !== inicioSeguinte,
      };
    });
  }, [periods]);

  // O Multiplica começa a partir das 8h, então o bloco das 08:00 é o padrão.
  const [selectedBlock, setSelectedBlock] = useState<string>(
    () => timeBlocks.find((b) => b.label.includes('(08:00'))?.id ?? timeBlocks[0]?.id ?? ''
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const block = timeBlocks.find((b) => b.id === selectedBlock);
    if (!block || !selectedTeacherId) return;

    const teacher = teachers.find((t) => t.id === selectedTeacherId);
    const roleLabel = role === 'multiplicador' ? 'Formador/Multiplicador' : 'Cursista';
    const trainingName = `Multiplica SP (1h30 - ${roleLabel})`;

    addMultiplicaCourse(selectedTeacherId, selectedDay, block.periods, trainingName);

    setToastMessage(
      `✅ ${teacher?.name || 'Professor'} cadastrado no Multiplica SP (${block.label}) com sucesso!`
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  const multiplicaSlots = scheduleSlots.filter(
    (s) => s.type === 'CURSO_FORMACAO' && s.trainingName?.includes('Multiplica')
  );

  interface MultiplicaGroup {
    key: string;
    teacherId: string;
    teacherName: string;
    dayOfWeek: DayOfWeek;
    periodIds: number[];
    periodLabels: string;
    trainingName: string;
  }

  const groupsMap = new Map<string, MultiplicaGroup>();

  multiplicaSlots.forEach((slot) => {
    const key = `${slot.teacherId}_${slot.dayOfWeek}`;
    const teacher = teachers.find((t) => t.id === slot.teacherId);
    const pDef = periods.find((p) => p.id === slot.periodId);

    if (groupsMap.has(key)) {
      const g = groupsMap.get(key)!;
      if (!g.periodIds.includes(slot.periodId)) {
        g.periodIds.push(slot.periodId);
        g.periodLabels += `, ${pDef?.label || slot.periodId}`;
      }
    } else {
      groupsMap.set(key, {
        key,
        teacherId: slot.teacherId,
        teacherName: teacher?.name || 'Professor',
        dayOfWeek: slot.dayOfWeek,
        periodIds: [slot.periodId],
        periodLabels: pDef?.label || `${slot.periodId}ª Aula`,
        trainingName: slot.trainingName || 'Multiplica SP',
      });
    }
  });

  const multiplicaList = Array.from(groupsMap.values());

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header header-multiplica">
          <div className="multiplica-header-title-box">
            <div className="multiplica-badge-icon">
              <GraduationCap size={24} />
            </div>
            <div>
              <h3 className="modal-title">Gestão do Curso Multiplica SP</h3>
              <p className="modal-subtitle">
                Bloqueio de horários de formação (1h30min de duração). Professores em formação não
                podem receber substituições.
              </p>
            </div>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {toastMessage && (
            <div className="alert-banner-success" style={{ marginBottom: 16 }}>
              <CheckCircle2 size={18} />
              <span>{toastMessage}</span>
            </div>
          )}

          <div className="multiplica-grid-layout">
            {/* Formulário para cadastrar */}
            <div className="multiplica-form-card">
              <h4 className="card-subtitle">
                <Plus size={16} /> Cadastrar Horário de Multiplica SP
              </h4>

              <form onSubmit={handleAdd}>
                <div className="form-group">
                  <label className="input-label">Professor:</label>
                  <select
                    value={selectedTeacherId}
                    onChange={(e) => setSelectedTeacherId(e.target.value)}
                    className="select-input-custom"
                    required
                  >
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.mainSubject})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="input-label">Dia da Semana:</label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value as DayOfWeek)}
                    className="select-input-custom"
                  >
                    {DAYS_OF_WEEK.map((d) => (
                      <option key={d.key} value={d.key}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="input-label">Bloco de Horário (Duração 1h30min):</label>
                  <div className="time-blocks-list">
                    {timeBlocks.map((b) => (
                      <label
                        key={b.id}
                        className={`time-block-option ${selectedBlock === b.id ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="timeBlock"
                          value={b.id}
                          checked={selectedBlock === b.id}
                          onChange={() => setSelectedBlock(b.id)}
                        />
                        <Clock size={15} />
                        <span>
                          {b.label}
                          {b.hasGap && <em className="time-block-gap"> · com intervalo entre as aulas</em>}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="input-label">Função no Multiplica:</label>
                  <div className="role-radio-group">
                    <label className={`role-chip ${role === 'cursista' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="role"
                        checked={role === 'cursista'}
                        onChange={() => setRole('cursista')}
                      />
                      <span>Professor Cursista</span>
                    </label>

                    <label className={`role-chip ${role === 'multiplicador' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="role"
                        checked={role === 'multiplicador'}
                        onChange={() => setRole('multiplicador')}
                      />
                      <span>Professor Multiplicador (Formador)</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <CheckCircle2 size={16} />
                  <span>Salvar Bloqueio do Multiplica SP</span>
                </button>
              </form>
            </div>

            {/* Lista dos Professores com Multiplica cadastrado */}
            <div className="multiplica-list-card">
              <div className="list-card-header">
                <h4 className="card-subtitle">
                  <UserCheck size={16} /> Horários Cadastrados ({multiplicaList.length})
                </h4>
              </div>

              {multiplicaList.length === 0 ? (
                <div className="empty-multiplica-state">
                  <AlertCircle size={32} className="text-muted" />
                  <p>Nenhum professor com Multiplica SP registrado ainda.</p>
                  <small className="text-muted">
                    Cadastre os professores ao lado para bloquear automaticamente suas substituições
                    nesses horários.
                  </small>
                </div>
              ) : (
                <div className="multiplica-items-scroll">
                  {multiplicaList.map((item) => {
                    const dayLabel =
                      DAYS_OF_WEEK.find((d) => d.key === item.dayOfWeek)?.label || item.dayOfWeek;

                    return (
                      <div key={item.key} className="multiplica-item-row">
                        <div className="item-left">
                          <div className="item-name">{item.teacherName}</div>
                          <div className="item-meta">
                            <span className="item-day">
                              <Calendar size={13} /> {dayLabel}
                            </span>
                            <span className="item-periods">
                              <Clock size={13} /> {item.periodLabels} (1h30)
                            </span>
                          </div>
                          <div className="item-training-tag">{item.trainingName}</div>
                        </div>

                        <button
                          onClick={() =>
                            removeMultiplicaCourse(item.teacherId, item.dayOfWeek, item.periodIds)
                          }
                          className="btn-icon-subtle text-danger"
                          title="Remover bloqueio do Multiplica"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Concluir & Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
