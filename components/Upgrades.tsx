import { whatsappLink } from "@/lib/config";
import { ArrowRight, WhatsApp } from "./icons";

const upgrades = [
  { title: "Más memoria", detail: "De 16 a 32 GB para juegos pesados y multitarea." },
  { title: "Tarjeta gráfica nueva", detail: "El cambio que más FPS suma si tu procesador acompaña." },
  { title: "SSD NVMe", detail: "Windows y tus juegos cargan en segundos." },
  { title: "Limpieza y pasta térmica", detail: "Menos temperatura y menos ruido en tu equipo actual." },
];

export function Upgrades() {
  return (
    <section className="section" id="upgrades" aria-labelledby="upgrades-title">
      <div className="wrap upgrade">
        <div className="upgrade-visual">
          <img src="/brand/byte.webp" alt="BYTE, el especialista en velocidad de RUSH LAB" width={480} height={720} />
        </div>
        <div className="upgrade-copy">
          <h2 id="upgrades-title">¿Tu PC ya no rinde? Mejórala sin cambiarla entera.</h2>
          <p>
            Con los precios del hardware al alza, muchas veces conviene cambiar una o dos piezas. Revisamos tu equipo
            actual y te decimos qué mejora rinde más por cada sol.
          </p>
          <ul className="upgrade-list">
            {upgrades.map((u) => (
              <li key={u.title}>
                <strong>{u.title}</strong>
                <span>{u.detail}</span>
              </li>
            ))}
          </ul>
          <p className="byte-quote">“Lo rápido también es divertido.” BYTE</p>
          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href={whatsappLink("Hola RUSH LAB, quiero mejorar mi PC. Estas son sus piezas: ")}
              target="_blank"
              rel="noopener"
            >
              <WhatsApp />
              Enviar las piezas de mi PC
            </a>
            <a className="btn btn-ghost" href="/upgrades/">
              Ver todos los upgrades
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
