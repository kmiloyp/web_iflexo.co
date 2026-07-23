import Link from "next/link";
import type { PilarData } from "@/components/pilar/PaginaPilar";

/**
 * Contenido del pilar de /flexografia/.
 *
 * Enlaces internos: todos apuntan a URLs que existen hoy. Dos del guion
 * original todavía no se han escrito y quedan como texto plano, marcados
 * con PENDIENTE, para no publicar enlaces rotos:
 *   - /flexografia/vs-rotograbado/
 *   - /planchas/defectos-comunes/
 * Cuando existan, basta con envolver el texto en <Link> aquí.
 */

export const pilarFlexografia: PilarData = {
  h1: "Flexografía: la guía completa",

  respuestaDirecta: (
    <>
      La flexografía es un sistema de impresión rotativo que utiliza planchas
      flexibles de fotopolímero en relieve para transferir tinta a un sustrato.
      Es el método dominante en la impresión de empaques y etiquetas porque
      imprime sobre casi cualquier material —película plástica, papel, cartón,
      aluminio— a altas velocidades y con costos bajos en tirajes medianos y
      largos.
    </>
  ),

  intro: (
    <>
      <p>
        Si trabajas en empaque, probablemente ya imprimes en flexografía aunque
        no lo llames así. La bolsa de café que tienes en la cocina, la etiqueta
        de la botella de gaseosa, la caja de cereal, el empaque de las galletas:
        casi todo eso salió de una máquina flexográfica.
      </p>
      <p>
        Esta guía cubre cómo funciona el proceso, qué elementos intervienen, qué
        se puede imprimir y —lo más útil si estás en producción— por qué las
        cosas salen mal y cómo evitarlo.
      </p>
    </>
  ),

  secciones: [
    {
      id: "que-es",
      titulo: "¿Qué es la flexografía y cómo surgió?",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                La flexografía es un proceso de impresión directo y en relieve.
                «Directo» porque la plancha toca el sustrato y le entrega la
                tinta sin pasos intermedios, a diferencia del offset, donde la
                imagen pasa primero a una mantilla de caucho. «En relieve»
                porque las zonas que imprimen están más altas que las que no: es
                el mismo principio de un sello de caucho, solo que girando a 300
                metros por minuto.
              </p>
              <p>
                El nombre es relativamente moderno. El proceso nació a finales
                del siglo XIX como impresión con anilina, por los colorantes que
                usaba, y arrastraba mala fama por la baja calidad de aquellas
                tintas. En 1952 la industria votó por rebautizarlo: las opciones
                finalistas fueron Rotopack, Permatone y flexografía. Ganó la
                tercera.
              </p>
              <p>
                Si te interesa el recorrido completo, lo contamos en la{" "}
                <Link href="/flexografia/historia/">
                  historia de la flexografía
                </Link>
                .
              </p>
              <p>
                Lo que convirtió a la flexografía en el sistema dominante del
                empaque no fue una sola invención, sino tres: las planchas de
                fotopolímero en los años setenta, los rodillos anilox cerámicos
                grabados con láser en los ochenta, y el grabado digital de
                planchas en los noventa. Cada una eliminó una fuente de
                variabilidad.
              </p>
            </>
          ),
        },
      ],
    },

    {
      id: "como-funciona",
      titulo: "Cómo funciona el proceso de impresión flexográfica",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Todo el sistema existe para resolver un solo problema: llevar una
                cantidad exacta y repetible de tinta desde el tintero hasta el
                sustrato. Cada componente controla una parte de ese recorrido.
              </p>
              <h3>Los cuatro pasos, en orden</h3>
              <ol>
                <li>
                  <strong>El rodillo anilox toma la tinta.</strong> El anilox es
                  un cilindro con miles de celdas microscópicas grabadas en su
                  superficie cerámica. Se sumerge en la tinta —o la recibe de una
                  cámara— y esas celdas se llenan.
                </li>
                <li>
                  <strong>La racla retira el exceso.</strong> Una cuchilla raspa
                  la superficie del anilox y deja tinta únicamente dentro de las
                  celdas. Aquí queda definida la cantidad de tinta que va a
                  llegar al sustrato, y solo depende del volumen de las celdas.
                </li>
                <li>
                  <strong>El anilox entrega la tinta a la plancha.</strong> El
                  anilox gira contra la plancha flexográfica y le transfiere la
                  tinta, pero solo a las zonas en relieve.
                </li>
                <li>
                  <strong>La plancha imprime sobre el sustrato.</strong> El
                  material pasa entre la plancha y un cilindro de impresión que
                  hace de respaldo. La plancha deposita la tinta y el sustrato
                  sigue hacia el secado.
                </li>
              </ol>
              <p>
                Ese ciclo se repite en cada estación de color. Una máquina de
                empaque flexible típica tiene entre 6 y 10 estaciones; una de
                etiquetas, entre 6 y 12.
              </p>
            </>
          ),
        },
        {
          type: "imagen",
          descripcion:
            "Diagrama o foto del tren de entintado: anilox, racla, plancha y cilindro de impresión, con los cuatro pasos señalados. Ideal una foto real de una estación de una máquina de un cliente.",
        },
        {
          type: "destacado",
          label: "El punto que casi nadie mide",
          content: (
            <p>
              La cantidad de tinta que llega al papel la define el anilox, no la
              presión. Cuando un operario «sube la presión» para conseguir más
              color, no está entregando más tinta: está aplastando el punto de la
              plancha y ensanchando la imagen. Por eso un trabajo puede verse más
              oscuro que la prueba aprobada aunque la densidad sea correcta.
            </p>
          ),
        },
      ],
    },

    {
      id: "elementos",
      titulo: "Los cuatro elementos del sistema flexográfico",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                El resultado en máquina depende de cuatro variables que trabajan
                juntas. Si una está mal elegida, las otras tres no lo compensan.
              </p>

              <h3>La plancha flexográfica</h3>
              <p>
                Es la que define qué se reproduce. Fabricada en fotopolímero,
                lleva la imagen en relieve y se monta sobre el cilindro con cinta
                adhesiva de doble cara. En Latinoamérica se le llama de muchas
                formas —cirel, cliché, caucho, fotopolímero, placa— y todas
                significan lo mismo.
              </p>
              <p>
                De la plancha dependen el detalle mínimo reproducible, la
                densidad de los sólidos y la estabilidad del tiraje. Dos planchas
                de la misma marca pueden comportarse distinto según cómo se hayan
                grabado, expuesto y revelado.{" "}
                <Link href="/planchas/">
                  Todo sobre las planchas flexográficas: tipos, espesores y
                  cuidado
                </Link>
                .
              </p>

              <h3>El rodillo anilox</h3>
              <p>
                Dosifica la tinta. Se define por dos números: lineatura (cuántas
                celdas por centímetro o pulgada) y volumen (cuánta tinta cabe,
                medido en BCM o cm³/m²). Un anilox equivocado arruina la mejor
                plancha del mercado: demasiado volumen ensucia las altas luces,
                muy poco deja los sólidos lavados.{" "}
                <Link href="/anilox/">
                  Cómo elegir el anilox correcto según tu trabajo
                </Link>
                .
              </p>

              <h3>La tinta</h3>
              <p>
                En flexografía las tintas son de baja viscosidad, muy distintas a
                las del offset. Se dividen en tres familias: base agua (cartón,
                papel, corrugado), base solvente (películas plásticas, empaque
                flexible) y UV (etiquetas y banda angosta, con curado
                instantáneo). La viscosidad cambia durante el tiraje por
                evaporación, y con ella cambia el color.{" "}
                <Link href="/tintas/">
                  Tipos de tintas flexográficas y cómo elegirlas
                </Link>
                .
              </p>

              <h3>El sustrato</h3>
              <p>
                Es el material sobre el que se imprime, y condiciona todo lo
                anterior. Una película de polietileno necesita tratamiento corona
                para que la tinta ancle; un papel absorbente exige otra curva de
                compensación; el cartón corrugado requiere planchas más blandas
                para no aplastar la flauta.
              </p>
            </>
          ),
        },
        {
          type: "destacado",
          label: "Regla práctica",
          content: (
            <p>
              El sustrato manda. Primero se define sobre qué se imprime, y a
              partir de ahí se eligen tinta, anilox y plancha. Hacerlo al revés
              es la causa más frecuente de trabajos que «no dan el color».
            </p>
          ),
        },
        {
          type: "experiencia",
          content: (
            <>
              <p>
                El anilox mal elegido es uno de los problemas más comunes que
                vemos. A juicio del operario, la elección del anilox depende solo
                de la intensidad que entrega según su volumen BCM, pero se ignora
                que existe una relación entre lineatura de plancha y lineatura de
                anilox. Es habitual, porque muchas planchas flexográficas no
                pueden llegar a densidades altas cuando llevan trama.
              </p>
              <p>
                Hemos tenido que ir rompiendo esos paradigmas y enseñando que el
                anilox debe ser una variable controlada cuando se trata de
                imprimir CMYK, no un ajuste que se deja al criterio del momento.
              </p>
            </>
          ),
        },
      ],
    },

    {
      id: "que-se-imprime",
      titulo: "Qué productos se imprimen en flexografía",
      bloques: [
        {
          type: "prose",
          content: (
            <p>
              Casi todo lo que envuelve, contiene o etiqueta un producto. Estos
              son los grandes grupos:
            </p>
          ),
        },
        {
          type: "tabla",
          caption:
            "Productos impresos en flexografía, con su sustrato y tinta habituales",
          headers: ["Categoría", "Ejemplos", "Sustrato típico", "Tinta"],
          rows: [
            [
              "Empaque flexible",
              "Bolsas de snacks, café, arroz; sachets; laminados",
              "Polietileno, polipropileno, PET, aluminio",
              "Base solvente",
            ],
            [
              "Etiquetas",
              "Autoadhesivas de bebidas, cosméticos, farma; mangas",
              "Papel couché, filmic, PP transparente",
              "UV",
            ],
            [
              "Cartón plegadizo",
              "Cajas de cereal, medicamentos, cosméticos",
              "Cartulina",
              "Base agua",
            ],
            [
              "Corrugado",
              "Cajas de exhibición, empaque de transporte",
              "Papel kraft, liner",
              "Base agua",
            ],
            [
              "Bolsas plásticas",
              "Bolsas de supermercado, industriales",
              "Polietileno",
              "Base solvente",
            ],
            [
              "Marquillas textiles",
              "Etiquetas de ropa, cintas",
              "Cintas de poliéster, satín",
              "Base agua o UV",
            ],
            [
              "Papel higiénico y servilletas",
              "Tissue impreso",
              "Papel tissue",
              "Base agua",
            ],
            [
              "Sobres y bolsas de papel",
              "Empaque de panadería, farmacia",
              "Papel kraft",
              "Base agua",
            ],
          ],
        },
        {
          type: "prose",
          content: (
            <>
              <h3>Dos formatos que definen el negocio</h3>
              <p>
                <strong>Banda angosta</strong> (hasta ~50 cm de ancho). Es el
                territorio de las etiquetas: tirajes cortos, muchas referencias,
                cambios de trabajo constantes. Aquí el margen se gana o se pierde
                en el arranque, porque se arranca muchas veces por semana.
              </p>
              <p>
                <strong>Banda ancha</strong> (por encima de 80 cm, hasta más de 2
                metros). Empaque flexible y corrugado: menos trabajos pero
                muchísimos más metros. Aquí cada parada de máquina y cada gramo
                de tinta cuesta de verdad.
              </p>
            </>
          ),
        },
      ],
    },

    {
      id: "ventajas-desventajas",
      titulo: "Ventajas y desventajas de la flexografía",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Ningún sistema gana en todo. Estas son las cartas reales que
                juega la flexografía.
              </p>

              <h3>Ventajas</h3>
              <ul>
                <li>
                  Imprime sobre casi cualquier material, incluidos plásticos no
                  absorbentes y superficies irregulares donde el offset no
                  funciona.
                </li>
                <li>
                  Alta velocidad de producción, con máquinas que superan los 400
                  metros por minuto.
                </li>
                <li>
                  Costo por unidad muy bajo en tirajes medianos y largos: una vez
                  arrancada la máquina, el costo marginal es mínimo.
                </li>
                <li>
                  Proceso en línea: en una sola pasada puede imprimir, barnizar,
                  laminar, troquelar y rebobinar.
                </li>
                <li>
                  Tintas de secado rápido, lo que permite velocidades altas sin
                  repintado.
                </li>
                <li>
                  Admite tintas base agua, más limpias en términos ambientales
                  que las de otros sistemas.
                </li>
              </ul>

              <h3>Desventajas</h3>
              <ul>
                <li>
                  Costo inicial por trabajo: hay que fabricar planchas para cada
                  color de cada versión. En tirajes muy cortos ese costo no se
                  diluye.
                </li>
                <li>
                  Menor resolución que el huecograbado en imágenes de altísimo
                  detalle, aunque la brecha se ha cerrado mucho con las planchas
                  digitales.
                </li>
                <li>
                  Ganancia de punto: el relieve flexible tiende a ensanchar el
                  punto bajo presión, y hay que compensarlo con curvas.
                </li>
                <li>
                  Arranque más largo que el digital, con desperdicio de material
                  hasta lograr registro y color.
                </li>
                <li>
                  Muchas variables en juego: presión, viscosidad, anilox,
                  sustrato y plancha interactúan entre sí, y un cambio en una
                  afecta a las demás.
                </li>
              </ul>

              <p>
                La ganancia de punto y el número de variables son los dos que más
                dinero cuestan en la práctica, y ambos se atacan desde la
                preprensa, no desde la máquina. Una plancha con curvas calibradas
                para tu anilox y tu sustrato reduce los dos problemas antes de
                que el material entre a la prensa.
              </p>
            </>
          ),
        },
        {
          type: "experiencia",
          content: (
            <p>
              Los operarios de impresión muchas veces no saben qué tipo de
              plancha o tecnología están usando. Pero las planchas de Miraclon
              son amarillas, y ellos expresan que «las planchas amarillas les
              hacen la vida más fácil»: llegan más rápido al color, no toman
              tanto tiempo en máquina y mejoran sus indicadores de rendimiento.
              Por eso siempre dicen lo mismo: «tráiganme solo planchas
              amarillas».
            </p>
          ),
        },
      ],
    },

    {
      id: "vs-otros-sistemas",
      titulo: "Flexografía frente a otros sistemas de impresión",
      bloques: [
        {
          type: "tabla",
          caption:
            "Comparación entre flexografía, offset, huecograbado e impresión digital",
          headers: [
            "",
            "Flexografía",
            "Offset",
            "Huecograbado",
            "Digital",
          ],
          rows: [
            [
              "Tipo de forma",
              "Relieve flexible",
              "Plana (litográfica)",
              "Hueco grabado",
              "Sin forma física",
            ],
            [
              "Sustratos",
              "Casi todos, incluidos plásticos",
              "Papel y cartón principalmente",
              "Películas y papel",
              "Limitado según equipo",
            ],
            ["Tiraje ideal", "Medio y largo", "Medio y largo", "Muy largo", "Muy corto"],
            ["Costo de forma", "Medio", "Bajo", "Muy alto", "Ninguno"],
            [
              "Calidad de detalle",
              "Alta (con plancha digital)",
              "Muy alta",
              "Máxima",
              "Alta",
            ],
            ["Velocidad", "Muy alta", "Alta", "Muy alta", "Baja"],
            ["Tiempo de arranque", "Medio", "Medio", "Alto", "Mínimo"],
            [
              "Uso dominante",
              "Empaque y etiquetas",
              "Publicaciones, plegadizo",
              "Empaque de tiraje muy alto",
              "Tirajes cortos, versionado",
            ],
          ],
        },
        {
          type: "prose",
          content: (
            <>
              <p>
                <strong>Cómo se decide en la práctica:</strong> si el tiraje es
                muy corto y hay muchas versiones, digital. Si es gigantesco y el
                diseño no cambiará en años, huecograbado. Si va sobre papel o
                cartulina en volumen alto, offset. Para todo lo demás en empaque
                —que es la mayoría— flexografía.
              </p>
              <p>
                Lo desarrollamos en{" "}
                <Link href="/flexografia/vs-impresion-offset/">
                  flexografía frente a impresión offset
                </Link>
                .
                {/* PENDIENTE: añadir aquí el enlace a /flexografia/vs-rotograbado/
                    cuando ese artículo exista. Hoy no está publicado. */}
              </p>
            </>
          ),
        },
      ],
    },

    {
      id: "problemas-comunes",
      titulo: "Problemas comunes en la impresión flexográfica y cómo evitarlos",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Estos son los defectos que aparecen una y otra vez en planta, con
                su causa real.
              </p>
              <ul>
                <li>
                  <strong>Ganancia de punto excesiva.</strong> La imagen sale más
                  oscura y cerrada que la prueba aprobada. Suele venir de presión
                  excesiva, aunque también de curvas de compensación mal
                  calculadas o de un anilox con más volumen del necesario. La
                  presión correcta en flexografía es la mínima que logra
                  transferencia completa, no la que «se ve bien».
                </li>
                <li>
                  <strong>Altas luces que desaparecen.</strong> Los degradados
                  cortan de golpe en lugar de desvanecerse. Casi siempre es un
                  problema de plancha: el punto más pequeño no sobrevivió al
                  revelado, o el microtramado se tapó durante el proceso.
                </li>
                <li>
                  <strong>Sólidos sucios o con densidad irregular.</strong> Puede
                  ser anilox tapado, tinta con viscosidad inadecuada o plancha
                  con superficie deteriorada. Antes de tocar la máquina, mide el
                  volumen real del anilox: se desgasta y se obstruye con el uso,
                  y muchos «problemas de tinta» son en realidad anilox agotados.
                </li>
                <li>
                  <strong>Registro que no cierra.</strong> Tensión del material,
                  cintas de montaje inconsistentes o distorsión mal calculada.
                  Este último punto es puro cálculo de preprensa: la plancha debe
                  compensar la deformación que sufre al curvarse sobre el
                  cilindro. Lo explicamos en{" "}
                  <Link href="/planchas/distorsion/">
                    distorsión en planchas flexográficas
                  </Link>
                  .
                </li>
                <li>
                  <strong>Impresión sucia o con acumulación de tinta.</strong>{" "}
                  Aparece a mitad de tiraje y obliga a parar para limpiar. Es una
                  de las mayores fuentes de tiempo muerto y se ataca desde el
                  diseño de la superficie de la plancha.
                </li>
                <li>
                  <strong>Bandeo o barrado.</strong> Líneas transversales
                  regulares. Casi siempre mecánico: engranajes, cojinetes o
                  montaje del cilindro.
                </li>
              </ul>
              {/* PENDIENTE: enlazar a /planchas/defectos-comunes/ cuando exista. */}
            </>
          ),
        },
        {
          type: "destacado",
          label: "El diagnóstico que ahorra más tiempo",
          content: (
            <p>
              Antes de culpar a la tinta o al operario, verifica en este orden:
              volumen real del anilox, viscosidad, presión y estado de la
              plancha. En la mayoría de casos el problema aparece antes de llegar
              a la tinta.
            </p>
          ),
        },
        {
          type: "experiencia",
          content: (
            <>
              <p>
                Lo primero que revisamos cuando el color no da es comparar con
                los datos técnicos de la huella de máquina —la caracterización
                que se hizo inicialmente— y contrastarlos con la forma en que
                están imprimiendo en ese mismo instante. Además, verificamos que
                los parámetros técnicos de nuestra ficha se hayan aplicado. Eso
                nos permite encontrar rápido alguna causa. Si todo está igual,
                entramos a revisar densidades de tinta con más precisión.
              </p>
              <p>
                Pero lo más probable es que el problema esté en la forma con la
                que están comparando el color: muchas veces es contra un
                dispositivo digital sin calibrar, y por eso «no quedan iguales».
                Ahí está la importancia de una{" "}
                <Link href="/prueba-de-color/">prueba de color certificada</Link>
                : sin una referencia objetiva, se discute sobre percepciones.
              </p>
            </>
          ),
        },
      ],
    },

    {
      id: "calidad-final",
      titulo: "De qué depende la calidad final",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                La cadena tiene un orden y cada eslabón limita al siguiente:
              </p>
              <ol>
                <li>
                  <strong>El archivo.</strong> Un arte mal preparado para flexo
                  —tipografías demasiado finas, degradados que bajan a cero,
                  trapping insuficiente— ya condiciona el resultado antes de
                  existir la plancha.
                </li>
                <li>
                  <strong>La preprensa.</strong> Curvas de compensación,
                  distorsión, tramado y separación de colores. Aquí se decide
                  cuánto va a costar el arranque.
                </li>
                <li>
                  <strong>La plancha.</strong> Cómo se graba, se expone y se
                  revela determina si el detalle del archivo llega o no a la
                  máquina.
                </li>
                <li>
                  <strong>El montaje.</strong> Cinta adecuada, tensión correcta,
                  registro preciso.
                </li>
                <li>
                  <strong>La máquina.</strong> Presión mínima, viscosidad
                  controlada, anilox en buen estado.
                </li>
              </ol>
              <p>
                Los pasos 1 a 3 ocurren antes de que el material entre a la
                prensa, y determinan la mayor parte del resultado. Es la razón
                por la que trabajar con un proveedor de preprensa que entienda tu
                proceso —tu anilox, tus tintas, tus sustratos— cambia los números
                de producción más que cualquier ajuste en máquina.
              </p>
            </>
          ),
        },
        {
          type: "experiencia",
          content: (
            <p>
              Cuando un cliente pasa de parar la máquina diez veces por tiraje a
              menos de la mitad, es porque el procesamiento de las planchas
              cumple una serie de medidas de calidad rigurosas que garantizan que
              su durabilidad y sus bondades se mantengan durante muchos metros de
              impresión continuos. La tecnología de plancha nos da la oportunidad
              de mejorar la transferencia y la latitud de impresión: eso hace que
              el color se sostenga y que las impresiones sean estables tiraje
              tras tiraje.
            </p>
          ),
        },
      ],
    },
  ],

  faq: {
    id: "preguntas-frecuentes",
    titulo: "Preguntas frecuentes sobre flexografía",
    items: [
      {
        q: "¿Qué significa flexografía?",
        a: "El término combina «flexible» —por las planchas de material flexible que utiliza— y «grafía», del griego grafé, escritura o representación. Se adoptó oficialmente en 1952 para reemplazar el nombre anterior, impresión con anilina.",
      },
      {
        q: "¿Cuál es la diferencia entre flexografía y offset?",
        a: "La flexografía usa planchas en relieve y transfiere la tinta directamente al sustrato; el offset usa planchas planas y pasa la imagen primero a una mantilla de caucho. La flexografía imprime sobre plásticos y materiales no absorbentes; el offset se especializa en papel y cartulina.",
      },
      {
        q: "¿Qué materiales se pueden imprimir en flexografía?",
        a: "Películas plásticas (polietileno, polipropileno, PET), papel, cartulina, cartón corrugado, aluminio, laminados, papel tissue, cintas textiles y etiquetas autoadhesivas. Es el sistema más versátil en cuanto a sustratos.",
      },
      {
        q: "¿Cuántos colores se pueden imprimir?",
        a: "Depende de las estaciones de la máquina. Lo habitual va de 6 a 10 en empaque flexible y de 6 a 12 en banda angosta. Con técnicas de paleta fija o gamut extendido es posible reproducir la mayoría de colores de marca usando menos tintas.",
      },
      {
        q: "¿Cuánto dura una plancha flexográfica?",
        a: "Depende del sustrato, la tinta y el cuidado. Sobre películas plásticas puede superar el millón de impresiones; sobre sustratos abrasivos como el corrugado, la vida útil se acorta bastante. El almacenamiento y la limpieza influyen tanto como el material.",
      },
      {
        q: "¿Se puede imprimir en flexografía con tirajes cortos?",
        a: "Sí, pero hay que evaluar el costo de las planchas frente al total impreso. Por debajo de cierto volumen, el digital resulta más económico. El punto de equilibrio depende del número de colores y del ancho de banda.",
      },
      {
        q: "¿Qué es la ganancia de punto en flexografía?",
        a: "Es el aumento del tamaño del punto impreso respecto al de la plancha, causado por la presión y la flexibilidad del fotopolímero. Se compensa con curvas de calibración aplicadas en preprensa, específicas para cada combinación de anilox, tinta y sustrato.",
      },
      {
        q: "¿Qué se necesita para empezar a imprimir en flexografía?",
        a: "Una máquina flexográfica con las estaciones necesarias, rodillos anilox adecuados al trabajo, tintas compatibles con el sustrato, y planchas fabricadas por un proveedor de preprensa. La preprensa es el eslabón que más define la calidad y la eficiencia del resto.",
      },
    ],
  },

  cta: {
    titulo: "Conoce nuestras planchas flexográficas Kodak Flexcel NX",
    cuerpo:
      "La mayor parte del resultado se decide antes de que el material entre a la prensa. Ahí es donde trabajamos.",
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
