import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { slugify } from "@/lib/utils";

export type GenerationInput = {
  keyword: string;
  urls: string[]; // top 1-3 en Google
  experiencia: string; // experiencia personal (literal)
};

export type GeneratedArticle = {
  title: string;
  meta_title: string;
  meta_description: string;
  slug: string;
  category: string;
  primary_keyword: string;
  secondary_keywords: string[];
  excerpt: string;
  cover_image_alt: string;
  content_html: string;
  faq: { q: string; a: string }[];
  article_schema: Record<string, unknown>;
};

export function isAnthropicConfigured() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/** Paso 1 — extrae encabezados (H1–H6) de una URL. Solo estructura, no texto. */
async function fetchHeadings(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; iFlexoBot/1.0; investigación de estructura)",
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return [];
    const html = await res.text();
    const matches = html.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) ?? [];
    return matches
      .map((h) => h.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .slice(0, 40);
  } catch {
    return [];
  }
}

const SYSTEM_PROMPT = `Eres un redactor experto en flexografía y preprensa que escribe para el blog de iFlexo Visión Gráfica (Colombia). Escribes en español, en PRIMERA PERSONA, con gran autoridad técnica y un tono desenfadado pero riguroso.

REGLAS INQUEBRANTABLES:
1. La EXPERIENCIA PERSONAL que te entregan se usa de forma LITERAL (cambiando solo palabras mínimas para conectar frases) y se DISEMINA en varias secciones del artículo. NUNCA la pongas en una sección o bloque dedicado a "experiencia personal" y NUNCA crees un encabezado que la mencione. Esta regla pesa por encima de cualquier otra.
2. Los encabezados salen de lo aprendido de la estructura de las 3 URLs de referencia + el keyword research. Toma sus mejores elementos SIN copiar texto.
3. Usa la mayor cantidad posible de keywords, sinónimos y keywords secundarias, manteniendo la calidad y sin relleno.
4. No repitas contenido. El artículo debe ser MÁS LARGO y completo de lo habitual, muy informativo.
5. content_html usa solo etiquetas semánticas (<h2>, <h3>, <p>, <ul>, <li>, <blockquote>). Sin <h1> (el título es el H1). Sin estilos inline.
6. meta_title ≤ 60 caracteres. meta_description ≤ 155 caracteres. slug en kebab-case SIN tildes.
7. Devuelves el resultado EXCLUSIVAMENTE a través de la herramienta 'entregar_articulo'. No escribas texto fuera de la herramienta.`;

const TOOL = {
  name: "entregar_articulo",
  description:
    "Entrega el artículo terminado y su paquete SEO en formato estructurado.",
  input_schema: {
    type: "object" as const,
    properties: {
      title: { type: "string", description: "H1 del artículo" },
      meta_title: { type: "string", description: "≤60 caracteres" },
      meta_description: { type: "string", description: "≤155 caracteres" },
      slug: { type: "string", description: "kebab-case sin tildes" },
      category: {
        type: "string",
        enum: ["flexografia", "planchas", "anilox", "tintas"],
      },
      primary_keyword: { type: "string" },
      secondary_keywords: { type: "array", items: { type: "string" } },
      excerpt: { type: "string", description: "resumen de 1-2 frases" },
      cover_image_alt: { type: "string" },
      content_html: {
        type: "string",
        description: "HTML del cuerpo, sin <h1>",
      },
      faq: {
        type: "array",
        items: {
          type: "object",
          properties: { q: { type: "string" }, a: { type: "string" } },
          required: ["q", "a"],
        },
      },
    },
    required: [
      "title",
      "meta_title",
      "meta_description",
      "slug",
      "category",
      "primary_keyword",
      "secondary_keywords",
      "excerpt",
      "cover_image_alt",
      "content_html",
      "faq",
    ],
  },
};

/** Genera el artículo completo. Sin API key → devuelve un stub editable. */
export async function generateArticle(
  input: GenerationInput
): Promise<GeneratedArticle> {
  if (!isAnthropicConfigured()) {
    return stubArticle(input);
  }

  // Paso 1 — estructura de las 3 URLs (solo encabezados).
  const headingsByUrl = await Promise.all(
    input.urls.filter(Boolean).slice(0, 3).map(fetchHeadings)
  );
  const estructura = headingsByUrl
    .map((hs, i) => `URL ${i + 1}:\n- ${hs.join("\n- ")}`)
    .join("\n\n");

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const userPrompt = `KEYWORD A POSICIONAR: ${input.keyword}

ESTRUCTURA DE LAS 3 URLS DE REFERENCIA (solo para investigación de encabezados/keywords, NO copiar texto):
${estructura || "(sin datos)"}

EXPERIENCIA PERSONAL (usar LITERAL y DISEMINADA, nunca en sección propia):
"""
${input.experiencia}
"""

Ahora:
- Paso 2: haz keyword research (sinónimos, expresiones equivalentes y keywords secundarias de la keyword principal).
- Paso 3: memoriza los argumentos de la experiencia para reusarlos literalmente.
- Paso 4: redacta el artículo siguiendo TODAS las reglas y entrégalo con la herramienta 'entregar_articulo'.`;

  const message = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL ?? "claude-opus-4-8",
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    tools: [TOOL],
    tool_choice: { type: "tool", name: "entregar_articulo" },
    messages: [{ role: "user", content: userPrompt }],
  });

  const toolUse = message.content.find((b) => b.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new Error("El modelo no devolvió el artículo estructurado.");
  }

  const raw = toolUse.input as Omit<GeneratedArticle, "article_schema">;
  return {
    ...raw,
    slug: slugify(raw.slug || raw.title),
    article_schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: raw.title,
      description: raw.meta_description,
    },
  };
}

/** Stub determinista para la fase sin API key (permite probar el flujo/editor). */
function stubArticle(input: GenerationInput): GeneratedArticle {
  const title = `${input.keyword.charAt(0).toUpperCase()}${input.keyword.slice(1)}: guía completa`;
  return {
    title,
    meta_title: `${input.keyword} | iFlexo`.slice(0, 60),
    meta_description:
      `Guía sobre ${input.keyword} en flexografía por iFlexo Visión Gráfica.`.slice(
        0,
        155
      ),
    slug: slugify(input.keyword),
    category: "flexografia",
    primary_keyword: input.keyword,
    secondary_keywords: [input.keyword + " flexografía", "preprensa", "impresión"],
    excerpt: `Todo lo que necesitas saber sobre ${input.keyword}.`,
    cover_image_alt: `Ilustración sobre ${input.keyword}`,
    content_html: `<p><strong>[BORRADOR DE PRUEBA — sin ANTHROPIC_API_KEY]</strong> Este contenido es un marcador de posición generado por el stub. Al configurar la API de Anthropic, aquí llegará el artículo real basado en tu keyword, las 3 URLs y tu experiencia.</p><h2>Introducción</h2><p>Escribe aquí el desarrollo de "${input.keyword}".</p><h2>Puntos clave</h2><ul><li>Punto 1</li><li>Punto 2</li></ul>`,
    faq: [
      {
        q: `¿Qué es ${input.keyword}?`,
        a: "Respuesta de ejemplo (stub).",
      },
    ],
    article_schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
    },
  };
}
