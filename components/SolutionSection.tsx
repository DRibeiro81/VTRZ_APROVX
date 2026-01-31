import React from 'react';
import { ScanSearch, FileCheck, Target, TrendingUp } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const SolutionSection: React.FC = () => {
  return (
    <section id="solucao" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
             <RevealOnScroll className="relative">
                <div className="absolute inset-0 bg-indigo-600 rounded-3xl rotate-3 opacity-10"></div>
                <div className="relative bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden group">
                    {/* Scanner Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.7)] z-20 animate-scan"></div>
                    
                    {/* Abstract illustration of the tool */}
                    <div className="absolute top-0 right-0 p-32 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
                    
                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                            <span className="text-slate-400 text-sm">Análise em tempo real</span>
                            <span className="text-emerald-400 text-sm font-mono animate-pulse">Processando...</span>
                        </div>
                        <div className="space-y-3">
                             <div className="h-2 bg-slate-700 rounded-full w-3/4"></div>
                             <div className="h-2 bg-slate-700 rounded-full w-1/2"></div>
                             <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 mt-4 hover:border-red-500/50 transition-colors duration-500">
                                <p className="text-sm text-red-300 flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    Alerta: Palavras-chave ausentes
                                </p>
                                <p className="text-xs text-slate-400">
                                    A vaga exige "Gestão Ágil" e "Scrum", mas seu perfil não destaca essas experiências.
                                </p>
                             </div>
                             <div className="p-4 bg-indigo-900/40 rounded-lg border border-indigo-500/30 hover:bg-indigo-900/60 transition-colors duration-500">
                                <p className="text-sm text-indigo-300 flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                    Sugestão de Melhoria
                                </p>
                                <p className="text-xs text-slate-300">
                                    Adicione uma seção de "Resultados" quantificando seus projetos anteriores.
                                </p>
                             </div>
                        </div>
                    </div>
                </div>
             </RevealOnScroll>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <RevealOnScroll>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Tecnologia que coloca você na frente da concorrência.
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                A Aprovex não é apenas um "corretor de texto". É uma plataforma de inteligência de carreira que decodifica o que as empresas buscam e adapta seu perfil para dar match.
                </p>
            </RevealOnScroll>

            <div className="space-y-6">
              <RevealOnScroll delay={200}>
                <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <ScanSearch className="w-6 h-6" />
                    </div>
                    <div>
                    <h4 className="text-xl font-bold text-slate-900">Análise Inteligente de Currículo</h4>
                    <p className="text-slate-600 mt-1">Identificamos falhas estruturais, erros de formatação e ausência de termos técnicos que o mercado exige.</p>
                    </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={400}>
                <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Target className="w-6 h-6" />
                    </div>
                    <div>
                    <h4 className="text-xl font-bold text-slate-900">Compatibilidade com Vagas</h4>
                    <p className="text-slate-600 mt-1">Cole a descrição da vaga e descubra exatamente o que precisa ajustar no seu perfil para ser o candidato ideal.</p>
                    </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={600}>
                <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                    <h4 className="text-xl font-bold text-slate-900">Feedback Acionável</h4>
                    <p className="text-slate-600 mt-1">Nada de dicas genéricas. Receba sugestões práticas de "o que escrever" e "como escrever".</p>
                    </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolutionSection;