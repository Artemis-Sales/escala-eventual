import React, { useMemo, useRef, useState } from 'react';
import {
  Check,
  Copy,
  FileDown,
  GripVertical,
  Printer,
  Search,
  X,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { DAYS_OF_WEEK } from '../data/mockData';
import type { SubstitutionItem } from '../types';
import { ManualSwapModal } from './ManualSwapModal';
import { MultiplicaModal } from './MultiplicaModal';
import { formatWhatsAppMessage } from '../utils/substitutionEngine';
import { exportDailyPlanToExcel } from '../utils/excelHelper';
import { printScaleDocument } from '../utils/printHelper';
import {
  areaKey,
  capitalize,
  coverageOf,
  displayName,
  longDate,
  reasonOf,
  shortClassName,
  startTime,
} from '../utils/display';

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
    history,
    swapSubstitutions,
    updateSubstitutionItem,
  } = useSchool();

  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<SubstitutionItem | null>(null);
  const [isMultiplicaOpen, setIsMultiplicaOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  // Linhas recém-alteradas piscam uma vez: é a confirmação de que a troca pegou.
  const [changedIds, setChangedIds] = useState<string[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 4000);
  };

  const flash = (ids: string[]) => {
    setChangedIds(ids);
    window.setTimeout(() => setChangedIds([]), 1400);
  };

  const teacherById = useMemo(() => new Map(teachers.map((t) => [t.id, t])), [teachers]);

  const sortedTeachers = useMemo(
    () =>
      [...teachers].sort((a, b) =>
        displayName(a.name).localeCompare(displayName(b.name), 'pt-BR')
      ),
    [teachers]
  );

  const query = search.trim().toLowerCase();
  const visibleTeachers = query
    ? sortedTeachers.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.mainSubject.toLowerCase().includes(query) ||
          t.knowledgeArea.toLowerCase().includes(query)
      )
    : sortedTeachers;

  const dayLabel = DAYS_OF_WEEK.find((d) => d.key === selectedDay)?.label;
  const isWeekend = !dayLabel;

  const multiplicaToday = new Set(
    scheduleSlots
      .filter(
        (s) =>
          s.dayOfWeek === selectedDay &&
          s.type === 'CURSO_FORMACAO' &&
          s.trainingName?.includes('Multiplica')
      )
      .map((s) => s.teacherId)
  ).size;

  const handleGenerate = () => {
    if (absentTeacherIds.length === 0) return;

    // Gerar de novo troca o que está na tela. A escala oficial continua valendo no
    // histórico até ser oficializada outra vez, mas quem clica precisa saber disso.
    if (
      currentPlan?.isOfficial &&
      !window.confirm(
        'A escala deste dia já foi oficializada.\n\n' +
          'Gerar outra substitui o que está na tela. A escala oficial e os contadores só ' +
          'mudam se você oficializar a nova.\n\nGerar assim mesmo?'
      )
    ) {
      return;
    }

    generateSchedule();

    // No celular a escala fica abaixo da lista de professores: leva até ela.
    if (window.matchMedia('(max-width: 900px)').matches) {
      requestAnimationFrame(() =>
        document.getElementById('escala-titulo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      );
    }
  };

  const handleWhatsAppCopy = async () => {
    if (!currentPlan) return;
    const text = formatWhatsAppMessage(currentPlan, teachers);
    try {
      await navigator.clipboard.writeText(text);
      showToast('Mensagem copiada. É só colar no grupo do WhatsApp.');
    } catch {
      showToast('O navegador bloqueou a cópia. Tente de novo pelo botão.');
    }
  };

  const handlePrint = () => {
    if (currentPlan) printScaleDocument(currentPlan, teachers);
  };

  const handleExcel = () => {
    if (!currentPlan) return;
    exportDailyPlanToExcel(currentPlan, teachers);
    showToast('Planilha baixada.');
  };

  const handleOfficialize = () => {
    if (!currentPlan) return;

    const jaOficializada = history.some((h) => h.date === currentPlan.date);
    const escalados = new Set(
      currentPlan.substitutions.map((s) => s.substituteTeacherId).filter(Boolean)
    ).size;

    const aviso = jaOficializada
      ? `Esta data já tem uma escala oficializada.\n\n` +
        `A nova substitui a anterior no histórico, e os contadores de substituição são ` +
        `recalculados — ninguém é contado duas vezes.\n\nOficializar a nova escala?`
      : `Oficializar a escala do dia?\n\n` +
        `Ela vai para o histórico e soma uma substituição para cada um dos ${escalados} ` +
        `professores escalados. Essa ação não tem desfazer.`;

    if (!window.confirm(aviso)) return;

    confirmAndSavePlan();
    showToast('Escala oficializada. Histórico e contadores atualizados.');
  };

  // ---- arrastar o substituto de uma linha para outra troca os dois ----
  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');
    setDropTargetId(null);
    setDraggedId(null);
    if (sourceId && sourceId !== targetId) {
      swapSubstitutions(sourceId, targetId);
      flash([sourceId, targetId]);
    }
  };

  const subs = currentPlan?.substitutions ?? [];
  const covered = subs.filter((s) => s.substituteTeacherId).length;
  const lastResort = subs.filter((s) => coverageOf(s) === 'ultimo-recurso').length;
  const uncovered = subs.length - covered;

  // A grade da tabela vem agrupada por aula: a primeira linha de cada aula leva o horário.
  const rows = useMemo(() => {
    const ordered = [...(currentPlan?.substitutions ?? [])].sort((a, b) => a.periodId - b.periodId);
    return ordered.map((item, i) => {
      const first = i === 0 || ordered[i - 1].periodId !== item.periodId;
      const span = first ? ordered.filter((s) => s.periodId === item.periodId).length : 0;
      return { item, first, span };
    });
  }, [currentPlan]);

  const absentNames = (currentPlan?.absentTeacherIds ?? [])
    .map((id) => displayName(teacherById.get(id)?.name))
    .filter(Boolean);

  return (
    <div className="dia">
      {/* ------------------------------------------------------------------ */}
      {/* Quem faltou                                                         */}
      {/* ------------------------------------------------------------------ */}
      <aside className="painel faltas" aria-label="Quem faltou">
        <div className="faltas-data">
          <label className="campo-rotulo" htmlFor="data-escala">
            Data
          </label>
          <input
            id="data-escala"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="campo"
          />
          {isWeekend && <p className="faltas-aviso">Fim de semana — não há aulas na grade.</p>}
        </div>

        <div className="faltas-cabeca">
          <h2 className="faltas-titulo">Quem faltou</h2>
          {absentTeacherIds.length > 0 ? (
            <button type="button" className="btn-texto" onClick={clearAbsentTeachers}>
              Limpar ({absentTeacherIds.length})
            </button>
          ) : (
            <span className="faltas-dica">marque um ou mais</span>
          )}
        </div>

        <div className="busca">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            placeholder="Nome, disciplina ou área"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar professor"
          />
        </div>

        <div className="lista-prof-cabeca" aria-hidden="true">
          <span>Professor</span>
          <span>Subst.</span>
        </div>

        <ul className="lista-prof">
          {visibleTeachers.map((t) => {
            const checked = absentTeacherIds.includes(t.id);
            const nivel =
              t.role === 'COORDENADOR_AREA'
                ? 'PCA'
                : t.role === 'EQUIPE_GESTORA'
                ? 'Gestão'
                : null;
            return (
              <li key={t.id}>
                <label className={`prof ${checked ? 'is-marcado' : ''}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAbsentTeacher(t.id)}
                  />
                  <span className="prof-texto">
                    <span className="prof-nome">{displayName(t.name)}</span>
                    <span className="prof-meta">
                      <span
                        className={`area-ponto area-${areaKey(t.knowledgeArea)}`}
                        title={t.knowledgeArea}
                        aria-hidden="true"
                      />
                      {t.mainSubject}
                      {nivel && <span className="prof-nivel">{nivel}</span>}
                      {t.isExemptFromSubstitutions && <span className="prof-nivel">Isento</span>}
                    </span>
                  </span>
                  <span className="prof-contador" aria-label={`${t.totalSubstitutionsCount} substituições`}>
                    {t.totalSubstitutionsCount}
                  </span>
                </label>
              </li>
            );
          })}
          {visibleTeachers.length === 0 && (
            <li className="lista-vazia">Ninguém com “{search}”.</li>
          )}
        </ul>

        <div className="faltas-rodape">
          <button
            type="button"
            className={`btn btn-largo ${currentPlan ? 'btn-secundario' : 'btn-primario'}`}
            onClick={handleGenerate}
            disabled={absentTeacherIds.length === 0 || isWeekend}
          >
            {currentPlan ? 'Gerar de novo' : 'Gerar escala'}
            {absentTeacherIds.length > 0 && (
              <span className="btn-contagem">
                {absentTeacherIds.length} {absentTeacherIds.length === 1 ? 'falta' : 'faltas'}
              </span>
            )}
          </button>
          <button
            type="button"
            className="btn btn-secundario btn-largo"
            onClick={() => setIsMultiplicaOpen(true)}
          >
            Multiplica SP
            {multiplicaToday > 0 && (
              <span className="btn-contagem">
                {multiplicaToday} {multiplicaToday === 1 ? 'pessoa' : 'pessoas'} hoje
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* A escala                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="painel escala" aria-labelledby="escala-titulo">
        <header className="escala-cabeca">
          <div className="escala-titulos">
            <h1 id="escala-titulo" className="escala-data">
              {capitalize(longDate(selectedDate))}
            </h1>
            {currentPlan && subs.length > 0 && (
              <p className={`escala-estado ${currentPlan.isOfficial ? 'is-oficial' : ''}`}>
                {currentPlan.isOfficial ? (
                  <>
                    <Check size={14} aria-hidden="true" />
                    Oficializada
                    {currentPlan.officializedAt ? ` às ${currentPlan.officializedAt}` : ''}
                  </>
                ) : (
                  'Rascunho — nada foi gravado ainda'
                )}
              </p>
            )}
          </div>

          {currentPlan && subs.length > 0 && (
            <div className="escala-acoes">
              {currentPlan.isOfficial ? (
                <button type="button" className="btn btn-primario" onClick={handleWhatsAppCopy}>
                  <Copy size={16} aria-hidden="true" />
                  Copiar para o WhatsApp
                </button>
              ) : (
                <>
                  <button type="button" className="btn btn-secundario" onClick={handleWhatsAppCopy}>
                    <Copy size={16} aria-hidden="true" />
                    WhatsApp
                  </button>
                </>
              )}
              <button type="button" className="btn btn-secundario" onClick={handlePrint}>
                <Printer size={16} aria-hidden="true" />
                Imprimir A4
              </button>
              <button type="button" className="btn btn-secundario" onClick={handleExcel}>
                <FileDown size={16} aria-hidden="true" />
                Excel
              </button>
              {!currentPlan.isOfficial && (
                <button type="button" className="btn btn-primario" onClick={handleOfficialize}>
                  <Check size={16} aria-hidden="true" />
                  Oficializar
                </button>
              )}
            </div>
          )}
        </header>

        {!currentPlan && <EmptyScale />}

        {currentPlan && subs.length === 0 && (
          <div className="escala-vazia">
            <p className="escala-vazia-titulo">Nenhuma aula para cobrir.</p>
            <p>
              {absentNames.join(', ')} não {absentNames.length === 1 ? 'tem' : 'têm'} aula com
              turma na {dayLabel?.toLowerCase() ?? 'data escolhida'}.
            </p>
          </div>
        )}

        {currentPlan && subs.length > 0 && (
          <>
            <div className="resumo">
              <p className="resumo-linha">
                <span className="resumo-item">
                  <strong>{subs.length}</strong> {subs.length === 1 ? 'aula' : 'aulas'} a cobrir
                </span>
                <span className="resumo-item">
                  <strong className="cor-coberta">{covered - lastResort}</strong> por professor
                </span>
                {lastResort > 0 && (
                  <span className="resumo-item">
                    <strong className="cor-ultimo-recurso">{lastResort}</strong> por PCA ou gestão
                  </span>
                )}
                {uncovered > 0 && (
                  <span className="resumo-item">
                    <strong className="cor-descoberta">{uncovered}</strong> sem cobertura
                  </span>
                )}
              </p>
              <p className="resumo-faltas">
                <span className="resumo-rotulo">Faltaram</span> {absentNames.join(', ')}
              </p>
            </div>

            <div className="tabela-rolagem">
              <table className="tabela escala-tabela">
                <thead>
                  <tr>
                    <th scope="col" className="col-aula">Aula</th>
                    <th scope="col" className="col-turma">Turma</th>
                    <th scope="col">Disciplina e ausente</th>
                    <th scope="col">Substituto</th>
                    <th scope="col" className="col-acao">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ item, first, span }) => {
                    const estado = coverageOf(item);
                    const absent = teacherById.get(item.originalTeacherId);
                    const classes = [
                      'linha',
                      first ? 'linha-inicio-aula' : '',
                      changedIds.includes(item.id) ? 'is-alterada' : '',
                      draggedId === item.id ? 'is-arrastando' : '',
                      dropTargetId === item.id ? 'is-alvo' : '',
                    ].join(' ');

                    return (
                      <tr
                        key={item.id}
                        className={classes}
                        onDragOver={(e) => {
                          e.preventDefault();
                          if (dropTargetId !== item.id) setDropTargetId(item.id);
                        }}
                        onDragLeave={() => dropTargetId === item.id && setDropTargetId(null)}
                        onDrop={(e) => onDrop(e, item.id)}
                      >
                        {first && (
                          <th scope="rowgroup" rowSpan={span} className="col-aula aula-celula">
                            <span className="aula-num">{item.periodLabel.replace(' Aula', '')}</span>
                            <span className="aula-hora">{startTime(item.periodTime)}</span>
                          </th>
                        )}
                        <td className="col-turma">
                          <span className="turma">{shortClassName(item.className)}</span>
                          {/* No celular a coluna de aula some; o horário vem junto da turma. */}
                          <span className="aula-movel">
                            {item.periodLabel.replace(' Aula', '')} · {startTime(item.periodTime)}
                          </span>
                        </td>
                        <td>
                          <span className="disciplina">
                            <span
                              className={`area-ponto area-${areaKey(absent?.knowledgeArea)}`}
                              aria-hidden="true"
                            />
                            {item.originalSubject}
                          </span>
                          <span className="ausente">falta de {displayName(item.originalTeacherName)}</span>
                        </td>
                        <td className={`substituto estado-${estado}`}>
                          {item.substituteTeacherId ? (
                            <div
                              className="substituto-arrastavel"
                              draggable
                              onDragStart={(e) => onDragStart(e, item.id)}
                              onDragEnd={() => {
                                setDraggedId(null);
                                setDropTargetId(null);
                              }}
                              title="Arraste para outra linha para trocar os substitutos"
                            >
                              <GripVertical size={14} className="alca" aria-hidden="true" />
                              <span>
                                <span className="substituto-nome">
                                  {displayName(item.substituteTeacherName)}
                                </span>
                                <span className="motivo">{reasonOf(item)}</span>
                              </span>
                            </div>
                          ) : (
                            <span>
                              <span className="substituto-nome">Sem cobertura</span>
                              <span className="motivo">{reasonOf(item)}</span>
                            </span>
                          )}
                        </td>
                        <td className="col-acao">
                          <div className="linha-acoes">
                            <button
                              type="button"
                              className="btn btn-fantasma btn-p"
                              onClick={() => setEditingItem(item)}
                            >
                              Trocar
                            </button>
                            {item.substituteTeacherId && (
                              <button
                                type="button"
                                className="btn-icone"
                                onClick={() => {
                                  updateSubstitutionItem(item.id, null);
                                  flash([item.id]);
                                }}
                                aria-label={`Tirar ${displayName(item.substituteTeacherName)} desta aula`}
                                title="Deixar sem substituto"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Rules compact />
          </>
        )}
      </section>

      {toast && (
        <div className="aviso" role="status">
          <Check size={16} aria-hidden="true" />
          {toast}
        </div>
      )}

      {editingItem && (
        <ManualSwapModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onChanged={(id) => flash([id])}
        />
      )}

      {isMultiplicaOpen && <MultiplicaModal onClose={() => setIsMultiplicaOpen(false)} />}
    </div>
  );
};

/** Antes de gerar: o que fazer, e como a escala vai decidir. */
const EmptyScale: React.FC = () => (
  <div className="escala-inicio">
    <p className="escala-inicio-chamada">
      Marque quem faltou e gere a escala. Nada é gravado até você oficializar.
    </p>
    <Rules />
  </div>
);

/** As regras do motor, na ordem em que ele aplica. */
const Rules: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const content = (
    <>
      <ol className="regras-lista">
        <li>
          <strong>Quem ainda não substituiu hoje</strong> vem antes. Repetir no mesmo dia é o
          último caso — acontece depois de acionar coordenação e gestão.
        </li>
        <li>
          <strong>Nível:</strong> professor, depois coordenação de área (PCA), depois equipe
          gestora.
        </li>
        <li>
          <strong>Afinidade:</strong> mesma disciplina, depois mesma área.
        </li>
        <li>
          <strong>Menos aulas próprias no dia</strong>, contando a eletiva.
        </li>
        <li>
          <strong>Menos substituições no histórico.</strong>
        </li>
      </ol>
      <p className="regras-nota">
        Fica de fora quem também faltou, quem já está escalado no horário, quem está em aula,
        eletiva, tutoria, ATPC ou Multiplica, os isentos, e quem passaria de 32 aulas na semana.
        Sem ninguém elegível, a aula aparece como <span className="cor-descoberta">sem cobertura</span>.
      </p>
    </>
  );

  if (compact) {
    return (
      <details className="regras regras-recolhidas">
        <summary>Como a escala escolhe</summary>
        {content}
      </details>
    );
  }

  return (
    <div className="regras">
      <h2 className="regras-titulo">Como a escala escolhe</h2>
      {content}
    </div>
  );
};
