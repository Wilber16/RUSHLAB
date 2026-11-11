import { getAllBuilds, getAllProducts } from "@/lib/catalog";
import { sizedImage } from "@/lib/shopify/image";

// Índice liviano para las sugerencias del buscador. Se regenera con el catálogo
// (cada 5 minutos o al instante cuando Shopify avisa un cambio).
export const dynamic = "force-static";
export const revalidate = 300;

export type SearchEntry = {
  href: string;
  title: string;
  brand: string;
  kind: string;
  price: number;
  availability: "in_stock" | "on_order" | "sold_out";
  image?: string;
  /** Para agregar al carrito desde las sugerencias */
  variantId?: string;
  /** Texto donde se busca: marca, nombre, tipo y especificaciones */
  text: string;
};

export async function GET() {
  const [products, builds] = await Promise.all([getAllProducts(), getAllBuilds()]);
  const entries: SearchEntry[] = [
    ...products.map((p) => ({
      href: `/producto/${p.slug}/`,
      title: p.name,
      brand: p.brand,
      kind: p.kind,
      price: p.price,
      availability: p.availability,
      image: p.image ? sizedImage(p.image.url, 120) : undefined,
      variantId: p.variantId,
      text: `${p.brand} ${p.name} ${p.kind} ${p.specs.join(" ")}`,
    })),
    ...builds.map((b) => ({
      href: `/pc-armadas/${b.slug}/`,
      title: b.name,
      brand: "RUSH BUILD",
      kind: "PC armada",
      price: b.price,
      availability: "in_stock" as const,
      text: `${b.name} pc armada rush build gamer ${b.target} ${b.purpose} ${b.parts.map((x) => x.value).join(" ")}`,
    })),
  ];
  return Response.json(entries);
}
