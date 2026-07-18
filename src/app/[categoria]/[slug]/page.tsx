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
  return buildMetadata({
    title: article.meta_title ?? article.title,
    description: article.meta_description ?? article.excerpt ?? "",
    path: `/${article.category}/${article.slug}/`,
    type: "article",
    images: article.cover_image_url ? [article.cover_image_url] : undefined,
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description ?? article.excerpt ?? "",
    image: article.cover_image_url
      ? [article.cover_image_url]
      : [absoluteUrl("/brand/logo-color.png")],
    datePublished: article.published_at ?? undefined,
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
