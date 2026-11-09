import type { Metadata } from "next";
import { deliveries } from "@/lib/trust";
import { whatsappLink } from "@/lib/config";
import { Reviews } from "@/components/Reviews";
import { WhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "PCs entregadas · RUSH LAB",
  description: "Fotos reales de las PCs que armamos y entregamos, con permiso de cada cliente.",
};

export default function GaleriaPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Ruta">
            <a href="/">Inicio</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">PCs entregadas</span>
          </nav>
          <h1 className="page-hero-title">
            Experimentos <span>entregados</span>
          </h1>
          <p className="page-hero-lead">
            Cada PC que sale del laboratorio, con fotos reales y el permiso de su dueño. Así trabajamos.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Galería" style={{ paddingTop: 36 }}>
        <div className="wrap">
          {deliveries.length > 0 ? (
            <div className="gallery">
              {deliveries.map((d) => (
                <figure key={d.image} className="gallery-item">
                  <img src={d.image} alt={`${d.title} entregada en ${d.city}`} loading="lazy" />
                  <figcaption>
                    <strong>{d.title}</strong>
                    <span>{d.specs}</span>
                    <span className="muted">
                      {d.customer ? `${d.customer}, ` : ""}
                      {d.city} · {d.date}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="empty empty-wide">
              <p>
                <strong>Las primeras entregas aparecerán aquí muy pronto.</strong>
              </p>
              <p>
                Publicamos cada PC que armamos con fotos reales del equipo terminado y del reporte de pruebas. ¿Quieres
                que la tuya sea la primera?
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/pc-armadas/">
                  Ver PCs armadas
                </a>
                <a
                  className="btn btn-ghost"
                  href={whatsappLink("Hola RUSH LAB, quiero cotizar una PC.")}
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsApp />
                  Cotizar la mía
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <Reviews />
    </>
  );
}
