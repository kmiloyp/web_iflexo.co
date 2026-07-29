import Script from "next/script";
import { GA4_ID, ADS_ID } from "@/lib/ads";

/**
 * Etiqueta base de Google (gtag.js), cargada en todo el sitio desde el layout.
 * Configura GA4 y Google Ads en la misma instancia de gtag. Al configurar el
 * ID de Ads en cada página, el conversion linker (captura de gclid) queda
 * activo automáticamente.
 *
 * Nota: GT-TBV9KQV (el «Google Tag») apunta a la misma propiedad GA4 que
 * G-P6FDVCMZ6V, así que NO se configura por separado para no duplicar los
 * hits de GA4. Si en el futuro es un destino distinto, se añade otro config.
 */
export function GoogleTag() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}');
          gtag('config', '${ADS_ID}');
        `}
      </Script>
    </>
  );
}
