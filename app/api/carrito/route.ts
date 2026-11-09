// API del carrito: GET devuelve el carrito, POST lo modifica.
// El navegador nunca ve el token de Shopify; solo habla con esta ruta.

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { addLine, CartError, createCart, getCart, removeLine, updateLine, type Cart } from "@/lib/shopify/cart";
import { shopifyConfigured } from "@/lib/shopify/client";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const COOKIE = "rl_cart";
const MAX_QTY = 10;
const VARIANT_RE = /^gid:\/\/shopify\/ProductVariant\/\d+$/;
const LINE_RE = /^gid:\/\/shopify\/CartLine\/[\w-]+(\?.*)?$/;

function json(cart: Cart | null, status = 200) {
  return NextResponse.json({ cart }, { status, headers: { "Cache-Control": "no-store" } });
}

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

async function setCartCookie(id: string) {
  (await cookies()).set(COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 días
  });
}

export async function GET() {
  if (!shopifyConfigured()) return json(null);
  const id = (await cookies()).get(COOKIE)?.value;
  if (!id) return json(null);
  try {
    const cart = await getCart(id);
    if (!cart) (await cookies()).delete(COOKIE); // vencido o ya pagado
    return json(cart);
  } catch {
    return error("No pudimos cargar tu carrito. Inténtalo de nuevo en un momento.", 502);
  }
}

type Body =
  | { action: "add"; variantId: string; quantity?: number }
  | { action: "update"; lineId: string; quantity: number }
  | { action: "remove"; lineId: string };

export async function POST(request: Request) {
  if (!shopifyConfigured()) return error("La tienda todavía no está conectada.", 503);

  // 30 cambios por minuto por IP es de sobra para una persona real
  const limit = rateLimit(`cart:${clientIp(request.headers)}`, 30, 60_000);
  if (!limit.ok) return error("Demasiados cambios seguidos. Espera unos segundos e inténtalo de nuevo.", 429);

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return error("Solicitud no válida.", 400);
  }

  const jar = await cookies();
  const cartId = jar.get(COOKIE)?.value;

  try {
    if (body.action === "add") {
      const qty = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(body.quantity ?? 1))));
      if (!VARIANT_RE.test(body.variantId ?? "")) return error("Producto no válido.", 400);

      let cart: Cart | null = cartId ? await getCart(cartId) : null;
      if (cart) {
        const existing = cart.lines.find((l) => l.variantId === body.variantId);
        if (existing && existing.quantity + qty > MAX_QTY) {
          return error(`Puedes llevar hasta ${MAX_QTY} unidades por producto. Para más, escríbenos.`, 400);
        }
        cart = await addLine(cart.id, body.variantId, qty);
      } else {
        cart = await createCart(body.variantId, qty);
        await setCartCookie(cart.id);
      }
      return json(cart);
    }

    if (!cartId) return error("Tu carrito está vacío.", 400);

    if (body.action === "update") {
      if (!LINE_RE.test(body.lineId ?? "")) return error("Línea no válida.", 400);
      const qty = Math.floor(Number(body.quantity));
      if (!Number.isFinite(qty) || qty < 0 || qty > MAX_QTY) {
        return error(`La cantidad debe estar entre 0 y ${MAX_QTY}.`, 400);
      }
      return json(qty === 0 ? await removeLine(cartId, body.lineId) : await updateLine(cartId, body.lineId, qty));
    }

    if (body.action === "remove") {
      if (!LINE_RE.test(body.lineId ?? "")) return error("Línea no válida.", 400);
      return json(await removeLine(cartId, body.lineId));
    }

    return error("Acción no válida.", 400);
  } catch (e) {
    if (e instanceof CartError) return error(e.message, 400);
    return error("No pudimos actualizar tu carrito. Inténtalo de nuevo en un momento.", 502);
  }
}
