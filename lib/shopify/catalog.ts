// Lee el catálogo de Shopify y lo convierte al formato que usan las páginas.
//
// Cómo se mapea cada producto de Shopify:
//   Título             -> name
//   Proveedor (vendor) -> brand
//   Tipo de producto   -> kind  (ej.: "Tarjeta gráfica", "Procesador")
//   Colección          -> area  (su identificador: rush-power, hyperspeed, ...)
//   Metacampo custom.specs (lista de texto) -> specs; si no existe, se usan las etiquetas
//   Precio / precio de comparación de la primera variante
//   Disponibilidad: con stock -> in_stock; sin stock pero "continuar vendiendo" -> on_order; no vendible -> sold_out

import { cache } from "react";
import type { AreaSlug, Availability, Product, ProductImage } from "@/lib/catalog/types";
import { shopifyFetch } from "./client";

export const AREA_HANDLES: AreaSlug[] = ["rush-power", "hyperspeed", "the-lab", "control-room", "gaming-arsenal"];

const PRODUCTS_QUERY = /* GraphQL */ `
  query Catalog($cursor: String) {
    products(first: 100, after: $cursor, sortKey: TITLE) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        handle
        title
        vendor
        productType
        tags
        availableForSale
        collections(first: 10) {
          nodes {
            handle
          }
        }
        specs: metafield(namespace: "custom", key: "specs") {
          value
        }
        featuredImage {
          url
          altText
          width
          height
        }
        images(first: 8) {
          nodes {
            url
            altText
            width
            height
          }
        }
        variants(first: 1) {
          nodes {
            id
            availableForSale
            currentlyNotInStock
            quantityAvailable
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
            }
          }
        }
      }
    }
  }
`;

interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

interface ShopifyProductNode {
  handle: string;
  title: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  collections: { nodes: { handle: string }[] };
  specs: { value: string } | null;
  featuredImage: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      currentlyNotInStock: boolean;
      quantityAvailable: number | null;
      price: { amount: string; currencyCode: string };
      compareAtPrice: { amount: string } | null;
    }[];
  };
}

interface CatalogResponse {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: ShopifyProductNode[];
  };
}

function toImage(img: ShopifyImage | null, fallbackAlt: string): ProductImage | undefined {
  if (!img) return undefined;
  return { url: img.url, alt: img.altText ?? fallbackAlt, width: img.width ?? undefined, height: img.height ?? undefined };
}

function parseSpecs(node: ShopifyProductNode): string[] {
  if (node.specs?.value) {
    try {
      const parsed = JSON.parse(node.specs.value);
      if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean).slice(0, 4);
    } catch {
      // Texto simple separado por comas o líneas
      return node.specs.value
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 4);
    }
  }
  // Etiquetas visibles (las internas empiezan con "_" o "area:")
  return node.tags.filter((t) => !t.startsWith("_") && !t.includes(":")).slice(0, 3);
}

function availability(node: ShopifyProductNode): Availability {
  const v = node.variants.nodes.at(0);
  if (!v || !v.availableForSale || !node.availableForSale) return "sold_out";
  if (v.currentlyNotInStock) return "on_order";
  if (v.quantityAvailable !== null && v.quantityAvailable <= 0) return "on_order";
  return "in_stock";
}

// Tipo de producto → nombre bien escrito y área. Así "REFRIGERACION", "refrigeracion"
// o "Refrigeración" funcionan igual aunque la colección de Shopify no lo atrape.
const KINDS: Record<string, { label: string; area: AreaSlug }> = {
  "tarjeta grafica": { label: "Tarjeta gráfica", area: "rush-power" },
  procesador: { label: "Procesador", area: "rush-power" },
  "memoria ram": { label: "Memoria RAM", area: "hyperspeed" },
  ssd: { label: "SSD", area: "hyperspeed" },
  "placa madre": { label: "Placa madre", area: "the-lab" },
  "fuente de poder": { label: "Fuente de poder", area: "the-lab" },
  gabinete: { label: "Gabinete", area: "the-lab" },
  refrigeracion: { label: "Refrigeración", area: "the-lab" },
  monitor: { label: "Monitor", area: "control-room" },
  teclado: { label: "Teclado", area: "gaming-arsenal" },
  mouse: { label: "Mouse", area: "gaming-arsenal" },
  audifonos: { label: "Audífonos", area: "gaming-arsenal" },
  accesorio: { label: "Accesorio", area: "gaming-arsenal" },
};

const kindKey = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

export function mapProduct(node: ShopifyProductNode): Product | null {
  const known = KINDS[kindKey(node.productType || "")];
  const area =
    node.collections.nodes.map((c) => c.handle).find((h): h is AreaSlug => AREA_HANDLES.includes(h as AreaSlug)) ??
    known?.area;
  const v = node.variants.nodes.at(0);
  if (!area || !v) return null; // fuera de las áreas del laboratorio o sin precio

  // Se conservan los céntimos (ej.: 2499.90)
  const price = Number(v.price.amount);
  const compare = v.compareAtPrice ? Number(v.compareAtPrice.amount) : undefined;
  const images = node.images.nodes.map((i) => toImage(i, node.title)).filter((i): i is ProductImage => Boolean(i));

  return {
    slug: node.handle,
    area,
    brand: node.vendor || "RUSH LAB",
    kind: known?.label ?? (node.productType || "Accesorio"),
    name: node.title,
    specs: parseSpecs(node),
    price,
    compareAtPrice: compare && compare > price ? compare : undefined,
    availability: availability(node),
    priceIsExample: false,
    image: toImage(node.featuredImage, node.title) ?? images.at(0),
    images,
    variantId: v.id,
  };
}

/** Todos los productos de Shopify que pertenecen a un área. Se cachea por solicitud. */
export const getShopifyProducts = cache(async (): Promise<Product[]> => {
  const all: Product[] = [];
  let cursor: string | null = null;
  for (let page = 0; page < 10; page++) {
    const data: CatalogResponse = await shopifyFetch<CatalogResponse>(PRODUCTS_QUERY, { cursor });
    for (const node of data.products.nodes) {
      const p = mapProduct(node);
      if (p) all.push(p);
    }
    if (!data.products.pageInfo.hasNextPage) break;
    cursor = data.products.pageInfo.endCursor;
  }
  return all;
});
