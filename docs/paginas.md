# iFlexo — Estructuras de páginas de venta

Todo lo que sigue está listo para pasarle a Claude Code, página por página.
Primero van las bases (mensaje, argumentario, reglas); después cada página en el formato pedido.

---

# PARTE 0 — BASES

## 0.1 El mensaje raíz

> **Ya hay quien vende planchas Kodak en Colombia. La diferencia no está en la plancha: está en cómo se procesa.**

Este es el eje de toda la web. Torreflex y Grafiflex también ofrecen Kodak. Por eso el copy nunca debe quedarse en "somos Kodak Flexcel NX" — eso ya no diferencia. El argumento ganador es el **proceso**: exposición LED SHINE, solventes específicos, curvas por cliente y certificación de proceso medible. Dos planchas del mismo material dan resultados distintos según quién las fabrique.

**Frase de batalla para la web:** *"La misma marca de plancha, procesada distinto, imprime distinto."*

## 0.2 Verificaciones pendientes (NO publicar sin confirmar)

| Afirmación | Estado | Acción |
|---|---|---|
| "Miraclon Certified User" | iFlexo no aparece en la lista pública de Miraclon; tampoco ninguna empresa de Colombia | Confirmar con Miraclon el nombre exacto del programa y si autorizan usar el sello. Mientras tanto usar: *"proceso auditado y certificado por Miraclon"* si tienes el certificado en mano |
| "Únicos en Colombia con SHINE LED" | Dato tuyo, muy potente | Verificar que siga vigente. Si es cierto, es titular de portada |
| Tramas "UV Choice" para banda angosta | No pude confirmar el nombre comercial exacto | Confírmame el nombre correcto antes de que salga impreso en la web |
| "Primer proveedor con Flexcel NX en Colombia" | Ya está publicado en tu blog | Mantener |

## 0.3 Biblioteca de argumentos: tecnología → beneficio

Esta tabla es la materia prima de casi todas las páginas. **Regla de oro: nunca se menciona una tecnología sin decir qué gana el impresor.**

| Tecnología | Qué hace (técnico) | Qué gana el cliente (venta) |
|---|---|---|
| **SQUARESPOT / grabado del TIL** | Graba la máscara con láser de punto cuadrado, imagen 1:1 sin desviación | Lo que diseñaste es exactamente lo que queda en la plancha. Repetible plancha tras plancha, semana tras semana |
| **Punto plano real** | Punto de cima plana, no redondeada | Sólidos densos y parejos, altas luces que no desaparecen, tipografía fina que no se engorda |
| **Advantage Patterns (AED)** | Micropatrón en el borde del elemento: retiene la tinta y deja escapar el aire | Funciona como un anilox sobre la plancha: más densidad con la misma tinta. Mejor cubrimiento en blancos |
| **PureFlexo Printing** | Patrón multiforma que controla el flujo de tinta y frena la propagación no deseada | Menos paradas para limpiar, ventana de operación más amplia, color estable durante todo el tiraje, mejor coincidencia prueba–impreso |
| **SHINE LED (exclusivo de iFlexo en Colombia)** | Exposición LED en vez de tubos fluorescentes: uniforme y estable | Todas las planchas iguales, la de hoy y la de dentro de seis meses. La misma marca expuesta con fluorescente no rinde igual |
| **Solvente específico para NX** | Revelado que no tapa el microtramado | Las altas luces y el microtrama sobreviven al proceso. Estabilidad tiraje a tiraje |
| **Curvas por cliente** | Calibración para su anilox, tinta, sustrato y máquina | La plancha llega lista para *su* proceso, no para un proceso genérico |
| **Prueba de color / Sherpa** | Prueba de contrato como referencia de aprobación | El cliente aprueba una vez y no hay discusión en máquina |

## 0.4 Guía para conseguir testimonios reales

Mientras llegan, los actuales se dejan anónimos pero con **cargo + tipo de empresa + ciudad** (más creíble que "cliente satisfecho"). Cuando los pidas, no preguntes "¿qué opinas de nosotros?". Pregunta esto:

1. "¿Cuántas veces parabas la máquina por tiraje antes y cuántas ahora?"
2. "¿Cuánto tiempo te tomaba llegar al color aprobado antes? ¿Y hoy?"
3. "¿Qué dicen tus operarios cuando ven que llegó plancha amarilla?"
4. "¿Qué pasó la primera vez que comparaste el impreso con la prueba de color?"
5. "¿Qué pasó con tu consumo de tinta blanca?"
6. "¿Qué le dirías a un colega que está pensando que todas las planchas son iguales?"

