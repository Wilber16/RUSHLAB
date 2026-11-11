// "Completa tu equipo": qué conviene sumar a un producto, revisando
// socket (AM4/AM5/LGA…) y tipo de memoria (DDR4/DDR5) cuando importa.
// Funciona con cualquier lista que tenga tipo, texto de especificaciones y stock,
// así sirve en la ficha (servidor) y en el carrito (navegador).

import { normalize } from "./search";

export type ComplementItem = {
  key: string;
  kind: string;
  text: string;
  availability: "in_stock" | "on_order" | "sold_out";
};

type Match = "socket" | "ddr";
type Rule = { kind: string; match?: Match };

const rules: Record<string, Rule[]> = {
  procesador: [
    { kind: "Placa madre", match: "socket" },
    { kind: "Refrigeración", match: "socket" },
    { kind: "Memoria RAM" },
  ],
  "placa madre": [{ kind: "Procesador", match: "socket" }, { kind: "Memoria RAM", match: "ddr" }, { kind: "Gabinete" }],
  "memoria ram": [{ kind: "Placa madre", match: "ddr" }, { kind: "SSD" }],
  "tarjeta grafica": [{ kind: "Fuente de poder" }, { kind: "Monitor" }, { kind: "Gabinete" }],
  "fuente de poder": [{ kind: "Tarjeta gráfica" }, { kind: "Gabinete" }],
  gabinete: [{ kind: "Refrigeración" }, { kind: "Fuente de poder" }],
  refrigeracion: [{ kind: "Procesador", match: "socket" }, { kind: "Accesorio" }],
  ssd: [{ kind: "Memoria RAM" }, { kind: "Placa madre" }],
  monitor: [{ kind: "Teclado" }, { kind: "Mouse" }, { kind: "Audífonos" }, { kind: "Tarjeta gráfica" }],
  teclado: [{ kind: "Mouse" }, { kind: "Audífonos" }, { kind: "Accesorio" }],
  mouse: [{ kind: "Teclado" }, { kind: "Audífonos" }, { kind: "Accesorio" }],
  audifonos: [{ kind: "Mouse" }, { kind: "Teclado" }],
  accesorio: [{ kind: "Mouse" }, { kind: "Teclado" }],
};

const rank = { in_stock: 0, on_order: 1, sold_out: 2 } as const;

/** Sockets mencionados: "AM5 / LGA 1700" → {AM5, LGA1700} */
export function sockets(text: string): Set<string> {
  const found = text.toUpperCase().match(/\b(AM4|AM5|LGA\s?\d{4})\b/g) ?? [];
  return new Set(found.map((s) => s.replace(/\s/g, "")));
}

export function ddr(text: string): Set<string> {
  return new Set((text.toUpperCase().match(/\bDDR[345]\b/g) ?? []) as string[]);
}

const intersects = (a: Set<string>, b: Set<string>) => [...a].some((x) => b.has(x));

export type Complement<T> = { item: T; reason?: string };

/**
 * Sugerencias para una o varias piezas de origen (ficha o carrito).
 * Alterna entre tipos para no sugerir 4 placas madre seguidas.
 */
export function complementsFor<T extends ComplementItem>(sources: T[], pool: T[], limit = 4): Complement<T>[] {
  const taken = new Set(sources.map((s) => s.key));
  const ownedKinds = new Set(sources.map((s) => normalize(s.kind)));
  const queues: Complement<T>[][] = [];

  for (const source of sources) {
    const srcSockets = sockets(source.text);
    const srcDdr = ddr(source.text);
    for (const rule of rules[normalize(source.kind)] ?? []) {
      // En el carrito: si ya lleva ese tipo de pieza, no insistir
      if (sources.length > 1 && ownedKinds.has(normalize(rule.kind))) continue;
      let reason: string | undefined;
      const candidates = pool
        .filter((p) => normalize(p.kind) === normalize(rule.kind) && p.availability !== "sold_out")
        .filter((p) => {
          if (rule.match === "socket" && srcSockets.size) return intersects(srcSockets, sockets(p.text));
          if (rule.match === "ddr" && srcDdr.size) return intersects(srcDdr, ddr(p.text));
          return true;
        })
        .sort((a, b) => rank[a.availability] - rank[b.availability]);
      if (rule.match === "socket" && srcSockets.size) reason = `Compatible con ${[...srcSockets].join(" / ")}`;
      if (rule.match === "ddr" && srcDdr.size) reason = `Usa ${[...srcDdr].join(" / ")}`;
      queues.push(candidates.map((item) => ({ item, reason })));
    }
  }

  // Una sugerencia de cada tipo por vuelta, hasta llenar el límite
  const out: Complement<T>[] = [];
  const next = queues.map(() => 0);
  let progressed = true;
  while (out.length < limit && progressed) {
    progressed = false;
    for (const [i, q] of queues.entries()) {
      while (next[i] < q.length && taken.has(q[next[i]].item.key)) next[i]++;
      if (next[i] >= q.length) continue;
      const c = q[next[i]++];
      taken.add(c.item.key);
      out.push(c);
      progressed = true;
      if (out.length === limit) break;
    }
  }
  return out;
}
