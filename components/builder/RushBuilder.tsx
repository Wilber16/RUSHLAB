"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ASSEMBLY_FEE,
  boards,
  cases,
  coolers,
  cpus,
  gpus,
  psus,
  rams,
  storages,
  type Selection,
} from "@/lib/builder/parts";
import {
  autoFix,
  checks,
  estimatedWatts,
  recommend,
  recommendedPsu,
  resolve,
  total,
  type Use,
} from "@/lib/builder/compat";
import { formatPEN, whatsappLink } from "@/lib/config";
import { Check, Share, WhatsApp } from "../icons";
import { PayMethods } from "../PayMethods";

const uses: { id: Use; title: string; text: string }[] = [
  { id: "competitivo", title: "Gaming competitivo", text: "Valorant, CS2, Fortnite, LoL" },
  { id: "aaa", title: "Juegos AAA", text: "Gráficos altos en 1440p" },
  { id: "streaming", title: "Jugar y transmitir", text: "Twitch, YouTube, TikTok Live" },
  { id: "creacion", title: "Edición e IA", text: "Video, 3D y modelos locales" },
  { id: "estudio", title: "Estudio y trabajo", text: "Clases, oficina, programación" },
];

const MIN = 3000;
const MAX = 12000;
const STEP = 100;

type Key = keyof Selection;

const labels: Record<Key, string> = {
  cpu: "Procesador",
  board: "Placa madre",
  ram: "Memoria RAM",
  gpu: "Tarjeta gráfica",
  storage: "Almacenamiento",
  psu: "Fuente de poder",
  case: "Gabinete",
  cooler: "Refrigeración",
};

const catalogs: Record<Key, { id: string }[]> = {
  cpu: cpus,
  board: boards,
  ram: rams,
  gpu: gpus,
  storage: storages,
  psu: psus,
  case: cases,
  cooler: coolers,
};
const keys = Object.keys(labels) as Key[];

/** Lee un armado compartido: /rush-build/?u=aaa&b=6000&arma=cpu.board.ram... */
function readShared(): { use: Use; budget: number; sel: Selection } | null {
  const q = new URLSearchParams(window.location.search);
  const ids = q.get("arma")?.split(".");
  if (!ids || ids.length !== keys.length) return null;
  const sel = {} as Selection;
  for (const [i, k] of keys.entries()) {
    if (!catalogs[k].some((p) => p.id === ids[i])) return null;
    sel[k] = ids[i];
  }
  const u = q.get("u") as Use;
  const b = Number(q.get("b"));
  return {
    use: uses.some((x) => x.id === u) ? u : "aaa",
    budget: b >= MIN && b <= MAX ? Math.round(b / STEP) * STEP : 6000,
    sel: autoFix(sel),
  };
}

function shareQuery(use: Use, budget: number, sel: Selection): string {
  return `?u=${use}&b=${budget}&arma=${keys.map((k) => sel[k]).join(".")}`;
}

