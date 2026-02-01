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
  const [jobUrl, setJobUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isProcessingReal, setIsProcessingReal] = useState(false);

  const steps = [
    "Acessando link da vaga...",
    "Extraindo requisitos do cargo...",
    "Digitalizando seu currículo...",
    "IA comparando perfil vs vaga...",
    "Calculando Score de Match..."
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/?page=login';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo de currículo (PDF).");
      return;
    }
    if (credits <= 0) {
      alert("Créditos insuficientes.");
      return;
    }
    
    setIsUploading(true);
    setUploadStep(0);

    const interval = setInterval(() => {
      setUploadStep(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          return 4;
        }
        return prev + 1;
      });
    }, 1500);

    setTimeout(() => {
      setAnalysisResult({
        score: jobUrl ? 68 : 72, // Mais rígido
        matchLevel: jobUrl ? 'Abaixo do Esperado' : 'Atenção Necessária',
        analysisDate: new Date().toLocaleDateString(),
        jobAnalyzed: jobUrl || 'Análise de Perfil Geral',
        metrics: [
          { label: 'Experiência Profissional', value: 65, color: '#F59E0B' },
          { label: 'Habilidades Técnicas', value: 78, color: '#3B82F6' },
          { label: 'Formação Acadêmica', value: 90, color: '#10B981' },
          { label: 'Soft Skills (IA)', value: 55, color: '#EF4444' },
          { label: 'Otimização ATS', value: 70, color: '#6366F1' }
        ],
        dataPoints: [
          { name: 'Exp', value: 65 },
          { name: 'Tec', value: 78 },
          { name: 'Acad', value: 90 },
          { name: 'Soft', value: 55 },
          { name: 'ATS', value: 70 }
        ],
        criticalAlerts: [
          "Falta de evidências quantitativas (números/resultados) nas últimas experiências.",
          "O currículo não possui as palavras-chave obrigatórias para o nível Senior.",
          "Layout com colunas duplas detectado: isso prejudica a leitura de 40% dos sistemas ATS."
        ],
        strengths: [
          "Histórico de estabilidade nas empresas anteriores",
          "Formação em instituição de alto nível",
        ],
        improvements: [
          "Reescrever o resumo focando em problemas resolvidos, não apenas tarefas.",
          "Converter o arquivo para layout de coluna única.",
          "Incluir certificações Cloud (AWS/Azure) para aumentar competitividade."
        ],
        skillsMatched: ["React", "TypeScript", "Node.js"],
        missingKeywords: jobUrl ? ["Docker", "Kubernetes", "Microservices", "Jest", "CI/CD"] : ["Cloud Computing", "Agile Methodologies"]
      });
      setIsUploading(false);
      setCredits(prev => prev - 1);
      setFile(null);
      setJobUrl('');
    }, 7500);
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
                      Cole o link da vaga e suba seu currículo para uma análise de match personalizada.
                    </p>
                  </div>
                  
                  <div className="w-full max-w-2xl space-y-6">
                    {/* Input do Link da Vaga */}
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Link da Vaga (Opcional)</label>
                      <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-aprovex-blue transition-colors" />
                        <input 
                          type="url" 
                          placeholder="https://www.linkedin.com/jobs/view/..."
                          className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-aprovex-blue outline-none font-medium text-sm transition-all placeholder:text-slate-300"
                          value={jobUrl}
                          onChange={(e) => setJobUrl(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Dropzone Elegante */}
                    <div 
                      className={`w-full bg-white border-2 border-dashed rounded-[40px] p-12 flex flex-col items-center justify-center transition-all duration-500 relative overflow-hidden ${isUploading ? 'border-aprovex-blue ring-8 ring-blue-50 animate-pulse' : 'border-slate-100'}`}
                    >
                      {!isUploading ? (
                        <>
                          <input 
                            type="file" 
                            id="cv-upload" 
                            className="hidden" 
                            accept=".pdf" 
                            onChange={handleFileChange} 
                          />
                          <label 
                            htmlFor="cv-upload"
                            className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 cursor-pointer hover:scale-110 transition-all duration-500 hover:bg-aprovex-blue group"
                          >
                            <Upload className="w-8 h-8 text-aprovex-blue group-hover:text-white transition-colors" />
                          </label>
                          
                          {file ? (
                            <div className="text-center animate-fade-in">
                              <p className="text-lg font-black text-slate-800 tracking-tight">{file.name}</p>
                              <button onClick={() => setFile(null)} className="text-[10px] font-black text-red-400 uppercase tracking-widest mt-2 hover:text-red-500">Remover arquivo</button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <h3 className="text-xl font-black text-slate-800 tracking-tight mb-1">Selecione seu Currículo</h3>
                              <p className="text-slate-400 text-sm font-medium">Clique no ícone acima para subir seu PDF</p>
                            </div>
                          )}

                          {file && (
                            <button 
                              onClick={startAnalysis}
                              className="mt-8 px-10 py-5 bg-aprovex-blue text-white rounded-2xl font-black text-sm uppercase tracking-[0.15em] shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-3 active:scale-95"
                            >
                              Iniciar Análise Profissional
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          )}
                          
                          <div className="mt-8 flex gap-6 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> 100% Seguro</span>
                            <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> Foco em Aprovação</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center py-10">
                          <div className="w-20 h-20 relative flex items-center justify-center mb-8">
                            <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-aprovex-blue border-t-transparent rounded-full animate-spin"></div>
                            <Sparkles className="w-8 h-8 text-aprovex-blue" />
                          </div>
                          <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-4 animate-pulse text-center">
                            {steps[uploadStep]}
                          </h3>
                          <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-aprovex-blue transition-all duration-500 ease-out" 
                              style={{ width: `${(uploadStep + 1) * 20}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in-up pb-20">
                  {/* Header de BI */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-slate-100">
                    <div>
                      <button onClick={() => setAnalysisResult(null)} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-aprovex-blue transition-colors mb-3 group">
                        <ChevronRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" /> Nova Análise de Dados
                      </button>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-2">Relatório Executivo <span className="text-aprovex-blue">#ATS-2026</span></h2>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                        <Clock className="w-3.5 h-3.5" /> Gerado em {analysisResult.analysisDate}
                        <span className="mx-2 text-slate-200">|</span>
                        <Target className="w-3.5 h-3.5 text-aprovex-blue" /> Target: <span className="text-slate-600">{analysisResult.jobAnalyzed}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
                      <button className="px-5 py-2.5 bg-white text-slate-800 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all">Exportar BI</button>
                      <button className="px-5 py-2.5 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-widest hover:text-slate-800 transition-all">Imprimir</button>
                    </div>
                  </div>

                  {/* Grid de Dashboards */}
                  <div className="grid lg:grid-cols-12 gap-6">
                    
                    {/* Indicador Principal (Gauge) */}
                    <div className="lg:col-span-4 bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Score Global de Match</p>
                      <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="96" cy="96" r="88" stroke="#F1F5F9" strokeWidth="16" fill="transparent" />
                          <circle 
                            cx="96" cy="96" r="88" 
                            stroke={analysisResult.score > 70 ? '#10B981' : '#F59E0B'} 
                            strokeWidth="16" 
                            fill="transparent" 
                            strokeDasharray={552} 
                            strokeDashoffset={552 - (552 * analysisResult.score) / 100} 
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out" 
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-6xl font-black text-slate-900 tracking-tighter">{analysisResult.score}</span>
                          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Pontos</span>
                        </div>
                      </div>
                      <div className={`mt-8 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${analysisResult.score > 70 ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                        {analysisResult.matchLevel}
                      </div>
                    </div>

                    {/* Breakdown de Métricas (Barras de BI) */}
                    <div className="lg:col-span-8 bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-aprovex-blue" /> Decomposição por Indicadores
                      </h4>
                      <div className="space-y-7">
                        {analysisResult.metrics.map((m: any, i: number) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between items-end">
                              <span className="text-sm font-bold text-slate-700">{m.label}</span>
                              <span className="text-xs font-black text-slate-900">{m.value}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                              <div 
                                className="h-full rounded-full transition-all duration-1000 ease-out delay-300" 
                                style={{ width: `${m.value}%`, backgroundColor: m.color }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alertas Críticos (Rigidez na Avaliação) */}
                    <div className="lg:col-span-12 bg-red-50/50 p-8 rounded-[32px] border border-red-100">
                      <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Alertas Críticos de IA (Impedimentos de Aprovação)
                      </h4>
                      <div className="grid md:grid-cols-3 gap-6">
                        {analysisResult.criticalAlerts.map((alert: string, i: number) => (
                          <div key={i} className="bg-white p-5 rounded-2xl border border-red-100/50 flex gap-3 shadow-sm">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0 animate-pulse" />
                            <p className="text-[12px] font-bold text-slate-700 leading-snug">{alert}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Coluna Detalhada de Tags */}
                    <div className="lg:col-span-6 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Mapeamento de Competências</h4>
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-green-500 uppercase mb-3">Encontradas no Perfil</p>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.skillsMatched.map((s: any) => (
                              <span key={s} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-100">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-50">
                          <p className="text-[10px] font-black text-red-400 uppercase mb-3">Ausentes (Gap de Requisito)</p>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.missingKeywords.map((s: any) => (
                              <span key={s} className="px-3 py-1.5 bg-red-50 text-red-400 rounded-lg text-xs font-bold border border-red-50">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Plano de Ação Prático */}
                    <div className="lg:col-span-6 bg-slate-900 p-8 rounded-[32px] text-white overflow-hidden relative">
                      <Sparkles className="absolute top-[-20px] right-[-20px] w-32 h-32 text-white/[0.03]" />
                      <h4 className="text-[10px] font-black text-aprovex-blue uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Plano de Ação Corretiva
                      </h4>
                      <div className="space-y-4">
                        {analysisResult.improvements.map((item: string, i: number) => (
                          <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default">
                            <div className="w-6 h-6 rounded-lg bg-aprovex-blue text-white flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</div>
                            <p className="text-sm font-medium text-slate-300 leading-snug">{item}</p>
                          </div>
                        ))}
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
