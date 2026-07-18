import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type TecnologiaItem = {
  nombre: string;
  tecnica: string; // qué es / qué hace (técnico, breve)
  beneficio: string; // qué gana el cliente (destacado)
  featured?: boolean;
  badge?: string; // ej. "Exclusivo en Colombia"
};

/**
 * Tarjetas de tecnología con el patrón obligatorio:
 *   nombre → una línea técnica → **beneficio destacado**.
 * Nunca una tecnología sin su beneficio.
 */
export function TecnologiaCards({
  eyebrow = "Cómo se procesa",
  title,
  intro,
  items,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: TecnologiaItem[];
}) {
  return (
    <Section>
      <div className="max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-lg text-ink-soft">{intro}</p>}
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.nombre} delay={i * 70}>
            <article
              className={cn(
                "flex h-full flex-col rounded-2xl border p-7 transition-shadow",
                item.featured
                  ? "border-transparent bg-ink text-white shadow-[0_24px_50px_-30px_rgba(238,63,109,0.6)]"
                  : "border-line bg-paper hover:shadow-[0_18px_40px_-28px_rgba(38,38,43,0.4)]"
              )}
            >
              {item.featured && (
                <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                  {item.badge ?? "Exclusivo"}
                </span>
              )}
              <h3
                className={cn(
                  "font-display text-lg font-semibold tracking-tight",
                  item.featured ? "text-white" : "text-ink"
                )}
              >
                {item.nombre}
              </h3>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed",
                  item.featured ? "text-white/65" : "text-muted"
                )}
              >
                {item.tecnica}
              </p>
              <p
                className={cn(
                  "mt-auto pt-4 font-medium",
                  item.featured ? "text-brand-amber" : "text-ink"
                )}
              >
                <span className="mr-1.5 text-brand-coral">→</span>
                {item.beneficio}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
