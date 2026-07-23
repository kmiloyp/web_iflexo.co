/**
 * Artículos traducidos al inglés, bajo /en/. Contenido versionado en código
 * (no en Supabase) porque son pocos y conviene tenerlos revisables en el repo.
 *
 * Cada uno declara `esPath`, su equivalente en español, para emparejar el
 * hreflang en ambas direcciones. Ver también el mapa inverso EN_BY_ES abajo,
 * que usa la plantilla de artículo en español para enlazar a su versión inglesa.
 */

export type EnArticle = {
  /** Segmento de categoría en la URL inglesa, p. ej. "anilox", "plates". */
  category: string;
  /** Slug en la URL inglesa, p. ej. "bcm", "distortion". */
  slug: string;
  /** Etiqueta visible de la categoría (breadcrumb, eyebrow). */
  categoryLabel: string;
  /** Ruta del artículo original en español (para hreflang y enlace). */
  esPath: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  contentHtml: string;
  publishedAt: string;
};

export const enArticles: EnArticle[] = [
  {
    category: "anilox",
    slug: "bcm",
    categoryLabel: "Anilox",
    esPath: "/anilox/bcm/",
    title: "Anilox BCM and ink transfer volume",
    metaTitle: "Anilox BCM chart: volume ranges and how to choose",
    metaDescription:
      "Anilox BCM explained: what it is, the volume ranges by application (FTA chart), how to convert BCM to cm³/m² and how to pick the right anilox.",
    excerpt:
      "BCM is the ink-transfer volume of the anilox roll, and one of the variables that most affects your flexo results. Here is what it means, the reference ranges by application, and how to choose the right anilox.",
    coverImageUrl:
      "https://hhjvohubqmsniginbsdo.supabase.co/storage/v1/object/public/articulos/BCM-y-anilox-scaled.jpeg",
    coverImageAlt: "BCM on anilox rolls",
    publishedAt: "2024-01-25T00:00:00.000Z",
    contentHtml: `<p>One of the variables with the biggest impact on your flexo work is the <strong>BCM of the anilox roll</strong> (the anilox ink-transfer volume).</p>
<p>How much ink the anilox delivers is a key factor in the printed result. That is why <strong>BCM in flexography</strong> is a variable you must control to optimize ink transfer during printing.</p>
<h2>What is the anilox BCM?</h2>
<p>It is a measure of the ink volume the anilox roll transfers to the photopolymer plate, expressed in <strong>billion cubic microns per square inch</strong> — BCM/in². For context, a cubic micron (μm³) is a unit of volume, and one billion cubic microns is 1,000,000,000 μm³.</p>
<h2>Why BCM matters</h2>
<p>This figure is critical when <strong>choosing the anilox</strong>: too high a volume can flood the print with ink, while too low a volume leaves it weak. The <strong>anilox transfer volume</strong> keeps the press process under control by determining how much ink reaches the plate.</p>
<p>Anilox rolls have microscopic cells that hold ink and release it to the photopolymer. The number of cells is set by the <strong>anilox line screen</strong>: the finer the line screen, the finer the ink metering. Different line screens offer different <strong>transfer volumes</strong>.</p>
<h2>Anilox volume range chart</h2>
<p>The following table shows the recommended range by application (industry reference, FTA standard):</p>
<table>
<thead><tr><th>Application</th><th>Line screen (LPI)</th><th>Volume (BCM)</th></tr></thead>
<tbody>
<tr><td>Fine process / high definition</td><td>800 – 1200</td><td>1.0 – 3.2</td></tr>
<tr><td>Vignettes and halftones</td><td>360 – 600</td><td>2.8 – 4.7</td></tr>
<tr><td>Line and type</td><td>200 – 400</td><td>3.5 – 7.5</td></tr>
<tr><td>Solids and heavy coverage</td><td>180 – 330</td><td>4.0 – 8.0</td></tr>
<tr><td>Opaque whites</td><td>140 – 260</td><td>8.0 – 12.0</td></tr>
<tr><td>Varnishes and coatings</td><td>100 – 200</td><td>10.0 – 15.0</td></tr>
</tbody>
</table>
<p><em>General industry reference ranges (FTA / Harper). The optimal volume depends on your ink, your substrate and your plate line screen; at iFlexo we validate the correct anilox for each job. 1 BCM = 1.55 cm³/m².</em></p>
<p>If your <strong>printed results</strong> are not what you expected — <strong>excessive dot gain</strong>, weak color, poor quality — the <strong>BCM of your anilox roll</strong> may be the cause. It is a variable to account for when setting up the press.</p>
<p>This helps you take corrective action and replace the anilox with one that has the right transfer capacity. Remember that it goes hand in hand with the <strong>plate's own line screen</strong>. Different jobs have different requirements based on the expected result, the substrate and the print line screen, so the <strong>anilox BCM</strong> should be an ally for quality results — or, if ignored, a recipe for trouble.</p>
<h2>BCM conversion</h2>
<p>One of the great challenges in printing is to print with the <strong>least ink possible</strong>, while still setting a standard for the <strong>anilox transfer volume</strong> so the print is neither weak nor overloaded with dot gain.</p>
<p>There is no single exact rule for picking the roll, but for the anilox line screen a common ratio is 1:6 — the anilox should be at least six times the plate line screen.</p>
<p>Example 1:</p>
<blockquote><p>You have a 600 LPI anilox. The maximum plate line screen you can use is 100 lpi.</p></blockquote>
<p>Example 2:</p>
<blockquote><p>You want to print 150 LPI. You need at least a 930 LPI anilox.</p></blockquote>
<p>It is worth clarifying that choosing <strong>the highest line screen</strong> is not always the best choice, and it is directly tied to the line screen of the <strong>flexo plate</strong>.</p>
<h3>Converting BCM to cm³/m²</h3>
<p>The volume unit of anilox rolls depends on where they are made. Rolls made in the United States express it in BCM; elsewhere you will find it in cm³/m². Converting between the two is simple.</p>
<p><strong>BCM conversion:</strong></p>
<p>To convert from BCM to cm³/m², multiply by 1.55.</p>
<p>2.4 BCM × 1.55 = 3.72 cm³/m²</p>
<p>To convert from cm³/m² to BCM, divide by 1.55.</p>
<p>3.72 cm³/m² ÷ 1.55 = 2.4 BCM</p>
<p>Remember that every anilox roll should be verified before replacement; the data sheet includes values that help you keep tighter control of the roll's BCM for the right choice.</p>`,
  },

  {
    category: "plates",
    slug: "distortion",
    categoryLabel: "Plates",
    esPath: "/planchas/distorsion/",
    title: "Plate distortion in flexography: how to calculate it",
    metaTitle: "Flexo plate distortion: 3 ways to calculate elongation",
    metaDescription:
      "Why distortion is applied in flexography and three ways to calculate plate elongation: two math formulas (repeat length and distortion factor) and a hands-on method.",
    excerpt:
      "One of the biggest questions in flexography. Here are three ways to calculate plate elongation: two with math formulas and one hands-on method that will surprise you.",
    coverImageUrl:
      "https://hhjvohubqmsniginbsdo.supabase.co/storage/v1/object/public/articulos/Plancha-flexografica-kodak-flexcel-NX.png",
    coverImageAlt: "Three ways to calculate flexo plate distortion",
    publishedAt: "2024-01-20T00:00:00.000Z",
    contentHtml: `<p>This is one of the biggest questions among people who do flexography, so we put together three ways to calculate elongation: two using math formulas, and one completely different method that will surprise you.</p>
<h2>Why is distortion applied in flexography?</h2>
<p>You are probably used to applying an elongation percentage to flexo files, but not sure why.</p>
<p>If you take a photopolymer plate (also called a "cirel" in some countries) and lay it flat, the bottom (Xd) and the top (Yd) have the same length.</p>
<img src="https://hhjvohubqmsniginbsdo.supabase.co/storage/v1/object/public/articulos/Elongacion-y-distorision-plancha-768x370-1.jpg" alt="Flat plate: top and bottom have the same length">
<p>However, when the plate is wrapped around a cylinder, its surface starts to stretch. The distance along the top of the plate becomes greater than the distance along the bottom.</p>
<p>Because a photopolymer plate is imaged completely flat, the original file must be reduced — distorted — only in the direction in which the plate will be wrapped around the cylinder's circumference, so that once mounted it has the correct size.</p>
<img src="https://hhjvohubqmsniginbsdo.supabase.co/storage/v1/object/public/articulos/Distorsion-Calculo-1024x493-1.png" alt="Distortion calculation diagram">
<p>The distortion percentage is simply the ratio Xd / Yd, where Xd is the circumference of the inner circle and Yd is the circumference of the outer circle.</p>
<h2>Math formula</h2>
<p>Let's start with something simple: the difference between the radius, the diameter and the perimeter of a circle.</p>
<p><strong>The radius</strong> is the distance from the center to the edge of the circle. Its formula is <strong><em>diameter ÷ 2</em></strong>.</p>
<p><strong>The diameter</strong> is the straight-line distance from edge to edge. Its formula is <em><strong>perimeter ÷ π</strong></em> (π ≈ 3.14159).</p>
<p><strong>The perimeter</strong> is the edge of the circle — the total distance around it. Its formula is <em><strong>2 × π × R</strong></em> (π ≈ 3.14159).</p>
<p>So there are two circumferences we need to find: the top of the plate (Yd) and the base where the plate is mounted (Xd).</p>
<p>The distortion formula is:</p>
<blockquote><p>% Distortion = Xd / Yd</p></blockquote>
<p>Which we can rewrite as:</p>
<blockquote><p>% Distortion = 2πR₁ / 2πR₂</p></blockquote>
<p>Where R₁ is the radius of the inner circumference and R₂ is the radius of the outer circumference of the plate.</p>
<p>R₁ and R₂ depend on the plate thickness (P), the mounting-tape thickness (T), the cylinder radius (C) and the thickness of the plate's polyester backing.</p>
<p>It is worth noting that one of the <strong>key elements</strong> that keeps the plate from stretching on the bottom is the plate's <strong>polyester backing</strong> (mylar), which is very strong and prevents the base from stretching during mounting. If you have seen flexo plates, you know that base is highly resistant.</p>
<p>Continuing, we calculate the radius of the two circumferences.</p>
<p>R₁ equals the cylinder radius plus the mounting-tape thickness plus the plate's polyester-backing thickness.</p>
<p>R₁ = C + T + M</p>
<p>R₂ equals the cylinder radius plus the mounting-tape thickness plus the plate thickness.</p>
<p>R₂ = C + T + P</p>
<p>So our elongation formula becomes:</p>
<blockquote><p>% Distortion = (C + T + M) / (C + T + P)</p></blockquote>
<h2>Distortion from the repeat length</h2>
<p>To find the distortion percentage from the repeat length (RL), understand the following.</p>
<p>The repeat length is the perimeter of the plate's circle at the top when mounted (the top perimeter). With RL we can find the radius of that circumference, which is Yd.</p>
<p>To find Xd, we subtract the plate height from Yd — the plate (P) minus the polyester backing (M). It sounds complex, but here is an example.</p>
<blockquote><p>The formula: % Distortion = [RL ÷ (2π) + (M − P)] / [RL ÷ (2π)]</p></blockquote>
<p>For our example: a job with a 25" repeat length using a 0.067" gauge plate.</p>
<p>Plate (P) = 0.067" or 1.702 mm</p>
<p>Polyester backing (M) = 0.005" or 0.127 mm</p>
<p>Repeat (RL) = 25" or 635 mm</p>
<p>% Distortion = [635 ÷ (2 × 3.1416) + (0.127 − 1.702)] / [635 ÷ (2 × 3.1416)]</p>
<p>% Distortion = 99.4885 / 101.0633</p>
<p>% Distortion = 0.9844 or 98.44%</p>
<p>The distortion to apply to the job in the print direction is 98.44%.</p>
<h2>Distortion from the distortion factor</h2>
<p>We saw the more complex method; now a very practical one, using an elongation constant based on the plate gauge.</p>
<p>This constant, or C factor, was found after extensive testing and is summarized in the following table.</p>
<table>
<thead><tr><th>Plate gauge</th><th>C factor</th></tr></thead>
<tbody>
<tr><td>1.14 mm – 0.045″</td><td>6.10</td></tr>
<tr><td>1.70 mm – 0.067″</td><td>9.89</td></tr>
<tr><td>2.54 mm – 0.100″</td><td>15.16</td></tr>
<tr><td>2.84 mm – 0.112″</td><td>17.08</td></tr>
<tr><td>3.94 mm – 0.155″</td><td>23.94</td></tr>
</tbody>
</table>
<p>If you want to know where the C factor comes from, it is calculated with this formula:</p>
<blockquote><p>C factor = (2π) + (M − P)</p></blockquote>
<p>Note: the polyester backing for the 1.14 mm gauge is 0.178 mm; for the rest it is 0.127 mm.</p>
<p>And the formula using the C factor is:</p>
<blockquote><p>% Distortion = [1 − (C factor / RL)] × 100</p></blockquote>
<p>Using the same data as before:</p>
<p>% Distortion = [1 − (9.89 / 635)] × 100</p>
<p>% Distortion = 98.44%</p>
<h2>A simple, hands-on method</h2>
<p>This is one of the ways our clients have determined elongation when they don't have the data the formulas need.</p>
<p>It is very simple. Take a piece of photopolymer plate longer than the roll's circumference, with an image on it (preferably a solid). Apply the mounting tape you normally use and stick it to the roll.</p>
<p>Because the plate is longer than the roll's circumference, the two ends will meet and one will overlap the other. When that happens, make a mark with a pen right where they overlap — a long mark is recommended.</p>
<p>Then peel off the plate, lay it on a flat surface and, with a tape measure, measure lengthwise from the mark to the start of the plate. That measurement is what the files should have once elongated when that cylinder is used to print.</p>
<p>This comes from the experience of supporting and advising many printers. If you need help with this kind of calculation or anything else, our team is fully available to support you.</p>`,
  },
];

/** Busca un artículo inglés por su categoría+slug de la URL /en/. */
export function getEnArticle(category: string, slug: string): EnArticle | null {
  return (
    enArticles.find((a) => a.category === category && a.slug === slug) ?? null
  );
}

/**
 * Mapa ruta-española → ruta-inglesa, para que la plantilla de artículo en
 * español añada el hreflang y el enlace a la versión en inglés.
 */
export const EN_BY_ES: Record<string, string> = Object.fromEntries(
  enArticles.map((a) => [a.esPath, `/en/${a.category}/${a.slug}/`])
);
