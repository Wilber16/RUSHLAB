import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/carrito/", "/buscar/", "/comparar/", "/seguimiento/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
