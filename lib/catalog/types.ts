// Tipos del catálogo. Están pensados para mapear 1 a 1 con Shopify:
// - LabArea      -> Collection de Shopify
// - Build        -> Product de Shopify (con metafields para los componentes)
// Así, cuando conectemos Shopify, solo cambia la fuente de datos (lib/catalog/index.ts),
// no los componentes visuales.

export type LabAreaIcon = "gpu" | "memory" | "board" | "monitor" | "peripherals" | "build";

export interface LabArea {
  slug: string;
  name: string;
  description: string;
  icon: LabAreaIcon;
  href: string;
}

export interface BuildPart {
  label: string; // "Procesador", "Tarjeta gráfica"...
  value: string; // "Ryzen 5 7600"
}

export interface Build {
  slug: string;
  name: string; // "RUSH BUILD Core"
  tier: "core" | "pro" | "ultra";
  purpose: string; // para qué sirve, en una línea
  target: string; // resolución / uso objetivo
  parts: BuildPart[];
  price: number; // en soles, con IGV
  /** true mientras el precio sea de ejemplo y no venga del proveedor/Shopify */
  priceIsExample: boolean;
  featured?: boolean;
}
