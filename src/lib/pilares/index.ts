import type { PilarData } from "@/components/pilar/PaginaPilar";
import { pilarFlexografia } from "./flexografia";

/**
 * Registro de páginas pilar por categoría. Una categoría sin entrada aquí
 * sigue mostrando solo el listado de artículos, como hasta ahora.
 *
 * Para añadir el pilar de /planchas/, /anilox/, /tintas/ o /color/: crear
 * `./planchas.tsx` con un objeto PilarData y registrarlo abajo.
 */
const pilares: Record<string, PilarData> = {
  flexografia: pilarFlexografia,
};

export function getPilar(categoria: string): PilarData | null {
  return pilares[categoria] ?? null;
}

/** Metadata propia del pilar, cuando la categoría tiene una. */
export const pilarMeta: Record<
  string,
  { title: string; description: string }
> = {
  flexografia: {
    title: "Flexografía: qué es, cómo funciona y para qué sirve",
    description:
      "Guía completa de flexografía: cómo funciona el proceso, qué elementos intervienen, qué se imprime y cómo evitar los problemas más comunes.",
  },
};
