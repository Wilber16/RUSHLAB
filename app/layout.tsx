import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartToast } from "@/components/cart/CartToast";
import { shopifyConfigured } from "@/lib/shopify/client";
import "./globals.css";

// Dirección pública de la web, para los enlaces de la imagen al compartir.
// Cuando tengas dominio propio, agrega NEXT_PUBLIC_SITE_URL en Vercel (ej.: https://rushlab.pe).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "RUSH LAB · PCs gamer armadas y probadas",
  description:
    "Componentes, PCs gamer armadas y upgrades con asesoría técnica. Armamos, probamos y enviamos a todo el Perú.",
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "RUSH LAB",
    title: "RUSH LAB · Tu PC gamer, armada y probada",
    description: "Asesoría, armado y pruebas de estabilidad. Envíos a todo el Perú.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#171a20",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,700;1,800&family=Barlow:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <CartProvider enabled={shopifyConfigured()}>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
