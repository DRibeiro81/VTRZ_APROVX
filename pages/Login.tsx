import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, User, Eye, EyeOff, Key, HelpCircle, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';
import { supabase } from '../lib/supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Decorativo Sutil */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-aprovex-blue/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-aprovex-blue/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-[480px] z-10 animate-fade-in">
        {/* Header com Logo - Protagonista e Elegante */}
        <div className="flex flex-col items-center mb-12">
          <div className="p-4 rounded-3xl bg-white/50 backdrop-blur-sm mb-4 border border-white/20 shadow-sm">
            <Logo />
          </div>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        </div>

        {/* Card Principal de Login */}
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80">
          
          <div className="mb-10 text-center">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-2">Acesso à Plataforma</h2>
            <p className="text-slate-400 text-sm">Insira suas credenciais para acessar o painel AproveX.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-red-600 text-[13px] font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Campo ID de Acesso (E-mail no Supabase) */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 ml-1">ID de Acesso</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-aprovex-blue transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="Digite seu ID"
                  className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 bg-white focus:border-aprovex-blue focus:ring-4 focus:ring-aprovex-blue/5 outline-none font-medium text-slate-700 transition-all placeholder:text-slate-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 ml-1">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-aprovex-blue transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="Digite sua senha"
                  className="w-full pl-11 pr-12 py-4 rounded-2xl border border-slate-200 bg-white focus:border-aprovex-blue focus:ring-4 focus:ring-aprovex-blue/5 outline-none font-medium text-slate-700 transition-all placeholder:text-slate-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Botão Entrar Principal */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-aprovex-blue text-white py-5 rounded-2xl font-bold text-base hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-slate-300">Opções Adicionais</span>
            </div>
          </div>

          {/* Ações Secundárias em Grid */}
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="flex items-center gap-3 p-4 rounded-2xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-aprovex-blue group-hover:scale-110 transition-transform">
                <Key className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[13px] font-bold text-slate-700 leading-tight">Criar senha de acesso</p>
                <p className="text-[11px] text-slate-400">Primeiro acesso à plataforma</p>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col gap-2 p-4 rounded-2xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50/50 transition-all text-left group">
                <HelpCircle className="w-5 h-5 text-slate-300 group-hover:text-aprovex-blue transition-colors" />
                <span className="text-[12px] font-bold text-slate-600">Esqueci minha senha</span>
              </button>
              <button className="flex flex-col gap-2 p-4 rounded-2xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50/50 transition-all text-left group">
                <AlertCircle className="w-5 h-5 text-slate-300 group-hover:text-aprovex-blue transition-colors" />
                <span className="text-[12px] font-bold text-slate-600">Não tenho um ID</span>
              </button>
            </div>
          </div>
          
          {/* Botão Google - Mantido para flexibilidade */}
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-4 mt-8 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all text-sm disabled:opacity-50"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
            Acessar com Google
          </button>
        </div>
        
        <footer className="mt-12 text-center space-y-4">
          <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">
            AproveX — Sistema de Acesso Seguro v2.0
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
};

export default Login;
