"use client";

import { useEffect, useState } from "react";
import type { SearchEntry } from "@/app/api/buscar/route";
import { formatPEN } from "@/lib/config";
import { loadIndex } from "@/lib/search-index";
import { KindIcon } from "./icons";

const KEY = "rl_vistos";
const MAX_STORED = 12;

function read(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function remember(href: string) {
  try {
    localStorage.setItem(KEY, JSON.stringify([href, ...read().filter((h) => h !== href)].slice(0, MAX_STORED)));
  } catch {
    // modo privado o almacenamiento bloqueado: simplemente no se recuerda
  }
}

/**
 * Productos que esta persona miró antes (solo en su navegador).
 * Precio y stock salen del catálogo actual, no de lo que vio entonces.
 */
export function RecentlyViewed({ current, limit = 6 }: { current?: string; limit?: number }) {
  const [items, setItems] = useState<SearchEntry[]>([]);

  useEffect(() => {
    const seen = read().filter((h) => h !== current);
    if (current) remember(current);
    if (seen.length === 0) return;
    loadIndex().then((index) => {
      const byHref = new Map(index.map((e) => [e.href, e]));
      setItems(
        seen
          .map((h) => byHref.get(h))
          .filter((e): e is SearchEntry => Boolean(e))
          .slice(0, limit),
      );
    });
  }, [current, limit]);

  if (items.length === 0) return null;

  return (
    <section className="recent" aria-labelledby="recent-title">
      <h2 id="recent-title">Vistos recientemente</h2>
      <ul className="recent-list">
        {items.map((e) => (
          <li key={e.href}>
            <a className="mini-card" href={e.href}>
              <span className="mini-thumb">
                {e.image ? (
                  <img src={e.image} alt="" width={120} height={90} loading="lazy" />
                ) : (
                  <KindIcon kind={e.kind} />
                )}
              </span>
              <span className="mini-title">
                {e.brand} {e.title}
              </span>
              <span className="mini-foot">
                <strong>{formatPEN(e.price)}</strong>
                <span className={`mini-stock stock-${e.availability}`}>
                  {e.availability === "in_stock"
                    ? "Disponible"
                    : e.availability === "on_order"
                      ? "Bajo pedido"
                      : "Agotado"}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
