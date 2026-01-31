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
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FFFFFF]">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1C1C1C 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      {/* Soft Blue Glows */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-aprovex-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-aprovex-green/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          <div className="w-full lg:w-[55%] space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-aprovex-blue/5 border border-aprovex-blue/10 rounded-full px-4 py-2 animate-fade-in-up">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-aprovex-gray flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-[13px] font-bold text-aprovex-blue">+1.200 currículos otimizados este mês</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-[68px] font-black text-aprovex-graphite leading-[1.05] tracking-tight animate-fade-in-up delay-100">
              O segredo para vencer o <span className="text-aprovex-blue">filtro do RH</span> está aqui.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium animate-fade-in-up delay-200">
              Não adianta ter experiência se o robô te descarta em segundos. Use a tecnologia <span className="text-aprovex-graphite font-bold underline decoration-aprovex-blue/30">AproveX by Vetorizza</span> para garantir que seu currículo chegue aos olhos de quem contrata.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 animate-fade-in-up delay-300">
              <button 
                onClick={onOpenModal} 
                className="group w-full sm:w-auto px-10 py-5 bg-aprovex-blue text-white rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-[0_20px_40px_-15px_rgba(31,79,216,0.3)] hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                Analise meu Currículo agora
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4 text-aprovex-graphite/60 font-bold uppercase text-xs tracking-widest">
                <span className="w-10 h-[1px] bg-aprovex-gray"></span>
                Disponibilidade Imediata
              </div>
            </div>

            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 animate-fade-in-up delay-500">
              {[
                { label: 'Nota ATS', value: 'Instantânea' },
                { label: 'Keywords', value: 'Estratégicas' },
                { label: 'Aprovação', value: 'Garantida*' }
              ].map((stat, idx) => (
                <div key={idx} className="border-l-2 border-aprovex-gray pl-4">
                  <p className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">{stat.label}</p>
                  <p className="text-base font-black text-aprovex-graphite">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[45%] relative animate-fade-in-up delay-300">
            <div className="relative group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-aprovex-blue/10 to-transparent rounded-[32px] blur-2xl opacity-50"></div>
              
              <div className="relative rounded-3xl bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border border-aprovex-gray overflow-hidden">
                <div className="bg-aprovex-gray/30 p-4 border-b border-aprovex-gray flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-aprovex-green"></div>
                  </div>
                  <div className="mx-auto bg-white px-3 py-1 rounded-md text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-aprovex-gray/50">
                    ATS-SCANNER-V2.0.exe
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-2xl font-black text-aprovex-graphite">Análise Final</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase">Status: <span className="text-aprovex-green">Otimizado</span></p>
                    </div>
                    <div className="w-20 h-20 rounded-full border-4 border-aprovex-green/20 flex items-center justify-center relative">
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="40" cy="40" r="36" fill="none" stroke="#2DBE7F" strokeWidth="4" strokeDasharray="226" strokeDashoffset="22" strokeLinecap="round" />
                      </svg>
                      <span className="text-xl font-black text-aprovex-graphite">92%</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'Palavras-chave', score: 95 },
                      { name: 'Formatação Técnica', score: 88 },
                      { name: 'Relevância da Vaga', score: 90 }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-[11px] font-black uppercase text-slate-500">
                          <span>{item.name}</span>
                          <span>{item.score}%</span>
                        </div>
                        <div className="h-1.5 bg-aprovex-gray rounded-full overflow-hidden">
                          <div className="h-full bg-aprovex-blue transition-all duration-1000" style={{ width: `${item.score}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-aprovex-blue p-4 rounded-xl text-center">
                    <p className="text-white text-xs font-bold">🎯 Seu currículo está no top 3% dos candidatos!</p>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-6 -right-6 bg-aprovex-graphite text-white p-4 rounded-2xl shadow-2xl animate-float hidden md:block">
                <CheckCircle className="w-6 h-6 text-aprovex-green mb-1" />
                <p className="text-[10px] font-bold uppercase text-slate-400">Padrão</p>
                <p className="font-black text-sm leading-tight">Vetorizza<br/>Approved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Hero;