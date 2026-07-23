import Link from "next/link";
import type { PilarData } from "@/components/pilar/PaginaPilar";

/**
 * Contenido del pilar de /tintas/.
 *
 * Regla anticanibalización: "composición" y "componentes" NO van en title/H1/H2
 * → son de /tintas/composicion/ (16.049 impresiones). Aquí los cuatro
 * componentes se listan corto y se enlaza a esa página; no se desarrolla la
 * química.
 *
 * Todos los enlaces internos apuntan a URLs que existen hoy.
 */

// ── Experiencia de Camilo ────────────────────────────────────────────────
// Texto REAL de Camilo, solo corregido de ortografía. Se respeta su voz.
const EXP_VISCOSIDAD =
  "Muchos impresores no cuentan con equipos de medición de viscosidad y lo hacen «al ojo», por percepción visual. Así no pueden controlar las densidades de las tintas, y ahí encuentran una variable enorme que les hace fluctuar la impresión.";

const EXP_DIAGNOSTICO =
  "Lo primero es medir parámetros según el tipo de tinta, empezando por que sea la misma referencia —o un símil entre proveedores que garantice un rango de tolerancia— antes de entrar a imprimir. Y luego ir monitoreando durante la impresión el comportamiento de esos rangos de tolerancia, con equipos calibrados o procesos repetitivos claros.";

const EXP_BLANCO =
  "Manteniendo todas las condiciones de impresión, sin invertir en nada, solo con un buen aprovechamiento de las tramas avanzadas (PureFlexo y los patrones Advantage) se pueden lograr opacidades altas con una menor entrega de tinta. Si con eso se ahorra un 20 % al año de tinta blanca —que suele ser el mayor gasto de tinta—, es un hecho ganador.";

