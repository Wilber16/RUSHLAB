import type { Build } from "@/lib/catalog";
import { BuildCard } from "./BuildCard";
import { ArrowRight } from "./icons";

export function Builds({ builds }: { builds: Build[] }) {
  const anyExample = builds.some((b) => b.priceIsExample);

  return (
    <section className="section builds-band" id="armados" aria-labelledby="armados-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="armados-title">PCs armadas RUSH BUILD</h2>
          <p>Configuraciones equilibradas para empezar. Cambiamos cualquier pieza según lo que necesites.</p>
        </div>

        <div className="builds">
          {builds.map((build) => (
            <BuildCard key={build.slug} build={build} />
          ))}
        </div>

        <div className="section-more">
          {anyExample && (
            <p className="builds-note">
              Precios de ejemplo para esta vista previa. Los precios reales se confirman con el stock del día antes de
              cobrar.
            </p>
          )}
          <a className="btn btn-ghost" href="/pc-armadas/">
            Ver todas las PCs armadas
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
