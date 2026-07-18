import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // WordPress used trailing slashes (/nosotros/). Keep 1:1 to preserve SEO.
  trailingSlash: true,
  reactStrictMode: true,
  // Fija la raíz del workspace (hay un lockfile suelto en el home del usuario).
  turbopack: { root: path.resolve() },
  outputFileTracingRoot: path.resolve(),
  images: {
    remotePatterns: [
      // Reuse existing media from the live WordPress during migration.
      { protocol: "https", hostname: "iflexo.co" },
      // Supabase Storage (article cover images, etc.).
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async redirects() {
    // Any URL that changes vs. the old site gets a 301 here.
    // (Kept empty on purpose: current routes are preserved 1:1.)
    return [];
  },
};

export default nextConfig;
