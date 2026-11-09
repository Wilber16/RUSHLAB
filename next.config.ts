import type { NextConfig } from "next";

// La web corre en Vercel como sitio dinámico: lee el catálogo de Shopify y
// vuelve a pedirlo cada 5 minutos (ver lib/shopify/client.ts).
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // Las fotos de productos vienen del CDN de Shopify, que ya entrega el tamaño pedido.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
