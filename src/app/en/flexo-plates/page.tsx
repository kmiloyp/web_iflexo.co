import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/ui/icons";
import { QuoteForm } from "@/components/landing-en/QuoteForm";
import { WhatsAppLink } from "@/components/landing-en/WhatsAppLink";
import { buildMetadata, absoluteUrl, faqSchema } from "@/lib/seo";
import { siteConfig, whatsapp } from "@/lib/config";

const WA = whatsapp.norteamerica;
const PHONE_DISPLAY = "+1 (305) 518-5306";
const PHONE_TEL = "tel:+13055185306";

const FAQ = [
  {
    q: "How long does shipping to the U.S. take?",
    a: "Plates ship via DHL and arrive in the U.S. in about 48 hours after your files are approved. You get a tracking number the moment they leave our facility.",
  },
  {
    q: "What about customs and duties?",
    a: "We ship DDP-style with all export paperwork handled, so there are no surprises on your end. We'll confirm the exact terms for your shipment when you request a quote.",
  },
  {
    q: "How do I send my files?",
    a: "You send print-ready artwork (PDF or the native files) through our secure link. Our prepress team reviews it, applies the curves for your process, and confirms before we image the plates.",
  },
  {
    q: "How do I start?",
    a: "Start with a single test job. Request a quote, send one file, and compare the plates and the printed result against your current supplier before moving more work over.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Flexo Plates Shipped to the U.S. in 48 Hours | iFlexo",
  description:
    "Flexographic plates for U.S. printers at a lower cost than a local supplier, delivered via DHL in 48 hours. Kodak Flexcel NX with Shine LED. Request a quote.",
  path: "/en/flexo-plates/",
  locale: "en_US",
  alternateLanguages: {
    en: "/en/flexo-plates/",
    es: "/fotopolimeros/",
    "x-default": "/fotopolimeros/",
  },
});

