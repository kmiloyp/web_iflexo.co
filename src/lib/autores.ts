/**
 * Autores del sitio. Alimenta la página /autores/[slug]/ y la firma de los
 * pilares y artículos. Tener autor con nombre, cargo y trayectoria pesa en
 * E-E-A-T y en la visibilidad en motores de IA.
 */

export type Autor = {
  slug: string;
  nombre: string;
  cargo: string;
  anios: number;
  /** Bio corta (firma). */
  bio: string;
  /** Bio larga para la página de autor (párrafos). */
  descripcion: string[];
  /** Foto de perfil en /public, si existe. Sin ella se usa la inicial. */
  foto?: string;
  /** Enlaces de autoridad (LinkedIn, etc.), opcionales. */
  perfiles?: { nombre: string; url: string }[];
};

export const autores: Autor[] = [
  {
    slug: "camilo-yepes",
    nombre: "Camilo Yepes",
    cargo: "Director de iFlexo, empresa de preprensa",
    anios: 16,
    bio: "Desde la preprensa he recorrido muchas empresas de impresión, lo que me ha dado un concepto amplio de las necesidades de un impresor y de cómo resolverlas de forma fácil y eficiente, con la mirada de quien entiende las empresas como negocios que deben ser rentables desde sus procesos.",
    descripcion: [
      "Llevo 16 años en la preprensa flexográfica. En ese tiempo he recorrido muchas empresas de impresión, y eso me ha dado un concepto amplio de las necesidades reales de un impresor: no las que aparecen en los catálogos, sino las que se ven en planta cuando la máquina está corriendo y el color no da.",
      "Mi trabajo parte de una idea: las empresas son negocios que deben ser rentables desde sus procesos. Por eso no entiendo la preprensa como un trámite antes de imprimir, sino como el eslabón donde se decide la mayor parte de la calidad y de la eficiencia de un tiraje. Una plancha bien procesada, con curvas calibradas para el anilox y el sustrato de cada cliente, cambia los números de producción más que cualquier ajuste en máquina.",
      "En iFlexo trabajamos con tecnología Kodak Flexcel NX de Miraclon y exposición Shine LED, con un proceso auditado. Pero por encima de la tecnología está el criterio: entender el proceso de cada impresor —su anilox, sus tintas, sus sustratos— para resolver de forma fácil y eficiente.",
    ],
    // PENDIENTE: cuando haya foto de Camilo, ponerla en /public/autores/ y
    // referenciarla aquí. Sin ella la página usa la inicial en un círculo.
    // foto: "/autores/camilo-yepes.jpg",
  },
];

export function getAutor(slug: string): Autor | null {
  return autores.find((a) => a.slug === slug) ?? null;
}
