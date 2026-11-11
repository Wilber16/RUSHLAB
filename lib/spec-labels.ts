// Pone nombre a las características cortas para mostrarlas en la ficha técnica:
// "512GB" → Capacidad, "M.2 2280" → Formato, "NVMe PCIe 3.0" → Interfaz…
// Lo que no se reconoce se muestra igual, en la fila "Otras características".

import { normalize } from "./search";

type Rule = { label: string | ((kind: string) => string); test: RegExp; kinds?: string[] };

const rules: Rule[] = [
  { label: "Socket", test: /\b(AM4|AM5|LGA\s?\d{4})\b/i },
  { label: "Tipo de memoria", test: /^(G)?DDR\d\b/i, kinds: ["memoria ram", "placa madre"] },
  {
    label: (k) => (k === "tarjeta grafica" ? "Memoria de video" : "Capacidad"),
    test: /\b\d+(?:[.,]\d+)?\s?(GB|TB)\b/i,
  },
  { label: "Formato", test: /\b(M\.2|2280|2\.5\s?("|pulgadas)|E-?ATX|Micro[- ]?ATX|mATX|Mini[- ]?ITX|ATX)\b/i },
  { label: "Interfaz", test: /\b(NVMe|PCIe|SATA|USB|Thunderbolt)\b/i },
  { label: "Velocidad", test: /\b\d[\d.,]*\s?MB\/s\b/i },
  { label: "Frecuencia", test: /\b\d[\d.,]*\s?(MHz|GHz)\b/i },
  { label: "Latencia", test: /\bCL\s?\d+\b/i },
  { label: "Tasa de refresco", test: /\b\d{2,3}\s?Hz\b/i },
  { label: "Tamaño", test: /\b\d{2}(?:[.,]\d)?\s?("|”|pulgadas)/i },
  { label: "Resolución", test: /\b(\d{3,4}\s?[x×]\s?\d{3,4}|\d{3,4}p|4K|2K|QHD|UHD|Full HD|FHD)\b/i },
  { label: "Panel", test: /\b(IPS|VA|TN|OLED|QD-OLED|Mini[- ]?LED)\b/i },
  { label: "Certificación", test: /80\s?\+|80 Plus/i },
  { label: "Potencia", test: /\b\d{3,4}\s?W\b/i },
  { label: "Núcleos", test: /\bn[uú]cleos|cores?\b/i },
  { label: "Conectividad", test: /\b(Wi-?Fi|Bluetooth|inal[aá]mbric|wireless|2\.4\s?GHz)/i },
  { label: "Sistema", test: /\b(l[ií]quida|aire|torre|\d{3}\s?mm)\b/i, kinds: ["refrigeracion"] },
  { label: "Switches", test: /\b(switch|switches|red|blue|brown|óptic|magn[eé]tic)/i, kinds: ["teclado"] },
  { label: "Sensor", test: /\b(DPI|sensor)\b/i, kinds: ["mouse"] },
];

export type SpecRow = { label: string; value: string };

/** Agrupa las características en filas con nombre, en el orden en que aparecen. */
export function labelSpecs(specs: string[], kind: string): SpecRow[] {
  const k = normalize(kind);
  const rows = new Map<string, string[]>();
  const other: string[] = [];
  for (const spec of specs) {
    const rule = rules.find((r) => (!r.kinds || r.kinds.includes(k)) && r.test.test(spec));
    if (!rule) {
      other.push(spec);
      continue;
    }
    const label = typeof rule.label === "function" ? rule.label(k) : rule.label;
    rows.set(label, [...(rows.get(label) ?? []), spec]);
  }
  const out = [...rows].map(([label, values]) => ({ label, value: values.join(" · ") }));
  if (other.length)
    out.push({ label: out.length ? "Otras características" : "Características", value: other.join(" · ") });
  return out;
}
