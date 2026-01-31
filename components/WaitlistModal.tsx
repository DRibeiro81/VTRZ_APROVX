import React, { useState } from 'react';
import { X, Loader2, CheckCircle2, Upload, Link as LinkIcon, FileText } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !email || !jobUrl) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      // 1. Upload do Arquivo para o Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${email.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExt}`;
      const filePath = `curriculos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('curriculos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('curriculos').getPublicUrl(filePath);

      // 2. Salvar na tabela cv_analyses
      const { error: dbError } = await supabase
        .from('cv_analyses')
        .insert([
          { 
            email, 
            file_url: urlData.publicUrl, 
            job_description: jobUrl,
            status: 'pending' 
          },
        ]);

      if (dbError) throw dbError;

      setIsSuccess(true);

    } catch (error: any) {
      console.error("Erro ao processar:", error);
      setErrorMessage("Não foi possível processar sua análise. Verifique sua conexão ou tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
            <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12">
            {isSuccess ? (
                <div className="text-center py-10">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-300">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Currículo Enviado!</h3>
                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        Nossa IA já começou a analisar seu perfil contra a vaga desejada. 
                        <br />
                        <strong>Verifique seu e-mail ({email}) em instantes.</strong>
                    </p>
                    <button 
                        onClick={onClose}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
                    >
                        Entendido
                    </button>
                </div>
            ) : (
                <>
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-black uppercase tracking-[0.2em] mb-4">
                            Máquina de Aprovação
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 uppercase tracking-tighter">Análise Gratuita</h3>
                        <p className="text-slate-500 font-medium">
                            Receba um diagnóstico completo do seu currículo direto no seu e-mail.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-[11px] font-black uppercase text-slate-500 mb-2 tracking-widest">1. Seu melhor E-mail</label>
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-bold"
                                    placeholder="exemplo@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-black uppercase text-slate-500 mb-2 tracking-widest">2. Link da Vaga</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="url" 
                                        required
                                        value={jobUrl}
                                        onChange={(e) => setJobUrl(e.target.value)}
                                        className="w-full px-5 py-4 pl-14 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-bold"
                                        placeholder="https://linkedin.com/jobs/..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-black uppercase text-slate-500 mb-2 tracking-widest">3. Currículo (PDF ou DOCX)</label>
                                <div className={`relative border-2 border-dashed rounded-2xl p-8 transition-all text-center ${file ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-indigo-600'}`}>
                                    <input 
                                        type="file" 
                                        accept=".pdf,.docx"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="modal-cv-upload"
                                    />
                                    <label htmlFor="modal-cv-upload" className="cursor-pointer flex flex-col items-center">
                                        {file ? (
                                            <>
                                                <FileText className="w-10 h-10 text-emerald-600 mb-3" />
                                                <span className="font-bold text-slate-900 text-sm truncate max-w-[250px]">{file.name}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-10 h-10 text-indigo-600 mb-3" />
                                                <span className="font-bold text-slate-900 text-sm">Clique para subir seu arquivo</span>
                                                <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">PDF ou DOCX até 5MB</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl font-bold">
                                {errorMessage}
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={isLoading || !file || !email || !jobUrl}
                            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-tighter"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Processando Análise...
                                </>
                            ) : (
                                <>
                                    Obter minha nota gratuita
                                    <FileText className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;