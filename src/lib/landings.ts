import type { IconName } from "@/components/landing/sections";
import type { Testimonial } from "@/components/landing/Testimonials";

/**
 * Copy de las landings de venta. Editable aquí sin tocar los componentes.
 * NOTA: los testimonios son de EJEMPLO — reemplazar por los reales de
 * Google/YouTube que ya aparecen en el sitio actual (Camilo).
 */

export const testimonials: Testimonial[] = [
  {
    quote:
      "Pasamos a planchas Kodak Flexcel NX con iFlexo y la ganancia de punto se controló muchísimo. Los sólidos quedan más limpios y el registro es otro nivel.",
    name: "Cliente de etiquetas",
    role: "Jefe de producción",
    source: "Google",
  },
  {
    quote:
      "La prueba de color certificada nos ahorró reprocesos. Lo que aprueba el cliente en pantalla es lo que sale en la máquina.",
    name: "Converter flexográfico",
    role: "Gerente de planta",
    source: "Google",
  },
  {
    quote:
      "El acompañamiento técnico marca la diferencia. No solo entregan planchas: entienden el proceso de impresión de punta a punta.",
    name: "Empresa de empaques",
    role: "Coordinador de calidad",
    source: "YouTube",
  },
];

export type LandingData = {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    bullets: string[];
  };
  problem: { title: string; points: string[] };
  solution: { title: string; points: string[] };
  benefits: {
    title: string;
    subtitle?: string;
    items: { icon: IconName; title: string; desc: string }[];
  };
  differentiator?: {
    stat: string;
    statLabel: string;
    title: string;
    body: string;
  };
  faq: { q: string; a: string }[];
  finalCta: { title: string; body: string };
};

