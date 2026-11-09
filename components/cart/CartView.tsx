"use client";

import { formatPEN, site, whatsappLink } from "@/lib/config";
import { sizedImage } from "@/lib/shopify/image";
import { KindIcon, Minus, Plus, Trash, WhatsApp } from "../icons";
import { PayMethods } from "../PayMethods";
import { useCart } from "./CartProvider";

const MAX_QTY = 10;

export function CartView() {
  const ctx = useCart();

  if (!ctx || ctx.loading) {
    return <p className="muted">Cargando tu carrito…</p>;
  }

  const { cart, busy, update, remove, error } = ctx;

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="empty empty-wide">
        <p>
          <strong>Tu carrito está vacío.</strong>
        </p>
        <p>Explora las áreas del laboratorio o arma tu PC completa con RUSH BUILD.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="/areas/">
            Ver áreas del laboratorio
          </a>
          <a className="btn btn-ghost" href="/rush-build/">
            Armar mi PC
          </a>
        </div>
      </div>
    );
  }

  const unavailable = cart.lines.filter((l) => !l.availableForSale);
  const whatsappMessage = [
    "Hola RUSH LAB, quiero comprar:",
    ...cart.lines.map((l) => `• ${l.quantity} x ${l.brand} ${l.title} (${formatPEN(l.unitPrice)})`),
    `Subtotal: ${formatPEN(cart.subtotal)}`,
  ].join("\n");

  return (
    <div className="cart">
      <ul className="cart-lines">
        {cart.lines.map((line) => {
          const working = busy === line.id;
          return (
            <li key={line.id} className={`cart-line${working ? " is-busy" : ""}`}>
              <a className="cart-thumb" href={`/producto/${line.handle}/`} tabIndex={-1} aria-hidden="true">
                {line.image ? (
                  <img src={sizedImage(line.image.url, 160)} alt="" width={160} height={120} />
                ) : (
                  <KindIcon kind={line.kind} />
                )}
              </a>
              <div className="cart-line-info">
                <p className="pcard-brand">{line.brand}</p>
                <a className="cart-line-name" href={`/producto/${line.handle}/`}>
                  {line.title}
                </a>
                <p className="small muted">{formatPEN(line.unitPrice)} c/u</p>
                {!line.availableForSale && <p className="form-error small">Ya no está disponible. Quítalo para continuar.</p>}
              </div>
              <div className="qty" role="group" aria-label={`Cantidad de ${line.title}`}>
                <button
                  type="button"
                  onClick={() => update(line.id, line.quantity - 1)}
                  disabled={working}
                  aria-label="Quitar una unidad"
                >
                  <Minus />
                </button>
                <span aria-live="polite">{line.quantity}</span>
                <button
                  type="button"
                  onClick={() => update(line.id, line.quantity + 1)}
                  disabled={working || line.quantity >= MAX_QTY}
                  aria-label="Agregar una unidad"
                >
                  <Plus />
                </button>
              </div>
              <p className="cart-line-total">{formatPEN(line.lineTotal)}</p>
              <button
                type="button"
                className="cart-remove"
                onClick={() => remove(line.id)}
                disabled={working}
                aria-label={`Quitar ${line.title} del carrito`}
              >
                <Trash />
              </button>
            </li>
          );
        })}
      </ul>

      <aside className="cart-summary" aria-label="Resumen">
        <h2>Resumen</h2>
        <div className="sum-total">
          <span>Subtotal ({cart.totalQuantity} {cart.totalQuantity === 1 ? "producto" : "productos"})</span>
          <strong>{formatPEN(cart.subtotal)}</strong>
        </div>
        <p className="small muted">Precios con IGV. El envío se calcula en el siguiente paso según tu ciudad.</p>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <a
          className={`btn btn-primary btn-block${unavailable.length ? " is-disabled" : ""}`}
          href={unavailable.length ? undefined : cart.checkoutUrl}
          aria-disabled={unavailable.length > 0}
        >
          Ir a pagar
        </a>
        <PayMethods />
        <p className="small muted">
          Antes de preparar tu pedido confirmamos el stock con nuestro proveedor. Si algo cambia, te avisamos por
          WhatsApp y decides si continuar.
        </p>

        <div className="cart-alt">
          <span className="small muted">¿Prefieres que te atendamos directamente?</span>
          <a className="btn btn-ghost btn-block" href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener">
            <WhatsApp />
            Comprar por WhatsApp
          </a>
        </div>
        <p className="small muted">
          ¿Dudas? Escríbenos al {site.whatsappDisplay}. <a href="/politicas/terminos/">Términos de compra</a>
        </p>
      </aside>
    </div>
  );
}
