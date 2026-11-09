// Única puerta de entrada a los datos del catálogo.
// Hoy lee datos de ejemplo; en la etapa de Shopify esta capa llamará a la
// Storefront API (productos, colecciones, precios y stock) sin que cambien
// las páginas ni los componentes.

import type { Build, LabArea, Product } from "./types";
import { builds, labAreas, products } from "./sample-data";

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
  return products.filter((p) => p.area === slug);
}

export async function getProductCount(slug: string): Promise<number> {
  return products.filter((p) => p.area === slug).length;
}

export async function getFeaturedBuilds(): Promise<Build[]> {
  return builds;
}

export type { Availability, Build, LabArea, Product } from "./types";
