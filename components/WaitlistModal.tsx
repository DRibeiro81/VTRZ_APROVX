import React, { useState } from 'react';
import { X, Loader2, CheckCircle2, Send } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          { 
            name: name, 
            email: email,
            source: 'Landing Page Modal'
          },
        ]);

      if (error) {
        throw error;
      }

      setIsSuccess(true);

    } catch (error: any) {
      console.error("Erro ao salvar:", error);
      setErrorMessage("Não foi possível salvar seus dados. Verifique sua conexão ou tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
            <X className="w-5 h-5" />
        </button>

        <div className="p-8">
            {isSuccess ? (
                <div className="text-center py-6">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-300">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Dados Recebidos!</h3>
                    <p className="text-slate-600 mb-6">
                        Obrigado, <strong>{name}</strong>.
                        <br className="mb-2"/>
                        Cadastramos seu e-mail com sucesso no nosso banco de dados. Como agradecimento, <span className="font-bold text-emerald-600">você terá prioridade exclusiva</span>.
                    </p>
                    <button 
                        onClick={onClose}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
                    >
                        Entendido
                    </button>
                </div>
            ) : (
                <>
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wide mb-4">
                            Em Fase Beta
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Lista de Espera VIP</h3>
                        <p className="text-slate-500 text-sm">
                            Estamos finalizando os ajustes na IA. Deixe seus dados para ser avisado assim que liberarmos o acesso.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nome completo</label>
                            <input 
                                type="text" 
                                id="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300"
                                placeholder="Digite seu nome"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Seu melhor e-mail</label>
                            <input 
                                type="email" 
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300"
                                placeholder="exemplo@email.com"
                            />
                        </div>

                        {errorMessage && (
                            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                                {errorMessage}
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    Quero prioridade
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                    <p className="text-xs text-center text-slate-400 mt-4">
                        Seus dados estão seguros conosco.
                    </p>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;