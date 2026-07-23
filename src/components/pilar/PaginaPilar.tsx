import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Página pilar de categoría: contenido propio y extenso que va ARRIBA del
 * listado de artículos. Sirve para /flexografia/ y, con los mismos tipos,
 * para /planchas/, /anilox/, /tintas/ y /color/.
 *
 * El contenido vive en `src/lib/pilares/*.tsx` como datos; este componente
 * solo lo maqueta. Así cada pilar nuevo es un archivo de contenido, no una
 * página a medida.
 *
 * Sin dependencias: el acordeón usa <details>/<summary> nativos y las tablas
 * hacen scroll horizontal con CSS. Cero JavaScript de cliente.
 */

export type PilarBloque =
  /** Párrafos, listas y H3. Se escribe como JSX para poder llevar enlaces. */
  | { type: "prose"; content: ReactNode }
  /** Tabla comparativa. Responsive por scroll horizontal, nunca como imagen.
   *  highlightRows: índices (base 0) de filas a resaltar con fondo de acento. */
  | {
      type: "tabla";
      headers: string[];
      rows: ReactNode[][];
      caption?: string;
      highlightRows?: number[];
    }
  /** "Regla práctica" / "el punto que nadie mide": cita destacada. */
  | { type: "destacado"; label: string; content: ReactNode }
  /** Experiencia en primera persona del autor. Es lo que no se puede copiar. */
  | { type: "experiencia"; content: ReactNode }
  /** Dato o equivalencia numérica resaltada (p. ej. 1 BCM = 1,55 cm³/m²). */
  | { type: "equivalencia"; valor: ReactNode; nota?: ReactNode }
  /** Lista término→definición en tarjetas (p. ej. cirel / cliché / caucho). */
  | {
      type: "definiciones";
      items: { termino: string; definicion: ReactNode }[];
    }
  /** Advertencia con icono de precaución y fondo de alerta. */
  | { type: "alerta"; content: ReactNode }
  /** Hueco de foto pendiente. Ver nota en `ImagenPendiente`. */
  | { type: "imagen"; descripcion: string };

export type PilarSeccion = {
  /** Ancla para el índice de contenidos. */
  id: string;
  titulo: string;
  bloques: PilarBloque[];
};

export type PilarFaq = { q: string; a: string };

export type PilarAutor = {
  nombre: string;
  cargo: string;
  anios: number;
  bio: string;
  /** Ruta de la página de autor, si existe. */
  href?: string;
};

export type PilarData = {
  h1: string;
  /** Definición de 50-60 palabras. Es el fragmento que citan los motores de IA. */
  respuestaDirecta: ReactNode;
  /** Párrafos de entrada, después del bloque destacado. */
  intro?: ReactNode;
  secciones: PilarSeccion[];
  faq: { id: string; titulo: string; items: PilarFaq[] };
  cta: { titulo: string; cuerpo: string; href: string; label: string };
  /** Firma del artículo. Pesa en E-E-A-T y en visibilidad en IA. */
  autor?: PilarAutor;
};

