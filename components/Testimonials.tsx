import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Ricardo S.",
    role: "Desenvolvedor Full Stack",
    content: "Eu não entendia por que não passava da triagem. A Aprovex mostrou que meu currículo não tinha as palavras-chave que os robôs buscavam. Ajustei e em 2 semanas consegui 5 entrevistas.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "Mariana L.",
    role: "Gerente de Marketing",
    content: "O feedback é muito direto. Sem enrolação. A ferramenta apontou que eu falava muito de 'tarefas' e pouco de 'resultados'. Mudei minha abordagem e fui contratada no mês seguinte.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "Carlos Eduardo",
    role: "Analista Financeiro",
    content: "Vale cada centavo. A simulação de entrevista me ajudou a ficar calmo e responder com segurança. A sensação de ir preparado é outra coisa.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quem usou, aprovou</h2>
          <p className="text-slate-400">Junte-se a centenas de profissionais recolocados.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative">
              <div className="flex gap-1 mb-4 text-emerald-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-slate-300 mb-6 italic">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover" />
                <div>
                  <h5 className="font-bold text-white">{t.name}</h5>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos Placeholder */}
        <div className="mt-20 pt-10 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm font-medium mb-6 uppercase tracking-wider">Nossos usuários hoje trabalham em</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
                <span className="text-2xl font-bold text-slate-400">TechCorp</span>
                <span className="text-2xl font-bold text-slate-400">FinStart</span>
                <span className="text-2xl font-bold text-slate-400">GlobalConsult</span>
                <span className="text-2xl font-bold text-slate-400">AgroBusiness</span>
                <span className="text-2xl font-bold text-slate-400">RetailGiant</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;