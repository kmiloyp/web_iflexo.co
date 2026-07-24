import type { Metadata } from "next";
import { siteConfig, socialProfiles } from "@/lib/config";

/** URL absoluta a partir de una ruta con trailing slash. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean}`;
}

/** Metadata base para una página. Genera canonical, OG y Twitter card. */
export function buildMetadata({
  title,
  description,
  path = "/",
  images,
  type = "website",
  noIndex = false,
  locale,
  alternateLanguages,
}: {
  title: string;
  description: string;
  path?: string;
  images?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
  /** og:locale de la página. Por defecto el del sitio (es_CO). */
  locale?: string;
  /**
   * Versiones en otros idiomas para hreflang. Mapea código→ruta absoluta o
   * relativa, p. ej. { "en": "/en/anilox/bcm/", "x-default": "/anilox/bcm/" }.
   */
  alternateLanguages?: Record<string, string>;
}): Metadata {
  const url = absoluteUrl(path);
  // Si no se pasan imágenes, se usa la OG por defecto de marca
  // (app/opengraph-image.tsx). Los artículos pasan su portada.
  const ogImages = images?.map((src) => ({ url: src }));

  const languages = alternateLanguages
    ? Object.fromEntries(
        Object.entries(alternateLanguages).map(([k, v]) => [
          k,
          v.startsWith("http") ? v : absoluteUrl(v),
        ])
      )
    : undefined;

  return {
    // `absolute` evita que la plantilla global añada de nuevo "| iFlexo".
    title: { absolute: title },
    description,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale ?? siteConfig.locale,
      type,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImages ? { images: ogImages.map((i) => i.url) } : {}),
    },
    // `follow: true` a propósito: la página se saca del índice, pero Google
    // sigue rastreando sus enlaces. Con `nofollow` se cortaría el recorrido
    // y el enlace interno dejaría de transmitir valor.
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

/** JSON-LD Organization (global). */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/brand/logo-color.png"),
    description: siteConfig.description,
    email: siteConfig.email,
    // sameAs: asocia los perfiles oficiales a la entidad iFlexo (E-E-A-T,
    // visibilidad en IA). Google los usa para confirmar de quién es la marca.
    sameAs: [...socialProfiles],
    areaServed: "CO",
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Bogotá",
        addressCountry: "CO",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Medellín",
        addressCountry: "CO",
      },
    ],
  };
}

/** JSON-LD BreadcrumbList a partir de pares [nombre, ruta]. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** JSON-LD Service para páginas de servicio. */
export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    ...(serviceType ? { serviceType } : {}),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "CO",
    url: absoluteUrl(path),
  };
}

/** JSON-LD FAQPage a partir de pares pregunta/respuesta. */
export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
