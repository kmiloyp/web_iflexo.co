/**
 * Renderiza un texto con marcas **...** convirtiendo esas partes en el
 * degradado de marca. Permite escribir títulos como:
 *   "Otros venden la plancha. Nosotros entregamos **la impresión que sale**."
 */
export function renderHighlighted(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-gradient">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
