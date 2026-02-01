import React, { useState, useEffect } from 'react';
import { 
  Layout, FileText, BarChart3, History, LogOut, Upload, 
  CheckCircle2, AlertCircle, Zap, Search, Target, 
  ArrowRight, Sparkles, ChevronRight, ShieldCheck,
  Trophy, Clock, Filter
} from 'lucide-react';
import Logo from '../components/Logo';
import { supabase } from '../lib/supabaseClient';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analyze');
  const [credits, setCredits] = useState(5);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const steps = [
    "Digitalizando documento...",
    "Extraindo dados com OCR...",
    "IA analisando palavras-chave...",
    "Calculando Score ATS..."
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/?page=login';
  };

  const simulateUpload = () => {
    if (credits <= 0) return;
    
    setIsUploading(true);
    setUploadStep(0);

    // Efeito de progresso realístico
    const interval = setInterval(() => {
      setUploadStep(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          return 3;
        }
        return prev + 1;
      });
    }, 1200);

    setTimeout(() => {
      setAnalysisResult({
        score: 88,
        matchLevel: 'Excelente',
        analysisDate: new Date().toLocaleDateString(),
        strengths: [
          "Estrutura otimizada para leitura de máquinas (ATS)",
          "Uso estratégico de verbos de ação",
          "Seção de habilidades bem categorizada"
        ],
        improvements: [
          "Adicionar resultados quantitativos nas experiências recentes",
          "Incluir certificações específicas da área de tecnologia",
          "Otimizar o resumo profissional para a vaga de Desenvolvedor"
        ],
        skillsMatched: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Git"],
        missingKeywords: ["Docker", "AWS", "CI/CD"]
      });
      setIsUploading(false);
      setCredits(prev => prev - 1);
    }, 5500);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex font-sans selection:bg-aprovex-blue/10 selection:text-aprovex-blue">
      {/* Sidebar Premium */}
      <aside className="w-[280px] bg-[#0F172A] text-white flex flex-col hidden lg:flex sticky top-0 h-screen border-r border-white/5">
        <div className="p-10">
          <Logo />
        </div>
        
        <nav className="flex-grow px-6 space-y-1.5 mt-2">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-4">Menu Principal</p>
          <button 
            onClick={() => setActiveTab('analyze')}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === 'analyze' ? 'bg-aprovex-blue text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Zap className={`w-5 h-5 ${activeTab === 'analyze' ? 'animate-pulse' : ''}`} /> Analisar Currículo
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === 'history' ? 'bg-aprovex-blue text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <History className="w-5 h-5" /> Histórico de Análises
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-bold text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Trophy className="w-5 h-5" /> Rankings & Vagas
          </button>
        </nav>

        <div className="p-6">
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Seu Plano</span>
              <span className="bg-aprovex-blue/20 text-aprovex-blue px-2 py-0.5 rounded-md text-[9px] font-black uppercase">Premium</span>
            </div>
            <p className="text-sm font-bold text-white mb-4">5 Créditos restantes</p>
            <button className="w-full bg-white text-slate-900 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Recarregar</button>
          </div>
          
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-4 mt-4 text-slate-500 font-bold text-sm hover:text-red-400 transition-all">
            <LogOut className="w-5 h-5" /> Sair da conta
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Navbar Superior */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 shrink-0 z-30">
          <div className="lg:hidden"><Logo /></div>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-tight leading-none mb-1">Deivid Ribeiro</span>
              <span className="text-[10px] font-bold text-slate-400">ID: #002544</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-500 text-sm">
              DR
            </div>
          </div>
        </header>

        {/* Dashboard Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-12 lg:p-16">
          {activeTab === 'analyze' && (
            <div className="max-w-5xl mx-auto animate-fade-in">
              {!analysisResult ? (
                <div className="flex flex-col items-center">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-aprovex-blue rounded-full mb-4 border border-blue-100">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-black uppercase tracking-[0.15em]">IA de Alta Performance</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-4 leading-none">
                      Otimize sua <span className="text-aprovex-blue">Carreira</span>
                    </h2>
                    <p className="text-slate-400 font-medium text-lg max-w-lg mx-auto leading-relaxed">
                      Nossa IA analisa seu currículo conforme os critérios dos recrutadores reais.
                    </p>
                  </div>
                  
                  {/* Dropzone Elegante */}
                  <div 
                    onClick={simulateUpload}
                    className={`w-full max-w-2xl bg-white border-2 border-dashed rounded-[40px] p-12 md:p-20 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer group relative overflow-hidden ${isUploading ? 'border-aprovex-blue ring-8 ring-blue-50 animate-pulse' : 'border-slate-100 hover:border-aprovex-blue/40 hover:bg-slate-50/30'}`}
                  >
                    {!isUploading ? (
                      <>
                        <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 group-hover:bg-aprovex-blue group-hover:rotate-6">
                          <Upload className="w-10 h-10 text-aprovex-blue group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Selecione seu Currículo</h3>
                        <p className="text-slate-400 font-medium text-center">Arraste seu arquivo PDF aqui ou <span className="text-aprovex-blue underline font-bold">clique para buscar</span>.</p>
                        <div className="mt-8 flex gap-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> 100% Seguro</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Análise Instantânea</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 relative flex items-center justify-center mb-8">
                          <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-aprovex-blue border-t-transparent rounded-full animate-spin"></div>
                          <Sparkles className="w-8 h-8 text-aprovex-blue" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-4 animate-pulse">
                          {steps[uploadStep]}
                        </h3>
                        <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-aprovex-blue transition-all duration-500 ease-out" 
                            style={{ width: `${(uploadStep + 1) * 25}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in-up">
                  {/* Cabeçalho de Resultado */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                      <button onClick={() => setAnalysisResult(null)} className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-aprovex-blue transition-colors mb-4 group">
                        <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Voltar para o Início
                      </button>
                      <h2 className="text-4xl font-black text-slate-800 tracking-tighter leading-none mb-2">Relatório de <span className="text-aprovex-blue">Performance</span></h2>
                      <p className="text-slate-400 font-medium italic">Análise gerada em {analysisResult.analysisDate}</p>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all">Baixar PDF</button>
                      <button className="px-6 py-4 bg-aprovex-blue text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">Compartilhar</button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-8">
                    {/* Coluna Esquerda: Score */}
                    <div className="lg:col-span-4 space-y-8">
                      <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center">
                        <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * analysisResult.score) / 100} className="text-aprovex-blue transition-all duration-1000 ease-out" />
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-6xl font-black text-slate-800 tracking-tighter">{analysisResult.score}</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score ATS</span>
                          </div>
                        </div>
                        <div className="px-6 py-2 bg-blue-50 text-aprovex-blue rounded-full text-[11px] font-black uppercase tracking-widest border border-blue-100">
                          {analysisResult.matchLevel}
                        </div>
                      </div>

                      <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative">
                        <Sparkles className="absolute top-[-20px] right-[-20px] w-24 h-24 text-white/5" />
                        <h4 className="text-lg font-black uppercase tracking-tighter mb-4 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-aprovex-blue" /> IA Insight
                        </h4>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">Seu currículo está acima da média de 85% dos candidatos para esta vaga. Para atingir nota máxima, foque nas palavras-chave faltantes.</p>
                      </div>
                    </div>

                    {/* Coluna Direita: Detalhes */}
                    <div className="lg:col-span-8 space-y-8">
                      {/* Pontos Positivos */}
                      <div className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-aprovex-green" /> O que você acertou
                        </h4>
                        <div className="space-y-4">
                          {analysisResult.strengths.map((s: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-50 group hover:border-slate-100 transition-all">
                              <span className="w-6 h-6 rounded-lg bg-green-50 text-aprovex-green flex items-center justify-center text-xs font-bold mt-0.5">{i+1}</span>
                              <p className="text-slate-600 font-bold text-sm leading-snug">{s}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pontos de Melhoria */}
                      <div className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                          <Filter className="w-4 h-4 text-aprovex-blue" /> Pontos de Melhoria
                        </h4>
                        <div className="space-y-4">
                          {analysisResult.improvements.map((s: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 group hover:border-aprovex-blue/10 transition-all">
                              <span className="w-6 h-6 rounded-lg bg-blue-50 text-aprovex-blue flex items-center justify-center text-xs font-bold mt-0.5">
                                <ChevronRight className="w-4 h-4" />
                              </span>
                              <p className="text-slate-600 font-bold text-sm leading-snug">{s}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Palavras-chave */}
                      <div className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Palavras-chave Encontradas</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.skillsMatched.map((skill: string) => (
                            <span key={skill} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100">{skill}</span>
                          ))}
                          {analysisResult.missingKeywords.map((skill: string) => (
                            <span key={skill} className="px-4 py-2 bg-red-50 text-red-400 rounded-xl text-xs font-bold border border-red-50/50 flex items-center gap-1.5">
                              <AlertCircle className="w-3 h-3" /> {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="max-w-5xl mx-auto animate-fade-in">
              <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-12">Histórico de <span className="text-aprovex-blue">Análises</span></h2>
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <History className="w-8 h-8 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Nada por aqui ainda</h3>
                <p className="text-slate-400 text-sm max-w-xs font-medium">Suas análises aparecerão aqui assim que você processar seu primeiro documento.</p>
                <button 
                  onClick={() => setActiveTab('analyze')}
                  className="mt-8 px-8 py-4 bg-aprovex-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
                >
                  Fazer primeira análise
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
