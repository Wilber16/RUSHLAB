/**
 * Pide al CDN de Shopify la foto en el ancho exacto que necesita la página,
 * para que las grillas carguen miniaturas livianas.
 * Si la URL no es de Shopify, la devuelve igual.
 */
export function sizedImage(url: string, width: number): string {
  if (!url.includes("cdn.shopify.com")) return url;
  const u = new URL(url);
  u.searchParams.set("width", String(width));
  return u.toString();
}

/** srcset con 1x y 2x para pantallas de alta densidad. */
export function imageSrcSet(url: string, width: number): string | undefined {
  if (!url.includes("cdn.shopify.com")) return undefined;
  return `${sizedImage(url, width)} 1x, ${sizedImage(url, width * 2)} 2x`;
}
