import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { getCategory } from "@/lib/config";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  title: string;
  category: string;
  slug: string;
  status: "draft" | "published";
  updated_at: string | null;
};

export default async function ArticlesListPage() {
  let rows: Row[] = [];
  let configError = false;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles")
      .select("id, title, category, slug, status, updated_at")
      .order("updated_at", { ascending: false });
    rows = (data as Row[]) ?? [];
  } else {
    configError = true;
  }

  return (
    <div className="min-h-dvh bg-mist">
      <AdminHeader />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Artículos
          </h1>
        </div>

        {configError ? (
          <div className="mt-6 rounded-2xl border border-line bg-white p-6 text-ink-soft">
            Supabase no está configurado. Agrega las variables de entorno para
            gestionar artículos. Puedes usar el{" "}
            <Link href="/admin/articulos/nuevo" className="text-brand-coral underline">
              generador
            </Link>{" "}
            para probar el flujo con el stub.
          </div>
        ) : rows.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-line bg-white p-10 text-center">
            <p className="text-ink-soft">Aún no hay artículos.</p>
            <Link
              href="/admin/articulos/nuevo"
              className="mt-4 inline-flex h-10 items-center rounded-full bg-brand-gradient px-5 text-sm font-medium text-white"
            >
              Generar el primero
            </Link>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3">Título</th>
                  <th className="px-5 py-3">Categoría</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3">Actualizado</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-sand/50">
                    <td className="px-5 py-3 font-medium">{r.title}</td>
                    <td className="px-5 py-3 text-muted">
                      {getCategory(r.category)?.name ?? r.category}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={
                          r.status === "published"
                            ? "rounded-full bg-spectrum-green/15 px-2.5 py-1 text-xs font-semibold text-spectrum-green"
                            : "rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-muted"
                        }
                      >
                        {r.status === "published" ? "Publicado" : "Borrador"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {r.updated_at ? formatDate(r.updated_at) : "—"}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/articulos/${r.id}/editar`}
                        className="font-medium text-brand-coral"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
