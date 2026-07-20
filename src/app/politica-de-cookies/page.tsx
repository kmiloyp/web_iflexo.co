import { LegalLayout } from "@/components/LegalLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política de cookies",
  description:
    "Información sobre el uso de cookies en el sitio de iFlexo Visión Gráfica y cómo gestionarlas.",
  path: "/politica-de-cookies/",
  noIndex: true,
});

export default function PoliticaDeCookiesPage() {
  return (
    <LegalLayout title="Política de cookies" updated="julio de 2026">
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos que se almacenan en su dispositivo al
        navegar. Permiten recordar preferencias y analizar el uso del sitio.
      </p>

      <h2>2. Cookies que utilizamos</h2>
      <ul>
        <li>
          <strong>Esenciales:</strong> necesarias para el funcionamiento del
          sitio. No requieren consentimiento.
        </li>
        <li>
          <strong>Analíticas:</strong> nos ayudan a entender cómo se usa el sitio
          para mejorarlo. Se activan solo con su consentimiento.
        </li>
      </ul>

      <h2>3. Gestión del consentimiento</h2>
      <p>
        Al ingresar al sitio puede aceptar o rechazar las cookies no esenciales
        mediante el banner de consentimiento. No cargamos scripts no esenciales
        hasta que usted lo autorice.
      </p>

      <h2>4. Cómo desactivar las cookies</h2>
      <p>
        Puede configurar su navegador para bloquear o eliminar cookies. Tenga en
        cuenta que algunas funciones del sitio podrían verse afectadas.
      </p>
    </LegalLayout>
  );
}
