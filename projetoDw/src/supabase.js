import { createClient } from '@supabase/supabase-js';

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(URL, KEY);


export async function registerUser(email, senha, nome) {
  const { data, error } = await supabase.auth.signUp(
    { email, password: senha },
    { data: { nome } }
  );
  return { data, error };
}
export async function loginUser(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });
  return { data, error };
}