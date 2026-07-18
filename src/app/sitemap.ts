import type { MetadataRoute } from "next";
import { siteConfig, categories } from "@/lib/config";
import { getPublishedArticles } from "@/lib/articles";

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
    "/contacto/",
    "/privacy-policy/",
    "/aviso-legal/",
    "/politica-de-cookies/",
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

  return [...staticEntries, ...categoryEntries, ...articleEntries];
}
