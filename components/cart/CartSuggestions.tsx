"use client";

import { useEffect, useMemo, useState } from "react";
import type { SearchEntry } from "@/app/api/buscar/route";
import { complementsFor } from "@/lib/complements";
import { formatPEN } from "@/lib/config";
import { loadIndex } from "@/lib/search-index";
import { KindIcon } from "../icons";
import { AddToCart } from "./AddToCart";
import type { CartLine } from "@/lib/shopify/cart";

type Item = SearchEntry & { key: string };

/** "Complementa tu compra": piezas compatibles con lo que ya está en el carrito. */
export function CartSuggestions({ lines }: { lines: CartLine[] }) {
  const [index, setIndex] = useState<Item[] | null>(null);

  useEffect(() => {
    loadIndex().then((all) =>
      setIndex(all.filter((e) => e.href.startsWith("/producto/")).map((e) => ({ ...e, key: e.href }))),
    );
  }, []);

  const suggestions = useMemo(() => {
    if (!index) return [];
    const byHref = new Map(index.map((e) => [e.href, e]));
    const sources = lines.map((l) => byHref.get(`/producto/${l.handle}/`)).filter((e): e is Item => Boolean(e));
    if (sources.length === 0) return [];
    return complementsFor(sources, index, 3);
  }, [index, lines]);

  if (suggestions.length === 0) return null;

  return (
    <section className="cart-suggest" aria-labelledby="cart-suggest-title">
      <h2 id="cart-suggest-title">Complementa tu compra</h2>
      <ul>
        {suggestions.map(({ item, reason }) => (
          <li key={item.href} className="cart-suggest-item">
            <a className="cart-suggest-thumb" href={item.href} tabIndex={-1} aria-hidden="true">
              {item.image ? (
                <img src={item.image} alt="" width={120} height={90} loading="lazy" />
              ) : (
                <KindIcon kind={item.kind} />
              )}
            </a>
            <div className="cart-suggest-info">
              <a href={item.href}>
                {item.brand} {item.title}
              </a>
              <span className="small muted">
                {item.kind}
                {reason && <span className="pcard-note">{reason}</span>}
              </span>
            </div>
            <strong className="cart-suggest-price">{formatPEN(item.price)}</strong>
            {item.variantId ? (
              <AddToCart
                variantId={item.variantId}
                name={`${item.brand} ${item.title}`}
                variant="ghost"
                label="Agregar"
              />
            ) : (
              <a className="btn btn-ghost" href={item.href}>
                Ver
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
