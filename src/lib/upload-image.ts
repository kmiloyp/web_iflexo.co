"use client";

import { compressImage, formatBytes } from "@/lib/compress-image";

export type UploadOutcome =
  | { ok: true; url: string; note: string | null }
  | { ok: false; error: string };

/**
 * Comprime y sube una imagen al bucket de artículos.
 * Único camino de subida del panel: portada y pegado/arrastre en el editor.
 */
export async function uploadArticleImage(file: File): Promise<UploadOutcome> {
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "El archivo no es una imagen." };
  }

  let toSend = file;
  let note: string | null = null;
  try {
    const result = await compressImage(file);
    toSend = result.file;
    if (result.file.size < result.originalSize * 0.9) {
      note = `Imagen optimizada: ${formatBytes(result.originalSize)} → ${formatBytes(
        result.file.size
      )}${result.width ? ` (${result.width}px de ancho)` : ""}.`;
    }
  } catch {
    // Seguimos con el original: el servidor decidirá si lo acepta.
  }

  if (toSend.size > 4_000_000) {
    return {
      ok: false,
      error: `La imagen sigue pesando ${formatBytes(
        toSend.size
      )} después de optimizarla. Prueba con una versión más pequeña.`,
    };
  }

  try {
    const fd = new FormData();
    fd.append("file", toSend);
    const res = await fetch("/api/upload-image", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.url) return { ok: true, url: data.url as string, note };
    return {
      ok: false,
      error: data.error ?? `No se pudo subir la imagen (${res.status}).`,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? `Error de red: ${e.message}` : "Error al subir la imagen.",
    };
  }
}
