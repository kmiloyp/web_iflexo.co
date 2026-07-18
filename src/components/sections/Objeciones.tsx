"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export type Objecion = { objecion: string; respuesta: string };

/** Acordeón de objeciones: la objeción en palabras del cliente + la respuesta. */
export function Objeciones({
  eyebrow = "Lo que nos dicen antes de probarnos",
  title = "Objeciones honestas, respuestas honestas",
  items,
}: {
  eyebrow?: string;
  title?: string;
  items: Objecion[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.objecion}
                className="overflow-hidden rounded-2xl border border-line bg-paper"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-ink sm:text-lg">
                    “{item.objecion}”
                  </span>
                  <Plus
                    size={20}
                    className={cn(
                      "shrink-0 text-brand-coral transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="px-6 pb-5 leading-relaxed text-ink-soft">
                      {item.respuesta}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
