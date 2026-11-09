"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Cart } from "@/lib/shopify/cart";

interface CartState {
  cart: Cart | null;
  /** true mientras se carga el carrito por primera vez */
  loading: boolean;
  /** id de la variante o línea que se está modificando */
  busy: string | null;
  error: string | null;
  /** Último producto agregado, para el aviso "Agregado al carrito" */
  lastAdded: string | null;
  add: (variantId: string, quantity?: number, name?: string) => Promise<boolean>;
  update: (lineId: string, quantity: number) => Promise<void>;
  remove: (lineId: string) => Promise<void>;
  dismiss: () => void;
}

const CartContext = createContext<CartState | null>(null);

async function call(body: unknown): Promise<{ cart?: Cart | null; error?: string }> {
  try {
    const res = await fetch("/api/carrito/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch {
    return { error: "Sin conexión. Revisa tu internet e inténtalo de nuevo." };
  }
}

export function CartProvider({ enabled, children }: { enabled: boolean; children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    fetch("/api/carrito/")
      .then((r) => r.json())
      .then((d: { cart?: Cart | null }) => setCart(d.cart ?? null))
      .catch(() => setError("No pudimos cargar tu carrito."))
      .finally(() => setLoading(false));
  }, [enabled]);

  const add = useCallback(async (variantId: string, quantity = 1, name?: string) => {
    setBusy(variantId);
    setError(null);
    const r = await call({ action: "add", variantId, quantity });
    setBusy(null);
    if (r.error) {
      setError(r.error);
      return false;
    }
    setCart(r.cart ?? null);
    setLastAdded(name ?? "Producto");
    return true;
  }, []);

  const update = useCallback(async (lineId: string, quantity: number) => {
    setBusy(lineId);
    setError(null);
    const r = await call({ action: "update", lineId, quantity });
    setBusy(null);
    if (r.error) setError(r.error);
    else setCart(r.cart ?? null);
  }, []);

  const remove = useCallback(async (lineId: string) => {
    setBusy(lineId);
    setError(null);
    const r = await call({ action: "remove", lineId });
    setBusy(null);
    if (r.error) setError(r.error);
    else setCart(r.cart ?? null);
  }, []);

  const dismiss = useCallback(() => {
    setLastAdded(null);
    setError(null);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <CartContext.Provider value={{ cart, loading, busy, error, lastAdded, add, update, remove, dismiss }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartState | null {
  return useContext(CartContext);
}