**El testimonio que más vende no dice "excelente servicio". Dice "pasé de parar 10 veces a parar 4".**

## 0.5 Tipos de sección disponibles (vocabulario para Claude Code)

`hero` · `barra-confianza` · `problema-agitacion` · `beneficios-grid` · `tecnologia-cards` · `comparativa-tabla` · `antes-despues` · `cifras-destacadas` · `proceso-pasos` · `segmentos` · `caso-exito` · `testimonios` · `objeciones` · `faq` · `cta-banda` · `formulario` · `cierre-doble-cta`

## 0.6 Reglas globales de estilo

- **Tono:** técnico y cercano. Se habla como jefe de producción a jefe de producción, no como folleto corporativo.
- **Nunca** decir "somos líderes", "calidad y servicio", "pasión por". Eso es lo que dice la competencia.
- **Siempre** que haya un número, decir de dónde sale.
- Cada sección debe cerrar avanzando hacia el contacto.
- CTA principal siempre WhatsApp; CTA secundario ancla al formulario.
- Un CTA visible cada 2 secciones como máximo de distancia.
- Efectos base para todo el sitio: fade-in + subida leve al hacer scroll, hover que eleva tarjetas, números que cuentan al entrar en pantalla, hero oscuro con acento de color de marca.

---

# PARTE 1 — PÁGINAS

---

## PÁGINA 1: Home v2

**ACCIÓN:** reemplazar la home actual
**URL:** `/`
**OBJETIVO:** que un impresor entienda en 5 segundos que aquí se resuelve su merma y sus paradas de máquina, y que se autoclasifique (banda angosta / banda ancha) para entrar a la landing correcta. Meta: contacto por WhatsApp o formulario.

**SEO**
- meta_title: `Preprensa flexográfica en Colombia | iFlexo Visión Gráfica`
- meta_description: `Planchas Kodak Flexcel NX procesadas con exposición LED SHINE, únicos en Colombia. Menos paradas, menos merma y color que se cumple. Entrega en 48 horas.`

**HERO**
- eyebrow: `Preprensa flexográfica · Bogotá y Medellín`
- título: `Otros venden la plancha. Nosotros entregamos **la impresión que sale de ella**.`
- subtítulo: `Planchas Kodak Flexcel NX procesadas con exposición LED SHINE — el único proceso de su tipo en Colombia. Menos paradas de máquina, menos merma y un color que se cumple en el tiraje.`
- bullets:
  - `Entrega en máximo 48 horas tras aprobación`
  - `Exposición LED SHINE: únicos en el país`
  - `Prueba de color con 95% de coincidencia`
  - `Sedes en Bogotá y Medellín`
- CTA principal: `Habla con un experto` → WhatsApp
- CTA secundario: `Envía tu trabajo y te lo diagnosticamos` → `#formulario`

**SECCIONES**

1. `problema-agitacion` — **"El costo real no está en la plancha"**
   Texto: *Nadie mide lo que cuesta un arranque largo. Pero ahí se va el dinero: el operario ajustando presión a ojo, la máquina parada para limpiar, el rollo de material que se fue a la basura antes de la primera hoja vendible, el trabajo que se repitió porque el color no dio. Una plancha barata que te obliga a parar diez veces por tiraje no es barata.*
   Cierre: *La plancha es el 100% de lo que la máquina reproduce. Es la variable más barata de cambiar y la que más impacto tiene.*

2. `cifras-destacadas` — 4 números que cuentan al entrar en pantalla:
   - `+50%` menos paradas de máquina por tiraje *(caso real de cliente)*
   - `30%` menos consumo de tinta blanca en banda ancha *(caso real, banda ancha)*
   - `95%` de coincidencia entre prueba de color e impreso
   - `48h` máximo de entrega tras aprobación

3. `segmentos` — **"¿Qué imprimes?"** Dos tarjetas grandes que dividen el tráfico:
   - **Banda angosta / etiquetas** → *Tirajes cortos, muchos SKU, cambios constantes. Aquí la velocidad de arranque lo es todo.* → `/soluciones/banda-angosta/`
   - **Banda ancha / empaque flexible** → *Metros de material por minuto. Aquí cada parada y cada gramo de tinta cuesta de verdad.* → `/soluciones/banda-ancha/`

