"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { SearchEntry } from "@/app/api/buscar/route";
import { formatPEN } from "@/lib/config";
import { matches, normalize } from "@/lib/search";
import { KindIcon, Search } from "./icons";

const MAX = 6;
const rank = { in_stock: 0, on_order: 1, sold_out: 2 } as const;
const stockText = { in_stock: "Disponible", on_order: "Bajo pedido", sold_out: "Agotado" } as const;

let indexPromise: Promise<SearchEntry[]> | null = null;
function loadIndex(): Promise<SearchEntry[]> {
  indexPromise ??= fetch("/api/buscar/")
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => {
      indexPromise = null;
      return [];
    });
  return indexPromise;
}

/** Buscador con sugerencias mientras escribes. Enter sin elegir nada abre la página de resultados. */
export function SearchBox({
  id,
  placeholder,
  className = "search",
}: {
  id: string;
  placeholder: string;
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const root = useRef<HTMLFormElement>(null);

  const results = useMemo(() => {
    if (!index || normalize(query).length < 2) return [];
    const first = normalize(query).split(" ")[0];
    return index
      .filter((e) => matches(e.text, query))
      .sort(
        (a, b) =>
          Number(normalize(`${b.brand} ${b.title}`).includes(first)) -
            Number(normalize(`${a.brand} ${a.title}`).includes(first)) || rank[a.availability] - rank[b.availability],
      );
  }, [index, query]);

  const shown = results.slice(0, MAX);
  const showPanel = open && normalize(query).length >= 2 && index !== null;
  // Opciones navegables: sugerencias + "ver todos"
  const optionCount = shown.length + 1;

  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  const prepare = () => {
    if (!index) loadIndex().then(setIndex);
  };

  const allHref = `/buscar/?q=${encodeURIComponent(query.trim())}`;
  const optionId = (i: number) => `${listId}-o${i}`;

  return (
    <form
      ref={root}
      className={`${className} search-box`}
      role="search"
      action="/buscar/"
      method="get"
      onSubmit={(e) => {
        if (showPanel && active >= 0) {
          e.preventDefault();
          window.location.href = active < shown.length ? shown[active].href : allHref;
        }
      }}
    >
      <label className="visually-hidden" htmlFor={id}>
        Buscar productos
      </label>
      <input
        id={id}
        name="q"
        type="search"
        autoComplete="off"
        placeholder={placeholder}
        value={query}
        role="combobox"
        aria-expanded={showPanel}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showPanel && active >= 0 ? optionId(active) : undefined}
        onFocus={() => {
          prepare();
          setOpen(true);
        }}
        onPointerEnter={prepare}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(-1);
          setOpen(true);
          prepare();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            setActive(-1);
          } else if (e.key === "ArrowDown" && showPanel) {
            e.preventDefault();
            setActive((a) => (a + 1) % optionCount);
          } else if (e.key === "ArrowUp" && showPanel) {
            e.preventDefault();
            setActive((a) => (a <= 0 ? optionCount - 1 : a - 1));
          }
        }}
      />
      <button type="submit" aria-label="Buscar">
        <Search />
      </button>

      {showPanel && (
        <div className="suggest" id={listId} role="listbox" aria-label="Sugerencias">
          {shown.length === 0 && (
            <p className="suggest-empty">No encontramos “{query.trim()}”. Prueba con otra palabra.</p>
          )}
          {shown.map((e, i) => (
            <a
              key={e.href}
              id={optionId(i)}
              role="option"
              aria-selected={active === i}
              className={`suggest-item${active === i ? " is-active" : ""}`}
              href={e.href}
              onPointerEnter={() => setActive(i)}
            >
              <span className="suggest-thumb">
                {e.image ? (
                  <img src={e.image} alt="" width={56} height={42} loading="lazy" />
                ) : (
                  <KindIcon kind={e.kind} />
                )}
              </span>
              <span className="suggest-text">
                <span className="suggest-title">
                  {e.brand !== "RUSH BUILD" && `${e.brand} `}
                  {e.title}
                </span>
                <span className="suggest-meta">
                  {e.kind} ·{" "}
                  <span className={`suggest-stock stock-${e.availability}`}>{stockText[e.availability]}</span>
                </span>
              </span>
              <span className="suggest-price">{formatPEN(e.price)}</span>
            </a>
          ))}
          <a
            id={optionId(shown.length)}
            role="option"
            aria-selected={active === shown.length}
            className={`suggest-all${active === shown.length ? " is-active" : ""}`}
            href={allHref}
            onPointerEnter={() => setActive(shown.length)}
          >
            {results.length > MAX ? `Ver los ${results.length} resultados` : "Ver todos los resultados"} para “
            {query.trim()}”
          </a>
        </div>
      )}
    </form>
  );
}
