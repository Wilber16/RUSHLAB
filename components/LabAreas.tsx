import type { LabArea } from "@/lib/catalog";
import { AreaIcon, ArrowRight } from "./icons";

export function LabAreas({ areas }: { areas: LabArea[] }) {
  return (
    <section className="section" id="areas" aria-labelledby="areas-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="areas-title">Áreas del laboratorio</h2>
          <p>Componentes y equipos ordenados por lo que hacen en tu PC.</p>
        </div>
        <div className="areas">
          {areas.map((area) => (
            <a key={area.slug} href={area.href} className={`area${area.icon === "build" ? " area-build" : ""}`}>
              <span className="area-icon">
                <AreaIcon name={area.icon} />
              </span>
              <span>
                <h3>{area.name}</h3>
                <p>{area.description}</p>
              </span>
              <ArrowRight className="area-arrow" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
