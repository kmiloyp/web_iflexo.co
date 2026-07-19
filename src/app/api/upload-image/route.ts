import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export const runtime = "nodejs";
export const maxDuration = 30;

/** Sube una imagen al bucket `articulos`. Solo admin autenticado. */
export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase no está configurado." },
      { status: 500 }
    );
  }

  // Auth
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Sesión no válida. Vuelve a iniciar sesión en /admin." },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json({ error: "Error de autenticación." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "No se pudo leer el archivo." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No se recibió ninguna imagen." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "El archivo no es una imagen." }, { status: 400 });
  }
  if (file.size > 4_000_000) {
    return NextResponse.json(
      { error: "La imagen supera los 4 MB. Redúcela e inténtalo de nuevo." },
      { status: 413 }
    );
  }

  try {
    const admin = createAdminClient();
    const ext = (file.name.split(".").pop() || "jpg")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 5);
    const rand = Math.random().toString(36).slice(2, 8);
    const path = `subidas/${Date.now()}-${rand}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error: upErr } = await admin.storage
      .from("articulos")
      .upload(path, bytes, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });
    if (upErr) {
      return NextResponse.json({ error: `Storage: ${upErr.message}` }, { status: 500 });
    }
    const { data } = admin.storage.from("articulos").getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error al subir." },
      { status: 500 }
    );
  }
}
