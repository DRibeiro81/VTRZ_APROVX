import React from 'react';
import { Check } from 'lucide-react';

interface FinalCTAProps {
  onOpenModal: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenModal }) => {
  const handlePlaceholderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenModal();
  };

  return (
    <section id="cta" className="py-24 bg-indigo-600 relative overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Sua próxima vaga está esperando. <br/>
                Seu currículo está pronto?
            </h2>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-10">
                Pare de perder oportunidades por detalhes invisíveis. Use a inteligência da Aprovex e assuma o controle da sua carreira hoje mesmo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={handlePlaceholderClick}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                    Quero aumentar minhas chances
                </button>
                <button 
                  onClick={handlePlaceholderClick}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border border-indigo-300 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors"
                >
                    Ver demonstração
                </button>
            </div>

            <p className="mt-8 text-indigo-200 text-sm font-medium flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Sem promessas irreais. Apenas estratégia e clareza.
            </p>
        </div>
    </section>
  );
};

export default FinalCTA;