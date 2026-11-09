import type { LabArea } from "@/lib/catalog";
import { whatsappLink } from "@/lib/config";
import { AreaIcon, WhatsApp } from "../icons";

export function AreaSidebar({ areas, current }: { areas: LabArea[]; current: string }) {
  return (
    <aside className="area-side" aria-label="Áreas del laboratorio">
      <p className="area-side-title">Áreas del laboratorio</p>
      <nav>
        <ul>
          {areas.map((a) => (
            <li key={a.slug}>
              <a href={a.href} aria-current={a.slug === current ? "page" : undefined}>
                <AreaIcon name={a.icon} />
                <span>
                  <strong>{a.name}</strong>
                  <small>{a.description}</small>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="area-side-help">
        <p>
          <strong>¿No sabes qué elegir?</strong>
        </p>
        <p>Cuéntanos tu presupuesto y qué juegos usas. Te respondemos con una recomendación.</p>
        <a
          className="btn btn-outline"
          href={whatsappLink("Hola RUSH LAB, necesito ayuda para elegir un componente.")}
          target="_blank"
          rel="noopener"
        >
          <WhatsApp />
          Pedir recomendación
        </a>
      </div>
    </aside>
  );
}
