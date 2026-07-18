import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Next.js 16: "Proxy" reemplaza a "Middleware" (misma funcionalidad).
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Solo corre en el área de administración.
  matcher: ["/admin/:path*"],
};
