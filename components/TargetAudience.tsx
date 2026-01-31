import React from 'react';
import { Users, Briefcase, Code, ArrowUpRight } from 'lucide-react';

const TargetAudience: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Para quem é a Aprovex?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Desenvolvemos nossa plataforma pensando nas dores reais do mercado brasileiro de trabalho.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-8 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-slate-100">
            <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Profissionais Tech</h3>
            <p className="text-slate-600 mb-4">
              Devs, Designers e PMs que precisam destacar hard skills e projetos sem parecerem arrogantes ou técnicos demais.
            </p>
            <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" /> Vagas remotas e internacionais
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" /> Adaptação para LinkedIn
                </li>
            </ul>
          </div>

          <div className="group p-8 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-slate-100">
            <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Corporativo & Executivos</h3>
            <p className="text-slate-600 mb-4">
              Analistas e Gerentes buscando transição de carreira ou recolocação (CLT/PJ) em grandes empresas.
            </p>
            <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" /> Foco em resultados
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" /> Liderança e gestão
                </li>
            </ul>
          </div>

          <div className="group p-8 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-slate-100">
            <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Em Busca de Recolocação</h3>
            <p className="text-slate-600 mb-4">
              Quem envia dezenas de currículos e não tem retorno. Ajudamos a quebrar o ciclo da rejeição silenciosa.
            </p>
            <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" /> Diagnóstico de erros
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" /> Otimização de perfil
                </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;