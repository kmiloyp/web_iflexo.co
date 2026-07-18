import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { categories, categorySlugs, getCategory } from "@/lib/config";
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
  return buildMetadata({
    title: cat.slug === "flexografia" ? "Blog de flexografía" : cat.name,
    description: cat.description,
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

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: cat.name, path: `/${cat.slug}/` },
        ])}
      />

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

      <Section>
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
                <h2 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight group-hover:text-brand-magenta">
                  {a.title}
                </h2>
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
