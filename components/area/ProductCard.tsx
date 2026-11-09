import type { Availability, Product } from "@/lib/catalog";
import { formatPEN, whatsappLink } from "@/lib/config";
import { KindIcon, WhatsApp } from "../icons";
import { imageSrcSet, sizedImage } from "@/lib/shopify/image";

const availabilityText: Record<Availability, string> = {
  in_stock: "Disponible, entrega en 24 a 48 h",
  on_order: "Bajo pedido, 2 a 4 días",
  sold_out: "Agotado por ahora",
};

interface CompareProps {
  /** Si se pasa, la tarjeta muestra la casilla "Comparar" */
  compare?: { selected: boolean; disabled: boolean; onToggle: () => void };
}

export function ProductCard({ product, compare }: { product: Product } & CompareProps) {
  const soldOut = product.availability === "sold_out";
  const href = `/producto/${product.slug}/`;
  const message = soldOut
    ? `Hola RUSH LAB, avísenme cuando tengan el ${product.brand} ${product.name}.`
    : `Hola RUSH LAB, quiero cotizar el ${product.brand} ${product.name}.`;

  return (
    <article className={`pcard${soldOut ? " pcard-soldout" : ""}`}>
      <a className={`pcard-visual${product.image ? " has-photo" : ""}`} href={href} tabIndex={-1} aria-hidden="true">
        {product.image ? (
          <img
            src={sizedImage(product.image.url, 400)}
            srcSet={imageSrcSet(product.image.url, 400)}
            alt=""
            loading="lazy"
            width={400}
            height={250}
          />
        ) : (
          <KindIcon kind={product.kind} />
        )}
        <span className="pcard-kind">{product.kind}</span>
      </a>
      <div className="pcard-body">
        <div className="pcard-top">
          <p className="pcard-brand">{product.brand}</p>
          {compare && (
            <label className="pcard-compare">
              <input
                type="checkbox"
                checked={compare.selected}
                disabled={compare.disabled && !compare.selected}
                onChange={compare.onToggle}
              />
              Comparar
            </label>
          )}
        </div>
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
            className="btn btn-ghost"
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
