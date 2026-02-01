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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl border border-slate-100 animate-fade-in-up">
        <div className="flex justify-center mb-10">
          <Logo />
        </div>
        
        {/* Seletor de Modo (Login / Cadastro) */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-10">
          <button 
            onClick={() => setIsRegistering(false)}
            className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${!isRegistering ? 'bg-white text-aprovex-blue shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Já sou aluno
          </button>
          <button 
            onClick={() => setIsRegistering(true)}
            className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isRegistering ? 'bg-white text-aprovex-blue shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Quero me cadastrar
          </button>
        </div>

        <h1 className="text-3xl font-black text-aprovex-graphite text-center uppercase tracking-tighter mb-2">
          {isRegistering ? 'CRIAR' : 'ÁREA DO'} <span className="text-aprovex-blue">{isRegistering ? 'CONTA' : 'CANDIDATO'}</span>
        </h1>
        <p className="text-center text-slate-500 font-medium mb-10">
          {isRegistering ? 'Cadastre-se para começar a usar.' : 'Acesse sua conta para continuar.'}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold rounded-r-xl">
            {error}
          </div>
        )}

        {/* Botão Google */}
        <button 
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all mb-6 disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Continuar com Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-400 font-bold">ou use seu e-mail</span>
          </div>
        </div>

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
            className="w-full bg-aprovex-blue text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 disabled:opacity-50"
          >
            {isLoading ? 'PROCESSANDO...' : (isRegistering ? 'CRIAR CONTA' : 'ENTRAR NO DASHBOARD')}
            <ArrowRight className="w-6 h-6" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-10 font-bold uppercase tracking-widest">
          {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'} {' '}
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-aprovex-blue underline"
          >
            {isRegistering ? 'Acesse aqui' : 'Cadastre-se agora'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
