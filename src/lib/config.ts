/**
 * Configuración central del sitio. Todo lo que pueda cambiar (WhatsApp,
 * sedes, navegación, categorías) vive aquí — nada hardcodeado en componentes.
 */

export const siteConfig = {
  name: "iFlexo Visión Gráfica",
  shortName: "iFlexo",
  legalName: "iFlexo Visión Gráfica S.A.S.",
  nit: "900.569.733-8",
  address: "Carrera 29A # 4A - 07",
  tagline: "Preprensa flexográfica de alto nivel",
  description:
    "Preprensa flexográfica en Colombia: planchas Kodak Flexcel NX, gestión y prueba de color certificada, y reducción de color. Más nitidez, menos desperdicio.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://iflexo.co",
  locale: "es_CO",
  email: process.env.CONTACT_TO_EMAIL ?? "info@i-flexo.com",
} as const;

/** WhatsApp — configurable por env, con default de la marca. */
const WA_BOGOTA = process.env.NEXT_PUBLIC_WA_BOGOTA ?? "https://wa.link/onzscn";
const WA_MEDELLIN =
  process.env.NEXT_PUBLIC_WA_MEDELLIN ?? "https://walink.co/2e1dd0";

export const whatsapp = {
  bogota: WA_BOGOTA,
  medellin: WA_MEDELLIN,
  // Comerciales: apuntan al WhatsApp principal hasta tener sus links reales.
  barranquilla: process.env.NEXT_PUBLIC_WA_BARRANQUILLA ?? WA_BOGOTA,
  centroamerica: process.env.NEXT_PUBLIC_WA_CENTROAMERICA ?? WA_BOGOTA,
  norteamerica: process.env.NEXT_PUBLIC_WA_NORTEAMERICA ?? WA_BOGOTA,
  venezuela: process.env.NEXT_PUBLIC_WA_VENEZUELA ?? WA_BOGOTA,
  /** CTA por defecto (Bogotá, sede principal). */
  default: WA_BOGOTA,
} as const;

/** Sedes FÍSICAS (planta/oficina). */
export const sedes = [
  {
    city: "Bogotá",
    label: "Sede principal",
    whatsapp: whatsapp.bogota,
    region: "Cundinamarca, Colombia",
  },
  {
    city: "Medellín",
    label: "Sede",
    whatsapp: whatsapp.medellin,
    region: "Antioquia, Colombia",
  },
] as const;

/** Presencia COMERCIAL (comerciales de zona, sin planta física). */
export const comerciales = [
  { city: "Barranquilla", region: "Costa Caribe", whatsapp: whatsapp.barranquilla },
  { city: "Centroamérica", region: "Comercial regional", whatsapp: whatsapp.centroamerica },
  { city: "Norteamérica", region: "Comercial regional", whatsapp: whatsapp.norteamerica },
  { city: "Venezuela", region: "Comercial regional", whatsapp: whatsapp.venezuela },
] as const;

/** Alias por compatibilidad: los CTA de sedes usan las físicas. */
export const locations = sedes;

/** Categorías del blog. slug = prefijo de URL (se conserva 1:1 del sitio actual). */
export const categories = [
  {
    slug: "flexografia",
    name: "Flexografía",
    description:
      "Todo sobre impresión flexográfica: fundamentos, materiales, ventajas y comparativas.",
    isBlogIndex: true,
  },
  {
    slug: "planchas",
    name: "Planchas",
    description:
      "Fotopolímeros y planchas flexográficas: Kodak Flexcel NX, distorsión, evolución y futuro.",
  },
  {
    slug: "anilox",
    name: "Anilox",
    description:
      "Rodillos anilox: BCM, lineatura y su papel en la transferencia de tinta.",
  },
  {
    slug: "tintas",
    name: "Tintas",
    description: "Composición y comportamiento de las tintas en flexografía.",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
export const categorySlugs = categories.map((c) => c.slug) as CategorySlug[];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

/** Navegación principal. */
export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Fotopolímeros", href: "/fotopolimeros/" },
  { label: "Prueba de color", href: "/prueba-de-color/" },
  { label: "Reducción de color", href: "/reduccion-de-color/" },
  { label: "Blog", href: "/flexografia/" },
  { label: "Nosotros", href: "/nosotros/" },
  { label: "Contacto", href: "/contacto/" },
] as const;

export const footerNav = {
  servicios: [
    { label: "Fotopolímeros Kodak Flexcel NX", href: "/fotopolimeros/" },
    { label: "Prueba de color", href: "/prueba-de-color/" },
    { label: "Reducción de color", href: "/reduccion-de-color/" },
  ],
  recursos: [
    { label: "Blog de flexografía", href: "/flexografia/" },
    { label: "Nosotros", href: "/nosotros/" },
    { label: "Contacto", href: "/contacto/" },
  ],
  legal: [
    { label: "Política de privacidad", href: "/privacy-policy/" },
    { label: "Aviso legal", href: "/aviso-legal/" },
    { label: "Política de cookies", href: "/politica-de-cookies/" },
  ],
} as const;

/** Mensaje pre-cargado para los CTA de WhatsApp (cuando aplique). */
export const waMessage =
  "Hola iFlexo, quiero información sobre sus servicios de preprensa flexográfica.";

/** Testimonio en video (YouTube, canal de iFlexo). */
export const videoTestimonial = {
  id: "KbehumnrtVY",
  title: "Testimonios iFlexo",
};
