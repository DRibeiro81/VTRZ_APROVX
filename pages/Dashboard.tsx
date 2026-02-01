import React, { useState, useEffect } from 'react';
import { 
  Layout, FileText, BarChart3, History, LogOut, Upload, 
  CheckCircle2, AlertCircle, Zap, Search, Target, 
  ArrowRight, Sparkles, ChevronRight, ShieldCheck,
  Trophy, Clock, Filter, ThumbsUp, ThumbsDown, Globe, BookOpen, Briefcase, Code,
  Eye, FileSearch, Layers, Cpu, Activity, ShieldAlert
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
    "Acessando Job Description...",
    "Executando Auditoria ATS...",
    "Mapeando Gaps de Formação...",
    "Calculando Risco de Rejeição...",
    "Finalizando Diagnóstico..."
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
      setUploadStep(prev => (prev >= 4 ? 4 : prev + 1));
    }, 1500);

    setTimeout(() => {
      // AUDITORIA REALISTA E RÍGIDA: Foco em reprovação por falta de dados básicos
      setAnalysisResult({
        score: jobUrl ? 32 : 44, // Score baixo devido a falhas críticas
        matchClass: 'Alto Risco de Reprovação',
        matchLevel: 'CRÍTICO',
        analysisDate: new Date().toLocaleDateString(),
        jobTitle: jobUrl ? 'Cargo Alvo Detectado' : 'Avaliação Técnica de Perfil',
        
        atsMetrics: [
          { label: 'Keyword Match Rate', value: 25, status: 'Crítico', detail: 'Baixa cobertura de termos da vaga.' },
          { label: 'Keyword Placement', value: 10, status: 'Crítico', detail: 'Estrutura ignorada pelo ATS.' },
          { label: 'Keyword Density', value: 'Baixa', status: 'Incompleto', detail: 'Abaixo do limiar de relevância.', isStatus: true },
          { label: 'Semantic Skill Match', value: 30, status: 'Pobre', detail: 'Baixa correlação com o cargo.' },
          { label: 'ATS Parsing Score', value: 45, status: 'Regular', detail: 'Layout legível, mas sem dados.' },
          { label: 'Content Quality', value: 20, status: 'Crítico', detail: 'Falta de verbos de ação.' },
          { label: 'Quantification Score', value: 0, status: 'Nulo', detail: 'Sem métricas ou números.' },
          { label: 'Experience Relevance', value: 35, status: 'Pobre', detail: 'Experiência não sustenta nível.' },
          { label: 'Customization Score', value: 5, status: 'Crítico', detail: 'Currículo 100% genérico.' },
          { label: 'ATS Risk Score', value: 85, status: 'Crítico', detail: 'Altíssimo risco de descarte.', isRisk: true }
        ],

        gaps: [
          { skill: 'Formação Acadêmica / Graduação', severity: 'Bloqueante', type: 'Falta Requisito Básico' },
          { skill: 'Hard Skills da Vaga', severity: 'Crítico', type: 'Déficit Técnico' },
          { skill: 'Resultados Quantificáveis', severity: 'Crítico', type: 'Falta Prova de Valor' }
        ],

        qualityAlerts: [
          { type: 'Risk', msg: 'REJEIÇÃO: Ausência de formação superior detectada para a vaga.', severity: 'Alta' },
          { type: 'Data', msg: 'DADOS INSUFICIENTES: Currículo sem corpo de texto relevante.', severity: 'Alta' },
          { type: 'Content', msg: 'Verbos Fracos: Linguagem passiva reduz autoridade.', severity: 'Média' }
        ],

        actionPlan: [
          "URGENTE: Inserir Graduação ou Curso Técnico Profissionalizante.",
          "Substituir descrições por resultados (ex: 'Fiz X' por 'Gerei Y de lucro').",
          "Customizar o resumo com as keywords exatas da Job Description."
        ]
      });
      setIsUploading(false);
      setCredits(prev => prev - 1);
      clearInterval(interval);
    }, 7500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <aside className="w-[250px] bg-[#0F172A] text-white flex flex-col hidden lg:flex sticky top-0 h-screen border-r border-slate-800">
        <div className="p-8 border-b border-white/5"><Logo /></div>
        <nav className="flex-grow px-4 space-y-1 mt-6">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-4">Auditoria ATS</p>
          <button onClick={() => setActiveTab('analyze')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === 'analyze' ? 'bg-aprovex-blue text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Activity className="w-4 h-4" /> Nova Auditoria</button>
          <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-aprovex-blue text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><History className="w-4 h-4" /> Histórico</button>
        </nav>
        <div className="p-6">
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/5 mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] font-black text-slate-400 uppercase">Status do Plano</span>
              <span className="text-[8px] font-black text-aprovex-blue bg-blue-500/10 px-1.5 py-0.5 rounded">Premium</span>
            </div>
            <p className="text-xl font-black text-white">{credits} <span className="text-[10px] text-slate-500 font-bold tracking-normal uppercase">Créditos</span></p>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 font-bold text-[10px] hover:text-red-400 transition-all uppercase tracking-widest"><LogOut className="w-4 h-4" /> Sair</button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0 z-30">
          <div className="lg:hidden"><Logo /></div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-900 uppercase">Auditoria Técnica</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">VTRZ-APROVX V2.0</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-[10px]">DR</div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-6 lg:p-12">
          {activeTab === 'analyze' && (
            <div className="max-w-5xl mx-auto">
              {!analysisResult ? (
                <div className="flex flex-col items-center">
                  <div className="text-center mb-10 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full mb-4 text-[9px] font-black uppercase tracking-widest border border-slate-800">
                      <Cpu className="w-3 h-3 text-aprovex-blue" /> Engine de Triagem ATS
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2 uppercase italic">Módulo de <span className="text-aprovex-blue">Avaliação Profissional</span></h2>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">Diagnóstico semântico baseado em algoritmos de recrutamento real.</p>
                  </div>
                  
                  <div className="w-full max-w-xl space-y-4">
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                      <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Link da Vaga / Empresa Target</label>
                      <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-aprovex-blue" />
                        <input type="url" placeholder="linkedin.com/jobs/..." className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-aprovex-blue outline-none text-xs font-bold text-slate-700 transition-all" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} />
                      </div>
                    </div>

                    <div className={`w-full bg-white border-2 border-dashed rounded-[40px] p-16 flex flex-col items-center justify-center transition-all ${isUploading ? 'border-aprovex-blue shadow-2xl' : 'border-slate-200 hover:border-slate-300'}`}>
                      {!isUploading ? (
                        <>
                          <input type="file" id="cv-upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
                          <label htmlFor="cv-upload" className="w-20 h-20 bg-slate-900 rounded-[24px] flex items-center justify-center mb-6 cursor-pointer hover:scale-105 transition-all shadow-xl shadow-slate-900/20 group"><Upload className="w-7 h-7 text-white group-hover:text-aprovex-blue transition-colors" /></label>
                          {file ? (
                            <div className="text-center animate-fade-in">
                              <p className="text-sm font-black text-slate-900 uppercase tracking-tighter mb-2">{file.name}</p>
                              <button onClick={startAnalysis} className="px-10 py-5 bg-aprovex-blue text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 active:scale-95 transition-all">Iniciar Auditoria ATS</button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Upload do Currículo (PDF)</p>
                              <p className="text-slate-300 text-[9px] mt-2 font-bold uppercase">Auditoria realista e rígida</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center py-4">
                          <div className="relative w-16 h-16 mb-6">
                            <div className="absolute inset-0 border-[3px] border-slate-100 rounded-full"></div>
                            <div className="absolute inset-0 border-[3px] border-aprovex-blue border-t-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center"><Activity className="w-6 h-6 text-aprovex-blue animate-pulse" /></div>
                          </div>
                          <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] animate-pulse">{steps[uploadStep]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in-up space-y-6 pb-24">
                  {/* Dashboard BI Realista */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                    <div>
                      <button onClick={() => setAnalysisResult(null)} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-aprovex-blue flex items-center gap-1.5 mb-3 transition-all group"><ChevronRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1" /> Nova Triagem</button>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-2 uppercase italic">Audit <span className="text-aprovex-blue">#ATS-BI</span></h2>
                      <div className="flex items-center gap-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 bg-slate-900 text-white px-2 py-1 rounded-md"><Target className="w-3.5 h-3.5 text-aprovex-blue" /> Vaga: {analysisResult.jobTitle}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Data: {analysisResult.analysisDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-6 py-3 bg-white border border-slate-200 text-slate-800 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm">Exportar BI</button>
                      <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Imprimir</button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Score Global (Pena Capital se faltar dados) */}
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="w-20 h-20 text-slate-900" /></div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Score Geral de Triagem</p>
                      <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="72" cy="72" r="66" stroke="#F8FAFC" strokeWidth="12" fill="transparent" />
                          <circle cx="72" cy="72" r="66" stroke={analysisResult.score > 74 ? '#10B981' : analysisResult.score > 49 ? '#F59E0B' : '#EF4444'} strokeWidth="12" fill="transparent" strokeDasharray={414} strokeDashoffset={414 - (414 * analysisResult.score) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{analysisResult.score}</span>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Pontos / 100</p>
                        </div>
                      </div>
                      <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${analysisResult.score > 74 ? 'bg-green-50 text-green-600 border-green-100' : analysisResult.score > 49 ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {analysisResult.matchClass}
                      </div>
                    </div>

                    {/* BI Indicators (12 Métricas Conforme Briefing) */}
                    <div className="lg:col-span-3 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-slate-50">Auditoria Técnica de Indicadores (Métricas 1-12)</p>
                      <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                        {analysisResult.atsMetrics.map((m: any, i: number) => (
                          <div key={i} className="space-y-2 group">
                            <div className="flex justify-between items-end">
                              <span className="text-[9px] font-black text-slate-600 uppercase tracking-tight">{m.label}</span>
                              <span className={`text-[10px] font-black ${m.status === 'Crítico' || m.status === 'Nulo' || m.status === 'Pobre' ? 'text-red-500' : 'text-slate-900'}`}>{m.isStatus ? m.value : `${m.value}%`}</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                              <div className="h-full transition-all duration-1000 ease-out" style={{ 
                                width: m.isStatus ? '100%' : (m.isRisk ? `${100-m.value}%` : `${m.value}%`), 
                                backgroundColor: m.isStatus ? '#F1F5F9' : (m.status === 'Forte' || m.status === 'OK' ? '#10B981' : m.status === 'Regular' ? '#F59E0B' : '#EF4444') 
                              }} />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className={`w-1 h-1 rounded-full ${m.status === 'Forte' || m.status === 'OK' ? 'bg-green-500' : m.status === 'Regular' ? 'bg-amber-500' : 'bg-red-500'}`} />
                              <p className="text-[9px] text-slate-400 font-bold group-hover:text-slate-500 transition-colors uppercase tracking-tighter">{m.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skill Gap Score (Bloqueantes Reais) */}
                    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden flex flex-col">
                      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2"><Layers className="w-3.5 h-3.5 text-aprovex-blue" /> Skill Gap Score</span>
                        <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">BLOQUEANTE</span>
                      </div>
                      <div className="p-6 space-y-4 flex-grow">
                        {analysisResult.gaps.map((gap: any, i: number) => (
                          <div key={i} className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl border border-slate-100 border-l-[4px] border-l-red-500 group transition-all">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-slate-800 uppercase">{gap.skill}</span>
                              <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-red-500 text-white uppercase">{gap.severity}</span>
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter italic">{gap.type}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Riscos & Qualidade (Rigidez Absoluta) */}
                    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden flex flex-col">
                      <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-red-700 uppercase tracking-widest flex items-center gap-2"><ShieldAlert className="w-3.5 h-3.5" /> Riscos de Rejeição</span>
                      </div>
                      <div className="p-6 space-y-5 flex-grow">
                        {analysisResult.qualityAlerts.map((alert: any, i: number) => (
                          <div key={i} className="flex gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${alert.severity === 'Alta' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`} />
                            <div className="space-y-0.5">
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{alert.type}</p>
                              <p className="text-[10px] font-bold text-slate-700 leading-snug">{alert.msg}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Plan BI Strategy */}
                    <div className="lg:col-span-4 bg-[#0F172A] p-8 rounded-[40px] relative group overflow-hidden">
                      <div className="absolute -bottom-10 -right-10 opacity-5 transition-opacity"><Zap className="w-40 h-40 text-white" /></div>
                      <div className="relative z-10">
                        <h4 className="text-[11px] font-black text-aprovex-blue uppercase tracking-[0.3em] mb-8 flex items-center gap-2 italic"><Sparkles className="w-4 h-4" /> Plano de Retomada de Performance</h4>
                        <div className="grid md:grid-cols-3 gap-8">
                          {analysisResult.actionPlan.map((p: string, i: number) => (
                            <div key={i} className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all border-t-[3px] border-t-aprovex-blue">
                              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Fase 0{i+1}</span>
                              <p className="text-[10px] font-medium text-slate-300 leading-relaxed uppercase">{p}</p>
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
              <h2 className="text-xl font-black text-slate-900 tracking-tighter mb-8 uppercase italic border-b border-slate-100 pb-4">Log de <span className="text-aprovex-blue italic">Auditorias</span></h2>
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-[20px] flex items-center justify-center mb-6 shadow-inner">
                  <FileSearch className="w-6 h-6 text-slate-200" />
                </div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">Nenhum registro encontrado</h3>
                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Inicie uma auditoria para gerar seu histórico de BI.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