4. `tecnologia-cards` — **"Ya hay quien vende Kodak en Colombia. La diferencia está en cómo se procesa."**
   Intro: *La plancha llega igual a todos. Lo que cambia el resultado es el proceso: cómo se graba, cómo se expone, con qué se revela y con qué curvas se calibra. Ahí es donde estamos solos.*
   4 tarjetas (tomar de la tabla 0.3): SQUARESPOT y punto plano · Advantage Patterns · Exposición LED SHINE *(destacada como exclusiva)* · Solvente específico y microtramado.
   Cada tarjeta: nombre → una línea técnica → **beneficio en negrita**.

5. `comparativa-tabla` — **"La misma marca, procesada distinto"**
   Comparar honestamente: *plancha convencional* / *Kodak procesada con exposición fluorescente* / *Kodak procesada por iFlexo con LED SHINE*. Filas: uniformidad entre planchas, estabilidad del microtramado, densidad de sólidos, repetibilidad en el tiempo, paradas de limpieza.
   > Importante: no atacar por nombre a Torreflex ni Grafiflex. Se compara con "otros procesos", nunca con marcas. Es más elegante y legalmente seguro.

6. `beneficios-grid` — 6 beneficios ya en clave de resultado (no de producto):
   Arranques más cortos · Menos paradas para limpiar · Color estable de principio a fin · Menos tinta para el mismo cubrimiento · Planchas iguales siempre · Alguien que te contesta y va a tu planta.

7. `caso-exito` — **"De parar 10 veces a parar menos de 5"**
   *Un cliente detenía la máquina unas 10 veces por tiraje entre correcciones de color y limpiezas. Con nuestras planchas bajó más del 50%. Otro, en banda ancha, redujo un 30% el consumo de tinta blanca por pedido — al año, millones de pesos que dejaron de irse por el desagüe.*
   Cierre honesto: *No prometemos los mismos números para todos. Prometemos medirlo contigo.*

8. `testimonios` — 3 tarjetas + el video de YouTube existente. Anónimos pero con cargo, tipo de empresa y ciudad. Incluir el de los operarios: *"Los operarios ya piden la plancha amarilla. Con las otras sufren."*

9. `beneficios-grid` (variante servicios) — **"No solo hacemos planchas"**
   Montaje y finalización de preprensa · Preparación de artes para flexografía · Gestión de color en tu planta · Capacitación a operarios · Asesoría de anilox · Reducción de color.
   → enlaza a `/servicios-graficos/`

10. `objeciones` — **"Lo que nos dicen antes de probarnos"** (acordeón). Ver guion completo en la Parte 2.

11. `faq` — 6 preguntas (alimenta FAQPage schema).

**CIERRE**
- CTA final: `Mándanos un trabajo de prueba` → WhatsApp
- Formulario al final: **sí**

**ESTILO**
- tono: técnico y directo, con seguridad de quien conoce la máquina.
- efectos: hero oscuro con acento de marca; contador animado en las cifras; hover que eleva tarjetas; fade-in progresivo; tabla comparativa con la columna de iFlexo resaltada.
- imágenes: plancha amarilla Kodak en detalle macro (alt: `Plancha flexográfica Kodak Flexcel NX procesada por iFlexo`) · impresión en máquina de banda ancha (alt: `Impresión flexográfica de empaque flexible en banda ancha`) · prueba de color junto al impreso final (alt: `Comparación entre prueba de color certificada e impreso final`) · equipo en planta (alt: `Equipo técnico de iFlexo en planta`).

---

## PÁGINA 2: Fotopolímeros v2

**ACCIÓN:** reemplazar `/fotopolimeros/`
**URL:** `/fotopolimeros/`
**OBJETIVO:** convertir al que ya busca planchas. Que entienda que *quién procesa* importa más que *qué marca compra*. Meta: solicitud de cotización o trabajo de prueba.

**SEO**
- meta_title: `Planchas Kodak Flexcel NX en Colombia | iFlexo`
- meta_description: `Fotopolímeros Kodak Flexcel NX con exposición LED SHINE, únicos en Colombia. Punto plano, microtramado estable y entrega en 48 horas.`

**HERO**
- eyebrow: `Fotopolímeros Kodak Flexcel NX`
- título: `La plancha la fabrica Kodak. **El resultado lo define quién la procesa.**`
- subtítulo: `Somos los únicos en Colombia con exposición LED SHINE de Miraclon. Por eso nuestras planchas Flexcel NX rinden distinto a las mismas planchas procesadas de otra forma.`
- bullets: `Punto plano real, grabado 1:1` · `Microtramado que no se tapa` · `Uniformidad plancha a plancha` · `48 horas tras aprobación`
- CTA principal: `Cotiza tus planchas` → WhatsApp
- CTA secundario: `Compara con tu plancha actual` → `#formulario`

