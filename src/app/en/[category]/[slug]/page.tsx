import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { enArticles, getEnArticle } from "@/lib/en-articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return enArticles.map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getEnArticle(category, slug);
  if (!article) return {};
  const enPath = `/en/${article.category}/${article.slug}/`;
  return buildMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: enPath,
    type: "article",
    locale: "en_US",
    images: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    // hreflang en ambas direcciones. x-default → español (el sitio es es-first).
    alternateLanguages: {
      en: enPath,
      es: article.esPath,
      "x-default": article.esPath,
    },
  });
}

export default async function EnArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getEnArticle(category, slug);
  if (!article) notFound();

  const enPath = `/en/${article.category}/${article.slug}/`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: "en",
    headline: article.title,
    description: article.metaDescription,
    image: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/logo-color.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(enPath),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/en/" },
          { name: article.categoryLabel, path: enPath },
          { name: article.title, path: enPath },
        ])}
      />

      {/* lang="en": el <html> global es es-CO; este contenedor marca el
          idioma real del contenido para lectores de pantalla y crawlers. */}
      <article lang="en" className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <nav className="flex flex-wrap items-center gap-1 text-sm text-muted">
            <span className="text-ink">{article.categoryLabel}</span>
            <ChevronRight size={14} aria-hidden />
            <span className="text-ink">{article.title}</span>
          </nav>

          <header className="mt-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-coral">
              {article.categoryLabel}
            </span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.1] tracking-tight">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-4 text-lg text-ink-soft">{article.excerpt}</p>
            )}
            {/* Enlace a la versión en español (par hreflang visible). */}
            <p className="mt-4 text-sm text-muted">
              <Link href={article.esPath} className="underline hover:text-ink" hrefLang="es">
                Leer en español
              </Link>
            </p>
          </header>

          {article.coverImageUrl && (
            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image
                src={article.coverImageUrl}
                alt={article.coverImageAlt ?? article.title}
                width={1200}
                height={630}
                className="h-auto w-full"
              />
            </div>
          )}

          <div
            className="prose-iflexo mt-10"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </Container>
      </article>

      <ContactSection
        origen={enPath}
        title="Need help with your flexo project?"
        subtitle="If this was useful and you have a job in hand, let's talk."
      />
    </>
  );
}
