import { Container } from "@/components/ui/Container";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contacto — Cotiza tu preprensa flexográfica",
  description:
    "Contáctanos para cotizar planchas Kodak Flexcel NX, prueba de color o reducción de color. Sedes en Bogotá y Medellín. Respuesta rápida por WhatsApp.",
  path: "/contacto/",
});

export default function ContactoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: "/contacto/" },
        ])}
      />

      <section className="bg-ink py-16 text-white sm:py-20">
        <Container>
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-amber">
            Contacto
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Hablemos de tu próximo trabajo
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            Escríbenos y te asesoramos sin compromiso. Cuanto más detalle nos
            des (medidas, colores, sustrato), mejor te podemos ayudar.
          </p>
        </Container>
      </section>

      <ContactSection
        origen="/contacto/"
        eyebrow="Escríbenos"
        title="Cuéntanos qué necesitas"
      />
    </>
  );
}
