import type { Metadata } from "next";
import { getBrands } from "@/lib/catalog";
import { sizedImage } from "@/lib/shopify/image";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Marcas · RUSH LAB",
  description: "Las marcas de componentes, monitores y periféricos que encuentras en RUSH LAB.",
  alternates: { canonical: "/marcas/" },
};

export default async function BrandsIndex() {
  const brands = await getBrands();

  return (
    <section className="section" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Ruta">
          <a href="/">Inicio</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Marcas</span>
        </nav>
        <div className="section-head" style={{ marginTop: 12 }}>
          <h1 className="page-title">Marcas</h1>
          <p>Elige una marca para ver todos sus productos en el laboratorio.</p>
        </div>
        <ul className="brand-grid">
          {brands.map((b) => (
            <li key={b.slug}>
              <a className={`brand-tile${b.logo ? " has-logo" : ""}`} href={`/marca/${b.slug}/`}>
                {b.logo ? (
                  <img className="brand-logo" src={sizedImage(b.logo.url, 320)} alt={b.name} loading="lazy" />
                ) : (
                  <span className="brand-name">{b.name}</span>
                )}
                <span className="brand-count">
                  {b.count} {b.count === 1 ? "producto" : "productos"}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
