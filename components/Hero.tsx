import { whatsappLink } from "@/lib/config";
import { Check, Receipt, Shield, Truck, WhatsApp } from "./icons";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">
            Tu PC gamer,
            <span className="line-2">armada y probada</span>
          </h1>
          <p className="hero-lead">
            Te ayudamos a elegir cada pieza según tu presupuesto. La armamos, la sometemos a pruebas de estabilidad y
            te la entregamos con su reporte. Enviamos a Lima y a todo el Perú.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#armados">
              Ver armados
            </a>
            <a
              className="btn btn-ghost"
              href={whatsappLink("Hola RUSH LAB, tengo un presupuesto y quiero que me recomienden una PC.")}
              target="_blank"
              rel="noopener"
            >
              <WhatsApp />
              Cotizar con mi presupuesto
            </a>
          </div>
          <ul className="proof">
            <li>
              <Receipt />
              Boleta o factura electrónica
            </li>
            <li>
              <Shield />
              Garantía por escrito
            </li>
            <li>
              <Truck />
              Envío asegurado a provincias
            </li>
          </ul>
        </div>

        <div className="hero-visual">
          <img
            src="/brand/equipo-rush-lab.webp"
            alt="Prof. Rush y BYTE, los personajes de RUSH LAB, en el laboratorio"
            width={900}
            height={1046}
          />

          {/* Reporte de pruebas: lo que recibe cada cliente con su PC */}
          <aside className="report" aria-label="Ejemplo de reporte de pruebas">
            <div className="report-head">
              <span className="report-title">Reporte de pruebas</span>
              <span className="report-note">Ejemplo</span>
            </div>
            <dl>
              <dt>Equipo</dt>
              <dd>RUSH BUILD Pro</dd>
              <dt>Prueba de estrés</dt>
              <dd>2 h</dd>
              <dt>CPU, temp. máx.</dt>
              <dd>74 °C</dd>
              <dt>GPU, temp. máx.</dt>
              <dd>68 °C</dd>
              <dt>Memoria</dt>
              <dd>Sin errores</dd>
            </dl>
            <div className="report-status">
              <Check />
              Aprobado para entrega
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
