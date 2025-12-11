import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import { Download, Bell, Moon, Sun, Database } from 'lucide-react';

const Settings = () => {
  const context = useApp();
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Visual toggle only for demo

  const handleExport = () => {
    const data = {
        logs: context.dailyLogs,
        anxiety: context.anxietyRecords,
        bai: context.baiRecords,
        goals: context.goals
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `planner-ansiedade-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Configurações</h2>
      
      <Card title="Preferências">
        <div className="space-y-4">
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full"><Bell size={20} className="text-slate-600"/></div>
                    <div>
                        <p className="font-semibold text-slate-700">Lembretes Diários</p>
                        <p className="text-xs text-slate-500">Receba notificações para preencher o registro.</p>
                    </div>
                </div>
                <div 
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${notifications ? 'bg-teal-500' : 'bg-slate-300'}`}
                >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${notifications ? 'translate-x-6' : ''}`}></div>
                </div>
            </div>

            <div className="flex items-center justify-between p-2 border-t border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full">{darkMode ? <Moon size={20} className="text-slate-600"/> : <Sun size={20} className="text-slate-600"/>}</div>
                    <div>
                        <p className="font-semibold text-slate-700">Tema Escuro</p>
                        <p className="text-xs text-slate-500">Alternar entre modo claro e escuro.</p>
                    </div>
                </div>
                <div 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${darkMode ? 'bg-indigo-500' : 'bg-slate-300'}`}
                >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${darkMode ? 'translate-x-6' : ''}`}></div>
                </div>
            </div>
        </div>
      </Card>

      <Card title="Dados">
         <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-full"><Database size={20} className="text-slate-600"/></div>
                <div>
                    <p className="font-semibold text-slate-700">Exportar Dados</p>
                    <p className="text-xs text-slate-500">Baixe uma cópia de todos os seus registros.</p>
                </div>
            </div>
            <button onClick={handleExport} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700">
                <Download size={18} /> JSON
            </button>
        </div>
      </Card>

      <div className="text-center text-slate-400 text-sm mt-8">
        <p>Planner Ansiedade v1.0.0</p>
        <p>Desenvolvido com carinho.</p>
      </div>
    </div>
  );
};

export default Settings;
