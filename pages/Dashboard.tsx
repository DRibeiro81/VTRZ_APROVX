import React, { useState } from 'react';
import { Layout, FileText, BarChart3, History, LogOut, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analyze');
  const [credits, setCredits] = useState(5); // Simulação vinda do Supabase
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleLogout = () => {
    window.location.href = '/';
  };

  const simulateUpload = () => {
    if (credits <= 0) {
      alert("Você não possui créditos suficientes.");
      return;
    }
    setIsUploading(true);
    // Simulação de análise por IA
    setTimeout(() => {
      setAnalysisResult({
        score: 85,
        status: 'Aprovado no Filtro ATS',
        feedback: [
          "Palavras-chave detectadas com sucesso.",
          "Estrutura de cabeçalho correta.",
          "Falta detalhar conquistas quantitativas na seção de experiência."
        ],
        charts: {
          relevance: 90,
          formatting: 80,
          keywords: 85
        }
      });
      setIsUploading(false);
      setCredits(credits - 1);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-aprovex-graphite text-white flex flex-col hidden md:flex">
        <div className="p-8 border-b border-white/10">
          <Logo />
        </div>
        <nav className="flex-grow p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('analyze')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'analyze' ? 'bg-aprovex-blue text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <FileText className="w-5 h-5" /> Analisar CV
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'history' ? 'bg-aprovex-blue text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <History className="w-5 h-5" /> Minhas Análises
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 font-bold hover:text-red-400 transition-all">
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <div className="md:hidden"><Logo /></div>
          <div className="flex items-center gap-6 ml-auto">
            <div className="bg-blue-50 px-4 py-2 rounded-full border border-blue-100 flex items-center gap-2">
              <span className="text-[10px] font-black text-aprovex-blue uppercase tracking-widest">Saldo de Créditos</span>
              <span className="bg-aprovex-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">{credits}</span>
            </div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-8">
          {activeTab === 'analyze' && (
            <div className="max-w-4xl mx-auto">
              {!analysisResult ? (
                <div className="text-center py-12">
                  <h2 className="text-3xl font-black text-aprovex-graphite uppercase tracking-tighter mb-4">Nova Análise</h2>
                  <p className="text-slate-500 mb-12 font-medium">Suba seu currículo em PDF para que nossa IA faça a triagem.</p>
                  
                  <div className="bg-white border-4 border-dashed border-slate-100 rounded-[40px] p-16 flex flex-col items-center justify-center hover:border-aprovex-blue/30 transition-all group cursor-pointer" onClick={simulateUpload}>
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {isUploading ? <div className="w-10 h-10 border-4 border-aprovex-blue border-t-transparent rounded-full animate-spin"></div> : <Upload className="w-10 h-10 text-aprovex-blue" />}
                    </div>
                    <span className="text-xl font-black text-aprovex-graphite uppercase tracking-tighter">
                      {isUploading ? 'Analisando seu currículo...' : 'Clique para selecionar seu PDF'}
                    </span>
                    <p className="text-slate-400 mt-2 font-medium italic">Formatos aceitos: PDF (Máx 5MB)</p>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in-up">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black text-aprovex-graphite uppercase tracking-tighter">Resultado da Análise</h2>
                    <button onClick={() => setAnalysisResult(null)} className="text-aprovex-blue font-black text-sm uppercase">Nova Análise</button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center">
                      <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * analysisResult.score) / 100} className="text-aprovex-green" />
                        </svg>
                        <span className="absolute text-3xl font-black text-aprovex-graphite">{analysisResult.score}%</span>
                      </div>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Score de Aprovação</span>
                    </div>

                    <div className="md:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <CheckCircle2 className="w-6 h-6 text-aprovex-green" />
                        <h4 className="text-xl font-black text-aprovex-graphite uppercase tracking-tighter">{analysisResult.status}</h4>
                      </div>
                      <ul className="space-y-3">
                        {analysisResult.feedback.map((f: string, i: number) => (
                          <li key={i} className="flex gap-3 text-slate-600 text-sm font-medium">
                            <span className="w-1.5 h-1.5 bg-aprovex-blue rounded-full mt-1.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-aprovex-graphite p-8 rounded-[32px] text-white">
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-aprovex-blue" /> Plano de Melhoria
                    </h4>
                    <p className="text-slate-400 mb-0 font-medium">Nossa IA identificou que seu currículo está excelente, mas pode performar 15% melhor se você utilizar verbos de ação mais fortes na seção de experiências passadas.</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-black text-aprovex-graphite uppercase tracking-tighter mb-8">Histórico de Análises</h2>
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden text-center py-20">
                <History className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Nenhum histórico encontrado.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
