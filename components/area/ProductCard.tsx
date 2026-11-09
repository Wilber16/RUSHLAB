import type { Availability, Product } from "@/lib/catalog";
import { formatPEN, whatsappLink } from "@/lib/config";
import { KindIcon, WhatsApp } from "../icons";

const availabilityText: Record<Availability, string> = {
  in_stock: "Disponible, entrega en 24 a 48 h",
  on_order: "Bajo pedido, 2 a 4 días",
  sold_out: "Agotado por ahora",
};

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.availability === "sold_out";
  const href = `/producto/${product.slug}/`;
  const message = soldOut
    ? `Hola RUSH LAB, avísenme cuando tengan el ${product.brand} ${product.name}.`
    : `Hola RUSH LAB, quiero cotizar el ${product.brand} ${product.name}.`;

  return (
    <article className={`pcard${soldOut ? " pcard-soldout" : ""}`}>
      <a className="pcard-visual" href={href} tabIndex={-1} aria-hidden="true">
        <KindIcon kind={product.kind} />
        <span className="pcard-kind">{product.kind}</span>
      </a>
      <div className="pcard-body">
        <p className="pcard-brand">{product.brand}</p>
        <h3 className="pcard-name">
          <a href={href}>{product.name}</a>
        </h3>
        <ul className="pcard-specs">
          {product.specs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="pcard-foot">
          <p className="pcard-price">
            {product.compareAtPrice && <s>{formatPEN(product.compareAtPrice)}</s>}
            {formatPEN(product.price)}
          </p>
          <p className={`pcard-stock stock-${product.availability}`}>
            <span className="dot" aria-hidden="true" />
            {availabilityText[product.availability]}
          </p>
          <a
            className={`btn ${soldOut ? "btn-ghost" : "btn-primary"}`}
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener"
          >
            <WhatsApp />
            {soldOut ? "Avisarme cuando llegue" : "Cotizar"}
          </a>
        </div>
      </div>
    </article>
  );
}
