<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# iFlexo Visión Gráfica — Web (Next.js + Supabase)

Nueva web de iFlexo Visión Gráfica (preprensa flexográfica, Colombia). Reemplaza el
WordPress anterior conservando **1:1 las URLs** que ya rankean. Landings de venta con
copywriting + blog con generador de artículos por IA. CTA principal a WhatsApp.

## Stack
- **Next.js 16** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS v4** (CSS-first, tokens en `src/app/globals.css`)
- **Supabase** (Postgres + Auth + RLS) — artículos, leads, generaciones
- **Anthropic (Claude)** — generador de artículos (solo servidor)
- **Resend** — correo del formulario de contacto (solo servidor)
- **Vercel** para el despliegue (preview hasta aprobación; **no tocar DNS ni el WP actual**)

## Comandos
```bash
npm run dev      # desarrollo (http://localhost:3000)
npm run build    # build de producción
npm run start    # servir el build
npm run lint     # eslint
```

## Variables de entorno
Ver `.env.example`. Copiar a `.env.local`. **Nada hardcodeado.**
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server)
- `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- `NEXT_PUBLIC_WA_BOGOTA`, `NEXT_PUBLIC_WA_MEDELLIN` (override; hay default en config)

El sitio funciona **sin credenciales** (modo degradado): el blog usa contenido *seed*,
el generador usa un *stub*, y el formulario valida pero avisa que no persiste.

## Estructura
```
src/
  app/
    layout.tsx                 # fonts (Sora+Inter), metadata global, chrome condicional
    globals.css                # tokens de marca (Tailwind v4 @theme)
    page.tsx                   # Home (landing principal)
    nosotros/ contacto/        # páginas públicas
    fotopolimeros/ prueba-de-color/ reduccion-de-color/   # landings de venta
    privacy-policy/ aviso-legal/ politica-de-cookies/     # legales (borrador)
    [categoria]/page.tsx       # índice de categoría / blog
    [categoria]/[slug]/page.tsx# artículo del blog
    admin/                     # panel (login + artículos + generador + editor)
    api/generate-article/      # route handler del generador (server, Anthropic)
    actions/contact.ts         # Server Action del formulario (Supabase + Resend)
    sitemap.ts robots.ts       # SEO dinámico
  components/                  # UI, landing/, admin/, chrome
  lib/
    config.ts                  # navegación, sedes, WhatsApp, categorías
    seo.ts                     # metadata + JSON-LD (Organization/Article/FAQ/Breadcrumb)
    articles.ts                # acceso a artículos (Supabase o seed) + SEED de 17 posts
    landings.ts                # copy de las landings + testimonios (EJEMPLO)
    anthropic.ts               # generador de artículos (4 pasos, tool use)
    supabase/                  # client (browser), server, admin (service role), middleware
    auth.ts utils.ts
supabase/migrations/0001_init.sql   # esquema + RLS + seed de categorías
public/brand/                  # logo-color, logo-white, spectrum (favicon bola)
```

## Rutas conservadas (1:1, con trailing slash)
`trailingSlash: true`. Páginas: `/`, `/nosotros/`, `/fotopolimeros/`, `/prueba-de-color/`,
`/reduccion-de-color/`, `/contacto/` (nueva), `/privacy-policy/`, `/aviso-legal/`,
`/politica-de-cookies/`. Categorías: `/flexografia/`, `/planchas/`, `/anilox/`, `/tintas/`.
17 artículos bajo `/[categoria]/[slug]/`. Cualquier cambio de URL → 301 en `next.config.ts`.

> Nota: la política de privacidad real es `/privacy-policy/` (no `/politica-de-privacidad/`).

## Identidad de marca (derivada del logo real)
- Wordmark carbón `#26262b`; **degradado firma** ámbar `#fbb215` → naranja `#f57c1f` →
  coral `#ee3f6d` → magenta `#c21a76`.
- Acento **espectro** (favicon "bola" = rueda de color / gestión de color): azul, teal,
  verde, púrpura. Usar como motivo decorativo puntual.
- Tipografías: **Sora** (títulos) + **Inter** (cuerpo), self-hosted vía `next/font`.
- Utilidades: `.bg-brand-gradient`, `.text-gradient`, `.bg-spectrum`, `.prose-iflexo`.

## Generador de artículos (`/admin/articulos/nuevo`)
Entradas: keyword, 3 URLs top de Google, experiencia personal. Pasos (server, `lib/anthropic.ts`):
1) extrae encabezados de las 3 URLs (solo estructura, **no copiar texto**),
2) keyword research, 3) memoriza la experiencia **literal**, 4) redacta.
Reglas clave (en el system prompt): 1ª persona, extenso; la experiencia va **literal y
diseminada**, **nunca** en sección/encabezado propio; JSON estructurado vía *tool use*.
Salida → editor con todos los campos SEO → autoguardado → **publicar con confirmación**.

## Convenciones
- Llamadas a Anthropic / Supabase service role: **solo servidor** (nunca en cliente).
- Formularios de cliente: **Server Action / Route Handler**, no `<form>` nativo suelto.
- Metadata por página con `generateMetadata` + `buildMetadata()`; JSON-LD con `<JsonLd>`.
- Imágenes con `next/image`. Alt en todas.
- UI en español, responsive.

## Roadmap (fases siguientes — NO en esta fase)
- **Chatbot** flotante con IA: hueco reservado en `ChatbotSlot` (layout). No implementado.
- Migración del contenido real de los 17 posts al `articles` de Supabase.
- Reemplazar testimonios de ejemplo (`lib/landings.ts`) por los reales de Google/YouTube.
- Revisión legal de los textos de privacidad/cookies/aviso.
