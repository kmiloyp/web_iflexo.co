import type { PilarData } from "@/components/pilar/PaginaPilar";
import { pilarFlexografia } from "./flexografia";
import { pilarAnilox } from "./anilox";
import { pilarPlanchas } from "./planchas";
import { pilarColor } from "./color";
import { pilarTintas } from "./tintas";

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
  color: pilarColor,
  tintas: pilarTintas,
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
  color: {
    title: "Gestión de color en flexografía: guía completa",
    description:
      "Cómo lograr color repetible en flexografía: ganancia de punto, curvas de compensación, Delta E y por qué el impreso no coincide con lo aprobado.",
  },
  tintas: {
    title: "Tintas flexográficas: tipos, propiedades y cómo elegirlas",
    description:
      "Base agua, base solvente y UV: cómo elegir la tinta flexográfica según tu sustrato, controlar la viscosidad y evitar los problemas más comunes.",
  },
};