**SECCIONES**

1. `problema-agitacion` — **"Todas las planchas imprimen. No todas imprimen igual el martes que el jueves."**
   El dolor: la plancha que salió bien el mes pasado y esta vez no; el operario que ajusta presión hasta que "queda"; el microtrama que se cerró; las altas luces que se perdieron.

2. `tecnologia-cards` — **"Las cinco cosas que hacemos distinto"** — desarrollar cada una en profundidad, con formato *qué es → qué problema resuelve → qué ganas*:
   - **Grabado SQUARESPOT del TIL:** láser de punto cuadrado, imagen 1:1. → *Sin desviación entre archivo y plancha.*
   - **Punto plano real:** → *Sólidos densos, altas luces desde 0.4%, tipografía fina limpia.*
   - **Advantage Patterns:** micropatrón de borde que retiene tinta y libera aire. → *Actúa como un anilox sobre la plancha: más densidad con la misma tinta.*
   - **Exposición LED SHINE — exclusivo en Colombia:** LED estable en lugar de tubos fluorescentes que se degradan con el uso. → *La plancha de hoy es idéntica a la de dentro de seis meses. Esta es la razón principal por la que la misma marca rinde distinto según quién la procese.*
   - **Solvente específico para NX:** → *El microtramado no se tapa. Estabilidad real en el tiraje.*

3. `antes-despues` — Comparación visual con lupa/macro: punto redondo vs punto plano; microtrama tapado vs abierto; sólido irregular vs sólido parejo. *(Necesito que confirmes qué imágenes reales tienes.)*

4. `comparativa-tabla` — **"Plancha convencional vs Flexcel NX vs Flexcel NX procesada por iFlexo"** (tres columnas, la tercera resaltada).

5. `segmentos` — bloque corto que deriva: *¿Banda angosta o banda ancha? El aprovechamiento de la tecnología cambia según tu proceso.* → dos enlaces.

6. `proceso-pasos` — **"Cómo trabajamos tu plancha"**: 1) Recibimos y revisamos el arte · 2) Finalización de preprensa y curvas para tu máquina · 3) Grabado y exposición LED · 4) Revelado con solvente específico · 5) Control de calidad medible · 6) Entrega en máximo 48 h.

7. `objeciones` — foco en las tres de plancha: *"todas las planchas son iguales"*, *"son muy costosas"*, *"el otro proveedor es más barato"*. Guion en la Parte 2.

8. `caso-exito` — el de las paradas de máquina + el testimonio de operarios pidiendo la plancha amarilla.

9. `faq` — espesores y formatos disponibles, sustratos, tiempos, si atienden fuera de Bogotá/Medellín, si se puede probar sin cambiar todo el volumen.

**CIERRE**
- CTA final: `Manda un trabajo de prueba y compara` → WhatsApp
- Formulario: **sí**

**ESTILO**
- tono: técnico, con detalle real. Aquí el lector sabe de flexografía: no simplificar de más.
- efectos: comparador antes/después con deslizador; zoom en macros; tabla con columna destacada.
- imágenes: macro del punto plano (alt: `Punto plano de plancha Kodak Flexcel NX vista macro`) · exposición LED SHINE en operación (alt: `Exposición LED SHINE de Miraclon en planta de iFlexo`) · planchas terminadas (alt: `Planchas flexográficas Kodak Flexcel NX listas para entrega`).

---

## PÁGINA 3: Banda angosta / Etiquetas (NUEVA)

**ACCIÓN:** crear nueva
**URL:** `/soluciones/banda-angosta/`
**OBJETIVO:** capturar al impresor de etiquetas (60% de tu volumen) hablándole de *su* dolor: muchos SKU, tirajes cortos, arranques constantes.

**SEO**
- meta_title: `Planchas para etiquetas y banda angosta | iFlexo`
- meta_description: `Preprensa para impresión de etiquetas en banda angosta: alta definición, arranques rápidos y color estable en tirajes cortos. Entrega en 48 horas.`

**HERO**
- eyebrow: `Banda angosta · Etiquetas y marquillas`
- título: `Tirajes cortos, muchos SKU y **cero tiempo para arranques largos**.`
- subtítulo: `En banda angosta el margen está en el arranque. Nuestras planchas llegan calibradas para tu máquina para que llegues al color aprobado en menos intentos.`
- bullets: `Alta definición para tipografía fina y códigos` · `Degradados que no cortan` · `Cambios de trabajo más ágiles` · `48 horas tras aprobación`
- CTA principal: `Habla con un experto en banda angosta` → WhatsApp

