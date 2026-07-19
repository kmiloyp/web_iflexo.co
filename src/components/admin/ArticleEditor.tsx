"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  Loader2,
  Plus,
  Trash2,
  ExternalLink,
  UploadCloud,
  Save,
  Copy,
  Sparkles,
} from "lucide-react";
import {
  saveArticle,
  publishArticle,
  unpublishArticle,
  uploadArticleImage,
  type ArticlePayload,
} from "@/app/admin/actions";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { categories } from "@/lib/config";
import { cn } from "@/lib/utils";

export type EditorArticle = ArticlePayload & {
  id?: string;
  status?: "draft" | "published";
  /** Prompt sugerido para generar la imagen de portada con IA (no se guarda). */
  image_prompt?: string;
};

type SaveState = "idle" | "saving" | "saved" | "error";

export function ArticleEditor({ initial }: { initial: EditorArticle }) {
  const [article, setArticle] = useState<EditorArticle>(initial);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imagePrompt, setImagePrompt] = useState(
    initial.image_prompt ??
      `Realistic industrial photography related to "${initial.title}", flexographic prepress context, editorial lighting, sharp focus, high detail — horizontal 16:9 aspect ratio, ~1600x900px, web cover; no text, no logos, no watermark, no identifiable people, no brand names.`
  );
  const [editMode, setEditMode] = useState<"visual" | "html">("visual");
  const firstRender = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const coverFileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof EditorArticle>(key: K, value: EditorArticle[K]) =>
    setArticle((a) => ({ ...a, [key]: value }));

  const persist = useCallback(async (current: EditorArticle) => {
    if (!current.title?.trim()) return;
    setSaveState("saving");
    const res = await saveArticle(current);
    if (res.ok) {
      setSaveState("saved");
      if (res.id && !current.id) setArticle((a) => ({ ...a, id: res.id }));
      setMessage(null);
    } else {
      setSaveState("error");
      setMessage(res.error ?? "No se pudo guardar.");
    }
  }, []);

  // Autoguardado con debounce.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => persist(article), 1500);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(article)]);

  const onPublish = async () => {
    let id = article.id;
    if (!id) {
      const res = await saveArticle(article);
      if (!res.ok || !res.id) {
        setMessage(res.error ?? "Guarda el artículo antes de publicar.");
        return;
      }
      id = res.id;
      setArticle((a) => ({ ...a, id }));
    }
    if (!confirm("¿Publicar este artículo? Será visible al público.")) return;
    setPublishing(true);
    const res = await publishArticle(id);
    setPublishing(false);
    if (res.ok) {
      setArticle((a) => ({ ...a, status: "published" }));
      setMessage("Artículo publicado.");
    } else {
      setMessage(res.error ?? "No se pudo publicar.");
    }
  };

  const onUnpublish = async () => {
    if (!article.id) return;
    const res = await unpublishArticle(article.id);
    if (res.ok) setArticle((a) => ({ ...a, status: "draft" }));
  };

  const onSaveDraft = async () => {
    if (!article.title?.trim()) {
      setMessage("Ponle un título antes de guardar.");
      return;
    }
    setSavingDraft(true);
    await persist(article);
    setSavingDraft(false);
  };

  const onUploadImage = async (file: File) => {
    setUploading(true);
    setMessage(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadArticleImage(fd);
    setUploading(false);
    if (res.ok && res.url) {
      set("cover_image_url", res.url);
      if (!article.cover_image_alt) set("cover_image_alt", article.title || "");
    } else {
      setMessage(res.error ?? "No se pudo subir la imagen.");
    }
  };

  const publicPath = `/${article.category}/${article.slug}/`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Columna principal */}
      <div className="grid gap-5">
        <FieldBlock label="Título (H1)">
          <input
            value={article.title}
            onChange={(e) => set("title", e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 font-display text-lg outline-none focus:border-brand-coral"
          />
        </FieldBlock>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Contenido</span>
            <div className="flex rounded-lg border border-line p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setEditMode("visual")}
                className={cn(
                  "rounded-md px-2.5 py-1 font-medium",
                  editMode === "visual" ? "bg-ink text-white" : "text-muted"
                )}
              >
                Visual
              </button>
              <button
                type="button"
                onClick={() => setEditMode("html")}
                className={cn(
                  "rounded-md px-2.5 py-1 font-medium",
                  editMode === "html" ? "bg-ink text-white" : "text-muted"
                )}
              >
                HTML
              </button>
            </div>
          </div>
          {editMode === "visual" ? (
            <RichTextEditor
              key={`visual-${article.id ?? "new"}`}
              initialValue={article.content_html}
              onChange={(html) => set("content_html", html)}
            />
          ) : (
            <textarea
              value={article.content_html}
              onChange={(e) => set("content_html", e.target.value)}
              rows={22}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 font-mono text-sm leading-relaxed outline-none focus:border-brand-coral"
            />
          )}
        </div>

        <FaqEditor
          faq={article.faq ?? []}
          onChange={(faq) => set("faq", faq)}
        />
      </div>

      {/* Barra lateral SEO */}
      <aside className="grid h-fit gap-5 lg:sticky lg:top-6">
        <div className="rounded-2xl border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <StatusPill status={article.status ?? "draft"} />
            <SaveIndicator state={saveState} />
          </div>

          <div className="mt-4 grid gap-2">
            <button
              onClick={onPublish}
              disabled={publishing}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-brand-gradient text-sm font-medium text-white disabled:opacity-50"
            >
              {publishing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : article.status === "published" ? (
                "Actualizar publicado"
              ) : (
                "Publicar"
              )}
            </button>
            <button
              onClick={onSaveDraft}
              disabled={savingDraft}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-line text-sm font-medium hover:bg-sand disabled:opacity-50"
            >
              {savingDraft ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Save size={15} />
              )}
              Guardar borrador
            </button>
            {article.status === "published" && (
              <>
                <Link
                  href={publicPath}
                  target="_blank"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-line text-sm font-medium hover:bg-sand"
                >
                  Ver publicado <ExternalLink size={14} />
                </Link>
                <button
                  onClick={onUnpublish}
                  className="text-xs text-muted hover:text-brand-magenta"
                >
                  Volver a borrador
                </button>
              </>
            )}
          </div>
          {message && (
            <p
              className={cn(
                "mt-3 text-xs",
                saveState === "error" ? "text-brand-magenta" : "text-ink-soft"
              )}
            >
              {message}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-white p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
            SEO
          </h3>
          <div className="mt-4 grid gap-4">
            <FieldBlock label="Categoría">
              <select
                value={article.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 outline-none focus:border-brand-coral"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </FieldBlock>

            <FieldBlock label="Slug" hint={`URL: ${publicPath}`}>
              <input
                value={article.slug}
                onChange={(e) => set("slug", e.target.value)}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 outline-none focus:border-brand-coral"
              />
            </FieldBlock>

            <FieldBlock
              label="Meta title"
              hint={`${(article.meta_title ?? "").length}/60`}
              warn={(article.meta_title ?? "").length > 60}
            >
              <input
                value={article.meta_title ?? ""}
                onChange={(e) => set("meta_title", e.target.value)}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 outline-none focus:border-brand-coral"
              />
            </FieldBlock>

            <FieldBlock
              label="Meta description"
              hint={`${(article.meta_description ?? "").length}/155`}
              warn={(article.meta_description ?? "").length > 155}
            >
              <textarea
                value={article.meta_description ?? ""}
                onChange={(e) => set("meta_description", e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-coral"
              />
            </FieldBlock>

            <FieldBlock label="Extracto">
              <textarea
                value={article.excerpt ?? ""}
                onChange={(e) => set("excerpt", e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-coral"
              />
            </FieldBlock>

            <FieldBlock label="Keyword principal">
              <input
                value={article.primary_keyword ?? ""}
                onChange={(e) => set("primary_keyword", e.target.value)}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 outline-none focus:border-brand-coral"
              />
            </FieldBlock>

            <FieldBlock label="Keywords secundarias" hint="separadas por coma">
              <input
                value={(article.secondary_keywords ?? []).join(", ")}
                onChange={(e) =>
                  set(
                    "secondary_keywords",
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-coral"
              />
            </FieldBlock>

            <FieldBlock label="Imagen destacada">
              <div className="grid gap-2">
                {article.cover_image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.cover_image_url}
                    alt="Vista previa de la portada"
                    className="h-28 w-full rounded-lg border border-line object-cover"
                  />
                )}
                <input
                  value={article.cover_image_url ?? ""}
                  onChange={(e) => set("cover_image_url", e.target.value)}
                  placeholder="URL de la imagen o súbela abajo"
                  className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-coral"
                />
                <button
                  type="button"
                  onClick={() => coverFileRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-line text-sm font-medium hover:bg-sand disabled:opacity-50"
                >
                  {uploading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <UploadCloud size={14} />
                  )}
                  Subir imagen
                </button>
                <input
                  ref={coverFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onUploadImage(f);
                    e.target.value = "";
                  }}
                />
              </div>
            </FieldBlock>

            <div className="rounded-xl border border-line bg-sand p-3">
              <div className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
                <Sparkles size={14} className="text-brand-coral" />
                Prompt de imagen (IA)
              </div>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={5}
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-xs leading-relaxed outline-none focus:border-brand-coral"
              />
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(imagePrompt);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  } catch {
                    /* clipboard no disponible */
                  }
                }}
                className="mt-2 inline-flex h-9 w-full items-center justify-center gap-2 rounded-full border border-line bg-white text-sm font-medium hover:bg-mist"
              >
                {copied ? (
                  <Check size={14} className="text-spectrum-green" />
                ) : (
                  <Copy size={14} />
                )}
                {copied ? "Copiado" : "Copiar prompt"}
              </button>
              <p className="mt-2 text-xs text-muted">
                Pégalo en ChatGPT o Gemini, genera la imagen y súbela arriba.
                Ya incluye el formato 16:9 y el estilo profesional.
              </p>
            </div>

            <FieldBlock label="Alt de la imagen">
              <input
                value={article.cover_image_alt ?? ""}
                onChange={(e) => set("cover_image_alt", e.target.value)}
                className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-coral"
              />
            </FieldBlock>
          </div>
        </div>
      </aside>
    </div>
  );
}

function FieldBlock({
  label,
  hint,
  warn,
  children,
}: {
  label: string;
  hint?: string;
  warn?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-ink">{label}</span>
        {hint && (
          <span className={cn("text-xs", warn ? "text-brand-magenta" : "text-muted")}>
            {hint}
          </span>
        )}
      </div>
      {children}
    </label>
  );
}

function StatusPill({ status }: { status: "draft" | "published" }) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        status === "published"
          ? "bg-spectrum-green/15 text-spectrum-green"
          : "bg-mist text-muted"
      )}
    >
      {status === "published" ? "Publicado" : "Borrador"}
    </span>
  );
}

