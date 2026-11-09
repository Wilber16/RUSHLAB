// Piezas del configurador RUSH BUILD con los datos necesarios para revisar
// compatibilidad. Precios de EJEMPLO; en la etapa de Shopify estos datos
// vendrán de los metafields de cada producto.

export type Socket = "AM4" | "AM5" | "LGA1700";
export type MemType = "DDR4" | "DDR5";
export type FormFactor = "ATX" | "mATX";

interface Base {
  id: string;
  name: string;
  price: number;
}

export interface Cpu extends Base {
  socket: Socket;
  watts: number;
  /** Trae disipador en la caja */
  boxCooler: boolean;
}
export interface Board extends Base {
  socket: Socket;
  mem: MemType;
  form: FormFactor;
}
export interface Ram extends Base {
  mem: MemType;
  gb: number;
}
export interface Gpu extends Base {
  watts: number;
  /** Fuente mínima recomendada por el fabricante */
  minPsu: number;
  vram: number;
}
export interface Storage extends Base {
  gb: number;
}
export interface Psu extends Base {
  watts: number;
}
export interface Case extends Base {
  forms: FormFactor[];
}
export interface Cooler extends Base {
  sockets: Socket[];
  /** Opción "usar el que trae el procesador" */
  stock?: boolean;
}

export const cpus: Cpu[] = [
  { id: "r5-5600", name: "Ryzen 5 5600", socket: "AM4", watts: 65, boxCooler: true, price: 489 },
  { id: "i5-14400f", name: "Core i5-14400F", socket: "LGA1700", watts: 65, boxCooler: true, price: 749 },
  { id: "r5-7600", name: "Ryzen 5 7600", socket: "AM5", watts: 65, boxCooler: true, price: 899 },
  { id: "r7-7800x3d", name: "Ryzen 7 7800X3D", socket: "AM5", watts: 120, boxCooler: false, price: 1399 },
  { id: "r9-7900x", name: "Ryzen 9 7900X", socket: "AM5", watts: 170, boxCooler: false, price: 1799 },
];

export const boards: Board[] = [
  { id: "b550m", name: "B550M (AM4, DDR4, Micro ATX)", socket: "AM4", mem: "DDR4", form: "mATX", price: 389 },
  { id: "b760m-d4", name: "B760M DDR4 (LGA 1700, Micro ATX)", socket: "LGA1700", mem: "DDR4", form: "mATX", price: 449 },
  { id: "b760m-d5", name: "B760M DDR5 (LGA 1700, Micro ATX)", socket: "LGA1700", mem: "DDR5", form: "mATX", price: 529 },
  { id: "b650m", name: "B650M (AM5, DDR5, Micro ATX)", socket: "AM5", mem: "DDR5", form: "mATX", price: 529 },
  { id: "b650-wifi", name: "B650 WiFi (AM5, DDR5, ATX)", socket: "AM5", mem: "DDR5", form: "ATX", price: 649 },
  { id: "x670e", name: "X670E WiFi (AM5, DDR5, ATX)", socket: "AM5", mem: "DDR5", form: "ATX", price: 1099 },
];

export const rams: Ram[] = [
  { id: "d4-16", name: "16 GB (2x8) DDR4 3200", mem: "DDR4", gb: 16, price: 259 },
  { id: "d4-32", name: "32 GB (2x16) DDR4 3200", mem: "DDR4", gb: 32, price: 489 },
  { id: "d5-16", name: "16 GB (2x8) DDR5 6000", mem: "DDR5", gb: 16, price: 389 },
  { id: "d5-32", name: "32 GB (2x16) DDR5 6000", mem: "DDR5", gb: 32, price: 729 },
  { id: "d5-64", name: "64 GB (2x32) DDR5 6000", mem: "DDR5", gb: 64, price: 1399 },
];

