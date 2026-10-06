import { useState } from 'react';
import { SchoolProvider } from './context/SchoolContext';
import { Header, type AppTab } from './components/Header';
import { DailyDashboard } from './components/DailyDashboard';
import { WeeklyScheduleView } from './components/WeeklyScheduleView';
import { TeachersAndCoursesView } from './components/TeachersAndCoursesView';
import { HistoryAndEquityView } from './components/HistoryAndEquityView';
import { ImportExportModal } from './components/ImportExportModal';
import './App.css';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<AppTab>('daily');

  return (
    <div className="app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="conteudo">
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
