import type { MetadataRoute } from "next";
import { getAllBuilds, getAllProducts, getShopAreas } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 3600;

const STATIC_PAGES = [
  "/",
  "/areas/",
  "/pc-armadas/",
  "/upgrades/",
  "/rush-build/",
  "/ofertas/",
  "/nosotros/",
  "/contacto/",
  "/politicas/",
  "/politicas/envios/",
  "/politicas/garantia/",
  "/politicas/devoluciones/",
  "/politicas/terminos/",
  "/politicas/privacidad/",
  "/libro-de-reclamaciones/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [areas, products, builds] = await Promise.all([getShopAreas(), getAllProducts(), getAllBuilds()]);
  const now = new Date();
  return [
    ...STATIC_PAGES.map((p) => ({ url: absoluteUrl(p), lastModified: now, priority: p === "/" ? 1 : 0.5 })),
    ...areas.map((a) => ({ url: absoluteUrl(`/areas/${a.slug}/`), lastModified: now, priority: 0.8 })),
    ...builds.map((b) => ({ url: absoluteUrl(`/pc-armadas/${b.slug}/`), lastModified: now, priority: 0.8 })),
    ...products.map((p) => ({ url: absoluteUrl(`/producto/${p.slug}/`), lastModified: now, priority: 0.7 })),
  ];
}
