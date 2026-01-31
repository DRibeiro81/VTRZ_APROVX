import React, { useState } from 'react';
import { Check, Zap, Tag } from 'lucide-react';

const PricingSection: React.FC = () => {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [couponMessage, setCouponMessage] = useState({ text: '', type: '' });

  const plans = [
    {
      id: "starter",
      name: "Starter",
      credits: "1 Análise",
      price: 19.90,
      description: "Ideal para testar em uma vaga específica agora.",
      features: ["Análise Completa de IA", "Score ATS", "Dicas de Melhoria", "Entrega via E-mail"],
      buttonText: "Comprar 1 Crédito",
      highlight: false
    },
    {
      id: "professional",
      name: "Professional",
      credits: "5 Análises",
      price: 49.90,
      description: "O melhor custo-benefício para sua busca.",
      features: ["Tudo do Starter", "Economia de 50%", "Prioridade no Processamento", "Suporte Premium"],
      buttonText: "Comprar 5 Créditos",
      highlight: true
    },
    {
      id: "ultimate",
      name: "Ultimate",
      credits: "20 Análises",
      price: 139.90,
      description: "Para quem não aceita nada menos que a aprovação.",
      features: ["Tudo do Professional", "Menor preço por análise", "Acesso Vitalício aos Créditos", "Checklist de Entrevista"],
      buttonText: "Comprar 20 Créditos",
      highlight: false
    }
  ];

  const handleApplyCoupon = () => {
    if (!coupon) return;
    setIsVerifying(true);
    
    // Simulação de validação (será integrada ao Supabase depois)
    setTimeout(() => {
      if (coupon.toUpperCase() === 'APROVEX10') {
        setDiscount(0.10);
        setCouponMessage({ text: 'Cupom de 10% aplicado!', type: 'success' });
      } else {
        setDiscount(0);
        setCouponMessage({ text: 'Cupom inválido.', type: 'error' });
      }
      setIsVerifying(false);
    }, 800);
  };

  const calculatePrice = (price: number) => {
    const finalPrice = price * (1 - discount);
    return finalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const handlePurchase = (planId: string) => {
    console.log(`Iniciando checkout Mercado Pago para o plano: ${planId} com cupom: ${coupon}`);
    // Aqui entrará a integração com o Mercado Pago
    alert('Redirecionando para o checkout seguro do Mercado Pago...');
  };

  return (
    <section id="precos" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black text-aprovex-graphite tracking-tighter mb-4 uppercase">
            Invista na sua <span className="text-aprovex-blue">Aprovação</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">Escolha o pacote de créditos ideal para o seu momento de carreira.</p>
        </div>

        {/* Coupon Section */}
        <div className="max-w-md mx-auto mb-16 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <div className="flex items-center gap-2 mb-3 text-aprovex-graphite font-bold">
            <Tag className="w-5 h-5 text-aprovex-blue" />
            <span>Tem um cupom de desconto?</span>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Digite seu cupom"
              className="flex-grow px-4 py-2 rounded-xl border-2 border-slate-200 focus:border-aprovex-blue outline-none font-bold uppercase"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button 
              onClick={handleApplyCoupon}
              disabled={isVerifying}
              className="bg-aprovex-graphite text-white px-6 py-2 rounded-xl font-bold hover:bg-black transition-all disabled:opacity-50"
            >
              {isVerifying ? '...' : 'Aplicar'}
            </button>
          </div>
          {couponMessage.text && (
            <p className={`mt-2 text-sm font-bold ${couponMessage.type === 'success' ? 'text-aprovex-green' : 'text-red-500'}`}>
              {couponMessage.text}
            </p>
          )}
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-aprovex-blue text-white px-8 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl ring-4 ring-white whitespace-nowrap">
                  🔥 Mais Vendido
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-black text-aprovex-graphite uppercase mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm font-medium leading-tight">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-aprovex-graphite">R$</span>
                  <span className={`text-5xl font-black text-aprovex-graphite tracking-tighter ${discount > 0 ? 'line-through opacity-30 text-3xl' : ''}`}>
                    {plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  {discount > 0 && (
                    <span className="text-5xl font-black text-aprovex-green tracking-tighter">
                      {calculatePrice(plan.price)}
                    </span>
                  )}
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

              <button 
                onClick={() => handlePurchase(plan.id)}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 border-2 ${
                plan.highlight 
                ? 'bg-white border-aprovex-blue text-aprovex-blue hover:shadow-xl hover:shadow-blue-500/20' 
                : 'bg-white border-aprovex-graphite text-aprovex-graphite hover:shadow-xl hover:shadow-black/10'
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