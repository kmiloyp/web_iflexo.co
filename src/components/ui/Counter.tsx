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
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }
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
