import type { Metadata } from "next";
import { legalPages } from "@/components/legal/LegalPage";
import { site } from "@/lib/config";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Políticas · RUSH LAB",
  description: "Garantía, envíos, cambios y devoluciones, privacidad, términos y Libro de Reclamaciones de RUSH LAB.",
};

const summaries: Record<string, string> = {
  "/politicas/garantia/": "Qué cubre la garantía, cuánto dura y cómo la gestionamos por ti.",
  "/politicas/envios/": "Plazos, costos y cómo recibir tu pedido en Lima y provincias.",
  "/politicas/devoluciones/": "Qué hacer si tu producto llega dañado o no es lo que pediste.",
  "/politicas/privacidad/": "Qué datos guardamos, para qué y cómo ejercer tus derechos.",
  "/politicas/terminos/": "Cómo se confirma una compra, precios, pagos y comprobantes.",
  "/libro-de-reclamaciones/": "Registra un reclamo o una queja. Respondemos en máximo 15 días hábiles.",
};

export default function PoliticasIndex() {
  return (
    <section className="section">
      <div className="wrap">
        <nav className="crumbs" aria-label="Ruta">
          <a href="/">Inicio</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Políticas</span>
        </nav>
        <div className="section-head" style={{ marginTop: 12 }}>
          <h1 className="page-title">Políticas de compra</h1>
          <p>
            {site.legalName} · RUC {site.ruc}
          </p>
        </div>
        <div className="areas">
          {legalPages.map((p) => (
            <a key={p.href} href={p.href} className="area area-plain">
              <span>
                <h2 className="area-h">{p.label}</h2>
                <p>{summaries[p.href]}</p>
              </span>
              <ArrowRight className="area-arrow" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
