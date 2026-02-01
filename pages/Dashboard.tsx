import React, { useState, useEffect } from 'react';
import { 
  Layout, FileText, BarChart3, History, LogOut, Upload, 
  CheckCircle2, AlertCircle, Zap, Search, Target, 
  ArrowRight, Sparkles, ChevronRight, ShieldCheck,
  Trophy, Clock, Filter, ThumbsUp, ThumbsDown, Globe, BookOpen, Briefcase, Code
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
      // Simulação Rígida e Realista baseada na força de cada pilar
      setAnalysisResult({
        score: jobUrl ? 48 : 59, // Extremamente rígido
        matchLevel: 'NÃO RECOMENDADO',
        jobTitle: jobUrl ? 'Cargo de Alta Performance' : 'Análise Executiva de Perfil',
        analysisDate: new Date().toLocaleDateString(),
        metrics: [
          { label: 'Experiência', value: 42, color: '#EF4444', icon: <Briefcase className="w-3 h-3"/>, evaluation: 'Fraca: Descrição passiva e falta de progressão clara.' },
          { label: 'Conhecimento', value: 58, color: '#F59E0B', icon: <Code className="w-3 h-3"/>, evaluation: 'Regular: Hard skills presentes, mas sem profundidade técnica.' },
          { label: 'Idiomas', value: 20, color: '#EF4444', icon: <Globe className="w-3 h-3"/>, evaluation: 'Inexistente: Nenhuma proficiência detectada ou comprovada.' },
          { label: 'Formação', value: 85, color: '#10B981', icon: <BookOpen className="w-3 h-3"/>, evaluation: 'Forte: Base acadêmica sólida e compatível.' }
        ],
        criticalGaps: [
          { type: 'Experiência', msg: 'Falta de métricas quantitativas. Recrutadores descartam currículos sem prova de valor (ex: gerou X lucro, economizou Y tempo).' },
          { type: 'Idiomas', msg: 'Mercado sênior exige Inglês. A ausência de menção reduz drasticamente o alcance do currículo.' },
          { type: 'Conhecimento', msg: 'Gap em tecnologias emergentes citadas na descrição da vaga ou padrão de mercado.' }
        ],
        strengths: [
          "Organização visual e hierarquia de informações aceitável.",
          "Formação acadêmica em linha com as exigências técnicas.",
          "Dados de contato e links sociais validados."
        ],
        weaknesses: [
          "Ausência de Projetos Práticos ou Portfólio demonstrável.",
          "Resumo Profissional sem palavras-chave estratégicas para ATS.",
          "Descrições de cargos focadas em tarefas e não em resultados."
        ],
        actionPlan: [
          "Transformar tarefas em conquistas numéricas imediatas.",
          "Inserir certificações de idiomas ou testes de proficiência.",
          "Adicionar seção de 'Projetos e Tecnologias' com links clicáveis."
        ]
      });
      setIsUploading(false);
      setCredits(prev => prev - 1);
      clearInterval(interval);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex font-sans">
      {/* Sidebar Compacta */}
      <aside className="w-[240px] bg-[#0F172A] text-white flex flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="p-8"><Logo /></div>
        <nav className="flex-grow px-4 space-y-1 mt-4">
          <button onClick={() => setActiveTab('analyze')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest ${activeTab === 'analyze' ? 'bg-aprovex-blue text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5'}`}><Zap className="w-4 h-4" /> Analisar</button>
          <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest ${activeTab === 'history' ? 'bg-aprovex-blue text-white' : 'text-slate-400 hover:bg-white/5'}`}><History className="w-4 h-4" /> Histórico</button>
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/5">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Créditos</p>
            <p className="text-lg font-black text-white">{credits}</p>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 font-bold text-xs hover:text-red-400 transition-all uppercase tracking-widest"><LogOut className="w-4 h-4" /> Sair</button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="h-14 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 shrink-0 z-30">
          <div className="lg:hidden"><Logo /></div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-800 uppercase tracking-tighter leading-none">Deivid Ribeiro</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Premium</p>
            </div>
            <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center font-black text-slate-500 text-[10px]">DR</div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-6 lg:p-10">
          {activeTab === 'analyze' && (
            <div className="max-w-4xl mx-auto">
              {!analysisResult ? (
                <div className="flex flex-col items-center">
                  <div className="text-center mb-8 animate-fade-in">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-1 uppercase">Plataforma de <span className="text-aprovex-blue">Alta Performance</span></h2>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">IA treinada em processos seletivos globais.</p>
                  </div>
                  
                  <div className="w-full max-w-lg space-y-4">
                    <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Link da Vaga / Empresa Target</label>
                      <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-aprovex-blue" />
                        <input type="url" placeholder="Ex: linkedin.com/jobs/..." className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-aprovex-blue outline-none text-xs font-bold text-slate-700" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} />
                      </div>
                    </div>

                    <div className={`w-full bg-white border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center transition-all ${isUploading ? 'border-aprovex-blue animate-pulse' : 'border-slate-100 hover:border-slate-200'}`}>
                      {!isUploading ? (
                        <>
                          <input type="file" id="cv-upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
                          <label htmlFor="cv-upload" className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 cursor-pointer hover:bg-aprovex-blue group transition-all shadow-sm"><Upload className="w-5 h-5 text-aprovex-blue group-hover:text-white" /></label>
                          {file ? (
                            <div className="text-center">
                              <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">{file.name}</p>
                              <button onClick={startAnalysis} className="mt-6 px-8 py-3 bg-aprovex-blue text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Iniciar Auditoria</button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Upload do Currículo PDF</p>
                              <p className="text-slate-300 text-[9px] mt-1 italic">Tamanho máx: 5MB</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center py-4">
                          <div className="w-10 h-10 border-[3px] border-aprovex-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                          <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] animate-pulse">{steps[uploadStep]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in space-y-6 pb-20">
                  {/* Dashboard BI Compacto */}
                  <div className="flex items-center justify-between">
                    <div>
                      <button onClick={() => setAnalysisResult(null)} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-aprovex-blue flex items-center gap-1 mb-2 transition-all group"><ChevronRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1" /> Voltar ao Painel</button>
                      <h2 className="text-xl font-black text-slate-900 tracking-tighter leading-none mb-1 uppercase italic">Relatório de <span className="text-aprovex-blue">Performance BI</span></h2>
                      <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        <span className="bg-slate-900 text-white px-2 py-0.5 rounded flex items-center gap-1.5"><Target className="w-3 h-3 text-aprovex-blue" /> Vaga: {analysisResult.jobTitle}</span>
                        <span>{analysisResult.analysisDate}</span>
                      </div>
                    </div>
                    <button className="px-5 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all shadow-sm">Exportar PDF</button>
                  </div>

                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Score Centralizado */}
                    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                      <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="56" cy="56" r="50" stroke="#F1F5F9" strokeWidth="10" fill="transparent" />
                          <circle cx="56" cy="56" r="50" stroke={analysisResult.score > 70 ? '#10B981' : '#EF4444'} strokeWidth="10" fill="transparent" strokeDasharray={314} strokeDashoffset={314 - (314 * analysisResult.score) / 100} strokeLinecap="round" className="transition-all duration-1000" />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-3xl font-black text-slate-900 leading-none tracking-tighter">{analysisResult.score}</span>
                          <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Global</p>
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${analysisResult.score > 70 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{analysisResult.matchLevel}</span>
                    </div>

                    {/* BI Indicators - Realismo e Força */}
                    <div className="lg:col-span-3 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Auditoria de Pilares Estratégicos</p>
                      <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                        {analysisResult.metrics.map((m: any, i: number) => (
                          <div key={i} className="space-y-1.5 group">
                            <div className="flex justify-between items-end">
                              <span className="text-[9px] font-bold text-slate-600 flex items-center gap-1.5 uppercase tracking-tighter">{m.icon} {m.label}</span>
                              <span className="text-[10px] font-black text-slate-900">{m.value}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                              <div className="h-full transition-all duration-1000" style={{ width: `${m.value}%`, backgroundColor: m.color }} />
                            </div>
                            <p className="text-[8px] text-slate-400 font-medium leading-none group-hover:text-slate-500 transition-colors">{m.evaluation}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detalhamento de Gargalos BI */}
                    <div className="lg:col-span-4 grid md:grid-cols-2 gap-6">
                      <div className="bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden flex flex-col">
                        <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                          <ThumbsUp className="w-3 h-3 text-green-500" />
                          <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Pontos de Força</span>
                        </div>
                        <div className="p-5 flex-grow">
                          <ul className="space-y-4">
                            {analysisResult.strengths.map((s: string, i: number) => (
                              <li key={i} className="text-[10px] font-bold text-slate-600 leading-snug flex gap-3">
                                <span className="text-green-400">✓</span> {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden flex flex-col">
                        <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                          <ThumbsDown className="w-3 h-3 text-red-500" />
                          <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Gargalos de Reprovação</span>
                        </div>
                        <div className="p-5 flex-grow">
                          <ul className="space-y-4">
                            {analysisResult.weaknesses.map((s: string, i: number) => (
                              <li key={i} className="text-[10px] font-bold text-slate-700 leading-snug flex gap-3">
                                <span className="text-red-500">✕</span> {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Alertas Críticos de IA */}
                    <div className="lg:col-span-4 bg-red-50/50 p-6 rounded-[24px] border border-red-100">
                      <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2"><AlertCircle className="w-3 h-3" /> Alertas Críticos de Auditoria</p>
                      <div className="space-y-3">
                        {analysisResult.criticalGaps.map((gap: any, i: number) => (
                          <div key={i} className="bg-white p-3 rounded-xl border border-red-100 flex gap-3">
                            <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter bg-red-50 px-1.5 py-0.5 rounded h-fit">{gap.type}</span>
                            <p className="text-[10px] font-bold text-slate-600 leading-tight">{gap.msg}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Plan Strategy */}
                    <div className="lg:col-span-4 bg-[#0F172A] p-6 rounded-[24px] group overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-2 opacity-5"><BarChart3 className="w-24 h-24 text-white" /></div>
                      <div className="relative z-10">
                        <p className="text-[9px] font-black text-aprovex-blue uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><Briefcase className="w-3.5 h-3.5" /> Plano de Retomada de Performance</p>
                        <div className="grid md:grid-cols-3 gap-4">
                          {analysisResult.actionPlan.map((p: string, i: number) => (
                            <div key={i} className="flex flex-col gap-1.5 p-3 bg-white/5 rounded-xl border border-white/5">
                              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest tracking-tighter tracking-widest tracking-tighter tracking-widest tracking-tighter">Etapa 0{i+1}</span>
                              <p className="text-[10px] font-medium text-slate-300 leading-snug">{p}</p>
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
              <h2 className="text-xl font-black text-slate-900 tracking-tighter mb-8 uppercase italic">Arquivo de <span className="text-aprovex-blue">Triagens</span></h2>
              <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-16 flex flex-col items-center justify-center text-center opacity-50">
                <History className="w-6 h-6 text-slate-200 mb-4" />
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nenhuma análise arquivada.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
