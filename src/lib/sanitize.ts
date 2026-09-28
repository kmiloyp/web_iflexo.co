import "server-only";
import sanitizeHtml from "sanitize-html";

/**
 * Sanea el HTML de los artículos (generados por IA o editados en el admin)
 * antes de guardarlos. Elimina <script>, manejadores on*, iframes no
 * permitidos, etc. Deja solo etiquetas semánticas seguras.
 *
 * Usa sanitize-html (parser en JS puro). Antes era isomorphic-dompurify, pero
 * su jsdom no carga en el runtime de Vercel (ERR_REQUIRE_ESM) y tumbaba todas
 * las acciones del panel.
 */
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html ?? "", {
    allowedTags: [
      "p", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li",
      "strong", "b", "em", "i", "u", "s",
      "a", "blockquote", "br", "hr",
      "img", "figure", "figcaption",
      "table", "thead", "tbody", "tr", "th", "td",
      "code", "pre", "span",
    ],
    allowedAttributes: {
      "*": ["title"],
      a: ["href", "target", "rel"],
      img: ["src", "alt"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https"] },
    allowProtocolRelative: false,
  });
}
