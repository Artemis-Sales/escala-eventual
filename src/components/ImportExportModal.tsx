import React, { useState } from 'react';
import {
  FileSpreadsheet,
  UploadCloud,
  Download,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Users,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { downloadExcelTemplate, parseUploadedExcel, type ParsedExcelResult } from '../utils/excelHelper';
import { randomTeacherColor } from '../utils/colors';
import type { Teacher } from '../types';

export const ImportExportModal: React.FC = () => {
  const { periods, setAllTeachers, setAllScheduleSlots } = useSchool();

  const [dragActive, setDragActive] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedExcelResult | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDownloadTemplate = () => {
    downloadExcelTemplate(periods);
  };

  const processFile = async (file: File) => {
    setParsedData(null);
    setSuccessMessage(null);

    const result = await parseUploadedExcel(file);
    setParsedData(result);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleApplyImport = () => {
    if (!parsedData) return;

    if (parsedData.importedTeachers && parsedData.importedTeachers.length > 0) {
      const formattedTeachers: Teacher[] = parsedData.importedTeachers.map((t) => ({
        ...t,
        color: randomTeacherColor(),
      }));

      setAllTeachers(formattedTeachers);
    }

    if (parsedData.importedSlots && parsedData.importedSlots.length > 0) {
      setAllScheduleSlots(parsedData.importedSlots);
    }

    setSuccessMessage('Dados da planilha importados e aplicados com sucesso no sistema!');
    setParsedData(null);
  };

  return (
    <div className="import-view">
      <div className="import-banner-card">
        <div className="import-banner-info">
          <div className="import-icon-box">
            <FileSpreadsheet size={28} />
          </div>
          <div>
            <h3 className="import-title">Importação de Planilhas da Escola</h3>
            <p className="import-desc">
              Carregue os horários existentes da sua escola via arquivo Excel (.xlsx ou .csv).
              Você pode cadastrar professores, matriz de aulas e horários de cursos/ATPC.
            </p>
          </div>
        </div>

        <button onClick={handleDownloadTemplate} className="btn-secondary">
          <Download size={16} />
          <span>Baixar Modelo de Planilha (.xlsx)</span>
        </button>
      </div>

      {successMessage && (
        <div className="alert-banner-success">
          <CheckCircle2 size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <div
        className={`drop-zone-card ${dragActive ? 'drop-active' : ''}`}
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
        <UploadCloud size={44} className="text-primary drop-icon" />
        <h4 className="drop-title">Arraste e solte sua planilha Excel aqui</h4>
        <p className="drop-subtitle">Formatos suportados: .xlsx, .xls, .csv</p>

        <label className="btn-primary file-input-label">
          <span>Procurar Arquivo no Computador</span>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {parsedData && (
        <div className="import-preview-card">
          <h4 className="preview-title">Resultado da Leitura da Planilha</h4>

          {parsedData.error ? (
            <div className="alert-banner-warning">
              <AlertTriangle size={18} />
              <span>{parsedData.error}</span>
            </div>
          ) : (
            <>
              <div className="preview-stats-grid">
                <div className="preview-stat-item">
                  <Users size={18} className="text-primary" />
                  <div>
                    <strong>{parsedData.importedTeachers?.length || 0}</strong>
                    <span>Professores identificados</span>
                  </div>
                </div>

                <div className="preview-stat-item">
                  <Layers size={18} className="text-warning" />
                  <div>
                    <strong>{parsedData.importedSlots?.length || 0}</strong>
                    <span>Registros de horários/aulas</span>
                  </div>
                </div>
              </div>

              {parsedData.warnings && parsedData.warnings.length > 0 && (
                <div className="alert-banner-warning">
                  <AlertTriangle size={18} />
                  <div>
                    <strong>{parsedData.warnings.length} linha(s) da grade foram ignoradas:</strong>
                    <ul style={{ margin: '4px 0 0', paddingLeft: 18 }}>
                      {parsedData.warnings.slice(0, 5).map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                      {parsedData.warnings.length > 5 && (
                        <li>+{parsedData.warnings.length - 5} outras...</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {parsedData.importedTeachers && parsedData.importedTeachers.length > 0 && (
                <div className="preview-teachers-list">
                  <h5>Exemplo de Professores Encontrados:</h5>
                  <div className="preview-chips">
                    {parsedData.importedTeachers.slice(0, 8).map((t, i) => (
                      <span key={i} className="chip-preview">
                        {t.name} ({t.mainSubject})
                      </span>
                    ))}
                    {parsedData.importedTeachers.length > 8 && (
                      <span className="chip-preview-more">
                        +{parsedData.importedTeachers.length - 8} outros
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="preview-actions-footer">
                <button
                  onClick={() => setParsedData(null)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button onClick={handleApplyImport} className="btn-primary">
                  <CheckCircle2 size={16} />
                  <span>Aplicar Dados ao Sistema</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="import-instructions-card">
        <h4 className="instructions-title">
          <Info size={16} /> Como organizar sua planilha?
        </h4>
        <div className="instructions-grid">
          <div className="instruction-step">
            <span className="step-num">1</span>
            <div className="step-content">
              <strong>Aba "Professores"</strong>
              <p>
                Colunas: Nome, Disciplina_Principal, Area_Conhecimento, Telefone, Cargo
                (PROFESSOR, COORDENADOR_AREA ou EQUIPE_GESTORA) e Isento_Substituicao (SIM/NAO).
              </p>
            </div>
          </div>

          <div className="instruction-step">
            <span className="step-num">2</span>
            <div className="step-content">
              <strong>Aba "Grade_e_Cursos"</strong>
              <p>
                Colunas: Dia_Semana, Periodo_Numero (1 a 9), Nome_Professor (deve bater com o
                Nome da aba Professores), Tipo (AULA, CURSO_FORMACAO ou LIVRE), Turma,
                Disciplina_ou_Curso.
              </p>
            </div>
          </div>

          <div className="instruction-step">
            <span className="step-num">3</span>
            <div className="step-content">
              <strong>Bloqueios de Cursos/Formações</strong>
              <p>
                Qualquer período marcado com o tipo <code>CURSO_FORMACAO</code> será automaticamente
                bloqueado para substituições. Ao aplicar a importação, professores e grade de
                horários substituem por completo os dados atuais do sistema.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
