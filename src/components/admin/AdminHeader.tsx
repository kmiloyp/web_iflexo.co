"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, Plus } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import logoColor from "../../../public/brand/logo-color.png";

export function AdminHeader() {
  const router = useRouter();

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      await createClient().auth.signOut();
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/articulos">
            <Image src={logoColor} alt="iFlexo" className="h-7 w-auto" priority />
          </Link>
          <span className="hidden text-sm font-medium text-muted sm:inline">
            Panel de administración
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/articulos/nuevo"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-gradient px-4 text-sm font-medium text-white"
          >
            <Plus size={16} /> Nuevo
          </Link>
          <button
            onClick={signOut}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium hover:bg-sand"
          >
            <LogOut size={15} /> Salir
          </button>
        </div>
      </div>
    </header>
  );
}
