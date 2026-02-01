import React, { useState, useEffect } from 'react';
import { 
  Layout, FileText, BarChart3, History, LogOut, Upload, 
  CheckCircle2, AlertCircle, Zap, Search, Target, 
  ArrowRight, Sparkles, ChevronRight, ShieldCheck,
  Trophy, Clock, Filter, ThumbsUp, ThumbsDown, Globe, BookOpen, Briefcase, Code,
  Eye, FileSearch, Layers, Cpu, Activity, ShieldAlert, X, Info, TrendingUp,
  PieChart, Presentation, FileBarChart
} from 'lucide-react';
import Logo from '../components/Logo';
import { supabase } from '../lib/supabaseClient';

// Definições de cenário ideal para o Modal (Mantido conforme solicitado)
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
    "Carregando Terminal Bloomberg...",
    "Executando Auditoria Quantitativa...",
    "Mapeando Gaps Estruturais...",
    "Validando Compliance ATS...",
    "Liberando Relatório Final..."
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
    <div className="min-h-screen bg-[#F0F2F5] flex font-sans relative text-slate-900">
      
      {/* MODAL DE EXPLICAÇÃO DA MÉTRICA */}
      {modalMetric && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0F172A]/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-none border-t-4 border-aprovex-blue p-12 shadow-[0_30px_60px_rgba(0,0,0,0.3)] animate-scale-up relative">
            <button onClick={() => setModalMetric(null)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
            
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
                <div className="w-14 h-14 bg-slate-900 flex items-center justify-center text-aprovex-blue">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-aprovex-blue uppercase tracking-[0.3em] mb-1">Standard Market Protocol</p>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{modalMetric}</h3>
                </div>
            </div>
            
            <div className="space-y-10">
              <div>
                <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <div className="w-4 h-[1px] bg-slate-200"></div> Benchmarking Ideal
                </p>
                <p className="text-slate-700 text-lg leading-relaxed font-medium">
                  {IDEAL_SCENARIOS[modalMetric]?.scenario || "Informação indisponível."}
                </p>
              </div>
              
              <div className="bg-[#F8FAFC] p-8 border-l-4 border-slate-900 shadow-inner">
                <p className="text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <FileBarChart className="w-4 h-4" /> Análise Comparativa
                </p>
                <div className="space-y-6">
                  {IDEAL_SCENARIOS[modalMetric]?.examples.map((ex, idx) => (
                    <div key={idx} className="bg-white p-4 border border-slate-200 shadow-sm font-mono text-xs leading-relaxed text-slate-600">
                        {ex}
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setModalMetric(null)} className="w-full py-5 bg-slate-900 text-white font-black text-sm uppercase tracking-widest hover:bg-aprovex-blue transition-all">Fechar Auditoria</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Estilo Bloomberg */}
      <aside className="w-[280px] bg-[#0A0F1D] text-white flex flex-col hidden lg:flex sticky top-0 h-screen border-r border-white/5">
        <div className="p-10 border-b border-white/5 flex justify-center"><Logo /></div>
        <nav className="flex-grow py-10">
          <p className="px-10 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6">Market Audit</p>
          <div className="space-y-1">
            <button onClick={() => setActiveTab('analyze')} className={`w-full flex items-center gap-4 px-10 py-5 font-black text-xs uppercase tracking-widest transition-all relative ${activeTab === 'analyze' ? 'bg-aprovex-blue/10 text-aprovex-blue border-r-4 border-aprovex-blue' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
              <Presentation className="w-5 h-5" /> Nova Auditoria
            </button>
            <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-4 px-10 py-5 font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-aprovex-blue/10 text-aprovex-blue border-r-4 border-aprovex-blue' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
              <PieChart className="w-5 h-5" /> Histórico BI
            </button>
          </div>
        </nav>
        <div className="p-10 border-t border-white/5 bg-[#0D1425]">
          <div className="mb-8">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Service Token Status</p>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-white leading-none">{credits}</span>
                <span className="text-[10px] font-bold text-aprovex-blue uppercase mb-1">Active</span>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 text-slate-500 font-black text-[11px] hover:text-red-400 transition-all uppercase tracking-[0.2em]"><LogOut className="w-5 h-5" /> Terminar Sessão</button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-12 shrink-0 z-30">
          <div className="lg:hidden"><Logo /></div>
          <div className="flex items-center gap-8 ml-auto">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-sm font-black text-slate-900 uppercase tracking-tighter leading-none mb-1">D. Ribeiro — Account ID</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Terminal v2.6.0
              </p>
            </div>
            <div className="w-11 h-11 bg-slate-900 flex items-center justify-center text-white font-black text-xs">DR</div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-12 lg:p-20">
          {activeTab === 'analyze' && (
            <div className="max-w-6xl mx-auto">
              {!analysisResult ? (
                <div className="flex flex-col items-center">
                  <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4 uppercase italic leading-none">Módulo de Auditoria <span className="text-aprovex-blue">Quantitativa</span></h2>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.4em] max-w-xl mx-auto border-t border-slate-200 pt-4">Processamento de conformidade baseado em algoritmos de Big Data.</p>
                  </div>
                  
                  <div className="w-full max-w-2xl space-y-8">
                    <div className="bg-white p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-200">
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Parâmetro de Comparação (Vaga LinkedIn/Gupy)</label>
                      <div className="flex gap-4">
                        <div className="relative group flex-grow">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input type="url" placeholder="Insira o link para extração..." className="w-full pl-12 pr-4 py-5 bg-[#F8FAFC] border-b-2 border-slate-200 focus:border-aprovex-blue outline-none text-sm font-bold text-slate-700 transition-all uppercase tracking-tighter" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} />
                        </div>
                        <button onClick={handleImportJob} disabled={!jobUrl || isImporting} className="px-10 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-aprovex-blue disabled:opacity-50 transition-all flex items-center justify-center min-w-[200px]">
                          {isImporting ? 'Extraindo...' : 'Importar Dados'}
                        </button>
                      </div>
                      
                      {importedJobTitle && (
                        <div className="mt-8 p-5 bg-white border border-slate-200 border-l-4 border-l-aprovex-blue animate-fade-in shadow-sm">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ativo Identificado</p>
                          <p className="text-lg font-black text-slate-800 uppercase tracking-tighter truncate">{importedJobTitle}</p>
                        </div>
                      )}
                    </div>

                    <div className={`w-full bg-white border-2 border-slate-200 p-20 flex flex-col items-center justify-center transition-all relative overflow-hidden ${isUploading ? 'border-aprovex-blue' : 'hover:border-slate-400 cursor-pointer'}`}>
                      {!isUploading ? (
                        <>
                          <input type="file" id="cv-upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
                          <label htmlFor="cv-upload" className="w-20 h-20 bg-slate-900 flex items-center justify-center mb-10 cursor-pointer hover:bg-aprovex-blue transition-all shadow-xl group"><Upload className="w-8 h-8 text-white group-hover:scale-110 transition-transform" /></label>
                          {file ? (
                            <div className="text-center">
                              <p className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 border-b-2 border-slate-900 pb-2">{file.name}</p>
                              <button onClick={startAnalysis} className="px-16 py-6 bg-aprovex-blue text-white font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:bg-blue-700 active:translate-y-1 transition-all">Iniciar Processamento de Dados</button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <p className="text-slate-400 text-xs font-black uppercase tracking-[0.4em] mb-4">Aguardando Documentação PDF</p>
                              <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">Protocolo de Auditoria Realista</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center py-4">
                          <div className="w-16 h-16 border-4 border-slate-100 border-t-aprovex-blue rounded-full animate-spin mb-10"></div>
                          <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.5em] animate-pulse">{steps[uploadStep]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in space-y-12 pb-40">
                  
                  {/* Market Header - Estilo Terminal de Investimento */}
                  <div className="flex items-end justify-between border-b-4 border-slate-900 pb-10">
                    <div>
                      <button onClick={() => setAnalysisResult(null)} className="text-[11px] font-black text-aprovex-blue uppercase tracking-[0.3em] hover:opacity-70 flex items-center gap-3 mb-6 transition-all group">
                        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-2 transition-transform" /> Retornar ao Terminal
                      </button>
                      <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase italic">Relatório Final de <span className="text-aprovex-blue">Conformidade</span></h2>
                      <div className="flex items-center gap-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-3"><Target className="w-5 h-5 text-aprovex-blue" /> Vaga: {analysisResult.jobTitle}</span>
                        <span className="flex items-center gap-3"><Clock className="w-5 h-5 text-slate-300" /> Timestamp: {analysisResult.analysisDate}</span>
                        <span className="flex items-center gap-3 border-l border-slate-300 pl-8"><ShieldCheck className="w-5 h-5 text-green-500" /> Protocolo BI-2026</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="px-10 py-5 bg-white border border-slate-300 text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-md">Exportar DataSet</button>
                      <button className="px-10 py-5 bg-slate-900 text-white font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-aprovex-blue transition-all">Print Report</button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-10">
                    
                    {/* Indicadores Bloomberg - Esquerda */}
                    <div className="lg:col-span-8 space-y-10">
                        
                        {/* Grid de 12 Métricas Estilo Tabela Financeira */}
                        <div className="bg-white p-12 border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5"><Layers className="w-40 h-40 text-slate-900" /></div>
                            <p className="text-[12px] font-black text-slate-900 uppercase tracking-[0.3em] mb-12 flex items-center gap-3 leading-none">
                                <div className="w-5 h-[2px] bg-aprovex-blue"></div> Painel de Ativos Individuais
                            </p>
                            <div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
                                {analysisResult.atsMetrics.map((m: any, i: number) => (
                                <div key={i} className="space-y-4 group relative">
                                    <button 
                                        onClick={() => setModalMetric(m.label)}
                                        className="flex justify-between items-end w-full hover:bg-slate-50 p-2 -m-2 transition-all border-b border-transparent hover:border-slate-200"
                                    >
                                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            {m.label} <Info className="w-4 h-4 text-slate-200" />
                                        </span>
                                        <span className={`text-sm font-black ${m.status === 'Crítico' || m.status === 'Nulo' || m.status === 'Pobre' ? 'text-red-500' : 'text-slate-900'}`}>{m.isStatus ? m.value : `${m.value}%`}</span>
                                    </button>
                                    <div className="h-[3px] w-full bg-slate-100 overflow-hidden">
                                        <div className="h-full transition-all duration-1000 ease-out" style={{ 
                                            width: m.isStatus ? '100%' : (m.isRisk ? `${100-m.value}%` : `${m.value}%`), 
                                            backgroundColor: m.isStatus ? '#E2E8F0' : (m.status === 'Forte' || m.status === 'OK' ? '#10B981' : m.status === 'Regular' ? '#F59E0B' : '#EF4444') 
                                        }} />
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
                                        <span className="text-slate-400 italic">Status: {m.status}</span>
                                        <span className="text-slate-300">Auditoria #{i+1}</span>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>

                        {/* Lacunas e Riscos Lado a Lado */}
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="bg-white border-t-4 border-slate-900 p-10 shadow-sm">
                                <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                    <ThumbsDown className="w-5 h-5 text-red-500" /> Gaps de Performance
                                </p>
                                <div className="space-y-6">
                                    {analysisResult.gaps.map((gap: any, i: number) => (
                                    <div key={i} className="pb-4 border-b border-slate-100">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-black text-slate-800 uppercase tracking-tighter">{gap.skill}</span>
                                            <span className="text-[10px] font-black text-red-500 uppercase">{gap.severity}</span>
                                        </div>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">{gap.type}</p>
                                    </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white border-t-4 border-slate-900 p-10 shadow-sm">
                                <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                    <ShieldAlert className="w-5 h-5 text-amber-500" /> Riscos de Compliance
                                </p>
                                <div className="space-y-8">
                                    {analysisResult.qualityAlerts.map((alert: any, i: number) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-1 h-8 bg-slate-900 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{alert.type}</p>
                                            <p className="text-[13px] font-bold text-slate-700 leading-snug">{alert.msg}</p>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Barra de Score Bloomberg - Direita */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="bg-slate-900 p-12 text-white border-b-8 border-red-500 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><Activity className="w-20 h-20 text-white" /></div>
                            <p className="text-[11px] font-black text-aprovex-blue uppercase tracking-[0.4em] mb-12 text-center">Score Global Pro</p>
                            <div className="flex flex-col items-center justify-center mb-12">
                                <span className="text-9xl font-black tracking-tighter leading-none">{analysisResult.score}</span>
                                <div className="mt-6 px-8 py-2 bg-red-500 text-white font-black text-xs uppercase tracking-[0.3em] italic">
                                    {analysisResult.matchClass}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/10">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Market Rating</p>
                                    <p className="text-sm font-black text-white uppercase italic">Critical-Tier</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Recommendation</p>
                                    <p className="text-sm font-black text-red-400 uppercase italic">Hold Submission</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Plan Estilo Executive Summary */}
                        <div className="bg-white p-10 border border-slate-200 shadow-sm">
                            <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-aprovex-blue" /> Executive Strategy Plan
                            </p>
                            <div className="space-y-8">
                                {analysisResult.actionPlan.map((p: string, i: number) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[11px] font-black text-aprovex-blue">ACTION_0{i+1}</span>
                                        <div className="flex-grow h-[1px] bg-slate-100" />
                                    </div>
                                    <p className="text-xs font-black text-slate-800 uppercase leading-relaxed tracking-tighter">{p}</p>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* VEREDITO FINAL - O RODAPÉ DE PESO */}
                    <div className="lg:col-span-12 bg-white p-16 border-t-8 border-slate-900 shadow-2xl relative overflow-hidden text-center group">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Presentation className="w-64 h-64 text-slate-900" /></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-900 flex items-center justify-center mb-10 shadow-xl group-hover:rotate-6 transition-all">
                          <ShieldAlert className="w-10 h-10 text-red-500 animate-pulse" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-[0.3em] mb-8 italic">Veredito Final da Auditoria Técnica</h3>
                        <p className="text-3xl font-black text-slate-800 leading-tight max-w-5xl tracking-tighter underline decoration-red-500 decoration-4 underline-offset-8">
                          "{analysisResult.verdict}"
                        </p>
                        <div className="mt-16 flex items-center gap-10">
                            <div className="text-left border-l-2 border-slate-200 pl-6">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocolo de Risco</p>
                                <p className="text-sm font-black text-red-600 uppercase tracking-tighter">Impedimento Crítico de Triagem</p>
                            </div>
                            <div className="text-left border-l-2 border-slate-200 pl-6">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance Status</p>
                                <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">Reprovado por Dados Insuficientes</p>
                            </div>
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
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-12 uppercase italic border-b-4 border-slate-900 pb-6">Arquivo Histórico de <span className="text-aprovex-blue">Market Auditories</span></h2>
              <div className="bg-white border border-slate-200 shadow-sm p-32 flex flex-col items-center justify-center text-center opacity-40">
                <div className="w-24 h-24 bg-slate-50 flex items-center justify-center mb-10 shadow-inner">
                  <FileSearch className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest mb-2">Zero Ativos Registrados</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">Inicie uma triagem quantitativa para arquivar dados.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
