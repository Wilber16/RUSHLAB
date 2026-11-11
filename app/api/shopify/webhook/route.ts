import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

// Shopify avisa aquí cada vez que cambia un producto, su stock o una colección.
// Verificamos la firma (para que nadie más pueda llamarlo) y refrescamos el catálogo
// al instante en vez de esperar los 5 minutos.
//
// Configuración: Shopify → Configuración → Notificaciones → Webhooks.
// La clave de firma que muestra Shopify va en Vercel como SHOPIFY_WEBHOOK_SECRET.

export const dynamic = "force-dynamic";

function validSignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = createHmac("sha256", secret).update(body, "utf8").digest();
  let received: Buffer;
  try {
    received = Buffer.from(signature, "base64");
  } catch {
    return false;
  }
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export async function POST(request: Request) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: "Webhook no configurado" }, { status: 503 });

  const body = await request.text();
  if (!validSignature(body, request.headers.get("x-shopify-hmac-sha256"), secret)) {
    return Response.json({ error: "Firma inválida" }, { status: 401 });
  }

  // Vence ya: la próxima visita trae precios y stock actualizados
  revalidateTag("shopify", { expire: 0 });
  console.log("[webhook] catálogo actualizado por", request.headers.get("x-shopify-topic") ?? "aviso de Shopify");
  return Response.json({ ok: true });
}
