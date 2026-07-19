"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsapp } from "@/lib/config";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING =
  "¡Hola! 👋 Soy el asistente de iFlexo. Te ayudo con dudas sobre planchas Kodak Flexcel NX, prueba de color, reducción de color y nuestros servicios de preprensa. ¿En qué te ayudo?";

const QUICK = ["¿Ustedes imprimen?", "¿Qué es Shine LED?", "Quiero cotizar"];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || loading) return;
    const next = [...messages, { role: "user" as const, content: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // enviamos el historial sin el saludo inicial
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? "…" },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `No pude responder ahora. Escríbenos por WhatsApp: ${whatsapp.bogota}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl">
          {/* Header */}
          <div className="relative flex items-center justify-between overflow-hidden bg-ink px-4 py-3 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-40 blur-2xl bg-spectrum"
            />
            <div className="relative">
              <p className="font-display text-sm font-semibold">Asistente iFlexo</p>
              <p className="text-xs text-white/60">Preprensa flexográfica</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              className="relative rounded-full p-1.5 hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-sand p-4">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}
            {loading && (
              <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-sm bg-paper px-4 py-3 shadow-sm">
                <Dot /> <Dot delay={0.15} /> <Dot delay={0.3} />
              </div>
            )}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand-coral hover:text-ink"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-line bg-paper p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta…"
              className="h-10 flex-1 rounded-full border border-line bg-white px-4 text-sm outline-none focus:border-brand-coral"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Enviar"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </form>

          <a
            href={whatsapp.bogota}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 border-t border-line bg-paper py-2 text-xs font-medium text-muted hover:text-ink"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" /> ¿Prefieres WhatsApp? Habla con una persona
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-[0_10px_30px_-8px_rgba(238,63,109,0.6)] transition-transform hover:scale-105"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}

function Bubble({ role, content }: Msg) {
  const isUser = role === "user";
  return (
    <div
      className={cn(
        "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
        isUser
          ? "ml-auto rounded-br-sm bg-brand-gradient text-white"
          : "rounded-bl-sm bg-paper text-ink-soft shadow-sm"
      )}
    >
      {renderRich(content)}
    </div>
  );
}

/** Renderiza **negrita** y convierte URLs en enlaces clicables. */
function renderRich(text: string) {
  const bold = text.split(/\*\*(.+?)\*\*/g); // índices impares = negrita
  return bold.map((seg, i) =>
    i % 2 === 1 ? (
      <strong key={i}>{linkify(seg, i)}</strong>
    ) : (
      <span key={i}>{linkify(seg, i)}</span>
    )
  );
}

function linkify(text: string, keyBase = 0) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={`${keyBase}-${i}`}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}
