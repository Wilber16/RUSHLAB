"use client";

import { useEffect } from "react";
import { Check } from "../icons";
import { useCart } from "./CartProvider";

/** Aviso al agregar un producto, o mensaje de error del carrito. */
export function CartToast() {
  const ctx = useCart();
  const visible = Boolean(ctx?.lastAdded || ctx?.error);

  const lastAdded = ctx?.lastAdded;
  const dismiss = ctx?.dismiss;
  useEffect(() => {
    if (!lastAdded || !dismiss) return;
    const t = window.setTimeout(dismiss, 6000);
    return () => window.clearTimeout(t);
  }, [lastAdded, dismiss]);

  if (!ctx || !visible) return null;

  return (
    <div className={`cart-toast${ctx.error ? " is-error" : ""}`} role="status" aria-live="polite">
      {ctx.error ? (
        <span>{ctx.error}</span>
      ) : (
        <>
          <Check />
          <span>
            <strong>{ctx.lastAdded}</strong> se agregó al carrito.
          </span>
          <a className="btn btn-primary" href="/carrito/">
            Ver carrito
          </a>
        </>
      )}
      <button type="button" className="cart-toast-close" onClick={ctx.dismiss} aria-label="Cerrar aviso">
        ×
      </button>
    </div>
  );
}
