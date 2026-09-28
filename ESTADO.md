# Estado del proyecto

Última actualización: **28 de septiembre de 2026**

Resumen de dónde va la web para retomar el trabajo desde cualquier equipo o
sesión. Convenciones de código y arquitectura: `AGENTS.md`. Mapa de keywords
por URL (regla anticanibalización): `docs/seo.md`. Auditoría SEO:
`docs/auditoria.md`.

---

## 1. El sitio está EN VIVO

`https://iflexo.co` corre sobre Vercel desde el 19 de julio de 2026 (reemplazó
al WordPress de Hostinger conservando las URLs 1:1). Vercel despliega desde
`main` directo. Cualquier cambio de ruta necesita su 301 en `next.config.ts`.

| Host | Qué hace |
|---|---|
| `iflexo.co` | Production |
| `www.iflexo.co` | 308 al apex, conservando la ruta |
| `i-flexo.com` | 301 a `iflexo.co` (dominio antiguo, DNS en Hostinger) |

DNS de `iflexo.co` en **Cloudflare**: CNAME `@` y `www` →
`cab5880236be6cd0.vercel-dns-017.com`, **sin proxy** (nube gris).

Rollback al WordPress (si aún existe en Hostinger), en Cloudflare:
`A @ 77.37.76.111` · `A @ 148.135.128.122` ·
`AAAA @ 2a02:4780:4f:969b:5d9f:d02:52e0:f99f` ·
`AAAA @ 2a02:4780:51:f17a:2697:abb0:4392:7df8` ·
`CNAME www → www.iflexo.co.cdn.hstgr.net`.

---

## 2. Contenido y SEO

### Pilares de categoría (completos, en producción)
`/flexografia/`, `/planchas/`, `/anilox/`, `/tintas/` y `/color/` (categoría
nueva). Componente reutilizable `src/components/pilar/PaginaPilar.tsx`; cada
pilar es un archivo de datos en `src/lib/pilares/*.tsx`. Todos llevan la
experiencia real de Camilo (bloques "Desde nuestra experiencia"), autor
Person enlazado a `/autores/camilo-yepes/` y JSON-LD Article + FAQPage +
BreadcrumbList. Cada pilar enlaza a sus artículos profundos y cada artículo
enlaza a su pilar ("Guía completa").

### Artículos nuevos del calendario (publicados)
`flexografia/`: costos · etiquetas · empaques-y-bolsas · reducir-merma ·
curso-de-preprensa (embudo al curso FlexoFast en `curso.toiflexolabs.com`).
`planchas/`: una-sola-plancha · defectos-comunes.
`anilox/`: como-elegir · limpieza.
`tintas/`: viscosidad · blanco-de-cobertura.
`color/`: ganancia-de-punto · delta-e · curvas-de-compensacion · gamut-extendido.

`/tintas/tipos/` se descartó: canibalizaba al pilar; su contenido se integró en
`/tintas/`.

**Flujo para escribir artículos:** Claude propone keyword + secundarias (de
`docs/seo.md` §5), Camilo trae las 3 URLs top de Google + su experiencia, y
Claude escribe. La experiencia va literal (solo corregida de ortografía). No
se inventan cifras.

### Sección en inglés
`/en/anilox/bcm/` y `/en/plates/distortion/`, con hreflang bidireccional.
Contenido en `src/lib/en-articles.ts`.

### Otros
- `/anilox/bcm/`: la tabla FTA se perdió al migrar; se repuso con valores de
  referencia FTA/Harper.
- Política de privacidad: ahora `/politica-de-privacidad/` (301 desde
  `/privacy-policy/`). Las 3 legales llevan `noindex`.
- `sameAs` en Organization con las redes de iFlexo (`socialProfiles` en
  `src/lib/config.ts`).
