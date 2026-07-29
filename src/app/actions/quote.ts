"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { Resend } from "resend";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/config";

/**
 * Lead de la landing de conversión en inglés (/en/flexo-plates/, tráfico de
 * Google Ads). Reutiliza la tabla `leads` y Resend, pero con un formulario
 * corto en inglés. El evento de conversión de Ads se dispara en el cliente
 * (ver QuoteForm) al recibir status "success".
 */

const PRINTS = {
  labels: "Labels",
  "flexible-packaging": "Flexible packaging",
  carton: "Carton / folding carton",
  other: "Other",
} as const;

const quoteSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  company: z.string().max(160).optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email").max(160),
  phone: z.string().min(6, "Please enter a valid phone/WhatsApp").max(40),
  prints: z.enum(["labels", "flexible-packaging", "carton", "other"]),
});

export type QuoteState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData
): Promise<QuoteState> {
  // Honeypot anti-spam.
  if ((formData.get("website") as string)?.trim()) {
    return { status: "success", message: "Thanks! We'll be in touch shortly." };
  }

  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    "anon";
  if (!rateLimit(`quote:${ip}`, { max: 5, windowMs: 60_000 }).ok) {
    return { status: "error", message: "Too many attempts. Please wait a moment." };
  }

  const parsed = quoteSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    prints: formData.get("prints"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] as string] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", errors };
  }

  const q = parsed.data;
  const printsLabel = PRINTS[q.prints];
  // Mapea "what do you print" al enum interno de tipo_impresion.
  const tipo_impresion =
    q.prints === "labels"
      ? "banda-angosta"
      : q.prints === "flexible-packaging"
        ? "banda-ancha"
        : "otro";

  // 1) Guardar el lead en Supabase.
  if (isAdminConfigured()) {
    try {
      const supabase = createAdminClient();
      const base = {
        nombre: q.name,
        empresa: q.company || null,
        correo: q.email,
        telefono: q.phone,
        mensaje: `Quote request (US / Google Ads landing). Prints: ${printsLabel}.`,
        origen: "en/flexo-plates",
      };
      const { error } = await supabase.from("leads").insert({
        ...base,
        ciudad: "United States",
        tipo_impresion,
        necesidad: "planchas",
      });
      if (error) {
        const { error: e2 } = await supabase.from("leads").insert(base);
        if (e2) console.error("[quote] supabase insert:", e2.message);
      }
    } catch (e) {
      console.error("[quote] supabase error:", e);
    }
  } else {
    console.warn("[quote] Supabase not configured — lead not persisted:", {
      email: q.email,
    });
  }

  // 2) Notificar por correo con Resend.
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL ?? "web@iflexo.co",
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: q.email,
        subject: `US quote request: ${q.name}${q.company ? ` (${q.company})` : ""}`,
        text: [
          "New quote request from the US landing (Google Ads).",
          "",
          `Name: ${q.name}`,
          `Company: ${q.company || "-"}`,
          `Email: ${q.email}`,
          `Phone/WhatsApp: ${q.phone}`,
          `Prints: ${printsLabel}`,
          `Source: en/flexo-plates`,
        ].join("\n"),
      });
    } catch (e) {
      console.error("[quote] resend error:", e);
    }
  } else {
    console.warn(`[quote] Resend not configured — no email to ${siteConfig.email}`);
  }

  return {
    status: "success",
    message: "Thanks! We received your request and will reply within one business day.",
  };
}
