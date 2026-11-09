// Única puerta de entrada a los datos del catálogo.
//
// Fuente de los productos:
//   - Si Shopify está configurado y tiene al menos un producto en alguna área,
//     se usa SOLO Shopify (precios, stock y fotos reales).
//   - Si no (sin variables, sin productos o con un error de conexión),
//     se usan los datos de ejemplo para que la web nunca quede vacía.
// Las áreas, los textos y los armados siguen en sample-data.ts.

import { cache } from "react";
import type { Build, LabArea, Product } from "./types";
import { builds, labAreas, products as sampleProducts } from "./sample-data";
import { getShopifyProducts } from "@/lib/shopify/catalog";
import { shopifyConfigured } from "@/lib/shopify/client";

export type CatalogSource = "shopify" | "sample";

/** Productos y su origen. Se calcula una vez por solicitud. */
export const getCatalog = cache(async (): Promise<{ source: CatalogSource; products: Product[]; error?: string }> => {
  if (!shopifyConfigured()) return { source: "sample", products: sampleProducts };
  try {
    const live = await getShopifyProducts();
    if (live.length > 0) return { source: "shopify", products: live };
    return { source: "sample", products: sampleProducts };
  } catch (e) {
    // Nunca romper la página por un problema con Shopify: se registra y se usan los de ejemplo
    console.error("[catalogo] Shopify no respondió, se usan datos de ejemplo:", (e as Error).message);
    return { source: "sample", products: sampleProducts, error: (e as Error).message };
  }
});

async function allProducts(): Promise<Product[]> {
  return (await getCatalog()).products;
}

/** Todas las tarjetas del inicio, incluido el acceso a RUSH BUILD. */
export async function getLabAreas(): Promise<LabArea[]> {
  return labAreas;
}

/** Solo las áreas que tienen productos (sin RUSH BUILD). */
export async function getShopAreas(): Promise<LabArea[]> {
  return labAreas.filter((a) => a.icon !== "build");
}

export async function getAreaBySlug(slug: string): Promise<LabArea | undefined> {
  return labAreas.find((a) => a.slug === slug && a.icon !== "build");
}

export async function getProductsByArea(slug: string): Promise<Product[]> {
  return (await allProducts()).filter((p) => p.area === slug);
}

export async function getProductCount(slug: string): Promise<number> {
  return (await getProductsByArea(slug)).length;
}

export async function getAllProducts(): Promise<Product[]> {
  return allProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (await allProducts()).find((p) => p.slug === slug);
}

/** Productos de la misma área, primero los del mismo tipo, sin agotados. */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return (await allProducts())
    .filter((p) => p.area === product.area && p.slug !== product.slug && p.availability !== "sold_out")
    .sort((a, b) => Number(b.kind === product.kind) - Number(a.kind === product.kind))
    .slice(0, limit);
}

/** Armados que se muestran en el inicio. */
export async function getFeaturedBuilds(): Promise<Build[]> {
  return builds.filter((b) => b.onHome);
}

export async function getAllBuilds(): Promise<Build[]> {
  return builds;
}

export async function getBuildBySlug(slug: string): Promise<Build | undefined> {
  return builds.find((b) => b.slug === slug);
}

export type { Availability, Build, LabArea, Product, ProductImage } from "./types";
