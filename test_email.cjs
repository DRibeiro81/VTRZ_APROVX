const { Resend } = require('resend');

const resend = new Resend('re_VYwTzteV_Pn3FkG1gh7CYvSeuDiscLm9z');

async function sendTestEmail() {
  try {
    const data = await resend.emails.send({
      from: 'AproveX <onboarding@resend.dev>',
      to: 'deivid@vetorizza.com.br',
      subject: 'Teste de Conexão - Máquina AproveX',
      html: '<h1>Conexão Confirmada!</h1><p>Olá Deivid, o Lino aqui. Este é um teste da integração de e-mail do AproveX. A partir de agora, os relatórios de análise serão enviados por aqui.</p>'
    });

    console.log('E-mail enviado com sucesso:', JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}

sendTestEmail();
