import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrandBySlug, getBrands, getProductsByBrand } from "@/lib/catalog";
import { ProductGrid } from "@/components/area/ProductGrid";
import { sizedImage } from "@/lib/shopify/image";

type Params = { slug: string };

export const revalidate = 300;

export async function generateStaticParams(): Promise<Params[]> {
  return (await getBrands()).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: `${brand.name} en Perú: componentes y periféricos · RUSH LAB`,
    description: `Productos ${brand.name} en RUSH LAB con precio en soles, stock confirmado y envío a todo el Perú.`,
    alternates: { canonical: `/marca/${brand.slug}/` },
  };
}

export default async function BrandPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [brand, products] = await Promise.all([getBrandBySlug(slug), getProductsByBrand(slug)]);
  if (!brand) notFound();

  return (
    <section className="section" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Ruta">
          <a href="/">Inicio</a>
          <span aria-hidden="true">/</span>
          <a href="/marcas/">Marcas</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{brand.name}</span>
        </nav>
        <div className="section-head brand-head">
          {brand.logo ? (
            <h1 className="brand-hero-logo">
              <img src={sizedImage(brand.logo.url, 480)} alt={brand.name} />
            </h1>
          ) : (
            <h1 className="page-title brand-title">{brand.name}</h1>
          )}
          <p>
            Todo lo de {brand.name} que tenemos en el laboratorio, con precio en soles y stock confirmado antes de
            pagar.
          </p>
        </div>
        <ProductGrid products={products} areaName={brand.name} />
      </div>
    </section>
  );
}
