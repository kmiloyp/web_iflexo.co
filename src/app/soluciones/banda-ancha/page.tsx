import { Hero } from "@/components/landing/Hero";
import { Testimonials } from "@/components/landing/Testimonials";
import { VideoTestimonial } from "@/components/landing/VideoTestimonial";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ProblemaAgitacion } from "@/components/sections/ProblemaAgitacion";
import { CifrasDestacadas } from "@/components/sections/CifrasDestacadas";
import { TecnologiaCards } from "@/components/sections/TecnologiaCards";
import { ComparadorTinta } from "@/components/sections/ComparadorTinta";
import { CasoExito } from "@/components/sections/CasoExito";
import { ComparativaTabla } from "@/components/sections/ComparativaTabla";
import { Objeciones } from "@/components/sections/Objeciones";
import { Segmentos } from "@/components/sections/Segmentos";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { testimonials } from "@/lib/landings";

const META = {
  title: "Planchas para empaque flexible y banda ancha | iFlexo",
  description:
    "Preprensa para banda ancha: menos paradas de limpieza, hasta 30% menos tinta blanca y color estable en todo el tiraje. Kodak Flexcel NX con Shine LED.",
  path: "/soluciones/banda-ancha/",
};

export const metadata = buildMetadata(META);

const faq = [
  {
    q: "¿Cómo logran menos paradas de limpieza?",
    a: "Con el control del flujo de tinta (PureFlexo Printing), que frena la propagación no deseada de tinta. Eso reduce la impresión sucia a mitad de tiraje y amplía la ventana de operación, sin depender del operario de turno.",
  },
  {
    q: "¿El ahorro de tinta blanca es real?",
    a: "Un cliente de banda ancha redujo un 30% el consumo de tinta blanca por pedido. No prometemos el mismo número a todos: lo medimos con tus trabajos reales.",
  },
  {
    q: "¿Sirve para mis sustratos de empaque flexible?",
    a: "Sí, para el rango habitual de films y laminados. La calibración de curvas se hace para tu máquina, anilox, tinta y sustrato.",
  },
  {
    q: "¿En cuánto entregan?",
    a: "En máximo 48 horas tras la aprobación, desde Bogotá o Medellín, con cobertura a toda Colombia.",
  },
];

