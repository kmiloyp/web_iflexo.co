import { LegalLayout } from "@/components/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Política de privacidad",
  description:
    "Política de tratamiento de datos personales de iFlexo Visión Gráfica, conforme a la Ley 1581 de 2012 de Colombia.",
  path: "/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Política de privacidad" updated="julio de 2026">
      <p>
        En {siteConfig.legalName} valoramos y protegemos los datos personales de
        nuestros usuarios y clientes. Esta política describe cómo recolectamos,
        usamos y protegemos su información, en cumplimiento de la Ley 1581 de
        2012 y el Decreto 1377 de 2013 de Colombia.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        {siteConfig.legalName}, con operación en Bogotá y Medellín, Colombia.
        Correo de contacto: {siteConfig.email}.
      </p>

      <h2>2. Datos que recolectamos</h2>
      <p>
        Recolectamos los datos que usted nos proporciona a través del formulario
        de contacto (nombre, empresa, correo, teléfono y mensaje) y datos de
        navegación mediante cookies, según nuestra política de cookies.
      </p>

      <h2>3. Finalidad</h2>
      <ul>
        <li>Atender solicitudes de contacto y cotización.</li>
        <li>Brindar información sobre nuestros productos y servicios.</li>
        <li>Mejorar la experiencia en el sitio web.</li>
      </ul>

      <h2>4. Derechos del titular</h2>
      <p>
        Como titular de los datos, usted tiene derecho a conocer, actualizar,
        rectificar y suprimir sus datos, así como a revocar la autorización
        otorgada. Puede ejercer estos derechos escribiendo a {siteConfig.email}.
      </p>

      <h2>5. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y administrativas razonables para proteger la
        información contra acceso no autorizado, pérdida o alteración.
      </p>

      <h2>6. Vigencia</h2>
      <p>
        Esta política rige a partir de su publicación y podrá ser actualizada.
        Los datos se conservarán durante el tiempo necesario para cumplir las
        finalidades descritas.
      </p>
    </LegalLayout>
  );
}
