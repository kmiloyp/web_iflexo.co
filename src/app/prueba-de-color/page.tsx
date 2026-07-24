import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/sections";
import { Testimonials } from "@/components/landing/Testimonials";
import { VideoTestimonial } from "@/components/landing/VideoTestimonial";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ProblemaAgitacion } from "@/components/sections/ProblemaAgitacion";
import { CifrasDestacadas } from "@/components/sections/CifrasDestacadas";
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
  // "prueba Sherpa" siempre en pareja, nunca "Sherpa" a secas: el término
  // suelto compite con búsquedas de montañismo y atrae tráfico que rebota.
  title: "Prueba de color Sherpa para flexografía | 95% de fidelidad",
  description:
    "Prueba de color certificada con 95% de coincidencia con el impreso final. Aprueba con tu cliente antes de montar en máquina y evita reprocesos.",
  path: "/prueba-de-color/",
};

export const metadata = buildMetadata(META);

const faq = [
  {
    // F1 (SEO): la keyword "prueba Sherpa" estaba en el title pero no en el
    // cuerpo. 208 impresiones de "qué es una sherpa en impresión" con 0% CTR.
    q: "¿Qué es una prueba Sherpa?",
    a: "En preprensa flexográfica se llama coloquialmente «prueba Sherpa» a la prueba de color de contrato: una referencia física y medida del color final que el cliente firma para aprobar antes de imprimir. En iFlexo la hacemos con flujo GMG ColorProof, impresora Epson y verificación con espectrofotómetro en cabina D50, con hasta 95% de coincidencia con el impreso.",
  },
  {
    q: "¿Qué significa el 95% de coincidencia?",
    a: "Que la prueba reproduce el color del impreso final con hasta un 95% de fidelidad, medido con instrumentos y contra el impreso real —no contra un ideal—, bajo condiciones controladas de tu proceso (anilox, tintas y sustrato).",
  },
  {
    q: "¿Con qué equipos hacen la prueba?",
    a: "Con un flujo de gestión de color profesional GMG ColorProof y una impresora Epson especializada, con un espectrofotómetro que mide y garantiza el color impreso. Por eso la prueba es una referencia objetiva y repetible, no una apreciación visual.",
  },
  {
    q: "¿Sirve como prueba de contrato?",
    a: "Sí. Funciona como referencia objetiva de aprobación: el color aprobado queda documentado y medible, lo que reduce reclamos y discusiones con la marca.",
  },
  {
    q: "¿Para qué sustratos sirve?",
    a: "Trabajamos con perfilado adaptado a tus tintas y sustratos para que la gestión de color sea consistente en cada material.",
  },
  {
    q: "¿Puedo pedir la prueba sin comprar planchas?",
    a: "Sí, la prueba de color es un servicio que puedes solicitar por sí solo. Escríbenos y coordinamos una para tu próximo trabajo.",
  },
];

export default function PruebaDeColorPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Prueba de color certificada",
          description: META.description,
          path: META.path,
          serviceType: "Gestión y prueba de color",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Prueba de color", path: META.path },
        ])}
      />
      <JsonLd data={faqSchema(faq)} />

      <Hero
        eyebrow="Prueba de color certificada"
        title="Prueba de color para flexografía **que sí se cumple en máquina**"
        subtitle="Hasta 95% de coincidencia entre la prueba y el impreso final. La frase que más escuchamos cuando comparan: “quedó igual a la prueba, es increíble”."
        bullets={[
          "Hasta 95% de coincidencia",
          "Referencia objetiva de aprobación",
          "Menos reprocesos",
          "48 horas tras aprobación",
        ]}
        secondaryCta={{ label: "Solicita una prueba de color", href: "#contacto" }}
      />

      <ProblemaAgitacion
        title="La aprobación es donde se pierde el tiempo que nadie factura"
        body={[
          "El cliente aprueba una pantalla, la máquina entrega otra cosa, y empieza la discusión: ¿es la tinta, el sustrato, el operario? Se repite el arranque, a veces el trabajo entero.",
          "Y el que pierde credibilidad frente a la marca eres tú.",
        ]}
        closing="Una aprobación sin referencia objetiva es una discusión aplazada. **La prueba de color la cierra antes de que empiece.**"
      />

      <CifrasDestacadas
        items={[
          { valor: "95%", label: "coincidencia prueba–impreso" },
          { valor: "60%", label: "del rechazo en góndola se atribuye al color", nota: "referencia de industria" },
          { valor: "48h", label: "máximo de entrega" },
        ]}
      />

      <ProcesoPasos
        eyebrow="Sin humo"
        title="Cómo logramos el 95%"
        steps={[
          { titulo: "Perfilamos tu proceso real", desc: "Anilox, tintas y sustrato: tus condiciones, no un genérico." },
          { titulo: "Flujo de color con GMG ColorProof", desc: "Gestión de color profesional calibrada a tu perfil." },
          { titulo: "Salida en Epson especializada", desc: "Impresión controlada, evaluada bajo cabina de luz D50." },
          { titulo: "Verificación con espectrofotómetro", desc: "Un espectrofotómetro mide y garantiza el color, contra el impreso real." },
        ]}
      />

      <Benefits
        eyebrow="Lo que ganas"
        title="Un seguro contra reprocesos"
        items={[
          { icon: "timer", title: "Aprobaciones más rápidas", desc: "El cliente aprueba con confianza." },
          { icon: "recycle", title: "Menos reprocesos", desc: "Menos arranques repetidos y menos merma." },
          { icon: "shield", title: "Referencia objetiva", desc: "Un patrón medible para discutir con la marca." },
          { icon: "gauge", title: "Menos merma de arranque", desc: "Llegas al color objetivo en menos metros." },
          { icon: "sparkles", title: "Confianza del cliente final", desc: "Lo aprobado es lo que se imprime." },
          { icon: "target", title: "Color que se cumple", desc: "En pantalla, en papel y en máquina." },
        ]}
      />

      <VideoTestimonial />

      <Testimonials items={testimonials} className="bg-sand" />

      <FAQ items={faq} eyebrow="Prueba de color" />

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
            tag: "Ahorro",
            titulo: "Reducción de color",
            desc: "Menos tintas, el mismo resultado visual.",
            href: "/reduccion-de-color/",
          },
        ]}
      />

      <ContactSection
        origen="/prueba-de-color/"
        title="Pide tu prueba de color"
        subtitle="Coordinamos una prueba para tu próximo trabajo, con o sin planchas."
      />

      <FinalCTA
        title="Deja de adivinar el color"
        body="Certifica tu color con nosotros y aprueba con datos, no con suerte."
      />
    </>
  );
}
