/**
 * Hueco reservado para el widget flotante del chatbot (fase posterior).
 * NO implementa el chatbot: solo deja el espacio en el layout para no
 * rehacer nada cuando se agregue. Ver AGENTS.md → Roadmap.
 */
export function ChatbotSlot() {
  return (
    <div
      id="chatbot-slot"
      data-chatbot="pending"
      aria-hidden="true"
      className="pointer-events-none fixed bottom-5 right-5 z-40"
    >
      {/* El widget del chatbot se montará aquí en la fase de IA conversacional. */}
    </div>
  );
}
