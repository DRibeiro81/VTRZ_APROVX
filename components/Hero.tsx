import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  onOpenModal: () => void;
}

const corporateImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80"
];

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const [currentImage, setCurrentImage] = useState(corporateImages[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * corporateImages.length);
    setCurrentImage(corporateImages[randomIndex]);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getSrcSet = (url: string) => {
    return `${url}&w=640 640w, ${url}&w=768 768w, ${url}&w=1024 1024w, ${url}&w=1280 1280w`;
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-aprovex-gray/50 border border-aprovex-gray rounded-full px-4 py-1.5 mb-2 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aprovex-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-aprovex-green"></span>
              </span>
              <span className="text-xs font-bold text-aprovex-graphite uppercase tracking-wider">Inteligência de Carreira Vetorizza</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-aprovex-graphite leading-[1.1] tracking-tight animate-fade-in-up delay-100">
              Pare de ser descartado por robôs. <span className="text-aprovex-blue">Seja visto pelo RH.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200">
              Descubra por que seu currículo nunca chega às mãos do recrutador. Analisamos seu perfil com a tecnologia ATS das grandes empresas e entregamos o mapa para sua aprovação.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up delay-300">
              <button 
                onClick={onOpenModal} 
                className="w-full sm:w-auto px-8 py-4 bg-aprovex-blue text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                Aprovar meu currículo
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('como-funciona')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-aprovex-graphite border border-aprovex-gray rounded-lg font-bold text-lg hover:bg-aprovex-gray transition-colors flex items-center justify-center"
              >
                Ver como funciona
              </button>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-500 animate-fade-in-up delay-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-aprovex-green" />
                <span>Padrão ATS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-aprovex-green" />
                <span>Estratégia Vetorizza</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative animate-fade-in-up delay-300">
            <div className="relative rounded-xl bg-aprovex-white p-1 shadow-2xl border border-aprovex-gray">
              <div className="rounded-lg overflow-hidden bg-slate-50 aspect-[4/3] relative group">
                 <img 
                   src={`${currentImage}&w=1200`}
                   srcSet={getSrcSet(currentImage)}
                   sizes="(max-width: 1024px) 100vw, 50vw"
                   alt="Profissional focado" 
                   className="w-full h-full object-cover opacity-90 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-aprovex-graphite/60 to-transparent flex items-end p-6">
                    <div className="bg-white/95 backdrop-blur-sm border border-aprovex-gray p-5 rounded-lg w-full shadow-xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-aprovex-graphite font-bold">Score de Compatibilidade</span>
                            <span className="text-aprovex-green font-extrabold text-xl">92%</span>
                        </div>
                        <div className="w-full bg-aprovex-gray h-3 rounded-full overflow-hidden">
                            <div className="bg-aprovex-green h-full rounded-full transition-all duration-1000" style={{width: '92%'}}></div>
                        </div>
                        <p className="text-slate-600 text-sm mt-3 font-medium">Seu currículo está pronto para vencer os filtros automáticos.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;