**SECCIONES**
1. `problema-agitacion` — *En banda angosta no imprimes un trabajo: imprimes doce en una semana. Cada arranque es material perdido, y si necesitas tres intentos para llegar al color, el trabajo ya no dejó utilidad. El problema no es tu operario. Es que la plancha no llegó lista para tu proceso.*
2. `tecnologia-cards` — enfocado a etiqueta: detalle desde 0.4% para tipografía legal diminuta y códigos · punto plano para sólidos de marca · tramas específicas para banda angosta *(confirmar nombre comercial)* · uniformidad LED para que el mismo SKU se vea igual en la reposición de dentro de tres meses.
3. `beneficios-grid` — 6 en clave etiqueta: menos intentos por arranque · repetibilidad entre reposiciones · texto legal legible · degradados limpios a cero · sólidos de marca parejos · entrega ágil para reposiciones urgentes.
4. `caso-exito` + `testimonios` de clientes de etiquetas.
5. `proceso-pasos` — cómo se arranca a trabajar con iFlexo.
6. `faq` — específicas de banda angosta (espesores, sustratos autoadhesivos, UV, mangas).

**CIERRE**
- CTA final: `Manda una etiqueta de prueba` → WhatsApp | Formulario: **sí**

**ESTILO** — tono práctico y ágil. Imágenes de etiquetas y marquillas impresas, macro de texto fino legible.

---

## PÁGINA 4: Banda ancha / Empaque flexible (NUEVA)

**ACCIÓN:** crear nueva
**URL:** `/soluciones/banda-ancha/`
**OBJETIVO:** capturar el segmento más rentable (más cm² por trabajo). Ángulo: dinero grande — tinta, paradas y merma a escala.

**SEO**
- meta_title: `Planchas para empaque flexible y banda ancha | iFlexo`
- meta_description: `Preprensa para banda ancha: menos paradas de limpieza, hasta 30% menos tinta blanca y color estable en todo el tiraje. Kodak Flexcel NX con LED SHINE.`

**HERO**
- eyebrow: `Banda ancha · Empaque flexible`
- título: `A esta velocidad, **una parada cuesta más que la plancha entera**.`
- subtítulo: `Planchas Kodak Flexcel NX con control de flujo de tinta y exposición LED SHINE. Menos paradas para limpiar, menos tinta y color que se sostiene durante todo el tiraje.`
- bullets: `Más de 50% menos paradas por tiraje` · `Hasta 30% menos tinta blanca` · `Cubrimiento parejo en blancos` · `Color estable de principio a fin`
- CTA principal: `Habla con un experto en banda ancha` → WhatsApp

**SECCIONES**
1. `problema-agitacion` — la matemática de la máquina parada: metros por minuto, material perdido en cada arranque, la limpieza a mitad de tiraje que nadie tenía presupuestada, la tinta blanca que se lleva el costo del pedido.
2. `cifras-destacadas` — `+50%` menos paradas · `30%` menos tinta blanca · `95%` coincidencia de color · `48h` entrega.
3. `tecnologia-cards` — aquí es donde brilla **PureFlexo Printing**: control del flujo de tinta que frena la propagación no deseada → menos paradas por impresión sucia, ventana de operación más amplia, color más predecible, mejor coincidencia prueba–impreso, menos dependencia del operario de turno. Sumar Advantage Patterns (cubrimiento en blancos) y LED SHINE (uniformidad).
4. `caso-exito` — **el del 30% de tinta blanca, desarrollado**: *Un impresor de banda ancha redujo un 30% el consumo de tinta blanca por pedido. Proyectado al año, el ahorro se cuenta en millones de pesos — y no vino de negociar mejor la tinta, sino de necesitar menos.* Esta es la historia más vendedora que tienes: úsala completa.
5. `comparativa-tabla` — costo por plancha vs **costo por millar**. Mostrar la aritmética: +15% en la plancha frente a merma, tinta, paradas y reprocesos.
6. `objeciones` — con foco económico.
7. `testimonios` + `faq`.

**CIERRE**
- CTA final: `Calculemos tu costo por millar` → WhatsApp | Formulario: **sí**

