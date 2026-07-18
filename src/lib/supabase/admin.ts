import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente con SERVICE ROLE. Salta RLS — SOLO servidor.
 * Nunca importar desde componentes cliente. Se usa para insertar leads
 * y para operaciones privilegiadas del generador de artículos.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase service role no configurado (revisa .env.local).");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function isAdminConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