export const landings: Record<string, LandingData> = {
  fotopolimeros: {
    slug: "fotopolimeros",
    path: "/fotopolimeros/",
    metaTitle: "Fotopolímeros y planchas Kodak Flexcel NX | iFlexo",
    metaDescription:
      "Planchas flexográficas Kodak Flexcel NX en Colombia: máxima nitidez, control de ganancia de punto y sólidos más densos. Preprensa flexográfica de alto nivel.",
    hero: {
      eyebrow: "Planchas Kodak Flexcel NX",
      title: "Fotopolímeros que llevan tu impresión al",
      highlight: "siguiente nivel",
      subtitle:
        "Producimos planchas flexográficas Kodak Flexcel NX con tecnología de punta patronada. Más densidad en sólidos, altas luces estables y una ganancia de punto bajo control, tiraje tras tiraje.",
      bullets: [
        "Tecnología Flexcel NX",
        "Sólidos más densos",
        "Registro milimétrico",
        "Acompañamiento técnico",
      ],
    },
    problem: {
      title: "Cuando la plancha falla, lo paga toda la producción",
      points: [
        "Ganancia de punto descontrolada que ensucia las medias tintas.",
        "Sólidos débiles que obligan a subir tinta y a desperdiciar sustrato.",
        "Altas luces que se pierden y detalles que no se sostienen en el tiraje.",
        "Reprocesos y paradas de máquina que disparan el costo por millar.",
      ],
    },
    solution: {
      title: "Planchas Flexcel NX hechas con criterio técnico",
      points: [
        "Patronado plano que transfiere tinta de forma uniforme y estable.",
        "Puntos con estructura definida: altas luces firmes y sólidos densos.",
        "Curvas de compensación calibradas a tu proceso de impresión real.",
        "Un equipo que revisa el archivo antes de grabar, no después.",
      ],
    },
    benefits: {
      title: "Lo que ganas con nuestros fotopolímeros",
      subtitle:
        "No entregamos solo una plancha: entregamos una impresión predecible.",
      items: [
        {
          icon: "sparkles",
          title: "Máxima nitidez",
          desc: "Detalle fino, textos pequeños y códigos legibles sin engrosar.",
        },
        {
          icon: "droplets",
          title: "Sólidos más densos",
          desc: "Mayor transferencia de tinta con menos consumo por metro.",
        },
        {
          icon: "target",
          title: "Ganancia de punto bajo control",
          desc: "Curvas calibradas para que la media tinta se mantenga limpia.",
        },
        {
          icon: "gauge",
          title: "Estabilidad en tiraje",
          desc: "La plancha 10.000 imprime como la primera.",
        },
        {
          icon: "layers",
          title: "Registro milimétrico",
          desc: "Colores que calzan y menos ajustes de arranque en máquina.",
        },
        {
          icon: "shield",
          title: "Acompañamiento real",
          desc: "Soporte técnico que conoce tu máquina, anilox y sustrato.",
        },
      ],
    },
    faq: [
      {
        q: "¿Qué ventaja tiene la tecnología Kodak Flexcel NX?",
        a: "El sistema Flexcel NX produce puntos con una estructura patronada que transfiere tinta de forma más uniforme. Eso se traduce en sólidos más densos, altas luces estables y una ganancia de punto mucho más controlada frente a fotopolímeros convencionales.",
      },
      {
        q: "¿Calibran las planchas a mi proceso de impresión?",
        a: "Sí. Aplicamos curvas de compensación según tu máquina, anilox, tintas y sustrato. El objetivo es que lo que apruebas en preprensa sea lo que imprimes en producción.",
      },
      {
        q: "¿Atienden a toda Colombia?",
        a: "Sí. Tenemos sedes en Bogotá y Medellín y trabajamos con converters e impresores de todo el país.",
      },
      {
        q: "¿Cómo pido una cotización?",
        a: "Escríbenos por WhatsApp con el detalle de tu trabajo (medidas, colores, sustrato) y te asesoramos de inmediato.",
      },
    ],
    finalCta: {
      title: "¿Listo para imprimir con planchas de verdad?",
      body: "Cuéntanos tu proyecto y te ayudamos a sacar el máximo de la tecnología Flexcel NX.",
    },
  },

  "prueba-de-color": {
    slug: "prueba-de-color",
    path: "/prueba-de-color/",
    metaTitle: "Prueba de color certificada (95%) | iFlexo",
    metaDescription:
      "Prueba de color certificada con hasta 95% de coincidencia con el impreso final. Aprueba en pantalla y en papel lo que realmente saldrá en máquina. Menos reprocesos.",
    hero: {
      eyebrow: "Gestión y prueba de color",
      title: "Aprueba el color una vez y",
      highlight: "acierta en máquina",
      subtitle:
        "Nuestra prueba de color certificada alcanza hasta un 95% de coincidencia con el impreso final. Tu cliente aprueba con confianza y tú evitas sorpresas costosas en el arranque.",
      bullets: [
        "Hasta 95% de coincidencia",
        "Prueba contractual",
        "Perfilado ICC",
        "Menos reprocesos",
      ],
    },
    problem: {
      title: "El color que aprueban no es el que imprime",
      points: [
        "El cliente aprueba en una pantalla sin calibrar y luego reclama.",
        "Cada máquina interpreta el color a su manera, sin un patrón común.",
        "Reprocesos, sustrato perdido y entregas que se retrasan.",
        "Discusiones interminables sobre 'de quién es la culpa' del color.",
      ],
    },
    solution: {
      title: "Una prueba que sirve de contrato de color",
      points: [
        "Perfilado ICC y gestión de color de punta a punta.",
        "Prueba certificada con hasta 95% de coincidencia con el impreso.",
        "Un patrón objetivo y medible que aprueba cliente, diseño y planta.",
        "Reducción real de reprocesos y de mermas de arranque.",
      ],
    },
    benefits: {
      title: "Por qué certificar tu color con iFlexo",
      items: [
        {
          icon: "target",
          title: "Coincidencia de hasta 95%",
          desc: "Lo aprobado y lo impreso hablan el mismo idioma.",
        },
        {
          icon: "shield",
          title: "Prueba contractual",
          desc: "Un documento objetivo que respalda la aprobación del cliente.",
        },
        {
          icon: "sparkles",
          title: "Perfilado ICC",
          desc: "Gestión de color estandarizada para sustratos y tintas.",
        },
        {
          icon: "recycle",
          title: "Menos reprocesos",
          desc: "Menos paradas, menos merma y menos discusiones de color.",
        },
        {
          icon: "gauge",
          title: "Arranques más rápidos",
          desc: "Llegas a color objetivo en menos tiempo y menos metros.",
        },
        {
          icon: "timer",
          title: "Entregas cumplidas",
          desc: "Un flujo de aprobación claro evita retrasos de última hora.",
        },
      ],
    },
    differentiator: {
      stat: "95%",
      statLabel: "coincidencia con el impreso",
      title: "Una prueba de color que puedes firmar",
      body: "Certificamos hasta un 95% de coincidencia entre la prueba y el impreso final. Ese número es la diferencia entre 'creo que va a salir bien' y 'sé que va a salir bien'. Tu cliente aprueba con seguridad y tu planta arranca con un objetivo claro.",
    },
    faq: [
      {
        q: "¿Qué significa 95% de coincidencia?",
        a: "Que la prueba certificada reproduce el color del impreso final con hasta un 95% de fidelidad, medido con instrumentos y estándares de gestión de color. Es un patrón objetivo, no una apreciación visual.",
      },
      {
        q: "¿La prueba sirve como aprobación del cliente?",
        a: "Sí. Funciona como prueba contractual: el color aprobado queda documentado y medible, lo que reduce reclamos y discusiones posteriores.",
      },
      {
        q: "¿Funciona para distintos sustratos?",
        a: "Trabajamos con perfilado ICC adaptado a tus tintas y sustratos para que la gestión de color sea consistente en cada material.",
      },
      {
        q: "¿Cómo empiezo?",
        a: "Escríbenos por WhatsApp y coordinamos una prueba para tu próximo trabajo.",
      },
    ],
    finalCta: {
      title: "Deja de adivinar el color",
      body: "Certifica tu color con nosotros y aprueba con datos, no con suerte.",
    },
  },

  "reduccion-de-color": {
    slug: "reduccion-de-color",
    path: "/reduccion-de-color/",
    metaTitle: "Reducción de color en flexografía | iFlexo",
    metaDescription:
      "Reducimos la cantidad de tintas de tu trabajo sin perder calidad visual: menos cambios de plancha, menos merma y menor costo por millar, manteniendo el color.",
    hero: {
      eyebrow: "Optimización de tintas",
      title: "Menos tintas, el mismo impacto,",
      highlight: "más margen",
      subtitle:
        "Reestructuramos tus separaciones para imprimir con menos colores directos sin sacrificar el resultado visual. Menos planchas, menos cambios y un costo por millar más bajo.",
      bullets: [
        "Menos tintas directas",
        "Mismo resultado visual",
        "Menor costo por millar",
        "Menos merma",
      ],
    },
    problem: {
      title: "Cada tinta de más te cuesta dinero",
      points: [
        "Trabajos con exceso de colores directos que encarecen cada tiraje.",
        "Más planchas, más cambios de estación y más tiempo de máquina.",
        "Mayor merma de arranque cada vez que sumas un color.",
        "Inventario de tintas que crece sin control.",
      ],
    },
    solution: {
      title: "Rediseñamos el color con criterio de producción",
      points: [
        "Análisis de tus separaciones para identificar tintas prescindibles.",
        "Reconstrucción con cuatricromía y directos estratégicos.",
        "Validación con prueba de color para no perder fidelidad.",
        "Un resultado visual equivalente con menos recursos.",
      ],
    },
    benefits: {
      title: "El ahorro que se ve en cada millar",
      items: [
        {
          icon: "recycle",
          title: "Menos tintas",
          desc: "Reducimos colores directos manteniendo la intención de diseño.",
        },
        {
          icon: "gauge",
          title: "Menor costo por millar",
          desc: "Menos planchas y menos consumo de tinta por trabajo.",
        },
        {
          icon: "timer",
          title: "Menos cambios de máquina",
          desc: "Menos estaciones ocupadas, más productividad por turno.",
        },
        {
          icon: "target",
          title: "Fidelidad de color",
          desc: "Validamos con prueba de color para no perder calidad.",
        },
        {
          icon: "recycle",
          title: "Menos merma",
          desc: "Cada color que quitas es merma de arranque que te ahorras.",
        },
        {
          icon: "sparkles",
          title: "Diseño respetado",
          desc: "El impreso final se ve igual de bien, con menos complejidad.",
        },
      ],
    },
    faq: [
      {
        q: "¿Voy a perder calidad al reducir colores?",
        a: "No. El objetivo es mantener el resultado visual. Reconstruimos las separaciones con cuatricromía y directos estratégicos, y validamos con prueba de color antes de producir.",
      },
      {
        q: "¿Cuánto puedo ahorrar?",
        a: "Depende del trabajo, pero el ahorro proviene de menos planchas, menos cambios de estación, menor consumo de tinta y menos merma de arranque. Lo evaluamos caso a caso.",
      },
      {
        q: "¿Sirve para cualquier tipo de trabajo?",
        a: "Es especialmente útil en trabajos con muchos colores directos. Analizamos tu arte y te decimos qué es viable reducir sin comprometer el diseño.",
      },
      {
        q: "¿Cómo lo solicito?",
        a: "Envíanos tu arte por WhatsApp y te damos un diagnóstico de optimización.",
      },
    ],
    finalCta: {
      title: "Imprime lo mismo, gasta menos",
      body: "Analizamos tu trabajo y te mostramos cuántas tintas puedes ahorrar sin perder calidad.",
    },
  },
};
