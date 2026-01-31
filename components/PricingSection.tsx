import React from 'react';
import { Check, Zap } from 'lucide-react';

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      credits: "1 Análise",
      price: "19,90",
      description: "Ideal para testar em uma vaga específica agora.",
      features: ["Análise Completa de IA", "Score ATS", "Dicas de Melhoria", "Entrega via E-mail"],
      buttonText: "Comprar 1 Crédito",
      highlight: false
    },
    {
      name: "Professional",
      credits: "5 Análises",
      price: "49,90",
      description: "O melhor custo-benefício para sua busca.",
      features: ["Tudo do Starter", "Economia de 50%", "Prioridade no Processamento", "Suporte Premium"],
      buttonText: "Comprar 5 Créditos",
      highlight: true
    },
    {
      name: "Ultimate",
      credits: "20 Análises",
      price: "139,90",
      description: "Para quem não aceita nada menos que a aprovação.",
      features: ["Tudo do Professional", "Menor preço por análise", "Acesso Vitalício aos Créditos", "Checklist de Entrevista"],
      buttonText: "Comprar 20 Créditos",
      highlight: false
    }
  ];

  return (
    <section id="precos" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-aprovex-graphite tracking-tighter mb-4 uppercase">
            Invista na sua <span className="text-aprovex-blue">Aprovação</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">Escolha o pacote de créditos ideal para o seu momento de carreira.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-8 rounded-[32px] border-2 transition-all ${
                plan.highlight 
                ? 'border-aprovex-blue bg-white shadow-2xl scale-105 z-10' 
                : 'border-aprovex-gray bg-aprovex-gray/10 hover:border-aprovex-blue/30'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-aprovex-blue text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  Mais Vendido
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-black text-aprovex-graphite uppercase mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm font-medium leading-tight">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-aprovex-graphite">R$</span>
                  <span className="text-5xl font-black text-aprovex-graphite tracking-tighter">{plan.price}</span>
                </div>
                <p className="text-aprovex-blue font-bold text-lg mt-2">{plan.credits}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <Check className="w-5 h-5 text-aprovex-green shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-2 ${
                plan.highlight 
                ? 'bg-aprovex-blue text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20' 
                : 'bg-aprovex-graphite text-white hover:bg-black'
              }`}>
                {plan.buttonText}
                <Zap className="w-5 h-5 fill-current" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;