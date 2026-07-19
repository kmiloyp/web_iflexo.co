"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/Logo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { mainNav, type NavItem } from "@/lib/config";
import { cn } from "@/lib/utils";

const hasChildren = (
  item: NavItem
): item is { label: string; children: { label: string; href: string }[] } =>
  "children" in item;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const groupActive = (item: NavItem) =>
    hasChildren(item) && item.children.some((c) => isActive(c.href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-paper"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo priority />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            hasChildren(item) ? (
              <li key={item.label} className="group relative">
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    groupActive(item) ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className="transition-transform group-hover:rotate-180"
                  />
                </button>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="w-60 rounded-2xl border border-line bg-paper p-2 shadow-xl">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className={cn(
                            "block rounded-xl px-3 py-2 text-sm transition-colors",
                            isActive(c.href)
                              ? "bg-mist text-ink"
                              : "text-ink-soft hover:bg-mist hover:text-ink"
                          )}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(item.href) ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="hidden lg:block">
          <WhatsAppButton size="sm">WhatsApp</WhatsAppButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-ink lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-line bg-paper lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {mainNav.map((item) =>
              hasChildren(item) ? (
                <li key={item.label}>
                  <button
                    onClick={() =>
                      setMobileSub((s) => (s === item.label ? null : item.label))
                    }
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[0.95rem] font-medium text-muted"
                    aria-expanded={mobileSub === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform",
                        mobileSub === item.label && "rotate-180"
                      )}
                    />
                  </button>
                  {mobileSub === item.label && (
                    <ul className="ml-3 border-l border-line pl-3">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={cn(
                              "block rounded-xl px-3 py-2 text-[0.95rem]",
                              isActive(c.href)
                                ? "bg-mist text-ink"
                                : "text-muted"
                            )}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 text-[0.95rem] font-medium",
                      isActive(item.href) ? "bg-mist text-ink" : "text-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
            <li className="pt-2">
              <WhatsAppButton size="md" className="w-full">
                Escríbenos por WhatsApp
              </WhatsAppButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