**ESTILO** — tono de negocio: aquí habla el gerente, no solo el técnico. Cifras grandes, comparativas claras. Imágenes de máquina de banda ancha en operación y bobinas de empaque flexible.

---

## PÁGINA 5: Prueba de color v2

**ACCIÓN:** reemplazar `/prueba-de-color/`
**URL:** `/prueba-de-color/`
**OBJETIVO:** vender la prueba como *seguro contra reprocesos* y como herramienta de aprobación frente a la marca.

**SEO**
- meta_title: `Prueba de color certificada para flexografía | iFlexo`
- meta_description: `Prueba de color con hasta 95% de coincidencia con el impreso final. Aprobaciones más rápidas, menos reprocesos y menos discusiones con tu cliente.`

**HERO**
- eyebrow: `Prueba de color certificada`
- título: `Que tu cliente apruebe una vez. **Y que en máquina salga eso mismo.**`
- subtítulo: `Hasta 95% de coincidencia entre la prueba y el impreso final. La frase que más escuchamos cuando comparan: "quedó igual a la prueba, es increíble".`
- CTA principal: `Solicita una prueba de color` → WhatsApp

**SECCIONES**
1. `problema-agitacion` — *La aprobación es donde se pierde el tiempo que nadie factura. El cliente aprueba una pantalla, la máquina entrega otra cosa, y empieza la discusión: ¿es la tinta, el sustrato, el operario? Se repite el arranque, a veces el trabajo entero. Y el que pierde credibilidad eres tú.*
2. `cifras-destacadas` — `95%` de coincidencia · `60%` del rechazo del consumidor en góndola se explica por el color *(dato de industria)* · `48h`.
3. `proceso-pasos` — **"Cómo logramos el 95%"** — aquí va el método: perfilado de tu proceso real (anilox, tintas, sustrato), curvas específicas, prueba en equipo calibrado, verificación. Honestidad: explicar bajo qué condiciones se logra ese 95% y que se mide contra el impreso real, no contra un ideal.
4. `beneficios-grid` — aprobaciones más rápidas · menos reprocesos · una referencia objetiva para discutir con la marca · menos merma de arranque · confianza del cliente final.
5. `testimonios` — el de percepción visual es el más potente aquí.
6. `faq` — qué sustratos, cuánto demora, si sirve como prueba de contrato, si se puede pedir sin comprar planchas.

**CIERRE** — CTA: `Pide tu prueba de color` → WhatsApp | Formulario: **sí**

**ESTILO** — tono tranquilizador y demostrativo. La imagen estrella: prueba y impreso lado a lado bajo cabina de luz (alt: `Prueba de color certificada comparada con impreso final bajo cabina de luz D50`).

---

## PÁGINA 6: Reducción de color v2

**ACCIÓN:** reemplazar `/reduccion-de-color/`
**URL:** `/reduccion-de-color/`
**OBJETIVO:** el único servicio que *baja* el costo del cliente. Ángulo puro de ahorro.

**SEO**
- meta_title: `Reducción de color en flexografía | Menos tintas, mismo resultado`
- meta_description: `Reducimos el número de tintas de tu trabajo manteniendo el resultado visual. Menos estaciones, menos arranque y menor costo por millar.`

**HERO**
- eyebrow: `Reducción de color`
- título: `Menos tintas. El mismo resultado visual. **Menor costo por millar.**`
- subtítulo: `Analizamos tu trabajo y encontramos cuántas tintas realmente necesitas. Menos estaciones significa menos arranque, menos limpieza y menos inventario de tintas especiales.`
- CTA principal: `Analiza mi trabajo` → WhatsApp

**SECCIONES**
1. `problema-agitacion` — el costo escondido de cada tinta adicional: una estación más, un arranque más largo, una limpieza más, un inventario de tinta especial que se seca en la bodega.
2. `proceso-pasos` — cómo se hace el análisis, qué se necesita del cliente, qué se entrega.
3. `antes-despues` — trabajo a 7 tintas vs el mismo a 4-5, con el resultado visual equivalente. *(Necesito material real tuyo.)*
4. `cifras-destacadas` — ahorro estimado por estación eliminada, reducción de tiempo de arranque, ahorro de tinta.
5. `beneficios-grid` + `faq` + `testimonios`.

**CIERRE** — CTA: `Mándanos un trabajo y te decimos cuántas tintas sobran` → WhatsApp | Formulario: **sí**

**ESTILO** — tono de consultor financiero técnico. Visuales de separaciones de color y comparativas.

---

## PÁGINA 7: Servicios gráficos (NUEVA)

