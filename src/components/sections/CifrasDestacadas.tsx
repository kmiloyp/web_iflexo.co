import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/utils";

export type Cifra = { valor: string; label: string; nota?: string };

export function CifrasDestacadas({
  items,
  dark = false,
  className,
}: {
  items: Cifra[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <Section className={cn(dark ? "bg-ink text-white" : "bg-sand", className)}>
      <div
        className={cn(
          "grid gap-8 sm:gap-6",
          items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {items.map((c, i) => (
          <Reveal key={c.label} delay={i * 80}>
            <div className="text-center sm:text-left">
              <Counter
                value={c.valor}
                className="font-display text-5xl font-extrabold leading-none text-gradient sm:text-6xl"
              />
              <p
                className={cn(
                  "mt-3 font-medium",
                  dark ? "text-white/80" : "text-ink"
                )}
              >
                {c.label}
              </p>
              {c.nota && (
                <p className={cn("mt-1 text-xs", dark ? "text-white/45" : "text-muted")}>
                  {c.nota}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
