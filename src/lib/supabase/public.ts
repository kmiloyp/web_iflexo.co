import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente público de lectura para el servidor, SIN cookies.
 *
 * Las páginas públicas (artículos, categorías, pilares) solo necesitan leer
 * contenido publicado, que la RLS ya expone con la anon key (política
 * "public read published articles"). Al no depender de cookies(), estas
 * páginas pueden renderizarse de forma estática/ISR y —lo importante—
 * `revalidatePath` puede regenerarlas fuera de un request sin reventar.
 *
 * (Usar el cliente basado en cookies aquí hacía que publicar un artículo
 *  lanzara "An error occurred in the Server Components render" al revalidar.)
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
