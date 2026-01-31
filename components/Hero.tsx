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
  return (
    <section className="relative min-h-screen flex items-center bg-white pt-20">
      {/* Background: Half-split style like Cimed */}
      <div className="absolute inset-0 flex flex-col lg:flex-row pointer-events-none">
        <div className="w-full lg:w-1/2 bg-white"></div>
        <div className="w-full lg:w-1/2 bg-aprovex-gray/30 relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
            className="w-full h-full object-cover mix-blend-multiply opacity-80"
            alt="Profissional de RH"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="w-full lg:w-3/5 space-y-10 py-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-aprovex-blue">
                <div className="w-12 h-[2px] bg-aprovex-blue"></div>
                <span className="text-sm font-black uppercase tracking-[0.2em]">Tecnologia Vetorizza</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-[88px] font-black text-aprovex-graphite leading-[0.95] tracking-tighter">
                O FIM DO <br />
                <span className="text-aprovex-blue italic">DESCARTADO</span> <br />
                PELO ROBÔ.
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-aprovex-graphite/70 max-w-xl font-medium leading-tight">
              Seu currículo não é o problema. O filtro é. <br />
              Use a mesma inteligência do RH para ser aprovado.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 shadow-2xl rounded-sm overflow-hidden max-w-lg">
              <button 
                onClick={onOpenModal} 
                className="flex-[2] px-10 py-6 bg-aprovex-blue text-white font-black text-xl hover:bg-blue-700 transition-all uppercase tracking-tighter"
              >
                Analisar Currículo
              </button>
              <button 
                onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 px-8 py-6 bg-aprovex-graphite text-white font-bold text-sm hover:bg-black transition-all uppercase tracking-tighter border-l border-white/10"
              >
                Explorar
              </button>
            </div>

            <div className="flex items-center gap-10 pt-8 border-t border-aprovex-gray">
              <div>
                <p className="text-[10px] font-black uppercase text-aprovex-blue tracking-widest mb-1">Status</p>
                <p className="text-lg font-black text-aprovex-graphite flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-aprovex-green animate-pulse"></span>
                  SISTEMA ONLINE
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-aprovex-blue tracking-widest mb-1">Precisão</p>
                <p className="text-lg font-black text-aprovex-graphite">99.8% ATS MATCH</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

  );
};

export default Hero;