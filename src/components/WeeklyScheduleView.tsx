import React, { useMemo, useState } from 'react';
import { FileDown, Search } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useSchool } from '../context/SchoolContext';
import { DAYS_OF_WEEK } from '../data/mockData';
import { MultiplicaModal } from './MultiplicaModal';
import { Modal } from './Modal';
import type { DayOfWeek, ScheduleSlot, SlotType, ClassGroup, Teacher } from '../types';
import { electiveLessonsFor, weeklyLessonsFor } from '../utils/workload';
import {
  areaKey,
  classLevel,
  displayName,
  shortClassName,
  startTime,
  subjectAreaKey,
} from '../utils/display';

type ViewMode = 'geral_dia' | 'professor' | 'turma';

/** "Leonelia da Conceicao de Pontes Faria" → "Leonelia Faria": cabe na célula da grade. */
function shortName(raw: string): string {
  const parts = displayName(raw).split(' ');
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1]}` : parts[0];
}

export const WeeklyScheduleView: React.FC = () => {
  const { teachers, classes, periods, scheduleSlots, updateSlot } = useSchool();

  const sortedTeachers = useMemo(
    () =>
      [...teachers].sort((a, b) =>
        displayName(a.name).localeCompare(displayName(b.name), 'pt-BR')
      ),
    [teachers]
  );

  const [viewMode, setViewMode] = useState<ViewMode>('geral_dia');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('segunda');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(sortedTeachers[0]?.id || 't_1');
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '6A');
  const [segmentFilter, setSegmentFilter] = useState<'todos' | 'fundamental' | 'medio'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const [editingSlot, setEditingSlot] = useState<ScheduleSlot | null>(null);
  const [isMultiplicaOpen, setIsMultiplicaOpen] = useState(false);

  const teacherById = useMemo(() => new Map(teachers.map((t) => [t.id, t])), [teachers]);
  const selectedTeacher = teacherById.get(selectedTeacherId);
  const selectedClass = classes.find((c) => c.id === selectedClassId || c.name === selectedClassId);
  const editingTeacher = editingSlot ? teacherById.get(editingSlot.teacherId) : undefined;

  const filteredClasses = classes.filter((c) => {
    if (segmentFilter === 'fundamental') return c.segment === 'Ensino Fundamental II';
    if (segmentFilter === 'medio') return c.segment === 'Ensino Médio';
    return true;
  });

  const classSlot = (cls: ClassGroup, day: DayOfWeek, periodId: number) =>
    scheduleSlots.find(
      (s) =>
        s.dayOfWeek === day &&
        s.periodId === periodId &&
        (s.classId === cls.id || s.classId === cls.name) &&
        s.type === 'AULA'
    );

  const handleSaveSlot = (updated: ScheduleSlot) => {
    updateSlot(updated);
    setEditingSlot(null);
  };

  const handleExportGeneralExcel = () => {
    const rows = filteredClasses.map((cls) => {
      const rowObj: Record<string, string> = { 'Turma / Ano': cls.name };
      periods.forEach((p) => {
        const slot = classSlot(cls, selectedDay, p.id);
        const teacher = slot ? teacherById.get(slot.teacherId) : undefined;
        rowObj[`${p.label} (${p.time})`] = slot
          ? `${slot.subject || teacher?.mainSubject || 'Aula'} - ${teacher?.name || 'Prof'}`
          : '';
      });
      return rowObj;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Grade_${selectedDay.toUpperCase()}`);
    XLSX.writeFile(workbook, `Grade_Geral_${selectedDay.toUpperCase()}_Todas_Turmas.xlsx`);
  };

  const q = searchQuery.trim().toLowerCase();

  return (
    <div className="pagina">
      <div className="barra">
        <div className="segmentado" role="tablist" aria-label="Visão da grade">
          {(
            [
              ['geral_dia', 'Por dia'],
              ['professor', 'Por professor'],
              ['turma', 'Por turma'],
            ] as const
          ).map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={viewMode === mode}
              className="segmento"
              onClick={() => setViewMode(mode)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="barra-direita">
          <button type="button" className="btn btn-secundario" onClick={() => setIsMultiplicaOpen(true)}>
            Multiplica SP
          </button>
          {viewMode === 'geral_dia' && (
            <button type="button" className="btn btn-secundario" onClick={handleExportGeneralExcel}>
              <FileDown size={16} aria-hidden="true" />
              Excel do dia
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Por dia: todas as turmas                                            */}
      {/* ------------------------------------------------------------------ */}
      {viewMode === 'geral_dia' && (
        <section className="painel">
          <div className="filtros">
            <div className="segmentado" role="radiogroup" aria-label="Dia da semana">
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

            <div className="segmentado" role="radiogroup" aria-label="Segmento">
              {(
                [
                  ['todos', 'Todas'],
                  ['fundamental', 'Fundamental II'],
                  ['medio', 'Médio'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={segmentFilter === key}
                  className="segmento"
                  onClick={() => setSegmentFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="busca busca-compacta">
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                placeholder="Destacar professor ou disciplina"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Destacar professor ou disciplina"
              />
            </div>
          </div>

          <div className="tabela-rolagem grade-rolagem">
            <table className="tabela grade">
              <thead>
                <tr>
                  <th scope="col" className="grade-canto">Turma</th>
                  {periods.map((p) => (
                    <th key={p.id} scope="col" className="grade-aula">
                      <span className="aula-num">{p.label.replace(' Aula', '')}</span>
                      <span className="aula-hora">{startTime(p.time)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map((cls) => (
                  <tr key={cls.id}>
                    <th scope="row" className="grade-turma">
                      <span className="turma">{shortClassName(cls.name)}</span>
                      <span className="grade-turma-nivel">{classLevel(cls.name)}</span>
                    </th>
                    {periods.map((period) => {
                      const slot = classSlot(cls, selectedDay, period.id);
                      const teacher = slot ? teacherById.get(slot.teacherId) : undefined;
                      const subject = slot?.subject || teacher?.mainSubject || '';
                      const dimmed =
                        !!q &&
                        !(
                          subject.toLowerCase().includes(q) ||
                          (teacher?.name || '').toLowerCase().includes(q) ||
                          displayName(teacher?.name).toLowerCase().includes(q)
                        );

                      return (
                        <td key={period.id} className={`grade-celula ${dimmed ? 'is-apagada' : ''}`}>
                          <button
                            type="button"
                            className="celula-botao"
                            aria-label={
                              slot && teacher
                                ? `${shortClassName(cls.name)}, ${period.label}: ${subject} com ${displayName(teacher.name)}. Editar`
                                : `${shortClassName(cls.name)}, ${period.label}: vaga. Editar`
                            }
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
                              <>
                                <span className={`celula-disciplina cor-area-${subjectAreaKey(subject, teacher.knowledgeArea)}`}>
                                  {subject}
                                </span>
                                <span className="celula-pessoa">{shortName(teacher.name)}</span>
                              </>
                            ) : null}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AreaLegend />
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Por professor                                                       */}
      {/* ------------------------------------------------------------------ */}
      {viewMode === 'professor' && (
        <section className="painel">
          <div className="ficha">
            <div className="campo-grupo ficha-seletor">
              <label className="campo-rotulo" htmlFor="grade-prof">
                Professor
              </label>
              <select
                id="grade-prof"
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="campo"
              >
                {sortedTeachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {displayName(t.name)} — {t.mainSubject}
                    {t.isExemptFromSubstitutions ? ' (isento)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {selectedTeacher && <TeacherFacts teacher={selectedTeacher} slots={scheduleSlots} />}
          </div>

          <div className="tabela-rolagem">
            <table className="tabela semana">
              <thead>
                <tr>
                  <th scope="col" className="semana-canto">Aula</th>
                  {DAYS_OF_WEEK.map((d) => (
                    <th key={d.key} scope="col">
                      <span className="dia-longo">{d.label}</span>
                      <span className="dia-curto">{d.short}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map((period) => (
                  <tr key={period.id}>
                    <th scope="row" className="semana-aula">
                      <span className="aula-num">{period.label.replace(' Aula', '')}</span>
                      <span className="aula-hora">{startTime(period.time)}</span>
                    </th>
                    {DAYS_OF_WEEK.map((d) => {
                      const slot = scheduleSlots.find(
                        (s) =>
                          s.teacherId === selectedTeacherId &&
                          s.dayOfWeek === d.key &&
                          s.periodId === period.id
                      );
                      const type: SlotType = slot?.type || 'LIVRE';
                      const isMultiplica = !!slot?.trainingName?.includes('Multiplica');
                      const cls = classes.find((c) => c.id === slot?.classId || c.name === slot?.classId);

                      return (
                        <td key={d.key} className={`semana-celula tipo-${isMultiplica ? 'multiplica' : type.toLowerCase()}`}>
                          <button
                            type="button"
                            className="celula-botao"
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
                            {type === 'AULA' && (
                              <>
                                <span className="celula-turma">
                                  {shortClassName(cls?.name || slot?.classId) || 'Turma'}
                                </span>
                                <span
                                  className={`celula-disciplina cor-area-${subjectAreaKey(
                                    slot?.subject || selectedTeacher?.mainSubject,
                                    selectedTeacher?.knowledgeArea
                                  )}`}
                                >
                                  {slot?.subject || selectedTeacher?.mainSubject}
                                </span>
                              </>
                            )}
                            {type === 'CURSO_FORMACAO' && (
                              <>
                                <span className="celula-turma">
                                  {isMultiplica ? 'Multiplica SP' : slot?.trainingName || 'ATPC'}
                                </span>
                                {isMultiplica && slot?.trainingStartTime && (
                                  <span className="celula-pessoa">
                                    {slot.trainingStartTime}–{slot.trainingEndTime}
                                  </span>
                                )}
                              </>
                            )}
                            {(type === 'ELETIVA' || type === 'ATIVIDADE') && (
                              <span className="celula-turma">
                                {slot?.trainingName || (type === 'ELETIVA' ? 'Eletiva' : 'Tutoria')}
                              </span>
                            )}
                            {type === 'LIVRE' && <span className="celula-livre">livre</span>}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="legenda" aria-label="Legenda">
            <li><span className="legenda-amostra tipo-aula" />Aula</li>
            <li><span className="legenda-amostra tipo-eletiva" />Eletiva ou tutoria</li>
            <li><span className="legenda-amostra tipo-curso_formacao" />ATPC ou formação</li>
            <li><span className="legenda-amostra tipo-multiplica" />Multiplica SP</li>
            <li><span className="celula-livre legenda-texto">livre</span>pode ser escalado</li>
          </ul>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Por turma                                                           */}
      {/* ------------------------------------------------------------------ */}
      {viewMode === 'turma' && (
        <section className="painel">
          <div className="ficha">
            <div className="campo-grupo ficha-seletor">
              <label className="campo-rotulo" htmlFor="grade-turma">
                Turma
              </label>
              <select
                id="grade-turma"
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="campo"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {shortClassName(c.name)} — {c.segment}
                  </option>
                ))}
              </select>
            </div>

            {selectedClass && (
              <dl className="ficha-dados">
                <div>
                  <dt>Turma</dt>
                  <dd>{selectedClass.name}</dd>
                </div>
                <div>
                  <dt>Aulas na semana</dt>
                  <dd className="numero">
                    {
                      scheduleSlots.filter(
                        (s) =>
                          (s.classId === selectedClass.id || s.classId === selectedClass.name) &&
                          s.type === 'AULA'
                      ).length
                    }
                  </dd>
                </div>
              </dl>
            )}
          </div>

          <div className="tabela-rolagem">
            <table className="tabela semana">
              <thead>
                <tr>
                  <th scope="col" className="semana-canto">Aula</th>
                  {DAYS_OF_WEEK.map((d) => (
                    <th key={d.key} scope="col">
                      <span className="dia-longo">{d.label}</span>
                      <span className="dia-curto">{d.short}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map((period) => (
                  <tr key={period.id}>
                    <th scope="row" className="semana-aula">
                      <span className="aula-num">{period.label.replace(' Aula', '')}</span>
                      <span className="aula-hora">{startTime(period.time)}</span>
                    </th>
                    {DAYS_OF_WEEK.map((d) => {
                      const slot = selectedClass ? classSlot(selectedClass, d.key, period.id) : undefined;
                      const teacher = slot ? teacherById.get(slot.teacherId) : undefined;
                      return (
                        <td key={d.key} className="semana-celula">
                          {slot && teacher && (
                            <div className="celula-estatica">
                              <span
                                  className={`celula-disciplina cor-area-${subjectAreaKey(
                                    slot.subject || teacher.mainSubject,
                                    teacher.knowledgeArea
                                  )}`}
                                >
                                {slot.subject || teacher.mainSubject}
                              </span>
                              <span className="celula-pessoa">{shortName(teacher.name)}</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AreaLegend />
        </section>
      )}

      {editingSlot && (
        <SlotEditModal
          slot={editingSlot}
          classes={classes}
          teacherName={displayName(editingTeacher?.name)}
          teacherSubject={editingTeacher?.mainSubject || ''}
          onSave={handleSaveSlot}
          onClose={() => setEditingSlot(null)}
        />
      )}

      {isMultiplicaOpen && <MultiplicaModal onClose={() => setIsMultiplicaOpen(false)} />}
    </div>
  );
};

const AREAS = [
  ['linguagens', 'Linguagens'],
  ['natureza', 'Ciências da Natureza'],
  ['humanas', 'Ciências Humanas'],
  ['diversificada', 'Parte Diversificada'],
  ['gestao', 'Gestão Escolar'],
] as const;

const AreaLegend: React.FC = () => (
  <ul className="legenda" aria-label="Cores das áreas">
    {AREAS.map(([key, label]) => (
      <li key={key}>
        <span className={`area-ponto area-${key}`} aria-hidden="true" />
        {label}
      </li>
    ))}
  </ul>
);

const TeacherFacts: React.FC<{ teacher: Teacher; slots: ScheduleSlot[] }> = ({ teacher, slots }) => {
  const own = slots.filter((s) => s.teacherId === teacher.id);
  const electives = electiveLessonsFor(teacher, slots);
  return (
    <dl className="ficha-dados">
      <div>
        <dt>Área</dt>
        <dd>
          <span className={`area-ponto area-${areaKey(teacher.knowledgeArea)}`} aria-hidden="true" />
          {teacher.knowledgeArea}
        </dd>
      </div>
      <div>
        <dt>Aulas na semana</dt>
        <dd className="numero">
          {weeklyLessonsFor(teacher, slots)}
          {electives > 0 && <span className="ficha-nota"> · {electives} de eletiva</span>}
        </dd>
      </div>
      <div>
        <dt>ATPC e cursos</dt>
        <dd className="numero">{own.filter((s) => s.type === 'CURSO_FORMACAO').length}</dd>
      </div>
      <div>
        <dt>Horários livres</dt>
        <dd className="numero">{own.filter((s) => s.type === 'LIVRE').length}</dd>
      </div>
      {teacher.isExemptFromSubstitutions && (
        <div>
          <dt>Substituições</dt>
          <dd>Isento</dd>
        </div>
      )}
    </dl>
  );
};

interface SlotEditModalProps {
  slot: ScheduleSlot;
  classes: ClassGroup[];
  teacherName: string;
  teacherSubject: string;
  onSave: (slot: ScheduleSlot) => void;
  onClose: () => void;
}

const SlotEditModal: React.FC<SlotEditModalProps> = ({
  slot,
  classes,
  teacherName,
  teacherSubject,
  onSave,
  onClose,
}) => {
  const [type, setType] = useState<SlotType>(slot.type || 'LIVRE');
  const [classId, setClassId] = useState(slot.classId || classes[0]?.id || '');
  const [subject, setSubject] = useState(slot.subject || teacherSubject);
  const [trainingName, setTrainingName] = useState(slot.trainingName || 'ATPC / Formação Pedagógica');

  const dia = DAYS_OF_WEEK.find((d) => d.key === slot.dayOfWeek)?.label;

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

  // Eletiva e tutoria não são editáveis aqui; mostrar como "Aula" mentiria sobre o dado.
  const editable = type === 'AULA' || type === 'CURSO_FORMACAO' || type === 'LIVRE';

  return (
    <Modal
      title="Editar horário"
      subtitle={`${teacherName ? `${teacherName} · ` : ''}${dia ?? ''} · ${slot.periodId}ª aula`}
      size="sm"
      onClose={onClose}
    >
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo-grupo">
          <span className="campo-rotulo" id="slot-tipo">
            Ocupação
          </span>
          <div className="segmentado segmentado-largo" role="radiogroup" aria-labelledby="slot-tipo">
            {(
              [
                ['AULA', 'Aula'],
                ['CURSO_FORMACAO', 'ATPC ou curso'],
                ['LIVRE', 'Livre'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={type === value}
                className="segmento"
                onClick={() => setType(value)}
              >
                {label}
              </button>
            ))}
          </div>
          {!editable && (
            <p className="campo-ajuda">
              Este horário é de {type === 'ELETIVA' ? 'eletiva' : 'tutoria'}. Escolha acima para
              mudar.
            </p>
          )}
        </div>

        {type === 'AULA' && (
          <>
            <div className="campo-grupo">
              <label className="campo-rotulo" htmlFor="slot-turma">
                Turma
              </label>
              <select
                id="slot-turma"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="campo"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {shortClassName(c.name)} — {c.segment}
                  </option>
                ))}
              </select>
            </div>
            <div className="campo-grupo">
              <label className="campo-rotulo" htmlFor="slot-disciplina">
                Disciplina
              </label>
              <input
                id="slot-disciplina"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="campo"
                placeholder="Matemática, História…"
                required
              />
            </div>
          </>
        )}

        {type === 'CURSO_FORMACAO' && (
          <div className="campo-grupo">
            <label className="campo-rotulo" htmlFor="slot-curso">
              Nome do curso
            </label>
            <div className="atalhos">
              {[
                ['Multiplica SP (1h30 - Cursista)', 'Multiplica · cursista'],
                ['Multiplica SP (1h30 - Formador)', 'Multiplica · formador'],
                ['ATPC / Formação Pedagógica', 'ATPC geral'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className="atalho"
                  aria-pressed={trainingName === value}
                  onClick={() => setTrainingName(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              id="slot-curso"
              type="text"
              value={trainingName}
              onChange={(e) => setTrainingName(e.target.value)}
              className="campo"
              required
            />
            <p className="campo-ajuda">Em formação, o professor não é escalado neste horário.</p>
          </div>
        )}

        {type === 'LIVRE' && (
          <p className="campo-ajuda">Livre: o professor pode ser escalado para cobrir faltas neste horário.</p>
        )}

        <div className="formulario-acoes">
          <button type="button" className="btn btn-secundario" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primario" disabled={!editable}>
            Salvar horário
          </button>
        </div>
      </form>
    </Modal>
  );
};
