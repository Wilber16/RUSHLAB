import type { Build, LabArea } from "./types";

// Datos de ejemplo para la vista previa.
// Los precios NO son reales: se reemplazarán por los de Shopify.

export const labAreas: LabArea[] = [
  {
    slug: "rush-power",
    name: "RUSH POWER",
    description: "Tarjetas gráficas y procesadores",
    icon: "gpu",
    href: "/areas/rush-power/",
  },
  {
    slug: "hyperspeed",
    name: "HYPERSPEED",
    description: "Memorias RAM y SSD",
    icon: "memory",
    href: "/areas/hyperspeed/",
  },
  {
    slug: "the-lab",
    name: "THE LAB",
    description: "Placas madre, fuentes, gabinetes y refrigeración",
    icon: "board",
    href: "/areas/the-lab/",
  },
  {
    slug: "control-room",
    name: "CONTROL ROOM",
    description: "Monitores gaming y de trabajo",
    icon: "monitor",
    href: "/areas/control-room/",
  },
  {
    slug: "gaming-arsenal",
    name: "GAMING ARSENAL",
    description: "Teclados, mouse, audífonos y accesorios",
    icon: "peripherals",
    href: "/areas/gaming-arsenal/",
  },
  {
    slug: "rush-build",
    name: "RUSH BUILD",
    description: "Arma tu PC completa con nuestra ayuda",
    icon: "build",
    href: "/rush-build/",
  },
];

export const builds: Build[] = [
  {
    slug: "rush-build-core",
    name: "RUSH BUILD Core",
    tier: "core",
    purpose: "Para jugar Valorant, Fortnite y títulos actuales sin problemas.",
    target: "1080p alto",
    parts: [
      { label: "Procesador", value: "Ryzen 5 7600" },
      { label: "Tarjeta gráfica", value: "RTX 5060 8 GB" },
      { label: "Memoria", value: "16 GB DDR5" },
      { label: "Almacenamiento", value: "SSD NVMe 1 TB" },
    ],
    price: 3890,
    priceIsExample: true,
  },
  {
    slug: "rush-build-pro",
    name: "RUSH BUILD Pro",
    tier: "pro",
    purpose: "Juegos AAA y streaming en la misma máquina.",
    target: "1440p alto",
    parts: [
      { label: "Procesador", value: "Ryzen 7 7800X3D" },
      { label: "Tarjeta gráfica", value: "RTX 5070 12 GB" },
      { label: "Memoria", value: "32 GB DDR5" },
      { label: "Almacenamiento", value: "SSD NVMe 1 TB" },
    ],
    price: 4790,
    priceIsExample: true,
    featured: true,
  },
  {
    slug: "rush-build-ultra",
    name: "RUSH BUILD Ultra",
    tier: "ultra",
    purpose: "Edición de video, IA local y juegos en 4K.",
    target: "1440p ultra / 4K",
    parts: [
      { label: "Procesador", value: "Ryzen 9 7900X" },
      { label: "Tarjeta gráfica", value: "RTX 5080 16 GB" },
      { label: "Memoria", value: "64 GB DDR5" },
      { label: "Almacenamiento", value: "SSD NVMe 2 TB" },
    ],
    price: 6590,
    priceIsExample: true,
  },
];
