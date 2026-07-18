import "server-only";
import DOMPurify from "isomorphic-dompurify";

/**
 * Sanea el HTML de los artículos (generados por IA o editados en el admin)
 * antes de guardarlos. Elimina <script>, manejadores on*, iframes no
 * permitidos, etc. Deja solo etiquetas semánticas seguras.
 */
export function sanitizeArticleHtml(html: string): string {
  return DOMPurify.sanitize(html ?? "", {
    ALLOWED_TAGS: [
      "p", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li",
      "strong", "b", "em", "i", "u", "s",
      "a", "blockquote", "br", "hr",
      "img", "figure", "figcaption",
      "table", "thead", "tbody", "tr", "th", "td",
      "code", "pre", "span",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel", "colspan", "rowspan"],
    ALLOWED_URI_REGEXP:
      /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))/i,
    ADD_ATTR: ["target"],
  });
}
