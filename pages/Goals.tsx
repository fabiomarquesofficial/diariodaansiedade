import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Goal } from '../types';
import Card from '../components/Card';
import { Target, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const Goals = () => {
  const { goals, addGoal, updateGoal } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const [form, setForm] = useState<Partial<Goal>>({
    what: '', when: '', where: '', withWhom: '', evidence: '', 
    saboteurs: '', motivators: '', strategies: '', firstStep: '', commitment: 8
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.what) return;
    
    addGoal({
      ...form,
      id: crypto.randomUUID(),
      status: 'active'
    } as Goal);
    
    setForm({ what: '', when: '', where: '', withWhom: '', evidence: '', saboteurs: '', motivators: '', strategies: '', firstStep: '', commitment: 8 });
    setIsFormOpen(false);
  };

  const toggleStatus = (goal: Goal) => {
    updateGoal({ ...goal, status: goal.status === 'active' ? 'completed' : 'active' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Target className="text-teal-600" /> Meus Objetivos
        </h2>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-teal-700"
        >
          {isFormOpen ? 'Cancelar' : 'Novo Objetivo'}
        </button>
      </div>

      {isFormOpen && (
        <Card className="bg-slate-50 border-teal-200 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-bold text-lg text-teal-800 border-b pb-2 mb-4">Especificação do Objetivo</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase">O que você quer?</label>
                    <input required className="w-full p-2 rounded border" value={form.what} onChange={e => setForm({...form, what: e.target.value})} />
                </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase">Quando?</label>
                    <input type="text" className="w-full p-2 rounded border" value={form.when} onChange={e => setForm({...form, when: e.target.value})} />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase">Onde?</label>
                    <input className="w-full p-2 rounded border" value={form.where} onChange={e => setForm({...form, where: e.target.value})} />
                </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase">Com quem?</label>
                    <input className="w-full p-2 rounded border" value={form.withWhom} onChange={e => setForm({...form, withWhom: e.target.value})} />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">Evidência (Como saberei que consegui?)</label>
                <textarea className="w-full p-2 rounded border" rows={2} value={form.evidence} onChange={e => setForm({...form, evidence: e.target.value})} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase">Motivadores (Ganhos)</label>
                    <textarea className="w-full p-2 rounded border" rows={2} value={form.motivators} onChange={e => setForm({...form, motivators: e.target.value})} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase">Sabotadores (Perdas/Obstáculos)</label>
                    <textarea className="w-full p-2 rounded border" rows={2} value={form.saboteurs} onChange={e => setForm({...form, saboteurs: e.target.value})} />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">Estratégias / Ações</label>
                <textarea className="w-full p-2 rounded border" rows={2} value={form.strategies} onChange={e => setForm({...form, strategies: e.target.value})} />
            </div>

             <div className="grid md:grid-cols-2 gap-4 items-center">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase">Primeiro Passo</label>
                    <input className="w-full p-2 rounded border" value={form.firstStep} onChange={e => setForm({...form, firstStep: e.target.value})} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Comprometimento (0-10): {form.commitment}</label>
                    <input type="range" min="0" max="10" className="w-full accent-teal-600" value={form.commitment} onChange={e => setForm({...form, commitment: Number(e.target.value)})} />
                </div>
            </div>

            <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700">Criar Objetivo</button>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {goals.map(goal => (
            <Card key={goal.id} className={`transition-all ${goal.status === 'completed' ? 'opacity-75 bg-slate-50' : 'bg-white'}`}>
                <div className="flex justify-between items-start cursor-pointer" onClick={() => setExpandedId(expandedId === goal.id ? null : goal.id)}>
                    <div className="flex items-center gap-3">
                         <button onClick={(e) => { e.stopPropagation(); toggleStatus(goal); }}>
                            <CheckCircle className={`text-2xl ${goal.status === 'completed' ? 'text-teal-500 fill-teal-100' : 'text-slate-300'}`} />
                         </button>
                         <div>
                             <h3 className={`font-bold text-lg ${goal.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-800'}`}>{goal.what}</h3>
                             <p className="text-sm text-slate-500">{goal.when}</p>
                         </div>
                    </div>
                    {expandedId === goal.id ? <ChevronUp className="text-slate-400"/> : <ChevronDown className="text-slate-400"/>}
                </div>
                
                {expandedId === goal.id && (
                    <div className="mt-4 pt-4 border-t border-slate-100 grid md:grid-cols-2 gap-4 text-sm text-slate-600 animate-fade-in">
                        <p><strong>Motivadores:</strong> {goal.motivators}</p>
                        <p><strong>Sabotadores:</strong> {goal.saboteurs}</p>
                        <p className="md:col-span-2"><strong>Primeiro Passo:</strong> {goal.firstStep}</p>
                        <p className="md:col-span-2"><strong>Evidência:</strong> {goal.evidence}</p>
                    </div>
                )}
            </Card>
        ))}
        {goals.length === 0 && !isFormOpen && <p className="text-center text-slate-400 py-8">Você ainda não definiu objetivos.</p>}
      </div>
    </div>
  );
};

export default Goals;
