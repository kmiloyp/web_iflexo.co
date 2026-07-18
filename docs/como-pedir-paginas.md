# Cómo pedir una página o cambio (brief para Claude)

Copia esta plantilla, rellénala (o pídele a otro chat que la rellene) y pégamela.
Cuanto más completa, más fiel queda. Lo que no sepas, déjalo en blanco y yo propongo.

## Plantilla

```
PÁGINA: [nombre, ej. "Landing Fotopolímeros v2" o "Nueva: Servicios"]
ACCIÓN: [crear nueva / reemplazar una existente / editar secciones]
URL (ruta): [ej. /servicios/  — con barra final. Si reemplaza otra, dímelo → pongo 301]
OBJETIVO: [qué debe lograr: vender X, captar lead, informar…]

SEO:
  meta_title: [≤60 caracteres]
  meta_description: [≤155 caracteres]

HERO (encabezado):
  eyebrow: [texto pequeño arriba, ej. "Planchas Kodak Flexcel NX"]
  título: [titular; marca entre **asteriscos** la parte que quieres en degradado]
  subtítulo: [1-2 frases]
  bullets: [3-4 puntos cortos, opcional]
  CTA principal: [texto botón → destino: WhatsApp / ruta / #ancla]
  CTA secundario: [opcional]

SECCIONES (en orden; elige de los tipos de abajo):
  1) [tipo] — [contenido]
  2) [tipo] — [contenido]
  ...

CIERRE:
  CTA final: [texto → destino]
  ¿Formulario de contacto al final? [sí / no]

ESTILO:
  tono: [ej. técnico y cercano]
  efectos deseados: [ej. fade-in al hacer scroll, hover que eleva las tarjetas, hero oscuro con brillo espectro]
  imágenes: [cuáles/URLs + texto alt de cada una]
```

## Tipos de sección disponibles (vocabulario)

- **problema→solución**: dos columnas (dolor vs. cómo lo resolvemos)
- **beneficios**: grid de tarjetas con ícono + título + texto
- **diferenciador (stat)**: un dato grande (ej. "95%") + explicación
- **testimonios**: tarjetas con estrellas, cita, nombre, fuente
- **FAQ**: acordeón (además genera el schema FAQPage para SEO)
- **proceso/pasos**: lista numerada de pasos
- **texto+imagen**: bloque a dos columnas
- **galería**: cuadrícula de imágenes
- **tabla comparativa**: filas/columnas
- **CTA final**: banner grande con botón(es)

## Botones (estilos)
- `degradado` (el de marca, para el CTA principal)
- `outline` (borde, secundario)
- `ink` (carbón sólido)
- Destinos válidos: `WhatsApp Bogotá`, `WhatsApp Medellín`, una ruta interna (`/contacto/`), o un ancla (`#faq`)

## Efectos/transiciones que puedo aplicar
- Aparición al hacer scroll (fade/slide-in)
- Hover que eleva o resalta tarjetas
- Hero oscuro con “brillo espectro” (rueda de color)
- Acordeones, sticky nav, contadores animados, degradado en texto

## Ejemplo mínimo (para que veas el formato)

```
PÁGINA: Nueva: Servicios
ACCIÓN: crear nueva
URL: /servicios/
OBJETIVO: mostrar los 3 servicios y llevar a cotizar
SEO:
  meta_title: Servicios de preprensa flexográfica | iFlexo
  meta_description: Fotopolímeros Kodak Flexcel NX, prueba de color y reducción de color. Cotiza por WhatsApp.
HERO:
  eyebrow: Nuestros servicios
  título: Preprensa que se nota en la **máquina**
  subtítulo: Todo lo que necesitas antes de imprimir, en un solo lugar.
  CTA principal: Cotizar → WhatsApp Bogotá
SECCIONES:
  1) beneficios — los 3 servicios como tarjetas que enlazan a cada landing
  2) diferenciador (stat) — 95% coincidencia de color
  3) testimonios — 3 reales
  4) FAQ — 4 preguntas
CIERRE:
  CTA final: Hablemos de tu proyecto → WhatsApp
  formulario: sí
ESTILO:
  tono: técnico y cercano
  efectos: fade-in al scroll, hover en tarjetas
```
```
