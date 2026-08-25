import React from 'react';
import {
  CalendarDays,
  Users,
  Grid,
  History,
  FileSpreadsheet,
  RotateCcw,
  School,
  Clock,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

interface HeaderProps {
  activeTab: 'daily' | 'schedule' | 'teachers' | 'history' | 'import';
  setActiveTab: (tab: 'daily' | 'schedule' | 'teachers' | 'history' | 'import') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { resetAllData } = useSchool();

  const handleReset = () => {
    if (
      window.confirm(
        'Deseja restaurar todos os dados para o padrão oficial das planilhas da escola?'
      )
    ) {
      resetAllData();
    }
  };

  return (
    <header className="app-header">
      <div className="header-top-bar">
        <div className="brand-container">
          <div className="brand-icon-wrapper">
            <School className="brand-icon" size={26} />
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">Escala Eventual</h1>
              <span className="badge-integral">
                <Clock size={13} />
                Integral 9h
              </span>
            </div>
            <p className="brand-subtitle">
              Gestão Inteligente de Substituições & Grade Horária Escolar
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            onClick={handleReset}
            className="btn-secondary btn-sm"
            title="Restaura os professores e horários das planilhas oficiais"
          >
            <RotateCcw size={15} />
            <span>Restaurar Dados Oficiais</span>
          </button>
        </div>
      </div>

      {/* Navegação por Abas */}
      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          <CalendarDays size={18} />
          <span>Painel do Dia (Escala)</span>
          <span className="pulse-indicator"></span>
        </button>

        <button
          className={`nav-tab ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          <Grid size={18} />
          <span>Grade Semanal (9 Aulas)</span>
        </button>

        <button
          className={`nav-tab ${activeTab === 'teachers' ? 'active' : ''}`}
          onClick={() => setActiveTab('teachers')}
        >
          <Users size={18} />
          <span>Professores & Cursos / ATPC</span>
        </button>

        <button
          className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <History size={18} />
          <span>Histórico & Equidade</span>
        </button>

        <button
          className={`nav-tab ${activeTab === 'import' ? 'active' : ''}`}
          onClick={() => setActiveTab('import')}
        >
          <FileSpreadsheet size={18} />
          <span>Importar Planilhas Excel</span>
        </button>
      </nav>
    </header>
  );
};
