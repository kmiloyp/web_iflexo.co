import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // WordPress used trailing slashes (/nosotros/). Keep 1:1 to preserve SEO.
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    // Sube el límite por defecto (1 MB) de las Server Actions.
    serverActions: { bodySizeLimit: "4mb" },
  },
  // Fija la raíz del workspace (hay un lockfile suelto en el home del usuario).
  turbopack: { root: path.resolve() },
  outputFileTracingRoot: path.resolve(),
  images: {
    remotePatterns: [
      // Reuse existing media from the live WordPress during migration.
      { protocol: "https", hostname: "iflexo.co" },
      // Supabase Storage (article cover images, etc.).
      { protocol: "https", hostname: "*.supabase.co" },
      // Miniaturas de YouTube (testimonio en video).
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async redirects() {
    // Any URL that changes vs. the old site gets a 301 here.
    // (Kept empty on purpose: current routes are preserved 1:1.)
    return [];
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    // CSP: se aplica solo en producción (en dev rompería el HMR de Next).
    // Permite: propio origen, Supabase, YouTube (nocookie) e imágenes de yt.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://*.supabase.co https://iflexo.co https://i.ytimg.com https://img.youtube.com",
      "font-src 'self'",
      "connect-src 'self' https://*.supabase.co https://*.vercel-insights.com",
      "frame-src 'self' https://www.youtube-nocookie.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
    ];

    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
