import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/sections";
import { Testimonials } from "@/components/landing/Testimonials";
import { testimonials } from "@/lib/landings";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Section, Eyebrow } from "@/components/ui/Section";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Nosotros — Preprensa flexográfica en Colombia",
  description:
    "Somos iFlexo Visión Gráfica: preprensa flexográfica especializada en planchas Kodak Flexcel NX y gestión de color. Sedes en Bogotá y Medellín.",
  path: "/nosotros/",
});

const values = [
  {
    icon: "target" as const,
    title: "Precisión",
    desc: "Medimos y calibramos. En color y en punto, los detalles definen el resultado.",
  },
  {
    icon: "shield" as const,
    title: "Cercanía técnica",
    desc: "Entendemos tu máquina y tu proceso. No entregamos y desaparecemos.",
  },
  {
    icon: "sparkles" as const,
    title: "Mejora continua",
    desc: "Adoptamos la mejor tecnología disponible para elevar tu impresión.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Nosotros", path: "/nosotros/" },
        ])}
      />

      <Hero
        eyebrow="Quiénes somos"
        title="Preprensa flexográfica con"
        highlight="obsesión por el detalle"
        subtitle="En iFlexo Visión Gráfica llevamos años ayudando a converters e impresores de Colombia a imprimir mejor. Combinamos tecnología Kodak Flexcel NX con un profundo conocimiento del proceso flexográfico."
        bullets={["Bogotá y Medellín", "Kodak Flexcel NX", "Gestión de color"]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Nuestra historia</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              De la plancha a la máquina, pensando siempre en el impreso final
            </h2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>
              Nacimos con una convicción simple: la calidad de un empaque o una
              etiqueta se decide mucho antes de llegar a la impresora. La
              preprensa es donde se gana —o se pierde— el trabajo.
            </p>
            <p>
              Por eso invertimos en tecnología Kodak Flexcel NX y en gestión de
              color, y acompañamos a cada cliente para que lo que se aprueba en
              preprensa sea exactamente lo que sale en producción.
            </p>
          </div>
        </div>
      </Section>

      <Benefits
        eyebrow="Lo que nos mueve"
        title="Nuestros valores"
        items={values}
      />

      <Testimonials items={testimonials} />

      <FinalCTA
        title="¿Conversamos sobre tu proyecto?"
        body="Estamos en Bogotá y Medellín, listos para ayudarte a imprimir mejor."
      />
    </>
  );
}
