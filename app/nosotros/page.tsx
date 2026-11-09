import type { Metadata } from "next";
import { Pending } from "@/components/legal/LegalPage";
import { site, whatsappLink } from "@/lib/config";
import { WhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Nosotros · RUSH LAB",
  description: "Quién está detrás de RUSH LAB y cómo trabajamos cada PC.",
};

const commitments = [
  {
    title: "Precio confirmado antes de cobrar",
    text: "Los precios del hardware cambian cada semana. Por eso te confirmamos precio y stock del día antes de que pagues, y si algo cambia, tú decides.",
  },
  {
    title: "Te decimos cuándo no comprar",
    text: "Si una mejora no te conviene o puedes reutilizar una pieza, te lo decimos. Preferimos un cliente que vuelva a una venta grande.",
  },
  {
    title: "Cada PC sale probada",
    text: "Ninguna PC se entrega sin pruebas de estrés y su reporte de temperaturas. Si algo falla, lo encontramos nosotros antes que tú.",
  },
  {
    title: "Formales y transparentes",
    text: "Emitimos boleta o factura, damos la garantía por escrito y tenemos Libro de Reclamaciones. Sin cuentas a nombre de terceros.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="page-hero page-hero-art">
        <div className="wrap page-hero-grid">
          <div className="page-hero-copy">
            <nav className="crumbs" aria-label="Ruta">
              <a href="/">Inicio</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Nosotros</span>
            </nav>
            <h1 className="page-hero-title">
              Somos un <span>laboratorio</span>
            </h1>
            <p className="page-hero-lead">
              RUSH LAB nace en Lima para que comprar hardware deje de ser una apuesta. Te ayudamos a elegir, armamos tu
              PC y la probamos antes de que llegue a tus manos.
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

      <section className="section" aria-labelledby="quien-title">
        <div className="wrap about">
          <div className="about-copy">
            <h2 id="quien-title">Quién está detrás</h2>
            <p>
              Soy <Pending>[tu nombre]</Pending>. Trabajo con marcas de tecnología y conozco de cerca cómo se mueven los
              precios, los márgenes y la importación del hardware en el Perú. Armo PCs desde{" "}
              <Pending>[año o hace cuántos años]</Pending>.
            </p>
            <p>
              Creé RUSH LAB porque comprar una PC gamer no debería depender de la suerte: ni de un vendedor que te empuja
              lo que tiene en stock, ni de piezas que no funcionan bien juntas. Aquí cada experimento se prueba antes de
              entregarse.
            </p>
            <p className="muted small">
              Prof. Rush y BYTE son los personajes de nuestra marca. Las personas que te atienden son reales.
            </p>
          </div>
          <div className="photo-slot" role="img" aria-label="Espacio para una foto real del taller">
            <span>Foto real del taller o del armado</span>
            <small>Pendiente: reemplazar en /public/marca/taller.webp</small>
          </div>
        </div>
      </section>

      <section className="section builds-band" aria-labelledby="como-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="como-title">Cómo trabajamos</h2>
            <p>Cuatro compromisos que puedes exigirnos en cada compra.</p>
          </div>
          <ul className="included included-2">
            {commitments.map((c) => (
              <li key={c.title}>
                <strong>{c.title}</strong>
                <span>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="datos-title">
        <div className="wrap custom-build">
          <div>
            <h2 id="datos-title">Datos de la empresa</h2>
            <p>
              {site.legalName} · RUC {site.ruc} · {site.address}
            </p>
          </div>
          <a className="btn btn-primary" href={whatsappLink("Hola RUSH LAB")} target="_blank" rel="noopener">
            <WhatsApp />
            Escríbenos
          </a>
        </div>
      </section>
    </>
  );
}
