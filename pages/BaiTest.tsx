import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BAI_QUESTIONS } from '../constants';
import Card from '../components/Card';
import { ClipboardCheck, RotateCcw } from 'lucide-react';

const BaiTest = () => {
  const { addBaiRecord, baiRecords } = useApp();
  const [answers, setAnswers] = useState<number[]>(new Array(BAI_QUESTIONS.length).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  const handleAnswer = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    if (answers.includes(-1)) {
      alert("Por favor, responda todas as perguntas.");
      return;
    }
    const total = answers.reduce((a, b) => a + b, 0);
    setCurrentScore(total);
    
    let level: 'Baixo' | 'Moderado' | 'Elevado' = 'Baixo';
    if (total >= 22 && total <= 35) level = 'Moderado';
    if (total >= 36) level = 'Elevado';

    addBaiRecord({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      score: total,
      level,
      answers
    });
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetTest = () => {
    setAnswers(new Array(BAI_QUESTIONS.length).fill(-1));
    setShowResult(false);
    setCurrentScore(0);
  };

  const options = [
    { val: 0, label: "Nem um pouco" },
    { val: 1, label: "Pouco" },
    { val: 2, label: "Moderado" },
    { val: 3, label: "Muito" },
  ];

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <Card className="text-center py-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Resultado</h2>
          <div className="text-6xl font-extrabold text-teal-600 mb-4">{currentScore}</div>
          <div className="inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-lg mb-6">
            Nível: {currentScore <= 21 ? 'Baixo' : currentScore <= 35 ? 'Moderado' : 'Elevado'}
          </div>
          
          <div className="text-left bg-blue-50 p-6 rounded-xl text-slate-700 space-y-2 mb-8 mx-4">
            <h4 className="font-bold text-blue-900">Interpretação:</h4>
            {currentScore <= 21 && <p><strong>Até 21 pontos:</strong> Pode se considerar um nível baixo de ansiedade. Ansiedade é uma emoção natural quando não excessiva.</p>}
            {currentScore >= 22 && currentScore <= 35 && <p><strong>22 a 35 pontos:</strong> Nível moderado. Monitore como os sintomas interferem na sua vida. Considere práticas de autocuidado reforçadas.</p>}
            {currentScore >= 36 && <p><strong>36 ou mais:</strong> Nível elevado. Sugere-se fortemente buscar avaliação profissional (psicólogo ou psiquiatra) para suporte adequado.</p>}
          </div>

          <button
            onClick={resetTest}
            className="flex items-center gap-2 mx-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
          >
            <RotateCcw size={20} /> Refazer Teste
          </button>
        </Card>

        {/* Previous History */}
        <div className="mt-8">
            <h3 className="text-lg font-bold text-slate-700 mb-4">Histórico</h3>
            <div className="space-y-2">
                {baiRecords.slice(0, 5).map(rec => (
                    <div key={rec.id} className="bg-white p-3 rounded flex justify-between items-center border border-slate-100">
                        <span className="text-slate-500">{new Date(rec.date).toLocaleDateString()}</span>
                        <span className={`font-bold px-2 py-0.5 rounded text-sm ${
                            rec.score <= 21 ? 'bg-green-100 text-green-700' :
                            rec.score <= 35 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {rec.score} - {rec.level}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <ClipboardCheck className="text-teal-600"/> Inventário de Ansiedade de Beck
        </h2>
        <p className="text-slate-600">
          Abaixo está uma lista de sintomas comuns de ansiedade. Por favor, leia cada item cuidadosamente e indique quanto você tem sido incomodado por cada sintoma <strong>durante a última semana, incluindo hoje</strong>.
        </p>
      </div>

      <div className="space-y-4">
        {BAI_QUESTIONS.map((question, index) => (
          <Card key={index} className="transition-shadow hover:shadow-md">
            <h4 className="font-semibold text-lg text-slate-800 mb-3">
              {index + 1}. {question}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {options.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleAnswer(index, opt.val)}
                  className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                    answers[index] === opt.val
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md transform scale-105'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-4 pb-12">
        <button
          onClick={calculateResult}
          className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-3 rounded-full font-bold shadow-lg transition-all"
        >
          Calcular Resultado
        </button>
      </div>
    </div>
  );
};

export default BaiTest;
