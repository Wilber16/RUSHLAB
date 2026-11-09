import type { LabArea } from "@/lib/catalog";
import { Receipt, Shield, Truck, Check } from "../icons";

const characters = {
  prof: { src: "/brand/prof-rush.webp", alt: "Prof. Rush, el científico de RUSH LAB", who: "Prof. Rush", w: 380, h: 507 },
  byte: { src: "/brand/byte.webp", alt: "BYTE, el especialista en velocidad de RUSH LAB", who: "BYTE", w: 480, h: 720 },
};

export function AreaBanner({ area }: { area: LabArea }) {
  const ch = characters[area.character ?? "prof"];
  const [first, ...rest] = area.name.split(" ");

  return (
    <header className="area-banner">
      <div className="area-banner-copy">
        <nav className="crumbs" aria-label="Ruta">
          <a href="/">Inicio</a>
          <span aria-hidden="true">/</span>
          <a href="/areas/">Áreas del laboratorio</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{area.name}</span>
        </nav>
        <h1>
          {first} <span>{rest.join(" ")}</span>
        </h1>
        <p className="area-banner-desc">{area.description}</p>
        {area.intro && <p className="area-banner-intro">{area.intro}</p>}
        <ul className="area-trust">
          <li>
            <Check />
            Compatibilidad revisada
          </li>
          <li>
            <Receipt />
            Boleta o factura
          </li>
          <li>
            <Shield />
            Garantía por escrito
          </li>
          <li>
            <Truck />
            Envío a todo el Perú
          </li>
        </ul>
      </div>
      <figure className="area-banner-art">
        <img src={ch.src} alt={ch.alt} width={ch.w} height={ch.h} />
        {area.quote && (
          <figcaption>
            “{area.quote}”<span>{ch.who}</span>
          </figcaption>
        )}
      </figure>
    </header>
  );
}
