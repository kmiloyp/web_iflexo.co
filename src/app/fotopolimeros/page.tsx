import { Hero } from "@/components/landing/Hero";
import { Testimonials } from "@/components/landing/Testimonials";
import { VideoTestimonial } from "@/components/landing/VideoTestimonial";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ProblemaAgitacion } from "@/components/sections/ProblemaAgitacion";
import { TecnologiaCards } from "@/components/sections/TecnologiaCards";
import { ComparadorPuntos } from "@/components/sections/ComparadorPuntos";
import { ComparativaTabla } from "@/components/sections/ComparativaTabla";
import { Segmentos } from "@/components/sections/Segmentos";
import { ProcesoPasos } from "@/components/sections/ProcesoPasos";
import { Objeciones } from "@/components/sections/Objeciones";
import { CasoExito } from "@/components/sections/CasoExito";
import { JsonLd } from "@/components/JsonLd";
import {
  buildMetadata,
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
import { testimonials } from "@/lib/landings";

const META = {
  title: "Planchas Kodak Flexcel NX en Colombia | iFlexo",
  description:
    "Fotopolímeros Kodak Flexcel NX con exposición Shine LED, únicos en Colombia. Punto plano, microtramado estable y entrega en 48 horas.",
  path: "/fotopolimeros/",
};

export const metadata = buildMetadata(META);

const faq = [
  {
    q: "Si otros también venden Kodak Flexcel NX, ¿qué cambia con ustedes?",
    a: "La plancha es la misma; el resultado lo define el proceso. Somos los únicos en Colombia con exposición Shine LED, revelamos con solvente específico que no tapa el microtramado y calibramos curvas para tu máquina, anilox, tinta y sustrato.",
  },
  {
    q: "¿Qué espesores y formatos manejan?",
    a: "Trabajamos los espesores y formatos estándar del sistema Flexcel NX. Cuéntanos tu aplicación (banda angosta o banda ancha, sustrato y máquina) y te confirmamos el adecuado.",
  },
  {
    q: "¿Para qué sustratos sirven?",
    a: "Para el rango habitual de la flexografía: films, autoadhesivos, papel y cartón, entre otros. La calibración de curvas se hace según tu sustrato y tintas.",
  },
  {
    q: "¿En cuánto entregan?",
    a: "En máximo 48 horas tras la aprobación, desde Bogotá o Medellín.",
  },
  {
    q: "¿Puedo probar sin cambiar todo mi volumen?",
    a: "Sí. Mándanos un solo trabajo, el que más te cueste hoy, lo procesamos y lo comparas contra tu plancha actual en tu propia máquina.",
  },
  {
    q: "¿Atienden fuera de Bogotá y Medellín?",
    a: "Sí, a toda Colombia. Además tenemos comerciales en Barranquilla, Centroamérica, Norteamérica y Venezuela.",
  },
];

export default function FotopolimerosPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Planchas Kodak Flexcel NX",
          description: META.description,
          path: META.path,
          serviceType: "Preprensa flexográfica",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Fotopolímeros", path: META.path },
        ])}
      />
      <JsonLd data={faqSchema(faq)} />

      <Hero
        eyebrow="Fotopolímeros Kodak Flexcel NX"
        title="La plancha la fabrica Kodak. **El resultado lo define quién la procesa.**"
        subtitle="Somos los únicos en Colombia con exposición Shine LED de Miraclon. Por eso nuestras planchas Flexcel NX rinden distinto a las mismas planchas procesadas de otra forma."
        bullets={[
          "Punto plano real, grabado 1:1",
          "Microtramado que no se tapa",
          "Uniformidad plancha a plancha",
          "48 horas tras aprobación",
        ]}
        secondaryCta={{ label: "Compara con tu plancha actual", href: "#contacto" }}
      />

      <ProblemaAgitacion
        title="Todas las planchas imprimen. No todas imprimen igual el martes que el jueves."
        body={[
          "La plancha que salió bien el mes pasado y esta vez no. El operario que ajusta presión hasta que “queda”. El microtrama que se cerró. Las altas luces que se perdieron.",
          "El problema no siempre es la máquina ni el operario: muchas veces es que la plancha no llegó estable ni lista para tu proceso.",
        ]}
        closing="Una plancha que no repite te cuesta en cada arranque. **La estabilidad se fabrica en el proceso.**"
      />

      <TecnologiaCards
        eyebrow="Lo que hacemos distinto"
        title="Tecnología de Miraclon, procesada con criterio"
        intro="Cada tecnología va con lo que ganas en máquina. Nunca una sin la otra."
        items={[
          {
            nombre: "Grabado SQUARESPOT del TIL",
            tecnica: "Láser de punto cuadrado que graba la máscara 1:1, sin desviación.",
            beneficio: "Lo que diseñaste es exactamente lo que queda en la plancha.",
          },
          {
            nombre: "Punto plano real",
            tecnica: "Punto de cima plana, no redondeada.",
            beneficio: "Sólidos densos, altas luces que no desaparecen y tipografía fina que no se engorda.",
          },
          {
            nombre: "Advantage Patterns (DIGICAP NX)",
            tecnica: "Micropatrón con Advanced Edge Definition (AED): retiene la tinta en el borde del punto y deja escapar el aire.",
            beneficio: "Actúa como un anilox sobre la plancha: más densidad y mejor transferencia con la misma tinta.",
          },
          {
            nombre: "Tramas PureFlexo Printing",
            tecnica: "Patronado multiforma de Miraclon que frena la propagación no deseada de la tinta.",
            beneficio: "Menor ganancia de punto, menos acumulación de tinta en los bordes y una ventana de operación más amplia en la prensa.",
          },
          {
            nombre: "Exposición Shine LED",
            tecnica: "LED estable en lugar de tubos fluorescentes que se degradan con el uso.",
            beneficio: "La plancha de hoy es idéntica a la de dentro de seis meses. Esta es la razón principal por la que la misma marca rinde distinto según quién la procese.",
            featured: true,
            badge: "Exclusivo en Colombia",
          },
          {
            nombre: "Solvente específico para NX",
            tecnica: "Revelado que no tapa el microtramado de la plancha.",
            beneficio: "El microtramado no se tapa: estabilidad real en el tiraje.",
          },
        ]}
      />

      <ComparadorPuntos />

      <CasoExito
        eyebrow="Una sola plancha"
        stat="90%"
        statLabel="de nuestros clientes usa una sola plancha"
        title="Sólidos densos y tramas al 1%, sin dobles negros"
        body="El 90% de nuestros clientes ya no necesita dos negros ni dos planchas para combinar áreas sólidas y tramadas. Con una sola plancha logran sólidos muy densos y tramas tan finas como el 1%."
        closing="Menos planchas, menos montaje y menos costo — **con mejor resultado**."
      />

      <ComparativaTabla
        title="Plancha convencional vs Flexcel NX vs Flexcel NX por iFlexo"
        columns={[
          { label: "Plancha convencional" },
          { label: "Flexcel NX" },
          { label: "Flexcel NX por iFlexo", highlight: true },
        ]}
        rows={[
          { label: "Fidelidad archivo → plancha", cells: [false, true, true] },
          // Se quitó "Densidad de sólidos" (marcaba Alta/Alta en col. 2 y 3, sin
          // diferenciar). En su lugar, una fila donde el proceso de iFlexo sí
          // marca la diferencia frente a un Flexcel NX genérico: la calibración.
          { label: "Curvas calibradas para tu proceso", cells: [false, false, true] },
          { label: "Altas luces / microtrama estable", cells: [false, "Media", true] },
          { label: "Uniformidad plancha a plancha", cells: [false, "Media", true] },
          { label: "Repetibilidad en el tiempo", cells: [false, "Media", true] },
        ]}
      />

      <Segmentos
        eyebrow="Según tu proceso"
        title="El aprovechamiento cambia según lo que imprimes"
        items={[
          {
            tag: "Etiquetas y marquillas",
            titulo: "Banda angosta",
            desc: "Alta definición para tipografía fina y códigos, arranques rápidos.",
            href: "/soluciones/banda-angosta/",
          },
          {
            tag: "Empaque flexible",
            titulo: "Banda ancha",
            desc: "Control de tinta, menos paradas y cubrimiento parejo en blancos.",
            href: "/soluciones/banda-ancha/",
          },
        ]}
      />

      <ProcesoPasos
        title="Cómo trabajamos tu plancha"
        steps={[
          { titulo: "Recibimos y revisamos el arte", desc: "Antes de grabar, no después." },
          { titulo: "Preprensa y curvas para tu máquina", desc: "Finalización con curvas a tu anilox, tinta y sustrato." },
          { titulo: "Grabado y exposición Shine LED", desc: "SQUARESPOT + LED estable." },
          { titulo: "Revelado con solvente específico", desc: "El microtramado no se tapa." },
          { titulo: "Control de calidad medible", desc: "Se mide plancha a plancha." },
          { titulo: "Entrega en máximo 48 h", desc: "Tras aprobación, en Bogotá o Medellín." },
        ]}
      />

      <CasoExito
        stat="+50%"
        statLabel="menos paradas por tiraje"
        title="De parar 10 veces a parar menos de 5"
        body="Un cliente detenía la máquina unas 10 veces por tiraje entre correcciones y limpiezas. Con nuestras planchas bajó más del 50%. Y sus operarios ya piden la plancha amarilla: con las otras sufren."
        closing="No prometemos los mismos números para todos. **Prometemos medirlo contigo.**"
      />

      <VideoTestimonial />

      <Testimonials items={testimonials} className="bg-sand" />

      <Objeciones
        items={[
          {
            objecion: "Todas las planchas son iguales.",
            respuesta:
              "Casi cualquier plancha imprime. La diferencia está en cuánto te cuesta llegar a que imprima bien: cuántos ajustes, cuántas paradas, cuánto material antes de la primera hoja vendible.",
          },
          {
            objecion: "Son muy costosas.",
            respuesta:
              "Pueden costar alrededor de un 15% más por centímetro cuadrado. El costo que importa no es por cm², es por millar impreso: menos merma, menos tinta, menos paradas y menos reprocesos. Lo calculamos con tus números.",
          },
          {
            objecion: "El otro proveedor es más barato.",
            respuesta:
              "Probablemente sí. La pregunta es qué pagas además del precio: horas de máquina, material desperdiciado y reprocesos. Si al hacer esa cuenta el otro sigue saliendo mejor, te lo diremos de frente.",
          },
        ]}
      />

      <FAQ items={faq} eyebrow="Sobre las planchas" />

      <ContactSection
        origen="/fotopolimeros/"
        title="Manda un trabajo de prueba y compara"
        subtitle="El que más te duela hoy. Lo procesamos y lo comparas contra tu plancha actual en tu propia máquina."
      />

      <FinalCTA
        title="Cotiza tus planchas Flexcel NX"
        body="Cuéntanos tu trabajo (medidas, colores, sustrato) y te asesoramos con criterio técnico."
      />
    </>
  );
}
