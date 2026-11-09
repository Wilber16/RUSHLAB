"use client";

import { CartIcon } from "../icons";
import { useCart } from "./CartProvider";

export function AddToCart({
  variantId,
  name,
  variant = "primary",
  label = "Agregar al carrito",
}: {
  variantId: string;
  name: string;
  variant?: "primary" | "ghost";
  label?: string;
}) {
  const ctx = useCart();
  if (!ctx) return null;
  const working = ctx.busy === variantId;

  return (
    <button
      type="button"
      className={`btn btn-${variant}`}
      disabled={working}
      aria-busy={working}
      onClick={() => ctx.add(variantId, 1, name)}
    >
      <CartIcon />
      {working ? "Agregando…" : label}
    </button>
  );
}
