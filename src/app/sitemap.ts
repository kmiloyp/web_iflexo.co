import type { MetadataRoute } from "next";
import { siteConfig, categories } from "@/lib/config";
import { getPublishedArticles } from "@/lib/articles";
import { autores } from "@/lib/autores";
import { enArticles } from "@/lib/en-articles";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticPaths = [
    "/",
    "/nosotros/",
    "/fotopolimeros/",
    "/soluciones/banda-ancha/",
    "/soluciones/banda-angosta/",
    "/prueba-de-color/",
    "/reduccion-de-color/",
    "/servicios-graficos/",
    "/contacto/",
    // Las legales van con noindex, así que no se listan aquí: pedir la
    // indexación de una página que la rechaza es una señal contradictoria.
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/${c.slug}/`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articles = await getPublishedArticles();
  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/${a.category}/${a.slug}/`,
    lastModified: a.published_at ? new Date(a.published_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const autorEntries: MetadataRoute.Sitemap = autores.map((a) => ({
    url: `${base}/autores/${a.slug}/`,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  // Artículos en inglés bajo /en/, con alternates hreflang a su par español.
  const enEntries: MetadataRoute.Sitemap = enArticles.map((a) => {
    const enUrl = `${base}/en/${a.category}/${a.slug}/`;
    const esUrl = `${base}${a.esPath}`;
    return {
      url: enUrl,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: { en: enUrl, es: esUrl } },
    };
  });

  return [
    ...staticEntries,
    ...categoryEntries,
    ...articleEntries,
    ...autorEntries,
    ...enEntries,
  ];
}
