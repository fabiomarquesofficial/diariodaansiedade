import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SLEEP_HYGIENE_TIPS } from '../constants';
import Card from '../components/Card';
import { Trash2, Plus, Moon, AlertTriangle, Layers } from 'lucide-react';

const Tools = () => {
  const { 
    avoidanceLadder, addAvoidanceItem, deleteAvoidanceItem, 
    eisenhowerTasks, addEisenhowerTask, deleteEisenhowerTask 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ladder' | 'eisenhower' | 'sleep'>('ladder');
  
  // States for forms
  const [ladderInput, setLadderInput] = useState('');
  const [ladderRating, setLadderRating] = useState(50);
  const [matrixInput, setMatrixInput] = useState('');
  const [matrixQuadrant, setMatrixQuadrant] = useState<'do' | 'schedule' | 'delegate' | 'eliminate'>('do');
  const [sleepChecks, setSleepChecks] = useState<string[]>([]);

  // Handlers
  const handleAddLadder = () => {
    if (!ladderInput) return;
    addAvoidanceItem({ id: crypto.randomUUID(), situation: ladderInput, anxietyLevel: ladderRating });
    setLadderInput('');
    setLadderRating(50);
  };

  const handleAddMatrix = () => {
    if (!matrixInput) return;
    addEisenhowerTask({ id: crypto.randomUUID(), title: matrixInput, completed: false, quadrant: matrixQuadrant });
    setMatrixInput('');
  };

  const sortedLadder = [...avoidanceLadder].sort((a, b) => b.anxietyLevel - a.anxietyLevel);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Ferramentas TCC</h2>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('ladder')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'ladder' ? 'bg-teal-100 text-teal-800' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <div className="flex items-center gap-2"><AlertTriangle size={18}/> Escada da Evitação</div>
        </button>
        <button
          onClick={() => setActiveTab('eisenhower')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'eisenhower' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:bg-slate-100'}`}
        >
           <div className="flex items-center gap-2"><Layers size={18}/> Matriz de Eisenhower</div>
        </button>
        <button
          onClick={() => setActiveTab('sleep')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'sleep' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-500 hover:bg-slate-100'}`}
        >
           <div className="flex items-center gap-2"><Moon size={18}/> Higiene do Sono</div>
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'ladder' && (
          <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
             <div className="space-y-4">
               <Card title="Nova Situação">
                 <div className="space-y-4">
                   <input 
                     className="w-full border p-2 rounded" 
                     placeholder="Situação evitada..." 
                     value={ladderInput}
                     onChange={e => setLadderInput(e.target.value)}
                   />
                   <div>
                     <label className="text-sm text-slate-500 block mb-1">Nível de Ansiedade: {ladderRating}%</label>
                     <input 
                       type="range" min="0" max="100" 
                       value={ladderRating} onChange={e => setLadderRating(Number(e.target.value))}
                       className="w-full accent-teal-600"
                     />
                   </div>
                   <button onClick={handleAddLadder} className="w-full bg-teal-600 text-white py-2 rounded font-bold hover:bg-teal-700">Adicionar à Escada</button>
                 </div>
               </Card>
             </div>
             <div className="space-y-2">
                <h3 className="font-bold text-slate-700">Minha Escada (Do mais difícil para o mais fácil)</h3>
                {sortedLadder.map(item => (
                  <div key={item.id} className="bg-white p-3 rounded shadow-sm border border-slate-100 flex justify-between items-center">
                    <div>
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${item.anxietyLevel > 70 ? 'bg-red-500' : item.anxietyLevel > 30 ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                      <span className="text-slate-700">{item.situation}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-500 text-sm">{item.anxietyLevel}%</span>
                      <button onClick={() => deleteAvoidanceItem(item.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
                {sortedLadder.length === 0 && <p className="text-slate-400 italic">Nenhum item cadastrado.</p>}
             </div>
          </div>
        )}

        {activeTab === 'eisenhower' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="flex flex-col sm:flex-row gap-4 items-end bg-slate-50">
                <div className="flex-1 w-full">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Tarefa</label>
                    <input className="w-full border p-2 rounded" value={matrixInput} onChange={e => setMatrixInput(e.target.value)} placeholder="Nova tarefa..." />
                </div>
                <div className="w-full sm:w-auto">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Quadrante</label>
                    <select className="w-full border p-2 rounded bg-white" value={matrixQuadrant} onChange={e => setMatrixQuadrant(e.target.value as any)}>
                        <option value="do">Importante & Urgente (FAZER)</option>
                        <option value="schedule">Importante & Ñ Urgente (AGENDAR)</option>
                        <option value="delegate">Ñ Importante & Urgente (DELEGAR)</option>
                        <option value="eliminate">Ñ Importante & Ñ Urgente (ELIMINAR)</option>
                    </select>
                </div>
                <button onClick={handleAddMatrix} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"><Plus size={24}/></button>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {[
                    { id: 'do', title: 'FAZER (Agora)', color: 'bg-green-100 border-green-200', text: 'text-green-800' },
                    { id: 'schedule', title: 'AGENDAR (Planejar)', color: 'bg-blue-100 border-blue-200', text: 'text-blue-800' },
                    { id: 'delegate', title: 'DELEGAR (Quem?)', color: 'bg-orange-100 border-orange-200', text: 'text-orange-800' },
                    { id: 'eliminate', title: 'ELIMINAR (Distrações)', color: 'bg-red-100 border-red-200', text: 'text-red-800' },
                ].map(q => (
                    <div key={q.id} className={`p-4 rounded-xl border-2 ${q.color} min-h-[200px]`}>
                        <h4 className={`font-bold mb-3 ${q.text}`}>{q.title}</h4>
                        <ul className="space-y-2">
                            {eisenhowerTasks.filter(t => t.quadrant === q.id).map(t => (
                                <li key={t.id} className="bg-white/80 p-2 rounded flex justify-between items-center text-sm">
                                    <span>{t.title}</span>
                                    <button onClick={() => deleteEisenhowerTask(t.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'sleep' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Card title="Checklist Diário de Higiene do Sono">
                <p className="text-slate-500 mb-6 text-sm">Marque as práticas que você realizou hoje para melhorar a qualidade do seu sono.</p>
                <div className="space-y-4">
                    {SLEEP_HYGIENE_TIPS.map((tip, idx) => (
                        <label key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100">
                            <input 
                                type="checkbox" 
                                className="mt-1 w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                                checked={sleepChecks.includes(tip)}
                                onChange={() => {
                                    if(sleepChecks.includes(tip)) setSleepChecks(prev => prev.filter(t => t !== tip));
                                    else setSleepChecks(prev => [...prev, tip]);
                                }}
                            />
                            <span className="text-slate-700">{tip}</span>
                        </label>
                    ))}
                </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;
