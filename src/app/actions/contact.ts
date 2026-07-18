"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { Resend } from "resend";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/config";

const leadSchema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre").max(120),
  empresa: z.string().max(160).optional().or(z.literal("")),
  correo: z.string().email("Correo no válido").max(160),
  telefono: z.string().min(6, "Teléfono no válido").max(40),
  mensaje: z.string().min(5, "Cuéntanos un poco más").max(2000),
  origen: z.string().max(160).optional().or(z.literal("")),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export async function submitLead(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot anti-spam: campo oculto que un humano no llena.
  if ((formData.get("website") as string)?.trim()) {
    return { status: "success", message: "¡Gracias! Te contactaremos pronto." };
  }

  // Rate-limit por IP (best-effort): máx. 5 envíos por minuto.
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    "anon";
  if (!rateLimit(`contact:${ip}`, { max: 5, windowMs: 60_000 }).ok) {
    return {
      status: "error",
      message: "Demasiados envíos. Espera un momento e inténtalo de nuevo.",
    };
  }

  const parsed = leadSchema.safeParse({
    nombre: formData.get("nombre"),
    empresa: formData.get("empresa"),
    correo: formData.get("correo"),
    telefono: formData.get("telefono"),
    mensaje: formData.get("mensaje"),
    origen: formData.get("origen"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] as string] = issue.message;
    }
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      errors,
    };
  }

  const lead = parsed.data;

  // 1) Guardar el lead en Supabase (insert solo desde el servidor).
  if (isAdminConfigured()) {
    try {
      const supabase = createAdminClient();
      const { error } = await supabase.from("leads").insert({
        nombre: lead.nombre,
        empresa: lead.empresa || null,
        correo: lead.correo,
        telefono: lead.telefono,
        mensaje: lead.mensaje,
        origen: lead.origen || null,
      });
      if (error) console.error("[contact] supabase insert:", error.message);
    } catch (e) {
      console.error("[contact] supabase error:", e);
    }
  } else {
    console.warn("[contact] Supabase no configurado — lead no persistido:", {
      correo: lead.correo,
    });
  }

  // 2) Notificar por correo con Resend.
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL ?? "web@iflexo.co",
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: lead.correo,
        subject: `Nuevo contacto: ${lead.nombre}${lead.empresa ? ` (${lead.empresa})` : ""}`,
        text: [
          `Nombre: ${lead.nombre}`,
          `Empresa: ${lead.empresa || "-"}`,
          `Correo: ${lead.correo}`,
          `Teléfono: ${lead.telefono}`,
          `Origen: ${lead.origen || "-"}`,
          "",
          lead.mensaje,
        ].join("\n"),
      });
    } catch (e) {
      console.error("[contact] resend error:", e);
    }
  } else {
    console.warn(`[contact] Resend no configurado — sin correo a ${siteConfig.email}`);
  }

  return {
    status: "success",
    message: "¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.",
  };
}
