import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ArticleEditor, type EditorArticle } from "@/components/admin/ArticleEditor";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-dvh bg-mist">
        <AdminHeader />
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <p className="rounded-2xl border border-line bg-white p-6 text-ink-soft">
            Supabase no está configurado. No es posible cargar el artículo.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  const initial: EditorArticle = {
    id: data.id,
    category: data.category,
    slug: data.slug,
    title: data.title,
    meta_title: data.meta_title ?? "",
    meta_description: data.meta_description ?? "",
    excerpt: data.excerpt ?? "",
    content_html: data.content_html ?? "",
    cover_image_url: data.cover_image_url ?? "",
    cover_image_alt: data.cover_image_alt ?? "",
    primary_keyword: data.primary_keyword ?? "",
    secondary_keywords: data.secondary_keywords ?? [],
    faq: data.faq ?? [],
    article_schema: data.article_schema ?? undefined,
    status: data.status,
  };

  return (
    <div className="min-h-dvh bg-mist">
      <AdminHeader />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <h1 className="mb-6 font-display text-2xl font-bold tracking-tight">
          Editar artículo
        </h1>
        <ArticleEditor initial={initial} />
      </div>
    </div>
  );
}
