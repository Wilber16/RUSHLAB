import type { Build, LabArea, Product } from "./types";

// Datos de ejemplo para la vista previa.
// Los precios NO son reales: se reemplazarán por los de Shopify.

export const labAreas: LabArea[] = [
  {
    slug: "rush-power",
    name: "RUSH POWER",
    description: "Tarjetas gráficas y procesadores",
    icon: "gpu",
    href: "/areas/rush-power/",
    intro: "El corazón de tu PC. Te ayudamos a que el procesador y la tarjeta gráfica rindan en equipo.",
    character: "prof",
    quote: "El hardware no tiene límites, tiene posibilidades.",
  },
  {
    slug: "hyperspeed",
    name: "HYPERSPEED",
    description: "Memorias RAM y SSD",
    icon: "memory",
    href: "/areas/hyperspeed/",
    intro: "Memoria y almacenamiento para que todo cargue al instante. Revisamos que sea compatible con tu placa.",
    character: "byte",
    quote: "Lo rápido también es divertido.",
  },
  {
    slug: "the-lab",
    name: "THE LAB",
    description: "Placas madre, fuentes, gabinetes y refrigeración",
    icon: "board",
    href: "/areas/the-lab/",
    intro: "La base de cada experimento: una buena placa, energía estable y temperaturas bajo control.",
    character: "prof",
    quote: "Una buena fuente es la mejor inversión que nadie ve.",
  },
  {
    slug: "control-room",
    name: "CONTROL ROOM",
    description: "Monitores gaming y de trabajo",
    icon: "monitor",
    href: "/areas/control-room/",
    intro: "Monitores para ver cada fotograma que tu tarjeta gráfica es capaz de dar.",
    character: "byte",
    quote: "Más hercios, menos excusas.",
  },
  {
    slug: "gaming-arsenal",
    name: "GAMING ARSENAL",
    description: "Teclados, mouse, audífonos y accesorios",
    icon: "peripherals",
    href: "/areas/gaming-arsenal/",
    intro: "Lo que tocas y escuchas cada partida. Periféricos elegidos por comodidad y duración.",
    character: "byte",
    quote: "Siempre un paso adelante.",
  },
  {
    slug: "rush-build",
    name: "RUSH BUILD",
    description: "Arma tu PC completa con nuestra ayuda",
    icon: "build",
    href: "/pc-armadas/",
  },
];

export const builds: Build[] = [
  {
    slug: "rush-build-starter",
    name: "RUSH BUILD Starter",
    tier: "starter",
    purpose: "Tu primera PC gamer: juegos competitivos, clases y trabajo.",
    target: "1080p medio",
    idealFor: ["Valorant, LoL, CS2 y Fortnite", "Clases virtuales y ofimática", "Presupuesto ajustado con opción a mejorar"],
    parts: [
      { label: "Procesador", value: "Ryzen 5 5600" },
      { label: "Tarjeta gráfica", value: "RX 7600 8 GB" },
      { label: "Memoria", value: "16 GB DDR4" },
      { label: "Almacenamiento", value: "SSD NVMe 1 TB" },
    ],
    extraParts: [
      { label: "Placa madre", value: "B550M" },
      { label: "Fuente de poder", value: "550 W 80 Plus Bronze" },
      { label: "Gabinete", value: "Micro ATX con 3 ventiladores" },
      { label: "Refrigeración", value: "Disipador de aire" },
    ],
    price: 2890,
    priceIsExample: true,
  },
  {
    slug: "rush-build-core",
    name: "RUSH BUILD Core",
    tier: "core",
    purpose: "Para jugar Valorant, Fortnite y títulos actuales sin problemas.",
    target: "1080p alto",
    idealFor: ["Juegos actuales en 1080p con calidad alta", "Streaming básico", "Plataforma AM5 lista para mejorar"],
    parts: [
      { label: "Procesador", value: "Ryzen 5 7600" },
      { label: "Tarjeta gráfica", value: "RTX 5060 8 GB" },
      { label: "Memoria", value: "16 GB DDR5" },
      { label: "Almacenamiento", value: "SSD NVMe 1 TB" },
    ],
    extraParts: [
      { label: "Placa madre", value: "B650M" },
      { label: "Fuente de poder", value: "650 W 80 Plus Bronze" },
      { label: "Gabinete", value: "ATX con flujo de aire frontal" },
      { label: "Refrigeración", value: "Disipador de aire de torre" },
    ],
    price: 3890,
    priceIsExample: true,
    onHome: true,
  },
  {
    slug: "rush-build-pro",
    name: "RUSH BUILD Pro",
    tier: "pro",
    purpose: "Juegos AAA y streaming en la misma máquina.",
    target: "1440p alto",
    idealFor: ["Juegos AAA en 1440p", "Jugar y transmitir a la vez", "Edición de video ocasional"],
    parts: [
      { label: "Procesador", value: "Ryzen 7 7800X3D" },
      { label: "Tarjeta gráfica", value: "RTX 5070 12 GB" },
      { label: "Memoria", value: "32 GB DDR5" },
      { label: "Almacenamiento", value: "SSD NVMe 1 TB" },
    ],
    extraParts: [
      { label: "Placa madre", value: "B650 WiFi" },
      { label: "Fuente de poder", value: "750 W 80 Plus Gold" },
      { label: "Gabinete", value: "ATX con 4 ventiladores" },
      { label: "Refrigeración", value: "Líquida 240 mm" },
    ],
    price: 4790,
    priceIsExample: true,
    featured: true,
    onHome: true,
  },
  {
    slug: "rush-build-ultra",
    name: "RUSH BUILD Ultra",
    tier: "ultra",
    purpose: "Edición de video, IA local y juegos en 4K.",
    target: "1440p ultra / 4K",
    idealFor: ["Juegos en 1440p ultra y 4K", "Edición de video y 3D", "Modelos de IA locales"],
    parts: [
      { label: "Procesador", value: "Ryzen 9 7900X" },
      { label: "Tarjeta gráfica", value: "RTX 5080 16 GB" },
      { label: "Memoria", value: "64 GB DDR5" },
      { label: "Almacenamiento", value: "SSD NVMe 2 TB" },
    ],
    extraParts: [
      { label: "Placa madre", value: "X670E WiFi" },
      { label: "Fuente de poder", value: "850 W 80 Plus Gold modular" },
      { label: "Gabinete", value: "ATX de flujo de aire alto" },
      { label: "Refrigeración", value: "Líquida 360 mm" },
    ],
    price: 6590,
    priceIsExample: true,
    onHome: true,
  },
];

