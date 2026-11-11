"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

type Sort = "relevance" | "price-asc" | "price-desc";

const availabilityRank = { in_stock: 0, on_order: 1, sold_out: 2 } as const;

export function ProductGrid({ products, areaName }: { products: Product[]; areaName: string }) {
  const kinds = useMemo(() => [...new Set(products.map((p) => p.kind))], [products]);
  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))].sort(), [products]);

  const [kind, setKind] = useState<string>("all");
  const [brand, setBrand] = useState<string>("all");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState<Sort>("relevance");
  const [compare, setCompare] = useState<string[]>([]);
  const MAX_COMPARE = 3;
  const toggleCompare = (slug: string) =>
    setCompare((c) => (c.includes(slug) ? c.filter((s) => s !== slug) : c.length < MAX_COMPARE ? [...c, slug] : c));

  const visible = useMemo(() => {
    const list = products.filter(
      (p) =>
        (kind === "all" || p.kind === kind) &&
        (brand === "all" || p.brand === brand) &&
        (!onlyAvailable || p.availability !== "sold_out"),
    );
    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    // Relevancia: primero lo disponible, luego bajo pedido, al final agotados
    return [...list].sort((a, b) => availabilityRank[a.availability] - availabilityRank[b.availability]);
  }, [products, kind, brand, onlyAvailable, sort]);

  const filtered = kind !== "all" || brand !== "all" || onlyAvailable;
  const clear = () => {
    setKind("all");
    setBrand("all");
    setOnlyAvailable(false);
  };

  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <div className="catalog-bar">
        <h2 id="catalog-title">
          {visible.length} {visible.length === 1 ? "producto" : "productos"} en {areaName}
        </h2>
        <label className="sort">
          <span>Ordenar por</span>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="relevance">Disponibilidad</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </label>
      </div>

      <div className="filters">
        {kinds.length > 1 && (
          <div className="chips" role="group" aria-label="Tipo de producto">
            <button type="button" aria-pressed={kind === "all"} onClick={() => setKind("all")}>
              Todo
            </button>
            {kinds.map((k) => (
              <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>
                {k}
              </button>
            ))}
          </div>
        )}
        <div className="filter-row">
          {brands.length > 1 && (
            <label className="select-label">
              <span className="visually-hidden">Marca</span>
              <select id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="all">Todas las marcas</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="toggle">
            <input
              id="only-available"
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
            />
            Ocultar agotados
          </label>
          {filtered && (
            <button type="button" className="link-btn" onClick={clear}>
              Quitar filtros
            </button>
          )}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="pgrid">
          {visible.map((p) => (
            <ProductCard
              key={p.slug}
              product={p}
              compare={{
                selected: compare.includes(p.slug),
                disabled: compare.length >= MAX_COMPARE,
                onToggle: () => toggleCompare(p.slug),
              }}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>Ningún producto coincide con estos filtros.</p>
          <button type="button" className="btn btn-outline" onClick={clear}>
            Quitar filtros
          </button>
        </div>
      )}

      {compare.length > 0 && (
        <div className="compare-bar" role="region" aria-label="Productos para comparar">
          <span>
            {compare.length} de {MAX_COMPARE} para comparar
            {compare.length === 1 && <small> · elige al menos uno más</small>}
          </span>
          <div className="compare-bar-actions">
            <button type="button" className="link-btn" onClick={() => setCompare([])}>
              Limpiar
            </button>
            <a
              className={`btn btn-primary${compare.length < 2 ? " is-disabled" : ""}`}
              href={compare.length < 2 ? undefined : `/comparar/?p=${compare.join(",")}`}
              aria-disabled={compare.length < 2}
            >
              Comparar
            </a>
          </div>
        </div>
      )}

      {products.some((p) => p.priceIsExample) && (
        <p className="builds-note">
          Productos y precios de ejemplo para esta vista previa. Los reales vendrán de Shopify y se confirman con el
          stock del día antes de cobrar.
        </p>
      )}
    </section>
  );
}
