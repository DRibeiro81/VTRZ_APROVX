import React from 'react';
import { Filter, EyeOff, MessageSquareWarning } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const ProblemSection: React.FC = () => {
  return (
    <section id="problema" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-sm font-bold text-indigo-600 tracking-wide uppercase mb-3">O Abismo do RH</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Por que currículos brilhantes morrem no "Buraco Negro"?
            </h3>
            <p className="text-slate-600 text-lg">
              Você tem a experiência, tem as habilidades, mas seu telefone não toca. O problema não é sua competência, mas sim o <strong>filtro invisível</strong> que descarta seu currículo antes mesmo de um humano o ver.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          <RevealOnScroll delay={100}>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-2 h-full">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Filter className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">A Barreira dos Robôs (ATS)</h4>
              <p className="text-slate-600">
                75% dos currículos são descartados automaticamente por sistemas antes mesmo de um humano ler. Se você não usar as palavras-chave certas, você é invisível.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-2 h-full">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <EyeOff className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Currículos Genéricos</h4>
              <p className="text-slate-600">
                Enviar o mesmo PDF para 50 vagas diferentes não funciona. Recrutadores buscam alinhamento específico. Sem personalização estratégica, é apenas mais um papel na pilha.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={500}>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-2 h-full">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                <MessageSquareWarning className="w-6 h-6 text-slate-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">O Silêncio dos Feedbacks</h4>
              <p className="text-slate-600">
                Você é reprovado e recebe um e-mail padrão. Sem saber onde errou, você continua cometendo os mesmos erros na próxima tentativa. É um ciclo frustrante.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;