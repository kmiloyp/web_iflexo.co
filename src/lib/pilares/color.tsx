import Link from "next/link";
import type { PilarData } from "@/components/pilar/PaginaPilar";

/**
 * Contenido del pilar de /color/ (categoría nueva, nace sin artículos).
 *
 * Reglas anticanibalización:
 *   - "prueba de color" / "sherpa" NO van en title/H1/H2 → son de
 *     /prueba-de-color/. Solo mención y enlace en el cuerpo.
 *   - "reducción de color" / "paleta fija" NO van en title/H1. El H2 sobre
 *     reducir tintas se llama "Cómo se reduce el número de tintas sin perder
 *     el color" y enlaza a /reduccion-de-color/.
 *
 * PENDIENTE — experiencia de Camilo en 3 puntos (ver comentarios en las
 * secciones "por-que-no-coincide", "curvas" y "repetibilidad"). NO se inventan.
 * Datos a confirmar por Camilo: rangos de Delta E (varían por norma) e
 * iluminante de cabina (puse D50).
 *
 * Todos los enlaces internos apuntan a URLs que existen hoy.
 */

export const pilarColor: PilarData = {
  h1: "Gestión de color en flexografía",

  respuestaDirecta: (
    <>
      La gestión de color en flexografía es el conjunto de mediciones, curvas y
      controles que permiten que un color se reproduzca igual en cada tiraje, en
      cada máquina y en cada planta. No consiste en «ajustar hasta que se vea
      bien», sino en caracterizar el proceso real —anilox, tinta, sustrato y
      plancha— y compensar sus desviaciones antes de que el material entre a la
      prensa.
    </>
  ),

  intro: (
    <>
      <p>
        Hay una pregunta que se repite en todas las plantas de flexografía: ¿por
        qué el impreso no salió igual a lo aprobado? La respuesta casi nunca es
        una sola causa, y casi nunca está en la máquina. Está repartida a lo
        largo de una cadena que empieza en el archivo y termina en la prensa.
      </p>
      <p>
        Esta guía explica esa cadena: qué es la ganancia de punto, cómo se
        compensa, cómo se mide el color con números en vez de con criterio, y qué
        hace falta para que el mismo trabajo salga igual dentro de seis meses.
      </p>
    </>
  ),

  secciones: [
    {
      id: "por-que-no-coincide",
      titulo: "Por qué el impreso no coincide con lo aprobado",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                El color que ve tu cliente y el que sale de la máquina viajan por
                caminos distintos.
              </p>
              <ul>
                <li>
                  <strong>El monitor emite luz; el impreso la refleja.</strong> Un
                  monitor genera color mezclando luz roja, verde y azul. El papel
                  no emite nada: refleja la luz que le llega, filtrada por la
                  tinta. Son dos fenómenos físicos diferentes, y ningún monitor
                  sin calibrar es una referencia válida.
                </li>
                <li>
                  <strong>La luz cambia lo que ves.</strong> Un mismo impreso se ve
                  distinto bajo luz de día, fluorescente y LED. Por eso las
                  aprobaciones se hacen en cabina normalizada, con iluminación
                  estandarizada —habitualmente D50—. Aprobar un color junto a una
                  ventana no es aprobar: es adivinar.
                </li>
                <li>
                  <strong>El sustrato es parte del color.</strong> El mismo cian
                  sobre papel blanco brillante, sobre papel amarillento y sobre
                  película transparente da tres resultados distintos. La blancura
                  y el brillo del material forman parte del resultado final.
                </li>
                <li>
                  <strong>Y en el medio está el proceso.</strong> Entre el archivo
                  y el impreso hay una plancha que deforma el punto, un anilox que
                  dosifica la tinta, una tinta cuya viscosidad se mueve y una
                  presión que alguien ajusta a mano. Cada uno introduce su propia
                  desviación.
                </li>
              </ul>
            </>
          ),
        },
        {
          type: "destacado",
          label: "El cambio de mentalidad que resuelve el problema",
          content: (
            <p>
              No se trata de lograr que la máquina reproduzca un ideal, sino de
              saber cómo se desvía tu proceso y compensarlo por adelantado. Eso es
              la gestión de color.
            </p>
          ),
        },
        // PENDIENTE (Camilo): la conversación con clientes cuando el color no
        // coincide — qué le dicen y qué encuentra al ir a mirar. Añadir aquí un
        // bloque { type: "experiencia" }.
      ],
    },

    {
      id: "ganancia-de-punto",
      titulo: "La ganancia de punto: el fenómeno que más color mueve",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Es el efecto más característico de la flexografía y el que más
                discusiones genera en planta.
              </p>
              <p>
                <strong>Qué es.</strong> El punto impreso siempre resulta más
                grande que el punto de la plancha. Un archivo con 50 % de trama
                puede imprimirse como 70 % u 80 %. El resultado: la imagen sale
                más oscura y cerrada que lo aprobado, los tonos medios se ensucian
                y el detalle se pierde.
              </p>
              <p>
                <strong>Por qué ocurre en flexografía más que en otros
                sistemas.</strong> Confluyen tres causas:
              </p>
              <ul>
                <li>
                  <strong>Mecánica:</strong> la plancha es de material flexible.
                  Bajo presión, el punto se aplasta y se ensancha. Es física, no
                  un defecto.
                </li>
                <li>
                  <strong>Óptica:</strong> la luz entra al sustrato, se dispersa
                  dentro y sale por el borde del punto, haciéndolo parecer mayor de
                  lo que es.
                </li>
                <li>
                  <strong>De transferencia:</strong> la tinta se expande
                  ligeramente al depositarse, sobre todo en sustratos absorbentes.
                </li>
              </ul>
              <p>
                <strong>Qué la aumenta.</strong> Presión excesiva,{" "}
                <Link href="/anilox/">anilox</Link> con más volumen del necesario,
                viscosidad baja, sustratos muy absorbentes y{" "}
                <Link href="/planchas/">planchas</Link> con punto redondo en vez de
                plano.
              </p>
            </>
          ),
        },
        {
          type: "alerta",
          content: (
            <p>
              El error más caro: intentar corregir la ganancia bajando la presión
              hasta que el punto se vea bien. La presión correcta en flexografía
              es la mínima que logra transferencia completa. Si necesitas más
              presión para lograr color, el problema está en el anilox o en la
              tinta; si necesitas menos para controlar el punto, está en la
              plancha o en las curvas. La ganancia se compensa en preprensa, no en
              máquina.
            </p>
          ),
        },
      ],
    },

    {
      id: "curvas",
      titulo: "Curvas de compensación: cómo se corrige antes de imprimir",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Si tu proceso convierte un 50 % en un 75 %, la solución es sencilla
                de enunciar: enviar a la plancha un valor menor para que el
                resultado impreso sea el correcto. Eso es una curva de
                compensación.
              </p>
              <h3>Cómo se construye, paso a paso</h3>
              <ol>
                <li>
                  Se imprime una tira de control con parches de porcentaje conocido
                  —normalmente de 5 en 5 o de 10 en 10— usando el anilox, la tinta,
                  el sustrato y la máquina reales del cliente.
                </li>
                <li>
                  Se mide cada parche con densitómetro o espectrofotómetro y se
                  anota el valor impreso frente al nominal.
                </li>
                <li>
                  Se calcula la desviación en cada punto de la escala. La ganancia
                  no es uniforme: suele ser máxima en los tonos medios y menor en
                  los extremos.
                </li>
                <li>
                  Se genera la curva inversa que compensa exactamente esa
                  desviación.
                </li>
                <li>Se aplica esa curva al procesar las planchas de ese cliente.</li>
                <li>
                  Se verifica imprimiendo de nuevo y midiendo. Si la curva es
                  correcta, los valores impresos coinciden con los nominales.
                </li>
              </ol>
            </>
          ),
        },
        {
          type: "destacado",
          label: "El punto que casi nadie tiene en cuenta",
          content: (
            <p>
              Una curva es válida solo para la combinación con la que se hizo.
              Cambia el <Link href="/anilox/">anilox</Link>, cambia el sustrato,
              cambia el proveedor de <Link href="/tintas/">tinta</Link>, y la curva
              deja de ser correcta. Por eso una plancha «calibrada» comprada a un
              proveedor que nunca vio tu máquina no está calibrada para ti: está
              calibrada para un proceso promedio que no existe en ninguna planta.
            </p>
          ),
        },
        // PENDIENTE (Camilo): cómo construye las curvas en la práctica. Es su
        // servicio; el detalle separa a quien calibra de quien solo entrega
        // planchas. Añadir aquí un bloque { type: "experiencia" }.
      ],
    },

    {
      id: "medir-el-color",
      titulo: "Medir el color: densidad, Delta E y por qué importan",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                En muchas plantas el color se aprueba mirando. Eso funciona hasta
                que hay una discusión con el cliente, y entonces no hay forma de
                demostrar quién tiene razón.
              </p>
              <h3>Densidad</h3>
              <p>
                Mide cuánta luz absorbe una capa de tinta. Es la medición más
                rápida y la que usa el operario en máquina para verificar que los
                sólidos están en el valor correcto. Su límite: dice cuánta tinta
                hay, no de qué color es. Dos tintas de tono distinto pueden dar la
                misma densidad.
              </p>
              <h3>El espacio CIELab</h3>
              <p>
                Describe cada color con tres coordenadas: L* (luminosidad, de negro
                a blanco), a* (de verde a rojo) y b* (de azul a amarillo). Cualquier
                color visible tiene una posición única en ese espacio. Su ventaja
                es que es independiente del dispositivo: no depende de la máquina,
                la tinta ni el sustrato. Es una descripción objetiva del color tal
                como lo ve el ojo humano.
              </p>
              <h3>Delta E: la distancia entre dos colores</h3>
              <p>
                Delta E (ΔE) es la distancia entre dos colores dentro del espacio
                CIELab. Es el número que permite responder con datos a la pregunta
                «¿está bien este color?».
              </p>
            </>
          ),
        },
        {
          type: "tabla",
          caption: "Interpretación práctica de los valores de Delta E",
          headers: ["", "Valor de ΔE", "Qué significa en la práctica"],
          rows: [
            [
              <DeltaSwatch key="1" color="#43b02a" />,
              "Menor a 1",
              "Diferencia imperceptible para el ojo humano",
            ],
            [
              <DeltaSwatch key="2" color="#a7c957" />,
              "Entre 1 y 2",
              "Perceptible solo comparando ambos lado a lado",
            ],
            [
              <DeltaSwatch key="3" color="#fbb215" />,
              "Entre 2 y 3,5",
              "Perceptible incluso sin comparación directa",
            ],
            [
              <DeltaSwatch key="4" color="#c21a76" />,
              "Mayor a 5",
              "Se percibe claramente como un color distinto",
            ],
          ],
        },
        {
          type: "prose",
          content: (
            <p>
              Existen varias fórmulas —ΔE76, ΔE94, ΔE2000— y no dan el mismo
              resultado. La más usada hoy es ΔE2000, porque corrige las
              limitaciones de las anteriores y se ajusta mejor a cómo percibe el
              ojo. Cuando acuerdes una tolerancia con un cliente, especifica con
              qué fórmula se va a medir: un ΔE de 2 no significa lo mismo en una que
              en otra.
            </p>
          ),
        },
        {
          type: "destacado",
          label: "Por qué esto cambia la relación con tu cliente",
          content: (
            <p>
              Con densidad y Delta E, una aprobación deja de ser una opinión y pasa
              a ser un dato. Puedes acordar una tolerancia por escrito, medirla y
              demostrar que se cumplió. Es la diferencia entre discutir y
              documentar.
            </p>
          ),
        },
      ],
    },

    {
      id: "repetibilidad",
      titulo: "Repetibilidad: que el mismo trabajo salga igual dentro de seis meses",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Lograr el color una vez es relativamente fácil. Lograrlo todas las
                veces es el problema real, y es donde se pierde el dinero. Las cinco
                variables que hay que fijar:
              </p>
              <ol>
                <li>
                  <strong>Planchas consistentes.</strong> Si cada juego se comporta
                  distinto, no hay curva que valga. La uniformidad del proceso de
                  fabricación es la base de todo lo demás.{" "}
                  <Link href="/planchas/">Ver planchas</Link>.
                </li>
                <li>
                  <strong>Anilox medido y con historial.</strong> Un anilox pierde
                  volumen gradualmente. Si nadie lo mide, el color se va moviendo
                  durante meses sin explicación.{" "}
                  <Link href="/anilox/">Ver anilox</Link>.
                </li>
                <li>
                  <strong>Viscosidad controlada y registrada.</strong> La tinta se
                  espesa durante el tiraje. Sin control, el color deriva de principio
                  a fin. <Link href="/tintas/">Ver tintas</Link>.
                </li>
                <li>
                  <strong>Presión estandarizada.</strong> Definida como «la mínima
                  que transfiere», no como criterio de cada operario.
                </li>
                <li>
                  <strong>Curvas vigentes.</strong> Reverificadas cuando cambie
                  cualquiera de los elementos anteriores.
                </li>
              </ol>
            </>
          ),
        },
        {
          type: "destacado",
          label: "El registro que más devuelve por lo que cuesta",
          content: (
            <p>
              Una ficha por trabajo con anilox usado, viscosidad de arranque,
              temperatura, presión y densidades objetivo. La próxima vez que corra
              ese trabajo, se arranca desde el punto que ya funcionó en lugar de
              buscarlo otra vez. Es la medida más barata que puede tomar una planta
              para reducir el tiempo de arranque, y una de las menos aplicadas.
            </p>
          ),
        },
        // PENDIENTE (Camilo): el testimonio de percepción visual, la reacción del
        // cliente al comparar ("quedó igual a la prueba, es increíble"). Añadir
        // aquí un bloque { type: "experiencia" }.
      ],
    },

    {
      id: "reducir-tintas",
      titulo: "Cómo se reduce el número de tintas sin perder el color",
      bloques: [
        {
          type: "prose",
          content: (
            <>
              <p>
                Existe un camino para bajar el costo de un trabajo que no pasa por
                negociar el precio de nada: usar menos tintas para lograr el mismo
                resultado visual.
              </p>
              <p>
                <strong>Gamut extendido.</strong> En lugar de preparar una tinta
                especial para cada color de marca, se trabaja con un conjunto fijo
                ampliado —típicamente CMYK más naranja, verde y violeta— capaz de
                reproducir la mayoría de colores por combinación.
              </p>
              <p>
                <strong>Paleta fija.</strong> La máquina mantiene siempre las
                mismas tintas montadas y los trabajos se ajustan a ellas. Se
                eliminan los cambios de tinta entre trabajos, una de las
                principales fuentes de tiempo muerto.
              </p>
              <p>
                <strong>Lo que se ahorra realmente:</strong> menos estaciones
                ocupadas, menos cambios de tinta, arranques más cortos, menos
                inventario de tintas especiales —que además caducan— y menos
                limpiezas.
              </p>
              <p>
                <strong>Lo que exige a cambio:</strong> un proceso de color
                caracterizado y bajo control. Sin curvas correctas y sin medición,
                la reducción no funciona: se convierte en aproximaciones que el
                cliente rechaza. Es decir, todo lo anterior de esta guía es el
                requisito previo.
              </p>
            </>
          ),
        },
        {
          type: "destacado",
          label: "Te lo analizamos",
          content: (
            <p>
              <Link href="/reduccion-de-color/">
                Analizamos tu trabajo y te decimos cuántas tintas realmente
                necesitas
              </Link>{" "}
              para lograr el mismo resultado con menos estaciones y menos arranque.
            </p>
          ),
        },
      ],
    },

    {
      id: "cadena-del-color",
      titulo: "La cadena completa del color, de principio a fin",
      bloques: [
        {
          type: "prose",
          content: <p>Un resumen de dónde se decide cada cosa:</p>,
        },
        {
          type: "tabla",
          caption:
            "Etapas de la cadena de color y quién controla cada una. Las filas resaltadas ocurren en preprensa.",
          headers: ["Etapa", "Qué se define ahí", "Quién lo controla"],
          // Filas 1-4 (preprensa) resaltadas: son las que ocurren antes de la prensa.
          highlightRows: [1, 2, 3, 4],
          rows: [
            ["Diseño", "Colores de marca, tolerancias esperadas", "Marca / agencia"],
            [
              "Preprensa",
              "Separaciones, curvas de compensación, tramado",
              "Proveedor de preprensa",
            ],
            ["Prueba de color", "Referencia de aprobación", "Proveedor de preprensa"],
            [
              "Plancha",
              "Detalle reproducible, forma del punto",
              "Proveedor de preprensa",
            ],
            ["Montaje", "Registro, presión inicial", "Planta"],
            ["Máquina", "Viscosidad, presión, velocidad", "Planta"],
            ["Verificación", "Densidad, ΔE contra referencia", "Planta"],
          ],
        },
        {
          type: "destacado",
          label: "Lo que revela esta tabla",
          content: (
            <p>
              Cuatro de las siete etapas ocurren antes de que el material entre a
              la prensa, y las controla el proveedor de preprensa. Por eso el color
              no se resuelve en máquina: se resuelve antes, o no se resuelve.
            </p>
          ),
        },
      ],
    },
  ],

  faq: {
    id: "preguntas-frecuentes",
    titulo: "Preguntas frecuentes sobre gestión de color",
    items: [
      {
        q: "¿Qué es la gestión de color en flexografía?",
        a: "Es el conjunto de mediciones, curvas de compensación y controles que permiten reproducir un color de forma repetible. Consiste en caracterizar el proceso real —anilox, tinta, sustrato y plancha— y compensar sus desviaciones antes de imprimir.",
      },
      {
        q: "¿Qué es la ganancia de punto?",
        a: "Es el aumento del tamaño del punto impreso respecto al de la plancha. Tiene tres causas: la deformación mecánica del punto bajo presión, la dispersión óptica de la luz dentro del sustrato y la expansión de la tinta al depositarse.",
      },
      {
        q: "¿Cómo se corrige la ganancia de punto?",
        a: "Con curvas de compensación aplicadas en preprensa: se mide cuánto se desvía el proceso real y se envía a la plancha un valor menor para que el impreso resulte correcto. No se corrige bajando la presión.",
      },
      {
        q: "¿Qué es Delta E?",
        a: "Es la distancia numérica entre dos colores en el espacio CIELab. Permite cuantificar cuánto se aleja un color impreso de su referencia. Por debajo de 1 la diferencia es imperceptible; por encima de 5 se percibe como un color distinto.",
      },
      {
        q: "¿Qué fórmula de Delta E debo usar?",
        a: "ΔE2000 es la más recomendada actualmente porque se ajusta mejor a la percepción visual. Lo importante es especificar la fórmula al acordar una tolerancia, porque un mismo par de colores da valores distintos según cuál se use.",
      },
      {
        q: "¿Por qué el color cambia entre un tiraje y otro?",
        a: "Las causas más frecuentes son pérdida de volumen del anilox por obstrucción o desgaste, viscosidad no controlada, variación entre juegos de planchas y cambios de sustrato o de lote de tinta.",
      },
      {
        q: "¿Necesito un espectrofotómetro para controlar el color?",
        a: "Para producción básica, un densitómetro permite verificar densidades de sólidos. Para trabajar con tolerancias acordadas y colores especiales, el espectrofotómetro es necesario porque mide el color, no solo la cantidad de tinta.",
      },
      {
        q: "¿Sirve mi monitor para aprobar color?",
        a: "No, salvo que esté calibrado y perfilado, y aun así con limitaciones: el monitor emite luz y el impreso la refleja. Las aprobaciones deben hacerse sobre una prueba física en cabina de luz normalizada.",
      },
      {
        q: "¿Qué es una curva de compensación?",
        a: "Es el ajuste que se aplica a los porcentajes de trama antes de grabar la plancha, para contrarrestar la ganancia de punto del proceso. Es válida únicamente para la combinación de anilox, tinta, sustrato y máquina con la que se midió.",
      },
    ],
  },

  cta: {
    titulo: "Una aprobación que sí se cumple en máquina",
    cuerpo:
      "Toda esta ingeniería de color existe para que lo aprobado sea lo que se imprime. Nuestra prueba de color alcanza hasta un 95 % de coincidencia con el impreso final.",
    href: "/prueba-de-color/",
    label: "Ver la prueba de color",
  },

  autor: {
    nombre: "Camilo Yepes",
    cargo: "Director de iFlexo, empresa de preprensa",
    anios: 16,
    bio: "Desde la preprensa he recorrido muchas empresas de impresión, lo que me ha dado un concepto amplio de las necesidades de un impresor y de cómo resolverlas de forma fácil y eficiente, con la mirada de quien entiende las empresas como negocios que deben ser rentables desde sus procesos.",
    href: "/autores/camilo-yepes/",
  },
};

/** Muestra de color para la escala de interpretación de Delta E. */
function DeltaSwatch({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="inline-block h-4 w-4 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}
