import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/sections";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ProblemaAgitacion } from "@/components/sections/ProblemaAgitacion";
import { ProcesoPasos } from "@/components/sections/ProcesoPasos";
import { Segmentos } from "@/components/sections/Segmentos";
import { JsonLd } from "@/components/JsonLd";
import {
  buildMetadata,
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
import { testimonials } from "@/lib/landings";

const META = {
  title: "Servicios gráficos y preprensa para flexografía | iFlexo",
  description:
    "Preparación de artes, finalización de preprensa, montajes, gestión de color en planta, asesoría de anilox y capacitación para impresores flexográficos.",
  path: "/servicios-graficos/",
};

export const metadata = buildMetadata(META);

const faq = [
  {
    q: "¿Preparan el arte que me llega de la agencia?",
    a: "Sí. El arte que llega de una agencia casi nunca está listo para flexografía. Lo adaptamos: distorsión, sangrados, registro, separaciones y montaje, listo para tu máquina.",
  },
  {
    q: "¿Van a mi planta a hacer gestión de color?",
    a: "Sí. Vamos a tu máquina, medimos y calibramos con tus tintas y tus sustratos, no con un proceso genérico.",
  },
  {
    q: "¿Ofrecen capacitación a operarios?",
    a: "Sí: cuidado de planchas, montaje, productividad y eficiencia en impresión. La mejor plancha rinde según cómo se monta y se cuida.",
  },
  {
    q: "¿Me ayudan a elegir el anilox?",
    a: "Sí. El anilox equivocado arruina la mejor plancha. Te asesoramos según tu aplicación, tinta y sustrato.",
  },
];

export default function ServiciosGraficosPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Servicios gráficos y preprensa",
          description: META.description,
          path: META.path,
          serviceType: "Preprensa y acompañamiento técnico",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Servicios gráficos", path: META.path },
        ])}
      />
      <JsonLd data={faqSchema(faq)} />

      <Hero
        eyebrow="Servicios gráficos y acompañamiento técnico"
        title="El trabajo que te ahorramos **antes de que la plancha llegue a tu máquina**."
        subtitle="Preparación de artes, finalización de preprensa, montajes, gestión de color en tu planta, asesoría de anilox y capacitación de operarios. No entregamos un insumo: entramos en tu proceso."
        bullets={[
          "Artes listos para flexografía",
          "Gestión de color en tu planta",
          "Asesoría de anilox",
          "Capacitación a operarios",
        ]}
        secondaryCta={{ label: "Cuéntanos qué necesitas", href: "#contacto" }}
      />

      <Benefits
        eyebrow="Lo que hacemos"
        title="Todo lo que rodea a una buena impresión"
        subtitle="Cada servicio resuelve un problema que casi siempre nace antes de la máquina."
        items={[
          { icon: "layers", title: "Preparación de artes para flexografía", desc: "El arte que llega de la agencia casi nunca está listo para flexo. Lo dejamos listo." },
          { icon: "target", title: "Finalización de preprensa y montajes", desc: "Distorsión, repeticiones, sangrados y marcas de registro, bien hechos desde el archivo." },
          { icon: "droplets", title: "Gestión de color en tu planta", desc: "Vamos a tu máquina, medimos y calibramos con tus tintas y sustratos." },
          { icon: "gauge", title: "Asesoría de anilox", desc: "El anilox equivocado arruina la mejor plancha. Te ayudamos a elegir." },
          { icon: "shield", title: "Capacitación a operarios", desc: "Cuidado de planchas, montaje, productividad y eficiencia en impresión." },
          { icon: "sparkles", title: "Propuestas gráficas", desc: "Cuando el cliente llega con una idea y no con un archivo." },
        ]}
      />

      <ProblemaAgitacion
        title="La mayoría de los problemas de impresión no nacen en la máquina"
        body={[
          "Nacen en un archivo mal preparado, un anilox mal elegido o un montaje con la distorsión equivocada.",
          "Cuando eso llega a la prensa, ya es tarde y caro. El operario paga un problema que venía desde el arte.",
        ]}
        closing="Nosotros entramos antes. **Ahí es donde te acompañamos.**"
      />

      <ProcesoPasos
        title="Cómo es trabajar con el equipo técnico"
        steps={[
          { titulo: "Nos cuentas qué necesitas", desc: "Un arte, un montaje, color en planta o capacitación." },
          { titulo: "Revisamos tu proceso", desc: "Máquina, anilox, tintas y sustratos." },
          { titulo: "Ejecutamos con criterio", desc: "En preprensa o directamente en tu planta." },
          { titulo: "Te dejamos capacidad instalada", desc: "No solo resolvemos: te dejamos mejor preparado." },
        ]}
      />

      <Testimonials
        items={testimonials}
        eyebrow="Acompañamiento real"
        className="bg-sand"
      />

      <FAQ items={faq} eyebrow="Servicios gráficos" />

      <Segmentos
        eyebrow="Relacionado"
        title="Sigue explorando"
        items={[
          {
            tag: "Planchas",
            titulo: "Fotopolímeros Flexcel NX",
            desc: "El proceso que hace que la plancha rinda distinto.",
            href: "/fotopolimeros/",
          },
          {
            tag: "Color",
            titulo: "Prueba de color",
            desc: "Aprueba una vez y que en máquina salga eso mismo.",
            href: "/prueba-de-color/",
          },
        ]}
      />

      <ContactSection
        origen="/servicios-graficos/"
        title="Agenda una visita técnica"
        subtitle="Cuéntanos qué necesitas y coordinamos con el equipo técnico."
      />

      <FinalCTA
        title="Entramos en tu proceso"
        body="Desde el archivo hasta la máquina, te acompañamos para que la impresión salga bien a la primera."
      />
    </>
  );
}
