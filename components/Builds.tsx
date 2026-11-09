import type { Build } from "@/lib/catalog";
import { formatPEN, whatsappLink } from "@/lib/config";
import { WhatsApp } from "./icons";

const tierWord: Record<Build["tier"], string> = { core: "Core", pro: "Pro", ultra: "Ultra" };

export function Builds({ builds }: { builds: Build[] }) {
  const anyExample = builds.some((b) => b.priceIsExample);

  return (
    <section className="section builds-band" id="armados" aria-labelledby="armados-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="armados-title">Armados RUSH BUILD</h2>
          <p>Tres configuraciones equilibradas para empezar. Cambiamos cualquier pieza según lo que necesites.</p>
        </div>

        <div className="builds">
          {builds.map((build) => (
            <article key={build.slug} className={`build${build.featured ? " build-featured" : ""}`}>
              {build.featured && <span className="build-badge">Recomendado por Prof. Rush</span>}
              <div>
                <h3>
                  Rush build <span>{tierWord[build.tier]}</span>
                </h3>
                <p className="build-purpose">{build.purpose}</p>
              </div>
              <span className="build-target">{build.target}</span>
              <dl className="build-parts">
                {build.parts.map((part) => (
                  <div key={part.label}>
                    <dt>{part.label}</dt>
                    <dd>{part.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="build-foot">
                <p className="build-price">
                  {formatPEN(build.price)}
                  <small>Incluye armado, pruebas y reporte. Precio con IGV.</small>
                </p>
                <a
                  className={`btn ${build.featured ? "btn-primary" : "btn-outline"}`}
                  href={whatsappLink(`Hola RUSH LAB, quiero cotizar el ${build.name}.`)}
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsApp />
                  Cotizar este armado
                </a>
              </div>
            </article>
          ))}
        </div>

        {anyExample && (
          <p className="builds-note">
            Precios de ejemplo para esta vista previa. Los precios reales se confirman con el stock del día antes de
            cobrar.
          </p>
        )}
      </div>
    </section>
  );
}
