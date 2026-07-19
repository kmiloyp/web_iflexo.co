import { Hero } from "@/components/landing/Hero";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ProcesoPasos } from "@/components/sections/ProcesoPasos";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

const META = {
  title: "Contacto y cotizaciones | iFlexo Bogotá y Medellín",
  description:
    "Cotiza tus planchas flexográficas o pide una prueba de color. Respuesta rápida y entrega en máximo 48 horas tras aprobación. Bogotá y Medellín.",
  path: "/contacto/",
};

export const metadata = buildMetadata(META);

const faq = [
  {
    q: "¿Atienden a toda Colombia?",
    a: "Sí. Tenemos sedes físicas en Bogotá y Medellín, y comerciales en Barranquilla, Centroamérica, Norteamérica y Venezuela.",
  },
  {
    q: "¿Cómo les envío archivos pesados?",
    a: "Escríbenos por WhatsApp o por el formulario y te compartimos un enlace para subir tus artes sin límite de tamaño.",
  },
  {
    q: "¿En cuánto responden?",
    a: "Te responde una persona del equipo técnico, no un bot. La entrega de planchas es de máximo 48 horas tras la aprobación.",
  },
  {
    q: "¿Atienden fuera de Colombia?",
    a: "Sí, a través de nuestros frentes comerciales en Centroamérica, Norteamérica y Venezuela.",
  },
];

export default function ContactoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: META.path },
        ])}
      />
      <JsonLd data={faqSchema(faq)} />

      <Hero
        eyebrow="Hablemos"
        title="Cuéntanos qué vas a imprimir y **te decimos exactamente cómo lo resolvemos**."
        subtitle="Sin compromiso. Si prefieres, mándanos directamente un trabajo y lo comparamos con lo que estás usando hoy."
        bullets={["Respuesta de una persona real", "Entrega en 48 h", "Bogotá y Medellín"]}
        secondaryCta={{ label: "Ir al formulario", href: "#contacto" }}
      />

      <ProcesoPasos
        eyebrow="Sin ansiedad"
        title="Qué pasa cuando nos escribes"
        steps={[
          { titulo: "Te responde una persona", desc: "Del equipo técnico, no un bot." },
          { titulo: "Revisamos tu trabajo", desc: "Tu proceso, tu máquina y tu material." },
          { titulo: "Te damos cotización y tiempo", desc: "Claro y sin letra pequeña." },
          { titulo: "Entregamos en 48 h", desc: "Máximo, tras la aprobación." },
        ]}
      />

      <ContactSection
        origen="/contacto/"
        eyebrow="Escríbenos"
        title="Cuéntanos qué necesitas"
        subtitle="Cuanto más detalle nos des (medidas, colores, sustrato), mejor te podemos ayudar."
      />

      <FAQ items={faq} eyebrow="Contacto" />

      <FinalCTA
        title="Estamos a un mensaje de distancia"
        body="Elige la sede o el comercial más cercano y escríbenos por WhatsApp."
      />
    </>
  );
}
