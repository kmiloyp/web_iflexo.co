import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { JsonLd } from "@/components/JsonLd";
import { PaginaPilar } from "@/components/pilar/PaginaPilar";
import {
  buildMetadata,
  breadcrumbSchema,
  faqSchema,
  absoluteUrl,
} from "@/lib/seo";
import { siteConfig, categories, categorySlugs, getCategory } from "@/lib/config";
import { getPilar, pilarMeta } from "@/lib/pilares";
import { getArticlesByCategory } from "@/lib/articles";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600; // ISR: refresca cada hora
export const dynamicParams = true;

export function generateStaticParams() {
  return categorySlugs.map((categoria) => ({ categoria }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) return {};

  // Si la categoría tiene página pilar, manda su metadata: la URL ya no es
  // un listado sino un artículo con contenido propio.
  const pilar = pilarMeta[cat.slug];
  if (pilar) {
    return buildMetadata({
      title: pilar.title,
      description: pilar.description,
      path: `/${cat.slug}/`,
      type: "article",
    });
  }

  return buildMetadata({
    title: cat.name,
    // La de búsqueda, no la visible en la página.
    description: cat.metaDescription,
    path: `/${cat.slug}/`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) notFound();

  const articles = await getArticlesByCategory(categoria);
  const isBlogIndex = cat.slug === "flexografia";
  const pilar = getPilar(cat.slug);
  const meta = pilarMeta[cat.slug];

  // Con pilar el H1 lo pone la guía, así que la cabecera oscura no se
  // muestra y las tarjetas bajan a H3 para no romper la jerarquía.
  const Titulo = pilar ? "h3" : "h2";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: cat.name, path: `/${cat.slug}/` },
        ])}
      />

      {pilar && meta && (
        <>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Article",
              headline: meta.title,
              description: meta.description,
              // Autor como Person (no Organization): pesa en E-E-A-T y en
              // visibilidad en IA. `url` se añadirá al crear /autores/.
              author: pilar.autor
                ? {
                    "@type": "Person",
                    name: pilar.autor.nombre,
                    jobTitle: pilar.autor.cargo,
                    ...(pilar.autor.href
                      ? { url: absoluteUrl(pilar.autor.href) }
                      : {}),
                  }
                : { "@type": "Organization", name: siteConfig.name },
              publisher: {
                "@type": "Organization",
                name: siteConfig.name,
                logo: {
                  "@type": "ImageObject",
                  url: absoluteUrl("/brand/logo-color.png"),
                },
              },
              mainEntityOfPage: absoluteUrl(`/${cat.slug}/`),
            }}
          />
          <JsonLd data={faqSchema(pilar.faq.items)} />
        </>
      )}

      {pilar ? (
        <PaginaPilar data={pilar} />
      ) : (
        <section className="bg-ink py-16 text-white sm:py-20">
          <Container>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-amber">
              {isBlogIndex ? "Blog" : "Categoría"}
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              {isBlogIndex ? "Blog de flexografía" : cat.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              {cat.description}
            </p>

            {/* Navegación por categorías */}
            <nav className="mt-8 flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}/`}
                  className={
                    c.slug === cat.slug
                      ? "rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink"
                      : "rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-white/70 hover:bg-white/10"
                  }
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </Container>
        </section>
      )}

      <Section className={pilar ? "border-t border-line bg-sand" : undefined}>
        {pilar && (
          <>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Artículos sobre {cat.name.toLowerCase()}
            </h2>
            <nav className="mb-8 mt-5 flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}/`}
                  className={
                    c.slug === cat.slug
                      ? "rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white"
                      : "rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink-soft hover:bg-paper"
                  }
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </>
        )}
        {articles.length === 0 ? (
          <p className="text-ink-soft">Pronto publicaremos contenido aquí.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a.id}
                href={`/${a.category}/${a.slug}/`}
                className="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(38,38,43,0.5)]"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-coral">
                  {getCategory(a.category)?.name}
                </span>
                <Titulo className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight group-hover:text-brand-magenta">
                  {a.title}
                </Titulo>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-ink-soft">
                  {a.excerpt}
                </p>
                {a.published_at && (
                  <time className="mt-4 text-xs text-muted">
                    {formatDate(a.published_at)}
                  </time>
                )}
              </Link>
            ))}
          </div>
        )}
      </Section>

      <FinalCTA
        title="¿Tienes un proyecto flexográfico?"
        body="Ponte en contacto y te asesoramos con criterio técnico."
      />
    </>
  );
}
