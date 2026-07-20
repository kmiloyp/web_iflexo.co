import { LegalLayout } from "@/components/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Aviso legal",
  description:
    "Aviso legal y condiciones de uso del sitio web de iFlexo Visión Gráfica.",
  path: "/aviso-legal/",
  noIndex: true,
});

export default function AvisoLegalPage() {
  return (
    <LegalLayout title="Aviso legal" updated="julio de 2026">
      <h2>1. Titular del sitio</h2>
      <p>
        El presente sitio web es operado por {siteConfig.legalName} (NIT{" "}
        {siteConfig.nit}), con domicilio en {siteConfig.address}, empresa de
        preprensa flexográfica con sedes en Bogotá y Medellín, Colombia. Correo
        de contacto: {siteConfig.email}.
      </p>

      <h2>2. Condiciones de uso</h2>
      <p>
        El acceso y uso de este sitio implica la aceptación de las presentes
        condiciones. El usuario se compromete a utilizar el sitio conforme a la
        ley y a no realizar actividades que puedan dañar o inutilizar el sitio.
      </p>

      <h2>3. Propiedad intelectual</h2>
      <p>
        Los contenidos, marcas, logotipos y diseños de este sitio son propiedad
        de {siteConfig.shortName} o se usan con autorización, y están protegidos
        por la normativa de propiedad intelectual aplicable.
      </p>

      <h2>4. Responsabilidad</h2>
      <p>
        La información se ofrece con fines informativos. {siteConfig.shortName}{" "}
        no se hace responsable por decisiones tomadas con base en el contenido
        del sitio sin la debida asesoría técnica.
      </p>

      <h2>5. Enlaces</h2>
      <p>
        Este sitio puede contener enlaces a terceros (por ejemplo, WhatsApp).
        No nos hacemos responsables del contenido de sitios externos.
      </p>
    </LegalLayout>
  );
}
