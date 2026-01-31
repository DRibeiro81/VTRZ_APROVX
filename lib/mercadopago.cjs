const { MercadoPagoConfig, Preference } = require('mercadopago');

// Configuração do Cliente
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

const preference = new Preference(client);

/**
 * Gera um link de pagamento do Mercado Pago
 * @param {string} planId - ID do plano (starter, professional, ultimate)
 * @param {string} userEmail - Email do comprador
 * @param {string} couponCode - Cupom opcional
 */
async function createCheckout(planId, userEmail, couponCode = null) {
  const plans = {
    starter: { title: "AproveX - 1 Crédito", price: 19.90, qty: 1 },
    professional: { title: "AproveX - 5 Créditos", price: 49.90, qty: 5 },
    ultimate: { title: "AproveX - 20 Créditos", price: 139.90, qty: 20 }
  };

  const selectedPlan = plans[planId];
  let finalPrice = selectedPlan.price;

  // Lógica simples de cupom (deve ser validada no banco futuramente)
  if (couponCode && couponCode.toUpperCase() === 'APROVEX10') {
    finalPrice = finalPrice * 0.9;
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
        coupon_used: couponCode
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
