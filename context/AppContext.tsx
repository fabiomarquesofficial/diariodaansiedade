import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DailyLog, AnxietyRecord, BaiRecord, Goal, AvoidanceItem, Task } from '../types';

interface AppContextType {
  dailyLogs: DailyLog[];
  anxietyRecords: AnxietyRecord[];
  baiRecords: BaiRecord[];
  goals: Goal[];
  avoidanceLadder: AvoidanceItem[];
  eisenhowerTasks: Task[];
  
  // Actions
  addDailyLog: (log: DailyLog) => void;
  updateDailyLog: (log: DailyLog) => void;
  addAnxietyRecord: (record: AnxietyRecord) => void;
  addBaiRecord: (record: BaiRecord) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => void;
  addAvoidanceItem: (item: AvoidanceItem) => void;
  deleteAvoidanceItem: (id: string) => void;
  addEisenhowerTask: (task: Task) => void;
  updateEisenhowerTask: (task: Task) => void;
  deleteEisenhowerTask: (id: string) => void;
  
  // Helpers
  getTodayLog: () => DailyLog | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage or defaults
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>(() => {
    const saved = localStorage.getItem('dailyLogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [anxietyRecords, setAnxietyRecords] = useState<AnxietyRecord[]>(() => {
    const saved = localStorage.getItem('anxietyRecords');
    return saved ? JSON.parse(saved) : [];
  });

  const [baiRecords, setBaiRecords] = useState<BaiRecord[]>(() => {
    const saved = localStorage.getItem('baiRecords');
    return saved ? JSON.parse(saved) : [];
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });

  const [avoidanceLadder, setAvoidanceLadder] = useState<AvoidanceItem[]>(() => {
    const saved = localStorage.getItem('avoidanceLadder');
    return saved ? JSON.parse(saved) : [];
  });

  const [eisenhowerTasks, setEisenhowerTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('eisenhowerTasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence Effects
  useEffect(() => localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs)), [dailyLogs]);
  useEffect(() => localStorage.setItem('anxietyRecords', JSON.stringify(anxietyRecords)), [anxietyRecords]);
  useEffect(() => localStorage.setItem('baiRecords', JSON.stringify(baiRecords)), [baiRecords]);
  useEffect(() => localStorage.setItem('goals', JSON.stringify(goals)), [goals]);
  useEffect(() => localStorage.setItem('avoidanceLadder', JSON.stringify(avoidanceLadder)), [avoidanceLadder]);
  useEffect(() => localStorage.setItem('eisenhowerTasks', JSON.stringify(eisenhowerTasks)), [eisenhowerTasks]);

  // Actions
  const addDailyLog = (log: DailyLog) => setDailyLogs(prev => [...prev, log]);
  const updateDailyLog = (log: DailyLog) => setDailyLogs(prev => prev.map(l => l.id === log.id ? log : l));
  
  const addAnxietyRecord = (record: AnxietyRecord) => setAnxietyRecords(prev => [record, ...prev]);
  
  const addBaiRecord = (record: BaiRecord) => setBaiRecords(prev => [record, ...prev]);
  
  const addGoal = (goal: Goal) => setGoals(prev => [...prev, goal]);
  const updateGoal = (goal: Goal) => setGoals(prev => prev.map(g => g.id === goal.id ? goal : g));
  
  const addAvoidanceItem = (item: AvoidanceItem) => setAvoidanceLadder(prev => [...prev, item]);
  const deleteAvoidanceItem = (id: string) => setAvoidanceLadder(prev => prev.filter(i => i.id !== id));
  
  const addEisenhowerTask = (task: Task) => setEisenhowerTasks(prev => [...prev, task]);
  const updateEisenhowerTask = (task: Task) => setEisenhowerTasks(prev => prev.map(t => t.id === task.id ? task : t));
  const deleteEisenhowerTask = (id: string) => setEisenhowerTasks(prev => prev.filter(t => t.id !== id));

  const getTodayLog = () => {
    const today = new Date().toISOString().split('T')[0];
    return dailyLogs.find(l => l.date === today);
  };

  return (
    <AppContext.Provider value={{
      dailyLogs, anxietyRecords, baiRecords, goals, avoidanceLadder, eisenhowerTasks,
      addDailyLog, updateDailyLog, addAnxietyRecord, addBaiRecord, addGoal, updateGoal,
      addAvoidanceItem, deleteAvoidanceItem, addEisenhowerTask, updateEisenhowerTask, deleteEisenhowerTask,
      getTodayLog
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