export const gpus: Gpu[] = [
  { id: "rx7600", name: "Radeon RX 7600 8 GB", watts: 165, minPsu: 550, vram: 8, price: 1149 },
  { id: "rtx5060", name: "GeForce RTX 5060 8 GB", watts: 145, minPsu: 550, vram: 8, price: 1499 },
  { id: "rtx5060ti16", name: "GeForce RTX 5060 Ti 16 GB", watts: 180, minPsu: 600, vram: 16, price: 1999 },
  { id: "rtx5070", name: "GeForce RTX 5070 12 GB", watts: 250, minPsu: 650, vram: 12, price: 2399 },
  { id: "rx9070xt", name: "Radeon RX 9070 XT 16 GB", watts: 304, minPsu: 750, vram: 16, price: 2599 },
  { id: "rtx5080", name: "GeForce RTX 5080 16 GB", watts: 360, minPsu: 850, vram: 16, price: 4599 },
];

export const storages: Storage[] = [
  { id: "nvme-1tb", name: "SSD NVMe 1 TB", gb: 1000, price: 279 },
  { id: "nvme-2tb", name: "SSD NVMe 2 TB", gb: 2000, price: 619 },
];

export const psus: Psu[] = [
  { id: "psu-550", name: "550 W 80 Plus Bronze", watts: 550, price: 219 },
  { id: "psu-650", name: "650 W 80 Plus Bronze", watts: 650, price: 279 },
  { id: "psu-750", name: "750 W 80 Plus Gold", watts: 750, price: 449 },
  { id: "psu-850", name: "850 W 80 Plus Gold modular", watts: 850, price: 589 },
];

export const cases: Case[] = [
  { id: "case-matx", name: "Micro ATX con 3 ventiladores", forms: ["mATX"], price: 219 },
  { id: "case-atx", name: "ATX con flujo de aire frontal", forms: ["ATX", "mATX"], price: 299 },
  { id: "case-atx-4fan", name: "ATX con 4 ventiladores", forms: ["ATX", "mATX"], price: 389 },
];

export const coolers: Cooler[] = [
  { id: "stock", name: "El que trae el procesador", sockets: ["AM4", "AM5", "LGA1700"], stock: true, price: 0 },
  { id: "air-tower", name: "Disipador de aire de torre", sockets: ["AM4", "AM5", "LGA1700"], price: 169 },
  { id: "aio-240", name: "Líquida 240 mm", sockets: ["AM4", "AM5", "LGA1700"], price: 359 },
  { id: "aio-360", name: "Líquida 360 mm", sockets: ["AM5", "LGA1700"], price: 529 },
];

/** Armado, pruebas y reporte (ejemplo). */
export const ASSEMBLY_FEE = 150;

export interface Selection {
  cpu: string;
  board: string;
  ram: string;
  gpu: string;
  storage: string;
  psu: string;
  case: string;
  cooler: string;
}

/** Puntos de partida según presupuesto (ids de las piezas). */
export const presets: { name: string; selection: Selection }[] = [
  {
    name: "Starter",
    selection: { cpu: "r5-5600", board: "b550m", ram: "d4-16", gpu: "rx7600", storage: "nvme-1tb", psu: "psu-550", case: "case-matx", cooler: "stock" },
  },
  {
    name: "Core",
    selection: { cpu: "r5-7600", board: "b650m", ram: "d5-16", gpu: "rtx5060", storage: "nvme-1tb", psu: "psu-650", case: "case-atx", cooler: "air-tower" },
  },
  {
    name: "Pro",
    selection: { cpu: "r7-7800x3d", board: "b650-wifi", ram: "d5-32", gpu: "rtx5070", storage: "nvme-1tb", psu: "psu-750", case: "case-atx-4fan", cooler: "aio-240" },
  },
  {
    name: "Ultra",
    selection: { cpu: "r9-7900x", board: "x670e", ram: "d5-64", gpu: "rtx5080", storage: "nvme-2tb", psu: "psu-850", case: "case-atx-4fan", cooler: "aio-360" },
  },
];
