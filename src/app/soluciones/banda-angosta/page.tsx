import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/sections";
import { Testimonials } from "@/components/landing/Testimonials";
import { VideoTestimonial } from "@/components/landing/VideoTestimonial";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ProblemaAgitacion } from "@/components/sections/ProblemaAgitacion";
import { TecnologiaCards } from "@/components/sections/TecnologiaCards";
import { CasoExito } from "@/components/sections/CasoExito";
import { ProcesoPasos } from "@/components/sections/ProcesoPasos";
import { Segmentos } from "@/components/sections/Segmentos";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { testimonials } from "@/lib/landings";

const META = {
  title: "Planchas para etiquetas y banda angosta | iFlexo",
  description:
    "Preprensa para impresión de etiquetas en banda angosta: alta definición, arranques rápidos y color estable en tirajes cortos. Entrega en 48 horas.",
  path: "/soluciones/banda-angosta/",
};

export const metadata = buildMetadata(META);

const faq = [
  {
    q: "¿Qué es UV Choice y por qué sirve en banda angosta?",
    a: "Es una tecnología de patronado de superficie de Miraclon para aplicaciones UV de banda angosta. Optimiza la transferencia de tinta UV y aumenta la densidad hasta un 15%, con mejor reproducción de sólidos, líneas finas y códigos a menor volumen de tinta, y arranques más rápidos.",
  },
  {
    q: "¿Sirve para sustratos autoadhesivos, film y mangas?",
    a: "Sí, para el rango habitual de banda angosta. Calibramos las curvas según tu sustrato, tinta y máquina.",
  },
  {
    q: "¿Cómo ayuda con tantos SKU y reposiciones?",
    a: "La uniformidad de la exposición Shine LED hace que el mismo SKU se vea igual en la reposición de dentro de tres meses. Y la entrega en 48 horas ayuda con las reposiciones urgentes.",
  },
  {
    q: "¿Puedo probar con una sola etiqueta?",
    a: "Sí. Mándanos la etiqueta que más te cueste hoy, la procesamos y la comparas contra tu plancha actual en tu máquina.",
  },
];

export default function BandaAngostaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Soluciones", path: "/soluciones/banda-angosta/" },
          { name: "Banda angosta", path: META.path },
        ])}
      />
      <JsonLd data={faqSchema(faq)} />

      <Hero
        eyebrow="Banda angosta · Etiquetas y marquillas"
        title="Tirajes cortos, muchos SKU y **cero tiempo para arranques largos**."
        subtitle="En banda angosta el margen está en el arranque. Nuestras planchas llegan calibradas para tu máquina para que llegues al color aprobado en menos intentos."
        bullets={[
          "Alta definición para tipografía fina y códigos",
          "Degradados que no cortan",
          "Cambios de trabajo más ágiles",
          "48 horas tras aprobación",
        ]}
        secondaryCta={{ label: "Manda una etiqueta de prueba", href: "#contacto" }}
      />

      <ProblemaAgitacion
        title="En banda angosta no imprimes un trabajo: imprimes doce en una semana"
        body={[
          "Cada arranque es material perdido, y si necesitas tres intentos para llegar al color, el trabajo ya no dejó utilidad.",
          "El problema no es tu operario. Es que la plancha no llegó lista para tu proceso.",
        ]}
        closing="En tirajes cortos, el arranque es casi todo el trabajo. **Ahí es donde se gana o se pierde el margen.**"
      />

      <TecnologiaCards
        eyebrow="Pensado para etiqueta"
        title="Definición donde importa, arranques donde duele"
        intro="En banda angosta se juega en el detalle fino y en la velocidad de arranque. Nuestro proceso apunta a las dos."
        items={[
          {
            nombre: "Alta definición y punto plano",
            tecnica: "Detalle fino con punto de cima plana, grabado 1:1.",
            beneficio: "Tipografía legal diminuta y códigos legibles; sólidos de marca parejos.",
          },
          {
            nombre: "UV Choice Printing",
            tecnica: "Patronado de superficie de Miraclon para aplicaciones UV de banda angosta.",
            beneficio: "Hasta 15% más densidad de tinta, mejor reproducción de sólidos y códigos a menor volumen, y arranques más rápidos con más latitud de anilox.",
            featured: true,
            badge: "Para banda angosta UV",
          },
          {
            nombre: "Exposición Shine LED",
            tecnica: "LED estable en lugar de tubos fluorescentes que se degradan.",
            beneficio: "El mismo SKU se ve igual en la reposición de dentro de tres meses.",
          },
          {
            nombre: "Curvas para tu máquina",
            tecnica: "Calibración para tu anilox, tinta y sustrato.",
            beneficio: "La plancha llega lista para tu proceso, no para uno genérico.",
          },
        ]}
      />

      <Benefits
        eyebrow="En clave etiqueta"
        title="Lo que cambia en tu día a día"
        items={[
          { icon: "gauge", title: "Menos intentos por arranque", desc: "Llegas al color aprobado más rápido." },
          { icon: "layers", title: "Repetibilidad entre reposiciones", desc: "La reposición calza con la original." },
          { icon: "sparkles", title: "Texto legal legible", desc: "Tipografía diminuta y códigos nítidos." },
          { icon: "target", title: "Degradados limpios a cero", desc: "Sin cortes en las altas luces." },
          { icon: "droplets", title: "Sólidos de marca parejos", desc: "El color de marca, estable." },
          { icon: "timer", title: "Entrega ágil", desc: "48 horas para reposiciones urgentes." },
        ]}
      />

      <CasoExito
        stat="+50%"
        statLabel="menos paradas por tiraje"
        title="Menos intentos, más trabajos por turno"
        body="Cuando la plancha llega calibrada para tu máquina, el arranque deja de ser una lotería. Un cliente pasó de detener la máquina unas 10 veces por tiraje a menos de la mitad."
        closing="No prometemos los mismos números para todos. **Prometemos medirlo contigo.**"
      />

      <VideoTestimonial />

      <Testimonials items={testimonials} className="bg-sand" />

      <ProcesoPasos
        title="Cómo se arranca a trabajar con iFlexo"
        steps={[
          { titulo: "Nos mandas una etiqueta", desc: "La que más te cueste hoy." },
          { titulo: "Revisamos arte y proceso", desc: "Tu máquina, anilox, tinta y sustrato." },
          { titulo: "Curvas y grabado", desc: "Calibrado para tu banda angosta." },
          { titulo: "Comparas en tu máquina", desc: "Contra tu plancha actual." },
          { titulo: "Entrega en 48 h", desc: "Y reposiciones ágiles cuando las necesites." },
        ]}
      />

      <FAQ items={faq} eyebrow="Banda angosta" />

      <Segmentos
        eyebrow="Relacionado"
        title="Sigue explorando"
        items={[
          {
            tag: "Planchas",
            titulo: "Fotopolímeros Flexcel NX",
            desc: "Cómo procesamos la plancha para que rinda distinto.",
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
        origen="/soluciones/banda-angosta/"
        title="Manda una etiqueta de prueba"
        subtitle="La que más te cueste hoy. La procesamos y la comparas en tu propia máquina."
      />

      <FinalCTA
        title="Habla con un experto en banda angosta"
        body="Cuéntanos tu operación de etiquetas y te mostramos dónde acortar el arranque."
      />
    </>
  );
}
