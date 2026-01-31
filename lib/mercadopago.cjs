const { MercadoPagoConfig, Preference } = require('mercadopago');

// Configuração do Cliente
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

const preference = new Preference(client);

/**
 * Gera um link de pagamento do Mercado Pago com suporte a Afiliados
 * @param {string} planId - ID do plano
 * @param {string} userEmail - Email do comprador
 * @param {Object} influencerData - Dados do influenciador vindos do Supabase
 */
async function createCheckout(planId, userEmail, influencerData = null) {
  const plans = {
    starter: { title: "AproveX - 1 Crédito", price: 19.90, qty: 1 },
    professional: { title: "AproveX - 5 Créditos", price: 49.90, qty: 5 },
    ultimate: { title: "AproveX - 20 Créditos", price: 139.90, qty: 20 }
  };

  const selectedPlan = plans[planId];
  let finalPrice = selectedPlan.price;

  // Aplica desconto do influenciador se existir
  if (influencerData && influencerData.porcentagem_desconto) {
    finalPrice = finalPrice * (1 - (influencerData.porcentagem_desconto / 100));
  }

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
      payer: {
        email: userEmail
      },
      metadata: {
        plan_id: planId,
        user_email: userEmail,
        credits_to_add: selectedPlan.qty,
        influencer_id: influencerData ? influencerData.id : null,
        commission_percent: influencerData ? influencerData.porcentagem_comissao : 0,
        coupon_used: influencerData ? influencerData.codigo_cupom : null
      },
      back_urls: {
        success: "https://aprovex.com.br/sucesso",
        failure: "https://aprovex.com.br/erro",
        pending: "https://aprovex.com.br/pendente"
      },
      auto_return: "approved"
    };

    const response = await preference.create({ body });
    return response.init_point;
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    throw error;
  }
}

module.exports = { createCheckout };
