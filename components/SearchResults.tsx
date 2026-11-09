"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Build, Product } from "@/lib/catalog";
import { matches } from "@/lib/search";
import { whatsappLink } from "@/lib/config";
import { ProductCard } from "./area/ProductCard";
import { BuildCard } from "./BuildCard";
import { Search, WhatsApp } from "./icons";

const suggestions = ["RTX 5070", "32 GB DDR5", "SSD 1 TB", "Monitor 1440p", "Ryzen 7", "Fuente 750 W"];

export function SearchResults({ products, builds }: { products: Product[]; builds: Build[] }) {
  const params = useSearchParams();
  const q = (params.get("q") ?? "").trim();

  const { foundProducts, foundBuilds } = useMemo(() => {
    if (!q) return { foundProducts: [], foundBuilds: [] };
    return {
      foundProducts: products.filter((p) =>
        matches(`${p.brand} ${p.name} ${p.kind} ${p.specs.join(" ")}`, q),
      ),
      foundBuilds: builds.filter((b) =>
        matches(`${b.name} ${b.purpose} ${b.target} ${[...b.parts, ...b.extraParts].map((x) => x.value).join(" ")}`, q),
      ),
    };
  }, [q, products, builds]);

  const total = foundProducts.length + foundBuilds.length;

  return (
    <div className="search-page">
      <form className="search search-big" role="search" action="/buscar/" method="get">
        <label className="visually-hidden" htmlFor="q-page">
          Buscar productos
        </label>
        <input id="q-page" name="q" type="search" defaultValue={q} placeholder="¿Qué experimento buscas hoy?" />
        <button type="submit" aria-label="Buscar">
          <Search />
        </button>
      </form>

      {!q && (
        <div className="search-empty">
          <h1 className="page-title">Busca en el laboratorio</h1>
          <p className="muted">Prueba con un modelo, una marca o lo que necesitas:</p>
          <div className="chips">
            {suggestions.map((s) => (
              <a key={s} className="chip-link" href={`/buscar/?q=${encodeURIComponent(s)}`}>
                {s}
              </a>
            ))}
          </div>
        </div>
      )}

      {q && (
        <h1 className="search-title">
          {total} {total === 1 ? "resultado" : "resultados"} para “{q}”
        </h1>
      )}

      {foundBuilds.length > 0 && (
        <section aria-label="PCs armadas">
          <h2 className="search-group">PCs armadas</h2>
          <div className="builds">
            {foundBuilds.map((b) => (
              <BuildCard key={b.slug} build={b} />
            ))}
          </div>
        </section>
      )}

      {foundProducts.length > 0 && (
        <section aria-label="Productos">
          <h2 className="search-group">Productos</h2>
          <div className="pgrid">
            {foundProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {q && total === 0 && (
        <div className="empty empty-wide">
          <p>
            <strong>No encontramos “{q}” en el catálogo publicado.</strong>
          </p>
          <p>
            Trabajamos con varios proveedores, así que es probable que podamos conseguirlo. Escríbenos y te cotizamos.
          </p>
          <a
            className="btn btn-primary"
            href={whatsappLink(`Hola RUSH LAB, busco: ${q}. ¿Lo pueden conseguir?`)}
            target="_blank"
            rel="noopener"
          >
            <WhatsApp />
            Pedir cotización de “{q}”
          </a>
        </div>
      )}
    </div>
  );
}
