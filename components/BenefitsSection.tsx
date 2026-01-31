import React from 'react';
import { Clock, ThumbsUp, TrendingUp, ShieldCheck } from 'lucide-react';

interface BenefitsSectionProps {
  onOpenModal: () => void;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onOpenModal }) => {
  
  const handleLinkClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onOpenModal();
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <TrendingUp className="w-8 h-8 text-indigo-600 mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-slate-900">Mais Entrevistas</h4>
                    <p className="text-sm text-slate-600">Usuários relatam aumento de até 3x no número de convites para entrevistas.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <ShieldCheck className="w-8 h-8 text-indigo-600 mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-slate-900">Segurança</h4>
                    <p className="text-sm text-slate-600">Vá para a entrevista sabendo exatamente o que destacar no seu perfil.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <Clock className="w-8 h-8 text-indigo-600 mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-slate-900">Economia de Tempo</h4>
                    <p className="text-sm text-slate-600">Pare de adivinhar. Focamos no que realmente importa para os recrutadores.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <ThumbsUp className="w-8 h-8 text-indigo-600 mb-4" />
                    <h4 className="font-bold text-lg mb-2 text-slate-900">Aprovação em ATS</h4>
                    <p className="text-sm text-slate-600">Seu currículo formatado para passar pelos filtros automáticos das grandes empresas.</p>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Não é mágica. <br/>É estratégia profissional.
                </h2>
                <p className="text-slate-600 text-lg">
                    O mercado de trabalho mudou. As empresas usam tecnologia para filtrar candidatos. A Aprovex é a sua ferramenta para usar a mesma tecnologia a seu favor.
                </p>
                <p className="text-slate-600 text-lg">
                    Nossa missão é eliminar a frustração da "caixa de entrada vazia" e colocar você na cadeira da entrevista.
                </p>
                <div className="pt-4">
                    <a href="#" onClick={handleLinkClick} className="text-indigo-600 font-bold hover:underline flex items-center gap-2">
                        Ver planos e preços
                    </a>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;