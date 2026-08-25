import { useState } from 'react';
import { SchoolProvider } from './context/SchoolContext';
import { Header } from './components/Header';
import { DailyDashboard } from './components/DailyDashboard';
import { WeeklyScheduleView } from './components/WeeklyScheduleView';
import { TeachersAndCoursesView } from './components/TeachersAndCoursesView';
import { HistoryAndEquityView } from './components/HistoryAndEquityView';
import { ImportExportModal } from './components/ImportExportModal';
import './App.css';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<
    'daily' | 'schedule' | 'teachers' | 'history' | 'import'
  >('daily');

  return (
    <div className="app-container">
      {/* Cabeçalho Superior e Abas */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conteúdo Principal de Acordo com a Aba Ativa */}
      <main className="app-main-content">
        {activeTab === 'daily' && <DailyDashboard />}
        {activeTab === 'schedule' && <WeeklyScheduleView />}
        {activeTab === 'teachers' && <TeachersAndCoursesView />}
        {activeTab === 'history' && <HistoryAndEquityView />}
        {activeTab === 'import' && <ImportExportModal />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <SchoolProvider>
      <AppContent />
    </SchoolProvider>
  );
}
