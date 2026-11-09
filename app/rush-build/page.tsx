import type { Metadata } from "next";
import { RushBuilder } from "@/components/builder/RushBuilder";

export const metadata: Metadata = {
  title: "RUSH BUILD: arma tu PC · RUSH LAB",
  description:
    "Elige para qué usarás tu PC y tu presupuesto. RUSH BUILD propone una configuración y revisa que todas las piezas sean compatibles.",
};

export default function RushBuildPage() {
  return (
    <>
      <section className="page-hero page-hero-art">
        <div className="wrap page-hero-grid">
          <div className="page-hero-copy">
            <nav className="crumbs" aria-label="Ruta">
              <a href="/">Inicio</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">RUSH BUILD</span>
            </nav>
            <h1 className="page-hero-title">
              Rush <span>build</span>
            </h1>
            <p className="page-hero-lead">
              Tu máquina, tu experimento. Elige el uso y el presupuesto; Prof. Rush propone las piezas y revisa que todas
              funcionen juntas.
            </p>
          </div>
          <img
            className="page-hero-img"
            src="/brand/prof-rush.webp"
            alt="Prof. Rush, el científico de RUSH LAB"
            width={380}
            height={507}
          />
        </div>
      </section>
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="wrap">
          <RushBuilder />
        </div>
      </section>
    </>
  );
}