export function RushBuilder() {
  const [use, setUse] = useState<Use>("aaa");
  const [budget, setBudget] = useState(6000);
  const [sel, setSel] = useState<Selection>(() => recommend(6000, "aaa"));
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");
  const loaded = useRef(false);
  const [base, setBase] = useState("");

  // Si llega un enlace compartido, abre ese mismo armado
  useEffect(() => {
    const shared = readShared();
    if (shared) {
      setUse(shared.use);
      setBudget(shared.budget);
      setSel(shared.sel);
    }
    loaded.current = true;
    setBase(`${window.location.origin}${window.location.pathname}`);
  }, []);

  // La dirección del navegador siempre refleja el armado actual
  useEffect(() => {
    if (!loaded.current) return;
    window.history.replaceState(null, "", `${window.location.pathname}${shareQuery(use, budget, sel)}`);
  }, [use, budget, sel]);

  const shareUrl = () => `${base}${shareQuery(use, budget, sel)}`;

  const share = async () => {
    const url = shareUrl();
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title: "Mi PC en RUSH BUILD", text: `Mira la PC que armé: ${formatPEN(sum)}`, url });
        return;
      } catch {
        // cancelado: no pasa nada
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareState("copied");
    } catch {
      setShareState("error");
    }
    window.setTimeout(() => setShareState("idle"), 4000);
  };

  const parts = useMemo(() => resolve(sel), [sel]);
  const result = useMemo(() => checks(sel), [sel]);
  const sum = total(sel);
  const allOk = result.every((c) => c.ok);
  const diff = budget - sum;
  const needPsu = recommendedPsu(sel);

  const restart = (u: Use, b: number) => setSel(recommend(b, u));
  const change = (key: Key, id: string) => setSel(autoFix({ ...sel, [key]: id }));

  // Qué opciones se desactivan según lo ya elegido
  const why = {
    board: (id: string) => {
      const b = boards.find((x) => x.id === id)!;
      return b.socket !== parts.cpu.socket ? `socket ${b.socket}` : "";
    },
    ram: (id: string) => {
      const r = rams.find((x) => x.id === id)!;
      return r.mem !== parts.board.mem ? `la placa usa ${parts.board.mem}` : "";
    },
    case: (id: string) => {
      const c = cases.find((x) => x.id === id)!;
      return c.forms.includes(parts.board.form) ? "" : "no entra una placa ATX";
    },
    psu: (id: string) => {
      const p = psus.find((x) => x.id === id)!;
      return p.watts < needPsu ? `se recomiendan ${needPsu} W` : "";
    },
    cooler: (id: string) => {
      const c = coolers.find((x) => x.id === id)!;
      if (c.stock) return parts.cpu.boxCooler ? "" : "este procesador no lo trae";
      return c.sockets.includes(parts.cpu.socket) ? "" : `no soporta ${parts.cpu.socket}`;
    },
  } as Partial<Record<Key, (id: string) => string>>;

  const lists: Record<Key, { id: string; name: string; price: number }[]> = {
    cpu: cpus,
    board: boards,
    ram: rams,
    gpu: gpus,
    storage: storages,
    psu: psus,
    case: cases,
    cooler: coolers,
  };
  const order: Key[] = ["cpu", "gpu", "board", "ram", "storage", "psu", "cooler", "case"];

  const message = [
    "Hola RUSH LAB, armé esta PC en RUSH BUILD:",
    ...order.map((k) => `• ${labels[k]}: ${parts[k].name}`),
    `Total estimado: ${formatPEN(sum)} (con armado y pruebas)`,
    `Uso: ${uses.find((u) => u.id === use)?.title}`,
    "¿Me confirman precio y stock?",
    ...(base ? ["", `Mi armado: ${shareUrl()}`] : []),
  ].join("\n");

  return (
    <div className="builder">
      <div className="builder-main">
        <section className="builder-step" aria-labelledby="b-step1">
          <h2 id="b-step1">
            <span className="step-num">1</span> ¿Para qué la vas a usar?
          </h2>
          <div className="use-grid" role="radiogroup" aria-labelledby="b-step1">
            {uses.map((u) => (
              <label key={u.id} className={`use${use === u.id ? " is-on" : ""}`}>
                <input
                  type="radio"
                  name="use"
                  value={u.id}
                  checked={use === u.id}
                  onChange={() => {
                    setUse(u.id);
                    restart(u.id, budget);
                  }}
                />
                <strong>{u.title}</strong>
                <span>{u.text}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="builder-step" aria-labelledby="b-step2">
          <h2 id="b-step2">
            <span className="step-num">2</span> ¿Cuál es tu presupuesto?
          </h2>
          <div className="budget">
            <output htmlFor="budget" className="budget-value">
              {formatPEN(budget)}
            </output>
            <input
              id="budget"
              type="range"
              min={MIN}
              max={MAX}
              step={STEP}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              onPointerUp={() => restart(use, budget)}
              onKeyUp={() => restart(use, budget)}
              onBlur={() => restart(use, budget)}
              aria-describedby="budget-help"
            />
            <div className="budget-scale" aria-hidden="true">
              <span>{formatPEN(MIN)}</span>
              <span>{formatPEN(MAX)}</span>
            </div>
            <p id="budget-help" className="small muted">
              Al soltar, Prof. Rush arma la mejor configuración que entra en tu presupuesto.
            </p>
          </div>
        </section>

        <section className="builder-step" aria-labelledby="b-step3">
          <h2 id="b-step3">
            <span className="step-num">3</span> Personaliza tu experimento
          </h2>
          <p className="small muted">Si cambias una pieza, ajustamos solas las que dejarían de ser compatibles.</p>
          <div className="part-list">
            {order.map((key) => (
              <label key={key} className="part-row">
                <span className="part-label">{labels[key]}</span>
                <select id={`part-${key}`} value={sel[key]} onChange={(e) => change(key, e.target.value)}>
                  {lists[key].map((opt) => {
                    const reason = why[key]?.(opt.id) ?? "";
                    const delta = opt.price - parts[key].price;
                    const deltaText =
                      opt.id === sel[key]
                        ? ""
                        : delta === 0
                          ? " (mismo precio)"
                          : ` (${delta > 0 ? "+" : "−"}${formatPEN(Math.abs(delta))})`;
                    return (
                      <option key={opt.id} value={opt.id} disabled={Boolean(reason) && key !== "cpu"}>
                        {opt.name}
                        {reason ? ` · no compatible: ${reason}` : deltaText}
                      </option>
                    );
                  })}
                </select>
                <span className="part-price">{parts[key].price ? formatPEN(parts[key].price) : "Incluido"}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <aside className="builder-summary" aria-label="Tu experimento actual">
        <h2>Tu experimento</h2>
        <dl className="sum-list">
          {order.map((k) => (
            <div key={k}>
              <dt>{labels[k]}</dt>
              <dd>
                <span>{parts[k].name}</span>
                <span className="sum-price">{parts[k].price ? formatPEN(parts[k].price) : "Incluido"}</span>
              </dd>
            </div>
          ))}
          <div>
            <dt>Servicio</dt>
            <dd>
              <span>Armado, pruebas y reporte</span>
              <span className="sum-price">{formatPEN(ASSEMBLY_FEE)}</span>
            </dd>
          </div>
        </dl>

        <div className="sum-total">
          <span>Total estimado</span>
          <strong>{formatPEN(sum)}</strong>
        </div>
        <p className={`sum-budget ${diff >= 0 ? "under" : "over"}`}>
          {diff >= 0
            ? `${formatPEN(diff)} por debajo de tu presupuesto`
            : `${formatPEN(-diff)} por encima de tu presupuesto`}
        </p>

        <ul className="compat">
          {result.map((c) => (
            <li key={c.label} className={c.ok ? "ok" : "bad"}>
              {c.ok ? (
                <Check />
              ) : (
                <span className="x" aria-hidden="true">
                  !
                </span>
              )}
              <span>
                <strong>{c.label}</strong>
                <small>{c.detail}</small>
              </span>
            </li>
          ))}
        </ul>
        <p className="small muted">
          Consumo estimado: {estimatedWatts(sel)} W. Fuente recomendada: {needPsu} W o más.
        </p>

        <a
          className={`btn ${allOk ? "btn-primary" : "btn-outline"}`}
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener"
        >
          <WhatsApp />
          {allOk ? "Pedir este armado" : "Consultar este armado"}
        </a>
        <button type="button" className="btn btn-ghost" onClick={share}>
          <Share />
          {shareState === "copied" ? "Enlace copiado" : "Compartir este armado"}
        </button>
        {shareState === "error" && (
          <p className="small muted" role="status">
            No pudimos copiar el enlace. Cópialo desde la barra de direcciones: ya incluye tu armado.
          </p>
        )}
        <span className="visually-hidden" role="status">
          {shareState === "copied" ? "Enlace del armado copiado" : ""}
        </span>
        <PayMethods note={false} />
        <p className="small muted">Precios de ejemplo. Confirmamos precio, stock y marcas exactas antes de cobrar.</p>
      </aside>
    </div>
  );
}
