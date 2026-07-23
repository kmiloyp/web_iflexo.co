"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitLead, type ContactState } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-gradient px-8 font-medium text-white shadow-[0_8px_24px_-8px_rgba(238,63,109,0.55)] transition-all hover:-translate-y-0.5 disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" /> Enviando…
        </>
      ) : (
        "Enviar mensaje"
      )}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-brand-coral">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={cn(
          "h-11 w-full rounded-xl border bg-white px-4 text-ink outline-none transition-colors placeholder:text-muted focus:border-brand-coral",
          error ? "border-brand-magenta" : "border-line"
        )}
      />
      {error && <span className="mt-1 block text-sm text-brand-magenta">{error}</span>}
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="h-11 w-full rounded-xl border border-line bg-white px-3 text-ink outline-none transition-colors focus:border-brand-coral"
      >
        <option value="">Selecciona…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ContactForm({ origen }: { origen?: string }) {
  const [state, formAction] = useActionState(submitLead, initial);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-sand p-10 text-center">
        <CheckCircle2 className="text-spectrum-green" size={40} />
        <h3 className="font-display text-xl font-semibold">¡Mensaje enviado!</h3>
        <p className="max-w-md text-ink-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4" noValidate>
      <input type="hidden" name="origen" value={origen ?? ""} />
      {/* Honeypot — oculto para humanos */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" name="nombre" required autoComplete="name" error={state.errors?.nombre} />
        <Field label="Empresa" name="empresa" autoComplete="organization" error={state.errors?.empresa} />
        <Field label="Correo" name="correo" type="email" required autoComplete="email" error={state.errors?.correo} />
        <Field label="Teléfono" name="telefono" type="tel" required autoComplete="tel" error={state.errors?.telefono} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Ciudad" name="ciudad" autoComplete="address-level2" error={state.errors?.ciudad} />
        <SelectField
          label="Tipo de impresión"
          name="tipo_impresion"
          options={[
            { value: "banda-angosta", label: "Banda angosta / etiquetas" },
            { value: "banda-ancha", label: "Banda ancha / empaque" },
            { value: "otro", label: "Otro" },
          ]}
        />
        <SelectField
          label="¿Qué necesitas?"
          name="necesidad"
          options={[
            { value: "planchas", label: "Planchas / fotopolímeros" },
            { value: "prueba-de-color", label: "Prueba de color" },
            { value: "reduccion-de-color", label: "Reducción de color" },
            { value: "servicios-graficos", label: "Servicios gráficos" },
            { value: "asesoria", label: "Asesoría" },
          ]}
        />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">
          Mensaje <span className="text-brand-coral">*</span>
        </span>
        <textarea
          name="mensaje"
          required
          rows={5}
          placeholder="Cuéntanos qué necesitas: tipo de trabajo, medidas, colores, sustrato…"
          className={cn(
            "w-full resize-y rounded-xl border bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-brand-coral",
            state.errors?.mensaje ? "border-brand-magenta" : "border-line"
          )}
        />
        {state.errors?.mensaje && (
          <span className="mt-1 block text-sm text-brand-magenta">{state.errors.mensaje}</span>
        )}
      </label>

      {state.status === "error" && state.message && (
        <p className="flex items-center gap-2 text-sm text-brand-magenta">
          <AlertCircle size={16} /> {state.message}
        </p>
      )}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <SubmitButton />
        <p className="text-xs text-muted">
          Al enviar aceptas nuestra{" "}
          <Link href="/politica-de-privacidad/" className="underline">
            política de privacidad
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
