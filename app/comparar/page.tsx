import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "@/lib/catalog";
import { CompareTable } from "@/components/CompareTable";

export const metadata: Metadata = {
  title: "Comparar productos · RUSH LAB",
  robots: { index: false },
};

export default async function CompararPage() {
  const products = await getAllProducts();
  return (
    <section className="section" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Ruta">
          <a href="/">Inicio</a>
          <span aria-hidden="true">/</span>
          <a href="/areas/">Áreas del laboratorio</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Comparar</span>
        </nav>
        <Suspense fallback={<p className="muted">Cargando comparación…</p>}>
          <CompareTable products={products} />
        </Suspense>
      </div>
    </section>
  );
}
