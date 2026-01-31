import React, { useState } from 'react';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de login
    setTimeout(() => {
      window.location.href = '/?page=dashboard';
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl border border-slate-100 animate-fade-in-up">
        <div className="flex justify-center mb-10">
          <Logo />
        </div>
        
        <h1 className="text-3xl font-black text-aprovex-graphite text-center uppercase tracking-tighter mb-2">Área do <span className="text-aprovex-blue">Candidato</span></h1>
        <p className="text-center text-slate-500 font-medium mb-10">Acesse com os dados enviados para o seu e-mail.</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Seu E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="email" 
                required
                placeholder="exemplo@email.com"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-aprovex-blue outline-none font-bold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Sua Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-aprovex-blue outline-none font-bold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-aprovex-blue text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
          >
            {isLoading ? 'ACESSANDO...' : 'ENTRAR NO DASHBOARD'}
            <ArrowRight className="w-6 h-6" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-10 font-bold uppercase tracking-widest">
          Não recebeu seu acesso? <a href="#" className="text-aprovex-blue underline">Clique aqui</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
