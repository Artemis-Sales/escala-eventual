import React, { useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { downloadExcelTemplate, parseUploadedExcel, type ParsedExcelResult } from '../utils/excelHelper';
import { randomTeacherColor } from '../utils/colors';
import { displayName } from '../utils/display';
import type { Teacher } from '../types';

export const ImportExportModal: React.FC = () => {
  const { periods, setAllTeachers, setAllScheduleSlots, resetAllData } = useSchool();

  const [dragActive, setDragActive] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedExcelResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const processFile = async (file: File) => {
    setParsedData(null);
    setSuccessMessage(null);
    setFileName(file.name);
    setParsedData(await parseUploadedExcel(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleApplyImport = () => {
    if (!parsedData) return;

    if (parsedData.importedTeachers?.length) {
      const formatted: Teacher[] = parsedData.importedTeachers.map((t) => ({
        ...t,
        color: randomTeacherColor(),
      }));
      setAllTeachers(formatted);
    }
    if (parsedData.importedSlots?.length) {
      setAllScheduleSlots(parsedData.importedSlots);
    }

    setSuccessMessage('Planilha aplicada. Professores e grade foram substituídos.');
    setParsedData(null);
    setFileName(null);
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Restaurar a grade e o cadastro de professores para o padrão oficial?\n\n' +
          'SERÁ PERDIDO: as alterações feitas na grade, incluindo os horários do Multiplica SP ' +
          'e dos cursos de formação cadastrados.\n\n' +
          'SERÁ MANTIDO: o histórico de escalas oficializadas e os contadores de substituição ' +
          'de cada professor.'
      )
    ) {
      resetAllData();
      setSuccessMessage('Grade e cadastro restaurados para o padrão oficial.');
    }
  };

  return (
    <div className="pagina dados">
      <div className="barra">
        <div className="pagina-titulos">
          <h1 className="pagina-titulo">Dados da escola</h1>
          <p className="pagina-sub">Importar uma grade nova a partir de planilha, ou voltar à grade oficial.</p>
        </div>
      </div>

      {successMessage && (
        <p className="faixa-aviso faixa-ok" role="status">
          {successMessage}
        </p>
      )}

      <section className="painel painel-margem">
        <header className="secao-cabeca">
          <h2 className="secao-titulo">Importar planilha</h2>
          <button type="button" className="btn btn-secundario" onClick={() => downloadExcelTemplate(periods)}>
            <Download size={16} aria-hidden="true" />
            Baixar modelo (.xlsx)
          </button>
        </header>

        <label
          className={`soltar ${dragActive ? 'is-ativo' : ''}`}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragActive(false);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <Upload size={20} aria-hidden="true" />
          <span className="soltar-titulo">
            Arraste a planilha para cá ou <span className="soltar-link">escolha um arquivo</span>
          </span>
          <span className="soltar-sub">.xlsx, .xls ou .csv — nada é aplicado antes da sua confirmação</span>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processFile(file);
              e.target.value = '';
            }}
          />
        </label>

        {parsedData && (
          <div className="leitura">
            <h3 className="grupo-titulo">Leitura de {fileName}</h3>

            {parsedData.error ? (
              <p className="faixa-aviso faixa-erro">{parsedData.error}</p>
            ) : (
              <>
                <dl className="ficha-dados">
                  <div>
                    <dt>Professores</dt>
                    <dd className="numero">{parsedData.importedTeachers?.length || 0}</dd>
                  </div>
                  <div>
                    <dt>Horários e aulas</dt>
                    <dd className="numero">{parsedData.importedSlots?.length || 0}</dd>
                  </div>
                </dl>

                {parsedData.warnings && parsedData.warnings.length > 0 && (
                  <div className="faixa-aviso faixa-atencao">
                    <p>
                      <strong>
                        {parsedData.warnings.length}{' '}
                        {parsedData.warnings.length === 1 ? 'linha ignorada' : 'linhas ignoradas'}
                      </strong>
                    </p>
                    <ul>
                      {parsedData.warnings.slice(0, 5).map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                      {parsedData.warnings.length > 5 && <li>e mais {parsedData.warnings.length - 5}.</li>}
                    </ul>
                  </div>
                )}

                {parsedData.importedTeachers && parsedData.importedTeachers.length > 0 && (
                  <p className="leitura-amostra">
                    {parsedData.importedTeachers
                      .slice(0, 8)
                      .map((t) => displayName(t.name))
                      .join(', ')}
                    {parsedData.importedTeachers.length > 8 &&
                      ` e mais ${parsedData.importedTeachers.length - 8}`}
                    .
                  </p>
                )}

                <div className="formulario-acoes">
                  <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => {
                      setParsedData(null);
                      setFileName(null);
                    }}
                  >
                    Descartar
                  </button>
                  <button type="button" className="btn btn-primario" onClick={handleApplyImport}>
                    Aplicar ao sistema
                  </button>
                </div>
                <p className="campo-ajuda">Aplicar substitui por completo os professores e a grade atuais.</p>
              </>
            )}
          </div>
        )}

        <div className="instrucoes">
          <h3 className="grupo-titulo">Como a planilha deve estar</h3>
          <dl className="instrucoes-lista">
            <div>
              <dt>Aba “Professores”</dt>
              <dd>
                Nome, Disciplina_Principal, Area_Conhecimento, Telefone, Cargo (PROFESSOR,
                COORDENADOR_AREA ou EQUIPE_GESTORA) e Isento_Substituicao (SIM ou NAO).
              </dd>
            </div>
            <div>
              <dt>Aba “Grade_e_Cursos”</dt>
              <dd>
                Dia_Semana, Periodo_Numero (1 a 9), Nome_Professor (igual ao da aba Professores),
                Tipo (AULA, CURSO_FORMACAO ou LIVRE), Turma e Disciplina_ou_Curso.
              </dd>
            </div>
            <div>
              <dt>Cursos e formações</dt>
              <dd>
                Todo horário com tipo <code>CURSO_FORMACAO</code> fica bloqueado para substituição.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="painel painel-margem zona-cuidado">
        <header className="secao-cabeca">
          <div>
            <h2 className="secao-titulo">Voltar à grade oficial</h2>
            <p className="pagina-sub">
              Desfaz as edições na grade e no cadastro, incluindo os horários do Multiplica SP. O
              histórico e os contadores de substituição ficam.
            </p>
          </div>
          <button type="button" className="btn btn-perigo" onClick={handleReset}>
            Restaurar dados oficiais
          </button>
        </header>
      </section>
    </div>
  );
};
