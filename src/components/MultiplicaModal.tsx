import React, { useState } from 'react';
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
  const [selectedBlock, setSelectedBlock] = useState<string>('4_5'); // Default: 4ª e 5ª aula (10:00 - 11:40)
  const [role, setRole] = useState<'cursista' | 'multiplicador'>('cursista');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Blocos de 1h30min (2 aulas de 50min)
  const timeBlocks = [
    { id: '1_2', label: '1ª e 2ª Aula (07:10 - 08:50)', periods: [1, 2] },
    { id: '2_3', label: '2ª e 3ª Aula (08:00 - 09:40)', periods: [2, 3] },
    { id: '4_5', label: '4ª e 5ª Aula (10:00 - 11:40)', periods: [4, 5] },
    { id: '5_6', label: '5ª e 6ª Aula (10:50 - 12:30)', periods: [5, 6] },
    { id: '7_8', label: '7ª e 8ª Aula (13:30 - 15:10)', periods: [7, 8] },
    { id: '8_9', label: '8ª e 9ª Aula (14:20 - 16:00)', periods: [8, 9] },
  ];

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
                        <span>{b.label}</span>
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
