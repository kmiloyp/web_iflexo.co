import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/sections";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ProblemaAgitacion } from "@/components/sections/ProblemaAgitacion";
import { ProcesoPasos } from "@/components/sections/ProcesoPasos";
import { AntesDespues } from "@/components/sections/AntesDespues";
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
  title: "Reducción de color en flexografía | Menos tintas, mismo resultado",
  description:
    "Reducimos el número de tintas de tu trabajo manteniendo el resultado visual. Menos estaciones, menos arranque y menor costo por millar.",
  path: "/reduccion-de-color/",
};

export const metadata = buildMetadata(META);

const faq = [
  {
    q: "¿Voy a perder calidad al reducir colores?",
    a: "No. El objetivo es mantener el resultado visual. Reconstruimos las separaciones con cuatricromía y directos estratégicos, y validamos con prueba de color antes de producir.",
  },
  {
    q: "¿Cuánto puedo ahorrar?",
    a: "Depende del trabajo. El ahorro viene de menos planchas, menos cambios de estación, menor consumo de tinta y menos merma de arranque. Lo evaluamos caso a caso con tu arte real.",
  },
  {
    q: "¿Sirve para cualquier tipo de trabajo?",
    a: "Es especialmente útil en trabajos con muchos colores directos. Analizamos tu arte y te decimos qué es viable reducir sin comprometer el diseño.",
  },
  {
    q: "¿Qué necesitan de mí para empezar?",
    a: "Tu arte y las condiciones de impresión (máquina, tintas, sustrato). Con eso hacemos el diagnóstico de optimización.",
  },
];

export default function ReduccionDeColorPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Reducción de color",
          description: META.description,
          path: META.path,
          serviceType: "Optimización de tintas",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Reducción de color", path: META.path },
        ])}
      />
      <JsonLd data={faqSchema(faq)} />

      <Hero
        eyebrow="Reducción de color"
        title="Menos tintas. El mismo resultado visual. **Menor costo por millar.**"
        subtitle="Analizamos tu trabajo y encontramos cuántas tintas realmente necesitas. Menos estaciones significa menos arranque, menos limpieza y menos inventario de tintas especiales."
        bullets={[
          "Menos tintas directas",
          "Mismo resultado visual",
          "Menor costo por millar",
          "Validado con prueba de color",
        ]}
        secondaryCta={{ label: "Analiza mi trabajo", href: "#contacto" }}
      />

      <ProblemaAgitacion
        title="Cada tinta de más te cuesta en cada millar"
        body={[
          "Una estación más. Un arranque más largo. Una limpieza más. Un inventario de tinta especial que se seca en la bodega esperando el próximo pedido.",
          "El costo de un color adicional no aparece en la cotización, pero se paga en cada tiraje.",
        ]}
        closing="No todos los directos son necesarios. **Los que sobran, se pueden quitar sin que se note en el impreso.**"
      />

      <ProcesoPasos
        title="Cómo hacemos el análisis"
        steps={[
          { titulo: "Recibimos tu arte", desc: "Con tus condiciones de impresión reales." },
          { titulo: "Analizamos las separaciones", desc: "Identificamos qué tintas directas son prescindibles." },
          { titulo: "Reconstruimos el color", desc: "Cuatricromía + directos estratégicos." },
          { titulo: "Validamos con prueba de color", desc: "Para no perder fidelidad." },
          { titulo: "Entregamos optimizado", desc: "El mismo resultado con menos recursos." },
        ]}
      />

      <AntesDespues
        title="El mismo arte, con menos tintas"
        before={{ alt: "Separación de color a 7 tintas directas del trabajo original" }}
        after={{ alt: "El mismo trabajo reconstruido a 4-5 tintas con resultado visual equivalente" }}
        labelAntes="7 tintas"
        labelDespues="4–5 tintas"
      />

      <Benefits
        eyebrow="El ahorro que se ve en cada millar"
        title="Menos complejidad, mismo impacto"
        items={[
          { icon: "recycle", title: "Menos tintas", desc: "Reducimos directos manteniendo la intención de diseño." },
          { icon: "gauge", title: "Menor costo por millar", desc: "Menos planchas y menos consumo de tinta." },
          { icon: "timer", title: "Menos cambios de máquina", desc: "Menos estaciones ocupadas por trabajo." },
          { icon: "target", title: "Fidelidad de color", desc: "Validado con prueba de color antes de producir." },
          { icon: "droplets", title: "Menos merma", desc: "Cada color que quitas es merma de arranque que ahorras." },
          { icon: "sparkles", title: "Diseño respetado", desc: "El impreso final se ve igual de bien." },
        ]}
      />

      <Testimonials items={testimonials} className="bg-sand" />

      <FAQ items={faq} eyebrow="Reducción de color" />

      <Segmentos
        eyebrow="Relacionado"
        title="Sigue explorando"
        items={[
          {
            tag: "Color",
            titulo: "Prueba de color",
            desc: "El respaldo que valida la reducción sin perder fidelidad.",
            href: "/prueba-de-color/",
          },
          {
            tag: "Planchas",
            titulo: "Fotopolímeros Flexcel NX",
            desc: "El proceso que hace que la plancha rinda distinto.",
            href: "/fotopolimeros/",
          },
        ]}
      />

      <ContactSection
        origen="/reduccion-de-color/"
        title="Mándanos un trabajo y te decimos cuántas tintas sobran"
        subtitle="Con tu arte y tus condiciones de impresión hacemos el diagnóstico de optimización."
      />

      <FinalCTA
        title="Imprime lo mismo, gasta menos"
        body="Analizamos tu trabajo y te mostramos cuántas tintas puedes ahorrar sin perder calidad."
      />
    </>
  );
}
