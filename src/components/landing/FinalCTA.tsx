import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Container } from "@/components/ui/Container";
import { locations } from "@/lib/config";

export function FinalCTA({
  title,
  body,
  ctaLabel = "Cotiza tu proyecto por WhatsApp",
}: {
  title: string;
  body: string;
  ctaLabel?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-white sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25 bg-spectrum blur-2xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-white/75">{body}</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {locations.map((loc) => (
                <WhatsAppButton
                  key={loc.city}
                  href={loc.whatsapp}
                  size="lg"
                  variant={loc.city === "Bogotá" ? "gradient" : "outline"}
                  className={
                    loc.city === "Bogotá"
                      ? ""
                      : "border-white/25 bg-transparent text-white hover:bg-white/10"
                  }
                >
                  {ctaLabel === "Cotiza tu proyecto por WhatsApp"
                    ? `WhatsApp ${loc.city}`
                    : ctaLabel}
                </WhatsAppButton>
              ))}
            </div>
            <p className="mt-5 text-sm text-white/50">
              Sedes en Bogotá y Medellín · Atención a toda Colombia
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
