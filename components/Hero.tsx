import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  onOpenModal: () => void;
}

// Removed hardcoded width (&w=1200) to allow dynamic resizing via srcSet
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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Definir imagem aleatória
    const randomIndex = Math.floor(Math.random() * corporateImages.length);
    setCurrentImage(corporateImages[randomIndex]);

    // Listener de scroll para o efeito Parallax
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper function to generate srcSet for Unsplash
  const getSrcSet = (url: string) => {
    return `
      ${url}&w=640 640w,
      ${url}&w=768 768w,
      ${url}&w=1024 1024w,
      ${url}&w=1280 1280w,
      ${url}&w=1536 1536w
    `;
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white border border-indigo-100 shadow-sm rounded-full px-4 py-1.5 mb-2 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Tecnologia para sua carreira</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight animate-fade-in-up delay-100">
              Aumente suas chances de aprovação em <span className="text-indigo-600">processos seletivos</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200">
              Deixe de ser ignorado. Nossa inteligência analisa seu perfil, corrige falhas no seu currículo e prepara você estrategicamente para entrevistas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up delay-300">
              <button 
                onClick={onOpenModal} 
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2 hover:-translate-y-1"
              >
                Quero ser aprovado
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('como-funciona')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-colors flex items-center justify-center hover:-translate-y-1"
              >
                Ver como funciona
              </button>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 animate-fade-in-up delay-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Otimizado para ATS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Análise técnica</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative animate-fade-in-up delay-300">
            <div className="relative rounded-2xl bg-slate-900 p-2 shadow-2xl ring-1 ring-slate-900/10">
              <div className="rounded-xl overflow-hidden bg-slate-800 border border-slate-700 aspect-[4/3] relative group">
                 {/* Optimized LCP Image with Parallax */}
                 <img 
                   src={`${currentImage}&w=1200`}
                   srcSet={getSrcSet(currentImage)}
                   sizes="(max-width: 1024px) 100vw, 50vw"
                   alt="Ambiente corporativo e profissional" 
                   width="800"
                   height="600"
                   loading="eager"
                   // @ts-ignore - fetchPriority is valid in modern React/Browsers but types might lag
                   fetchPriority="high"
                   className="w-full h-full object-cover opacity-90 transition-transform duration-700 will-change-transform group-hover:scale-105"
                   style={{
                     transform: `translateY(${scrollY * 0.1}px) scale(1.1)`,
                     transformOrigin: 'top'
                   }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-6">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg w-full animate-float">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white font-medium">Score de Compatibilidade</span>
                            <span className="text-emerald-400 font-bold">92%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out" style={{width: '92%'}}></div>
                        </div>
                        <p className="text-slate-300 text-xs mt-2">Seu currículo está altamente alinhado com a vaga de Tech Lead.</p>
                    </div>
                 </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-indigo-50 hidden md:block animate-float-delayed z-20">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Currículo Otimizado</p>
                    <p className="text-xs text-slate-500">Pronto para envio</p>
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