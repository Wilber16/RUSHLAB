// Tipos del catálogo. Están pensados para mapear 1 a 1 con Shopify:
// - LabArea  -> Collection de Shopify
// - Product  -> Product de Shopify (specs en metafields o tags)
// - Build    -> Product de Shopify (con metafields para los componentes)
// Así, cuando conectemos Shopify, solo cambia la fuente de datos (lib/catalog/index.ts),
// no los componentes visuales.

export type LabAreaIcon = "gpu" | "memory" | "board" | "monitor" | "peripherals" | "build";

export type AreaSlug = "rush-power" | "hyperspeed" | "the-lab" | "control-room" | "gaming-arsenal";

export interface LabArea {
  slug: string;
  name: string;
  description: string;
  icon: LabAreaIcon;
  href: string;
  /** Texto del encabezado en la página del área */
  intro?: string;
  /** Personaje que acompaña el encabezado */
  character?: "prof" | "byte";
  quote?: string;
}

/**
 * in_stock: el proveedor lo tiene hoy; entrega en 24 a 48 h.
 * on_order: se pide al proveedor; entrega en 2 a 4 días.
 * sold_out: sin stock en ningún proveedor.
 */
export type Availability = "in_stock" | "on_order" | "sold_out";

export interface Product {
  slug: string;
  area: AreaSlug;
  brand: string;
  name: string;
  /** Tipo dentro del área, para filtrar: "Tarjeta gráfica", "Procesador"... */
  kind: string;
  /** 2 a 3 datos clave que se muestran como etiquetas */
  specs: string[];
  price: number; // en soles, con IGV
  /** Precio anterior, solo si hay una rebaja real */
  compareAtPrice?: number;
  availability: Availability;
  /** true mientras el precio sea de ejemplo y no venga de Shopify */
  priceIsExample: boolean;
  /** Ficha técnica completa (opcional). Si falta, se usan los specs. */
  details?: { label: string; value: string }[];
  /** Foto principal (viene de Shopify) */
  image?: ProductImage;
  /** Todas las fotos (viene de Shopify) */
  images?: ProductImage[];
  /** Variante de Shopify para agregar al carrito. Sin ella, solo se puede cotizar. */
  variantId?: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface BuildPart {
  label: string; // "Procesador", "Tarjeta gráfica"...
  value: string; // "Ryzen 5 7600"
}

export interface Build {
  slug: string;
  name: string; // "RUSH BUILD Core"
  tier: "starter" | "core" | "pro" | "ultra";
  purpose: string; // para qué sirve, en una línea
  target: string; // resolución / uso objetivo
  /** Para qué sirve, en 3 puntos */
  idealFor: string[];
  /** Piezas principales (se muestran en las tarjetas) */
  parts: BuildPart[];
  /** Resto de piezas (se muestran en el detalle) */
  extraParts: BuildPart[];
  price: number; // en soles, con IGV
  /** true mientras el precio sea de ejemplo y no venga del proveedor/Shopify */
  priceIsExample: boolean;
  /** Destacado con borde naranja */
  featured?: boolean;
  /** Aparece en la página de inicio */
  onHome?: boolean;
}
