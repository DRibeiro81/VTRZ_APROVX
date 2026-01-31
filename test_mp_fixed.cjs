const { MercadoPagoConfig, Payment } = require('mercadopago');

// Usando o token fornecido pelo usuário (identificado como teste)
const client = new MercadoPagoConfig({ 
  accessToken: 'APP_USR-2259669863314876-013000-19b9c57986f59d6bc9083aa9f903e0b2-2119772935' 
});

const payment = new Payment(client);

async function createPixTest(email, amount, credits) {
  try {
    const body = {
      transaction_amount: amount,
      description: `AproveX - ${credits} Créditos de Análise`,
      payment_method_id: 'pix',
      payer: {
        email: email,
        // Em modo de teste, alguns provedores exigem dados de identificação fictícios
        first_name: 'Test',
        last_name: 'User',
        identification: {
            type: 'CPF',
            number: '19119119100'
        }
      },
      installments: 1
    };

    const result = await payment.create({ body });
    
    console.log('--- PIX TESTE GERADO ---');
    console.log('ID:', result.id);
    console.log('Copia e Cola:', result.point_of_interaction.transaction_data.qr_code);
    
  } catch (error) {
    console.error('Erro detalhado:', JSON.stringify(error.cause || error, null, 2));
  }
}

createPixTest('vetorizza@gmail.com', 19.90, 1);
