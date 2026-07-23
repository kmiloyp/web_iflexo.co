"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Número que cuenta de 0 al valor al entrar en viewport. Acepta formatos como
 * "+50%", "30%", "95%", "48h": conserva prefijo y sufijo. Respeta
 * prefers-reduced-motion (muestra el valor final sin animar).
 */
export function Counter({
  value,
  className,
  durationMs = 1400,
}: {
  value: string;
  className?: string;
  durationMs?: number;
}) {
  const parsed = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  const prefix = parsed?.[1] ?? "";
  const numStr = parsed?.[2] ?? "0";
  const suffix = parsed?.[3] ?? "";
  const target = parseFloat(numStr.replace(",", "."));
  const decimals = numStr.includes(".") || numStr.includes(",") ? 1 : 0;

  const ref = useRef<HTMLSpanElement>(null);
  // Se inicializa en el valor FINAL, no en 0: así el HTML del servidor ya
  // contiene la cifra real y los bots que no ejecutan JS (GPTBot, ClaudeBot,
  // PerplexityBot) la leen. La animación 0→valor se activa solo en cliente y
  // solo para contadores que entran por scroll (ver más abajo).
  const [display, setDisplay] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // Ya se muestra el valor final; no animamos.
    }

    // Si el contador ya está a la vista al cargar (above the fold), se deja el
    // valor final tal cual: animar desde 0 aquí produciría un parpadeo. Solo
    // los que están por debajo del pliegue arrancan en 0 y cuentan al entrar.
    const rect = el.getBoundingClientRect();
    const yaVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (yaVisible) return;

    setDisplay(0);

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      let raf = 0;
      let startTs = 0;
      const step = (ts: number) => {
        if (!startTs) startTs = ts;
        const p = Math.min((ts - startTs) / durationMs, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(target * eased);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      io.disconnect();
      return () => cancelAnimationFrame(raf);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs]);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
