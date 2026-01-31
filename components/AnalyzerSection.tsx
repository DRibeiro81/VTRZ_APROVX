import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const AnalyzerSection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !email) return;

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

      // 2. Salvar metadados na tabela
      const { error: dbError } = await supabase
        .from('cv_analyses')
        .insert([
          { 
            email, 
            file_url: urlData.publicUrl, 
            job_description: jobDescription,
            status: 'pending' 
          }
        ]);

      if (dbError) throw dbError;

      setStatus('success');
      alert('Currículo recebido! Nossa IA está analisando. Você receberá o score em instantes.');
      
    } catch (error) {
      console.error('Erro:', error);
      setStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id="analisador" className="py-24 bg-aprovex-gray/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-aprovex-gray">
          <div className="bg-aprovex-blue p-8 text-white text-center">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">A Máquina de Aprovação</h2>
            <p className="text-blue-100 font-medium">Suba seu currículo e a vaga desejada. Nossa IA fará o resto.</p>
          </div>
          
          <form onSubmit={handleAnalyze} className="p-8 lg:p-12 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Coluna 1: Dados e Vaga */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase text-aprovex-graphite mb-2 tracking-widest">Seu melhor E-mail</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 bg-aprovex-gray/30 border border-aprovex-gray rounded-xl focus:ring-2 focus:ring-aprovex-blue outline-none transition-all"
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-aprovex-graphite mb-2 tracking-widest">Descrição da Vaga (Opcional)</label>
                  <textarea 
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full h-48 px-4 py-4 bg-aprovex-gray/30 border border-aprovex-gray rounded-xl focus:ring-2 focus:ring-aprovex-blue outline-none transition-all resize-none"
                    placeholder="Cole aqui os requisitos da vaga para uma análise mais precisa..."
                  />
                </div>
              </div>

              {/* Coluna 2: Upload */}
              <div className="flex flex-col">
                <label className="block text-xs font-black uppercase text-aprovex-graphite mb-2 tracking-widest">Seu Currículo (PDF)</label>
                <div className={`flex-grow border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-all ${file ? 'border-aprovex-green bg-green-50' : 'border-aprovex-gray hover:border-aprovex-blue'}`}>
                  <input 
                    type="file" 
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer flex flex-col items-center text-center">
                    {file ? (
                      <>
                        <CheckCircle className="w-12 h-12 text-aprovex-green mb-4" />
                        <span className="font-bold text-aprovex-graphite">{file.name}</span>
                        <span className="text-xs text-slate-500 mt-2">Clique para trocar o arquivo</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-aprovex-blue mb-4" />
                        <span className="font-bold text-aprovex-graphite">Arraste ou clique para enviar</span>
                        <span className="text-xs text-slate-500 mt-2">Somente arquivos PDF</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isUploading || !file || !email}
              className="w-full py-6 bg-aprovex-graphite text-white rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  PROCESSANDO...
                </>
              ) : (
                <>
                  OBTER MINHA NOTA GRATUITA
                  <FileText className="w-6 h-6" />
                </>
              )}
            </button>

            {status === 'success' && (
              <div className="bg-aprovex-green/10 border border-aprovex-green p-4 rounded-xl flex items-center gap-3 text-aprovex-green">
                <CheckCircle className="w-5 h-5" />
                <span className="font-bold">Currículo salvo e enviado para análise!</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default AnalyzerSection;