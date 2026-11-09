"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Availability, Product } from "@/lib/catalog";
import { formatPEN, whatsappLink } from "@/lib/config";
import { KindIcon, WhatsApp } from "./icons";

const availabilityText: Record<Availability, string> = {
  in_stock: "Disponible (24 a 48 h)",
  on_order: "Bajo pedido (2 a 4 días)",
  sold_out: "Agotado",
};

export function CompareTable({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const slugs = (params.get("p") ?? "").split(",").filter(Boolean).slice(0, 3);
  const items = slugs.map((s) => products.find((p) => p.slug === s)).filter((p): p is Product => Boolean(p));

  const remove = (slug: string) => {
    const rest = items.filter((p) => p.slug !== slug).map((p) => p.slug);
    router.replace(rest.length ? `/comparar/?p=${rest.join(",")}` : "/comparar/");
  };

  if (items.length === 0) {
    return (
      <div className="empty empty-wide" style={{ marginTop: 20 }}>
        <h1 className="page-title">Comparar productos</h1>
        <p>Marca la casilla “Comparar” en 2 o 3 productos de un área y pulsa el botón Comparar.</p>
        <a className="btn btn-primary" href="/areas/">
          Ir a las áreas del laboratorio
        </a>
      </div>
    );
  }

  const cheapest = Math.min(...items.map((p) => p.price));
  const mixedKinds = new Set(items.map((p) => p.kind)).size > 1;
  const maxSpecs = Math.max(...items.map((p) => p.specs.length));
  const names = items.map((p) => `${p.brand} ${p.name}`).join(", ");

  return (
    <div className="compare-page">
      <h1 className="page-title">Comparar {items.length} productos</h1>
      {mixedKinds && (
        <p className="legal-draft" role="note">
          Estás comparando productos de distinto tipo. La comparación es más útil entre productos del mismo tipo.
        </p>
      )}

      <div className="table-scroll">
        <table className="compare compare-products">
          <thead>
            <tr>
              <th scope="col">
                <span className="visually-hidden">Característica</span>
              </th>
              {items.map((p) => (
                <th key={p.slug} scope="col">
                  <div className="cmp-head">
                    <span className="cmp-icon" aria-hidden="true">
                      <KindIcon kind={p.kind} />
                    </span>
                    <a href={`/producto/${p.slug}/`}>
                      <small>{p.brand}</small>
                      {p.name}
                    </a>
                    <button type="button" className="link-btn" onClick={() => remove(p.slug)}>
                      Quitar
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="compare-price">
              <th scope="row">Precio</th>
              {items.map((p) => (
                <td key={p.slug}>
                  {formatPEN(p.price)}
                  {items.length > 1 && p.price === cheapest && <span className="cmp-tag">Menor precio</span>}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row">Tipo</th>
              {items.map((p) => (
                <td key={p.slug}>{p.kind}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">Disponibilidad</th>
              {items.map((p) => (
                <td key={p.slug}>{availabilityText[p.availability]}</td>
              ))}
            </tr>
            {Array.from({ length: maxSpecs }, (_, i) => (
              <tr key={i}>
                <th scope="row">{i === 0 ? "Características" : <span className="visually-hidden">Más</span>}</th>
                {items.map((p) => (
                  <td key={p.slug}>{p.specs.at(i) ?? "—"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-more">
        <p className="builds-note">¿Dudas entre estos? Te decimos cuál conviene según tu PC y tus juegos.</p>
        <a
          className="btn btn-primary"
          href={whatsappLink(`Hola RUSH LAB, estoy comparando: ${names}. ¿Cuál me conviene? Mi PC tiene: `)}
          target="_blank"
          rel="noopener"
        >
          <WhatsApp />
          Pedir recomendación
        </a>
      </div>
    </div>
  );
}