function SaveIndicator({ state }: { state: SaveState }) {
  if (state === "saving")
    return (
      <span className="flex items-center gap-1 text-xs text-muted">
        <Loader2 size={12} className="animate-spin" /> Guardando…
      </span>
    );
  if (state === "saved")
    return (
      <span className="flex items-center gap-1 text-xs text-spectrum-green">
        <Check size={12} /> Guardado
      </span>
    );
  if (state === "error")
    return <span className="text-xs text-brand-magenta">Error al guardar</span>;
  return null;
}

function FaqEditor({
  faq,
  onChange,
}: {
  faq: { q: string; a: string }[];
  onChange: (faq: { q: string; a: string }[]) => void;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
        FAQ (para FAQPage schema)
      </h3>
      <div className="mt-4 grid gap-4">
        {faq.map((item, i) => (
          <div key={i} className="rounded-xl border border-line p-3">
            <div className="flex items-start gap-2">
              <div className="flex-1 grid gap-2">
                <input
                  value={item.q}
                  placeholder="Pregunta"
                  onChange={(e) => {
                    const next = [...faq];
                    next[i] = { ...next[i], q: e.target.value };
                    onChange(next);
                  }}
                  className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-coral"
                />
                <textarea
                  value={item.a}
                  placeholder="Respuesta"
                  rows={2}
                  onChange={(e) => {
                    const next = [...faq];
                    next[i] = { ...next[i], a: e.target.value };
                    onChange(next);
                  }}
                  className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-coral"
                />
              </div>
              <button
                onClick={() => onChange(faq.filter((_, j) => j !== i))}
                className="rounded-lg p-2 text-muted hover:bg-sand hover:text-brand-magenta"
                aria-label="Eliminar pregunta"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => onChange([...faq, { q: "", a: "" }])}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-coral"
        >
          <Plus size={16} /> Añadir pregunta
        </button>
      </div>
    </div>
  );
}
