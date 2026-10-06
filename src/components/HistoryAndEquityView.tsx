import React, { useMemo } from 'react';
import { useSchool } from '../context/SchoolContext';
import { areaKey, capitalize, displayName, longDate, shortClassName } from '../utils/display';

export const HistoryAndEquityView: React.FC = () => {
  const { history, teachers, setAllTeachers } = useSchool();

  const handleResetCounters = () => {
    if (
      window.confirm(
        'Zerar o contador de substituições de todos os professores?\n\n' +
          'Use no começo de um novo mês ou bimestre. O histórico de escalas continua guardado.'
      )
    ) {
      setAllTeachers(teachers.map((t) => ({ ...t, totalSubstitutionsCount: 0 })));
    }
  };

  // Ordem alfabética, de propósito: é para achar uma pessoa e ver a carga dela, não para
  // classificar quem trabalhou mais.
  const people = useMemo(
    () =>
      teachers
        .filter((t) => !t.isExemptFromSubstitutions)
        .sort((a, b) => displayName(a.name).localeCompare(displayName(b.name), 'pt-BR')),
    [teachers]
  );

  const counts = people.map((t) => t.totalSubstitutionsCount);
  const max = Math.max(1, ...counts);
  const total = counts.reduce((a, b) => a + b, 0);
  const average = people.length ? total / people.length : 0;
  const none = counts.filter((c) => c === 0).length;

  return (
    <div className="pagina historico">
      <section className="painel">
        <header className="painel-cabeca">
          <div className="pagina-titulos">
            <h1 className="pagina-titulo">Distribuição das substituições</h1>
            <p className="pagina-sub">
              <span className="numero">{total}</span> substituições oficializadas · média de{' '}
              <span className="numero">{average.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}</span>{' '}
              por pessoa ·{' '}
              <span className="numero">{none}</span> {none === 1 ? 'pessoa ainda não substituiu' : 'pessoas ainda não substituíram'}
            </p>
          </div>
          <button type="button" className="btn btn-secundario" onClick={handleResetCounters}>
            Zerar contadores
          </button>
        </header>

        <ul className="distribuicao">
          {people.map((t) => {
            const n = t.totalSubstitutionsCount;
            return (
              <li key={t.id} className="distribuicao-linha">
                <span className="distribuicao-nome">
                  <span className={`area-ponto area-${areaKey(t.knowledgeArea)}`} aria-hidden="true" />
                  {displayName(t.name)}
                </span>
                <span className="distribuicao-barra" aria-hidden="true">
                  <span style={{ width: `${(n / max) * 100}%` }} />
                </span>
                <span className="distribuicao-valor">{n}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="painel">
        <header className="painel-cabeca">
          <div className="pagina-titulos">
            <h2 className="pagina-titulo">Escalas oficializadas</h2>
            <p className="pagina-sub">Só entra aqui o que foi oficializado na escala do dia.</p>
          </div>
        </header>

        {history.length === 0 ? (
          <p className="grupo-vazio painel-margem">
            Nenhuma escala oficializada ainda. Na aba Escala do dia, gere a escala e use
            Oficializar para registrá-la aqui.
          </p>
        ) : (
          <div className="registros">
            {history.map((record) => (
              <article key={record.id} className="registro">
                <header className="registro-cabeca">
                  <h3 className="registro-data">
                    {capitalize(longDate(record.date))}
                  </h3>
                  <span className="registro-hora">gravada em {record.timestamp}</span>
                </header>
                <p className="registro-faltas">
                  <span className="resumo-rotulo">Faltaram</span>{' '}
                  {record.absentTeachersNames.map(displayName).join(', ')}
                </p>
                <div className="tabela-rolagem">
                  <table className="tabela tabela-compacta">
                    <thead>
                      <tr>
                        <th scope="col">Aula</th>
                        <th scope="col">Turma</th>
                        <th scope="col">Ausente</th>
                        <th scope="col">Substituto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.substitutions.map((sub) => (
                        <tr key={sub.id}>
                          <td className="numero">{sub.periodLabel.replace(' Aula', '')}</td>
                          <td>{shortClassName(sub.className)}</td>
                          <td>{displayName(sub.originalTeacherName)}</td>
                          <td className={sub.substituteTeacherName ? '' : 'cor-descoberta'}>
                            {sub.substituteTeacherName
                              ? displayName(sub.substituteTeacherName)
                              : 'Sem cobertura'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
