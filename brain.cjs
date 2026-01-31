const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const cheerio = require('cheerio');

// Configurações
const supabase = createClient(
  'https://yzuxccduzfkiulcyqbhh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6dXhjY2R1emZraXVsY3lxYmhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU2NDgxMiwiZXhwIjoyMDg1MTQwODEyfQ.r-c37ts5Q6IcejInz07soySxE-6TxwqRlIBqflGeWhg'
);
const resend = new Resend('re_VYwTzteV_Pn3FkG1gh7CYvSeuDiscLm9z');
const genAI = new GoogleGenerativeAI('AIzaSyDjFGPRCek0JVcZgxx_eBw5Xoo5XOjFMSM');

async function scrapeJob(url) {
  try {
    const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(response.data);
    return $('body').text().substring(0, 5000); 
  } catch (e) {
    return "Não foi possível extrair os dados do link automaticamente.";
  }
}

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

    // 1. Marcar como processando
    await supabase.from('cv_analyses').update({ status: 'processing' }).eq('id', analysis.id);

    // 2. Extrair dados da vaga
    const jobText = await scrapeJob(analysis.job_description);

    // 3. IA gera o relatório (Corrigido para modelo estável)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Analise este currículo para a vaga abaixo. 
    Vaga: ${jobText || analysis.job_description}
    Gere um Score de 0 a 100 e 3 dicas curtas de melhoria para o candidato vencer filtros ATS.
    Retorne APENAS um JSON válido no formato: { "score": 85, "tips": ["...", "...", "..."] }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json|```/g, '').trim();
    const report = JSON.parse(cleanJson);

    // 4. Salvar no Banco
    await supabase.from('cv_analyses').update({
      status: 'completed',
      score: report.score,
      feedback: report
    }).eq('id', analysis.id);

    // 5. Enviar E-mail (Sempre para vetorizza@gmail.com por enquanto devido ao sandbox do Resend)
    const emailResult = await resend.emails.send({
      from: 'AproveX <onboarding@resend.dev>',
      to: 'vetorizza@gmail.com', 
      subject: `Relatório AproveX: Nota ${report.score}/100`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E6E8EB; border-radius: 16px; padding: 40px;">
          <h1 style="color: #1F4FD8; margin-top: 0;">Sua Análise está pronta!</h1>
          <p style="color: #1C1C1C; font-size: 18px;">Vaga: <strong>${analysis.job_description}</strong></p>
          <div style="background: #1F4FD8; color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0;">
            <span style="font-size: 64px; font-weight: 900;">${report.score}</span>
            <p style="margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Score ATS</p>
          </div>
          <h3 style="color: #1C1C1C; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Dicas da nossa Inteligência:</h3>
          <ul style="color: #4B5563; line-height: 1.6;">
            ${report.tips.map(t => `<li style="margin-bottom: 12px;">${t}</li>`).join('')}
          </ul>
          <hr style="border: none; border-top: 1px solid #E6E8EB; margin: 40px 0;" />
          <p style="color: #9CA3AF; font-size: 12px; text-align: center;">Vetorizza &copy; 2026 - Inteligência de Carreira</p>
        </div>
      `
    });

    console.log(`[${new Date().toISOString()}] Sucesso! E-mail enviado.`);
  } catch (e) {
    console.error(`[${new Date().toISOString()}] Erro no processamento:`, e.message);
    // Em caso de erro, não travar o loop, apenas logar.
  }
}

console.log('--- LINO BRAIN REESTRUTURADO ATIVO ---');
setInterval(processAnalyses, 5000);
processAnalyses();
