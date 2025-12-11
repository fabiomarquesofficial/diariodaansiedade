import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Brain, UserCheck, ShieldAlert } from 'lucide-react';
import Card from '../components/Card';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-extrabold text-teal-700">Bem-vindo ao Planner Ansiedade</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Um espaço seguro para você entender suas emoções, organizar sua rotina e cultivar o autocuidado.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <Activity size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Ansiedade: Normal vs. Problema</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                A ansiedade é uma emoção natural de proteção. Ela vira um problema quando é excessiva, prolongada e interfere no seu dia a dia, trabalho ou relacionamentos.
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-white border-teal-100">
          <div className="flex items-start gap-4">
            <div className="bg-teal-100 p-3 rounded-full text-teal-600">
              <Brain size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-teal-900 mb-2">Fique Atento aos Sintomas</h3>
              <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                <li><span className="font-semibold">Físicos:</span> Taquicardia, tensão, insônia.</li>
                <li><span className="font-semibold">Cognitivos:</span> Preocupação excessiva, medo.</li>
                <li><span className="font-semibold">Comportamentais:</span> Evitação, inquietação.</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Contexto Brasileiro">
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ShieldAlert size={48} className="text-amber-500" />
          </div>
          <div className="flex-1">
             <p className="text-slate-700 mb-4">
               O Brasil é um dos países com maiores índices de transtornos de ansiedade no mundo. Você não está sozinho(a) nessa jornada. O autocuidado diário e o tratamento profissional são chaves para o bem-estar.
             </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-center pt-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="group flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-lg font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Começar a usar
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
