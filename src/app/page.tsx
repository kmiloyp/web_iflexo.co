import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/sections";
import { Testimonials } from "@/components/landing/Testimonials";
import { VideoTestimonial } from "@/components/landing/VideoTestimonial";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { BarraConfianza } from "@/components/sections/BarraConfianza";
import { ProblemaAgitacion } from "@/components/sections/ProblemaAgitacion";
import { CifrasDestacadas } from "@/components/sections/CifrasDestacadas";
import { Segmentos } from "@/components/sections/Segmentos";
import { TecnologiaCards } from "@/components/sections/TecnologiaCards";
import { ComparativaTabla } from "@/components/sections/ComparativaTabla";
import { CasoExito } from "@/components/sections/CasoExito";
import { Objeciones } from "@/components/sections/Objeciones";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { testimonials } from "@/lib/landings";

export const metadata = buildMetadata({
  title: "Preprensa flexográfica en Colombia | iFlexo Visión Gráfica",
  description:
    "Planchas Kodak Flexcel NX procesadas con exposición Shine LED, únicos en Colombia. Menos paradas, menos merma y color que se cumple. Entrega en 48 horas.",
  path: "/",
});

const objeciones = [
  {
    objecion:
      "Todas las planchas son iguales, las baratas también me imprimen bonito.",
    respuesta:
      "Es cierto que casi cualquier plancha imprime. La diferencia no está en si imprime, sino en cuánto te cuesta llegar a que imprima bien: cuántos ajustes, cuántas paradas, cuánto material antes de la primera hoja vendible. Un cliente pasó de detener la máquina unas 10 veces por tiraje a menos de la mitad.",
  },
  {
    objecion: "Son muy costosas.",
    respuesta:
      "Nuestra plancha puede costar alrededor de un 15% más por centímetro cuadrado. Ahora mira la otra columna: menos merma de arranque, menos tinta, menos paradas para limpiar y menos trabajos repetidos. El costo que importa no es por centímetro cuadrado: es por millar impreso. Con gusto lo calculamos con tus números reales.",
  },
  {
    objecion: "El otro proveedor es mucho más barato.",
    respuesta:
      "Probablemente sí. La pregunta que vale es qué estás pagando además del precio de la plancha: horas de máquina, material desperdiciado y reprocesos. Si al hacer esa cuenta el otro proveedor sigue saliendo mejor, te lo diremos de frente.",
  },
  {
    objecion: "No tengo tiempo de hacer pruebas.",
    respuesta:
      "Por eso no te pedimos que cambies tu operación. Te pedimos un trabajo. Uno solo, el que más te duela hoy. Lo procesamos y lo comparas contra tu plancha actual en tu propia máquina. Si no ves diferencia, no hay conversación.",
  },
];

