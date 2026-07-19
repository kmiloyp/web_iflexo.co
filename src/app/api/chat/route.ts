import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { headers } from "next/headers";
import { chatSystemPrompt } from "@/lib/chat-prompt";
import { rateLimit } from "@/lib/rate-limit";
import { whatsapp } from "@/lib/config";

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      })
    )
    .min(1)
    .max(24),
});

const FALLBACK = `Ahora mismo no puedo responder por aquí, pero con gusto te atendemos por WhatsApp: ${whatsapp.bogota} (Bogotá) o ${whatsapp.medellin} (Medellín).`;

export async function POST(request: Request) {
  // Rate-limit por IP (chatbot público).
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    "anon";
  if (!rateLimit(`chat:${ip}`, { max: 20, windowMs: 60_000 }).ok) {
    return NextResponse.json(
      { reply: "Vas muy rápido 🙂 Espera un momento e inténtalo de nuevo." },
      { status: 429 }
    );
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  // El historial debe empezar por un mensaje del usuario.
  const messages = parsed.data.messages.filter(
    (m, i) => !(i === 0 && m.role === "assistant")
  );
  if (!messages.length || messages[0].role !== "user") {
    return NextResponse.json({ error: "Conversación inválida." }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ reply: FALLBACK });
  }

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await anthropic.messages.create({
      model: process.env.ANTHROPIC_CHAT_MODEL ?? "claude-haiku-4-5-20251001",
      max_tokens: 600,
      system: chatSystemPrompt(),
      messages,
    });
    const reply = message.content
      .filter((b) => b.type === "text")
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n")
      .trim();
    return NextResponse.json({ reply: reply || FALLBACK });
  } catch (e) {
    console.error("[chat]", e);
    return NextResponse.json({ reply: FALLBACK }, { status: 200 });
  }
}
