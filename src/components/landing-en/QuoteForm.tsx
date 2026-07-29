"use client";

import { useActionState, useEffect } from "react";
import { submitQuote, type QuoteState } from "@/app/actions/quote";

const initial: QuoteState = { status: "idle" };

// Google Ads / gtag global opcional (se declara para TS; puede no existir).
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    /** Hook de conversión que puedes definir con tu snippet de Google Ads. */
    iflexoAdsConversion?: () => void;
  }
}

export function QuoteForm({ whatsappUrl }: { whatsappUrl: string }) {
  const [state, action, pending] = useActionState(submitQuote, initial);

  // Dispara el evento de conversión de Google Ads al recibir un envío exitoso.
  useEffect(() => {
    if (state.status !== "success") return;
    // Opción A: hook propio que defines con tu snippet de Ads.
    window.iflexoAdsConversion?.();
    // Opción B: gtag directo. PENDIENTE: reemplaza AW-XXXXXXXXX/YYYY por tu
    // ID + etiqueta de conversión de Google Ads.
    window.gtag?.("event", "conversion", {
      send_to: "AW-XXXXXXXXX/YYYY", // [DATO PENDIENTE: ID de conversión de Ads]
    });
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-xl">
        <div
          aria-hidden
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-spectrum-green/15 text-2xl text-spectrum-green"
        >
          ✓
        </div>
        <h2 className="mt-4 font-display text-xl font-bold text-ink">
          Request received
        </h2>
        <p className="mt-2 text-ink-soft">{state.message}</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-line px-6 text-sm font-medium hover:bg-sand"
        >
          Or message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      id="quote"
      action={action}
      className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 shadow-xl sm:p-7"
      noValidate
    >
      <h2 className="font-display text-xl font-bold text-ink">Request a quote</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Reply within one business day. No obligation.
      </p>

      {/* Honeypot (oculto). */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="mt-5 grid gap-4">
        <Field label="Name" name="name" error={state.errors?.name} autoComplete="name" required />
        <Field label="Company" name="company" error={state.errors?.company} autoComplete="organization" />
        <Field label="Email" name="email" type="email" error={state.errors?.email} autoComplete="email" required />
        <Field label="Phone / WhatsApp" name="phone" type="tel" error={state.errors?.phone} autoComplete="tel" required />

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">
            What do you print? <span className="text-brand-coral">*</span>
          </span>
          <select
            name="prints"
            required
            defaultValue=""
            className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-brand-coral"
          >
            <option value="" disabled>
              Select one…
            </option>
            <option value="labels">Labels</option>
            <option value="flexible-packaging">Flexible packaging</option>
            <option value="carton">Carton / folding carton</option>
            <option value="other">Other</option>
          </select>
          {state.errors?.prints && (
            <span className="mt-1 block text-xs text-brand-magenta">
              {state.errors.prints}
            </span>
          )}
        </label>
      </div>

      {state.status === "error" && state.message && (
        <p className="mt-4 text-sm text-brand-magenta">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-gradient text-base font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Sending…" : "Request a quote"}
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-line text-sm font-medium hover:bg-sand"
      >
        Prefer WhatsApp? Message us
      </a>

      <p className="mt-3 text-center text-xs text-muted">
        We reply from Colombia · Plates shipped to the U.S. via DHL in 48 h.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-brand-coral">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-brand-coral"
      />
      {error && (
        <span className="mt-1 block text-xs text-brand-magenta">{error}</span>
      )}
    </label>
  );
}
