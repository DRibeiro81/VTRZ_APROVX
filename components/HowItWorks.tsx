import React, { useState } from 'react';
import { Upload, Sliders, FileText, Briefcase } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface HowItWorksProps {
  onOpenModal: () => void;
}

const steps = [
  {
    icon: Upload,
    title: "1. Envie seu perfil",
    description: "Faça upload do seu currículo atual (PDF ou LinkedIn) para nossa base segura.",
    tooltip: "Suportamos PDF, DOCX e integração direta com exportação do LinkedIn."
  },
  {
    icon: Sliders,
    title: "2. Escolha o alvo",
    description: "Indique a vaga ou o cargo que deseja conquistar. A estratégia muda conforme o objetivo.",
    tooltip: "Nossa IA ajusta as palavras-chave baseada na descrição da vaga desejada."
  },
  {
    icon: FileText,
    title: "3. Receba o diagnóstico",
    description: "Nossa IA analisa a compatibilidade e gera um relatório de melhorias obrigatórias.",
    tooltip: "Identificamos falhas de formatação ATS e gaps de competências técnicas."
  },
  {
    icon: Briefcase,
    title: "4. Prepare-se",
    description: "Acesse simuladores de entrevista focados nas perguntas mais comuns para sua área.",
    tooltip: "Banco com +500 perguntas reais de empresas Tech e Corporativas."
  }
];

const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenModal }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="como-funciona" className="py-20 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <RevealOnScroll>
            <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como a Aprovex funciona</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Um processo simples, lógico e orientado a dados para transformar sua busca por emprego.
            </p>
            </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-800 -z-10 transform translate-y-4"></div>

          {steps.map((step, index) => (
            <RevealOnScroll key={index} delay={index * 200}>
                <div className="relative group flex flex-col items-center">
                
                {/* Icon Container with Tooltip Logic */}
                <div 
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {/* Tooltip Bubble */}
                    <div 
                    className={`absolute -top-24 left-1/2 transform -translate-x-1/2 w-48 bg-white text-slate-900 text-xs font-semibold p-3 rounded-lg shadow-xl text-center pointer-events-none transition-all duration-300 z-20 ${
                        hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                    role="tooltip"
                    >
                    {step.tooltip}
                    {/* Tooltip Arrow */}
                    <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
                    </div>

                    <div className="w-16 h-16 bg-slate-800 border-2 border-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-transform group-hover:-translate-y-2 duration-300 cursor-help z-10 relative">
                    <step.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                </div>

                <div className="text-center px-2">
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                    {step.description}
                    </p>
                </div>
                </div>
            </RevealOnScroll>
          ))}
        </div>
        
        <RevealOnScroll delay={600}>
            <div className="mt-16 text-center">
                <button onClick={onOpenModal} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-all inline-flex items-center gap-2 hover:shadow-lg hover:-translate-y-1">
                    Começar análise gratuita
                </button>
            </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default HowItWorks;