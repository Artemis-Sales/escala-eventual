import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Teacher,
  ClassGroup,
  PeriodDefinition,
  ScheduleSlot,
  DailySubstitutionPlan,
  HistoryRecord,
  DayOfWeek,
  SubstitutionItem,
} from '../types';
import {
  PERIODS_DEFINITION,
  INITIAL_CLASSES,
  INITIAL_TEACHERS,
  generateInitialSchedule,
} from '../data/mockData';
import { generateDailyPlan } from '../utils/substitutionEngine';
import { randomTeacherColor } from '../utils/colors';

interface SchoolContextType {
  teachers: Teacher[];
  classes: ClassGroup[];
  periods: PeriodDefinition[];
  scheduleSlots: ScheduleSlot[];
  history: HistoryRecord[];
  
  selectedDate: string;
  selectedDay: DayOfWeek;
  absentTeacherIds: string[];
  currentPlan: DailySubstitutionPlan | null;

  setSelectedDate: (date: string) => void;
  toggleAbsentTeacher: (teacherId: string) => void;
  clearAbsentTeachers: () => void;
  generateSchedule: () => void;
  updateSubstitutionItem: (itemId: string, substituteTeacherId: string | null) => void;
  swapSubstitutions: (itemId1: string, itemId2: string) => void;
  assignSubstituteToItem: (itemId: string, substituteTeacherId: string) => void;
  confirmAndSavePlan: () => void;
  
  addTeacher: (teacher: Omit<Teacher, 'id' | 'totalSubstitutionsCount'>) => void;
  updateTeacher: (teacher: Teacher) => void;
  deleteTeacher: (id: string) => void;
  updateSlot: (slot: ScheduleSlot) => void;
  setAllScheduleSlots: (slots: ScheduleSlot[]) => void;
  setAllTeachers: (teachers: Teacher[]) => void;
  resetAllData: () => void;
  updateTeacherSubCount: (teacherId: string, delta: number) => void;

  // Multiplica SP e Cursos
  addMultiplicaCourse: (teacherId: string, dayOfWeek: DayOfWeek, periodIds: number[], trainingName: string) => void;
  removeMultiplicaCourse: (teacherId: string, dayOfWeek: DayOfWeek, periodIds: number[]) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_TEACHERS = 'escala_escola_oficial_teachers_v5';
const LOCAL_STORAGE_KEY_SLOTS = 'escala_escola_oficial_slots_v5';
const LOCAL_STORAGE_KEY_HISTORY = 'escala_escola_oficial_history_v5';

function loadFromStorage<T>(key: string, fallback: T): T {
  const saved = localStorage.getItem(key);
  if (!saved) return fallback;

  try {
    return JSON.parse(saved) as T;
  } catch (err) {
    console.warn(`Dado corrompido em localStorage["${key}"], usando valor padrão.`, err);
    localStorage.removeItem(key);
    return fallback;
  }
}

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>(() =>
    loadFromStorage(LOCAL_STORAGE_KEY_TEACHERS, INITIAL_TEACHERS)
  );

  const [classes] = useState<ClassGroup[]>(INITIAL_CLASSES);
  const [periods] = useState<PeriodDefinition[]>(PERIODS_DEFINITION);

  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>(() =>
    loadFromStorage(LOCAL_STORAGE_KEY_SLOTS, generateInitialSchedule())
  );

  const [history, setHistory] = useState<HistoryRecord[]>(() =>
    loadFromStorage<HistoryRecord[]>(LOCAL_STORAGE_KEY_HISTORY, [])
  );

  const [selectedDate, setSelectedDateState] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Sábado e domingo não têm aula: aproximamos para o dia útil mais próximo
  // (sábado -> sexta anterior, domingo -> segunda seguinte) em vez de cair
  // silenciosamente em "segunda" para qualquer dia não mapeado.
  const getDayOfWeekFromDate = (dateStr: string): DayOfWeek => {
    const d = new Date(dateStr + 'T00:00:00');
    const dayIndex = d.getDay();
    switch (dayIndex) {
      case 0: return 'segunda'; // domingo -> segunda seguinte
      case 1: return 'segunda';
      case 2: return 'terca';
      case 3: return 'quarta';
      case 4: return 'quinta';
      case 5: return 'sexta';
      case 6: return 'sexta'; // sábado -> sexta anterior
      default: return 'segunda';
    }
  };

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(() =>
    getDayOfWeekFromDate(new Date().toISOString().split('T')[0])
  );

