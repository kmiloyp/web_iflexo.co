# iFlexo — Checklist de lanzamiento

Estado a 2026-07-18. El sitio vive en la preview de Vercel (`web-iflexo-co.vercel.app`).
Salir en vivo = apuntar `iflexo.co` a Vercel y jubilar el WordPress.

## ✅ QA técnico verificado (final, 2026-07-19)
- **Lint:** 0 errores. **Build:** compila limpio.
- **Crawl completo:** 33 páginas + todos sus enlaces internos → **0 enlaces rotos**, **0 problemas de SEO/estado**.
- **URLs del blog** (17) preservadas 1:1 con trailing slash.
- **SEO on-page:** **1 solo `<h1>` por página**, canonical correcto, meta descriptions dentro de límite, **títulos únicos** (se corrigieron 3 artículos con título duplicado), JSON-LD (Organization / Service / Article / BreadcrumbList / FAQPage), `sitemap.xml` con 33 URLs, `robots.txt` correcto (bloquea `/admin` y `/api`).
- **Imágenes** de artículos servidas desde Supabase Storage (independiente del WordPress).
- **Seguridad:** cabeceras (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) activas en producción, sin violaciones.
- **Consola:** sin errores en las páginas verificadas.
- **WhatsApp:** enlaces válidos (2 sedes + 4 comerciales).

## 🔴 Bloqueantes antes de salir en vivo
1. **Revisión legal** de `/privacy-policy/`, `/politica-de-cookies/`, `/aviso-legal/` por el abogado.
2. **Resend – verificar dominio `iflexo.co`** para que el formulario *envíe* correos
   (hoy los leads sí se guardan en Supabase). Requiere unos registros TXT/DKIM en DNS.
   *Alternativa temporal:* poner `CONTACT_FROM_EMAIL=onboarding@resend.dev` en Vercel.
3. **Correr la migración** `supabase/migrations/0003_leads_calificacion.sql` en Supabase.
4. **Usuario admin** creado en Supabase Auth (para el panel/generador).
5. **Vercel Attack Challenge Mode:** revisar que no bloquee a Googlebot. Si está muy
   agresivo, desactivarlo para permitir el rastreo/indexación al salir en vivo.

## 🟡 Recomendado (no bloqueante — se puede mejorar después de lanzar)
- Testimonios reales (ver `docs/checklist-contenido.md`).
- Fotos reales / kit de marca de Miraclon.
- Links reales de comerciales (Barranquilla, Centroamérica, Norteamérica, Venezuela).
- Cifras de ahorro reales para Reducción de color; fuente del "60%" en Prueba de color.

## 🚀 Pasos para apuntar el dominio (cuando todo lo rojo esté listo)
> ⚠️ Guarda antes los valores DNS actuales de Hostinger (para poder revertir).

1. **Vercel** → Project → **Settings → Domains** → agrega `iflexo.co` y `www.iflexo.co`.
   Vercel te muestra los registros DNS exactos a poner.
2. **Hostinger** (DNS de iflexo.co):
   - Registro **A** de `@` → la IP que indique Vercel (típicamente `76.76.21.21`).
   - Registro **CNAME** de `www` → `cname.vercel-dns.com`.
3. Espera la propagación (minutos a un par de horas). `NEXT_PUBLIC_SITE_URL` ya es
   `https://iflexo.co`, así que los canonical y el sitemap quedan correctos solos.

## ✅ Post-lanzamiento
- **Google Search Console:** verificar propiedad, enviar `sitemap.xml`, revisar cobertura.
- Confirmar que los **17 artículos** responden 200 en el dominio real.
- Probar el **formulario** (llega correo + se guarda el lead) y los **WhatsApp**.
- Monitorear leads los primeros días.

## ↩️ Plan de reversa
El WordPress sigue disponible hasta confirmar que todo funciona. Si algo falla,
**revertir los registros DNS** a los valores originales de Hostinger y el sitio anterior
vuelve a responder.
