const { MercadoPagoConfig, Preference } = require('mercadopago');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { planId, userEmail, influencerCode } = req.body;

  try {
    const mpToken = process.env.MP_ACCESS_TOKEN;
    if (!mpToken) {
      console.error('ERRO: MP_ACCESS_TOKEN não configurado na Vercel');
      return res.status(500).json({ error: 'Configuração de pagamento ausente' });
    }

    const client = new MercadoPagoConfig({ 
      accessToken: mpToken
    });
  const preference = new Preference(client);

  // 2. Definir Planos
  const plans = {
    starter: { title: "AproveX - 1 Crédito", price: 19.90, qty: 1 },
    professional: { title: "AproveX - 5 Créditos", price: 49.90, qty: 5 },
    ultimate: { title: "AproveX - 20 Créditos", price: 139.90, qty: 20 }
  };

  const selectedPlan = plans[planId];
  let finalPrice = selectedPlan.price;
  let influencerData = null;

  // 3. Validar Influenciador no Supabase (Backend para Backend)
  if (influencerCode) {
    try {
      const supRes = await fetch(`${process.env.VITE_SUPABASE_URL}/rest/v1/influenciadores?codigo_cupom=eq.${influencerCode.toUpperCase()}&select=*`, {
        headers: {
          'apikey': process.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`
        }
      });
      const data = await supRes.json();
      if (data && data.length > 0) {
        influencerData = data[0];
        finalPrice = finalPrice * (1 - (influencerData.porcentagem_desconto / 100));
      }
    } catch (e) {
      console.error("Erro ao validar influenciador:", e);
    }
  }

  // 4. Criar Preferência no Mercado Pago
  try {
    const body = {
      items: [
        {
          id: planId,
          title: selectedPlan.title,
          quantity: 1,
          unit_price: Number(finalPrice.toFixed(2)),
          currency_id: 'BRL'
        }
      ],
      payer: { email: userEmail || 'comprador@aprovex.com.br' },
      metadata: {
        plan_id: planId,
        user_email: userEmail,
        credits_to_add: selectedPlan.qty,
        influencer_id: influencerData ? influencerData.id : null,
        commission_percent: influencerData ? influencerData.porcentagem_comissao : 0
      },
      back_urls: {
        success: "https://vtrz-aprovx.vercel.app/?payment=success",
        failure: "https://vtrz-aprovx.vercel.app/?payment=failed",
        pending: "https://vtrz-aprovx.vercel.app/?payment=pending"
      },
      auto_return: "approved"
    };

    const response = await preference.create({ body });
    return res.status(200).json({ url: response.init_point });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
