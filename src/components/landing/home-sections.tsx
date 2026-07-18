import Link from "next/link";
import { ArrowRight, Layers, Target, Recycle } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { getPublishedArticles } from "@/lib/articles";
import { getCategory } from "@/lib/config";
import { formatDate } from "@/lib/utils";

const services = [
  {
    href: "/fotopolimeros/",
    icon: Layers,
    title: "Fotopolímeros Kodak Flexcel NX",
    desc: "Planchas de alta definición: sólidos densos, altas luces estables y ganancia de punto bajo control.",
  },
  {
    href: "/prueba-de-color/",
    icon: Target,
    title: "Prueba de color certificada",
    desc: "Hasta 95% de coincidencia con el impreso final. Aprueba con datos, no con suerte.",
  },
  {
    href: "/reduccion-de-color/",
    icon: Recycle,
    title: "Reducción de color",
    desc: "Menos tintas, el mismo resultado visual y un costo por millar más bajo.",
  },
];

export function ServicesGrid() {
  return (
    <Section>
      <div className="max-w-2xl">
        <Eyebrow>Qué hacemos</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Preprensa flexográfica que se nota en la máquina
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Tres servicios pensados para que imprimas mejor, más rápido y con
          menos desperdicio.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group relative flex flex-col rounded-2xl border border-line bg-paper p-7 transition-all hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(38,38,43,0.5)]"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white">
              <s.icon size={22} />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
              {s.title}
            </h3>
            <p className="mt-2 flex-1 text-ink-soft">{s.desc}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-coral">
              Ver más
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export async function BlogHighlights() {
  const articles = (await getPublishedArticles()).slice(0, 3);
  if (!articles.length) return null;

  return (
    <Section className="bg-sand">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <Eyebrow>Blog de flexografía</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Aprende del proceso, no solo del producto
          </h2>
        </div>
        <Link
          href="/flexografia/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-coral"
        >
          Ver todo el blog <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {articles.map((a) => {
          const cat = getCategory(a.category);
          return (
            <Link
              key={a.id}
              href={`/${a.category}/${a.slug}/`}
              className="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(38,38,43,0.5)]"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-coral">
                {cat?.name ?? a.category}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight group-hover:text-brand-magenta">
                {a.title}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-ink-soft">
                {a.excerpt}
              </p>
              {a.published_at && (
                <time className="mt-4 text-xs text-muted">
                  {formatDate(a.published_at)}
                </time>
              )}
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
