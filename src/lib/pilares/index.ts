import type { PilarData } from "@/components/pilar/PaginaPilar";
import { pilarFlexografia } from "./flexografia";
import { pilarAnilox } from "./anilox";
import { pilarPlanchas } from "./planchas";

/**
 * Registro de páginas pilar por categoría. Una categoría sin entrada aquí
 * sigue mostrando solo el listado de artículos, como hasta ahora.
 *
 * Para añadir el pilar de /planchas/, /anilox/, /tintas/ o /color/: crear
 * `./planchas.tsx` con un objeto PilarData y registrarlo abajo.
 */
const pilares: Record<string, PilarData> = {
  flexografia: pilarFlexografia,
  anilox: pilarAnilox,
  planchas: pilarPlanchas,
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
  anilox: {
    title: "Rodillo anilox: qué es, tipos y cómo elegirlo",
    description:
      "El anilox decide cuánta tinta llega a tu plancha. Aprende cómo funciona, qué lineatura y volumen elegir, cómo limpiarlo y cuándo reemplazarlo.",
  },
  planchas: {
    title: "Cireles y planchas flexográficas: qué son y qué tipos hay",
    description:
      "Cirel, cliché, caucho o fotopolímero son la misma plancha. Te explicamos qué son, de qué están hechas, qué tipos existen y cómo cuidarlas.",
  },
};
