// Filtros técnicos que salen solos de las especificaciones de cada producto
// (nombre + specs de Shopify). Si un dato no aparece, el producto simplemente
// no entra en ese filtro.

import { ddr, sockets } from "./complements";
import { normalize } from "./search";

export type Facet = {
  id: string;
  label: string;
  /** Tipos de producto donde tiene sentido */
  kinds: string[];
  values: (text: string) => string[];
};

const one = (re: RegExp, fmt: (m: RegExpMatchArray) => string) => (text: string) => {
  const m = text.match(re);
  return m ? [fmt(m)] : [];
};

export const facets: Facet[] = [
  {
    id: "socket",
    label: "Socket",
    kinds: ["Procesador", "Placa madre", "Refrigeración"],
    values: (t) => [...sockets(t)].map((s) => s.replace(/^LGA/, "LGA ")),
  },
  { id: "ddr", label: "Memoria", kinds: ["Memoria RAM", "Placa madre"], values: (t) => [...ddr(t)] },
  {
    id: "vram",
    label: "Memoria de video",
    kinds: ["Tarjeta gráfica"],
    values: one(/(\d{1,2})\s?GB/i, (m) => `${m[1]} GB`),
  },
  {
    id: "capacity",
    label: "Capacidad",
    kinds: ["SSD", "Memoria RAM"],
    values: one(/(\d+(?:[.,]\d+)?)\s?(GB|TB)\b/i, (m) => `${m[1].replace(",", ".")} ${m[2].toUpperCase()}`),
  },
  {
    id: "size",
    label: "Tamaño",
    kinds: ["Monitor"],
    values: one(/(\d{2}(?:[.,]\d)?)\s?(?:"|”|''|pulgadas)/i, (m) => `${m[1]}"`),
  },
  { id: "hz", label: "Frecuencia", kinds: ["Monitor"], values: one(/(\d{2,3})\s?Hz/i, (m) => `${m[1]} Hz`) },
  { id: "watts", label: "Potencia", kinds: ["Fuente de poder"], values: one(/(\d{3,4})\s?W\b/i, (m) => `${m[1]} W`) },
  {
    id: "wireless",
    label: "Conexión",
    kinds: ["Mouse", "Teclado", "Audífonos"],
    values: (t) => [/inal[aá]mbric|wireless|lightspeed|bluetooth/i.test(t) ? "Inalámbrico" : "Con cable"],
  },
];

/** Orden natural: 8 GB < 12 GB < 1 TB; AM4 < AM5 < LGA 1700 */
function sortKey(v: string): number | string {
  const n = parseFloat(v);
  if (Number.isNaN(n)) return v;
  return /TB/i.test(v) ? n * 1024 : n;
}

export function compareValues(a: string, b: string): number {
  const ka = sortKey(a);
  const kb = sortKey(b);
  if (typeof ka === "number" && typeof kb === "number") return ka - kb;
  return String(ka).localeCompare(String(kb));
}

export const kindMatches = (facet: Facet, kind: string) => facet.kinds.some((k) => normalize(k) === normalize(kind));