export const pilarTintas: PilarData = {
  h1: "Las tintas en la impresión flexográfica",

  respuestaDirecta: (
    <>
      Las tintas flexográficas son tintas de baja viscosidad y secado rápido,
      formuladas para transferirse desde el rodillo anilox a la plancha y de ahí
      al sustrato. Se dividen en tres grandes familias según su vehículo: base
      agua, base solvente y UV. La elección depende del material sobre el que vas
      a imprimir, no de una preferencia general.
    </>
  ),

  intro: (
    <p>
      En flexografía la tinta no es un elemento aislado: forma un sistema con el
      anilox, la plancha y el sustrato. Cambiar de tinta sin ajustar lo demás es
      una de las causas más frecuentes de trabajos que dejan de dar el color que
      daban.
    </p>
  ),

  secciones: [
    {
      id: "que-la-hace-distinta",
      titulo: "Qué hace distinta a una tinta flexográfica",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Comparada con la del offset, una tinta flexográfica es mucho más
                fluida. Mientras las tintas offset tienen consistencia pastosa, las
                flexográficas son casi líquidas. Esa diferencia no es un capricho
                de formulación: responde a cómo funciona el proceso.
              </p>
              <p>
                La tinta tiene que llenar celdas microscópicas en el{" "}
                <Link href="/anilox/">anilox</Link>, dejarse raspar limpiamente por
                la racla, liberarse de esas celdas al tocar la plancha, y
                transferirse al sustrato en fracciones de segundo. Una tinta espesa
                no haría ninguna de esas cuatro cosas.
              </p>
              <p>Sus cuatro componentes básicos:</p>
              <ul>
                <li>
                  <strong>Pigmento</strong> — aporta el color y el poder cubriente.
                </li>
                <li>
                  <strong>Vehículo o resina</strong> — liga el pigmento y lo
                  adhiere al sustrato.
                </li>
                <li>
                  <strong>Solvente o diluyente</strong> — controla la fluidez y se
                  evapora en el secado.
                </li>
                <li>
                  <strong>Aditivos</strong> — modifican propiedades específicas:
                  deslizamiento, resistencia al roce, antiespumantes, secantes.
                </li>
              </ul>
            </>
          ),
        },
        {
          type: "destacado",
          label: "En profundidad",
          content: (
            <p>
              Analizamos en detalle la{" "}
              <Link href="/tintas/composicion/">
                composición y las propiedades fisicoquímicas de las tintas
                flexográficas
              </Link>{" "}
              en una guía dedicada.
            </p>
          ),
        },
      ],
    },

    {
      id: "tres-tipos",
      titulo: "Los tres tipos de tinta flexográfica",
      bloques: [
        {
          type: "definiciones",
          items: [
            {
              termino: "Base agua",
              definicion: (
                <>
                  Vehículo de agua, con resinas solubles o dispersas. Para
                  sustratos absorbentes: papel, cartulina, corrugado, tissue,
                  bolsas de papel. Menor impacto ambiental, sin VOC, limpieza
                  sencilla y por lo general menor costo. Secan más lento y anclan
                  peor sobre materiales no absorbentes.{" "}
                  <strong>Lo que hay que vigilar: el pH.</strong> Gobierna la
                  solubilidad de la resina; si se desvía, la tinta cambia de
                  viscosidad y comportamiento aunque se le añada diluyente.
                </>
              ),
            },
            {
              termino: "Base solvente",
              definicion: (
                <>
                  Vehículo de solvente orgánico (alcoholes y ésteres). Para
                  películas plásticas —PE, PP, PET—, laminados y aluminio: el
                  empaque flexible. Secado muy rápido, excelente adherencia sobre
                  no absorbentes, brillo alto y velocidades elevadas. Emiten VOC y
                  son inflamables: exigen extracción y protocolos de seguridad.{" "}
                  <strong>Lo que hay que vigilar: la evaporación.</strong> El
                  solvente se va y la tinta se espesa; sin control de viscosidad el
                  color cambia de principio a fin.
                </>
              ),
            },
            {
              termino: "UV",
              definicion: (
                <>
                  No secan por evaporación: curan por una reacción que dispara la
                  luz ultravioleta, casi instantánea. Sobre todo en etiquetas y
                  banda angosta, y donde se exige alta resistencia. Permiten
                  trabajar en línea con troquelado y acabados, no se secan en las
                  paradas y dan brillo y densidad excelentes. Costo por kilo mayor,
                  lámparas UV en cada estación y manipulación cuidadosa (los
                  monómeros sin curar pueden irritar).
                </>
              ),
            },
          ],
        },
        {
          type: "tabla",
          caption: "Comparación entre tintas base agua, base solvente y UV",
          headers: ["", "Base agua", "Base solvente", "UV"],
          rows: [
            [
              "Mecanismo de secado",
              "Evaporación de agua",
              "Evaporación de solvente",
              "Curado fotoquímico",
            ],
            ["Velocidad de secado", "Lenta", "Rápida", "Instantánea"],
            [
              "Sustratos típicos",
              "Papel, cartón, corrugado",
              "Películas plásticas, laminados",
              "Etiquetas, filmic",
            ],
            ["Emisiones VOC", "Muy bajas", "Altas", "Nulas"],
            ["Costo por kilo", "Bajo", "Medio", "Alto"],
            ["Resistencia", "Media", "Alta", "Muy alta"],
            ["Se seca en máquina parada", "Sí", "Sí", "No"],
            [
              "Requiere equipo especial",
              "Secado por aire caliente",
              "Extracción de solventes",
              "Lámparas UV",
            ],
          ],
        },
      ],
    },

    {
      id: "elegir-segun-sustrato",
      titulo: "Cómo elegir la tinta según tu sustrato",
      bloques: [
        {
          type: "prose",
          content: (
            <p>
              La regla es simple de enunciar: el sustrato manda. La tinta se elige
              después de saber sobre qué se imprime, nunca antes.
            </p>
          ),
        },
        {
          type: "tabla",
          caption: "Sustrato y familia de tinta recomendada",
          headers: ["Sustrato", "Familia recomendada", "Consideración clave"],
          rows: [
            ["Papel y cartulina", "Base agua", "Absorbente, buen anclaje natural"],
            [
              "Cartón corrugado",
              "Base agua",
              "Requiere plancha más blanda y volumen alto de anilox",
            ],
            [
              "Papel tissue",
              "Base agua",
              "Formulación específica de baja migración",
            ],
            ["Polietileno (PE)", "Base solvente", "Necesita tratamiento corona previo"],
            [
              "Polipropileno (BOPP)",
              "Base solvente",
              "Verificar nivel de tratamiento",
            ],
            ["PET", "Base solvente", "Buena adherencia, alta resistencia"],
            [
              "Aluminio y metalizados",
              "Base solvente",
              "Anclaje difícil, formulación específica",
            ],
            [
              "Etiqueta autoadhesiva papel",
              "UV o base agua",
              "UV si va en línea con acabados",
            ],
            [
              "Etiqueta filmic / transparente",
              "UV",
              "Alta resistencia y curado instantáneo",
            ],
          ],
        },
        {
          type: "destacado",
          label: "El paso que se salta con más frecuencia",
          content: (
            <p>
              El tratamiento superficial. Las películas plásticas no reciben tinta
              de forma natural; su superficie tiene baja energía y la repele. Hay
              que elevarla con tratamiento corona hasta un nivel medido en
              dinas/cm. Y ese tratamiento decae con el tiempo: un material tratado
              hace seis meses puede haber perdido buena parte del tratamiento
              aunque se vea idéntico. Antes de culpar a la tinta por un problema de
              anclaje, mide las dinas del material.
            </p>
          ),
        },
      ],
    },

    {
      id: "viscosidad",
      titulo: "Viscosidad: el control que más color salva",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Si en una planta solo se pudiera controlar una variable de tinta,
                debería ser la viscosidad.
              </p>
              <p>
                <strong>Qué es y por qué importa.</strong> La viscosidad es la
                resistencia de la tinta a fluir. Determina cuánta tinta llena las
                celdas del anilox y cuánta se libera. Un cambio de viscosidad
                cambia el color aunque la tinta sea exactamente la misma.
              </p>
              <p>
                <strong>Cómo se mide.</strong> Con copa de flujo —Ford, Zahn o
                DIN—: se llena la copa, se cronometra cuántos segundos tarda en
                vaciarse, y ese tiempo es la medida. Es sencillo, barato y
                suficientemente preciso para producción. También existen
                viscosímetros en línea que miden y corrigen automáticamente.
              </p>
              <p>
                <strong>Por qué cambia durante el tiraje.</strong> El solvente o el
                agua se evaporan continuamente, sobre todo en tinteros abiertos. La
                tinta se espesa poco a poco. Nadie toca nada y el color se va
                moviendo.
              </p>
            </>
          ),
        },
        {
          type: "destacado",
          label: "El control mínimo viable",
          content: (
            <p>
              Mide la viscosidad al arrancar y anótala. Vuelve a medir cada 30 o 60
              minutos durante el tiraje. Corrige con el diluyente correcto —nunca
              con solvente genérico—. Registra el dato junto al trabajo, para que la
              próxima vez que lo corras arranques con el valor que ya funcionó. Es
              una de las cosas más baratas que puede hacer una planta y de las que
              más reduce la variación entre tirajes.
            </p>
          ),
        },
        {
          type: "alerta",
          content: (
            <p>
              La viscosidad depende de la temperatura: la misma tinta medida a
              18 °C y a 28 °C dará lecturas distintas. Si mides sin considerarla,
              persigues un dato que se mueve solo. Anota la temperatura junto a la
              lectura.
            </p>
          ),
        },
        {
          type: "experiencia",
          content: <p>{EXP_VISCOSIDAD}</p>,
        },
      ],
    },

    {
      id: "problemas",
      titulo: "Problemas frecuentes con la tinta y su causa real",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Muchos problemas que se atribuyen a la tinta tienen su origen en
                otro punto del sistema.
              </p>
              <ul>
                <li>
                  <strong>El color no llega a la densidad esperada.</strong> Antes
                  de cambiar de tinta, mide el volumen real del{" "}
                  <Link href="/anilox/">anilox</Link>. Uno obstruido entrega menos
                  tinta aunque su especificación diga otra cosa, y es la causa más
                  frecuente de este síntoma.
                </li>
                <li>
                  <strong>El color se mueve durante el tiraje.</strong> Viscosidad
                  no controlada: la tinta se espesa por evaporación y el color
                  deriva. También puede venir de contaminación entre estaciones.
                </li>
                <li>
                  <strong>La tinta no ancla o se desprende.</strong> En películas
                  plásticas, tratamiento corona insuficiente o decaído. Mide las
                  dinas del material antes de revisar la tinta.
                </li>
                <li>
                  <strong>Espuma en el tintero.</strong> Frecuente en base agua, por
                  agitación excesiva o recirculación mal ajustada. Se corrige con
                  antiespumante, pero la causa suele ser mecánica.
                </li>
                <li>
                  <strong>Secado prematuro sobre la plancha o el anilox.</strong> La
                  tinta seca antes de transferirse y tapa el microtramado o las
                  celdas. Puede ser exceso de solventes rápidos, temperatura
                  ambiente alta o velocidad de máquina baja.
                </li>
                <li>
                  <strong>Bloqueo o pegado del material bobinado.</strong> La tinta
                  no secó por completo antes de rebobinar. Revisa capacidad de
                  secado, velocidad y gramaje de tinta aplicada.
                </li>
                <li>
                  <strong>Diferencias de color entre lotes.</strong> Ocurre con
                  tintas mezcladas en planta sin control de fórmula. Un mismo
                  Pantone preparado dos veces a ojo no da igual. La solución es
                  fórmula documentada y balanza.
                </li>
              </ul>
            </>
          ),
        },
        {
          type: "destacado",
          label: "El orden de diagnóstico que ahorra más tiempo",
          content: (
            <p>
              Anilox → viscosidad → tratamiento del sustrato → presión → plancha.
              La tinta suele ser el último sospechoso, no el primero.
            </p>
          ),
        },
        {
          type: "experiencia",
          content: <p>{EXP_DIAGNOSTICO}</p>,
        },
      ],
    },

    {
      id: "sistema",
      titulo: "Tinta, anilox y plancha: un sistema, no tres compras",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Los tres elementos determinan juntos el color final, y ninguno se
                puede ajustar de forma aislada.
              </p>
              <ul>
                <li>
                  <strong>La tinta define el color disponible.</strong> Su
                  pigmentación establece cuánta densidad se puede alcanzar con un
                  volumen dado de tinta.
                </li>
                <li>
                  <strong>El <Link href="/anilox/">anilox</Link> define cuánta
                  tinta llega.</strong> Una tinta muy pigmentada permite un anilox
                  de menor volumen para la misma densidad; una tinta débil obliga a
                  más volumen, y ese exceso ensucia las altas luces.
                </li>
                <li>
                  <strong>La <Link href="/planchas/">plancha</Link> define dónde va
                  esa tinta.</strong> El detalle mínimo, la forma del punto y la
                  densidad de los sólidos dependen de cómo se fabricó.
                </li>
              </ul>
              <p>
                <strong>La consecuencia práctica:</strong> las curvas de
                compensación de una plancha son válidas para una combinación
                concreta de tinta, anilox y sustrato. Si cambias de proveedor de
                tinta o de tipo de anilox y mantienes las mismas curvas, el
                resultado cambia.
              </p>
              <p>
                Por eso, cuando calibramos las curvas de una plancha, necesitamos
                saber con qué tinta y con qué anilox se va a imprimir. Es lo que
                separa una plancha genérica de una que funciona en tu máquina.
              </p>
            </>
          ),
        },
        {
          type: "experiencia",
          content: <p>{EXP_BLANCO}</p>,
        },
      ],
    },
  ],

  faq: {
    id: "preguntas-frecuentes",
    titulo: "Preguntas frecuentes sobre tintas flexográficas",
    items: [
      {
        q: "¿Qué son las tintas flexográficas?",
        a: "Son tintas de baja viscosidad y secado rápido, formuladas para transferirse desde el rodillo anilox a la plancha de fotopolímero y de ahí al sustrato. Se clasifican en base agua, base solvente y UV según su vehículo.",
      },
      {
        q: "¿Qué tipos de tintas flexográficas existen?",
        a: "Tres familias principales: base agua para sustratos absorbentes como papel y cartón, base solvente para películas plásticas y laminados, y UV para etiquetas y aplicaciones de alta resistencia.",
      },
      {
        q: "¿Cuál es la diferencia entre tinta base agua y base solvente?",
        a: "La base agua usa agua como vehículo, seca por evaporación más lenta y funciona sobre sustratos absorbentes. La base solvente usa solventes orgánicos, seca mucho más rápido y ancla sobre plásticos, pero emite compuestos orgánicos volátiles.",
      },
      {
        q: "¿Cómo se mide la viscosidad de una tinta flexográfica?",
        a: "Con copa de flujo —Ford, Zahn o DIN—: se cronometra cuántos segundos tarda la tinta en vaciarse por el orificio. Ese tiempo es la medida. También existen viscosímetros en línea de control automático.",
      },
      {
        q: "¿Por qué cambia el color durante el tiraje?",
        a: "La causa más común es la evaporación del solvente o del agua, que espesa la tinta progresivamente. Sin control de viscosidad, el color deriva aunque no se modifique nada más.",
      },
      {
        q: "¿Qué tinta debo usar para imprimir sobre polietileno?",
        a: "Base solvente, y el material necesita tratamiento corona previo con un nivel de dinas adecuado. Ese tratamiento decae con el tiempo, así que conviene medirlo antes de imprimir material almacenado.",
      },
      {
        q: "¿Las tintas UV sirven para cualquier trabajo?",
        a: "Se usan sobre todo en etiquetas y banda angosta. Requieren lámparas UV en cada estación y tienen un costo por kilo mayor, por lo que su conveniencia depende del tipo de trabajo y del equipo disponible.",
      },
      {
        q: "¿Cómo afecta la tinta al resultado de la plancha?",
        a: "La pigmentación de la tinta determina cuánta densidad se logra con un volumen dado de anilox. Las curvas de compensación de una plancha son válidas solo para una combinación concreta de tinta, anilox y sustrato.",
      },
    ],
  },

  cta: {
    titulo: "Planchas calibradas para tu tinta y tu anilox",
    cuerpo:
      "Fabricamos la plancha sabiendo con qué tinta y qué anilox vas a imprimir. Es lo que separa una plancha genérica de una que funciona en tu máquina.",
    href: "/fotopolimeros/",
    label: "Ver planchas Kodak Flexcel NX",
  },

  autor: {
    nombre: "Camilo Yepes",
    cargo: "Director de iFlexo, empresa de preprensa",
    anios: 16,
    bio: "Desde la preprensa he recorrido muchas empresas de impresión, lo que me ha dado un concepto amplio de las necesidades de un impresor y de cómo resolverlas de forma fácil y eficiente, con la mirada de quien entiende las empresas como negocios que deben ser rentables desde sus procesos.",
    href: "/autores/camilo-yepes/",
  },
};
