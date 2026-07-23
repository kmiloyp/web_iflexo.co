import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { autores, getAutor } from "@/lib/autores";

export const dynamicParams = false;

export function generateStaticParams() {
  return autores.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const autor = getAutor(slug);
  if (!autor) return {};
  return buildMetadata({
    title: `${autor.nombre} — ${autor.cargo}`,
    description: autor.bio.length > 155 ? autor.bio.slice(0, 152) + "…" : autor.bio,
    path: `/autores/${autor.slug}/`,
    ...(autor.foto ? { images: [autor.foto] } : {}),
  });
}

export default async function AutorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const autor = getAutor(slug);
  if (!autor) notFound();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: autor.nombre,
    jobTitle: autor.cargo,
    url: absoluteUrl(`/autores/${autor.slug}/`),
    description: autor.bio,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(autor.foto ? { image: absoluteUrl(autor.foto) } : {}),
    ...(autor.perfiles?.length
      ? { sameAs: autor.perfiles.map((p) => p.url) }
      : {}),
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: autor.nombre, path: `/autores/${autor.slug}/` },
        ])}
      />

      <article className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-coral">
            Autor
          </p>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
            {autor.foto ? (
              <Image
                src={autor.foto}
                alt={autor.nombre}
                width={96}
                height={96}
                className="h-24 w-24 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div
                aria-hidden
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display text-3xl font-bold text-white"
              >
                {autor.nombre.trim().charAt(0)}
              </div>
            )}
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {autor.nombre}
              </h1>
              <p className="mt-1 text-ink-soft">
                {autor.cargo} · {autor.anios} años en flexografía
              </p>
            </div>
          </div>

          <div className="prose-iflexo mt-8 max-w-none">
            {autor.descripcion.map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}
          </div>

          {autor.perfiles?.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {autor.perfiles.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-full border border-line px-5 text-sm font-medium hover:bg-sand"
                >
                  {p.nombre}
                </a>
              ))}
            </div>
          ) : null}
        </Container>
      </article>

      <FinalCTA
        title="¿Tienes un proyecto flexográfico?"
        body="Escríbenos y lo revisamos con criterio técnico, desde la preprensa."
      />
    </>
  );
}
