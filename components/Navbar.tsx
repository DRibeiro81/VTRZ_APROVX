import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função dedicada para o clique na logo
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Impede o redirecionamento que causa o erro
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCTAClick = () => {
    setIsMobileMenuOpen(false);
    onOpenModal();
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" onClick={handleLogoClick} className="hover:opacity-90 transition-opacity">
          <Logo />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" onClick={(e) => scrollToSection(e, 'problema')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Por que não sou chamado?</a>
          <a href="#" onClick={(e) => scrollToSection(e, 'solucao')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">A Solução</a>
          <a href="#" onClick={(e) => scrollToSection(e, 'como-funciona')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Como Funciona</a>
          <a 
            href="/?page=login" 
            className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            Login
          </a>
          <button 
            onClick={handleCTAClick} 
            className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
          >
            Aumentar minhas chances
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-4 shadow-lg flex flex-col space-y-4 animate-in slide-in-from-top-2">
          <a href="#" className="text-slate-600 font-medium p-2" onClick={(e) => scrollToSection(e, 'problema')}>O Problema</a>
          <a href="#" className="text-slate-600 font-medium p-2" onClick={(e) => scrollToSection(e, 'solucao')}>A Solução</a>
          <a href="#" className="text-slate-600 font-medium p-2" onClick={(e) => scrollToSection(e, 'como-funciona')}>Como Funciona</a>
          <a href="/?page=login" className="text-slate-600 font-bold p-2">Login</a>
          <button className="bg-indigo-600 text-white w-full py-3 rounded-lg font-bold text-center block" onClick={handleCTAClick}>
            Começar agora
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;