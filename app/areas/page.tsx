import type { Metadata } from "next";
import { getProductCount, getShopAreas } from "@/lib/catalog";
import { AreaIcon, ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Áreas del laboratorio · RUSH LAB",
  description: "Tarjetas gráficas, procesadores, memorias, SSD, placas, fuentes, monitores y periféricos.",
};

export default async function AreasIndex() {
  const areas = await getShopAreas();
  const counts = await Promise.all(areas.map((a) => getProductCount(a.slug)));

  return (
    <section className="section">
      <div className="wrap">
        <nav className="crumbs" aria-label="Ruta">
          <a href="/">Inicio</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Áreas del laboratorio</span>
        </nav>
        <div className="section-head" style={{ marginTop: 12 }}>
          <h1 className="page-title">Áreas del laboratorio</h1>
          <p>Elige un área para ver sus productos, o arma tu PC completa con RUSH BUILD.</p>
        </div>
        <div className="areas">
          {areas.map((area, i) => (
            <a key={area.slug} href={area.href} className="area">
              <span className="area-icon">
                <AreaIcon name={area.icon} />
              </span>
              <span>
                <h2 className="area-h">{area.name}</h2>
                <p>{area.description}</p>
                <p className="area-count">{counts[i]} productos</p>
              </span>
              <ArrowRight className="area-arrow" />
            </a>
          ))}
          <a href="/#armados" className="area area-build">
            <span className="area-icon">
              <AreaIcon name="build" />
            </span>
            <span>
              <h2 className="area-h">RUSH BUILD</h2>
              <p>Arma tu PC completa con nuestra ayuda</p>
            </span>
            <ArrowRight className="area-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
