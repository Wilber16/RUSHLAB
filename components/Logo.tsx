import { Bolt } from "./icons";

// Logo provisional en código. Se reemplaza por el SVG definitivo de la marca.
export function Logo() {
  return (
    <a className="logo" href="/" aria-label="RUSH LAB, ir al inicio">
      <Bolt className="logo-bolt" />
      <span className="logo-words">
        <span className="logo-name">
          RUSH <span>LAB</span>
        </span>
        <span className="logo-tag">Tecnología fuera de control</span>
      </span>
    </a>
  );
}
