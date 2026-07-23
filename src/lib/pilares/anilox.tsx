import Link from "next/link";
import type { PilarData } from "@/components/pilar/PaginaPilar";

/**
 * Contenido del pilar de /anilox/.
 *
 * Regla anticanibalización: esta página NO usa "BCM" en H1 ni en ningún H2.
 * Ese término pertenece a /anilox/bcm/ (22.336 impresiones); aquí solo se
 * menciona en el cuerpo y se enlaza hacia allá.
 *
 * Todos los enlaces internos apuntan a URLs que existen hoy.
 */

// ── Experiencia de Camilo ────────────────────────────────────────────────
// Solo texto REAL de Camilo. Este párrafo es el que dio sobre el anilox y la
// lineatura (encaja en "Cómo elegir el anilox correcto").
//
// PENDIENTE — el brief pide dos experiencias más que solo Camilo puede
// escribir; NO se inventan:
//   1. "Limpieza y mantenimiento": un caso real de anilox que nadie medía,
//      con el dato de cuánto había caído el volumen si lo tiene.
//   2. "Cómo el anilox afecta tu plancha": cómo trabaja las curvas según el
//      anilox del cliente (es literalmente el servicio que vende).
// Cuando los entregue, añadir un bloque { type: "experiencia" } en cada
// sección, igual que este.
const EXPERIENCIA_ELEGIR =
  "El anilox mal elegido es uno de los problemas más comunes que vemos. A juicio del operario, la elección depende solo de la intensidad que entrega según su volumen BCM, pero se ignora que existe una relación entre lineatura de plancha y lineatura de anilox. Hemos tenido que ir rompiendo ese paradigma y enseñando que el anilox debe ser una variable controlada cuando se trata de imprimir CMYK, no un ajuste que se deja al criterio del momento.";