export default function FlexoPlatesLanding() {
  return (
    <div lang="en" className="min-h-dvh bg-paper">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Flexographic plates for U.S. printers",
          serviceType: "Flexographic prepress and plate manufacturing",
          areaServed: "US",
          provider: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          url: absoluteUrl("/en/flexo-plates/"),
        }}
      />
      <JsonLd data={faqSchema(FAQ)} />

      {/* Header mínimo: logo + teléfono + CTA. Sin navegación. */}
      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <Image
            src="/brand/logo-color.png"
            alt="iFlexo"
            width={112}
            height={34}
            priority
            className="h-8 w-auto"
          />
          <div className="flex items-center gap-3">
            <a
              href={PHONE_TEL}
              className="hidden text-sm font-medium text-ink-soft hover:text-ink sm:inline"
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href="#quote"
              className="inline-flex h-9 items-center rounded-full bg-brand-gradient px-5 text-sm font-semibold text-white"
            >
              Request a quote
            </a>
          </div>
        </div>
      </header>

      {/* Hero: copy a la izquierda con los 2 argumentos, formulario a la derecha. */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-25 blur-3xl bg-spectrum"
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_400px] lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
              Flexographic plates for U.S. printers
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Flexographic Plates, Delivered to the U.S. in 48 Hours
            </h1>
            <p className="mt-5 text-lg text-white/75">
              A lower cost than a local U.S. supplier, with the same high-end
              process: Kodak Flexcel NX imaged with Shine&nbsp;LED. You send the
              files, we handle prepress, and DHL delivers your plates in 48 hours.
            </p>

            {/* Los dos argumentos al frente. */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="font-display text-2xl font-extrabold text-white">
                  Lower cost
                </p>
                <p className="mt-1 text-sm text-white/70">
                  Priced well below a local U.S. plate supplier.
                </p>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="font-display text-2xl font-extrabold text-white">
                  48-hour delivery
                </p>
                <p className="mt-1 text-sm text-white/70">
                  Shipped to your door via DHL, with tracking.
                </p>
              </li>
            </ul>
          </div>

          {/* Formulario visible sin scroll, a la derecha. */}
          <div className="lg:pt-2">
            <QuoteForm whatsappUrl={WA} />
          </div>
        </div>
      </section>

      {/* Barra de confianza. */}
      <div className="border-b border-line bg-sand">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-4 text-sm font-medium text-ink-soft sm:px-8">
          <span>48 h delivery via DHL</span>
          <span aria-hidden className="text-line">·</span>
          <span>Lower cost than local</span>
          <span aria-hidden className="text-line">·</span>
          <span>Kodak Flexcel NX</span>
          <span aria-hidden className="text-line">·</span>
          <span>Up to 95% color match</span>
        </div>
      </div>

      {/* Quita la barrera de comprar en el exterior. */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Worried about buying plates abroad? Here&rsquo;s how it works
        </h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Sourcing plates from outside the U.S. sounds risky until you see the
          process. It&rsquo;s built to be simple, fast and low-risk — you can
          prove it with a single job.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Step n="1" title="Send one file">
            Request a quote and send a single print-ready job. Our prepress team
            reviews it and applies the curves for your anilox, ink and substrate.
          </Step>
          <Step n="2" title="We image and ship">
            We image the plates on Kodak Flexcel NX and hand them to DHL. You get
            a tracking number the moment they leave our facility.
          </Step>
          <Step n="3" title="Plates in 48 hours">
            They arrive at your shop in about 48 hours, export paperwork handled.
            Run them, compare, and move more work over when you&rsquo;re ready.
          </Step>
        </div>
        <div className="mt-8">
          <a
            href="#quote"
            className="inline-flex h-12 items-center rounded-full bg-brand-gradient px-8 font-semibold text-white"
          >
            Request a quote
          </a>
        </div>
      </section>

      {/* Beneficios en clave de resultado. */}
      <section className="border-y border-line bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            What you actually get
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Benefit title="Fewer press stops">
              Plates processed with tight quality control hold their detail for
              long runs, so the color stays put and you stop chasing it mid-run.
            </Benefit>
            <Benefit title="Color that matches the proof">
              Up to 95% match between the certified color proof and the printed
              result — your customer approves once and it holds on press.
            </Benefit>
            <Benefit title="One plate, not two">
              High-definition plates deliver dense solids and fine highlights at
              once, so most jobs no longer need a double black.
            </Benefit>
            <Benefit title="Lower total cost">
              A plate priced below your local supplier that also cuts makeready
              and waste — lower cost per thousand, not just per plate.
            </Benefit>
          </div>
        </div>
      </section>

      {/* Resultados reales de clientes en EE.UU. (casos de Miami). */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="text-center font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Results from printers in the U.S.
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <figure className="rounded-2xl border border-line bg-sand p-7">
            <p className="font-display text-3xl font-extrabold text-ink">
              6–7 colors → 4 (CMYK)
            </p>
            <blockquote className="mt-3 text-ink-soft">
              A flexible-packaging converter in Miami used to run jobs with 6 or 7
              spot colors. With our plates and color work, they now produce about
              80% of their jobs in CMYK alone — fewer inks, lower cost.
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              Flexible-packaging converter · Miami, FL
            </figcaption>
          </figure>
          <figure className="rounded-2xl border border-line bg-sand p-7">
            <p className="font-display text-3xl font-extrabold text-ink">
              90%+ match to the proof
            </p>
            <blockquote className="mt-3 text-ink-soft">
              A narrow-web label printer in Miami stabilized its results to within
              90% or more of the certified color proof. Their waste dropped and so
              did the time spent getting jobs approved.
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              Narrow-web label printer · Miami, FL
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FAQ. */}
      <section className="border-t border-line bg-sand">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-paper">
            {FAQ.map((item) => (
              <details key={item.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final. */}
      <section className="bg-ink">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
            Get your plates in 48 hours
          </h2>
          <p className="mt-3 text-white/70">
            Send one test job and see the difference in cost and turnaround.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#quote"
              className="inline-flex h-12 items-center rounded-full bg-brand-gradient px-8 font-semibold text-white"
            >
              Request a quote
            </a>
            <WhatsAppLink
              href={WA}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-8 font-semibold text-white hover:brightness-95"
            >
              <WhatsAppIcon className="h-[1.15em] w-[1.15em]" /> Message us on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </section>

      {/* Footer mínimo. */}
      <footer className="border-t border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-muted sm:flex-row sm:px-8">
          <span>© {siteConfig.name} · Flexographic prepress, Colombia</span>
          <Link href="/politica-de-privacidad/" className="hover:text-ink">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient font-display font-bold text-white">
        {n}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{children}</p>
    </div>
  );
}

function Benefit({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-6">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-ink-soft">{children}</p>
    </div>
  );
}
