"use client";

/**
 * Compresión de imágenes en el navegador, antes de subirlas.
 *
 * Las portadas generadas con IA (ChatGPT/Gemini) suelen pesar 3-8 MB en PNG.
 * A 1600px de ancho y WebP q≈0.82 quedan en 150-350 KB sin diferencia visible
 * en pantalla: el redimensionado se hace por pasos (halving) para no producir
 * el aliasing del escalado directo, y se sube la calidad antes que el tamaño.
 */

const MAX_WIDTH = 1600;
const TARGET_BYTES = 900_000;
const MIN_QUALITY = 0.6;

/** Lee un File como <img> ya decodificada. */
async function loadImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = new window.Image();
    img.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("No se pudo leer la imagen."));
      img.src = url;
    });
    return img;
  } finally {
    // El navegador ya tiene los píxeles decodificados; liberamos el blob.
    URL.revokeObjectURL(url);
  }
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/** Reduce a la mitad hasta acercarse al ancho objetivo (mejor calidad que 1 salto). */
function downscale(
  source: CanvasImageSource,
  fromW: number,
  fromH: number,
  toW: number
): HTMLCanvasElement {
  let w = fromW;
  let h = fromH;
  let canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  let ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, w, h);

  while (w > toW * 2) {
    const nw = Math.max(toW, Math.round(w / 2));
    const nh = Math.round((h * nw) / w);
    const next = document.createElement("canvas");
    next.width = nw;
    next.height = nh;
    const nctx = next.getContext("2d")!;
    nctx.imageSmoothingQuality = "high";
    nctx.drawImage(canvas, 0, 0, nw, nh);
    canvas = next;
    ctx = nctx;
    w = nw;
    h = nh;
  }

  if (w > toW) {
    const nh = Math.round((h * toW) / w);
    const next = document.createElement("canvas");
    next.width = toW;
    next.height = nh;
    const nctx = next.getContext("2d")!;
    nctx.imageSmoothingQuality = "high";
    nctx.drawImage(canvas, 0, 0, toW, nh);
    canvas = next;
  }

  return canvas;
}

export type CompressResult = {
  file: File;
  /** Bytes originales, para poder informar al usuario. */
  originalSize: number;
  width: number;
  height: number;
};

/**
 * Devuelve una versión liviana del archivo. Si algo falla (formato raro,
 * canvas bloqueado) devuelve el original: nunca impide la subida.
 */
export async function compressImage(
  file: File,
  { maxWidth = MAX_WIDTH, targetBytes = TARGET_BYTES } = {}
): Promise<CompressResult> {
  const originalSize = file.size;

  // Los SVG y GIF (animados) no se pueden recomprimir por canvas sin romperlos.
  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    return { file, originalSize, width: 0, height: 0 };
  }

  try {
    const img = await loadImage(file);
    const sw = img.naturalWidth;
    const sh = img.naturalHeight;
    if (!sw || !sh) return { file, originalSize, width: 0, height: 0 };

    const canvas = downscale(img, sw, sh, Math.min(maxWidth, sw));

    // WebP pesa ~30% menos que JPEG a igual calidad; si no está soportado
    // (Safari muy antiguo), toBlob devuelve PNG y el fallback lo detecta.
    const type = "image/webp";
    let quality = 0.82;
    let blob = await canvasToBlob(canvas, type, quality);

    while (blob && blob.size > targetBytes && quality > MIN_QUALITY) {
      quality = Math.round((quality - 0.08) * 100) / 100;
      blob = await canvasToBlob(canvas, type, quality);
    }

    if (!blob || blob.type !== type || blob.size >= originalSize) {
      // No hubo ganancia real: nos quedamos con el original.
      return { file, originalSize, width: sw, height: sh };
    }

    const name = file.name.replace(/\.[^.]+$/, "") || "imagen";
    return {
      file: new File([blob], `${name}.webp`, { type }),
      originalSize,
      width: canvas.width,
      height: canvas.height,
    };
  } catch {
    return { file, originalSize, width: 0, height: 0 };
  }
}

/** "3.2 MB" — para los mensajes del panel. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