export function PaginaPilar({ data }: { data: PilarData }) {
  const indice = [
    ...data.secciones.map((s) => ({ id: s.id, titulo: s.titulo })),
    { id: data.faq.id, titulo: data.faq.titulo },
  ];

  return (
    <article className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          {data.h1}
        </h1>

        <RespuestaDirecta>{data.respuestaDirecta}</RespuestaDirecta>

        {data.intro && (
          <div className="prose-iflexo mt-8 max-w-none">{data.intro}</div>
        )}

        <IndiceDeContenidos items={indice} />

        {data.secciones.map((seccion) => (
          <section key={seccion.id} className="mt-14 scroll-mt-24" id={seccion.id}>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {seccion.titulo}
            </h2>
            {seccion.bloques.map((bloque, i) => (
              <Bloque key={i} bloque={bloque} />
            ))}
          </section>
        ))}

        <section className="mt-14 scroll-mt-24" id={data.faq.id}>
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            {data.faq.titulo}
          </h2>
          <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-paper">
            {data.faq.items.map((item) => (
              <details key={item.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {data.autor && <FirmaAutor autor={data.autor} />}

        <CtaPilar cta={data.cta} />
      </Container>
    </article>
  );
}

/** Firma del artículo: quién lo escribe, con qué autoridad. */
function FirmaAutor({ autor }: { autor: PilarAutor }) {
  const inicial = autor.nombre.trim().charAt(0).toUpperCase();
  return (
    <aside className="mt-14 flex gap-4 rounded-2xl border border-line bg-sand p-6">
      <div
        aria-hidden
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display text-xl font-bold text-white"
      >
        {inicial}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Escrito por
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-ink">
          {autor.href ? (
            <a href={autor.href} className="hover:text-brand-magenta">
              {autor.nombre}
            </a>
          ) : (
            autor.nombre
          )}
        </p>
        <p className="text-sm text-ink-soft">
          {autor.cargo} · {autor.anios} años en flexografía
        </p>
        <p className="mt-2 text-sm text-ink-soft">{autor.bio}</p>
      </div>
    </aside>
  );
}

/** Definición inicial. Fondo suave y borde de acento para que se lea como tal. */
function RespuestaDirecta({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-line border-l-4 border-l-brand-coral bg-sand p-6">
      <p className="text-lg leading-relaxed text-ink">{children}</p>
    </div>
  );
}

function IndiceDeContenidos({
  items,
}: {
  items: { id: string; titulo: string }[];
}) {
  return (
    <nav
      aria-label="Índice de contenidos"
      className="mt-10 rounded-2xl border border-line bg-paper p-6"
    >
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        En esta guía
      </h2>
      <ol className="mt-4 grid gap-2.5">
        {items.map((item, i) => (
          <li key={item.id} className="flex gap-3 text-sm">
            <span className="shrink-0 font-mono text-xs text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${item.id}`}
              className="text-ink-soft underline-offset-2 hover:text-brand-magenta hover:underline"
            >
              {item.titulo}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Bloque({ bloque }: { bloque: PilarBloque }) {
  switch (bloque.type) {
    case "prose":
      return (
        <div className="prose-iflexo mt-5 max-w-none">{bloque.content}</div>
      );

    case "tabla":
      return <TablaComparativa {...bloque} />;

    case "destacado":
      return (
        <aside className="mt-6 rounded-2xl border-l-4 border-brand-amber bg-mist p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-orange">
            {bloque.label}
          </p>
          <div className="prose-iflexo mt-2 max-w-none [&>p:last-child]:mb-0">
            {bloque.content}
          </div>
        </aside>
      );

    case "experiencia":
      return (
        <aside className="mt-6 rounded-2xl border border-line bg-paper p-5 shadow-[0_18px_40px_-32px_rgba(38,38,43,0.55)]">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-magenta">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
            Desde nuestra experiencia
          </p>
          <div className="prose-iflexo mt-3 max-w-none [&>p:last-child]:mb-0">
            {bloque.content}
          </div>
        </aside>
      );

    case "equivalencia":
      return (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-line bg-spectrum-teal/10 px-6 py-7 text-center">
          <p className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {bloque.valor}
          </p>
          {bloque.nota && (
            <p className="mt-2 text-sm text-ink-soft">{bloque.nota}</p>
          )}
        </div>
      );

    case "definiciones":
      return (
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {bloque.items.map((item) => (
            <div
              key={item.termino}
              className="rounded-2xl border border-line bg-paper p-5"
            >
              <dt className="font-display text-lg font-semibold text-ink">
                {item.termino}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {item.definicion}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "alerta":
      return (
        <aside
          role="note"
          className="mt-6 flex gap-3 rounded-2xl border border-brand-magenta/30 bg-brand-magenta/[0.06] p-5"
        >
          <span
            aria-hidden
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-magenta text-sm font-bold text-white"
          >
            !
          </span>
          <div className="prose-iflexo max-w-none [&>p:last-child]:mb-0 [&_p]:text-ink">
            {bloque.content}
          </div>
        </aside>
      );

    case "imagen":
      return <ImagenPendiente descripcion={bloque.descripcion} />;
  }
}

/**
 * Tabla con scroll horizontal en móvil. No se convierte a imagen: el texto
 * debe quedar indexable y poder leerse con lector de pantalla.
 */
function TablaComparativa({
  headers,
  rows,
  caption,
  highlightRows,
}: {
  headers: string[];
  rows: ReactNode[][];
  caption?: string;
  highlightRows?: number[];
}) {
  const highlighted = new Set(highlightRows ?? []);
  return (
    <figure className="mt-6">
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="bg-mist">
              {headers.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 font-semibold text-ink"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row, i) => (
              <tr
                key={i}
                className={cn(
                  "align-top",
                  highlighted.has(i) && "bg-brand-coral/[0.07]"
                )}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={cn(
                      "px-4 py-3 text-ink-soft",
                      j === 0 && "font-medium text-ink",
                      highlighted.has(i) &&
                        j === 0 &&
                        "border-l-2 border-brand-coral"
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-xs text-muted sm:hidden">
        Desliza la tabla para ver todas las columnas.
      </figcaption>
    </figure>
  );
}

/**
 * Hueco de foto todavía sin cubrir. Se muestra solo fuera de producción:
 * en el sitio publicado no aparece nada, para no dejar cajas vacías a la
 * vista, pero el marcador queda en el código con la descripción de la
 * foto que hace falta.
 */
function ImagenPendiente({ descripcion }: { descripcion: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="mt-6 rounded-2xl border-2 border-dashed border-line bg-sand p-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Foto pendiente
      </p>
      <p className="mt-2 text-sm text-ink-soft">{descripcion}</p>
    </div>
  );
}

function CtaPilar({
  cta,
}: {
  cta: { titulo: string; cuerpo: string; href: string; label: string };
}) {
  return (
    <aside className="mt-16 overflow-hidden rounded-3xl bg-ink px-6 py-10 text-white sm:px-10">
      <h2 className="font-display text-2xl font-bold tracking-tight">
        {cta.titulo}
      </h2>
      <p className="mt-3 max-w-xl text-white/70">{cta.cuerpo}</p>
      <a
        href={cta.href}
        className="mt-6 inline-flex h-12 items-center rounded-full bg-brand-gradient px-7 font-medium text-white"
      >
        {cta.label}
      </a>
    </aside>
  );
}
