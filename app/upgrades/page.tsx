import type { Metadata } from "next";
import { formatPEN, whatsappLink } from "@/lib/config";
import { howToFindSpecs, upgradeServices } from "@/lib/services";
import { WhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Upgrades: mejora tu PC sin cambiarla entera · RUSH LAB",
  description:
    "Más RAM, tarjeta gráfica, SSD, fuente o limpieza. Revisamos tu PC y te decimos qué mejora rinde más por cada sol.",
};

const process = [
  { title: "Nos envías tus piezas", text: "Capturas de tu PC y para qué la usas, por WhatsApp." },
  { title: "Te recomendamos", text: "Te decimos qué pieza limita tu equipo y qué mejora conviene según tu presupuesto." },
  { title: "Confirmas y pagas", text: "Confirmamos precio y stock del día. Pagas con Yape o transferencia." },
  { title: "Instalamos y probamos", text: "Instalamos la mejora, hacemos pruebas y te entregamos tu PC con su reporte." },
];

export default function UpgradesPage() {
  const specsMessage = whatsappLink(
    "Hola RUSH LAB, quiero mejorar mi PC.\nProcesador: \nMemoria RAM: \nTarjeta gráfica: \nPlaca madre: \nPresupuesto: \nLa uso para: ",
  );

  return (
    <>
      <section className="page-hero page-hero-art">
        <div className="wrap page-hero-grid">
          <div className="page-hero-copy">
            <nav className="crumbs" aria-label="Ruta">
              <a href="/">Inicio</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Upgrades</span>
            </nav>
            <h1 className="page-hero-title">
              Mejora tu PC <span>sin cambiarla entera</span>
            </h1>
            <p className="page-hero-lead">
              Con el hardware más caro que nunca, muchas veces una o dos piezas bastan. Revisamos tu equipo y te decimos
              qué mejora rinde más por cada sol.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={specsMessage} target="_blank" rel="noopener">
                <WhatsApp />
                Enviar las piezas de mi PC
              </a>
              <a className="btn btn-ghost" href="#como-ver">
                Cómo saber qué piezas tengo
              </a>
            </div>
          </div>
          <img
            className="page-hero-img"
            src="/brand/byte.webp"
            alt="BYTE, el especialista en velocidad de RUSH LAB"
            width={480}
            height={720}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="servicios-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="servicios-title">Qué podemos mejorar</h2>
            <p>El precio es solo de la instalación. La pieza se cotiza aparte según el stock del día.</p>
          </div>
          <div className="services">
            {upgradeServices.map((s) => (
              <article key={s.slug} className="service">
                <h3>{s.title}</h3>
                <p>{s.what}</p>
                <p className="service-when">
                  <strong>Conviene</strong> {s.worthIt.charAt(0).toLowerCase() + s.worthIt.slice(1)}
                </p>
                <div className="service-foot">
                  <span className="service-price">
                    {s.laborFrom === 0 ? "Sin costo" : <>Instalación desde {formatPEN(s.laborFrom)}</>}
                  </span>
                  <a
                    className="link-btn"
                    href={whatsappLink(`Hola RUSH LAB, me interesa: ${s.title}. Mi PC tiene: `)}
                    target="_blank"
                    rel="noopener"
                  >
                    Consultar
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="builds-note">Precios de instalación de ejemplo para esta vista previa.</p>
        </div>
      </section>

      <section className="section builds-band" id="como-ver" aria-labelledby="como-ver-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="como-ver-title">Cómo saber qué piezas tiene tu PC</h2>
            <p>En Windows, en menos de dos minutos.</p>
          </div>
          <ol className="steps">
            {howToFindSpecs.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="section-more">
            <a className="btn btn-primary" href={specsMessage} target="_blank" rel="noopener">
              <WhatsApp />
              Enviar mis capturas
            </a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="proceso-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="proceso-title">Cómo funciona</h2>
            <p>Coordinamos contigo la entrega y recojo de tu PC en Lima.</p>
          </div>
          <ol className="steps">
            {process.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
