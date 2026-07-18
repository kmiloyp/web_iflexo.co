import { Container } from "@/components/ui/Container";

export type ConfianzaItem = { dato: string; sub?: string };

/** Franja de respaldo: datos de confianza en una fila (bajo el hero). */
export function BarraConfianza({ items }: { items: ConfianzaItem[] }) {
  return (
    <div className="border-y border-line bg-paper">
      <Container className="py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center sm:justify-between">
          {items.map((item) => (
            <li key={item.dato} className="flex flex-col">
              <span className="font-display text-sm font-semibold text-ink sm:text-base">
                {item.dato}
              </span>
              {item.sub && (
                <span className="text-xs text-muted">{item.sub}</span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
