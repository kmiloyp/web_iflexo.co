# iFlexo — Auditoría SEO (estado)

> Resultado de la auditoría del §3 de `docs/seo.md`, cruzada con lo ya
> ejecutado. Actualizado: julio 2026. Verificado contra producción (iflexo.co).

## Inventario title / H1 (verificado en producción)

| URL | Title | H1 |
|---|---|---|
| `/` | Preprensa flexográfica en Colombia \| iFlexo Visión Gráfica | Otros venden la plancha. Nosotros entregamos la impresión |
| `/flexografia/` | Flexografía: qué es, cómo funciona y para qué sirve | Flexografía: la guía completa |
| `/planchas/` | Cireles y planchas flexográficas: qué son y qué tipos hay | Cireles y planchas flexográficas |
| `/anilox/` | Rodillo anilox: qué es, tipos y cómo elegirlo | El rodillo anilox en flexografía |
| `/tintas/` | Tintas flexográficas: tipos, propiedades y cómo elegirlas | Las tintas en la impresión flexográfica |
| `/color/` | Gestión de color en flexografía: guía completa | Gestión de color en flexografía |
| `/fotopolimeros/` | Planchas Kodak Flexcel NX en Colombia \| iFlexo | La plancha la fabrica Kodak. El resultado lo define… |
| `/prueba-de-color/` | Prueba de color Sherpa para flexografía \| 95% de fidelidad | Prueba de color para flexografía que sí se cumple en máquina |
| `/reduccion-de-color/` | Reducción de color en flexografía \| Menos tintas, mismo resultado | Menos tintas. El mismo resultado visual. Menor costo |
| `/nosotros/` | Sobre iFlexo \| Preprensa flexográfica en Bogotá y Medellín | Trajimos Flexcel NX a Colombia. Y no nos quedamos ahí |
| `/anilox/importancia/` | Por qué el anilox define la calidad de tu impresión | Por qué el anilox define la calidad de tu impresión |
| `/anilox/bcm/` | Tabla BCM de anilox: conversión y cómo elegir el volumen | BCM y volumen del anilox |
| `/planchas/evolucion-aplicaciones-y-futuro/` | Cireles: qué son, tipos y cómo se usan en flexografía | ¿Qué son los cireles? |
| `/flexografia/tipos-materiales/` | Materiales y productos para flexografía: guía completa | Guía de Materiales Esenciales para la Flexografía |
| `/tintas/composicion/` | Tintas flexográficas: composición, tipos y cómo elegirlas | Composición de Tintas Flexo |
| `/en/anilox/bcm/` | Anilox BCM chart: volume ranges and how to choose | Anilox BCM and ink transfer volume |
| `/en/plates/distortion/` | Flexo plate distortion: 3 ways to calculate elongation | Plate distortion in flexography: how to calculate it |

## Canibalización (§3.2) — sin conflictos

- Ningún title/H1/H2 usa un término marcado ⛔ para su URL (verificado en los 5 pilares).
- Sin titles duplicados. La colisión `/anilox/` ↔ `/anilox/importancia/` (F5) se resolvió.
- Los pilares no atacan las keywords de sus artículos hijos (bcm, distorsión, flexcel, composición, prueba de color, reducción).

## Renderizado sin JS (§3.3) — corregido

- Contadores: renderizaban `0`; ahora el HTML servido trae el valor final. ✅
- Celdas de tabla con solo icono: ahora llevan texto sr-only "Sí/No". ✅

## Contenido perdido en la migración (§3.4)

- `/anilox/bcm/`: la tabla FTA se perdió; **repuesta** con valores de referencia FTA/Harper. ✅
- Barrido de todos los artículos: no hay más tablas/gráficos perdidos.

## Enlazado interno (§3.5)

- Cada artículo enlaza a su pilar con el bloque "Guía completa". ✅
- Los pilares enlazan a su landing comercial con anchor descriptivo. ✅

## Técnico (§3.6) — todo verde

- robots.txt permite todos los bots (no bloquea GPTBot/ClaudeBot/Perplexity/Google-Extended). ✅
- llms.txt existe en la raíz. ✅
- sitemap.xml incluye todas las rutas + las 2 en inglés con hreflang. ✅
- Trailing slash consistente (un solo 308). ✅
- JSON-LD: Organization (global), Article, FAQPage, BreadcrumbList, Service en landings. ✅
  - Pendiente: `sameAs` en Organization (requiere las URLs de redes de iFlexo).

## Estado de los arreglos F1–F6

| # | Estado |
|---|---|
| F1 · H2/FAQ "¿Qué es una prueba Sherpa?" | ✅ hecho (FAQ, 57 palabras, alimenta FAQPage) |
| F2 · Tabla BCM faltante | ✅ repuesta (HTML responsive) |
| F3 · Contadores en cero | ✅ corregido en todas las páginas |
| F4 · Celdas vacías + densidad Alta/Alta | ✅ corregido |
| F5 · Colisión title anilox | ✅ artículo → "Por qué el anilox define la calidad de tu impresión" |
| F6 · Indexación en Search Console | ⏳ tarea de Camilo (reenviar sitemap, pedir indexación) |

## Pendiente que requiere a Camilo

- **`sameAs` en Organization** (§8): URLs de LinkedIn, Google Business Profile, Instagram, etc. de iFlexo, para consistencia de entidad en IA.
- **Confirmar la definición de "prueba Sherpa"** que se publicó (se tomó de `docs/paginas.md`: prueba de contrato).
- **Search Console**: reenviar sitemap y pedir indexación de las páginas clave.
