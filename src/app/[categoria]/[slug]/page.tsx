import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import {
  buildMetadata,
  breadcrumbSchema,
  faqSchema,
  absoluteUrl,
} from "@/lib/seo";
import { getCategory } from "@/lib/config";
import { pilarMeta } from "@/lib/pilares";
import { EN_BY_ES } from "@/lib/en-articles";
import { getArticle, getPublishedArticles } from "@/lib/articles";
import { siteConfig } from "@/lib/config";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((a) => ({ categoria: a.category, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}): Promise<Metadata> {
  const { categoria, slug } = await params;
  const article = await getArticle(categoria, slug);
  if (!article) return {};
  const esPath = `/${article.category}/${article.slug}/`;
  // Si el artículo tiene versión en inglés, emparejamos el hreflang.
  const enPath = EN_BY_ES[esPath];
  return buildMetadata({
    title: article.meta_title ?? article.title,
    description: article.meta_description ?? article.excerpt ?? "",
    path: esPath,
    type: "article",
    images: article.cover_image_url ? [article.cover_image_url] : undefined,
    ...(enPath
      ? {
          alternateLanguages: {
            es: esPath,
            en: enPath,
            "x-default": esPath,
          },
        }
      : {}),
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}) {
  const { categoria, slug } = await params;
  const article = await getArticle(categoria, slug);
  if (!article) notFound();

  const cat = getCategory(article.category);
  const enPath = EN_BY_ES[`/${article.category}/${article.slug}/`];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description ?? article.excerpt ?? "",
    image: article.cover_image_url
      ? [article.cover_image_url]
      : [absoluteUrl("/brand/logo-color.png")],
    datePublished: article.published_at ?? undefined,
    // Google usa dateModified para valorar la frescura del contenido.
    dateModified: article.updated_at ?? article.published_at ?? undefined,
    author: { "@type": "Organization", name: article.author ?? siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/logo-color.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/${article.category}/${article.slug}/`),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: cat?.name ?? article.category, path: `/${article.category}/` },
          {
            name: article.title,
            path: `/${article.category}/${article.slug}/`,
          },
        ])}
      />
      {article.faq && article.faq.length > 0 && (
        <JsonLd data={faqSchema(article.faq)} />
      )}

      <article className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          {/* Migas de pan */}
          <nav className="flex flex-wrap items-center gap-1 text-sm text-muted">
            <Link href="/" className="hover:text-ink">
              Inicio
            </Link>
            <ChevronRight size={14} />
            <Link href={`/${article.category}/`} className="hover:text-ink">
              {cat?.name ?? article.category}
            </Link>
            <ChevronRight size={14} />
            <span className="text-ink">{article.title}</span>
          </nav>

          <header className="mt-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-coral">
              {cat?.name ?? article.category}
            </span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.1] tracking-tight">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-4 text-lg text-ink-soft">{article.excerpt}</p>
            )}
            {article.published_at && (
              <p className="mt-4 text-sm text-muted">
                Por {article.author ?? siteConfig.shortName} ·{" "}
                {formatDate(article.published_at)}
              </p>
            )}
            {enPath && (
              <p className="mt-2 text-sm text-muted">
                <Link
                  href={enPath}
                  hrefLang="en"
                  className="underline hover:text-ink"
                >
                  Read in English
                </Link>
              </p>
            )}
          </header>

          {article.cover_image_url && (
            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image
                src={article.cover_image_url}
                alt={article.cover_image_alt ?? article.title}
                width={1200}
                height={630}
                className="h-auto w-full"
              />
            </div>
          )}

          {/* content_html es contenido autoría del admin (confiable). */}
          <div
            className="prose-iflexo mt-10"
            dangerouslySetInnerHTML={{ __html: article.content_html }}
          />

          {/* Enlace al pilar de la categoría: consolida la arquitectura de
              contenido pasando autoridad del artículo hacia la guía madre. */}
          {pilarMeta[article.category] && (
            <Link
              href={`/${article.category}/`}
              className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-line bg-sand p-5 transition-colors hover:border-brand-coral"
            >
              <span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-coral">
                  Guía completa
                </span>
                <span className="mt-1 block font-display text-lg font-semibold text-ink">
                  {pilarMeta[article.category].title}
                </span>
              </span>
              <ChevronRight
                size={22}
                className="shrink-0 text-muted"
                aria-hidden
              />
            </Link>
          )}
        </Container>
      </article>

      {article.faq && article.faq.length > 0 && (
        <FAQ items={article.faq} eyebrow="Preguntas frecuentes" />
      )}

      <ContactSection
        origen={`/${article.category}/${article.slug}/`}
        title="¿Te ayudamos con tu proyecto?"
        subtitle="Si este tema te resultó útil y tienes un trabajo entre manos, hablemos."
      />
    </>
  );
}
