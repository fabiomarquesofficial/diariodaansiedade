import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SYMPTOMS_LIST, PERIODS } from '../constants';
import Card from '../components/Card';
import { Save, AlertCircle } from 'lucide-react';

const DailyLog = () => {
  const { addAnxietyRecord, anxietyRecords } = useApp();
  const [formData, setFormData] = useState({
    period: 'Manhã',
    intensity: 5,
    triggers: '',
    copingMechanisms: '',
    symptoms: [] as string[]
  });
  const [successMsg, setSuccessMsg] = useState('');

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnxietyRecord({
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      period: formData.period as any,
      symptoms: formData.symptoms,
      triggers: formData.triggers,
      copingMechanisms: formData.copingMechanisms,
      intensity: formData.intensity
    });
    setSuccessMsg('Registro salvo com sucesso!');
    setFormData({
      period: 'Manhã',
      intensity: 5,
      triggers: '',
      copingMechanisms: '',
      symptoms: []
    });
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <AlertCircle className="text-teal-600" />
        Registro de Ansiedade
      </h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Period & Intensity */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Período</label>
                  <select
                    value={formData.period}
                    onChange={e => setFormData({...formData, period: e.target.value})}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:border-teal-500 outline-none"
                  >
                    {PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Intensidade da Ansiedade (0-10)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={formData.intensity}
                      onChange={e => setFormData({...formData, intensity: Number(e.target.value)})}
                      className="w-full accent-teal-600"
                    />
                    <span className="font-bold text-lg text-teal-700 w-6">{formData.intensity}</span>
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Sintomas Físicos e Cognitivos</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SYMPTOMS_LIST.map(symptom => (
                    <label key={symptom} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:bg-slate-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={formData.symptoms.includes(symptom)}
                        onChange={() => handleSymptomToggle(symptom)}
                        className="rounded text-teal-600 focus:ring-teal-500"
                      />
                      {symptom}
                    </label>
                  ))}
                </div>
              </div>

              {/* Triggers & Coping */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Gatilhos (O que desencadeou?)</label>
                  <textarea
                    rows={3}
                    value={formData.triggers}
                    onChange={e => setFormData({...formData, triggers: e.target.value})}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:border-teal-500 outline-none"
                    placeholder="Ex: Reunião de trabalho, notícia ruim, pensamento intrusivo..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Estratégias de Enfrentamento Usadas</label>
                  <textarea
                    rows={2}
                    value={formData.copingMechanisms}
                    onChange={e => setFormData({...formData, copingMechanisms: e.target.value})}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:border-teal-500 outline-none"
                    placeholder="Ex: Respiração diafragmática, liguei para um amigo..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                {successMsg && <span className="text-green-600 text-sm font-medium animate-pulse">{successMsg}</span>}
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ml-auto"
                >
                  <Save size={18} />
                  Salvar Registro
                </button>
              </div>

            </form>
          </Card>
        </div>

        {/* History Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-700">Registros Recentes</h3>
          {anxietyRecords.length === 0 ? (
            <p className="text-slate-400 text-sm">Nenhum registro encontrado.</p>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {anxietyRecords.map(rec => (
                <div key={rec.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-teal-700">{rec.period}</span>
                    <span className="text-xs text-slate-400">{new Date(rec.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-slate-500">Nível:</span>
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{width: `${rec.intensity * 10}%`}}></div>
                    </div>
                    <span className="font-bold">{rec.intensity}</span>
                  </div>
                  {rec.triggers && <p className="text-slate-600 mb-1"><span className="font-semibold">Gatilho:</span> {rec.triggers}</p>}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {rec.symptoms.slice(0, 3).map(s => (
                      <span key={s} className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-xs">{s}</span>
                    ))}
                    {rec.symptoms.length > 3 && <span className="text-xs text-slate-400">+{rec.symptoms.length - 3}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyLog;
