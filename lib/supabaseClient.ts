import { createClient } from '@supabase/supabase-js';

// ==================================================================================
// ⚠️ CONFIGURAÇÃO DE ACESSO AO BANCO DE DADOS
// ==================================================================================

const supabaseUrl = 'https://yzuxccduzfkiulcyqbhh.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6dXhjY2R1emZraXVsY3lxYmhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NjQ4MTIsImV4cCI6MjA4NTE0MDgxMn0.M72B8uJe1rKaZykZ5jgHkC6CCheuyJn_SieUV6EVNIg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);