import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';
import { supabase } from '../lib/supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isRegistering) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Verifique seu e-mail para confirmar o cadastro!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.location.href = '/?page=dashboard';
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/?page=dashboard'
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[440px] animate-fade-in-up">
        {/* Logo superior */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
          {/* Sutil detalhe de gradiente no topo */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-aprovex-blue/20 to-transparent"></div>

          {/* Seletor de Modo Estilizado */}
          <div className="flex bg-slate-50 p-1 rounded-2xl mb-8 border border-slate-100">
            <button 
              onClick={() => setIsRegistering(false)}
              className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-[0.1em] transition-all duration-300 ${!isRegistering ? 'bg-white text-aprovex-blue shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Entrar
            </button>
            <button 
              onClick={() => setIsRegistering(true)}
              className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-[0.1em] transition-all duration-300 ${isRegistering ? 'bg-white text-aprovex-blue shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Cadastrar
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">
              {isRegistering ? 'Crie sua' : 'Bem-vindo de'} <span className="text-aprovex-blue">{isRegistering ? 'conta' : 'volta'}</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              {isRegistering ? 'Comece sua jornada rumo à aprovação hoje mesmo.' : 'Acesse seu painel para gerenciar suas candidaturas.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50/50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              {error}
            </div>
          )}

          {/* Botão Google - Minimalista */}
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all mb-8 shadow-sm disabled:opacity-50 group"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm">Continuar com o Google</span>
          </button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black">
              <span className="bg-white px-4 text-slate-300">ou via e-mail</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-aprovex-blue transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="seu@email.com"
                  className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-aprovex-blue outline-none font-bold text-slate-700 transition-all placeholder:text-slate-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-aprovex-blue transition-colors" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-aprovex-blue outline-none font-bold text-slate-700 transition-all placeholder:text-slate-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {!isRegistering && (
              <div className="flex justify-end pr-1">
                <button type="button" className="text-[10px] font-black text-slate-400 hover:text-aprovex-blue uppercase tracking-tighter transition-colors">
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-aprovex-blue text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.15em] hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
            >
              {isLoading ? 'Aguarde...' : (isRegistering ? 'Criar minha conta' : 'Entrar agora')}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>
        
        <p className="text-center text-[10px] text-slate-400 mt-8 font-medium uppercase tracking-widest">
          AproveX © 2026 — Inteligência Artificial para sua Carreira
        </p>
      </div>
    </div>
  );
};

export default Login;
