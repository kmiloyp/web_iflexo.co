import { Star } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string; // tipo de empresa, ej. "Impresor de etiquetas"
  city?: string; // ej. "Bogotá"
  source?: "Google" | "YouTube" | string;
};

export function Testimonials({
  items,
  title = "Lo que dicen nuestros clientes",
  eyebrow = "Prueba social",
  className,
}: {
  items: Testimonial[];
  title?: string;
  eyebrow?: string;
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <Section className={className}>
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.name + t.quote.slice(0, 12)}
            className="flex flex-col rounded-2xl border border-line bg-paper p-7"
          >
            <div className="flex gap-0.5 text-brand-amber">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-ink-soft">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <span className="font-semibold text-ink">{t.name}</span>
              {(t.role || t.company || t.city) && (
                <span className="block text-sm text-muted">
                  {[t.role, t.company, t.city].filter(Boolean).join(" · ")}
                </span>
              )}
              {t.source && (
                <span className="mt-1 inline-block text-xs font-medium uppercase tracking-wider text-brand-coral">
                  vía {t.source}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
