"use client";

import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal, ImageOff } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type Lado = { src?: string; alt: string };

/**
 * Comparador antes/después con deslizador. Si falta la imagen real, muestra un
 * placeholder marcado con el alt esperado (nunca stock). Accesible: el deslizador
 * es un <input type="range"> que también responde al teclado.
 */
export function AntesDespues({
  eyebrow = "Se ve la diferencia",
  title,
  before,
  after,
  labelAntes = "Otro proceso",
  labelDespues = "iFlexo",
}: {
  eyebrow?: string;
  title: string;
  before: Lado;
  after: Lado;
  labelAntes?: string;
  labelDespues?: string;
}) {
  const [pos, setPos] = useState(50);
  const clamped = Math.min(Math.max(pos, 1), 99);

  return (
    <Section className="bg-sand">
      <div className="mx-auto max-w-3xl">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="relative mt-8 aspect-[4/3] select-none overflow-hidden rounded-2xl border border-line">
          {/* Después (capa completa) */}
          <Layer lado={after} label={labelDespues} labelSide="right" />

          {/* Antes (capa recortada) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${clamped}%` }}
          >
            <div
              className="absolute inset-0"
              style={{ width: `${(10000 / clamped).toFixed(2)}%` }}
            >
              <Layer lado={before} label={labelAntes} labelSide="left" muted />
            </div>
          </div>

          {/* Divisor + tirador */}
          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow"
            style={{ left: `${clamped}%` }}
          >
            <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
              <MoveHorizontal size={18} />
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Comparar antes y después"
            className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
      </div>
    </Section>
  );
}

function Layer({
  lado,
  label,
  labelSide,
  muted,
}: {
  lado: Lado;
  label: string;
  labelSide: "left" | "right";
  muted?: boolean;
}) {
  return (
    <div className="absolute inset-0">
      {lado.src ? (
        <Image src={lado.src} alt={lado.alt} fill className="object-cover" sizes="768px" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-mist p-6 text-center">
          <ImageOff size={28} className="text-muted" />
          <span className="text-xs font-medium text-muted">
            [Imagen pendiente]
          </span>
          <span className="max-w-[220px] text-xs text-muted/80">{lado.alt}</span>
        </div>
      )}
      <span
        className={cn(
          "absolute top-3 rounded-full px-3 py-1 text-xs font-semibold",
          labelSide === "left" ? "left-3" : "right-3",
          muted ? "bg-ink/70 text-white" : "bg-brand-gradient text-white"
        )}
      >
        {label}
      </span>
    </div>
  );
}
