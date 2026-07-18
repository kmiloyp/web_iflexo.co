"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ChatbotSlot } from "@/components/ChatbotSlot";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/seo";

/**
 * Muestra el chrome del sitio (nav, footer, chatbot, cookies) en las páginas
 * públicas y lo oculta en el panel de administración (/admin).
 */
export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <main className="min-h-dvh">{children}</main>;

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <Nav />
      <main>{children}</main>
      <Footer />
      <ChatbotSlot />
      <CookieBanner />
    </>
  );
}
