import { cache } from "react";
import type { ProductImage } from "@/lib/catalog/types";
import { shopifyConfigured, shopifyFetch } from "./client";

// Logos de marca cargados en Shopify como metaobjetos:
// Configuración → Datos personalizados → Metaobjetos → "Marca" (tipo: marca)
// con los campos "nombre" (texto) y "logo" (imagen). Solo se leen las fichas en Activo.

const BRANDS_QUERY = /* GraphQL */ `
  query Brands {
    metaobjects(type: "marca", first: 100) {
      nodes {
        handle
        nombre: field(key: "nombre") {
          value
        }
        logo: field(key: "logo") {
          reference {
            ... on MediaImage {
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

type BrandsResponse = {
  metaobjects: {
    nodes: {
      handle: string;
      nombre: { value: string } | null;
      logo: {
        reference: { image?: { url: string; altText: string | null; width: number; height: number } } | null;
      } | null;
    }[];
  };
};

/** Nombre de marca (como en el Proveedor del producto) → logo. Vacío si no hay fichas o falla. */
export const getBrandLogos = cache(async (): Promise<{ name: string; logo: ProductImage }[]> => {
  if (!shopifyConfigured()) return [];
  try {
    const data = await shopifyFetch<BrandsResponse>(BRANDS_QUERY);
    return data.metaobjects.nodes.flatMap((n) => {
      const image = n.logo?.reference?.image;
      const name = n.nombre?.value?.trim() || n.handle;
      if (!image) return [];
      return [{ name, logo: { url: image.url, alt: image.altText || name, width: image.width, height: image.height } }];
    });
  } catch (error) {
    console.error("[marcas] no se pudieron leer los logos de Shopify:", error);
    return [];
  }
});
