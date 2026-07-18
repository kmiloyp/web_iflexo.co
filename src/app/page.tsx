import { Hero } from "@/components/landing/Hero";
import { Benefits, Differentiator } from "@/components/landing/sections";
import { ServicesGrid, BlogHighlights } from "@/components/landing/home-sections";
import { Testimonials } from "@/components/landing/Testimonials";
import { VideoTestimonial } from "@/components/landing/VideoTestimonial";
import { testimonials } from "@/lib/landings";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

const homeFaq = [
  {
    q: "¿Qué hace iFlexo Visión Gráfica?",
    a: "Somos una empresa colombiana de preprensa flexográfica. Producimos planchas Kodak Flexcel NX, hacemos gestión y prueba de color certificada, y optimizamos trabajos mediante reducción de color.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: "Tenemos sedes en Bogotá y Medellín, y atendemos a converters e impresores de toda Colombia.",
  },
  {
    q: "¿Trabajan con cualquier impresor flexográfico?",
    a: "Sí. Adaptamos las planchas y la gestión de color a tu máquina, anilox, tintas y sustrato para que el resultado sea predecible en tu proceso.",
  },
  {
    q: "¿Cómo solicito una cotización?",
    a: "Escríbenos por WhatsApp o llena el formulario de contacto con el detalle de tu trabajo y te asesoramos de inmediato.",
  },
];

const benefits = [
  {
    icon: "sparkles" as const,
    title: "Calidad de impresión superior",
    desc: "Tecnología Kodak Flexcel NX para el máximo detalle y densidad.",
  },
  {
    icon: "target" as const,
    title: "Color que se cumple",
    desc: "Prueba de color certificada con hasta 95% de coincidencia.",
  },
  {
    icon: "recycle" as const,
    title: "Menos desperdicio",
    desc: "Reducción de color y curvas calibradas que bajan la merma.",
  },
  {
    icon: "shield" as const,
    title: "Acompañamiento técnico",
    desc: "Un equipo que entiende tu proceso de impresión completo.",
  },
  {
    icon: "gauge" as const,
    title: "Producción predecible",
    desc: "Arranques más rápidos y tirajes estables de principio a fin.",
  },
  {
    icon: "layers" as const,
    title: "Cobertura nacional",
    desc: "Sedes en Bogotá y Medellín para toda Colombia.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />

      <Hero
        eyebrow="Preprensa flexográfica · Colombia"
        title="Impresión flexográfica con"
        highlight="visión gráfica"
        subtitle="Planchas Kodak Flexcel NX, prueba de color certificada y reducción de tintas. Ayudamos a converters e impresores a lograr más nitidez, color exacto y menos desperdicio."
        bullets={[
          "Kodak Flexcel NX",
          "Prueba de color 95%",
          "Bogotá y Medellín",
        ]}
      />

      <ServicesGrid />

      <Differentiator
        stat="95%"
        statLabel="coincidencia de color"
        title="El color que apruebas es el que imprimes"
        body="Nuestra prueba de color certificada alcanza hasta un 95% de coincidencia con el impreso final. Menos reprocesos, menos merma de arranque y clientes que aprueban con confianza."
      />

      <Benefits
        title="Por qué los impresores eligen iFlexo"
        subtitle="No entregamos insumos: entregamos una impresión que funciona en tu máquina."
        items={benefits}
      />

      <VideoTestimonial />

      <Testimonials items={testimonials} className="bg-sand" />

      <BlogHighlights />

      <FAQ items={homeFaq} eyebrow="Sobre iFlexo" />

      <ContactSection origen="/" />

      <FinalCTA
        title="Hagamos que tu próximo trabajo salga perfecto"
        body="Cuéntanos qué necesitas imprimir y te ayudamos desde la preprensa hasta la máquina."
      />
    </>
  );
}
