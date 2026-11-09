"use client";

import { CartIcon } from "../icons";
import { useCart } from "./CartProvider";

/** Ícono del carrito en el encabezado, con la cantidad de productos. */
export function CartLink() {
  const ctx = useCart();
  if (!ctx) return null;
  const count = ctx.cart?.totalQuantity ?? 0;
  return (
    <a className="cart-link" href="/carrito/" aria-label={count ? `Carrito, ${count} productos` : "Carrito vacío"}>
      <CartIcon />
      {count > 0 && <span className="cart-count">{count}</span>}
    </a>
  );
}
