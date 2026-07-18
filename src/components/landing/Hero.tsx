import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Container } from "@/components/ui/Container";

export function Hero({
  eyebrow,
  title,
  highlight,
  subtitle,
  bullets,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
  bullets?: string[];
  primaryCta?: { label: string; href?: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Resplandor espectro (guiño a la gestión de color) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl bg-spectrum"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-brand-gradient opacity-70"
      />
      <Container className="relative py-20 sm:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
            {eyebrow}
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {title}{" "}
            {highlight && <span className="text-gradient">{highlight}</span>}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            {subtitle}
          </p>

          {bullets && bullets.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-coral" />
                  {b}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton size="lg" href={primaryCta?.href}>
              {primaryCta?.label ?? "Habla con un experto"}
            </WhatsAppButton>
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
