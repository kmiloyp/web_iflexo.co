import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export type Paso = { titulo: string; desc: string };

/** Pasos numerados: horizontal en escritorio, vertical en móvil. */
export function ProcesoPasos({
  eyebrow = "Cómo trabajamos",
  title,
  steps,
}: {
  eyebrow?: string;
  title: string;
  steps: Paso[];
}) {
  return (
    <Section>
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>

      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.titulo} delay={i * 70}>
            <li className="flex h-full flex-col rounded-2xl border border-line bg-paper p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold tracking-tight">
                {step.titulo}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{step.desc}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
