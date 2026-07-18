"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, AlertTriangle } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import logoColor from "../../../public/brand/logo-color.png";

export default function AdminLoginPage() {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError("Credenciales incorrectas.");
        return;
      }
      router.push("/admin/articulos");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-mist px-5">
      <div className="w-full max-w-sm rounded-3xl border border-line bg-paper p-8 shadow-sm">
        <Image
          src={logoColor}
          alt="iFlexo"
          className="h-8 w-auto"
          priority
        />
        <h1 className="mt-6 font-display text-2xl font-bold tracking-tight">
          Panel de administración
        </h1>
        <p className="mt-1 text-sm text-muted">
          Ingresa para gestionar los artículos del blog.
        </p>

        {!configured && (
          <div className="mt-5 flex gap-2 rounded-xl border border-line bg-sand p-3 text-sm text-ink-soft">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-brand-orange" />
            <span>
              Supabase aún no está configurado. Agrega las variables de entorno
              (<code>NEXT_PUBLIC_SUPABASE_URL</code>, etc.) para habilitar el
              acceso.
            </span>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <input
            type="email"
            required
            placeholder="Correo"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!configured}
            className="h-11 rounded-xl border border-line bg-white px-4 outline-none focus:border-brand-coral disabled:opacity-50"
          />
          <input
            type="password"
            required
            placeholder="Contraseña"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!configured}
            className="h-11 rounded-xl border border-line bg-white px-4 outline-none focus:border-brand-coral disabled:opacity-50"
          />
          {error && <p className="text-sm text-brand-magenta">{error}</p>}
          <button
            type="submit"
            disabled={loading || !configured}
            className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-gradient font-medium text-white disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
