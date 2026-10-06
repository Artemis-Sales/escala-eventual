import React from 'react';

export type AppTab = 'daily' | 'schedule' | 'teachers' | 'history' | 'import';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const TABS: { id: AppTab; label: string; short?: string }[] = [
  { id: 'daily', label: 'Escala do dia', short: 'Escala' },
  { id: 'schedule', label: 'Grade' },
  { id: 'teachers', label: 'Professores' },
  { id: 'history', label: 'Histórico' },
  { id: 'import', label: 'Dados' },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => (
  <header className="topo">
    <div className="topo-interno">
      <div className="marca">
        <span className="marca-nome">Escala Eventual</span>
        <span className="marca-escola">E.E. Cel. Ary Gomes · PEI 9h</span>
      </div>

      <nav className="abas" aria-label="Seções">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className="aba"
            aria-current={activeTab === tab.id ? 'page' : undefined}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.short ? (
              <>
                <span className="aba-longo">{tab.label}</span>
                <span className="aba-curto">{tab.short}</span>
              </>
            ) : (
              tab.label
            )}
          </button>
        ))}
      </nav>
    </div>
  </header>
);
