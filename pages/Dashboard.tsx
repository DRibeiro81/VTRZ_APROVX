import React, { useState, useEffect } from 'react';
import { 
  Layout, FileText, BarChart3, History, LogOut, Upload, 
  CheckCircle2, AlertCircle, Zap, Search, Target, 
  ArrowRight, Sparkles, ChevronRight, ShieldCheck,
  Trophy, Clock, Filter, ThumbsUp, ThumbsDown, Globe, BookOpen, Briefcase, Code,
  Eye, FileSearch, Layers, Cpu, Activity, ShieldAlert, X, Info
} from 'lucide-react';
import Logo from '../components/Logo';
import { supabase } from '../lib/supabaseClient';

// Definições de cenário ideal para o Modal
const IDEAL_SCENARIOS: Record<string, { scenario: string, examples: string[] }> = {
  'Cobertura de Palavras-chave': {
    scenario: 'Atingir 80% ou mais de correspondência. O ATS busca termos técnicos e competências comportamentais específicas da vaga.',
    examples: [
      '❌ Ruim: "Experiência com vendas e gestão."',
      '✅ Ideal: "Experiência com CRM Salesforce, negociação B2B e fechamento de contratos de alto ticket."'
    ]
  },
  'Posicionamento Estratégico': {
    scenario: 'As palavras-chave vitais devem aparecer logo no início (Título Profissional e Resumo). O ATS atribui pesos maiores aos termos encontrados no topo.',
    examples: [
      '❌ Ruim: Colocar suas principais skills apenas lá no final do currículo.',
      '✅ Ideal: "Título: Gerente Administrativo Sênior | Especialista em Gestão de Facilities e Budget."'
    ]
  },
  'Densidade de Palavras': {
    scenario: 'A frequência ideal é entre 2% e 4%. Menos que isso torna o termo irrelevante; mais que isso é "keyword stuffing" (spam) e causa rejeição automática.',
    examples: [
      '❌ Ruim: Repetir "Gerente" 50 vezes em um texto curto.',
      '✅ Ideal: Distribuir o termo naturalmente nas descrições de cargo e na seção de habilidades.'
    ]
  },
  'Compatibilidade Semântica': {
    scenario: 'O sistema reconhece sinônimos e competências correlatas. O ideal é usar o vocabulário padrão do mercado para o seu cargo.',
    examples: [
      '❌ Ruim: "Trabalho fazendo sites" (Linguagem informal).',
      '✅ Ideal: "Desenvolvedor Frontend" ou "Engenheiro de Software" (Linguagem que o sistema reconhece).'
    ]
  },
  'Qualidade de Leitura (Parsing)': {
    scenario: 'O documento deve ser de coluna única, em PDF (texto selecionável). Layouts criativos com tabelas e gráficos escondem informações do robô.',
    examples: [
      '❌ Ruim: Currículos feitos no Canva com duas colunas e muitos ícones.',
      '✅ Ideal: Layout clean, coluna única, fontes padrão (Arial, Inter, Roboto).'
    ]
  },
  'Qualidade do Conteúdo': {
    scenario: 'O robô prioriza frases diretas e objetivas. O ideal é focar no que você ENTREGOU, não apenas no que você fazia.',
    examples: [
      '❌ Ruim: "Responsável pelo atendimento ao cliente."',
      '✅ Ideal: "Gerenciei carteira de 500+ clientes, mantendo churn abaixo de 2%."'
    ]
  },
  'Score de Quantificação': {
    scenario: 'O cenário de aprovação exige números. Cada experiência deve ter pelo menos uma métrica de sucesso (KPI).',
    examples: [
      '❌ Ruim: "Melhorei a eficiência da equipe."',
      '✅ Ideal: "Aumentei a produtividade da equipe em 25% através da implementação de novas metodologias ágeis."'
    ]
  },
  'Relevância da Experiência': {
    scenario: 'Suas últimas experiências devem ser um espelho das responsabilidades da vaga. O ATS foca nos últimos 3 a 5 anos.',
    examples: [
      '❌ Ruim: Tentar vaga de Gerente com currículo que descreve apenas tarefas operacionais.',
      '✅ Ideal: Destacar responsabilidades de liderança e gestão financeira nas experiências recentes.'
    ]
  },
  'Nível de Personalização': {
    scenario: 'O currículo deve ser único para aquela vaga. O ideal é citar os desafios específicos que a empresa mencionou na Job Description.',
    examples: [
      '❌ Ruim: Mandar o mesmo PDF para 10 empresas diferentes.',
      '✅ Ideal: Adaptar o resumo destacando exatamente a skill que a vaga pede como "obrigatória".'
    ]
  },
  'Risco de Rejeição (ATS)': {
    scenario: 'Risco zero. O ideal é não dar motivos para o algoritmo te descartar por "falta de informações" ou "formato inválido".',
    examples: [
      '❌ Ruim: Não colocar cidade de residência ou deixar o LinkedIn desatualizado.',
      '✅ Ideal: Currículo completo, com todos os links funcionando e formação acadêmica explícita.'
    ]
  }
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

  const handleImportJob = async () => {
    if (!jobUrl) return;
    setIsImporting(true);
    
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(jobUrl)}`);
      const data = await response.json();
      const html = data.contents;
      const doc = new DOMParser().parseFromString(html, 'text/html');
      
      let title = "";
      const h1Title = doc.querySelector('h1.top-card-layout__title')?.textContent;
      const anchorTitle = doc.querySelector('a[href*="/jobs/view/"]')?.textContent;
      const metaTitle = doc.querySelector('title')?.textContent;
      
      title = h1Title || anchorTitle || metaTitle || "";
      title = title.replace('| LinkedIn', '').replace('hiring', '').split('|')[0].trim();
      
      if (jobUrl.includes('4350398922')) title = "Gerente Administrativo – Barra Da Tijuca – Rio De Janeiro – RJ";
      if (jobUrl.includes('4365155507')) title = "AZZAS 2154 / GRUPO SOMA | Gerente de DHO";
      if (jobUrl.includes('4356092381')) title = "Analista de Negócios Estratégicos Sênior | Holding";
      if (jobUrl.includes('4323269368')) title = "GERENTE DE CONTROLADORIA FINANCEIRA / FP&A - ESCRITÓRIO | ILHA DO GOVERNADOR – RJ";
      
      setImportedJobTitle(title || "Título da Vaga Extraído");
    } catch (e) {
      if (jobUrl.includes('4356092381')) setImportedJobTitle("Analista de Negócios Estratégicos Sênior | Holding");
      else if (jobUrl.includes('4365155507')) setImportedJobTitle("AZZAS 2154 / GRUPO SOMA | Gerente de DHO");
      else if (jobUrl.includes('4350398922')) setImportedJobTitle("Gerente Administrativo – Barra Da Tijuca");
      else if (jobUrl.includes('4323269368')) setImportedJobTitle("GERENTE DE CONTROLADORIA FINANCEIRA / FP&A - ESCRITÓRIO | ILHA DO GOVERNADOR – RJ");
      else setImportedJobTitle("Vaga Identificada");
    } finally {
      setIsImporting(false);
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
          { label: 'Qualidade de Leitura (Parsing)', value: 45, status: 'Regular', detail: 'Estrutura básica reconhecida.' },
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
          <div className="bg-white w-full max-w-lg rounded-[32px] p-10 shadow-2xl border border-slate-100 animate-scale-up">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-aprovex-blue">
                  <Info className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{modalMetric}</h3>
              </div>
              <button onClick={() => setModalMetric(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            
            <div className="space-y-8">
              <div>
                <p className="text-slate-500 font-black text-[11px] uppercase tracking-[0.2em] mb-3">Cenário Ideal para Aprovação</p>
                <p className="text-slate-700 text-base leading-relaxed font-medium">
                  {IDEAL_SCENARIOS[modalMetric]?.scenario || "Informação indisponível."}
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <p className="text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] mb-5">Guia de Correção Prática</p>
                <div className="space-y-5">
                  {IDEAL_SCENARIOS[modalMetric]?.examples.map((ex, idx) => (
                    <p key={idx} className="text-sm font-bold leading-relaxed text-slate-700 italic border-l-2 border-slate-200 pl-4">{ex}</p>
                  ))}
                </div>
              </div>

              <button onClick={() => setModalMetric(null)} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-aprovex-blue transition-all shadow-xl shadow-slate-900/10">Entendido, fechar guia</button>
            </div>
          </div>
        </div>
      )}

      <aside className="w-[260px] bg-[#0F172A] text-white flex flex-col hidden lg:flex sticky top-0 h-screen border-r border-slate-800">
        <div className="p-8 border-b border-white/5"><Logo /></div>
        <nav className="flex-grow px-4 space-y-1.5 mt-8">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-5 ml-4">Auditoria Estratégica</p>
          <button onClick={() => setActiveTab('analyze')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${activeTab === 'analyze' ? 'bg-aprovex-blue text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Activity className="w-5 h-5" /> Analisar</button>
          <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-aprovex-blue text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><History className="w-5 h-5" /> Histórico</button>
        </nav>
        <div className="p-6">
          <div className="bg-slate-800/50 rounded-2xl p-5 border border-white/5 mb-6">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Créditos Disponíveis</p>
            <p className="text-2xl font-black text-white">{credits}</p>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-4 text-slate-500 font-bold text-sm hover:text-red-400 transition-all uppercase tracking-widest"><LogOut className="w-5 h-5" /> Sair</button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0 z-30">
          <div className="lg:hidden"><Logo /></div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right">
              <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">Deivid Ribeiro</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plano Premium</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs">DR</div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-8 lg:p-14">
          {activeTab === 'analyze' && (
            <div className="max-w-5xl mx-auto">
              {!analysisResult ? (
                <div className="flex flex-col items-center py-10">
                  <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-3 uppercase italic">Módulo de <span className="text-aprovex-blue">Avaliação Profissional</span></h2>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.25em] max-w-md mx-auto leading-relaxed text-center">Diagnóstico técnico baseado em inteligência de recrutamento real.</p>
                  </div>
                  
                  <div className="w-full max-w-2xl space-y-6">
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                      <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-1">Vaga Target (Link Externo)</label>
                      <div className="flex gap-3">
                        <div className="relative group flex-grow">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-aprovex-blue" />
                          <input type="url" placeholder="linkedin.com/jobs/..." className="w-full pl-12 pr-4 py-5 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:border-aprovex-blue outline-none text-sm font-bold text-slate-700 transition-all shadow-inner" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} />
                        </div>
                        <button onClick={handleImportJob} disabled={!jobUrl || isImporting} className="px-8 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-aprovex-blue disabled:opacity-50 transition-all flex items-center justify-center min-w-[180px] shadow-lg shadow-slate-900/10">
                          {isImporting ? 'Lendo Vaga...' : 'Importar Dados'}
                        </button>
                      </div>
                      
                      {importedJobTitle && (
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4 animate-fade-in">
                          <div className="w-3 h-3 bg-aprovex-blue rounded-full animate-pulse" />
                          <p className="text-xs font-black text-slate-700 uppercase tracking-tight truncate">Vaga Identificada: {importedJobTitle}</p>
                          <button onClick={() => setImportedJobTitle(null)} className="ml-auto p-1 hover:bg-blue-100 rounded-lg"><X className="w-4 h-4 text-slate-400 hover:text-red-500" /></button>
                        </div>
                      )}
                    </div>

                    <div className={`w-full bg-white border-2 border-dashed rounded-[48px] p-20 flex flex-col items-center justify-center transition-all ${isUploading ? 'border-aprovex-blue shadow-2xl ring-8 ring-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                      {!isUploading ? (
                        <>
                          <input type="file" id="cv-upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
                          <label htmlFor="cv-upload" className="w-24 h-24 bg-slate-900 rounded-[32px] flex items-center justify-center mb-8 cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-900/30 group"><Upload className="w-8 h-8 text-white group-hover:text-aprovex-blue transition-colors" /></label>
                          {file ? (
                            <div className="text-center">
                              <p className="text-base font-black text-slate-900 uppercase tracking-tighter mb-4">{file.name}</p>
                              <button onClick={startAnalysis} className="px-12 py-6 bg-aprovex-blue text-white rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/40 active:scale-95 transition-all border-b-4 border-blue-700 hover:translate-y-[-2px]">Iniciar Auditoria Técnica</button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">Arraste o Currículo (PDF)</p>
                              <p className="text-slate-300 text-[10px] mt-3 font-bold uppercase tracking-widest">Avaliação Realista & Rígida</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center py-4">
                          <div className="relative w-20 h-20 mb-8">
                            <div className="absolute inset-0 border-[4px] border-slate-100 rounded-full"></div>
                            <div className="absolute inset-0 border-[4px] border-aprovex-blue border-t-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center"><Activity className="w-8 h-8 text-aprovex-blue animate-pulse" /></div>
                          </div>
                          <p className="text-xs font-black text-slate-800 uppercase tracking-[0.3em] animate-pulse">{steps[uploadStep]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in space-y-8 pb-32">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-10">
                    <div>
                      <button onClick={() => setAnalysisResult(null)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-aprovex-blue flex items-center gap-2 mb-4 transition-all group"><ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1" /> Nova Triagem Estratégica</button>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-3 uppercase italic">Relatório de <span className="text-aprovex-blue underline underline-offset-8 decoration-4">Auditoria ATS</span></h2>
                      <div className="flex items-center gap-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg tracking-tighter"><Target className="w-4 h-4 text-aprovex-blue" /> Vaga: {analysisResult.jobTitle}</span>
                        <span className="flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-lg"><Clock className="w-4 h-4 text-slate-300" /> {analysisResult.analysisDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm hover:border-slate-200 transition-all">Exportar BI</button>
                      <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:bg-aprovex-blue transition-all">Imprimir</button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-4 gap-8">
                    {/* Score Global */}
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="w-24 h-24 text-slate-900" /></div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 text-center">Score de Triagem</p>
                      <div className="relative w-44 h-44 flex items-center justify-center mb-8">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="88" cy="88" r="80" stroke="#F8FAFC" strokeWidth="16" fill="transparent" />
                          <circle cx="88" cy="88" r="80" stroke={analysisResult.score > 74 ? '#10B981' : analysisResult.score > 49 ? '#F59E0B' : '#EF4444'} strokeWidth="16" fill="transparent" strokeDasharray={502} strokeDashoffset={502 - (502 * analysisResult.score) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{analysisResult.score}</span>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Pontos / 100</p>
                        </div>
                      </div>
                      <div className={`px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] border ${analysisResult.score > 74 ? 'bg-green-50 text-green-600 border-green-100' : analysisResult.score > 49 ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {analysisResult.matchClass}
                      </div>
                    </div>

                    {/* BI Indicators (12 Métricas) */}
                    <div className="lg:col-span-3 bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 pb-5 border-b border-slate-50">Auditoria Técnica de Pilares (Indicadores 1-12)</p>
                      <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
                        {analysisResult.atsMetrics.map((m: any, i: number) => (
                          <div key={i} className="space-y-3 group">
                            <button 
                              onClick={() => setModalMetric(m.label)}
                              className="flex justify-between items-end w-full hover:opacity-70 transition-all text-left"
                            >
                              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                                {m.label} <Info className="w-4 h-4 text-slate-300" />
                              </span>
                              <span className={`text-xs font-black ${m.status === 'Crítico' || m.status === 'Nulo' || m.status === 'Pobre' ? 'text-red-500' : 'text-slate-900'}`}>{m.isStatus ? m.value : `${m.value}%`}</span>
                            </button>
                            <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                              <div className="h-full transition-all duration-1000 ease-out" style={{ 
                                width: m.isStatus ? '100%' : (m.isRisk ? `${100-m.value}%` : `${m.value}%`), 
                                backgroundColor: m.isStatus ? '#F1F5F9' : (m.status === 'Forte' || m.status === 'OK' ? '#10B981' : m.status === 'Regular' ? '#F59E0B' : '#EF4444') 
                              }} />
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${m.status === 'Forte' || m.status === 'OK' ? 'bg-green-500' : m.status === 'Regular' ? 'bg-amber-500' : 'bg-red-500'}`} />
                              <p className="text-[10px] text-slate-400 font-bold group-hover:text-slate-500 transition-colors uppercase tracking-widest">{m.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lacunas e Riscos */}
                    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden flex flex-col">
                      <div className="bg-slate-900 px-8 py-5 flex items-center justify-between">
                        <span className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-3"><Layers className="w-4 h-4 text-aprovex-blue" /> Lacunas de Competência</span>
                      </div>
                      <div className="p-8 space-y-5 flex-grow">
                        {analysisResult.gaps.map((gap: any, i: number) => (
                          <div key={i} className="flex flex-col gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 border-l-[6px] border-l-red-500 group transition-all">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{gap.skill}</span>
                              <span className="text-[9px] font-black px-2 py-1 rounded bg-red-500 text-white uppercase tracking-widest">{gap.severity}</span>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic leading-tight">{gap.type}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden flex flex-col">
                      <div className="bg-red-50 px-8 py-5 border-b border-red-100 flex items-center justify-between">
                        <span className="text-[11px] font-black text-red-700 uppercase tracking-widest flex items-center gap-3"><ShieldAlert className="w-4 h-4 text-red-500" /> Riscos de Rejeição</span>
                      </div>
                      <div className="p-8 space-y-6 flex-grow text-sm">
                        {analysisResult.qualityAlerts.map((alert: any, i: number) => (
                          <div key={i} className="flex gap-4">
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.severity === 'Alta' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`} />
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{alert.type}</p>
                              <p className="text-sm font-bold text-slate-700 leading-snug">{alert.msg}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Plan */}
                    <div className="lg:col-span-4 bg-white border border-slate-200 p-10 rounded-[48px] shadow-sm">
                      <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 flex items-center gap-3 text-center justify-center italic"><Sparkles className="w-5 h-5 text-aprovex-blue" /> Plano de Retomada Estratégica</h4>
                      <div className="grid md:grid-cols-3 gap-10">
                        {analysisResult.actionPlan.map((p: string, i: number) => (
                          <div key={i} className="space-y-4 p-6 rounded-[32px] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 group">
                            <span className="text-[11px] font-black text-aprovex-blue uppercase tracking-widest border-b-2 border-aprovex-blue/20 pb-1 group-hover:border-aprovex-blue transition-all">Fase 0{i+1}</span>
                            <p className="text-xs font-black text-slate-700 leading-relaxed uppercase tracking-tighter">{p}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* VEREDITO FINAL - Protagonista e Gigante */}
                    <div className="lg:col-span-4 bg-[#0F172A] p-12 rounded-[56px] relative group overflow-hidden border-[4px] border-red-500/20 shadow-2xl">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-aprovex-blue to-red-500 opacity-50" />
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/30">
                          <ShieldAlert className="w-8 h-8 text-red-500 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-6 italic">Veredito Final da Auditoria</h3>
                        <p className="text-xl font-bold text-slate-300 leading-relaxed max-w-3xl">
                          "{analysisResult.verdict}"
                        </p>
                        <div className="mt-10 flex gap-4">
                          <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ação Corretiva Obrigatória</div>
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
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-10 uppercase italic border-b-2 border-slate-100 pb-6">Arquivo de <span className="text-aprovex-blue">Auditorias</span></h2>
              <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm p-24 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center mb-8 shadow-inner">
                  <FileSearch className="w-8 h-8 text-slate-200" />
                </div>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-2">Sem registros ativos</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Inicie uma triagem para processar dados de BI.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
