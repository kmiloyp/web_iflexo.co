"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "iflexo-cookie-consent";

/**
 * Banner de consentimiento alineado a la Ley 1581 de Colombia.
 * No carga scripts no esenciales hasta que el usuario acepta.
 * (Los scripts condicionados leerán window.__iflexoConsent === "accepted".)
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // Init client-only según consentimiento guardado (patrón intencional).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!stored) setVisible(true);
      else
        (window as unknown as { __iflexoConsent?: string }).__iflexoConsent =
          stored;
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* almacenamiento no disponible */
    }
    (window as unknown as { __iflexoConsent?: string }).__iflexoConsent = value;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-line bg-paper/95 p-5 shadow-xl backdrop-blur sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2">
      <p className="text-sm leading-relaxed text-ink-soft">
        Usamos cookies para mejorar tu experiencia y analizar el tráfico. Puedes
        aceptarlas o rechazar las no esenciales. Consulta nuestra{" "}
        <Link href="/politica-de-cookies/" className="text-brand-coral underline">
          política de cookies
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          onClick={() => decide("rejected")}
          className="h-10 rounded-full border border-line px-5 text-sm font-medium text-ink hover:bg-sand"
        >
          Rechazar no esenciales
        </button>
        <button
          onClick={() => decide("accepted")}
          className="h-10 rounded-full bg-brand-gradient px-5 text-sm font-medium text-white"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