// Productos de ejemplo por área. Precios y disponibilidad NO son reales.
const ex = { priceIsExample: true } as const;

export const products: Product[] = [
  // RUSH POWER
  { slug: "rtx-5060-8gb", area: "rush-power", brand: "NVIDIA", kind: "Tarjeta gráfica", name: "GeForce RTX 5060 8 GB", specs: ["8 GB GDDR7", "PCIe 5.0", "DLSS 4"], price: 1499, availability: "in_stock", ...ex },
  { slug: "rtx-5060-ti-16gb", area: "rush-power", brand: "NVIDIA", kind: "Tarjeta gráfica", name: "GeForce RTX 5060 Ti 16 GB", specs: ["16 GB GDDR7", "PCIe 5.0", "DLSS 4"], price: 1999, availability: "on_order", ...ex },
  { slug: "rtx-5070-12gb", area: "rush-power", brand: "NVIDIA", kind: "Tarjeta gráfica", name: "GeForce RTX 5070 12 GB", specs: ["12 GB GDDR7", "PCIe 5.0", "DLSS 4"], price: 2399, availability: "in_stock", ...ex },
  { slug: "rx-9070-xt-16gb", area: "rush-power", brand: "AMD", kind: "Tarjeta gráfica", name: "Radeon RX 9070 XT 16 GB", specs: ["16 GB GDDR6", "PCIe 5.0", "FSR 4"], price: 2599, availability: "on_order", ...ex },
  { slug: "arc-b580-12gb", area: "rush-power", brand: "Intel", kind: "Tarjeta gráfica", name: "Arc B580 12 GB", specs: ["12 GB GDDR6", "PCIe 4.0", "XeSS"], price: 1299, availability: "sold_out", ...ex },
  { slug: "ryzen-5-7600", area: "rush-power", brand: "AMD", kind: "Procesador", name: "Ryzen 5 7600", specs: ["6 núcleos / 12 hilos", "AM5", "Hasta 5.1 GHz"], price: 899, availability: "in_stock", ...ex },
  { slug: "ryzen-7-7800x3d", area: "rush-power", brand: "AMD", kind: "Procesador", name: "Ryzen 7 7800X3D", specs: ["8 núcleos / 16 hilos", "AM5", "3D V-Cache"], price: 1399, availability: "in_stock", ...ex },
  { slug: "core-i5-14400f", area: "rush-power", brand: "Intel", kind: "Procesador", name: "Core i5-14400F", specs: ["10 núcleos / 16 hilos", "LGA 1700", "Hasta 4.7 GHz"], price: 749, availability: "on_order", ...ex },

  // HYPERSPEED
  { slug: "ddr5-16gb-6000", area: "hyperspeed", brand: "Kingston", kind: "Memoria RAM", name: "FURY Beast 16 GB (2x8) DDR5 6000", specs: ["DDR5", "6000 MHz", "CL36"], price: 389, availability: "in_stock", ...ex },
  { slug: "ddr5-32gb-6000", area: "hyperspeed", brand: "Corsair", kind: "Memoria RAM", name: "Vengeance 32 GB (2x16) DDR5 6000", specs: ["DDR5", "6000 MHz", "CL30"], price: 729, availability: "on_order", ...ex },
  { slug: "ddr4-16gb-3200", area: "hyperspeed", brand: "Kingston", kind: "Memoria RAM", name: "FURY Beast 16 GB (2x8) DDR4 3200", specs: ["DDR4", "3200 MHz", "CL16"], price: 259, availability: "in_stock", ...ex },
  { slug: "nvme-1tb-gen4", area: "hyperspeed", brand: "Kingston", kind: "SSD", name: "NV3 1 TB NVMe", specs: ["M.2 NVMe", "PCIe 4.0", "Hasta 6000 MB/s"], price: 279, availability: "in_stock", ...ex },
  { slug: "nvme-2tb-gen4", area: "hyperspeed", brand: "Samsung", kind: "SSD", name: "990 EVO Plus 2 TB NVMe", specs: ["M.2 NVMe", "PCIe 4.0", "Hasta 7250 MB/s"], price: 619, availability: "on_order", ...ex },
  { slug: "sata-1tb", area: "hyperspeed", brand: "Crucial", kind: "SSD", name: "BX500 1 TB SATA", specs: ['2.5" SATA', "Hasta 540 MB/s"], price: 229, availability: "in_stock", ...ex },

  // THE LAB
  { slug: "b650-wifi", area: "the-lab", brand: "MSI", kind: "Placa madre", name: "B650 Gaming Plus WiFi", specs: ["AM5", "DDR5", "WiFi 6E"], price: 649, availability: "in_stock", ...ex },
  { slug: "b760-ddr5", area: "the-lab", brand: "ASUS", kind: "Placa madre", name: "PRIME B760M-A DDR5", specs: ["LGA 1700", "DDR5", "Micro ATX"], price: 529, availability: "on_order", ...ex },
  { slug: "psu-650-bronze", area: "the-lab", brand: "Corsair", kind: "Fuente de poder", name: "CX650 650 W", specs: ["650 W", "80 Plus Bronze"], price: 279, availability: "in_stock", ...ex },
  { slug: "psu-750-gold", area: "the-lab", brand: "MSI", kind: "Fuente de poder", name: "MAG A750GL 750 W", specs: ["750 W", "80 Plus Gold", "Modular"], price: 449, availability: "in_stock", ...ex },
  { slug: "case-atx-airflow", area: "the-lab", brand: "Lian Li", kind: "Gabinete", name: "Lancool 207", specs: ["ATX", "4 ventiladores incluidos"], price: 389, availability: "on_order", ...ex },
  { slug: "aio-240", area: "the-lab", brand: "MSI", kind: "Refrigeración", name: "MAG CoreLiquid 240R", specs: ["Líquida 240 mm", "AM5 / LGA 1700"], price: 359, availability: "in_stock", ...ex },
  { slug: "air-cooler", area: "the-lab", brand: "Thermalright", kind: "Refrigeración", name: "Peerless Assassin 120 SE", specs: ["Aire, doble torre", "AM5 / LGA 1700"], price: 169, availability: "in_stock", ...ex },

  // CONTROL ROOM
  { slug: "monitor-24-180", area: "control-room", brand: "LG", kind: "Monitor", name: 'UltraGear 24" Full HD 180 Hz', specs: ["1080p", "180 Hz", "IPS"], price: 549, availability: "in_stock", ...ex },
  { slug: "monitor-27-qhd-180", area: "control-room", brand: "MSI", kind: "Monitor", name: 'MAG 275QF 27" QHD 180 Hz', specs: ["1440p", "180 Hz", "IPS"], price: 899, availability: "in_stock", ...ex },
  { slug: "monitor-27-qhd-240", area: "control-room", brand: "Samsung", kind: "Monitor", name: 'Odyssey G6 27" QHD 240 Hz', specs: ["1440p", "240 Hz", "VA"], price: 1299, availability: "on_order", ...ex },
  { slug: "monitor-34-uw", area: "control-room", brand: "Xiaomi", kind: "Monitor", name: 'G34WQi 34" ultrawide', specs: ["3440 x 1440", "180 Hz", "Curvo"], price: 1199, availability: "on_order", ...ex },

  // GAMING ARSENAL
  { slug: "teclado-mecanico", area: "gaming-arsenal", brand: "Redragon", kind: "Teclado", name: "Kumara K552 mecánico", specs: ["Switch rojo", "TKL", "RGB"], price: 159, availability: "in_stock", ...ex },
  { slug: "mouse-inalambrico", area: "gaming-arsenal", brand: "Logitech", kind: "Mouse", name: "G305 Lightspeed inalámbrico", specs: ["12 000 DPI", "Inalámbrico"], price: 149, availability: "in_stock", ...ex },
  { slug: "audifonos-gaming", area: "gaming-arsenal", brand: "HyperX", kind: "Audífonos", name: "Cloud III", specs: ["Con micrófono", "USB y 3.5 mm"], price: 349, availability: "on_order", ...ex },
  { slug: "mousepad-xl", area: "gaming-arsenal", brand: "RUSH LAB", kind: "Accesorio", name: "Mousepad XL Laboratorio", specs: ["90 x 40 cm", "Bordes cosidos"], price: 69, availability: "in_stock", ...ex },
  { slug: "pasta-termica", area: "gaming-arsenal", brand: "Arctic", kind: "Accesorio", name: "MX-6 pasta térmica 4 g", specs: ["Alto rendimiento", "No conductiva"], price: 39, availability: "in_stock", ...ex },
];