- Favicon: la marca "xo" del logo (antes era la bola espectro).
- Video del proceso "De la idea al empaque" (`public/video/`,
  componente `ProcesoVideo`) en home, nosotros, fotopolímeros y servicios
  gráficos, con schema VideoObject.

---

## 3. Google Ads y analítica

- **Google tag** (`src/components/GoogleTag.tsx`, `src/lib/ads.ts`) cargado
  en todo el sitio: GA4 `G-P6FDVCMZ6V` (se había perdido en la migración y se
  restauró) + Google Ads `AW-878148865`. CSP de `next.config.ts` ya permite
  los dominios de Google.
- **Conversiones:** Lead-Form (envío del formulario) y Lead-WhatsApp (clic en
  cualquier WhatsApp de la landing). Verificadas con Tag Assistant.
- **Landing de Ads:** `/en/flexo-plates/`, sin menú del sitio. El formulario
  guarda el lead en Supabase (`leads`, origen `en/flexo-plates`) y lo envía
  por Resend.
- **Campaña:** "Impresores de EE.UU. buscando proveedor de planchas".
  Búsqueda, solo Google, EE.UU., inglés, COP 50.000/día, Maximizar clics.
  Arrancó el 18 de agosto de 2026.

**Pendiente en Ads:** revisar Términos de búsqueda y añadir negativas; con
15–30 conversiones pasar a "Maximizar conversiones"; conversiones mejoradas
para leads (opcional). No existe sync a Google Sheets (el lead va a Supabase +
correo).

---

## 4. Arreglos técnicos importantes

- **Botón de publicar del panel:** fallaba con "Server Components render".
  Causa: las páginas públicas leían con el cliente Supabase de cookies y
  `revalidatePath` las regenera fuera de un request. Ahora usan
  `createPublicClient()` (`src/lib/supabase/public.ts`). **Regla:** nada
  público debe leer con el cliente de cookies.
- Contadores, celdas de tabla y cifras: siempre en el HTML servido (los bots
  de IA no ejecutan JS).

---

## 5. Correo (i-flexo.com)

Correo corporativo en Google Workspace. **Su DNS se edita en Hostinger**, no
en Cloudflare (no activar la zona *pending* de Cloudflare: tumbaría el
correo). SPF único con Google, DKIM en `google._domainkey`, DMARC `p=none`.

---

## 6. Herramientas internas

`fichas.iflexo.co`, `organigrama.iflexo.co` y `cartera.iflexo.co` (Hostinger,
con SSL). **Pendiente (verificar si ya se hizo):** ponerlas detrás de
Cloudflare Access (nube naranja + política por correo `@i-flexo.com`). Sin
eso, cualquiera con la URL puede entrar.

---

## 7. Pendientes

- **24 artículos** del calendario (`docs/seo.md` §5). Los `tipos` de planchas
  y anilox probablemente se integren al pilar en vez de crearse.
- **DMARC** de `i-flexo.com`: subir de `p=none` a `p=quarantine`.
- **Cloudflare Access** para las herramientas internas.
- **Portadas** de los artículos nuevos.
- **Testimonios** de ejemplo en `src/lib/landings.ts` (home y otras páginas):
  reemplazar por reales.
- Menores: SPF duplicado en `iflexo.co` (borrar el de Hostinger en
  Cloudflare) · redirect de `i-flexo.com` a `https://` · Search Console:
  reenviar sitemap y pedir indexación de lo nuevo.

---

## 8. Trabajar desde otro equipo

- **Remote Control** (recomendado): la sesión corre en el Mac de la oficina y
  se controla desde claude.ai/code o la app móvil. Requiere el Mac encendido.
- **Nuevo equipo:** `git clone git@github.com:kmiloyp/web_iflexo.co.git`,
  `npm install`, copiar `.env.local` (AirDrop o desde Vercel → Environment
  Variables) y `npm run dev`. **Nunca mandar `.env.local` por correo o
  chat**: incluye `SUPABASE_SERVICE_ROLE_KEY`.
