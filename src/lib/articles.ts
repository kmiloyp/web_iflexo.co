import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { SEED_CONTENT } from "@/lib/seed-content";
import type { CategorySlug } from "@/lib/config";

export type Article = {
  id: string;
  category: CategorySlug;
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  excerpt: string | null;
  content_html: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  primary_keyword: string | null;
  secondary_keywords: string[] | null;
  faq: { q: string; a: string }[] | null;
  status: "draft" | "published";
  published_at: string | null;
  /** Alimenta `dateModified` del JSON-LD (señal de frescura para Google). */
  updated_at: string | null;
  author: string | null;
};

/**
 * SEED: contenido REAL de los 17 posts, migrado del WordPress actual vía
 * wp-json (ver `seed-content.ts`). Preserva las URLs 1:1 y sirve el blog
 * sin base de datos. Al configurar Supabase, se reemplaza por `articles`.
 */
export const SEED_ARTICLES: Article[] = SEED_CONTENT.map((c) => ({
  id: `seed-${c.slug}`,
  category: c.category as CategorySlug,
  slug: c.slug,
  title: c.title,
  meta_title: c.meta_title,
  meta_description: c.meta_description,
  excerpt: c.excerpt,
  content_html: c.content_html,
  cover_image_url: c.cover_image_url,
  cover_image_alt: c.cover_image_alt,
  primary_keyword: c.primary_keyword,
  secondary_keywords: c.secondary_keywords,
  faq: c.faq,
  status: "published" as const,
  published_at: c.published_at,
  updated_at: c.published_at,
  author: "iFlexo",
}));

// ── Acceso a datos ──────────────────────────────────────────────────────
// Lee de Supabase (RLS: solo publicados) si está configurado; si no, seed.

export async function getPublishedArticles(): Promise<Article[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      // Si la tabla existe pero está vacía, caemos al seed (no mostrar blog vacío).
      if (!error && data && data.length > 0) return data as Article[];
    } catch {
      /* fallback a seed */
    }
  }
  return [...SEED_ARTICLES].sort((a, b) =>
    (b.published_at ?? "").localeCompare(a.published_at ?? "")
  );
}

export async function getArticlesByCategory(
  category: string
): Promise<Article[]> {
  const all = await getPublishedArticles();
  return all.filter((a) => a.category === category);
}

export async function getArticle(
  category: string,
  slug: string
): Promise<Article | null> {
  const all = await getPublishedArticles();
  return all.find((a) => a.category === category && a.slug === slug) ?? null;
}
