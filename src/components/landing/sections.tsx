import {
  CheckCircle2,
  AlertTriangle,
  type LucideIcon,
  Layers,
  Droplets,
  Target,
  Gauge,
  Recycle,
  Sparkles,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";

/** Mapa de iconos por nombre (para poder guardar el icono como string en data). */
export const iconMap = {
  layers: Layers,
  droplets: Droplets,
  target: Target,
  gauge: Gauge,
  recycle: Recycle,
  sparkles: Sparkles,
  shield: ShieldCheck,
  timer: Timer,
} as const;
export type IconName = keyof typeof iconMap;

/* Problema → Solución --------------------------------------------------- */
export function ProblemSolution({
  problem,
  solution,
}: {
  problem: { title: string; points: string[] };
  solution: { title: string; points: string[] };
}) {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-sand p-8">
          <div className="flex items-center gap-2 text-brand-magenta">
            <AlertTriangle size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">
              El problema
            </span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
            {problem.title}
          </h3>
          <ul className="mt-5 space-y-3">
            {problem.points.map((p) => (
              <li key={p} className="flex gap-3 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-magenta" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-line bg-ink p-8 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-2xl bg-spectrum"
          />
          <div className="relative flex items-center gap-2 text-brand-amber">
            <Sparkles size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Nuestra solución
            </span>
          </div>
          <h3 className="relative mt-4 font-display text-2xl font-bold tracking-tight">
            {solution.title}
          </h3>
          <ul className="relative mt-5 space-y-3">
            {solution.points.map((p) => (
              <li key={p} className="flex gap-3 text-white/80">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-brand-amber"
                />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* Beneficios ------------------------------------------------------------ */
export function Benefits({
  eyebrow = "Por qué iFlexo",
  title,
  subtitle,
  items,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: { icon: IconName; title: string; desc: string }[];
}) {
  return (
    <Section className="bg-sand">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-4 text-lg text-ink-soft">{subtitle}</p>}
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon: LucideIcon = iconMap[item.icon];
          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-line bg-paper p-7 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(38,38,43,0.35)]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-ink-soft">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* Dato diferenciador (p. ej. prueba de color 95%) ----------------------- */
export function Differentiator({
  stat,
  statLabel,
  title,
  body,
}: {
  stat: string;
  statLabel: string;
  title: string;
  body: string;
}) {
  return (
    <Section>
      <div className="grid items-center gap-10 rounded-3xl border border-line bg-mist p-8 sm:p-12 lg:grid-cols-[auto_1fr]">
        <div className="text-center lg:text-left">
          <div className="font-display text-6xl font-extrabold leading-none text-gradient sm:text-7xl">
            {stat}
          </div>
          <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted">
            {statLabel}
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{body}</p>
        </div>
      </div>
    </Section>
  );
}
