"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase: null, error: "No autenticado." };
  return { supabase, error: null };
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

/** Sube una imagen al bucket `articulos` y devuelve su URL pública. */
export async function uploadArticleImage(
  formData: FormData
): Promise<{ ok: boolean; url?: string; error?: string }> {
  const { error } = await requireAuth();
  if (error) return { ok: false, error };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No se recibió ninguna imagen." };
  }
  if (file.size > 5_000_000) {
    return { ok: false, error: "La imagen supera los 5 MB." };
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "El archivo no es una imagen." };
  }

  try {
    const admin = createAdminClient();
    const ext = (file.name.split(".").pop() || "jpg")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 5);
    const rand = Math.random().toString(36).slice(2, 8);
    const path = `subidas/${Date.now()}-${rand}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error: upErr } = await admin.storage
      .from("articulos")
      .upload(path, bytes, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });
    if (upErr) return { ok: false, error: upErr.message };

    const { data } = admin.storage.from("articulos").getPublicUrl(path);
    return { ok: true, url: data.publicUrl };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Error al subir." };
  }
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
