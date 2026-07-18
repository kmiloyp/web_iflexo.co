import "server-only";

/**
 * Limitador simple en memoria (best-effort). En serverless cada instancia
 * tiene su propio mapa, así que no es infalible, pero frena abuso básico
 * junto con el honeypot. Para algo robusto: Upstash/Vercel KV (fase futura).
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  { max = 5, windowMs = 60_000 }: { max?: number; windowMs?: number } = {}
): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }

  entry.count += 1;
  if (entry.count > max) return { ok: false, remaining: 0 };
  return { ok: true, remaining: max - entry.count };
}
