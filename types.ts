export interface DailyLog {
  id: string;
  date: string; // ISO Date string
  mood: number; // 1-5
  energy: number; // 1-5
  sleepQuality: number; // 1-5
  gratitude: string;
  priorities: string[]; // Top 3
  tasks: Task[]; // Simple daily todos
  waterIntake: number; // cups
}

export interface AnxietyRecord {
  id: string;
  date: string;
  timestamp: number;
  period: 'Acordar' | 'Manhã' | 'Meio-dia' | 'Tarde' | 'Noite' | 'Dormir';
  symptoms: string[];
  triggers: string;
  copingMechanisms: string;
  intensity: number; // 1-10
}

export interface BaiRecord {
  id: string;
  date: string;
  score: number;
  level: 'Baixo' | 'Moderado' | 'Elevado';
  answers: number[]; // Array of 0-3 values corresponding to the 21 questions
}

export interface Goal {
  id: string;
  what: string;
  when: string;
  where: string;
  withWhom: string;
  evidence: string; // How do I know I reached it?
  saboteurs: string;
  motivators: string;
  strategies: string;
  firstStep: string;
  commitment: number; // 1-10
  status: 'active' | 'completed';
}

export interface AvoidanceItem {
  id: string;
  situation: string;
  anxietyLevel: number; // 0-100
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  quadrant?: 'do' | 'schedule' | 'delegate' | 'eliminate'; // For Eisenhower
}

export interface SleepHygieneItem {
  id: string;
  text: string;
  checked: boolean; // For "Praticado hoje"
}
