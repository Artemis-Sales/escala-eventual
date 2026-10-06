import React, { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { DAYS_OF_WEEK } from '../data/mockData';
import { INICIOS_FREQUENTES, courseEndTime, periodsOverlappedBy } from '../utils/multiplica';
import type { DayOfWeek } from '../types';
import { Modal } from './Modal';
import { displayName } from '../utils/display';

interface MultiplicaModalProps {
  onClose: () => void;
}

interface MultiplicaGroup {
  key: string;
  teacherId: string;
  teacherName: string;
  dayOfWeek: DayOfWeek;
  periodIds: number[];
  trainingName: string;
  horario?: string;
}

export const MultiplicaModal: React.FC<MultiplicaModalProps> = ({ onClose }) => {
  const { teachers, scheduleSlots, periods, addMultiplicaCourse, removeMultiplicaCourse } =
    useSchool();

  const sortedTeachers = useMemo(
    () =>
      [...teachers].sort((a, b) =>
        displayName(a.name).localeCompare(displayName(b.name), 'pt-BR')
      ),
    [teachers]
  );

  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(sortedTeachers[0]?.id || '');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('terca');
  const [role, setRole] = useState<'cursista' | 'multiplicador'>('cursista');
  const [saved, setSaved] = useState<string | null>(null);

  // O curso tem horário próprio, independente da grade: começa numa hora livre e dura
  // 1h30. Ele pode começar no meio de uma aula, durante o intervalo ou no almoço, e
  // por isso cobre duas ou três aulas dependendo do início.
  const [startTime, setStartTime] = useState<string>('08:00');

  const endTime = courseEndTime(startTime);
  const affectedPeriods = useMemo(
    () => periodsOverlappedBy(startTime, periods),
    [startTime, periods]
  );

  const affectedLabels = affectedPeriods
    .map((id) => periods.find((p) => p.id === id)?.label.replace(' Aula', '') ?? `${id}ª`)
    .join(', ');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacherId || affectedPeriods.length === 0) return;

    const teacher = teachers.find((t) => t.id === selectedTeacherId);
    const roleLabel = role === 'multiplicador' ? 'Formador/Multiplicador' : 'Cursista';

    addMultiplicaCourse(
      selectedTeacherId,
      selectedDay,
      affectedPeriods,
      `Multiplica SP (1h30 - ${roleLabel})`,
      startTime,
      endTime
    );

    const dia = DAYS_OF_WEEK.find((d) => d.key === selectedDay)?.label.toLowerCase();
    setSaved(`${displayName(teacher?.name)} bloqueado na ${dia}, das ${startTime} às ${endTime}.`);
  };

  const groups = new Map<string, MultiplicaGroup>();
  scheduleSlots
    .filter((s) => s.type === 'CURSO_FORMACAO' && s.trainingName?.includes('Multiplica'))
    .forEach((slot) => {
      const key = `${slot.teacherId}_${slot.dayOfWeek}`;
      const existing = groups.get(key);
      if (existing) {
        if (!existing.periodIds.includes(slot.periodId)) existing.periodIds.push(slot.periodId);
        return;
      }
      groups.set(key, {
        key,
        teacherId: slot.teacherId,
        teacherName: teachers.find((t) => t.id === slot.teacherId)?.name || 'Professor',
        dayOfWeek: slot.dayOfWeek,
        periodIds: [slot.periodId],
        trainingName: slot.trainingName || 'Multiplica SP',
        horario:
          slot.trainingStartTime && slot.trainingEndTime
            ? `${slot.trainingStartTime}–${slot.trainingEndTime}`
            : undefined,
      });
    });

  const dayOrder = DAYS_OF_WEEK.map((d) => d.key);
  const list = Array.from(groups.values()).sort(
    (a, b) =>
      dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek) ||
      displayName(a.teacherName).localeCompare(displayName(b.teacherName), 'pt-BR')
  );

  return (
    <Modal
      title="Multiplica SP"
      subtitle="O curso dura 1h30 e bloqueia toda aula que atravessar. Quem está no curso não é escalado."
      size="lg"
      onClose={onClose}
      footer={
        <>
          <span />
          <button type="button" className="btn btn-secundario" onClick={onClose}>
            Concluir
          </button>
        </>
      }
    >
      <div className="multiplica">
        <form className="formulario" onSubmit={handleAdd}>
          <h3 className="grupo-titulo">Novo bloqueio</h3>

          <div className="campo-grupo">
            <label className="campo-rotulo" htmlFor="mp-prof">
              Professor
            </label>
            <select
              id="mp-prof"
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              className="campo"
              required
            >
              {sortedTeachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {displayName(t.name)} — {t.mainSubject}
                </option>
              ))}
            </select>
          </div>

          <div className="campo-grupo">
            <span className="campo-rotulo" id="mp-dia-rotulo">
              Dia
            </span>
            <div className="segmentado" role="radiogroup" aria-labelledby="mp-dia-rotulo">
              {DAYS_OF_WEEK.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  role="radio"
                  aria-checked={selectedDay === d.key}
                  className="segmento"
                  onClick={() => setSelectedDay(d.key)}
                >
                  {d.short}
                </button>
              ))}
            </div>
          </div>

          <div className="campo-grupo">
            <label className="campo-rotulo" htmlFor="mp-inicio">
              Início
            </label>
            <div className="multiplica-hora">
              <input
                id="mp-inicio"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="campo campo-hora"
                required
              />
              <span className="multiplica-fim">termina às {endTime}</span>
            </div>
            <div className="atalhos" aria-label="Inícios frequentes">
              {INICIOS_FREQUENTES.map((h) => (
                <button
                  type="button"
                  key={h}
                  className="atalho"
                  aria-pressed={startTime === h}
                  onClick={() => setStartTime(h)}
                >
                  {h}
                </button>
              ))}
            </div>
            {affectedPeriods.length > 0 ? (
              <p className="campo-ajuda">
                Bloqueia {affectedPeriods.length === 1 ? 'a' : 'as'} <strong>{affectedLabels}</strong>{' '}
                {affectedPeriods.length === 1 ? 'aula' : 'aulas'}.
              </p>
            ) : (
              <p className="campo-ajuda cor-ultimo-recurso">
                Nesse horário o curso não cruza nenhuma aula — nada seria bloqueado.
              </p>
            )}
          </div>

          <div className="campo-grupo">
            <span className="campo-rotulo" id="mp-funcao-rotulo">
              Função
            </span>
            <div className="segmentado" role="radiogroup" aria-labelledby="mp-funcao-rotulo">
              <button
                type="button"
                role="radio"
                aria-checked={role === 'cursista'}
                className="segmento"
                onClick={() => setRole('cursista')}
              >
                Cursista
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={role === 'multiplicador'}
                className="segmento"
                onClick={() => setRole('multiplicador')}
              >
                Formador
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primario btn-largo"
            disabled={affectedPeriods.length === 0}
          >
            Salvar bloqueio
          </button>
          {saved && (
            <p className="campo-ajuda cor-coberta" role="status">
              {saved}
            </p>
          )}
        </form>

        <div className="multiplica-lista">
          <h3 className="grupo-titulo">
            Cadastrados <span className="grupo-contagem">{list.length}</span>
          </h3>
          {list.length === 0 ? (
            <p className="grupo-vazio">
              Ninguém no Multiplica ainda. O bloqueio cadastrado ao lado tira a pessoa da escala
              nesses horários.
            </p>
          ) : (
            <ul className="linhas">
              {list.map((g) => {
                const dia = DAYS_OF_WEEK.find((d) => d.key === g.dayOfWeek)?.short ?? g.dayOfWeek;
                const aulas = [...g.periodIds]
                  .sort((a, b) => a - b)
                  .map((id) => `${id}ª`)
                  .join(', ');
                return (
                  <li key={g.key} className="linha-item">
                    <span className="linha-item-dia">{dia}</span>
                    <span className="linha-item-texto">
                      <span className="linha-item-nome">{displayName(g.teacherName)}</span>
                      <span className="linha-item-meta">
                        {g.horario ?? '1h30'} · {aulas} · {g.trainingName.includes('Formador') ? 'formador' : 'cursista'}
                      </span>
                    </span>
                    <button
                      type="button"
                      className="btn-icone btn-icone-perigo"
                      onClick={() => removeMultiplicaCourse(g.teacherId, g.dayOfWeek, g.periodIds)}
                      aria-label={`Remover o Multiplica de ${displayName(g.teacherName)} (${dia})`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
};
