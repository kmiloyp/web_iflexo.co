"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { videoTestimonial } from "@/lib/config";

/**
 * Testimonio en video real (YouTube). Usa una "fachada": muestra la miniatura
 * y solo carga el reproductor de YouTube (nocookie) al hacer clic, para no
 * fijar cookies de terceros sin consentimiento (Ley 1581) y cargar más rápido.
 */
export function VideoTestimonial({
  id = videoTestimonial.id,
  title = "Testimonios en video",
  eyebrow = "Testimonios reales",
  className,
}: {
  id?: string;
  title?: string;
  eyebrow?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

  return (
    <Section className={className}>
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Escucha en sus propias palabras la experiencia de quienes ya imprimen
          con nosotros.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink shadow-[0_30px_60px_-30px_rgba(38,38,43,0.6)]">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={videoTestimonial.title}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Reproducir video de testimonios"
              className="group absolute inset-0 h-full w-full"
            >
              <Image
                src={thumb}
                alt="Testimonios de clientes de iFlexo"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/20" />
              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-gradient shadow-lg transition-transform group-hover:scale-110">
                <Play size={30} className="ml-1 text-white" fill="currentColor" />
              </span>
            </button>
          )}
        </div>
      </div>
    </Section>
  );
}
