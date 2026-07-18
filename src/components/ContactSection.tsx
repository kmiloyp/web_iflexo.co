import { MapPin } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { locations } from "@/lib/config";

export function ContactSection({
  origen,
  title = "Hablemos de tu proyecto",
  subtitle = "Cuéntanos qué necesitas y te asesoramos sin compromiso. También puedes escribirnos directo por WhatsApp.",
  eyebrow = "Contacto",
  id = "contacto",
}: {
  origen?: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  id?: string;
}) {
  return (
    <Section id={id} className="scroll-mt-20 bg-mist">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-ink-soft">{subtitle}</p>

          <div className="mt-8 space-y-4">
            {locations.map((loc) => (
              <div
                key={loc.city}
                className="flex items-start justify-between gap-4 rounded-2xl border border-line bg-paper p-5"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 text-brand-coral" size={20} />
                  <div>
                    <p className="font-semibold text-ink">{loc.city}</p>
                    <p className="text-sm text-muted">{loc.region}</p>
                  </div>
                </div>
                <WhatsAppButton href={loc.whatsapp} size="sm" variant="outline">
                  WhatsApp
                </WhatsAppButton>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8">
          <ContactForm origen={origen} />
        </div>
      </div>
    </Section>
  );
}
