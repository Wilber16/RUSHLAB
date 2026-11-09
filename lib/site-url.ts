// Dirección pública de la web. Cuando tengas dominio propio, agrega
// NEXT_PUBLIC_SITE_URL en Vercel (ej.: https://rushlab.pe) y todo se actualiza solo.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
