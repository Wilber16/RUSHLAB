import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAreaBySlug, getProductsByArea, getShopAreas } from "@/lib/catalog";
import { AreaBanner } from "@/components/area/AreaBanner";
import { AreaSidebar } from "@/components/area/AreaSidebar";
import { ProductGrid } from "@/components/area/ProductGrid";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const areas = await getShopAreas();
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) return {};
  return {
    title: `${area.name}: ${area.description} · RUSH LAB`,
    description: area.intro ?? area.description,
  };
}

export default async function AreaPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [area, areas, products] = await Promise.all([getAreaBySlug(slug), getShopAreas(), getProductsByArea(slug)]);
  if (!area) notFound();

  return (
    <div className="wrap area-layout">
      <AreaSidebar areas={areas} current={area.slug} />
      <div className="area-main">
        <AreaBanner area={area} />
        <ProductGrid products={products} areaName={area.name} />
      </div>
    </div>
  );
}
