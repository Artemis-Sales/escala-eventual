import React from 'react';
import {
  History,
  Calendar,
  Award,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const HistoryAndEquityView: React.FC = () => {
  const { history, teachers, setAllTeachers } = useSchool();

  const handleResetCounters = () => {
    if (
      window.confirm(
        'Deseja zerar o contador de substituições de todos os professores para iniciar um novo mês ou bimestre?'
      )
    ) {
      setAllTeachers(
        teachers.map((t) => ({
          ...t,
          totalSubstitutionsCount: 0,
        }))
      );
    }
  };

  // Ordenar professores pelo número de substituições
  const rankedTeachers = [...teachers].sort(
    (a, b) => b.totalSubstitutionsCount - a.totalSubstitutionsCount
  );

  return (
    <div className="history-equity-view">
      {/* Ranking de Equidade Geral */}
      <section className="equity-section-card">
        <div className="section-header-row">
          <div className="title-with-badge">
            <Award className="text-warning" size={22} />
            <div>
              <h3 className="section-title">Ranking de Distribuição de Substituições</h3>
              <p className="section-subtitle">
                Controle de transparência para garantir que todos os professores contribuam de forma equilibrada.
              </p>
            </div>
          </div>

          <button onClick={handleResetCounters} className="btn-secondary btn-sm">
            <RotateCcw size={14} />
            <span>Zerar Contadores (Novo Mês/Bimestre)</span>
          </button>
        </div>

        <div className="ranking-table-container">
          <table className="ranking-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>#</th>
                <th>Professor</th>
                <th>Disciplina</th>
                <th>Área</th>
                <th style={{ textAlign: 'center' }}>Total de Substituições</th>
                <th>Status de Equidade</th>
              </tr>
            </thead>
            <tbody>
              {rankedTeachers.map((teacher, idx) => {
                let badgeClass = 'badge-equity-balanced';
                let badgeText = 'Equilibrado';

                if (teacher.totalSubstitutionsCount === 0) {
                  badgeClass = 'badge-equity-low';
                  badgeText = 'Nenhuma feita (Prioritário)';
                } else if (teacher.totalSubstitutionsCount >= 4) {
                  badgeClass = 'badge-equity-high';
                  badgeText = 'Mais Solicitado';
                }

                return (
                  <tr key={teacher.id}>
                    <td className="rank-position">{idx + 1}º</td>
                    <td>
                      <div className="teacher-table-cell">
                        <div
                          className="table-avatar"
                          style={{ backgroundColor: teacher.color || '#3B82F6' }}
                        >
                          {teacher.name.replace(/Prof\.|Profa\./g, '').trim().charAt(0)}
                        </div>
                        <span className="teacher-name-bold">{teacher.name}</span>
                      </div>
                    </td>
                    <td>{teacher.mainSubject}</td>
                    <td>
                      <span className="table-area-tag">{teacher.knowledgeArea}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="subs-count-badge">
                        {teacher.totalSubstitutionsCount}
                      </span>
                    </td>
                    <td>
                      <span className={`badge-equity ${badgeClass}`}>
                        {badgeText}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Histórico de Dias Gravados */}
      <section className="history-section-card">
        <div className="section-header-row">
          <div className="title-with-badge">
            <History className="text-primary" size={22} />
            <div>
              <h3 className="section-title">Histórico de Escalas Oficializadas</h3>
              <p className="section-subtitle">
                Registro de todas as escalas confirmadas no sistema.
              </p>
            </div>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="empty-history-state">
            <Calendar size={48} className="text-muted" />
            <p>Nenhuma escala foi oficializada ainda.</p>
            <small className="text-muted">
              Gere uma escala na aba "Escala do Dia" e clique em "Oficializar Escala" para gravar aqui.
            </small>
          </div>
        ) : (
          <div className="history-list">
            {history.map((record) => {
              const formattedDate = new Date(record.date + 'T00:00:00').toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });

              return (
                <div key={record.id} className="history-record-card">
                  <div className="record-header">
                    <div className="record-date-badge">
                      <Calendar size={15} />
                      <span>{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</span>
                    </div>
                    <span className="record-timestamp">Gravado em: {record.timestamp}</span>
                  </div>

                  <div className="record-absent-row">
                    <strong>Professores Ausentes:</strong>{' '}
                    <span className="text-danger">{record.absentTeachersNames.join(', ')}</span>
                  </div>

                  <div className="record-subs-summary">
                    <strong>Substituições Realizadas ({record.substitutions.length}):</strong>
                    <div className="record-subs-tags">
                      {record.substitutions.map((sub, sIdx) => (
                        <div key={sIdx} className="record-sub-tag">
                          <span className="tag-class">{sub.className}</span>
                          <span className="tag-period">{sub.periodLabel}</span>
                          <span className="tag-teacher text-danger">{sub.originalTeacherName}</span>
                          <ArrowRight size={12} />
                          <span className="tag-substitute text-success font-bold">
                            {sub.substituteTeacherName || 'Sem Substituto'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
