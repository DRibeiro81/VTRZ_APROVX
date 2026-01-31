import React, { useState } from 'react';
import { Upload, Link as LinkIcon, CheckCircle, AlertCircle, Loader2, FileText } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const AnalyzerSection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !email || !jobUrl) return;

    setIsUploading(true);
    setStatus('idle');

    try {
      // 1. Upload do PDF para o Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${email.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExt}`;
      const filePath = `curriculos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('curriculos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Pegar URL pública
      const { data: urlData } = supabase.storage.from('curriculos').getPublicUrl(filePath);

      // 2. Salvar metadados na tabela cv_analyses
      const { error: dbError } = await supabase
        .from('cv_analyses')
        .insert([
          { 
            email, 
            file_url: urlData.publicUrl, 
            job_description: jobUrl, // Salvando o link no campo de descrição por enquanto
            status: 'pending' 
          }
        ]);

      if (dbError) throw dbError;

      setStatus('success');
      
    } catch (error) {
      console.error('Erro:', error);
      setStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id="analisador" className="py-24 bg-white border-y border-aprovex-gray">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-aprovex-graphite tracking-tighter mb-4 uppercase">
              A Máquina de <span className="text-aprovex-blue">Aprovação</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">Análise instantânea baseada em inteligência artificial e padrões ATS.</p>
          </div>

          <div className="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-aprovex-gray overflow-hidden">
            <form onSubmit={handleAnalyze} className="flex flex-col lg:flex-row">
              {/* Lado Esquerdo: Inputs */}
              <div className="flex-1 p-8 lg:p-12 space-y-8 border-b lg:border-b-0 lg:border-r border-aprovex-gray">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-aprovex-blue mb-3 tracking-[0.2em]">1. Identificação</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-4 bg-aprovex-gray/20 border border-aprovex-gray rounded-2xl focus:ring-2 focus:ring-aprovex-blue outline-none transition-all font-bold text-aprovex-graphite placeholder:text-slate-400"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-aprovex-blue mb-3 tracking-[0.2em]">2. Alvo (Link da Vaga)</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="url" 
                        required
                        value={jobUrl}
                        onChange={(e) => setJobUrl(e.target.value)}
                        className="w-full px-5 py-4 pl-14 bg-aprovex-gray/20 border border-aprovex-gray rounded-2xl focus:ring-2 focus:ring-aprovex-blue outline-none transition-all font-bold text-aprovex-graphite placeholder:text-slate-400"
                        placeholder="https://linkedin.com/jobs/..."
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">Aceitamos LinkedIn, Gupy, Vagas.com e outros.</p>
                  </div>
                </div>
              </div>

              {/* Lado Direito: Upload e Botão */}
              <div className="flex-1 p-8 lg:p-12 bg-aprovex-gray/10 flex flex-col justify-between space-y-8">
                <div>
                  <label className="block text-[11px] font-black uppercase text-aprovex-blue mb-3 tracking-[0.2em]">3. Seu Currículo</label>
                  <div className={`relative group border-2 border-dashed rounded-[24px] p-10 transition-all text-center ${file ? 'border-aprovex-green bg-aprovex-green/5' : 'border-aprovex-gray bg-white hover:border-aprovex-blue'}`}>
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cv-upload-new"
                    />
                    <label htmlFor="cv-upload-new" className="cursor-pointer flex flex-col items-center">
                      {file ? (
                        <>
                          <div className="w-16 h-16 bg-aprovex-green/20 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-aprovex-green" />
                          </div>
                          <span className="font-black text-aprovex-graphite text-sm truncate max-w-[200px]">{file.name}</span>
                          <span className="text-[10px] font-black text-aprovex-blue uppercase mt-2 tracking-widest">Arquivo Pronto</span>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-aprovex-blue/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-8 h-8 text-aprovex-blue" />
                          </div>
                          <span className="font-black text-aprovex-graphite text-sm">Arraste seu PDF aqui</span>
                          <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">ou clique para selecionar</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isUploading || !file || !email || !jobUrl}
                  className="w-full py-6 bg-aprovex-blue text-white rounded-[20px] font-black text-xl hover:bg-blue-700 transition-all shadow-[0_20px_40px_-10px_rgba(31,79,216,0.3)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      PROCESSANDO...
                    </>
                  ) : (
                    <>
                      RECEBER MINHA NOTA NO E-MAIL
                      <FileText className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {status === 'success' && (
              <div className="p-8 bg-aprovex-green text-white text-center animate-in slide-in-from-bottom duration-500">
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="w-8 h-8" />
                  <div>
                    <p className="text-xl font-black uppercase tracking-tighter">Currículo em análise!</p>
                    <p className="text-sm font-bold opacity-90">Em instantes você receberá o relatório completo em {email}.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyzerSection;