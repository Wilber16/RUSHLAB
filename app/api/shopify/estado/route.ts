// Diagnóstico de la conexión con Shopify: /api/shopify/estado/
// No muestra tokens ni datos de clientes; solo si la conexión funciona y qué falta configurar.

import { NextResponse } from "next/server";
import { shopifyConfigured, shopifyFetch, SHOPIFY_API_VERSION, ShopifyError } from "@/lib/shopify/client";
import { AREA_HANDLES } from "@/lib/shopify/catalog";
import { getCatalog } from "@/lib/catalog";

export const dynamic = "force-dynamic";

const QUERY = /* GraphQL */ `
  {
    shop {
      name
      paymentSettings {
        currencyCode
      }
    }
    collections(first: 50) {
      nodes {
        handle
        title
        products(first: 1) {
          nodes {
            handle
          }
        }
      }
    }
    products(first: 1) {
      nodes {
        variants(first: 1) {
          nodes {
            quantityAvailable
          }
        }
      }
    }
  }
`;

interface Diag {
  shop: { name: string; paymentSettings: { currencyCode: string } };
  collections: { nodes: { handle: string; title: string; products: { nodes: { handle: string }[] } }[] };
  products: { nodes: { variants: { nodes: { quantityAvailable: number | null }[] } }[] };
}

export async function GET() {
  const pendientes: string[] = [];

  if (!shopifyConfigured()) {
    return NextResponse.json({
      configurado: false,
      conectado: false,
      pendientes: ["Crear SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_TOKEN en Vercel y volver a publicar."],
    });
  }

  try {
    const data = await shopifyFetch<Diag>(QUERY, {}, { cache: "no-store" });
    const handles = data.collections.nodes.map((c) => c.handle);
    const faltan = AREA_HANDLES.filter((h) => !handles.includes(h));
    const catalog = await getCatalog();

    if (data.shop.paymentSettings.currencyCode !== "PEN") {
      pendientes.push(`La moneda de la tienda es ${data.shop.paymentSettings.currencyCode}; debería ser PEN (Sol peruano).`);
    }
    if (faltan.length) pendientes.push(`Crear las colecciones con estos identificadores: ${faltan.join(", ")}.`);
    if (catalog.source === "sample") {
      pendientes.push("Todavía no hay productos dentro de las colecciones de las áreas; la web muestra los de ejemplo.");
    }
    const sample = data.products.nodes.at(0)?.variants.nodes.at(0);
    if (sample && sample.quantityAvailable === null) {
      pendientes.push("Activar el permiso unauthenticated_read_product_inventory en la API Storefront.");
    }

    return NextResponse.json({
      configurado: true,
      conectado: true,
      versionApi: SHOPIFY_API_VERSION,
      tienda: data.shop.name,
      moneda: data.shop.paymentSettings.currencyCode,
      colecciones: data.collections.nodes.map((c) => ({
        identificador: c.handle,
        nombre: c.title,
        esArea: AREA_HANDLES.includes(c.handle as (typeof AREA_HANDLES)[number]),
        tieneProductos: c.products.nodes.length > 0,
      })),
      fuenteDelCatalogo: catalog.source === "shopify" ? "Shopify" : "Datos de ejemplo",
      productosEnLaWeb: catalog.products.length,
      pendientes,
    });
  } catch (e) {
    const err = e as ShopifyError;
    return NextResponse.json(
      {
        configurado: true,
        conectado: false,
        tipoDeError: err.kind ?? "desconocido",
        detalle: err.message,
        pendientes: ["Revisar que el dominio .myshopify.com y el token público sean correctos."],
      },
      { status: 200 },
    );
  }
}