const homeFaq = [
  {
    q: "Si otros también venden Kodak, ¿qué gano con iFlexo?",
    a: "La plancha llega igual a todos. Lo que cambia el resultado es el proceso: cómo se graba, cómo se expone, con qué se revela y con qué curvas se calibra. Somos los únicos en Colombia con exposición Shine LED, usamos solvente específico que no tapa el microtramado y calibramos curvas para tu máquina.",
  },
  {
    q: "¿Qué es la exposición Shine LED y por qué importa?",
    a: "Es la exposición de las planchas con lámparas LED estables en lugar de tubos fluorescentes, que se degradan con el uso. El resultado es una uniformidad real: la plancha de hoy es idéntica a la de dentro de seis meses.",
  },
  {
    q: "¿En cuánto tiempo entregan las planchas?",
    a: "En máximo 48 horas tras la aprobación. Tenemos sedes en Bogotá y Medellín.",
  },
  {
    q: "¿Puedo probar sin cambiar todo mi volumen?",
    a: "Sí. No te pedimos que cambies tu operación: mándanos un solo trabajo, el que más te duela hoy, lo procesamos y lo comparas contra tu plancha actual en tu propia máquina.",
  },
  {
    q: "¿Atienden fuera de Bogotá y Medellín?",
    a: "Sí. Trabajamos con converters e impresores de toda Colombia desde nuestras dos sedes.",
  },
  {
    q: "¿Su proceso está certificado?",
    a: "Es un proceso auditado por Miraclon, actualmente en recertificación. Fuimos el primer proveedor de preprensa del país en trabajar con Kodak Flexcel NX.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />

      <Hero
        eyebrow="Preprensa flexográfica · Bogotá y Medellín"
        title="Otros venden la plancha. Nosotros entregamos **la impresión que sale de ella**."
        subtitle="Planchas Kodak Flexcel NX procesadas con exposición Shine LED — el único proceso de su tipo en Colombia. Menos paradas de máquina, menos merma y un color que se cumple en el tiraje."
        bullets={[
          "Entrega en máximo 48 horas",
          "Exposición Shine LED: únicos en el país",
          "Prueba de color 95%",
          "Bogotá y Medellín",
        ]}
        secondaryCta={{
          label: "Envía tu trabajo y te lo diagnosticamos",
          href: "#contacto",
        }}
      />

      <BarraConfianza
        items={[
          { dato: "48 h", sub: "entrega tras aprobación" },
          { dato: "Shine LED", sub: "únicos en Colombia" },
          { dato: "95%", sub: "coincidencia de color" },
          { dato: "Bogotá · Medellín", sub: "cobertura nacional" },
        ]}
      />

      <ProblemaAgitacion
        title="El costo real no está en la plancha"
        body={[
          "Nadie mide lo que cuesta un arranque largo. Pero ahí se va el dinero: el operario ajustando presión a ojo, la máquina parada para limpiar, el rollo de material que se fue a la basura antes de la primera hoja vendible, el trabajo que se repitió porque el color no dio.",
          "Una plancha barata que te obliga a parar diez veces por tiraje no es barata.",
        ]}
        closing="La plancha es el 100% de lo que la máquina reproduce. Es la variable más barata de cambiar y **la que más impacto tiene**."
      />

      <CifrasDestacadas
        items={[
          { valor: "+50%", label: "menos paradas por tiraje", nota: "caso real de cliente" },
          { valor: "30%", label: "menos tinta blanca", nota: "caso real, banda ancha" },
          { valor: "95%", label: "coincidencia prueba–impreso" },
          { valor: "48h", label: "máximo de entrega" },
        ]}
      />

      <Segmentos
        title="¿Qué imprimes?"
        items={[
          {
            tag: "Etiquetas y marquillas",
            titulo: "Banda angosta",
            desc: "Tirajes cortos, muchos SKU, cambios constantes. Aquí la velocidad de arranque lo es todo.",
            href: "/soluciones/banda-angosta/",
          },
          {
            tag: "Empaque flexible",
            titulo: "Banda ancha",
            desc: "Metros de material por minuto. Aquí cada parada y cada gramo de tinta cuesta de verdad.",
            href: "/soluciones/banda-ancha/",
          },
        ]}
      />

      <TecnologiaCards
        title="Ya hay quien vende Kodak. La diferencia está en cómo se procesa."
        intro="La plancha llega igual a todos. Lo que cambia el resultado es el proceso: cómo se graba, cómo se expone, con qué se revela y con qué curvas se calibra. Ahí es donde estamos solos."
        items={[
          {
            nombre: "SQUARESPOT y punto plano",
            tecnica: "Grabado láser de punto cuadrado, imagen 1:1, con punto de cima plana.",
            beneficio: "Lo que diseñaste es exactamente lo que queda en la plancha: sólidos densos y tipografía fina que no se engorda.",
          },
          {
            nombre: "Patronado de superficie",
            tecnica: "Micropatrón en el borde del elemento que retiene la tinta y deja escapar el aire.",
            beneficio: "Funciona como un anilox sobre la plancha: más densidad con la misma tinta.",
          },
          {
            nombre: "Exposición Shine LED",
            tecnica: "Exposición con LED estable en lugar de tubos fluorescentes que se degradan con el uso.",
            beneficio: "La plancha de hoy es idéntica a la de dentro de seis meses. Por eso la misma marca rinde distinto según quién la procese.",
            featured: true,
            badge: "Exclusivo en Colombia",
          },
          {
            nombre: "Solvente específico para NX",
            tecnica: "Revelado que no tapa el microtramado de la plancha.",
            beneficio: "Las altas luces y el microtrama sobreviven al proceso. Estabilidad tiraje a tiraje.",
          },
        ]}
      />

      <ComparativaTabla
        title="La misma marca, procesada distinto"
        columns={[
          { label: "Plancha convencional" },
          { label: "Kodak con fluorescente" },
          { label: "Kodak por iFlexo (Shine LED)", highlight: true },
        ]}
        rows={[
          { label: "Uniformidad entre planchas", cells: [false, "Media", true] },
          { label: "Estabilidad del microtramado", cells: [false, false, true] },
          { label: "Densidad de sólidos", cells: ["Baja", "Media", "Alta"] },
          { label: "Repetibilidad en el tiempo", cells: [false, "Media", true] },
          { label: "Paradas de limpieza", cells: ["Muchas", "Medias", "Menos"] },
        ]}
      />

      <Benefits
        eyebrow="En clave de resultado"
        title="Lo que se nota en la máquina"
        subtitle="No vendemos el insumo. Vendemos lo que pasa cuando la plancha entra a producción."
        items={[
          { icon: "timer", title: "Arranques más cortos", desc: "Llegas al color aprobado en menos intentos." },
          { icon: "gauge", title: "Menos paradas para limpiar", desc: "Menos impresión sucia a mitad de tiraje." },
          { icon: "target", title: "Color estable de principio a fin", desc: "Lo que sale al inicio es lo que sale al final." },
          { icon: "droplets", title: "Menos tinta, mismo cubrimiento", desc: "Más densidad con menos consumo." },
          { icon: "layers", title: "Planchas iguales siempre", desc: "La reposición de dentro de meses calza." },
          { icon: "shield", title: "Alguien que te contesta", desc: "Soporte técnico que va a tu planta." },
        ]}
      />

      <CasoExito
        stat="+50%"
        statLabel="menos paradas por tiraje"
        title="De parar 10 veces a parar menos de 5"
        body="Un cliente detenía la máquina unas 10 veces por tiraje entre correcciones de color y limpiezas. Con nuestras planchas bajó más del 50%. Otro, en banda ancha, redujo un 30% el consumo de tinta blanca por pedido — al año, millones de pesos que dejaron de irse por el desagüe."
        closing="No prometemos los mismos números para todos. **Prometemos medirlo contigo.**"
      />

      <VideoTestimonial />

      <Testimonials items={testimonials} className="bg-sand" />

      {/* No solo hacemos planchas → servicios gráficos */}
      <Benefits
        eyebrow="Vamos más allá de la plancha"
        title="No solo hacemos planchas"
        items={[
          { icon: "target", title: "Montaje y finalización de preprensa", desc: "Distorsión, repeticiones y registro, bien hechos desde el archivo." },
          { icon: "layers", title: "Preparación de artes para flexografía", desc: "El arte que llega de la agencia lo dejamos listo para flexo." },
          { icon: "droplets", title: "Gestión de color en tu planta", desc: "Vamos a tu máquina, medimos y calibramos." },
          { icon: "shield", title: "Capacitación a operarios", desc: "Cuidado de planchas, montaje y eficiencia." },
          { icon: "gauge", title: "Asesoría de anilox", desc: "El anilox equivocado arruina la mejor plancha." },
          { icon: "recycle", title: "Reducción de color", desc: "Menos tintas, el mismo resultado visual." },
        ]}
      />
      <Container className="-mt-8 pb-4 text-center sm:-mt-12">
        <Button href="/servicios-graficos/" variant="outline" size="md">
          Ver todos los servicios gráficos
        </Button>
      </Container>

      <Objeciones items={objeciones} />

      <FAQ items={homeFaq} eyebrow="Antes de decidir" />

      <ContactSection origen="/" />

      <FinalCTA
        title="Mándanos un trabajo de prueba"
        body="El que más te duela hoy. Lo procesamos y lo comparas contra tu plancha actual en tu propia máquina."
      />
    </>
  );
}
