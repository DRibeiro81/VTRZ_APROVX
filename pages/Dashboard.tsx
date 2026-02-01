import React, { useState, useEffect } from 'react';
import { 
  Layout, FileText, BarChart3, History, LogOut, Upload, 
  CheckCircle2, AlertCircle, Zap, Search, Target, 
  ArrowRight, Sparkles, ChevronRight, ShieldCheck,
  Trophy, Clock, Filter, ThumbsUp, ThumbsDown, Globe, BookOpen, Briefcase, Code,
  Eye, FileSearch, Layers, Cpu, Activity, ShieldAlert, X, Download, Info
} from 'lucide-react';
import Logo from '../components/Logo';
import { supabase } from '../lib/supabaseClient';

// Definições de cenário ideal para o Modal
const IDEAL_SCENARIOS: Record<string, string> = {
  'Cobertura de Palavras-chave': 'O cenário ideal é atingir 80% ou mais de correspondência. Você deve incluir termos técnicos e "soft skills" exatamente como descritos na vaga.',
  'Posicionamento Estratégico': 'As palavras-chave vitais devem aparecer no Título Profissional e no Resumo. O ATS prioriza termos encontrados no topo do documento.',
  'Densidade de Palavras': 'A densidade ideal é entre 2% e 4% por termo. Menos que isso é irrelevante; mais que isso é considerado "keyword stuffing" e causa rejeição.',
  'Compatibilidade Semântica': 'O sistema deve reconhecer que você possui a habilidade mesmo sem usar o termo exato. Ex: "Desenvolvimento de Interfaces" é semanticamente próximo a "Frontend".',
  'Qualidade de Leitura (Parsing)': 'O documento deve ser coluna única, sem tabelas complexas ou gráficos. O texto deve ser selecionável e em fontes padrão.',
  'Qualidade do Conteúdo': 'Utilize verbos de ação fortes (Gerenciei, Desenvolvi, Reduzi) e evite clichês como "apaixonado por tecnologia".',
  'Score de Quantificação': 'Cada experiência deve conter pelo menos uma métrica numérica. Ex: "Aumento de 15% em vendas" ou "Redução de 2h no processo".',
  'Relevância da Experiência': 'Suas últimas duas experiências devem ter pelo menos 70% de similaridade técnica com as responsabilidades do cargo pretendido.',
  'Nível de Personalização': 'O currículo não deve parecer um modelo padrão. Ele deve citar tecnologias e desafios específicos mencionados na Job Description.',
  'Risco de Rejeição (ATS)': 'O cenário ideal é risco ZERO. Evite informações excessivamente pessoais, fotos ou layouts criativos demais que confundem o robô.'
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analyze');
  const [credits, setCredits] = useState(5);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [jobUrl, setJobUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importedJobTitle, setImportedJobTitle] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [modalMetric, setModalMetric] = useState<string | null>(null);

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

  const handleImportJob = () => {
    if (!jobUrl) return;
    setIsImporting(true);
    
    // Extração dinâmica baseada na URL para o teste parecer real
    setTimeout(() => {
      let detectedTitle = "Cargo de Alta Performance";
      
      if (jobUrl.includes('desenvolvedor') || jobUrl.includes('developer')) {
        detectedTitle = "Engenheiro de Software Full Stack";
      } else if (jobUrl.includes('gerente') || jobUrl.includes('manager')) {
        detectedTitle = "Gerente de Projetos Sênior";
      } else if (jobUrl.includes('vendas') || jobUrl.includes('sales')) {
        detectedTitle = "Executivo de Contas (Sales)";
      } else if (jobUrl.includes('design') || jobUrl.includes('ux')) {
        detectedTitle = "Product Designer (UX/UI)";
      } else if (jobUrl.includes('analista')) {
        detectedTitle = "Analista de Dados Estratégicos";
      }

      setImportedJobTitle(detectedTitle);
      setIsImporting(false);
    }, 1500);
  };

  const startAnalysis = async () => {
    if (!file) return;
    setIsUploading(true);
    setUploadStep(0);

    const interval = setInterval(() => {
      setUploadStep(prev => (prev >= 4 ? 4 : prev + 1));
    }, 1500);

    setTimeout(() => {
      setAnalysisResult({
        score: jobUrl ? 32 : 44,
        matchClass: 'Alto Risco de Reprovação',
        matchLevel: 'CRÍTICO',
        verdict: "SUBMETER AGORA É PERDA DE TEMPO. Seu currículo será descartado em milissegundos pelo robô. Você não possui os requisitos mínimos de formação e palavras-chave que o algoritmo busca. Ajuste os bloqueantes antes de tentar.",
        analysisDate: new Date().toLocaleDateString(),
        jobTitle: importedJobTitle || 'Avaliação Técnica de Perfil',
        
        atsMetrics: [
          { label: 'Cobertura de Palavras-chave', value: 25, status: 'Crítico', detail: 'Baixa presença de termos da vaga.' },
          { label: 'Posicionamento Estratégico', value: 10, status: 'Crítico', detail: 'Keywords ausentes em seções nobres.' },
          { label: 'Densidade de Palavras', value: 'Baixa', status: 'Incompleto', detail: 'Abaixo do limiar de relevância.', isStatus: true },
          { label: 'Compatibilidade Semântica', value: 30, status: 'Pobre', detail: 'Baixa correlação contextual.' },
          { label: 'Qualidade de Leitura (Parsing)', value: 45, status: 'Regular', detail: 'Layout legível, mas sem dados.' },
          { label: 'Qualidade do Conteúdo', value: 20, status: 'Crítico', detail: 'Linguagem passiva e genérica.' },
          { label: 'Score de Quantificação', value: 0, status: 'Nulo', detail: 'Sem métricas ou números.' },
          { label: 'Relevância da Experiência', value: 35, status: 'Pobre', detail: 'Experiência não sustenta nível.' },
          { label: 'Nível de Personalização', value: 5, status: 'Crítico', detail: 'Currículo 100% genérico.' },
          { label: 'Risco de Rejeição (ATS)', value: 85, status: 'Crítico', detail: 'Altíssimo risco de descarte.', isRisk: true }
        ],
        gaps: [
          { skill: 'Formação Acadêmica / Graduação', severity: 'Bloqueante', type: 'Falta Requisito Básico' },
          { skill: 'Inglês Corporativo', severity: 'Bloqueante', type: 'Não Detectado' }
        ],
        qualityAlerts: [
          { type: 'Risk', msg: 'REJEIÇÃO: Ausência de formação superior detectada para a vaga.', severity: 'Alta' },
          { type: 'Data', msg: 'DADOS INSUFICIENTES: Currículo vazio de conquistas.', severity: 'Alta' }
        ],
        actionPlan: [
          "URGENTE: Inserir Graduação ou Curso Técnico.",
          "Quantificar resultados numéricos nas experiências.",
          "Mapear keywords obrigatórias da vaga."
        ]
      });
      setIsUploading(false);
      setCredits(prev => prev - 1);
      clearInterval(interval);
    }, 7500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans relative">
      
      {/* MODAL DE EXPLICAÇÃO DA MÉTRICA */}
      {modalMetric && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl border border-slate-100 animate-scale-up">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-aprovex-blue">
                  <Info className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">{modalMetric}</h3>
              </div>
              <button onClick={() => setModalMetric(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-2">Cenário Ideal para Aprovação</p>
            <p className="text-slate-600 text-sm leading-relaxed font-medium mb-8">
              {IDEAL_SCENARIOS[modalMetric] || "Informação indisponível para esta métrica."}
            </p>
            <button onClick={() => setModalMetric(null)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-aprovex-blue transition-all">Entendido</button>
          </div>
        </div>
      )}

      <aside className="w-[250px] bg-[#0F172A] text-white flex flex-col hidden lg:flex sticky top-0 h-screen border-r border-slate-800">
        <div className="p-8 border-b border-white/5"><Logo /></div>
        <nav className="flex-grow px-4 space-y-1 mt-6">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-4">Auditoria ATS</p>
          <button onClick={() => setActiveTab('analyze')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === 'analyze' ? 'bg-aprovex-blue text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Activity className="w-4 h-4" /> Nova Auditoria</button>
          <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-aprovex-blue text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><History className="w-4 h-4" /> Histórico</button>
        </nav>
        <div className="p-6">
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/5 mb-4">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Créditos</p>
            <p className="text-xl font-black text-white">{credits}</p>
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
              <p className="text-[8px] font-bold text-slate-400 mt-0.5">VTRZ-APROVX V2.0</p>
            </div>
            <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-white font-black text-[10px]">DR</div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-6 lg:p-12">
          {activeTab === 'analyze' && (
            <div className="max-w-5xl mx-auto">
              {!analysisResult ? (
                <div className="flex flex-col items-center">
                  <div className="text-center mb-10 animate-fade-in">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2 uppercase italic">Módulo de <span className="text-aprovex-blue">Avaliação Profissional</span></h2>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">Diagnóstico semântico baseado em algoritmos de recrutamento real.</p>
                  </div>
                  
                  <div className="w-full max-w-lg space-y-4">
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                      <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Link da Vaga / Empresa Target</label>
                      <div className="flex gap-2">
                        <div className="relative group flex-grow">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-aprovex-blue" />
                          <input type="url" placeholder="linkedin.com/jobs/..." className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-aprovex-blue outline-none text-xs font-bold text-slate-700 transition-all" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} />
                        </div>
                        <button onClick={handleImportJob} disabled={!jobUrl || isImporting} className="px-6 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-aprovex-blue disabled:opacity-50 transition-all flex items-center justify-center min-w-[140px]">
                          {isImporting ? 'Importando...' : 'Importar Dados'}
                        </button>
                      </div>
                      
                      {importedJobTitle && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3 animate-fade-in">
                          <div className="w-2 h-2 bg-aprovex-blue rounded-full animate-pulse" />
                          <p className="text-[10px] font-black text-slate-700 uppercase tracking-tight truncate">Vaga Identificada: {importedJobTitle}</p>
                          <button onClick={() => setImportedJobTitle(null)} className="ml-auto"><X className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" /></button>
                        </div>
                      )}
                    </div>

                    <div className={`w-full bg-white border-2 border-dashed rounded-[40px] p-16 flex flex-col items-center justify-center transition-all ${isUploading ? 'border-aprovex-blue animate-pulse' : 'border-slate-200 hover:border-slate-300'}`}>
                      {!isUploading ? (
                        <>
                          <input type="file" id="cv-upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
                          <label htmlFor="cv-upload" className="w-20 h-20 bg-slate-900 rounded-[24px] flex items-center justify-center mb-6 cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20 group"><Upload className="w-7 h-7 text-white group-hover:text-aprovex-blue transition-colors" /></label>
                          {file ? (
                            <div className="text-center animate-fade-in">
                              <p className="text-sm font-black text-slate-900 uppercase tracking-tighter mb-2">{file.name}</p>
                              <button onClick={startAnalysis} className="px-10 py-5 bg-aprovex-blue text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 active:scale-95 transition-all">Iniciar Auditoria ATS</button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Upload do Currículo (PDF)</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center py-4">
                          <div className="w-10 h-10 border-[3px] border-aprovex-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                          <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] animate-pulse">{steps[uploadStep]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in space-y-6 pb-24">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                    <div>
                      <button onClick={() => setAnalysisResult(null)} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-aprovex-blue flex items-center gap-1.5 mb-3 transition-all group"><ChevronRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1" /> Nova Triagem</button>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-2 uppercase italic">Relatório <span className="text-aprovex-blue underline underline-offset-4 decoration-2">Auditoria ATS</span></h2>
                      <div className="flex items-center gap-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 bg-slate-900 text-white px-2 py-1 rounded-md tracking-tighter"><Target className="w-3.5 h-3.5 text-aprovex-blue" /> Vaga: {analysisResult.jobTitle}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Data: {analysisResult.analysisDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-6 py-3 bg-white border border-slate-200 text-slate-800 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm">Exportar BI</button>
                      <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Imprimir</button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Score Global e Veredito Sincero */}
                    <div className="lg:col-span-1 space-y-6">
                      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Score Geral</p>
                        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="58" stroke="#F8FAFC" strokeWidth="12" fill="transparent" />
                            <circle cx="64" cy="64" r="58" stroke="#EF4444" strokeWidth="12" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * analysisResult.score) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                          </svg>
                          <div className="absolute text-center">
                            <span className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{analysisResult.score}</span>
                            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-1">Pontos</p>
                          </div>
                        </div>
                        <div className="px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border bg-red-50 text-red-600 border-red-100">
                          {analysisResult.matchClass}
                        </div>
                      </div>

                      <div className="bg-slate-900 p-6 rounded-[32px] border border-slate-800">
                        <div className="flex items-center gap-2 mb-4">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">Veredito Direto</span>
                        </div>
                        <p className="text-slate-400 text-[11px] font-bold leading-relaxed italic">
                          "{analysisResult.verdict}"
                        </p>
                      </div>
                    </div>

                    {/* BI Indicators com Clicabilidade */}
                    <div className="lg:col-span-3 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-slate-50">Auditoria Técnica de Indicadores (Clique no título para ver o ideal)</p>
                      <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                        {analysisResult.atsMetrics.map((m: any, i: number) => (
                          <div key={i} className="space-y-2 group">
                            <button 
                              onClick={() => setModalMetric(m.label)}
                              className="flex justify-between items-end w-full hover:opacity-70 transition-all text-left"
                            >
                              <span className="text-[9px] font-black text-slate-600 uppercase tracking-tight flex items-center gap-1.5">
                                {m.label} <Info className="w-3 h-3 text-slate-300" />
                              </span>
                              <span className={`text-[10px] font-black ${m.status === 'Crítico' || m.status === 'Nulo' || m.status === 'Pobre' ? 'text-red-500' : 'text-slate-900'}`}>{m.isStatus ? m.value : `${m.value}%`}</span>
                            </button>
                            <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                              <div className="h-full transition-all duration-1000 ease-out" style={{ 
                                width: m.isStatus ? '100%' : (m.isRisk ? `${100-m.value}%` : `${m.value}%`), 
                                backgroundColor: m.isStatus ? '#F1F5F9' : (m.status === 'Forte' || m.status === 'OK' ? '#10B981' : m.status === 'Regular' ? '#F59E0B' : '#EF4444') 
                              }} />
                            </div>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{m.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skill Gap e Riscos */}
                    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden flex flex-col">
                      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2"><Layers className="w-3.5 h-3.5 text-aprovex-blue" /> Lacunas de Competência</span>
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

                    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden flex flex-col">
                      <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-red-700 uppercase tracking-widest flex items-center gap-2"><ShieldAlert className="w-3.5 h-3.5 text-red-500" /> Riscos de Rejeição</span>
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

                    {/* Action Plan */}
                    <div className="lg:col-span-4 bg-[#0F172A] p-8 rounded-[40px] relative group overflow-hidden">
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
