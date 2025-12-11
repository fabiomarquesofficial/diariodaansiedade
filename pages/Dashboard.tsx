import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import { Plus, Check, Trash2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { dailyLogs, addDailyLog, updateDailyLog, getTodayLog } = useApp();
  const [currentLog, setCurrentLog] = useState(getTodayLog() || {
    id: crypto.randomUUID(),
    date: new Date().toISOString().split('T')[0],
    mood: 3,
    energy: 3,
    sleepQuality: 3,
    gratitude: '',
    priorities: ['', '', ''],
    tasks: [],
    waterIntake: 0
  });

  const [newTaskInput, setNewTaskInput] = useState('');

  // Save changes to current log automatically
  useEffect(() => {
    const existing = getTodayLog();
    if (existing) {
        updateDailyLog(currentLog);
    } else {
        addDailyLog(currentLog);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLog]);

  const handlePriorityChange = (index: number, value: string) => {
    const newPriorities = [...currentLog.priorities];
    newPriorities[index] = value;
    setCurrentLog({ ...currentLog, priorities: newPriorities });
  };

  const handleAddTask = () => {
    if (!newTaskInput.trim()) return;
    const newTask = { id: crypto.randomUUID(), title: newTaskInput, completed: false };
    setCurrentLog(prev => ({ ...prev, tasks: [...prev.tasks, newTask] }));
    setNewTaskInput('');
  };

  const toggleTask = (id: string) => {
    setCurrentLog(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));
  };

  const deleteTask = (id: string) => {
    setCurrentLog(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id)
    }));
  };

  // Prepare chart data (Last 7 entries)
  const chartData = dailyLogs.slice(-7).map(log => ({
    name: new Date(log.date).toLocaleDateString('pt-BR', { weekday: 'short' }),
    humor: log.mood,
    sono: log.sleepQuality
  }));

  const MoodSelector = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-500">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => onChange(level)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              value === level ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Olá! Como está seu dia?</h2>
          <p className="text-slate-500">{new Date().toLocaleDateString('pt-BR', { dateStyle: 'full' })}</p>
        </div>
      </header>

      {/* Quick Check-in */}
      <Card className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MoodSelector 
            label="Humor (1-5)" 
            value={currentLog.mood} 
            onChange={(v) => setCurrentLog({ ...currentLog, mood: v })} 
          />
          <MoodSelector 
            label="Energia (1-5)" 
            value={currentLog.energy} 
            onChange={(v) => setCurrentLog({ ...currentLog, energy: v })} 
          />
          <MoodSelector 
            label="Qualidade do Sono (1-5)" 
            value={currentLog.sleepQuality} 
            onChange={(v) => setCurrentLog({ ...currentLog, sleepQuality: v })} 
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 3 Priorities */}
        <Card title="Top 3 Prioridades do Dia" className="h-full">
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="bg-teal-100 text-teal-800 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                  {i + 1}
                </span>
                <input
                  type="text"
                  placeholder="Defina uma prioridade..."
                  value={currentLog.priorities[i]}
                  onChange={(e) => handlePriorityChange(i, e.target.value)}
                  className="w-full border-b border-slate-200 focus:border-teal-500 outline-none py-1 bg-transparent"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Gratitude */}
        <Card title="Sou grato(a) por..." className="h-full flex flex-col">
          <textarea
            value={currentLog.gratitude}
            onChange={(e) => setCurrentLog({ ...currentLog, gratitude: e.target.value })}
            placeholder="Escreva algo bom que aconteceu hoje ou pelo que sente gratidão..."
            className="w-full flex-1 p-3 bg-slate-50 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-200 outline-none resize-none"
          />
        </Card>
      </div>

      {/* To Do List */}
      <Card title="TO DO List">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="Adicionar nova tarefa..."
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:border-teal-500 outline-none"
          />
          <button 
            onClick={handleAddTask}
            className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-2">
          {currentLog.tasks.length === 0 && <p className="text-slate-400 text-sm italic text-center py-4">Nenhuma tarefa ainda.</p>}
          {currentLog.tasks.map(task => (
            <div key={task.id} className="flex items-center group">
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${
                  task.completed ? 'bg-teal-500 border-teal-500 text-white' : 'border-slate-300 text-transparent'
                }`}
              >
                <Check size={14} strokeWidth={3} />
              </button>
              <span className={`flex-1 ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                {task.title}
              </span>
              <button onClick={() => deleteTask(task.id)} className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Weekly Chart */}
      <Card title="Resumo da Semana">
        <div className="h-64 w-full">
            {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis hide domain={[0, 6]} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="humor" stackId="1" stroke="#14b8a6" fill="#ccfbf1" name="Humor" />
              <Area type="monotone" dataKey="sono" stackId="2" stroke="#0ea5e9" fill="#e0f2fe" name="Qualidade Sono" />
            </AreaChart>
          </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                    Insira registros diários para ver o gráfico.
                </div>
            )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
