"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function FAQ({
  items,
  title = "Preguntas frecuentes",
  eyebrow = "Resolvemos tus dudas",
}: {
  items: { q: string; a: string }[];
  title?: string;
  eyebrow?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="bg-sand">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>

        <dl className="mt-10 divide-y divide-line rounded-2xl border border-line bg-paper">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="px-5 sm:px-7">
                <dt>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-semibold text-ink sm:text-lg">
                      {item.q}
                    </span>
                    <Plus
                      size={20}
                      className={cn(
                        "shrink-0 text-brand-coral transition-transform duration-300",
                        isOpen && "rotate-45"
                      )}
                    />
                  </button>
                </dt>
                <dd
                  className={cn(
                    "grid overflow-hidden text-ink-soft transition-all duration-300",
                    isOpen
                      ? "grid-rows-[1fr] pb-5 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="min-h-0 leading-relaxed">{item.a}</div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </Section>
  );
}
