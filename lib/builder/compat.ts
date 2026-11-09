// Reglas de compatibilidad del configurador. Funciones puras y fáciles de probar.

import {
  ASSEMBLY_FEE,
  boards,
  cases,
  coolers,
  cpus,
  gpus,
  presets,
  psus,
  rams,
  storages,
  type Selection,
} from "./parts";

export const byId = <T extends { id: string }>(list: T[], id: string): T => {
  const found = list.find((x) => x.id === id);
  if (!found) throw new Error(`Pieza no encontrada: ${id}`);
  return found;
};

export function resolve(sel: Selection) {
  return {
    cpu: byId(cpus, sel.cpu),
    board: byId(boards, sel.board),
    ram: byId(rams, sel.ram),
    gpu: byId(gpus, sel.gpu),
    storage: byId(storages, sel.storage),
    psu: byId(psus, sel.psu),
    case: byId(cases, sel.case),
    cooler: byId(coolers, sel.cooler),
  };
}

/** Consumo estimado: CPU + GPU + 100 W para placa, memoria, discos y ventiladores. */
export function estimatedWatts(sel: Selection): number {
  const r = resolve(sel);
  return r.cpu.watts + r.gpu.watts + 100;
}

/** Potencia de fuente recomendada: el mayor entre lo que pide la GPU y el consumo con 30 % de margen. */
export function recommendedPsu(sel: Selection): number {
  const r = resolve(sel);
  return Math.max(r.gpu.minPsu, Math.ceil((estimatedWatts(sel) * 1.3) / 50) * 50);
}

export interface Check {
  ok: boolean;
  label: string;
  detail: string;
}

export function checks(sel: Selection): Check[] {
  const r = resolve(sel);
  const need = recommendedPsu(sel);
  return [
    {
      ok: r.cpu.socket === r.board.socket,
      label: "Procesador y placa madre",
      detail:
        r.cpu.socket === r.board.socket
          ? `Ambos usan socket ${r.cpu.socket}.`
          : `El procesador es ${r.cpu.socket} y la placa es ${r.board.socket}.`,
    },
    {
      ok: r.ram.mem === r.board.mem,
      label: "Memoria y placa madre",
      detail:
        r.ram.mem === r.board.mem
          ? `La placa acepta ${r.board.mem}.`
          : `La placa acepta ${r.board.mem} y la memoria es ${r.ram.mem}.`,
    },
    {
      ok: r.case.forms.includes(r.board.form),
      label: "Placa madre y gabinete",
      detail: r.case.forms.includes(r.board.form)
        ? `El gabinete admite placas ${r.board.form === "ATX" ? "ATX" : "Micro ATX"}.`
        : "La placa ATX no entra en un gabinete Micro ATX.",
    },
    {
      ok: r.psu.watts >= need,
      label: "Fuente de poder",
      detail:
        r.psu.watts >= need
          ? `${r.psu.watts} W cubre los ${need} W recomendados.`
          : `Se recomiendan al menos ${need} W y la fuente es de ${r.psu.watts} W.`,
    },
    {
      ok: r.cooler.stock ? r.cpu.boxCooler : r.cooler.sockets.includes(r.cpu.socket),
      label: "Refrigeración",
      detail: r.cooler.stock
        ? r.cpu.boxCooler
          ? "El procesador trae disipador en la caja."
          : "Este procesador no trae disipador. Elige uno."
        : r.cooler.sockets.includes(r.cpu.socket)
          ? `Compatible con ${r.cpu.socket}.`
          : `No es compatible con ${r.cpu.socket}.`,
    },
  ];
}

export function partsTotal(sel: Selection): number {
  const r = resolve(sel);
  return Object.values(r).reduce((sum, p) => sum + p.price, 0);
}

export function total(sel: Selection): number {
  return partsTotal(sel) + ASSEMBLY_FEE;
}

/**
 * Corrige automáticamente lo que queda incompatible después de un cambio,
 * eligiendo la opción compatible más barata (o la más parecida).
 */
export function autoFix(sel: Selection): Selection {
  const next = { ...sel };
  const cpu = byId(cpus, next.cpu);

  let board = byId(boards, next.board);
  if (board.socket !== cpu.socket) {
    const options = boards.filter((b) => b.socket === cpu.socket).sort((a, b) => a.price - b.price);
    board = options.find((b) => b.form === board.form) ?? options[0];
    next.board = board.id;
  }

  const ram = byId(rams, next.ram);
  if (ram.mem !== board.mem) {
    const options = rams.filter((r) => r.mem === board.mem);
    next.ram = (options.find((r) => r.gb === ram.gb) ?? options[0]).id;
  }

  const box = byId(cases, next.case);
  if (!box.forms.includes(board.form)) {
    next.case = cases.filter((c) => c.forms.includes(board.form)).sort((a, b) => a.price - b.price)[0].id;
  }

  const cooler = byId(coolers, next.cooler);
  const coolerOk = cooler.stock ? cpu.boxCooler : cooler.sockets.includes(cpu.socket);
  if (!coolerOk) {
    next.cooler = coolers.filter((c) => !c.stock && c.sockets.includes(cpu.socket)).sort((a, b) => a.price - b.price)[0].id;
  }

  const need = recommendedPsu(next);
  if (byId(psus, next.psu).watts < need) {
    const enough = psus.filter((p) => p.watts >= need).sort((a, b) => a.watts - b.watts);
    next.psu = (enough[0] ?? psus.at(-1)!).id;
  }
  return next;
}

export type Use = "competitivo" | "aaa" | "streaming" | "creacion" | "estudio";

/** Elige el punto de partida más completo que entra en el presupuesto y lo ajusta al uso. */
export function recommend(budget: number, use: Use): Selection {
  const fitting = presets.filter((p) => total(p.selection) <= budget);
  let sel = { ...(fitting.at(-1) ?? presets[0]).selection };

  // Ajustes por uso, solo si siguen dentro del presupuesto
  const tryChange = (change: Partial<Selection>) => {
    const candidate = autoFix({ ...sel, ...change });
    if (total(candidate) <= budget) sel = candidate;
  };

  const ram = byId(rams, sel.ram);
  if ((use === "streaming" || use === "creacion") && ram.gb < 32) {
    tryChange({ ram: ram.mem === "DDR5" ? "d5-32" : "d4-32" });
  }
  if (use === "creacion" && byId(gpus, sel.gpu).vram < 16) {
    tryChange({ gpu: "rtx5060ti16" });
  }
  if (use === "estudio" && sel.gpu !== "rx7600") {
    // Para estudio no hace falta una gráfica cara: baja la gráfica y sube la memoria
    tryChange({ gpu: "rtx5060" });
  }
  return autoFix(sel);
}
