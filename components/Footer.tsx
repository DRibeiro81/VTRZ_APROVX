import React from 'react';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const preventDefault = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
               <Logo />
            </div>
            <p className="text-slate-500 text-sm mb-6">
                Inteligência de carreira para quem busca resultados reais no mercado de trabalho brasileiro.
            </p>
            <div className="flex space-x-4">
                <a href="#!" onClick={preventDefault} className="text-slate-400 hover:text-indigo-600 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#!" onClick={preventDefault} className="text-slate-400 hover:text-indigo-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="#!" onClick={preventDefault} className="text-slate-400 hover:text-indigo-600 transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="/?page=login" className="hover:text-indigo-600">Área do Candidato</a></li>
                <li><a href="#!" onClick={preventDefault} className="hover:text-indigo-600">Como funciona</a></li>
                <li><a href="#!" onClick={preventDefault} className="hover:text-indigo-600">Preços</a></li>
                <li><a href="#!" onClick={preventDefault} className="hover:text-indigo-600">Diagnóstico Grátis</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#!" onClick={preventDefault} className="hover:text-indigo-600">Blog de Carreira</a></li>
                <li><a href="#!" onClick={preventDefault} className="hover:text-indigo-600">Calculadora Salarial</a></li>
                <li><a href="#!" onClick={preventDefault} className="hover:text-indigo-600">Modelos de Currículo</a></li>
                <li><a href="#!" onClick={preventDefault} className="hover:text-indigo-600">Ajuda</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#!" onClick={preventDefault} className="hover:text-indigo-600">Termos de Uso</a></li>
                <li><a href="#!" onClick={preventDefault} className="hover:text-indigo-600">Privacidade</a></li>
                <li><a href="/?page=influenciador" className="hover:text-indigo-600">Área do Influenciador</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-slate-400 text-sm text-center">
                &copy; {new Date().getFullYear()} Aprovex - Todos os direitos reservados.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;