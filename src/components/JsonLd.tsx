/** Inserta un bloque JSON-LD de forma segura (data ya es un objeto). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El objeto es controlado por nosotros (no viene del usuario).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
