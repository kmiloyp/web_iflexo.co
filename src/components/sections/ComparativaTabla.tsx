import { Check, Minus } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export type ComparativaColumn = { label: string; highlight?: boolean };
export type ComparativaRow = {
  label: string;
  cells: (string | boolean)[];
};

/** Tabla comparativa con una columna destacada (la de iFlexo). Scroll en móvil. */
export function ComparativaTabla({
  eyebrow = "La diferencia está en el proceso",
  title,
  columns,
  rows,
}: {
  eyebrow?: string;
  title: string;
  columns: ComparativaColumn[];
  rows: ComparativaRow[];
}) {
  return (
    <Section className="bg-sand">
      <div className="max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-1/3 p-4 text-left" />
              {columns.map((col) => (
                <th
                  key={col.label}
                  className={cn(
                    "p-4 text-center align-bottom font-display text-sm font-semibold sm:text-base",
                    col.highlight
                      ? "rounded-t-2xl bg-ink text-white"
                      : "text-ink-soft"
                  )}
                >
                  {col.highlight && (
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-amber">
                      Nosotros
                    </span>
                  )}
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={row.label}>
                <th className="border-t border-line p-4 text-left text-sm font-medium text-ink">
                  {row.label}
                </th>
                {row.cells.map((cell, ci) => {
                  const highlight = columns[ci]?.highlight;
                  const last = ri === rows.length - 1;
                  return (
                    <td
                      key={ci}
                      className={cn(
                        "border-t border-line p-4 text-center text-sm",
                        highlight && "bg-ink text-white",
                        highlight && last && "rounded-b-2xl border-t-white/10"
                      )}
                    >
                      {typeof cell === "boolean" ? (
                        // El icono es decorativo (aria-hidden); el texto Sí/No va
                        // en sr-only para que crawlers, lectores de pantalla y
                        // bots de IA no vean una celda vacía.
                        cell ? (
                          <>
                            <span className="sr-only">Sí</span>
                            <Check
                              aria-hidden
                              size={20}
                              className={cn(
                                "mx-auto",
                                highlight ? "text-brand-amber" : "text-spectrum-green"
                              )}
                            />
                          </>
                        ) : (
                          <>
                            <span className="sr-only">No</span>
                            <Minus
                              aria-hidden
                              size={18}
                              className="mx-auto text-muted"
                            />
                          </>
                        )
                      ) : (
                        <span className={highlight ? "font-medium" : "text-ink-soft"}>
                          {cell}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
