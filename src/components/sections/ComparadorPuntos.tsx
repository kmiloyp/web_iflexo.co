import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Ilustración técnica ORIGINAL (no foto): punto redondo vs punto plano.
 * Explica por qué la cima del punto cambia la densidad del sólido y la
 * estabilidad de las altas luces. Vectorial, de marca, sin copyright.
 */
export function ComparadorPuntos({
  eyebrow = "Se ve la diferencia",
  title = "Punto redondo vs punto plano",
  subtitle = "La forma de la cima del punto define cuánta tinta transfiere y si las altas luces sobreviven. Así se ve la diferencia en la plancha y en el impreso.",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <Section className="bg-sand">
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
            <Panel
              titulo="Punto convencional"
              subtitulo="Cima redondeada"
              featured={false}
            >
              <DotCrossSection variant="round" />
              <ResultPatch variant="round" />
              <p className="mt-4 text-sm text-ink-soft">
                La cima redonda transfiere tinta de forma despareja: sólidos
                menos densos y altas luces que tienden a desaparecer.
              </p>
            </Panel>
          </Reveal>

          <Reveal delay={90}>
            <Panel
              titulo="Punto plano — Flexcel NX"
              subtitulo="Cima plana"
              featured
            >
              <DotCrossSection variant="flat" />
              <ResultPatch variant="flat" />
              <p className="mt-4 text-sm text-white/75">
                La cima plana apoya parejo: sólidos más densos, tipografía fina
                que no se engorda y altas luces que se sostienen.
              </p>
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
        <h3
          className={cn(
            "font-display text-lg font-semibold tracking-tight",
            featured ? "text-white" : "text-ink"
          )}
        >
          {titulo}
        </h3>
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-wider",
            featured ? "text-brand-amber" : "text-muted"
          )}
        >
          {subtitulo}
        </span>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/** Corte lateral del punto sobre la plancha (SVG). */
function DotCrossSection({ variant }: { variant: "round" | "flat" }) {
  const flat = variant === "flat";
  return (
    <figure>
      <figcaption
        className={cn(
          "mb-2 text-xs font-medium",
          flat ? "text-white/60" : "text-muted"
        )}
      >
        En la plancha (corte lateral)
      </figcaption>
      <svg
        viewBox="0 0 260 110"
        className="w-full"
        role="img"
        aria-label={
          flat ? "Punto de cima plana sobre la plancha" : "Punto de cima redondeada sobre la plancha"
        }
      >
        {/* base de la plancha */}
        <rect x="10" y="86" width="240" height="14" rx="3" fill="#c9c3ba" />
        <line x1="10" y1="86" x2="250" y2="86" stroke="#a89f92" strokeWidth="1.5" />

        {flat ? (
          <>
            {/* punto plano (mesa) */}
            <path
              d="M70 86 L86 40 L174 40 L190 86 Z"
              fill="#3a3a42"
            />
            {/* capa de tinta pareja en la cima */}
            <rect x="86" y="31" width="88" height="9" rx="2" fill="url(#tintaPlano)" />
            <defs>
              <linearGradient id="tintaPlano" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fbb215" />
                <stop offset="0.5" stopColor="#f57c1f" />
                <stop offset="1" stopColor="#ee3f6d" />
              </linearGradient>
            </defs>
          </>
        ) : (
          <>
            {/* punto redondo (cúpula) */}
            <path d="M60 86 A70 70 0 0 1 200 86 Z" fill="#8f8a82" />
            {/* tinta despareja: se acumula en los bordes, falta en el centro */}
            <path
              d="M60 86 A70 70 0 0 1 200 86"
              fill="none"
              stroke="#b0a89b"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="26 16"
            />
          </>
        )}
      </svg>
    </figure>
  );
}

/** Resultado en el impreso: sólido + altas luces. */
function ResultPatch({ variant }: { variant: "round" | "flat" }) {
  const flat = variant === "flat";
  return (
    <figure className="mt-5">
      <figcaption
        className={cn(
          "mb-2 text-xs font-medium",
          flat ? "text-white/60" : "text-muted"
        )}
      >
        En el impreso
      </figcaption>
      <div className="grid grid-cols-2 gap-3">
        {/* sólido */}
        <div className="overflow-hidden rounded-lg">
          <div
            className={cn(
              "flex h-16 items-end p-1.5 text-[10px] font-medium",
              flat ? "text-white" : "text-ink/70"
            )}
            style={{
              background: flat
                ? "#26262b"
                : "radial-gradient(circle at 50% 40%, #d9d4cc 0%, #3a3a42 120%)",
            }}
          >
            Sólido
          </div>
        </div>
        {/* altas luces */}
        <div className="overflow-hidden rounded-lg border border-line bg-white">
          <svg viewBox="0 0 100 64" className="h-16 w-full" aria-hidden>
            {Array.from({ length: 4 }).map((_, r) =>
              Array.from({ length: 6 }).map((_, c) => {
                const x = 12 + c * 15;
                const y = 12 + r * 14;
                // redondo: puntos irregulares que se rompen; plano: parejos
                const missing = !flat && (r * 6 + c) % 3 === 0;
                const rad = flat ? 2.6 : missing ? 0.8 : 2.1;
                return (
                  <circle
                    key={`${r}-${c}`}
                    cx={x}
                    cy={y}
                    r={rad}
                    fill={flat ? "#26262b" : "#6c6a72"}
                    opacity={missing ? 0.35 : 1}
                  />
                );
              })
            )}
          </svg>
        </div>
      </div>
    </figure>
  );
}
