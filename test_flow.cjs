const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');
const axios = require('axios');
const cheerio = require('cheerio');

// Configurações
const supabase = createClient(
  'https://yzuxccduzfkiulcyqbhh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6dXhjY2R1emZraXVsY3lxYmhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU2NDgxMiwiZXhwIjoyMDg1MTQwODEyfQ.r-c37ts5Q6IcejInz07soySxE-6TxwqRlIBqflGeWhg'
);
const resend = new Resend('re_VYwTzteV_Pn3FkG1gh7CYvSeuDiscLm9z');

async function processAnalyses() {
  try {
    const { data: records, error } = await supabase
      .from('cv_analyses')
      .select('*')
      .or('status.eq.pending,status.eq.processing')
      .limit(1);

    if (error || !records || records.length === 0) return;

    const analysis = records[0];
    console.log(`[${new Date().toISOString()}] Processando análise ID: ${analysis.id}`);

    // 1. Marcar como completado (Simulado para testar e-mail)
    await supabase.from('cv_analyses').update({ status: 'completed', score: 85 }).eq('id', analysis.id);

    // 2. Enviar E-mail de Teste
    const emailResult = await resend.emails.send({
      from: 'AproveX <onboarding@resend.dev>',
      to: 'vetorizza@gmail.com', 
      subject: `Seu Score AproveX: 85/100`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h1 style="color: #1F4FD8;">Teste de Fluxo AproveX</h1>
          <p>Olá! Este é um teste manual para validar o envio de e-mails.</p>
          <div style="background: #f4f4f4; padding: 20px; border-radius: 10px; text-align: center;">
            <span style="font-size: 48px; font-weight: bold; color: #2DBE7F;">85</span>
            <p style="margin: 0; font-weight: bold;">Seu Score ATS</p>
          </div>
          <p>Se você recebeu este e-mail, a integração com o Resend está funcionando!</p>
        </div>
      `
    });

    if (emailResult.error) {
      console.error(`[${new Date().toISOString()}] Erro no Resend:`, emailResult.error);
    } else {
      console.log(`[${new Date().toISOString()}] Sucesso! E-mail enviado ID: ${emailResult.data.id}`);
    }
    
  } catch (e) {
    console.error(`[${new Date().toISOString()}] Erro:`, e.message);
  }
}

console.log('--- TESTE DE E-MAIL INICIADO ---');
processAnalyses();