export default function BandaAnchaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Soluciones", path: "/soluciones/banda-ancha/" },
          { name: "Banda ancha", path: META.path },
        ])}
      />
      <JsonLd data={faqSchema(faq)} />

      <Hero
        eyebrow="Banda ancha · Empaque flexible"
        title="A esta velocidad, **una parada cuesta más que la plancha entera**."
        subtitle="Planchas Kodak Flexcel NX con control de flujo de tinta y exposición Shine LED. Menos paradas para limpiar, menos tinta y color que se sostiene durante todo el tiraje."
        bullets={[
          "Más de 50% menos paradas por tiraje",
          "Hasta 30% menos tinta blanca",
          "Cubrimiento parejo en blancos",
          "Color estable de principio a fin",
        ]}
        secondaryCta={{ label: "Calculemos tu costo por millar", href: "#contacto" }}
      />

      <ProblemaAgitacion
        title="La matemática de la máquina parada"
        body={[
          "En banda ancha se mueven metros de material por minuto. Cada arranque es material perdido a escala, y la limpieza a mitad de tiraje que nadie tenía presupuestada se lleva el margen del pedido.",
          "Y está la tinta blanca: cuando necesitas más de la que deberías, el costo del trabajo se va por ahí sin que aparezca en ninguna cotización.",
        ]}
        closing="A esta escala, el costo no está en la plancha. **Está en todo lo que la plancha te hace gastar de más.**"
      />

      <CifrasDestacadas
        dark
        items={[
          { valor: "+50%", label: "menos paradas por tiraje", nota: "caso real" },
          { valor: "30%", label: "menos tinta blanca", nota: "caso real" },
          { valor: "95%", label: "coincidencia de color" },
          { valor: "48h", label: "máximo de entrega" },
        ]}
      />

      <TecnologiaCards
        eyebrow="Dónde se gana en banda ancha"
        title="Control de tinta, no fuerza bruta"
        intro="En banda ancha el dinero está en la tinta, las paradas y la merma. Nuestro proceso ataca las tres."
        items={[
          {
            nombre: "PureFlexo Printing",
            tecnica: "Patrón multiforma que controla el flujo de tinta y frena la propagación no deseada.",
            beneficio: "Menos paradas para limpiar, ventana de operación más amplia y mejor coincidencia prueba–impreso durante todo el tiraje.",
            featured: true,
            badge: "Clave en banda ancha",
          },
          {
            nombre: "Patronado de superficie",
            tecnica: "Micropatrón de borde que retiene tinta y libera el aire.",
            beneficio: "Mejor cubrimiento en blancos con la misma tinta.",
          },
          {
            nombre: "Exposición Shine LED",
            tecnica: "LED estable en lugar de tubos fluorescentes que se degradan.",
            beneficio: "Uniformidad plancha a plancha, tiraje tras tiraje.",
          },
          {
            nombre: "Solvente específico para NX",
            tecnica: "Revelado que no tapa el microtramado.",
            beneficio: "Estabilidad real en tirajes largos.",
          },
        ]}
      />

      <ComparadorTinta />

      <CasoExito
        stat="30%"
        statLabel="menos tinta blanca por pedido"
        title="Un ahorro que se cuenta en millones al año"
        body="Un impresor de banda ancha redujo un 30% el consumo de tinta blanca por pedido. Proyectado al año, el ahorro se cuenta en millones de pesos — y no vino de negociar mejor la tinta, sino de necesitar menos."
        closing="No prometemos el mismo número a todos. **Prometemos calcularlo con tus pedidos reales.**"
      />

      <ComparativaTabla
        eyebrow="El costo que importa"
        title="Costo por plancha vs costo por millar"
        columns={[
          { label: "Plancha convencional" },
          { label: "Plancha por iFlexo", highlight: true },
        ]}
        rows={[
          { label: "Costo por centímetro cuadrado", cells: ["Base", "~+15%"] },
          { label: "Merma de arranque", cells: ["Alta", "Menor"] },
          { label: "Consumo de tinta blanca", cells: ["Base", "Hasta −30%"] },
          { label: "Paradas de limpieza", cells: ["Muchas", "Menos"] },
          { label: "Reprocesos", cells: ["Frecuentes", "Menos"] },
          { label: "Costo por millar impreso", cells: ["Mayor", "Menor"] },
        ]}
      />

      <CasoExito
        eyebrow="Caso real · Antioquia"
        stat="4"
        statLabel="colores donde le decían que no se podía"
        title="Policromía en una máquina de stacks, por primera vez"
        body="Un impresor de banda ancha en Antioquia, con una máquina de stacks de hace años, nunca había impreso en policromía: otras empresas de preprensa le decían que no se podía. Con nuestro apoyo logró imprimir fotos e imágenes a cuatro colores."
        closing="Abrió un mercado que antes tenía cerrado. **La preprensa correcta cambia lo que tu máquina puede hacer.**"
      />

      <VideoTestimonial />

      <Testimonials items={testimonials} className="bg-sand" />

      <Objeciones
        items={[
          {
            objecion: "Son muy costosas.",
            respuesta:
              "Alrededor de un 15% más por centímetro cuadrado. Pero a esta escala el costo que importa es por millar: menos tinta blanca, menos paradas, menos merma y menos reprocesos. Lo calculamos con tus números.",
          },
          {
            objecion: "El otro proveedor es más barato.",
            respuesta:
              "En banda ancha, una parada a mitad de tiraje cuesta más que la diferencia de precio de la plancha. Hagamos la cuenta completa con tus pedidos: si el otro sigue saliendo mejor, te lo diremos de frente.",
          },
          {
            objecion: "No tengo tiempo de hacer pruebas.",
            respuesta:
              "Te pedimos un solo pedido, el que más blanco consuma. Lo procesamos y lo comparas en tu propia máquina.",
          },
        ]}
      />

      <FAQ items={faq} eyebrow="Banda ancha" />

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
        origen="/soluciones/banda-ancha/"
        title="Calculemos tu costo por millar"
        subtitle="Cuéntanos un pedido típico de banda ancha y te mostramos dónde está el ahorro."
      />

      <FinalCTA
        title="Manda un pedido de banda ancha"
        body="El que más blanco consuma. Lo procesamos y lo comparas contra tu plancha actual."
      />
    </>
  );
}
