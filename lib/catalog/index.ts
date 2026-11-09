// Única puerta de entrada a los datos del catálogo.
// Hoy lee datos de ejemplo; en la etapa de Shopify esta capa llamará a la
// Storefront API (productos, colecciones, precios y stock) sin que cambien
// las páginas ni los componentes.

import type { Build, LabArea, Product } from "./types";
import { builds, labAreas, products } from "./sample-data";

/** Todas las tarjetas del inicio, incluido el acceso a PCs armadas. */
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
  return products.filter((p) => p.area === slug);
}

export async function getProductCount(slug: string): Promise<number> {
  return products.filter((p) => p.area === slug).length;
}

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

/** Productos de la misma área, primero los del mismo tipo, sin agotados. */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return products
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

export type { Availability, Build, LabArea, Product } from "./types";
