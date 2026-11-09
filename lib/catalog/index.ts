// Única puerta de entrada a los datos del catálogo.
// Hoy lee datos de ejemplo; en la etapa de Shopify esta capa llamará a la
// Storefront API (productos, colecciones, precios y stock) sin que cambien
// las páginas ni los componentes.

import type { Build, LabArea } from "./types";
import { builds, labAreas } from "./sample-data";

export async function getLabAreas(): Promise<LabArea[]> {
  return labAreas;
}

export async function getFeaturedBuilds(): Promise<Build[]> {
  return builds;
}

export type { Build, LabArea } from "./types";