export const pilarAnilox: PilarData = {
  h1: "El rodillo anilox en flexografía",

  respuestaDirecta: (
    <>
      El anilox es un cilindro grabado con miles de celdas microscópicas que
      dosifica la cantidad exacta de tinta que llega a la plancha flexográfica.
      Es el único elemento del sistema que controla el volumen de tinta
      transferido: ni la presión ni la velocidad lo modifican de forma real. Se
      define por dos valores, lineatura y volumen.
    </>
  ),

  intro: (
    <p>
      Si hay un componente subestimado en una máquina flexográfica, es este. La
      mayoría de las plantas invierte en planchas y en tintas, y trata al anilox
      como un rodillo más que gira. Pero el anilox es el que decide cuánta tinta
      sale, y ninguna plancha —por buena que sea— puede entregar un color que el
      anilox no le dio.
    </p>
  ),

  secciones: [
    {
      id: "que-es",
      titulo: "¿Qué es un rodillo anilox y para qué sirve?",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Es un cilindro de acero o aluminio recubierto de óxido de cromo
                cerámico, sobre el que se graban con láser miles de celdas por
                centímetro. Su función es sencilla de enunciar y difícil de
                ejecutar: transportar una cantidad constante y repetible de tinta
                desde el tintero hasta la plancha, impresión tras impresión, hora
                tras hora.
              </p>
              <p>
                El nombre viene de la anilina, los colorantes que usaba la
                flexografía en sus inicios, cuando el proceso todavía se llamaba
                impresión con anilina.
              </p>
            </>
          ),
        },
        {
          type: "destacado",
          label: "Por qué es el componente crítico",
          content: (
            <p>
              En flexografía el operario no puede «poner más tinta» como en otros
              sistemas. La cantidad la fijan las celdas del anilox. Cuando alguien
              sube la presión buscando más color, no está entregando más tinta:
              está aplastando el punto de la plancha y ensanchando la imagen. El
              resultado es un impreso más oscuro y sucio, no más denso.
            </p>
          ),
        },
      ],
    },

    {
      id: "como-funciona",
      titulo: "Cómo funciona: la celda y la transferencia de tinta",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                El ciclo tiene cuatro momentos y ocurre miles de veces por
                minuto:
              </p>
              <ol>
                <li>
                  <strong>Llenado.</strong> El anilox toma tinta, ya sea por
                  inmersión en el tintero con un rodillo cauchado o mediante una
                  cámara cerrada de doble racla.
                </li>
                <li>
                  <strong>Raspado.</strong> Una cuchilla —la racla o doctor
                  blade— retira toda la tinta de la superficie y deja únicamente
                  la que quedó dentro de las celdas. Aquí queda determinado el
                  volumen que se va a entregar.
                </li>
                <li>
                  <strong>Transferencia.</strong> El anilox gira contra la
                  plancha y le cede parte de la tinta contenida en las celdas.
                  Solo las zonas en relieve de la plancha reciben tinta.
                </li>
                <li>
                  <strong>Impresión.</strong> La plancha deposita esa tinta sobre
                  el sustrato.
                </li>
              </ol>
            </>
          ),
        },
        {
          type: "imagen",
          descripcion:
            "Foto real de un rodillo anilox montado en máquina, idealmente con la cámara de racla y la plancha visibles. La que envió Camilo (cilindro con plancha amarilla) sirve para esta sección.",
        },
        {
          type: "destacado",
          label: "El detalle que cambia todo",
          content: (
            <p>
              Una celda nunca se vacía por completo. Libera entre el 30 % y el
              50 % de su contenido, dependiendo de la geometría, la viscosidad de
              la tinta y el estado de la superficie. Por eso una celda con mala
              geometría o con residuos secos entrega menos tinta aunque su
              volumen teórico sea el correcto.
            </p>
          ),
        },
      ],
    },

    {
      id: "lineatura-y-volumen",
      titulo: "Lineatura y volumen: los dos números que definen un anilox",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Todo anilox se especifica con dos valores, y hay que entender que
                no son intercambiables.
              </p>
              <p>
                La <strong>lineatura</strong> es cuántas celdas hay por unidad de
                longitud. Se expresa en líneas por pulgada (lpi) o líneas por
                centímetro (l/cm). Determina la finura: cuántos puntos de tinta
                independientes puede depositar.
              </p>
              <p>
                El <strong>volumen</strong> es cuánta tinta cabe en esas celdas.
                Se mide en BCM (miles de millones de micras cúbicas por pulgada
                cuadrada) o en cm³/m². Determina la cantidad de tinta.
              </p>
            </>
          ),
        },
        {
          type: "equivalencia",
          valor: "1 BCM = 1,55 cm³/m²",
          nota: "La equivalencia entre las dos unidades de volumen es directa.",
        },
        {
          type: "prose",
          content: (
            <p>
              Dos anilox pueden tener la misma lineatura y volúmenes muy
              distintos, porque el volumen depende también de la profundidad y la
              apertura de la celda. Por eso pedir «un anilox de 800 líneas» sin
              especificar volumen es pedir a medias.
            </p>
          ),
        },
        {
          type: "destacado",
          label: "Guía dedicada",
          content: (
            <p>
              Tenemos una guía dedicada al volumen del anilox, con las{" "}
              <Link href="/anilox/bcm/">
                tablas de conversión y equivalencias
              </Link>{" "}
              para elegir el volumen correcto según tu trabajo.
            </p>
          ),
        },
        {
          type: "prose",
          content: (
            <>
              <h3>La relación anilox–plancha</h3>
              <p>
                Esta es la regla que más errores evita. La lineatura del anilox
                debe ser varias veces mayor que la lineatura de trama de la
                plancha, para que el punto más pequeño del trama se apoye sobre
                varias celdas y no quede a merced de una sola.
              </p>
              <p>
                Qué pasa si te quedas corto: el punto del trama cae sobre pocas
                celdas, la transferencia se vuelve irregular y aparece moiré o un
                punteado visible en los tonos claros. Es un defecto que se
                diagnostica mal con frecuencia: se culpa a la plancha cuando el
                problema es la relación de lineaturas.
              </p>
            </>
          ),
        },
        {
          type: "destacado",
          label: "Regla práctica",
          content: (
            <p>
              Mantén una proporción de entre 4:1 y 6:1 respecto a la trama de la
              plancha. Si imprimes a 150 lpi de trama, el anilox debería estar
              entre 600 y 900 lpi.
            </p>
          ),
        },
      ],
    },

    {
      id: "tipos",
      titulo: "Tipos de anilox y geometrías de celda",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <h3>Por recubrimiento</h3>
              <p>
                <strong>Cromo.</strong> Grabado mecánico, más económico. Menor
                durabilidad y menor precisión en el volumen. Va quedando relegado
                a trabajos de baja exigencia y aplicaciones de barniz.
              </p>
              <p>
                <strong>Cerámico grabado con láser.</strong> El estándar actual.
                Un recubrimiento de óxido de cromo aplicado por plasma y grabado
                con láser. Mucho más duro, resiste mejor la abrasión de la racla
                y permite lineaturas mucho más finas con volúmenes precisos.
              </p>

              <h3>Por geometría de celda</h3>
              <p>
                <strong>Hexagonal a 60°.</strong> La más común. Ofrece la mejor
                densidad de celdas por área —el hexágono llena el plano sin
                desperdicio— y buen equilibrio entre transferencia y limpieza.
              </p>
              <p>
                <strong>Hexagonal a 45° y a 30°.</strong> Configuraciones
                alternativas que modifican cómo la racla incide sobre las paredes
                de la celda. Se usan en aplicaciones específicas.
              </p>
              <p>
                <strong>Canal abierto o celda elongada.</strong> Las celdas se
                conectan entre sí formando canales. Facilita el flujo y el
                vaciado, y se usa cuando hace falta mucho volumen o con tintas
                difíciles.
              </p>
              <p>
                <strong>Tecnologías de canal continuo.</strong> Hay desarrollos
                de fabricantes —como GTT de Apex— que abandonan la celda cerrada
                tradicional en favor de estructuras abiertas, buscando
                transferencia más estable y limpieza más fácil.
              </p>
              <p>
                <strong>Tri-helicoidal.</strong> Grabado mecánico en espiral
                continua. Prácticamente en desuso salvo aplicaciones muy
                específicas de barniz.
              </p>
              <p>
                Los fabricantes de referencia en el mercado —Harper, Apex,
                Cheshire, Zecher, Sandon Global, entre otros— trabajan con
                geometrías propietarias. Cuando compares proveedores, compara
                volumen medido y geometría, no solo lineatura y precio.
              </p>
            </>
          ),
        },
      ],
    },

    {
      id: "como-elegir",
      titulo: "Cómo elegir el anilox correcto para tu trabajo",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                No existe el anilox universal. La elección depende de cuatro
                variables, en este orden:
              </p>
              <ol>
                <li>
                  <strong>Qué vas a imprimir con esa estación.</strong> No es lo
                  mismo un color de proceso con trama fina que un fondo sólido, un
                  blanco de cobertura o un barniz. Cada uno pide un rango de
                  volumen distinto: los tramas finos necesitan lineaturas altas y
                  volúmenes bajos; los sólidos y coberturas, lo contrario.
                </li>
                <li>
                  <strong>La lineatura de trama de tu plancha.</strong> Aplica la
                  proporción de 4:1 a 6:1 de la sección anterior. Este paso es el
                  que más gente se salta.
                </li>
                <li>
                  <strong>El sustrato.</strong> Un sustrato absorbente como el
                  papel se lleva más tinta que una película plástica. El mismo
                  anilox entrega resultados distintos según el material.
                </li>
                <li>
                  <strong>La tinta.</strong> Viscosidad, pigmentación y química
                  influyen en cuánto se libera de cada celda. Una{" "}
                  <Link href="/tintas/">tinta</Link> muy pigmentada permite
                  volúmenes menores para la misma densidad.
                </li>
              </ol>
            </>
          ),
        },
        {
          type: "destacado",
          label: "El error más caro que vemos",
          content: (
            <p>
              Comprar anilox por catálogo sin considerar la plancha y el sustrato
              reales. Un anilox de más volumen no da «más color»: da más ganancia
              de punto, altas luces sucias y sólidos con exceso de tinta que tarda
              en secar. Y uno de menos volumen deja los sólidos lavados por más
              presión que se aplique.
            </p>
          ),
        },
        {
          type: "experiencia",
          content: (
            <>
              <p>{EXPERIENCIA_ELEGIR}</p>
            </>
          ),
        },
        {
          type: "prose",
          content: (
            <p>
              <strong>Recomendación práctica:</strong> documenta qué anilox usas
              para cada tipo de trabajo y qué resultado te dio. La mayoría de
              plantas toma esta decisión de memoria, y esa memoria se va con el
              operario que se jubila.
            </p>
          ),
        },
      ],
    },

    {
      id: "limpieza",
      titulo: "Limpieza y mantenimiento del anilox",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Un anilox sucio es la causa más común de problemas de color que
                se atribuyen erróneamente a la tinta o a la plancha.
              </p>
              <h3>Por qué se tapa</h3>
              <p>
                La tinta seca se acumula en el fondo de las celdas. El proceso es
                gradual e invisible: no aparece un día, va reduciendo el volumen
                efectivo semana a semana. Un anilox al 60 % de su volumen original
                sigue viéndose igual a simple vista.
              </p>
              <p>
                Las señales: densidad que baja poco a poco, necesidad creciente de
                subir presión para lograr el mismo color, resultados que ya no
                coinciden con la prueba aprobada aunque nada haya cambiado en el
                archivo.
              </p>
              <h3>Métodos de limpieza</h3>
              <ul>
                <li>
                  <strong>Limpieza diaria en máquina.</strong> Solventes o
                  detergentes específicos al terminar el trabajo. Es
                  mantenimiento básico: evita la acumulación, pero no recupera un
                  anilox ya obstruido.
                </li>
                <li>
                  <strong>Ultrasonido.</strong> El rodillo se sumerge en un tanque
                  con solución y ondas ultrasónicas que desprenden el residuo del
                  fondo de las celdas. Eficaz y ampliamente utilizado.
                </li>
                <li>
                  <strong>Limpieza láser.</strong> Vaporiza el residuo sin
                  contacto físico. Es el método más profundo y el que menos riesgo
                  tiene de dañar el recubrimiento, aunque requiere equipo
                  especializado.
                </li>
                <li>
                  <strong>Micro-abrasión con bicarbonato u otros medios.</strong>{" "}
                  Efectiva, pero exige un operador con experiencia: mal aplicada,
                  puede desgastar el cerámico.
                </li>
              </ul>
            </>
          ),
        },
        {
          type: "alerta",
          content: (
            <p>
              Nunca uses cepillos de acero ni herramientas metálicas. Un rayón en
              el cerámico es permanente y deja una línea visible en cada impresión
              de ahí en adelante.
            </p>
          ),
        },
        {
          type: "prose",
          content: (
            <>
              <h3>Medición: lo que no se mide, se supone</h3>
              <p>
                La única forma de saber el volumen real de un anilox es medirlo,
                con microscopio de barrido o equipos de medición volumétrica.
                Muchos proveedores ofrecen el servicio.
              </p>
            </>
          ),
        },
        {
          type: "destacado",
          label: "Recomendación",
          content: (
            <p>
              Mide tus anilox críticos al menos una vez al año y lleva el
              histórico. Cuando un anilox baje de forma sostenida por debajo de su
              especificación, ya no es un problema de limpieza sino de reemplazo.
              Tomar esa decisión con datos evita meses persiguiendo un problema de
              color que no tenía solución en máquina.
            </p>
          ),
        },
      ],
    },

    {
      id: "anilox-y-plancha",
      titulo: "Cómo el anilox afecta el resultado de tu plancha",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Anilox y <Link href="/planchas/">plancha</Link> son un sistema,
                no dos compras separadas. La plancha define qué se reproduce; el
                anilox, con cuánta tinta se reproduce. Si uno de los dos está mal
                elegido, el otro no lo compensa.
              </p>
              <p>Casos que se repiten en planta:</p>
              <ul>
                <li>
                  Anilox con demasiado volumen para el trama de la plancha: las
                  altas luces se ensucian, los tonos claros se cierran y los
                  degradados pierden suavidad.
                </li>
                <li>
                  Anilox con lineatura insuficiente: el punto pequeño no se apoya
                  en suficientes celdas y aparece transferencia irregular o moiré.
                </li>
                <li>
                  Anilox desgastado con plancha nueva: se culpa a la plancha por
                  un color que no da, cuando el volumen real cayó por debajo de la
                  especificación hace meses.
                </li>
              </ul>
              <p>
                <strong>La consecuencia práctica:</strong> las curvas de
                compensación de una plancha solo son correctas para una
                combinación concreta de anilox, tinta y sustrato. Una plancha
                calibrada «en general» no está calibrada para tu proceso.
              </p>
            </>
          ),
        },
        {
          type: "prose",
          content: (
            <p>
              Por eso, cuando fabricamos planchas, necesitamos saber con qué
              anilox vas a imprimir. Es la diferencia entre entregar un insumo y
              entregar una plancha que funciona en tu máquina. También{" "}
              <Link href="/servicios-graficos/">
                asesoramos en la selección de anilox
              </Link>
              .
            </p>
          ),
        },
      ],
    },
  ],

  faq: {
    id: "preguntas-frecuentes",
    titulo: "Preguntas frecuentes sobre el anilox",
    items: [
      {
        q: "¿Qué es un rodillo anilox?",
        a: "Es un cilindro recubierto de cerámica con miles de celdas microscópicas grabadas con láser, que dosifica la cantidad de tinta que se transfiere a la plancha flexográfica. Es el elemento que controla el volumen de tinta en el sistema.",
      },
      {
        q: "¿Cuál es la diferencia entre lineatura y volumen?",
        a: "La lineatura es cuántas celdas hay por pulgada o por centímetro, y define la finura. El volumen es cuánta tinta cabe en esas celdas, y define la cantidad. Dos anilox con la misma lineatura pueden tener volúmenes muy diferentes.",
      },
      {
        q: "¿Qué lineatura de anilox necesito?",
        a: "Depende de la lineatura de trama de tu plancha. La regla práctica es mantener una proporción de entre 4:1 y 6:1: para una trama de 150 lpi, un anilox de 600 a 900 lpi.",
      },
      {
        q: "¿Cada cuánto se debe limpiar un anilox?",
        a: "La limpieza básica va al final de cada trabajo. La limpieza profunda —ultrasonido o láser— depende del uso y del tipo de tinta, pero en producción intensiva suele hacerse de forma periódica programada, no cuando ya se nota el problema.",
      },
      {
        q: "¿Cuánto dura un rodillo anilox?",
        a: "Un anilox cerámico bien mantenido puede durar años. Lo que lo retira de servicio no suele ser una falla visible sino la pérdida gradual de volumen por desgaste de la racla y obstrucción acumulada.",
      },
      {
        q: "¿Cómo sé si mi anilox está desgastado?",
        a: "La señal más clara es necesitar cada vez más presión para lograr la misma densidad. Confirmarlo requiere medir el volumen real con microscopio de barrido o equipo volumétrico y compararlo con la especificación original.",
      },
      {
        q: "¿Sirve el mismo anilox para todos los colores?",
        a: "No. Los colores de proceso con trama fina, los sólidos, los blancos de cobertura y los barnices requieren volúmenes distintos. Usar el mismo anilox para todo obliga a compensar con presión, que es justo lo que deforma el punto.",
      },
      {
        q: "¿Anilox cerámico o de cromo?",
        a: "Cerámico grabado con láser para prácticamente cualquier trabajo de calidad. El cromo queda para aplicaciones de bajo requerimiento o barnices, donde su menor durabilidad y precisión no penalizan tanto.",
      },
    ],
  },

  cta: {
    titulo: "Planchas Kodak Flexcel NX calibradas para tu proceso",
    cuerpo:
      "Fabricamos la plancha con las curvas de tu anilox, tu tinta y tu sustrato. No un insumo genérico: una plancha que funciona en tu máquina.",
    href: "/fotopolimeros/",
    label: "Ver fotopolímeros",
  },

  autor: {
    nombre: "Camilo Yepes",
    cargo: "Director de iFlexo, empresa de preprensa",
    anios: 16,
    bio: "Desde la preprensa he recorrido muchas empresas de impresión, lo que me ha dado un concepto amplio de las necesidades de un impresor y de cómo resolverlas de forma fácil y eficiente, con la mirada de quien entiende las empresas como negocios que deben ser rentables desde sus procesos.",
    href: "/autores/camilo-yepes/",
  },
};
