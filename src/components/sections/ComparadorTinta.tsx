import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Ilustración técnica ORIGINAL (no foto): control de propagación de tinta con
 * PureFlexo. Muestra cómo la tinta que se propaga engorda bordes, tapa altas
 * luces y une puntos (dot bridging); con PureFlexo se mantiene limpia.
 */
export function ComparadorTinta({
  eyebrow = "Control de tinta",
  title = "Qué hace PureFlexo en el impreso",
  subtitle = "La tinta tiende a propagarse: engorda los bordes, tapa las altas luces y une los puntos. El patronado PureFlexo la mantiene en su sitio.",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-ink-soft">{subtitle}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal>
            <Panel titulo="Sin control de tinta" subtitulo="La tinta se propaga" featured={false}>
              <InkDetail variant="spread" />
            </Panel>
          </Reveal>
          <Reveal delay={90}>
            <Panel titulo="Con PureFlexo" subtitulo="Tinta en su sitio" featured>
              <InkDetail variant="clean" />
            </Panel>
          </Reveal>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Ilustración esquemática con fines explicativos.
        </p>
      </div>
    </Section>
  );
}

function Panel({
  titulo,
  subtitulo,
  featured,
  children,
}: {
  titulo: string;
  subtitulo: string;
  featured: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border p-6",
        featured
          ? "border-transparent bg-ink text-white shadow-[0_24px_50px_-30px_rgba(238,63,109,0.6)]"
          : "border-line bg-paper"
      )}
    >
      <div className="flex items-baseline justify-between">
        <h3 className={cn("font-display text-lg font-semibold tracking-tight", featured ? "text-white" : "text-ink")}>
          {titulo}
        </h3>
        <span className={cn("text-xs font-semibold uppercase tracking-wider", featured ? "text-brand-amber" : "text-muted")}>
          {subtitulo}
        </span>
      </div>
      <div className="mt-5 rounded-xl bg-white p-3">{children}</div>
    </div>
  );
}

function InkDetail({ variant }: { variant: "spread" | "clean" }) {
  const spread = variant === "spread";
  const ink = "#26262b";
  return (
    <svg viewBox="0 0 320 150" className="w-full" role="img" aria-label={spread ? "Tinta propagada" : "Tinta controlada con PureFlexo"}>
      {/* Sólido con borde: limpio vs con halo de propagación */}
      {spread && (
        <rect x="8" y="14" width="120" height="122" rx="3" fill={ink} opacity="0.18" />
      )}
      <rect x="14" y="20" width="104" height="110" rx="2" fill={ink} />
      {/* Altas luces (puntos pequeños) dentro del degradé, junto al sólido */}
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 3 }).map((_, c) => {
          const x = 150 + c * 26;
          const y = 30 + r * 34;
          const rad = spread ? 11 : 6;
          return <circle key={`${r}-${c}`} cx={x} cy={y} r={rad} fill={ink} opacity={spread ? 0.9 : 1} />;
        })
      )}
      {/* Líneas finas: engordadas/unidas vs finas separadas */}
      {[248, spread ? 262 : 268, spread ? 276 : 288].map((x, i) => (
        <rect key={i} x={x} y={22} width={spread ? 10 : 3} height={106} rx={1.5} fill={ink} opacity={spread ? 0.92 : 1} />
      ))}
    </svg>
  );
}
