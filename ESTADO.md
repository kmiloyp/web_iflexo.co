# Estado del proyecto

Última actualización: **20 de julio de 2026**

Resumen de dónde va la web para retomar el trabajo desde cualquier equipo.
Para las convenciones de código y la arquitectura, ver `AGENTS.md`.

---

## El sitio está EN VIVO

`https://iflexo.co` corre sobre Vercel desde el 19 de julio de 2026. Reemplazó
al WordPress de Hostinger conservando las URLs 1:1.

Verificado el día del cambio: las 17 URLs que el WordPress tenía indexadas
responden 200 en la misma dirección, con el canonical correcto. Más una nueva
(`/flexografia/efecto-moire/`).

**Ojo:** el sitio ya está indexado con estas URLs. Cualquier cambio de ruta de
aquí en adelante necesita su 301 en `next.config.ts`.

### Cómo está montado el dominio

| Host | Qué hace |
|---|---|
| `iflexo.co` | Production (aquí vive el sitio) |
| `www.iflexo.co` | 308 al apex, conservando la ruta |
| `i-flexo.com` | 301 a `iflexo.co` (dominio antiguo, sigue en Hostinger) |

DNS de `iflexo.co` en **Cloudflare**: CNAME `@` y `www` →
`cab5880236be6cd0.vercel-dns-017.com`, ambos **sin proxy** (nube gris). Si se
activa el proxy, Vercel no puede emitir el certificado.

### Rollback al WordPress

El WordPress de Hostinger sigue encendido. Para volver, restaurar en Cloudflare:

```
A     @  →  77.37.76.111
A     @  →  148.135.128.122
AAAA  @  →  2a02:4780:4f:969b:5d9f:d02:52e0:f99f
AAAA  @  →  2a02:4780:51:f17a:2697:abb0:4392:7df8
CNAME www → www.iflexo.co.cdn.hstgr.net
```

---

## Correo

El correo corporativo de la empresa está en **i-flexo.com** (Google
Workspace). `iflexo.co` solo tiene un buzón secundario.

⚠️ **El DNS de `i-flexo.com` se edita en Hostinger**, no en Cloudflare (sus
nameservers son `dns-parking.com`). Hay una zona de Cloudflare para ese
dominio en estado *pending*: está inactiva y no debe activarse — cambiarle los
nameservers tumbaría el correo de toda la empresa.

El 19 de julio se arregló la autenticación, que estaba rota desde antes (dos
registros SPF en conflicto y sin DKIM). Ahora: SPF único con Google, DKIM en
`google._domainkey`, DMARC en `p=none` con reportes.

El primer reporte DMARC (20 de julio) confirmó DKIM=pass y SPF=pass.

---

## Pendientes

### Correo — principios de agosto de 2026
Cuando varios reportes DMARC seguidos muestren `pass` para todo el correo
legítimo, subir la política de `p=none` a `p=quarantine` (registro TXT
`_dmarc` en Hostinger). Eso es lo que cierra la puerta a la suplantación.
Si algún reporte trae un `fail`, investigar ese emisor **antes** de endurecer.

### Testimonios
Los de `src/lib/landings.ts` son de ejemplo, no reales, y salen en 6 páginas
(home, nosotros, prueba-de-color, servicios-graficos y las dos de soluciones).
Reemplazar por los verificados de Google/YouTube.

### Artículos sin imagen de portada
Sin portada no pueden mostrar miniatura en resultados de búsqueda:
- `anilox/importancia`
- `planchas/kodak-flexcel-nx`
- `planchas/evolucion-aplicaciones-y-futuro`

### Menores
- `iflexo.co` tiene dos registros SPF; sobra el de Hostinger (borrar en Cloudflare).
- La redirección de `i-flexo.com` apunta a `http://iflexo.co` — cambiar a `https://`.
- Search Console: enviar el sitemap si no se ha hecho.
- Del roadmap de `AGENTS.md`: chatbot y revisión legal de los textos.

---

## Arrancar en otro equipo

```bash
git clone git@github.com:kmiloyp/web_iflexo.co.git
cd web_iflexo.co
npm install
npm run dev
```

Falta `.env.local`, que no está en git porque contiene credenciales. Copiarlo
del equipo anterior (AirDrop) o rearmarlo desde Vercel → Settings →
Environment Variables. Sin él el sitio arranca en modo degradado: sin panel,
sin generador y con el blog sirviendo el contenido *seed*.

**Nunca mandar ese archivo por correo o chat**: incluye
`SUPABASE_SERVICE_ROLE_KEY`, que salta toda la seguridad de la base de datos.