**ACCIÓN:** crear nueva
**URL:** `/servicios-graficos/`
**OBJETIVO:** mostrar todo lo que hace iFlexo más allá de la plancha. Es el argumento de "vamos más allá" y captura búsquedas de diseñadores y agencias.

**SEO**
- meta_title: `Servicios gráficos y preprensa para flexografía | iFlexo`
- meta_description: `Preparación de artes, finalización de preprensa, montajes, gestión de color en planta, asesoría de anilox y capacitación para impresores flexográficos.`

**HERO**
- eyebrow: `Servicios gráficos y acompañamiento técnico`
- título: `El trabajo que te ahorramos **antes de que la plancha llegue a tu máquina**.`
- subtítulo: `Preparación de artes, finalización de preprensa, montajes, gestión de color en tu planta, asesoría de anilox y capacitación de operarios. No entregamos un insumo: entramos en tu proceso.`
- CTA principal: `Cuéntanos qué necesitas` → WhatsApp

**SECCIONES**
1. `beneficios-grid` (6 servicios, uno por tarjeta, cada uno con el problema que resuelve):
   - **Preparación de artes para flexografía** — *El arte que llega de la agencia casi nunca está listo para flexo. Lo dejamos listo.*
   - **Finalización de preprensa y montajes** — *Distorsión, repeticiones, sangrados, marcas de registro. Bien hecho desde el archivo.*
   - **Gestión de color en tu planta** — *Vamos a tu máquina, medimos y calibramos con tus tintas y tus sustratos.*
   - **Asesoría de anilox** — *El anilox equivocado arruina la mejor plancha. Te ayudamos a elegir.*
   - **Capacitación a operarios** — *Cuidado de planchas, montaje, productividad y eficiencia en impresión.*
   - **Propuestas gráficas** — *Cuando el cliente llega con una idea y no con un archivo.*
2. `problema-agitacion` — *La mayoría de los problemas de impresión no nacen en la máquina: nacen en un archivo mal preparado, un anilox mal elegido o un montaje con la distorsión equivocada. Ahí es donde te acompañamos.*
3. `proceso-pasos` — cómo es trabajar con el equipo técnico.
4. `testimonios` — el de acompañamiento técnico.
5. `faq`.

**CIERRE** — CTA: `Agenda una visita técnica` → WhatsApp | Formulario: **sí**

**ESTILO** — tono de aliado técnico. Imágenes de personas: equipo en planta del cliente, capacitación, medición.

---

## PÁGINA 8: Nosotros v2

**ACCIÓN:** reemplazar `/nosotros/`
**URL:** `/nosotros/`
**OBJETIVO:** no informar — **generar confianza para cerrar**. Es la página que visita quien ya está considerando cambiar de proveedor.

**SEO**
- meta_title: `Sobre iFlexo | Preprensa flexográfica en Bogotá y Medellín`
- meta_description: `Somos el proveedor de preprensa que llevó Kodak Flexcel NX a Colombia. Proceso auditado, exposición LED SHINE y equipo técnico en Bogotá y Medellín.`

**HERO**
- eyebrow: `Sobre nosotros`
- título: `Trajimos Flexcel NX a Colombia. **Y no nos quedamos ahí.**`
- subtítulo: `Fuimos el primer proveedor de preprensa del país en trabajar con Kodak Flexcel NX. Hoy somos los únicos con exposición LED SHINE de Miraclon, porque la tecnología sin proceso no sirve de nada.`

**SECCIONES**
1. `cifras-destacadas` — años de operación · 2 sedes · 36 personas *(ajusta si prefieres no publicarlo)* · trabajos entregados al mes.
2. Texto narrativo — **"Por qué invertimos en un proceso que nadie más tiene"**: la historia real de por qué el procesamiento importa más que la marca de la plancha. Esta es tu historia y es diferenciadora: cuéntala en primera persona del equipo.
3. `tecnologia-cards` — el equipamiento y el proceso, en versión "planta": CTP, exposición LED, revelado, control de calidad medible.
4. `proceso-pasos` — el control de calidad: qué se mide en cada plancha y qué certificado acompaña la entrega.
5. Sedes — Bogotá y Medellín con mapa y contacto directo de cada una.
6. `testimonios`.

**CIERRE** — CTA: `Visítanos o agenda una llamada` → WhatsApp | Formulario: **sí**

**ESTILO** — humano y sobrio, con foco en el equipo. Muchas fotos reales de personas y planta: es lo que genera confianza en industria. Evitar stock.

---

