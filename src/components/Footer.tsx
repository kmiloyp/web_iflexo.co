import Link from "next/link";
import { Logo } from "@/components/Logo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Container } from "@/components/ui/Container";
import { footerNav, locations, siteConfig } from "@/lib/config";

export function Footer() {
  const year = 2026; // sello estático; evita hydration mismatch

  return (
    <footer className="mt-8 border-t border-white/10 bg-ink text-white/70">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo variant="white" className="inline-block" />
            <p className="mt-4 text-sm leading-relaxed">
              Preprensa flexográfica de alto nivel en Colombia. Planchas Kodak
              Flexcel NX, gestión de color y reducción de tintas.
            </p>
            <div className="mt-5">
              <WhatsAppButton size="sm">Cotizar por WhatsApp</WhatsAppButton>
            </div>
          </div>

          <FooterCol title="Servicios" links={footerNav.servicios} />
          <FooterCol title="Recursos" links={footerNav.recursos} />

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Sedes
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {locations.map((loc) => (
                <li key={loc.city}>
                  <a
                    href={loc.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    <span className="font-medium text-white">{loc.city}</span>
                    <span className="block text-white/50">{loc.region}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName} · NIT {siteConfig.nit}. Todos los
            derechos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