  const [absentTeacherIds, setAbsentTeacherIds] = useState<string[]>([]);
  const [currentPlan, setCurrentPlan] = useState<DailySubstitutionPlan | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TEACHERS, JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SLOTS, JSON.stringify(scheduleSlots));
  }, [scheduleSlots]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(history));
  }, [history]);

  const setSelectedDate = (date: string) => {
    setSelectedDateState(date);
    setSelectedDay(getDayOfWeekFromDate(date));
    setCurrentPlan(null);
  };

  const toggleAbsentTeacher = (teacherId: string) => {
    setAbsentTeacherIds((prev) =>
      prev.includes(teacherId) ? prev.filter((id) => id !== teacherId) : [...prev, teacherId]
    );
    setCurrentPlan(null);
  };

  const clearAbsentTeachers = () => {
    setAbsentTeacherIds([]);
    setCurrentPlan(null);
  };

  const generateSchedule = () => {
    const plan = generateDailyPlan(
      selectedDate,
      selectedDay,
      absentTeacherIds,
      teachers,
      scheduleSlots,
      classes,
      periods
    );
    setCurrentPlan(plan);
  };

  const updateSubstitutionItem = (itemId: string, substituteTeacherId: string | null) => {
    if (!currentPlan) return;

    const updatedSubs: SubstitutionItem[] = currentPlan.substitutions.map((item) => {
      if (item.id === itemId) {
        const subTeacher = substituteTeacherId
          ? teachers.find((t) => t.id === substituteTeacherId)
          : null;

        let tier: 1 | 2 | 3 = 1;
        if (subTeacher?.role === 'EQUIPE_GESTORA') tier = 3;
        else if (subTeacher?.role === 'COORDENADOR_AREA') tier = 2;

        return {
          ...item,
          substituteTeacherId: subTeacher ? subTeacher.id : null,
          substituteTeacherName: subTeacher ? subTeacher.name : null,
          matchType: subTeacher ? 'MANUAL' : 'SEM_SUBSTITUTO',
          tier,
          isManualOverride: true,
        };
      }
      return item;
    });

    const uncoveredCount = updatedSubs.filter((s) => !s.substituteTeacherId).length;

    setCurrentPlan({
      ...currentPlan,
      substitutions: updatedSubs,
      uncoveredCount,
    });
  };

  // Trocar substitutos entre dois slots (Drag-and-Drop)
  const swapSubstitutions = (itemId1: string, itemId2: string) => {
    if (!currentPlan) return;

    const item1 = currentPlan.substitutions.find((s) => s.id === itemId1);
    const item2 = currentPlan.substitutions.find((s) => s.id === itemId2);
    if (!item1 || !item2) return;

    const updatedSubs = currentPlan.substitutions.map((item) => {
      if (item.id === itemId1) {
        return {
          ...item,
          substituteTeacherId: item2.substituteTeacherId,
          substituteTeacherName: item2.substituteTeacherName,
          matchType: item2.matchType || 'MANUAL',
          tier: item2.tier,
          isManualOverride: true,
        };
      }
      if (item.id === itemId2) {
        return {
          ...item,
          substituteTeacherId: item1.substituteTeacherId,
          substituteTeacherName: item1.substituteTeacherName,
          matchType: item1.matchType || 'MANUAL',
          tier: item1.tier,
          isManualOverride: true,
        };
      }
      return item;
    });

    const uncoveredCount = updatedSubs.filter((s) => !s.substituteTeacherId).length;

    setCurrentPlan({
      ...currentPlan,
      substitutions: updatedSubs,
      uncoveredCount,
    });
  };

  // Atribuir diretamente um professor a um slot específico
  const assignSubstituteToItem = (itemId: string, substituteTeacherId: string) => {
    updateSubstitutionItem(itemId, substituteTeacherId);
  };

  const confirmAndSavePlan = () => {
    if (!currentPlan) return;

    const teacherSubCounts: Record<string, number> = {};
    currentPlan.substitutions.forEach((sub) => {
      if (sub.substituteTeacherId) {
        teacherSubCounts[sub.substituteTeacherId] =
          (teacherSubCounts[sub.substituteTeacherId] || 0) + 1;
      }
    });

    setTeachers((prev) =>
      prev.map((t) => {
        const countToAdd = teacherSubCounts[t.id] || 0;
        return countToAdd > 0
          ? { ...t, totalSubstitutionsCount: t.totalSubstitutionsCount + countToAdd }
          : t;
      })
    );

    const absentNames = currentPlan.absentTeacherIds.map(
      (id) => teachers.find((t) => t.id === id)?.name || id
    );

    const officialPlan: DailySubstitutionPlan = {
      ...currentPlan,
      isOfficial: true,
      officializedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setCurrentPlan(officialPlan);

    const historyEntry: HistoryRecord = {
      id: `hist-${Date.now()}`,
      date: officialPlan.date,
      dayOfWeek: officialPlan.dayOfWeek,
      absentTeachersNames: absentNames,
      substitutions: officialPlan.substitutions,
      timestamp: new Date().toLocaleString('pt-BR'),
    };

    setHistory((prev) => [historyEntry, ...prev]);
  };

  const addTeacher = (teacherData: Omit<Teacher, 'id' | 'totalSubstitutionsCount'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `teacher-${Date.now()}`,
      totalSubstitutionsCount: 0,
      color: randomTeacherColor(),
    };
    setTeachers((prev) => [...prev, newTeacher]);
  };

  const updateTeacher = (updatedTeacher: Teacher) => {
    setTeachers((prev) => prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t)));
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    setScheduleSlots((prev) => prev.filter((s) => s.teacherId !== id));
    setAbsentTeacherIds((prev) => prev.filter((tId) => tId !== id));
  };

  const updateTeacherSubCount = (teacherId: string, delta: number) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacherId
          ? { ...t, totalSubstitutionsCount: Math.max(0, t.totalSubstitutionsCount + delta) }
          : t
      )
    );
  };

  const updateSlot = (slot: ScheduleSlot) => {
    setScheduleSlots((prev) => {
      const idx = prev.findIndex((s) => s.id === slot.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = slot;
        return copy;
      }
      return [...prev, slot];
    });
  };

  const addMultiplicaCourse = (
    teacherId: string,
    dayOfWeek: DayOfWeek,
    periodIds: number[],
    trainingName: string
  ) => {
    setScheduleSlots((prev) => {
      const updated = [...prev];
      periodIds.forEach((pId) => {
        const slotId = `slot_${teacherId}_${dayOfWeek}_${pId}`;
        const existingIdx = updated.findIndex((s) => s.id === slotId);

        const newSlot: ScheduleSlot = {
          id: slotId,
          teacherId,
          dayOfWeek,
          periodId: pId,
          type: 'CURSO_FORMACAO',
          trainingName: trainingName || 'Multiplica SP (1h30)',
        };

        if (existingIdx >= 0) {
          updated[existingIdx] = newSlot;
        } else {
          updated.push(newSlot);
        }
      });
      return updated;
    });

    if (selectedDay === dayOfWeek) {
      setCurrentPlan(null);
    }
  };

  const removeMultiplicaCourse = (
    teacherId: string,
    dayOfWeek: DayOfWeek,
    periodIds: number[]
  ) => {
    setScheduleSlots((prev) => {
      const updated = [...prev];
      periodIds.forEach((pId) => {
        const slotId = `slot_${teacherId}_${dayOfWeek}_${pId}`;
        const existingIdx = updated.findIndex((s) => s.id === slotId);

        if (existingIdx >= 0) {
          updated[existingIdx] = {
            id: slotId,
            teacherId,
            dayOfWeek,
            periodId: pId,
            type: 'LIVRE',
          };
        }
      });
      return updated;
    });

    if (selectedDay === dayOfWeek) {
      setCurrentPlan(null);
    }
  };

  const setAllScheduleSlots = (slots: ScheduleSlot[]) => {
    setScheduleSlots(slots);
  };

  const setAllTeachers = (newTeachers: Teacher[]) => {
    setTeachers(newTeachers);
  };

  const resetAllData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_TEACHERS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_SLOTS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_HISTORY);
    setTeachers(INITIAL_TEACHERS);
    setScheduleSlots(generateInitialSchedule());
    setHistory([]);
    setCurrentPlan(null);
    setAbsentTeacherIds([]);
  };

  return (
    <SchoolContext.Provider
      value={{
        teachers,
        classes,
        periods,
        scheduleSlots,
        history,
        selectedDate,
        selectedDay,
        absentTeacherIds,
        currentPlan,
        setSelectedDate,
        toggleAbsentTeacher,
        clearAbsentTeachers,
        generateSchedule,
        updateSubstitutionItem,
        swapSubstitutions,
        assignSubstituteToItem,
        confirmAndSavePlan,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        updateSlot,
        setAllScheduleSlots,
        setAllTeachers,
        resetAllData,
        updateTeacherSubCount,
        addMultiplicaCourse,
        removeMultiplicaCourse,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool deve ser usado dentro de um SchoolProvider');
  }
  return context;
};
