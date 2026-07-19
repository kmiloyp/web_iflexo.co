import { Hero } from "@/components/landing/Hero";
import { Testimonials } from "@/components/landing/Testimonials";
import { VideoTestimonial } from "@/components/landing/VideoTestimonial";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ContactSection } from "@/components/ContactSection";
import { CifrasDestacadas } from "@/components/sections/CifrasDestacadas";
import { TecnologiaCards } from "@/components/sections/TecnologiaCards";
import { ProcesoPasos } from "@/components/sections/ProcesoPasos";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { testimonials } from "@/lib/landings";

export const metadata = buildMetadata({
  title: "Sobre iFlexo | Preprensa flexográfica en Bogotá y Medellín",
  description:
    "Somos el proveedor de preprensa que llevó Kodak Flexcel NX a Colombia. Proceso auditado por Miraclon, exposición Shine LED y equipo técnico en Bogotá y Medellín.",
  path: "/nosotros/",
});

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
        eyebrow="Sobre nosotros"
        title="Trajimos Flexcel NX a Colombia. **Y no nos quedamos ahí.**"
        subtitle="Fuimos el primer proveedor de preprensa del país en trabajar con Kodak Flexcel NX. Hoy somos los únicos con exposición Shine LED de Miraclon, porque la tecnología sin proceso no sirve de nada."
        bullets={[
          "Primer proveedor Flexcel NX del país",
          "Exposición Shine LED",
          "Bogotá y Medellín",
        ]}
        secondaryCta={{ label: "Visítanos o agenda una llamada", href: "#contacto" }}
      />

      <CifrasDestacadas
        items={[
          { valor: "1º", label: "proveedor con Flexcel NX en Colombia" },
          { valor: "2", label: "sedes físicas: Bogotá y Medellín" },
          { valor: "4", label: "frentes comerciales de zona", nota: "Barranquilla, Centroamérica, Norteamérica, Venezuela" },
          { valor: "48h", label: "entrega tras aprobación" },
        ]}
      />

      {/* Narrativa: por qué el proceso importa más que la marca */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div>
              <Eyebrow>Nuestra historia</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Por qué invertimos en un proceso que nadie más tiene
              </h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                Cuando trajimos Kodak Flexcel NX a Colombia, entendimos algo que
                hoy es el centro de lo que hacemos: la plancha llega igual a
                todos. Lo que cambia el resultado en la máquina es el proceso.
              </p>
              <p>
                Por eso invertimos en exposición Shine LED, en solventes
                específicos que no tapan el microtramado y en calibrar curvas
                para la máquina de cada cliente. No es una plancha genérica: es
                una plancha lista para <em>tu</em> proceso.
              </p>
              <p>
                Es un proceso auditado por Miraclon, actualmente en
                recertificación. Y es la razón por la que la misma marca de
                plancha rinde distinto según quién la procese.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <VideoTestimonial
        id="V4Xdm1nhRIw"
        eyebrow="Conócenos"
        title="Esto es iFlexo Visión Gráfica"
      />

      <TecnologiaCards
        eyebrow="Equipamiento y proceso"
        title="Lo que hay detrás de cada plancha"
        intro="No es solo tecnología: es un proceso medible de punta a punta."
        items={[
          {
            nombre: "Grabado SQUARESPOT",
            tecnica: "Grabado láser de la máscara con punto cuadrado, imagen 1:1.",
            beneficio: "Fidelidad total entre tu archivo y la plancha.",
          },
          {
            nombre: "Exposición Shine LED",
            tecnica: "Exposición con LED estable en lugar de tubos fluorescentes.",
            beneficio: "Uniformidad plancha a plancha, en el tiempo.",
            featured: true,
            badge: "Exclusivo en Colombia",
          },
          {
            nombre: "Revelado con solvente específico",
            tecnica: "Revelado que preserva el microtramado.",
            beneficio: "Altas luces y microtrama que sobreviven al proceso.",
          },
          {
            nombre: "Control de calidad medible",
            tecnica: "Cada plancha se verifica con instrumentos.",
            beneficio: "Entregamos con criterio técnico, no a ojo.",
          },
        ]}
      />

      <ProcesoPasos
        eyebrow="Control de calidad"
        title="Qué revisamos en cada plancha"
        steps={[
          { titulo: "Revisión del arte", desc: "Antes de grabar, no después." },
          { titulo: "Curvas para tu proceso", desc: "Anilox, tinta, sustrato y máquina." },
          { titulo: "Verificación de grabado", desc: "Fidelidad y microtramado." },
          { titulo: "Control final medible", desc: "Con criterio técnico documentado." },
        ]}
      />

      <Testimonials items={testimonials} className="bg-sand" />

      <ContactSection
        origen="/nosotros/"
        title="Visítanos o agenda una llamada"
        subtitle="Estamos en Bogotá y Medellín, con comerciales en Barranquilla, Centroamérica, Norteamérica y Venezuela."
      />

      <FinalCTA
        title="Conozcamos tu operación"
        body="Cuéntanos qué imprimes y te mostramos cómo lo resolvemos desde la preprensa."
      />
    </>
  );
}