## PÁGINA 9: Contacto v2

**ACCIÓN:** reemplazar `/contacto/`
**URL:** `/contacto/`
**OBJETIVO:** bajar la fricción al máximo y dejar claro qué pasa después de escribir.

**SEO**
- meta_title: `Contacto y cotizaciones | iFlexo Bogotá y Medellín`
- meta_description: `Cotiza tus planchas flexográficas o pide una prueba de color. Respuesta rápida y entrega en máximo 48 horas tras aprobación. Bogotá y Medellín.`

**HERO**
- eyebrow: `Hablemos`
- título: `Cuéntanos qué vas a imprimir y **te decimos exactamente cómo lo resolvemos**.`
- subtítulo: `Sin compromiso. Si prefieres, mándanos directamente un trabajo y lo comparamos con lo que estás usando hoy.`

**SECCIONES**
1. `proceso-pasos` — **"Qué pasa cuando nos escribes"**: 1) Te responde una persona del equipo técnico, no un bot · 2) Revisamos tu trabajo y tu proceso · 3) Te damos cotización y tiempo · 4) Entregamos en máximo 48 h tras aprobación. *Esto reduce la ansiedad de escribir y sube la conversión.*
2. `formulario` — ampliado: nombre, empresa, correo, teléfono, **ciudad**, **tipo de impresión (banda angosta / banda ancha / otro)**, **qué necesitas (planchas / prueba de color / reducción de color / asesoría)**, mensaje, y opción de adjuntar archivo si es viable.
3. Sedes con WhatsApp directo de cada una.
4. `faq` corta — horarios, cobertura nacional, cómo enviar archivos pesados, si atienden fuera de Colombia.

**CIERRE** — `cta-banda` con los dos WhatsApp.

**ESTILO** — limpio y rápido, formulario visible sin scroll en escritorio.

---

# PARTE 2 — GUION DE OBJECIONES

Este bloque se reutiliza (adaptado) en varias páginas. Formato acordeón: la objeción en las palabras del cliente, y debajo la respuesta.

**"Todas las planchas son iguales, las baratas también me imprimen bonito."**
Es cierto que casi cualquier plancha imprime. La diferencia no está en si imprime, sino en cuánto te cuesta llegar a que imprima bien: cuántos ajustes, cuántas paradas, cuánto material antes de la primera hoja vendible. Un cliente pasó de detener la máquina unas 10 veces por tiraje a menos de la mitad. La plancha se ve igual en el estante; se comporta distinto en la máquina.

**"Son muy costosas."**
Nuestra plancha puede costar alrededor de un 15% más por centímetro cuadrado. Ahora mira la otra columna: menos merma de arranque, menos tinta —un cliente de banda ancha bajó 30% el consumo de blanco—, menos paradas para limpiar y menos trabajos repetidos. El costo que importa no es por centímetro cuadrado: es por millar impreso. Con gusto lo calculamos con tus números reales.

**"El otro proveedor es mucho más barato."**
Probablemente sí. La pregunta que vale es qué estás pagando además del precio de la plancha: horas de máquina, material desperdiciado y reprocesos. Si al hacer esa cuenta el otro proveedor sigue saliendo mejor, te lo diremos de frente.

**"No tengo tiempo de hacer pruebas."**
Por eso no te pedimos que cambies tu operación. Te pedimos un trabajo. Uno solo, el que más te duela hoy. Lo procesamos y lo comparas contra tu plancha actual en tu propia máquina. Si no ves diferencia, no hay conversación.

**"Mi proveedor lleva muchos años con nosotros."**
Y eso vale mucho: no venimos a decirte que lo dejes. Muchos de nuestros clientes empezaron con un solo trabajo mientras seguían con su proveedor. La relación se cambia sola o no se cambia, según los resultados.

---

# PARTE 3 — LO QUE FALTA PARA TERMINAR

1. **Confirmar la certificación Miraclon** (ver 0.2) — bloqueante para publicar el sello.
2. **Nombre correcto de las tramas de banda angosta** que mencionaste como "UV Choice".
3. **Material visual real:** macros de punto plano, comparativas antes/después, fotos de planta y del equipo, fotos de la exposición LED SHINE.
4. **Testimonios con datos** — usa el guion de 0.4.
5. **Un caso desarrollado con números** (el del 30% de tinta blanca es el mejor candidato). Si consigues autorización del cliente aunque sea anonimizada, esa página vende sola.
6. **Definir si publicas el número de empleados y años de operación** en Nosotros.
