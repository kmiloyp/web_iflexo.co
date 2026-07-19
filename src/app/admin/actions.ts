"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import { sanitizeArticleHtml } from "@/lib/sanitize";

export type ArticlePayload = {
  id?: string;
  category: string;
  slug: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  excerpt?: string;
  content_html: string;
  cover_image_url?: string;
  cover_image_alt?: string;
  primary_keyword?: string;
  secondary_keywords?: string[];
  faq?: { q: string; a: string }[];
  article_schema?: Record<string, unknown>;
};

export type SaveResult = { ok: boolean; id?: string; error?: string };

async function requireAuth() {
  if (!isSupabaseConfigured()) {
    return { supabase: null, error: "Supabase no está configurado." };
  }
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        supabase: null,
        error: "Tu sesión no es válida. Cierra sesión y vuelve a entrar en /admin.",
      };
    }
    return { supabase, error: null };
  } catch (e) {
    return {
      supabase: null,
      error: e instanceof Error ? `Error de sesión: ${e.message}` : "Error de sesión.",
    };
  }
}

/** Guarda (crea o actualiza) un artículo como borrador. Autoguardado. */
export async function saveArticle(payload: ArticlePayload): Promise<SaveResult> {
  const { supabase, error } = await requireAuth();
  if (!supabase) return { ok: false, error: error ?? "Sin acceso." };

  const row = {
    category: payload.category,
    slug: slugify(payload.slug || payload.title),
    title: payload.title,
    meta_title: payload.meta_title ?? null,
    meta_description: payload.meta_description ?? null,
    excerpt: payload.excerpt ?? null,
    content_html: sanitizeArticleHtml(payload.content_html ?? ""),
    cover_image_url: payload.cover_image_url ?? null,
    cover_image_alt: payload.cover_image_alt ?? null,
    primary_keyword: payload.primary_keyword ?? null,
    secondary_keywords: payload.secondary_keywords ?? null,
    faq: payload.faq ?? null,
    article_schema: payload.article_schema ?? null,
  };

  if (payload.id) {
    const { error: e } = await supabase
      .from("articles")
      .update(row)
      .eq("id", payload.id);
    if (e) return { ok: false, error: e.message };
    return { ok: true, id: payload.id };
  }

  // Nuevo: upsert por (category, slug) para evitar choques de la clave única
  // si el autoguardado se dispara dos veces antes de tener id. status usa el
  // default 'draft' en el insert y no se toca si ya existía.
  const { data, error: e } = await supabase
    .from("articles")
    .upsert(row, { onConflict: "category,slug" })
    .select("id")
    .single();
  if (e) return { ok: false, error: e.message };
  return { ok: true, id: data.id };
}

/** Publica un artículo (requiere confirmación en el cliente). */
export async function publishArticle(id: string): Promise<SaveResult> {
  const { supabase, error } = await requireAuth();
  if (!supabase) return { ok: false, error: error ?? "Sin acceso." };

  const { data: article } = await supabase
    .from("articles")
    .select("category, slug")
    .eq("id", id)
    .single();

  const { error: e } = await supabase
    .from("articles")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", id);
  if (e) return { ok: false, error: e.message };

  if (article) {
    revalidatePath(`/${article.category}/${article.slug}/`);
    revalidatePath(`/${article.category}/`);
  }
  revalidatePath("/admin/articulos");
  return { ok: true, id };
}

/** Vuelve un artículo a borrador. */
export async function unpublishArticle(id: string): Promise<SaveResult> {
  const { supabase, error } = await requireAuth();
  if (!supabase) return { ok: false, error: error ?? "Sin acceso." };
  const { error: e } = await supabase
    .from("articles")
    .update({ status: "draft" })
    .eq("id", id);
  if (e) return { ok: false, error: e.message };
  revalidatePath("/admin/articulos");
  return { ok: true, id };
}
