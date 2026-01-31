import React, { useState, useEffect } from 'react';
import { Users, DollarSign, TrendingUp, Wallet, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const InfluencerDashboard: React.FC = () => {
  const [influencerCode, setInfluencerCode] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    if (!influencerCode) return;
    setLoading(true);
    setError('');
    
    try {
      // 1. Buscar dados do influenciador
      const infRes = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/influenciadores?codigo_cupom=eq.${influencerCode.toUpperCase()}&select=*`, {
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        }
      });
      const infData = await infRes.json();

      if (infData && infData.length > 0) {
        const influencer = infData[0];
        
        // 2. Buscar vendas vinculadas
        const salesRes = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/vendas_afiliados?influenciador_id=eq.${influencer.id}&select=*`, {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          }
        });
        const salesData = await salesRes.json();

        // Calcular totais
        const totalSales = salesData.length;
        const totalCommission = salesData.reduce((acc: number, curr: any) => acc + Number(curr.valor_comissao), 0);
        const pendingCommission = salesData
          .filter((s: any) => s.status === 'pendente')
          .reduce((acc: number, curr: any) => acc + Number(curr.valor_comissao), 0);

        setData({
          influencer,
          stats: {
            totalSales,
            totalCommission,
            pendingCommission
          },
          history: salesData
        });
      } else {
        setError('Código de influenciador não encontrado.');
      }
    } catch (err) {
      setError('Erro ao carregar dados. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onOpenModal={() => {}} />
      
      <main className="flex-grow container mx-auto px-6 py-12">
        {!data ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 mt-20">
            <h1 className="text-2xl font-black text-aprovex-graphite mb-6 uppercase tracking-tighter text-center">
              Acesso <span className="text-aprovex-blue">Influenciador</span>
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Seu Código de Cupom</label>
                <input 
                  type="text" 
                  value={influencerCode}
                  onChange={(e) => setInfluencerCode(e.target.value)}
                  placeholder="Ex: DEIVID10"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-aprovex-blue outline-none font-bold uppercase"
                />
              </div>
              <button 
                onClick={fetchStats}
                disabled={loading}
                className="w-full bg-aprovex-blue text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {loading ? 'CARREGANDO...' : 'ENTRAR NO PAINEL'}
              </button>
              {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <button 
              onClick={() => setData(null)}
              className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-aprovex-graphite transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> VOLTAR
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <div>
                <h1 className="text-4xl font-black text-aprovex-graphite uppercase tracking-tighter">
                  Olá, <span className="text-aprovex-blue">{data.influencer.nome}</span>
                </h1>
                <p className="text-slate-500 font-medium">Acompanhe seu desempenho e comissões no AproveX.</p>
              </div>
              <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">Seu Cupom Ativo</span>
                <span className="text-xl font-black text-aprovex-blue">{data.influencer.codigo_cupom}</span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <Users className="w-8 h-8 text-aprovex-blue mb-4" />
                <span className="text-sm font-bold text-slate-400 uppercase">Total de Indicações</span>
                <p className="text-4xl font-black text-aprovex-graphite">{data.stats.totalSales}</p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <TrendingUp className="w-8 h-8 text-aprovex-green mb-4" />
                <span className="text-sm font-bold text-slate-400 uppercase">Comissão Acumulada</span>
                <p className="text-4xl font-black text-aprovex-graphite">
                  R$ {data.stats.totalCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border-2 border-aprovex-blue shadow-lg shadow-blue-500/5">
                <Wallet className="w-8 h-8 text-aprovex-blue mb-4" />
                <span className="text-sm font-bold text-slate-400 uppercase">Saldo a Receber</span>
                <p className="text-4xl font-black text-aprovex-blue">
                  R$ {data.stats.pendingCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* History Table */}
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50">
                <h3 className="text-xl font-black text-aprovex-graphite uppercase">Histórico de Vendas</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Data</th>
                      <th className="px-8 py-4">Valor Venda</th>
                      <th className="px-8 py-4">Sua Comissão</th>
                      <th className="px-8 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.history.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-8 py-12 text-center text-slate-400 font-bold">Nenhuma venda registrada ainda.</td>
                      </tr>
                    ) : (
                      data.history.map((sale: any) => (
                        <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-4 font-medium">{new Date(sale.criado_em).toLocaleDateString('pt-BR')}</td>
                          <td className="px-8 py-4 font-bold text-aprovex-graphite">R$ {Number(sale.valor_total).toFixed(2)}</td>
                          <td className="px-8 py-4 font-black text-aprovex-green">R$ {Number(sale.valor_comissao).toFixed(2)}</td>
                          <td className="px-8 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                              sale.status === 'pago' ? 'bg-aprovex-green/10 text-aprovex-green' : 'bg-amber-100 text-amber-600'
                            }`}>
                              {sale.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default InfluencerDashboard;
