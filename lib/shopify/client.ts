// Cliente mínimo de la Storefront API de Shopify (solo lectura pública).
// Las credenciales vienen de variables de entorno en Vercel:
//   SHOPIFY_STORE_DOMAIN       ej.: rushlab-store.myshopify.com
//   SHOPIFY_STOREFRONT_TOKEN   token de acceso público del canal Headless
// Nunca se envían al navegador: estas funciones solo corren en el servidor.

export const SHOPIFY_API_VERSION = "2026-04";

/** Cada cuántos segundos se vuelven a pedir los datos a Shopify. */
export const REVALIDATE_SECONDS = 300;

export function shopifyConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_TOKEN);
}

function endpoint(): string {
  const raw = (process.env.SHOPIFY_STORE_DOMAIN ?? "").trim().replace(/\/+$/, "");
  // Solo para pruebas locales con un Shopify simulado (http://localhost:PUERTO)
  if (raw.startsWith("http://localhost") || raw.startsWith("http://127.0.0.1")) {
    return `${raw}/api/${SHOPIFY_API_VERSION}/graphql.json`;
  }
  const domain = raw.replace(/^https?:\/\//, "");
  return `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`;
}

export class ShopifyError extends Error {
  constructor(
    message: string,
    public readonly kind: "not_configured" | "http" | "graphql" | "network",
    public readonly status?: number,
  ) {
    super(message);
  }
}

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: { revalidate?: number | false; cache?: RequestCache } = {},
): Promise<T> {
  if (!shopifyConfigured()) {
    throw new ShopifyError("Faltan SHOPIFY_STORE_DOMAIN o SHOPIFY_STOREFRONT_TOKEN.", "not_configured");
  }

  let res: Response;
  try {
    res = await fetch(endpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": (process.env.SHOPIFY_STOREFRONT_TOKEN ?? "").trim(),
      },
      body: JSON.stringify({ query, variables }),
      ...(options.cache
        ? { cache: options.cache }
        : { next: { revalidate: options.revalidate ?? REVALIDATE_SECONDS, tags: ["shopify"] } }),
    });
  } catch (e) {
    throw new ShopifyError(`No se pudo conectar con Shopify: ${(e as Error).message}`, "network");
  }

  if (!res.ok) {
    const hint =
      res.status === 401 || res.status === 403
        ? "El token no es válido o le faltan permisos."
        : res.status === 404
          ? "El dominio de la tienda no es correcto."
          : "Shopify respondió con un error.";
    throw new ShopifyError(`${hint} (HTTP ${res.status})`, "http", res.status);
  }

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) {
    throw new ShopifyError(json.errors.map((e) => e.message).join(" · "), "graphql");
  }
  if (!json.data) throw new ShopifyError("Shopify no devolvió datos.", "graphql");
  return json.data;
}
