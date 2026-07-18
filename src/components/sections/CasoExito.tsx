import { Section, Eyebrow } from "@/components/ui/Section";
import { Counter } from "@/components/ui/Counter";
import { renderHighlighted } from "@/lib/text";

/**
 * Caso de éxito con una cifra protagonista y narrativa. El `closing` puede
 * usar **...** para resaltar. Honestidad: no promete el mismo número a todos.
 */
export function CasoExito({
  eyebrow = "Caso real",
  stat,
  statLabel,
  title,
  body,
  closing,
}: {
  eyebrow?: string;
  stat: string;
  statLabel?: string;
  title: string;
  body: string;
  closing?: string;
}) {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full opacity-25 blur-3xl bg-spectrum"
        />
        <div className="relative grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="text-center lg:text-left">
            <Counter
              value={stat}
              className="font-display text-7xl font-extrabold leading-none text-gradient sm:text-8xl"
            />
            {statLabel && (
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-white/50">
                {statLabel}
              </p>
            )}
          </div>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">{body}</p>
            {closing && (
              <p className="mt-4 font-medium text-white">
                {renderHighlighted(closing)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
