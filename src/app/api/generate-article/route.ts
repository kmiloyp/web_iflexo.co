import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { generateArticle, isAnthropicConfigured } from "@/lib/anthropic";

const inputSchema = z.object({
  keyword: z.string().min(2),
  urls: z.array(z.string()).max(3),
  experiencia: z.string().min(3),
});

export async function POST(request: Request) {
  // Auth: solo el admin puede generar.
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "No autenticado." }, { status: 401 });
    }
  }

  const body = await request.json().catch(() => null);
  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const article = await generateArticle(parsed.data);

    // Log opcional de la generación.
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        await supabase.from("article_generations").insert({
          inputs: parsed.data,
          raw_output: article,
        });
      } catch {
        /* no bloquear por el log */
      }
    }

    return NextResponse.json({
      article,
      stub: !isAnthropicConfigured(),
    });
  } catch (e) {
    console.error("[generate-article]", e);
    return NextResponse.json(
      { error: "No se pudo generar el artículo." },
      { status: 500 }
    );
  }
}
