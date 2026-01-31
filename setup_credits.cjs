const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://yzuxccduzfkiulcyqbhh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6dXhjY2R1emZraXVsY3lxYmhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU2NDgxMiwiZXhwIjoyMDg1MTQwODEyfQ.r-c37ts5Q6IcejInz07soySxE-6TxwqRlIBqflGeWhg'
);

async function setupCredits() {
    console.log("--- CONFIGURANDO TABELA DE CRÉDITOS ---");
    const sql = `
    -- Tabela de Créditos por Usuário
    CREATE TABLE IF NOT EXISTS user_credits (
        email TEXT PRIMARY KEY,
        balance INTEGER DEFAULT 0,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Histórico de Compras
    CREATE TABLE IF NOT EXISTS credit_purchases (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL,
        amount INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        status TEXT DEFAULT 'pending',
        external_reference TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    `;
    console.log("Por favor, execute o SQL abaixo no seu painel do Supabase:");
    console.log(sql);
}

setupCredits();
