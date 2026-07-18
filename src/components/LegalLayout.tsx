import { Container } from "@/components/ui/Container";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-coral">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted">Última actualización: {updated}</p>

        {/* Aviso: contenido borrador, pendiente de revisión por el área legal. */}
        <div className="mt-5 rounded-xl border border-line bg-sand p-4 text-sm text-ink-soft">
          Este texto es un borrador de referencia alineado a la Ley 1581 de 2012
          (Colombia). Debe ser revisado y aprobado por el área legal antes de su
          publicación definitiva.
        </div>

        <div className="prose-iflexo mt-8">{children}</div>
      </Container>
    </article>
  );
}
