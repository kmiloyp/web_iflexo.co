"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <Container className="max-w-2xl text-center">
        <p className="font-display text-6xl font-extrabold text-gradient">
          Ups
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Algo salió mal
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Tuvimos un problema al cargar esta página. Puedes reintentar o volver
          al inicio.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-gradient px-8 font-medium text-white"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-line px-8 font-medium hover:bg-sand"
          >
            Ir al inicio
          </a>
        </div>
      </Container>
    </section>
  );
}
