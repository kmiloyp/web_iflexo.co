import Link from "next/link";
import type { PilarData } from "@/components/pilar/PaginaPilar";

/**
 * Contenido del pilar de /planchas/.
 *
 * Reglas anticanibalización (respetar al pie de la letra):
 *   - "distorsión" NO va en H1 ni en ningún H2 → es de /planchas/distorsion/
 *     (920 clics). Solo mención y enlace en el cuerpo.
 *   - "Kodak Flexcel NX" / "Flexcel" NO van en H1 ni H2 → son de
 *     /planchas/kodak-flexcel-nx/. Solo mención y enlace.
 *   - Nada de "precio", "comprar", "proveedor" en title/meta → eso vende
 *     /fotopolimeros/. Este pilar explica.
 *
 * Dato verificado: Cyrel de DuPont se lanzó en 1974 (DuPont celebró los 50
 * años en 2024; confirmado por varias fuentes del sector).
 *
 * Todos los enlaces internos apuntan a URLs que existen hoy.
 */

export const pilarPlanchas: PilarData = {
  h1: "Cireles y planchas flexográficas",

  respuestaDirecta: (
    <>
      Un cirel es una plancha flexible de fotopolímero que lleva la imagen en
      relieve y transfiere la tinta al sustrato en la impresión flexográfica.
      Según el país se le llama cirel, cliché, caucho, fotopolímero o simplemente
      plancha: son nombres distintos para el mismo elemento. Es la pieza que
      determina qué detalle puede reproducir tu máquina.
    </>
  ),

  intro: (
    <p>
      Si trabajas en flexografía en Colombia, seguramente dices «cirel». En
      México se oye más «cliché», en Argentina «caucho», y en los manuales
      técnicos aparece como «fotopolímero» o «plancha flexográfica». Todos hablan
      de lo mismo, y esa confusión de nombres es lo primero que conviene despejar.
    </p>
  ),

  secciones: [
    {
      id: "nombres",
      titulo: "Cirel, cliché, caucho o fotopolímero: por qué tantos nombres",
      bloques: [
        {
          type: "prose",
          content: (
            <p>
              Aunque parezcan productos distintos, los cinco nombres se refieren
              al mismo elemento. Cada uno viene de una época o una región:
            </p>
          ),
        },
        {
          type: "definiciones",
          items: [
            {
              termino: "Cirel",
              definicion: (
                <>
                  Viene de Cyrel, la marca con la que DuPont lanzó sus planchas
                  de fotopolímero en 1974. Como pasó con «aspirina» o «curita»,
                  la marca se volvió el nombre genérico. Por eso se escribe
                  «cirel» o «cyrel», aunque la marca original lleve <em>y</em>.
                </>
              ),
            },
            {
              termino: "Cliché",
              definicion:
                "Heredado de la tipografía tradicional, donde designaba la plancha metálica con la imagen en relieve. El nombre se conservó al pasar al fotopolímero.",
            },
            {
              termino: "Caucho",
              definicion:
                "Viene de los orígenes del proceso, cuando las planchas eran de caucho grabado. Hoy es un nombre histórico: casi todas las planchas modernas son de fotopolímero, no de caucho.",
            },
            {
              termino: "Fotopolímero",
              definicion:
                "El nombre técnico correcto. Describe el material: un polímero que endurece al recibir luz ultravioleta.",
            },
            {
              termino: "Plancha flexográfica",
              definicion:
                "El término genérico e internacional, el que aparece en la documentación técnica de cualquier país.",
            },
          ],
        },
        {
          type: "destacado",
          label: "Consecuencia práctica",
          content: (
            <p>
              Que existan cinco nombres para lo mismo importa a la hora de
              cotizar: cuando hables con un proveedor de otro país, verifica que
              se refieren al mismo producto. La palabra cambia; el elemento, no.
            </p>
          ),
        },
      ],
    },

    {
      id: "de-que-esta-hecha",
      titulo: "De qué está hecha una plancha flexográfica",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Una plancha de fotopolímero es un sándwich de capas, cada una con
                una función:
              </p>
              <ul>
                <li>
                  <strong>Base de poliéster.</strong> La capa inferior,
                  dimensionalmente estable. Impide que la plancha se estire o
                  encoja y garantiza que la imagen mantenga sus medidas.
                </li>
                <li>
                  <strong>Capa de fotopolímero.</strong> El cuerpo de la plancha.
                  Un polímero sensible a la luz UV: donde recibe luz, endurece y
                  se vuelve insoluble; donde no, permanece soluble y se elimina en
                  el revelado. De ahí sale el relieve.
                </li>
                <li>
                  <strong>Capa de máscara (LAMS).</strong> Presente solo en
                  planchas digitales. Una película negra sensible al láser que
                  hace de negativo integrado.
                </li>
                <li>
                  <strong>Lámina protectora.</strong> Cubre la superficie hasta el
                  momento de usar la plancha.
                </li>
              </ul>
              <h3>Las dos propiedades que definen su comportamiento</h3>
              <p>
                <strong>Espesor.</strong> Va desde alrededor de 0,76 mm hasta más
                de 6 mm. Los delgados se usan en banda angosta y etiquetas, donde
                se busca máximo detalle; los gruesos, en corrugado, donde la
                plancha debe absorber irregularidades del sustrato.
              </p>
              <p>
                <strong>Dureza.</strong> Se mide en grados Shore A. Una plancha
                dura reproduce mejor el detalle fino y mantiene el punto; una
                blanda se adapta mejor a superficies irregulares y entrega sólidos
                más parejos sobre sustratos difíciles. La elección depende del
                sustrato, no de la preferencia.
              </p>
            </>
          ),
        },
      ],
    },

    {
      id: "tipos",
      titulo: "Tipos de planchas flexográficas",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <h3>Según cómo se graba la imagen: analógica o digital</h3>
              <p>
                <strong>Plancha analógica (convencional).</strong> La imagen se
                transfiere desde un negativo de film que se coloca sobre la
                plancha y se expone a luz UV. Fue el estándar durante décadas y
                todavía se usa en trabajos de baja exigencia. Su limitación es
                física: entre el negativo y el polímero siempre queda una capa de
                aire, y el oxígeno inhibe la polimerización en la superficie. El
                resultado es un punto redondeado, con la cima más estrecha que la
                base.
              </p>
              <p>
                <strong>Plancha digital.</strong> La imagen se graba directamente
                sobre la capa de máscara con un láser, sin negativo intermedio.
                Eliminado el film, se elimina también la desviación que
                introducía: reproduce detalle mucho más fino, mantiene altas luces
                que la analógica pierde, y es repetible —dos planchas del mismo
                archivo salen iguales—.
              </p>
            </>
          ),
        },
        {
          type: "tabla",
          caption: "Comparación entre plancha analógica y plancha digital",
          headers: ["", "Analógica", "Digital"],
          rows: [
            ["Imagen", "Negativo de film", "Grabado láser directo"],
            ["Forma del punto", "Redondeada", "Controlada"],
            ["Detalle mínimo", "Limitado", "Muy fino"],
            ["Repetibilidad", "Variable", "Alta"],
            ["Altas luces", "Se pierden pronto", "Se conservan"],
            ["Costo por plancha", "Menor", "Mayor"],
            ["Uso actual", "Trabajos de baja exigencia", "Estándar de calidad"],
          ],
        },
        {
          type: "prose",
          content: (
            <>
              <h3>Punto redondo y punto plano</h3>
              <p>
                Dentro de las planchas digitales hay una distinción que cambia el
                resultado en máquina. Un <strong>punto redondo</strong> toca el
                sustrato con una superficie mínima. Al aplicar presión se aplasta y
                se ensancha, y esa deformación es la ganancia de punto: la imagen
                sale más oscura y cerrada que la aprobada.
              </p>
              <p>
                Un <strong>punto plano</strong> tiene la cima plana. Apoya sobre
                una superficie mayor, necesita menos presión para transferir la
                tinta y se deforma mucho menos. La consecuencia práctica: sólidos
                más densos, altas luces que sobreviven y una ventana de operación
                más amplia para el operario. Lograrlo requiere un proceso de
                fabricación específico, no solo un tipo de plancha: depende de cómo
                se graba, se expone y se revela.
              </p>
            </>
          ),
        },
        {
          type: "destacado",
          label: "Cómo se consigue",
          content: (
            <p>
              El punto plano depende del proceso de fabricación. Lo explicamos en
              detalle en{" "}
              <Link href="/planchas/kodak-flexcel-nx/">
                la tecnología que usamos para conseguirlo
              </Link>
              .
            </p>
          ),
        },
        {
          type: "prose",
          content: (
            <>
              <h3>Según el revelado</h3>
              <p>
                <strong>Con solvente.</strong> El más extendido. La plancha se
                lava con un solvente que disuelve el fotopolímero no expuesto.
                Requiere secado posterior, y el solvente debe ser el adecuado: uno
                inapropiado puede dejar residuo en el microtramado o hinchar la
                plancha.
              </p>
              <p>
                <strong>Térmico.</strong> El polímero no endurecido se funde y se
                absorbe con un material textil. Es más rápido porque no necesita
                secado.
              </p>
              <p>
                <strong>Con agua.</strong> Planchas formuladas para lavarse con
                agua y detergente. Menor impacto ambiental, aunque su uso está más
                acotado.
              </p>
              <h3>Según la forma</h3>
              <p>
                <strong>Plancha plana.</strong> El formato habitual: se monta
                sobre el cilindro con cinta de doble cara.
              </p>
              <p>
                <strong>Manga o sleeve.</strong> La plancha va montada sobre un
                cilindro hueco que se desliza sobre el mandril. Elimina la junta de
                montaje y permite diseños continuos sin repetición visible. Muy
                usada en empaque flexible con fondos continuos.
              </p>
            </>
          ),
        },
      ],
    },

    {
      id: "fabricacion",
      titulo: "Cómo se fabrica una plancha digital, paso a paso",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Conocer el proceso ayuda a entender por qué dos planchas de la
                misma marca pueden comportarse distinto.
              </p>
              <ol>
                <li>
                  <strong>Preparación del archivo.</strong> Separación de colores,
                  curvas de compensación, tramado y cálculo de{" "}
                  <Link href="/planchas/distorsion/">distorsión</Link>. Aquí se
                  decide gran parte del resultado final.
                </li>
                <li>
                  <strong>Grabado de la máscara.</strong> Un láser retira
                  selectivamente la capa negra según la imagen. Su precisión define
                  el detalle mínimo que la plancha podrá reproducir.
                </li>
                <li>
                  <strong>Exposición posterior (back exposure).</strong> Una
                  exposición UV por el reverso que crea el piso de la plancha y
                  determina la profundidad del relieve.
                </li>
                <li>
                  <strong>Exposición principal.</strong> La luz UV atraviesa las
                  zonas abiertas de la máscara y polimeriza el material. Aquí se
                  forma el relieve.
                </li>
                <li>
                  <strong>Revelado.</strong> Se elimina el polímero no
                  polimerizado con solvente, calor o agua.
                </li>
                <li>
                  <strong>Secado.</strong> En el revelado con solvente, la plancha
                  debe secar por completo para recuperar su espesor y estabilidad.
                </li>
                <li>
                  <strong>Post-exposición y acabado.</strong> Una exposición final
                  que completa la polimerización y elimina la pegajosidad
                  superficial.
                </li>
              </ol>
            </>
          ),
        },
        {
          type: "destacado",
          label: "Dónde se pierde la calidad",
          content: (
            <p>
              Los pasos 4, 5 y 6 son los que más varían entre proveedores. Una
              exposición desigual produce planchas que no son idénticas entre sí;
              un solvente inadecuado tapa el microtramado; un secado incompleto
              deja la plancha con espesor irregular. Por eso la misma marca de
              plancha puede rendir distinto según quién la procese.
            </p>
          ),
        },
        {
          type: "imagen",
          descripcion:
            "Foto del proceso de fabricación de plancha en tu planta: la etapa de exposición o de revelado (pasos 4-6), que es el diferenciador. Sin marcas de terceros visibles.",
        },
      ],
    },

    {
      id: "cuidado",
      titulo: "Cuidado, almacenamiento y vida útil",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Una plancha bien tratada rinde muchos más tirajes. Las prácticas
                que marcan la diferencia:
              </p>
              <ul>
                <li>
                  <strong>Limpieza.</strong> Retira la tinta antes de que seque,
                  con el limpiador adecuado para el tipo de tinta que usaste. Nunca
                  uses solventes agresivos no recomendados por el fabricante:
                  pueden hinchar el fotopolímero y alterar sus medidas de forma
                  permanente.
                </li>
                <li>
                  <strong>Nunca raspes.</strong> Ni cepillos duros ni herramientas
                  metálicas. Un daño en el relieve es irreversible y aparece en
                  cada impresión.
                </li>
                <li>
                  <strong>Almacenamiento.</strong> En plano o colgadas, nunca
                  enrolladas con la imagen hacia adentro ni con peso encima.
                  Protegidas de la luz —la luz ambiental sigue polimerizando
                  lentamente— y en un ambiente estable de temperatura y humedad.
                </li>
                <li>
                  <strong>Desmontaje.</strong> Retira la cinta de doble cara con
                  cuidado y sin estirar la plancha. Tirar bruscamente deforma el
                  poliéster.
                </li>
                <li>
                  <strong>Identificación.</strong> Etiqueta cada juego con trabajo,
                  color, fecha y número de tirajes acumulados. Sin ese registro es
                  imposible saber si una plancha ya cumplió su vida útil.
                </li>
              </ul>
            </>
          ),
        },
        {
          type: "destacado",
          label: "Cuánto dura",
          content: (
            <p>
              Depende sobre todo del sustrato. Sobre películas plásticas una
              plancha puede superar el millón de impresiones; sobre sustratos
              abrasivos la vida útil se reduce bastante. El desgaste real depende
              tanto del cuidado como del material impreso.
            </p>
          ),
        },
      ],
    },

    {
      id: "elegir-proveedor",
      titulo: "Qué mirar al elegir un proveedor de planchas",
      bloques: [
        {
          type: "prose",
          content: (
            <p>
              Casi todas las plantas comparan proveedores por precio por
              centímetro cuadrado. Es la comparación más fácil y la menos útil,
              porque el costo de una plancha no está en lo que cuesta la plancha.
              Las preguntas que sí importan:
            </p>
          ),
        },
        {
          type: "definiciones",
          items: [
            {
              termino: "¿Con qué proceso la fabrican?",
              definicion:
                "El material puede ser el mismo y el resultado distinto. Cómo se graba, con qué se expone y con qué solvente se revela determina si el microtramado sobrevive y si todas las planchas salen iguales.",
            },
            {
              termino: "¿Son consistentes entre sí?",
              definicion:
                "La plancha de hoy y la del próximo mes deberían comportarse igual. Si tu operario tiene que ajustar la máquina cada vez que llega un juego nuevo, ese tiempo lo pagas tú.",
            },
            {
              termino: "¿Calibran las curvas para tu proceso?",
              definicion: (
                <>
                  Una plancha calibrada «en general» no está calibrada para tu{" "}
                  <Link href="/anilox/">anilox</Link>, tu tinta y tu sustrato.
                </>
              ),
            },
            {
              termino: "¿Qué pasa cuando algo sale mal?",
              definicion:
                "Si hay un problema en máquina a las 11 de la noche, ¿hay alguien que responda y entienda de impresión, o solo de facturación?",
            },
            {
              termino: "¿En cuánto tiempo entregan?",
              definicion:
                "El tiempo de plancha condiciona tu programación de máquina.",
            },
          ],
        },
        {
          type: "destacado",
          label: "La cuenta que conviene hacer",
          content: (
            <p>
              En lugar de comparar costo por centímetro cuadrado, compara costo
              por millar impreso. Ahí entran la merma de arranque, el tiempo de
              máquina parada, la tinta consumida y los trabajos que hubo que
              repetir. Una plancha más cara que reduce el arranque suele salir más
              barata al final del mes.
            </p>
          ),
        },
      ],
    },
  ],

  faq: {
    id: "preguntas-frecuentes",
    titulo: "Preguntas frecuentes sobre cireles y planchas",
    items: [
      {
        q: "¿Qué es un cirel?",
        a: "Es una plancha flexible de fotopolímero con la imagen en relieve, usada en impresión flexográfica para transferir la tinta al sustrato. El nombre viene de Cyrel, la marca de DuPont que popularizó estas planchas en los años setenta.",
      },
      {
        q: "¿Es lo mismo un cirel que un cliché o un fotopolímero?",
        a: "Sí. Cirel, cliché, caucho, fotopolímero y plancha flexográfica son nombres distintos para el mismo elemento, según el país y la tradición. El término técnico correcto es plancha de fotopolímero.",
      },
      {
        q: "¿De qué material están hechos los cireles?",
        a: "De fotopolímero: un polímero que endurece al recibir luz ultravioleta, sobre una base de poliéster que le da estabilidad dimensional. Las planchas digitales incluyen además una capa de máscara sensible al láser.",
      },
      {
        q: "¿Cuál es la diferencia entre una plancha digital y una analógica?",
        a: "En la analógica la imagen se transfiere desde un negativo de film; en la digital se graba directamente con láser sobre la plancha. La digital reproduce detalle más fino, conserva las altas luces y es repetible entre planchas.",
      },
      {
        q: "¿Qué es el punto plano y por qué importa?",
        a: "Es un punto con la cima plana en lugar de redondeada. Al apoyar sobre más superficie necesita menos presión para transferir la tinta y se deforma menos, lo que reduce la ganancia de punto y da sólidos más densos.",
      },
      {
        q: "¿Cuánto dura una plancha flexográfica?",
        a: "Depende del sustrato, la tinta y el cuidado. Sobre películas plásticas puede superar el millón de impresiones; sobre sustratos abrasivos la vida útil es considerablemente menor.",
      },
      {
        q: "¿Cómo se deben almacenar las planchas?",
        a: "En plano o colgadas, sin peso encima, protegidas de la luz y en condiciones estables de temperatura y humedad. La luz ambiental continúa polimerizando el material lentamente.",
      },
      {
        q: "¿Qué espesor de plancha necesito?",
        a: "Depende del sustrato y del tipo de máquina. Los espesores delgados se usan en banda angosta y etiquetas buscando máximo detalle; los gruesos, en corrugado, donde la plancha debe absorber irregularidades.",
      },
      {
        q: "¿Por qué mi plancha se hincha o se deforma?",
        a: "Casi siempre por contacto con solventes no adecuados durante la limpieza, o por secado incompleto tras el revelado. El fotopolímero absorbe ciertos solventes y cambia de medidas de forma permanente.",
      },
    ],
  },

  cta: {
    // El encabezado (H2) evita "Kodak Flexcel NX" por la regla
    // anticanibalización; el anchor comercial va en el botón, que es un
    // enlace, no un H2, y apunta a /fotopolimeros/ como pide el brief.
    titulo: "Planchas de punto plano, calibradas para tu proceso",
    cuerpo:
      "Calibradas para tu anilox, tu tinta y tu sustrato. La diferencia entre un insumo y una plancha que funciona en tu máquina.",
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
