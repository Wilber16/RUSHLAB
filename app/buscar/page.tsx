import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllBuilds, getAllProducts } from "@/lib/catalog";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Buscar · RUSH LAB",
  robots: { index: false },
};

export default async function BuscarPage() {
  const [products, builds] = await Promise.all([getAllProducts(), getAllBuilds()]);
  return (
    <section className="section" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <Suspense fallback={<p className="muted">Cargando resultados…</p>}>
          <SearchResults products={products} builds={builds} />
        </Suspense>
      </div>
    </section>
  );
}
