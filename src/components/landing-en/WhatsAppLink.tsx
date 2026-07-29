"use client";

import { adsConversion, CONVERSIONS } from "@/lib/ads";

/**
 * Enlace de WhatsApp de la landing. Dispara la conversión "Lead - WhatsApp"
 * de Google Ads en el clic, antes de abrir WhatsApp. Se usa en todos los
 * botones de WhatsApp de /en/flexo-plates/.
 */
export function WhatsAppLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => adsConversion(CONVERSIONS.leadWhatsapp)}
    >
      {children}
    </a>
  );
}
