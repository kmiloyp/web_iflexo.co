import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export type Segmento = {
  titulo: string;
  desc: string;
  href: string;
  tag?: string;
};

/** Tarjetas grandes que bifurcan el tráfico (banda ancha / banda angosta). */
export function Segmentos({
  eyebrow = "¿Qué imprimes?",
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: Segmento[];
}) {
  return (
    <Section>
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {items.map((s, i) => (
          <Reveal key={s.href} delay={i * 90}>
            <Link
              href={s.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink p-8 text-white transition-transform hover:-translate-y-1"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-2xl bg-spectrum transition-opacity group-hover:opacity-40"
              />
              {s.tag && (
                <span className="relative text-xs font-semibold uppercase tracking-wider text-brand-amber">
                  {s.tag}
                </span>
              )}
              <h3 className="relative mt-2 font-display text-2xl font-bold tracking-tight">
                {s.titulo}
              </h3>
              <p className="relative mt-3 flex-1 text-white/70">{s.desc}</p>
              <span className="relative mt-6 inline-flex items-center gap-2 font-medium text-white">
                Ver soluciones
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
