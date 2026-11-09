import type { NextConfig } from "next";

// Por ahora la web se exporta como sitio estático (rápido y gratis en Vercel).
// Cuando conectemos Shopify como back, quitaremos `output: "export"` para
// poder usar rutas de servidor (carrito, checkout, panel de administración).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
