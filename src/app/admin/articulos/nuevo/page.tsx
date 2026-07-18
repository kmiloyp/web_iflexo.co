"use client";

import { useState } from "react";
import { Check, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ArticleEditor, type EditorArticle } from "@/components/admin/ArticleEditor";
import { cn } from "@/lib/utils";

const STEPS = [
  "Analizando las 3 URLs (estructura y encabezados)",
  "Keyword research (sinónimos y secundarias)",
  "Procesando tu experiencia personal",
  "Redactando el artículo",
];

export default function NuevoArticuloPage() {
  const [keyword, setKeyword] = useState("");
  const [urls, setUrls] = useState(["", "", ""]);
  const [experiencia, setExperiencia] = useState("");
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const [stub, setStub] = useState(false);
  const [generated, setGenerated] = useState<EditorArticle | null>(null);

  const onGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setGenerated(null);
    setRunning(true);
    setActiveStep(0);

    // Avance visual de los pasos mientras el servidor trabaja.
    const ticker = setInterval(
      () => setActiveStep((s) => (s < STEPS.length - 1 ? s + 1 : s)),
      1400
    );

    try {
      const res = await fetch("/api/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword,
          urls: urls.filter(Boolean),
          experiencia,
        }),
      });
      const data = await res.json();
      clearInterval(ticker);
      setActiveStep(STEPS.length);

      if (!res.ok) {
        setError(data.error ?? "No se pudo generar el artículo.");
        return;
      }
      setStub(Boolean(data.stub));
      setGenerated({ ...data.article, status: "draft" });
    } catch {
      clearInterval(ticker);
      setError("Error de red al generar el artículo.");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="min-h-dvh bg-mist">
      <AdminHeader />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Generador de artículos
        </h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Ingresa la keyword, las 3 primeras posiciones de Google y tu
          experiencia. La IA redacta el artículo y todo el paquete SEO; tú
          revisas y publicas.
        </p>

        {!generated && (
          <form
            onSubmit={onGenerate}
            className="mt-8 grid gap-5 rounded-2xl border border-line bg-white p-6 sm:p-8"
          >
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">
                Keyword a posicionar
              </span>
              <input
                required
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Ej. anilox bcm"
                className="w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand-coral"
              />
            </label>

            <div className="grid gap-3">
              <span className="text-sm font-medium">
                URLs top 1 / 2 / 3 en Google
              </span>
              {urls.map((u, i) => (
                <input
                  key={i}
                  value={u}
                  onChange={(e) => {
                    const next = [...urls];
                    next[i] = e.target.value;
                    setUrls(next);
                  }}
                  placeholder={`https://… (posición ${i + 1})`}
                  className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-brand-coral"
                />
              ))}
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">
                Experiencia personal
              </span>
              <span className="mb-2 block text-xs text-muted">
                Se usará de forma literal y diseminada en el artículo. Puedes
                pegar texto dictado por voz.
              </span>
              <textarea
                required
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
                rows={7}
                placeholder="Cuenta desde tu experiencia real: casos, datos, aprendizajes en planta…"
                className="w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand-coral"
              />
            </label>

            {error && (
              <p className="flex items-center gap-2 text-sm text-brand-magenta">
                <AlertTriangle size={16} /> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={running}
              className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-brand-gradient px-8 font-medium text-white disabled:opacity-60"
            >
              {running ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Generando…
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Generar artículo
                </>
              )}
            </button>

            {/* Progreso de los 4 pasos */}
            {activeStep >= 0 && (
              <ol className="grid gap-2 border-t border-line pt-5">
                {STEPS.map((label, i) => {
                  const done = activeStep > i;
                  const current = activeStep === i;
                  return (
                    <li
                      key={label}
                      className={cn(
                        "flex items-center gap-3 text-sm",
                        done
                          ? "text-ink"
                          : current
                            ? "text-ink"
                            : "text-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full text-xs",
                          done
                            ? "bg-spectrum-green/15 text-spectrum-green"
                            : current
                              ? "bg-brand-gradient text-white"
                              : "bg-mist text-muted"
                        )}
                      >
                        {done ? (
                          <Check size={13} />
                        ) : current ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          i + 1
                        )}
                      </span>
                      {label}
                    </li>
                  );
                })}
              </ol>
            )}
          </form>
        )}

        {generated && (
          <div className="mt-8">
            {stub && (
              <div className="mb-5 flex items-center gap-2 rounded-xl border border-line bg-white p-4 text-sm text-ink-soft">
                <AlertTriangle size={18} className="text-brand-orange" />
                Generado con el <strong>stub</strong> (sin ANTHROPIC_API_KEY).
                Configura la API para obtener el artículo real.
              </div>
            )}
            <h2 className="mb-4 font-display text-xl font-semibold">
              Revisa y ajusta antes de publicar
            </h2>
            <ArticleEditor initial={generated} />
          </div>
        )}
      </div>
    </div>
  );
}
