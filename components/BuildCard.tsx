import type { Build } from "@/lib/catalog";
import { formatPEN, whatsappLink } from "@/lib/config";
import { WhatsApp } from "./icons";

export const tierWord: Record<Build["tier"], string> = {
  starter: "Starter",
  core: "Core",
  pro: "Pro",
  ultra: "Ultra",
};

export function buildHref(build: Build) {
  return `/pc-armadas/${build.slug}/`;
}

export function BuildCard({ build }: { build: Build }) {
  return (
    <article className={`build${build.featured ? " build-featured" : ""}`}>
      {build.featured && <span className="build-badge">Recomendado por Prof. Rush</span>}
      <div>
        <h3>
          <a href={buildHref(build)}>
            Rush build <span>{tierWord[build.tier]}</span>
          </a>
        </h3>
        <p className="build-purpose">{build.purpose}</p>
      </div>
      <span className="build-target">{build.target}</span>
      <dl className="build-parts">
        {build.parts.map((part) => (
          <div key={part.label}>
            <dt>{part.label}</dt>
            <dd>{part.value}</dd>
          </div>
        ))}
      </dl>
      <div className="build-foot">
        <p className="build-price">
          {formatPEN(build.price)}
          <small>Incluye armado, pruebas y reporte. Precio con IGV.</small>
        </p>
        <div className="build-actions">
          <a
            className={`btn ${build.featured ? "btn-primary" : "btn-ghost"}`}
            href={whatsappLink(`Hola RUSH LAB, quiero cotizar el ${build.name}.`)}
            target="_blank"
            rel="noopener"
          >
            <WhatsApp />
            Cotizar
          </a>
          <a className="btn btn-ghost" href={buildHref(build)}>
            Ver detalle
          </a>
        </div>
      </div>
    </article>
  );
}
