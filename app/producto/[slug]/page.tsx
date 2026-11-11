import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getAreaBySlug, getProductBySlug, getRelatedProducts, brandSlug } from "@/lib/catalog";
import type { Availability } from "@/lib/catalog";
import { getKindInfo } from "@/lib/catalog/kind-info";
import { formatPEN, whatsappLink } from "@/lib/config";
import { imageSrcSet, sizedImage } from "@/lib/shopify/image";
import { ProductCard } from "@/components/area/ProductCard";
import { PayMethods } from "@/components/PayMethods";
import { AddToCart } from "@/components/cart/AddToCart";
import { ProductGallery } from "@/components/product/ProductGallery";
import { BuyBar } from "@/components/product/BuyBar";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site-url";
import { Check, KindIcon, Receipt, Shield, Truck, WhatsApp } from "@/components/icons";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.brand} ${product.name} · RUSH LAB`,
    description: `${product.kind} ${product.brand} ${product.name}: ${product.specs.join(", ")}. Envío a todo el Perú.`,
    alternates: { canonical: `/producto/${product.slug}/` },
    openGraph: product.image
      ? { images: [{ url: product.image.url, alt: product.image.alt }], title: `${product.brand} ${product.name}` }
      : undefined,
  };
}

const schemaAvailability: Record<Availability, string> = {
  in_stock: "https://schema.org/InStock",
  on_order: "https://schema.org/BackOrder",
  sold_out: "https://schema.org/OutOfStock",
};

const availabilityCopy: Record<Availability, { title: string; text: string }> = {
  in_stock: {
    title: "Disponible",
    text: "Lo tenemos confirmado con el proveedor. Entrega en Lima en 24 a 48 h; a provincias según la agencia.",
  },
  on_order: {
    title: "Bajo pedido",
    text: "Lo pedimos al confirmar tu pago. Entrega en 2 a 4 días hábiles.",
  },
  sold_out: {
    title: "Agotado por ahora",
    text: "Escríbenos y te avisamos cuando vuelva, o te recomendamos una alternativa equivalente.",
  },
};

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [area, related] = await Promise.all([getAreaBySlug(product.area), getRelatedProducts(product)]);
  const info = getKindInfo(product.kind);
  const stock = availabilityCopy[product.availability];
  const soldOut = product.availability === "sold_out";
  const fullName = `${product.brand} ${product.name}`;

  return (
    <div className="wrap product-page">
      {!product.priceIsExample && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: fullName,
            brand: { "@type": "Brand", name: product.brand },
            category: product.kind,
            description: `${product.kind} ${fullName}: ${product.specs.join(", ")}.`,
            image: Array.from(new Set([product.image, ...(product.images ?? [])].filter(Boolean).map((i) => i!.url))),
            url: absoluteUrl(`/producto/${product.slug}/`),
            offers: {
              "@type": "Offer",
              priceCurrency: "PEN",
              price: product.price.toFixed(2),
              availability: schemaAvailability[product.availability],
              itemCondition: "https://schema.org/NewCondition",
              url: absoluteUrl(`/producto/${product.slug}/`),
            },
          }}
        />
      )}
      <nav className="crumbs" aria-label="Ruta">
        <a href="/">Inicio</a>
        <span aria-hidden="true">/</span>
        <a href="/areas/">Áreas del laboratorio</a>
        {area && (
          <>
            <span aria-hidden="true">/</span>
            <a href={area.href}>{area.name}</a>
          </>
        )}
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <section className="product-top">
        <div className="product-gallery">
          {product.image ? (
            <>
              <ProductGallery
                name={fullName}
                images={[product.image, ...(product.images ?? []).filter((i) => i.url !== product.image?.url)]}
              />
            </>
          ) : (
            <>
              <div className="product-visual" aria-hidden="true">
                <KindIcon kind={product.kind} />
              </div>
              <p className="product-photo-note">Foto del producto pendiente.</p>
            </>
          )}
        </div>

        <div className="product-info">
          <p className="pcard-brand">
            <a href={`/marca/${brandSlug(product.brand)}/`}>{product.brand}</a> · {product.kind}
          </p>
          <h1 className="product-name">{product.name}</h1>
          <ul className="pcard-specs product-specs">
            {product.specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <div className="product-buy">
            <p className="product-price">
              {product.compareAtPrice && <s>{formatPEN(product.compareAtPrice)}</s>}
              {formatPEN(product.price)}
            </p>
            <p className="product-price-note">
              Precio con IGV.{product.priceIsExample && " Precio de ejemplo para esta vista previa."}
            </p>

            <div className={`product-stock stock-${product.availability}`}>
              <span className="dot" aria-hidden="true" />
              <div>
                <strong>{stock.title}</strong>
                <p>{stock.text}</p>
              </div>
            </div>

            <div className="product-ctas" id="buy-ctas">
              {product.variantId && !soldOut && <AddToCart variantId={product.variantId} name={fullName} />}
              <a
                className={`btn ${soldOut ? "btn-outline" : product.variantId ? "btn-ghost" : "btn-primary"}`}
                href={whatsappLink(
                  soldOut
                    ? `Hola RUSH LAB, avísenme cuando tengan el ${fullName}.`
                    : `Hola RUSH LAB, quiero comprar el ${fullName} (${formatPEN(product.price)}).`,
                )}
                target="_blank"
                rel="noopener"
              >
                <WhatsApp />
                {soldOut
                  ? "Avisarme cuando llegue"
                  : product.variantId
                    ? "Consultar por WhatsApp"
                    : "Cotizar por WhatsApp"}
              </a>
              <a
                className="btn btn-ghost"
                href={whatsappLink(`Hola RUSH LAB, ¿el ${fullName} es compatible con mi PC? Estas son mis piezas: `)}
                target="_blank"
                rel="noopener"
              >
                Consultar compatibilidad
              </a>
            </div>

            <ul className="proof product-proof">
              <li>
                <Receipt />
                Boleta o factura
              </li>
              <li>
                <Shield />
                Garantía por escrito
              </li>
              <li>
                <Truck />
                Envío a todo el Perú
              </li>
            </ul>
            <PayMethods />
          </div>
        </div>
      </section>
      {!soldOut && (
        <BuyBar
          targetId="buy-ctas"
          name={fullName}
          price={product.price}
          variantId={product.variantId}
          whatsappHref={whatsappLink(`Hola RUSH LAB, quiero comprar el ${fullName} (${formatPEN(product.price)}).`)}
        />
      )}

      <section className="product-details">
        <div className="product-block">
          <h2>Ficha técnica</h2>
          <dl className="spec-table">
            <div>
              <dt>Marca</dt>
              <dd>
                <a href={`/marca/${brandSlug(product.brand)}/`}>{product.brand}</a>
              </dd>
            </div>
            <div>
              <dt>Modelo</dt>
              <dd>{product.name}</dd>
            </div>
            <div>
              <dt>Tipo</dt>
              <dd>{product.kind}</dd>
            </div>
            {product.details ? (
              product.details.map((d) => (
                <div key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))
            ) : (
              <div>
                <dt>Características</dt>
                <dd>{product.specs.join(", ")}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="product-block product-checks">
          <h2>Antes de comprar, revisa</h2>
          <p className="muted">{info.role}</p>
          <ul>
            {info.checks.map((c) => (
              <li key={c}>
                <Check />
                {c}
              </li>
            ))}
          </ul>
          <p className="product-checks-help">
            ¿No sabes si es compatible? Envíanos las piezas de tu PC y lo revisamos sin costo.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="product-related" aria-labelledby="related-title">
          <div className="section-head">
            <h2 id="related-title">También en {area?.name ?? "esta área"}</h2>
            {area && (
              <a className="link-btn" href={area.href}>
                Ver toda el área
              </a>
            )}
          </div>
          <div className="pgrid">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
