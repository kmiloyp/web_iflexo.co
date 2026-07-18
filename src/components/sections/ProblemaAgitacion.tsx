import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { renderHighlighted } from "@/lib/text";

/**
 * Bloque narrativo de dolor: tipografía grande, alto contraste. El cierre
 * (closing) puede usar **...** para resaltar en degradado.
 */
export function ProblemaAgitacion({
  eyebrow = "El problema",
  title,
  body,
  closing,
}: {
  eyebrow?: string;
  title: string;
  body: string[];
  closing?: string;
}) {
  return (
    <Section className="bg-ink text-white">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.75rem]">
            {renderHighlighted(title)}
          </h2>
        </Reveal>
        <div className="mt-7 space-y-5 text-lg leading-relaxed text-white/70">
          {body.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        {closing && (
          <Reveal delay={120}>
            <p className="mt-8 border-l-2 border-brand-coral pl-5 font-display text-xl font-semibold text-white sm:text-2xl">
              {renderHighlighted(closing)}
            </p>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
