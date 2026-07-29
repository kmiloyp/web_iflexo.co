/**
 * Google tag: GA4 (analítica) + Google Ads (conversiones).
 *
 * La etiqueta de Google no sobrevivió a la migración desde WordPress, así que
 * aquí se reinstala completa: GA4 para analítica y Google Ads para las
 * conversiones de la landing /en/flexo-plates/. El conversion linker queda
 * activo automáticamente al configurar el ID de Ads en todas las páginas.
 */

/** GA4 (measurement ID). Restaura la analítica que se perdió al migrar. */
export const GA4_ID = "G-P6FDVCMZ6V";
/** Cuenta de conversiones de Google Ads. */
export const ADS_ID = "AW-878148865";

/** Etiquetas de conversión (send_to) de cada acción. */
export const CONVERSIONS = {
  leadForm: "AW-878148865/KX2FCMyiq9gcEIH63aID",
  leadWhatsapp: "AW-878148865/6-wUCIPck9gcEIH63aID",
} as const;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara una conversión de Google Ads. No-op si gtag aún no cargó (p. ej.
 * usuario con bloqueador), para no romper el flujo del formulario o el clic.
 */
export function adsConversion(sendTo: string): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "conversion", { send_to: sendTo });
}
