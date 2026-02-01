import React, { useState, useEffect } from 'react';
import { 
  Layout, FileText, BarChart3, History, LogOut, Upload, 
  CheckCircle2, AlertCircle, Zap, Search, Target, 
  ArrowRight, Sparkles, ChevronRight, ShieldCheck,
  Trophy, Clock, Filter, ThumbsUp, ThumbsDown
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

  const steps = [
    "Processando dados...",
    "Extraindo requisitos...",
    "IA comparando perfil...",
    "Gerando indicadores..."
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
    if (!file) return;
    setIsUploading(true);
    setUploadStep(0);

    const interval = setInterval(() => {
      setUploadStep(prev => (prev >= 3 ? 3 : prev + 1));
    }, 1200);

    setTimeout(() => {
      setAnalysisResult({
        score: jobUrl ? 54 : 62,
        matchLevel: 'REPROVADO POR DADOS INSUFICIENTES',
        jobTitle: jobUrl ? 'Desenvolvedor Full Stack Sênior' : 'Avaliação de Perfil Geral',
        analysisDate: new Date().toLocaleDateString(),
        metrics: [
          { label: 'Experiência', value: 45, color: '#EF4444' },
          { label: 'Conhecimento', value: 55, color: '#F59E0B' },
          { label: 'Idiomas', value: 30, color: '#EF4444' },
          { label: 'Formação', value: 90, color: '#10B981' },
          { label: 'Projetos', value: 20, color: '#EF4444' }
        ],
        strengths: [
          "Documento formatado em PDF e legível por software.",
          "Dados de contato e LinkedIn presentes e bem localizados.",
          "Formação acadêmica em instituição reconhecida."
        ],
        weaknesses: [
          "DÉFICIT DE EXPERIÊNCIA: Falta de descrição orientada a resultados reais.",
          "GAP DE CONHECIMENTO: Ausência de termos técnicos vitais para a vaga pretendida.",
          "IDIOMAS: Nível não especificado ou abaixo do requerido para ambiente global."
        ],
        actionPlan: [
          "Quantificar experiências: 'Melhorei performance em X%' em vez de 'Fiz X'.",
          "Adicionar certificações de proficiência em idiomas (Inglês/Espanhol).",
          "Inserir seção de Projetos Práticos com evidência técnica (GitHub/Portfólio)."
        ]
      });
      setIsUploading(false);
      setCredits(prev => prev - 1);
      clearInterval(interval);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex font-sans">
      <aside className="w-[260px] bg-[#0F172A] text-white flex flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="p-8"><Logo /></div>
        <nav className="flex-grow px-4 space-y-1 mt-4">
          <button onClick={() => setActiveTab('analyze')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${activeTab === 'analyze' ? 'bg-aprovex-blue text-white' : 'text-slate-400 hover:bg-white/5'}`}><Zap className="w-4 h-4" /> Analisar</button>
          <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${activeTab === 'history' ? 'bg-aprovex-blue text-white' : 'text-slate-400 hover:bg-white/5'}`}><History className="w-4 h-4" /> Histórico</button>
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Saldo</p>
            <p className="text-lg font-black text-white">{credits} Créditos</p>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 font-bold text-sm hover:text-red-400 transition-all"><LogOut className="w-4 h-4" /> Sair</button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 shrink-0 z-30">
          <div className="lg:hidden"><Logo /></div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-800 uppercase leading-none">Deivid Ribeiro</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Premium Account</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-black text-slate-500 text-xs">DR</div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-6 lg:p-10">
          {activeTab === 'analyze' && (
            <div className="max-w-4xl mx-auto">
              {!analysisResult ? (
                <div className="flex flex-col items-center">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2 italic">Aprovação em <span className="text-aprovex-blue underline">Alta Performance</span></h2>
                    <p className="text-slate-400 font-medium text-sm">IA treinada em processos seletivos de elite.</p>
                  </div>
                  
                  <div className="w-full max-w-xl space-y-4">
                    <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Link da Vaga / Empresa</label>
                      <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-aprovex-blue" />
                        <input type="url" placeholder="https://..." className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-aprovex-blue outline-none text-xs font-bold" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} />
                      </div>
                    </div>

                    <div className={`w-full bg-white border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center transition-all ${isUploading ? 'border-aprovex-blue animate-pulse' : 'border-slate-100'}`}>
                      {!isUploading ? (
                        <>
                          <input type="file" id="cv-upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
                          <label htmlFor="cv-upload" className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 cursor-pointer hover:bg-aprovex-blue group transition-all"><Upload className="w-6 h-6 text-aprovex-blue group-hover:text-white" /></label>
                          {file ? (
                            <div className="text-center">
                              <p className="text-sm font-black text-slate-800">{file.name}</p>
                              <button onClick={startAnalysis} className="mt-6 px-8 py-3.5 bg-aprovex-blue text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95">Analisar Agora</button>
                            </div>
                          ) : (
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">Selecione seu currículo PDF</p>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center py-4">
                          <div className="w-12 h-12 border-4 border-aprovex-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                          <p className="text-xs font-black text-slate-800 uppercase tracking-widest animate-pulse">{steps[uploadStep]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in-up space-y-6">
                  {/* Compact Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <button onClick={() => setAnalysisResult(null)} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-aprovex-blue flex items-center gap-1 mb-2 transition-all group"><ChevronRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1" /> Voltar</button>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-1">Relatório #<span className="text-aprovex-blue">BI-2026</span></h2>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <span className="bg-slate-900 text-white px-2 py-0.5 rounded flex items-center gap-1.5"><Target className="w-3 h-3 text-aprovex-blue" /> Vaga: {analysisResult.jobTitle}</span>
                        <span>{analysisResult.analysisDate}</span>
                      </div>
                    </div>
                    <button className="px-5 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/10 hover:bg-aprovex-blue transition-all">Exportar PDF</button>
                  </div>

                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Score Gauge - Mais BI */}
                    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                      <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="72" cy="72" r="64" stroke="#F1F5F9" strokeWidth="12" fill="transparent" />
                          <circle cx="72" cy="72" r="64" stroke={analysisResult.score > 70 ? '#10B981' : '#EF4444'} strokeWidth="12" fill="transparent" strokeDasharray={402} strokeDashoffset={402 - (402 * analysisResult.score) / 100} strokeLinecap="round" className="transition-all duration-1000" />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-4xl font-black text-slate-900 tracking-tighter">{analysisResult.score}</span>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Score Geral</p>
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${analysisResult.score > 70 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{analysisResult.matchLevel}</span>
                    </div>

                    {/* BI Indicators - Vertical & Precise */}
                    <div className="lg:col-span-3 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                        {analysisResult.metrics.map((m: any, i: number) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between items-end">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
                              <span className="text-[11px] font-black text-slate-900">{m.value}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                              <div className="h-full transition-all duration-1000" style={{ width: `${m.value}%`, backgroundColor: m.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BI Columns: Strengths vs Weaknesses */}
                    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden flex flex-col">
                      <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                        <ThumbsUp className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Pontos de Destaque</span>
                      </div>
                      <div className="p-5 flex-grow">
                        <ul className="space-y-4">
                          {analysisResult.strengths.map((s: string, i: number) => (
                            <li key={i} className="text-[11px] font-medium text-slate-600 leading-snug flex gap-3">
                              <span className="text-green-400 font-black tracking-tighter">OK</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden flex flex-col">
                      <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                        <ThumbsDown className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Gargalos Críticos</span>
                      </div>
                      <div className="p-5 flex-grow">
                        <ul className="space-y-4">
                          {analysisResult.weaknesses.map((s: string, i: number) => (
                            <li key={i} className="text-[11px] font-bold text-slate-700 leading-snug flex gap-3">
                              <span className="text-red-500 font-black tracking-tighter">!!</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Plan BI Bar */}
                    <div className="lg:col-span-4 bg-[#0F172A] p-6 rounded-[24px] flex items-center justify-between group overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                        <BarChart3 className="w-32 h-32 text-white" />
                      </div>
                      <div className="relative z-10 w-full">
                        <p className="text-[9px] font-black text-aprovex-blue uppercase tracking-[0.3em] mb-4">Estratégia de Correção (Action Plan)</p>
                        <div className="grid md:grid-cols-3 gap-6">
                          {analysisResult.actionPlan.map((p: string, i: number) => (
                            <div key={i} className="flex flex-col gap-2">
                              <span className="text-[10px] font-black text-slate-500">PASSO 0{i+1}</span>
                              <p className="text-[11px] font-medium text-slate-300 leading-snug">{p}</p>
                            </div>
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
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-8 italic">Histórico de <span className="text-aprovex-blue underline">Triagens</span></h2>
              <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-16 flex flex-col items-center justify-center text-center opacity-50">
                <History className="w-8 h-8 text-slate-200 mb-4" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nenhuma análise arquivada.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
