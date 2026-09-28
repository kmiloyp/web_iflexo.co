"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/seo";

const VIDEO_SRC = "/video/iflexo-de-la-idea-al-empaque.mp4";
const POSTER_SRC = "/video/iflexo-de-la-idea-al-empaque-poster.jpg";
const VIDEO_NAME = "De la idea al empaque: el proceso de iFlexo";
const VIDEO_DESC =
  "Así se convierte una idea en un empaque impreso en flexografía, en seis pasos: idea, diseño, preprensa, planchas, impresión y empaque.";

/**
 * Video del proceso completo, alojado en el propio sitio (/public/video).
 * Usa una fachada: muestra el póster y solo descarga el MP4 al hacer clic,
 * para no penalizar la carga de la página. Incluye VideoObject para que
 * Google pueda mostrarlo en resultados de video.
 */
export function ProcesoVideo({
  eyebrow = "Cómo funciona",
  title = "De la idea al empaque, en 35 segundos",
  subtitle = "Idea, diseño, preprensa, planchas, impresión y empaque: así recorre tu trabajo el camino hasta el estante.",
  className,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <Section className={className}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: VIDEO_NAME,
          description: VIDEO_DESC,
          thumbnailUrl: absoluteUrl(POSTER_SRC),
          contentUrl: absoluteUrl(VIDEO_SRC),
          uploadDate: "2026-09-28",
          duration: "PT35S",
          inLanguage: "es",
        }}
      />

      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-ink-soft">{subtitle}</p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-sand shadow-[0_30px_60px_-30px_rgba(38,38,43,0.45)]">
          {playing ? (
            <video
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              className="absolute inset-0 h-full w-full"
              controls
              autoPlay
              playsInline
              title={VIDEO_NAME}
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Reproducir video: ${VIDEO_NAME}`}
              className="group absolute inset-0 h-full w-full"
            >
              <Image
                src={POSTER_SRC}
                alt="Proceso de iFlexo de la idea al empaque en seis pasos"
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/10" />
              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-gradient text-white shadow-xl transition-transform group-hover:scale-105">
                <Play size={32} className="ml-1" fill="currentColor" />
              </span>
            </button>
          )}
        </div>
      </div>
    </Section>
  );
}
