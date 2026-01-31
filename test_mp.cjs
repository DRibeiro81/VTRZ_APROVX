const { MercadoPagoConfig, Payment } = require('mercadopago');

const client = new MercadoPagoConfig({ 
  accessToken: 'APP_USR-2259669863314876-013000-19b9c57986f59d6bc9083aa9f903e0b2-2119772935' 
});

const payment = new Payment(client);

async function createPix(email, amount, credits) {
  try {
    const body = {
      transaction_amount: amount,
      description: `AproveX - ${credits} Créditos de Análise`,
      payment_method_id: 'pix',
      payer: {
        email: email
      },
      notification_url: 'https://vtrz-aprovx.vercel.app/api/webhook-mp', // Placeholder
      external_reference: `${email}:${credits}`
    };

    const result = await payment.create({ body });
    
    console.log('--- PIX GERADO COM SUCESSO ---');
    console.log('ID do Pagamento:', result.id);
    console.log('QR Code (Copia e Cola):', result.point_of_interaction.transaction_data.qr_code);
    console.log('Status:', result.status);
    
  } catch (error) {
    console.error('Erro ao gerar Pix:', error.message);
  }
}

// Exemplo de teste: Gerar 1 crédito para seu e-mail
createPix('vetorizza@gmail.com', 19.90, 1);
