import { site } from "@/lib/config";

export const legalPages = [
  { href: "/politicas/garantia/", label: "Garantía" },
  { href: "/politicas/envios/", label: "Envíos y entregas" },
  { href: "/politicas/devoluciones/", label: "Cambios y devoluciones" },
  { href: "/politicas/privacidad/", label: "Privacidad de datos" },
  { href: "/politicas/terminos/", label: "Términos y condiciones" },
  { href: "/libro-de-reclamaciones/", label: "Libro de Reclamaciones" },
];

export function LegalPage({
  title,
  current,
  lead,
  children,
}: {
  title: string;
  current: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <div className="wrap legal-layout">
      <aside className="legal-side" aria-label="Políticas">
        <nav className="crumbs" aria-label="Ruta">
          <a href="/">Inicio</a>
          <span aria-hidden="true">/</span>
          <a href="/politicas/">Políticas</a>
        </nav>
        <ul>
          {legalPages.map((p) => (
            <li key={p.href}>
              <a href={p.href} aria-current={p.href === current ? "page" : undefined}>
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <article className="legal">
        <h1>{title}</h1>
        <p className="legal-lead">{lead}</p>
        <p className="legal-meta">Última actualización: {site.policiesUpdated}</p>
        {!site.policiesReviewed && (
          <p className="legal-draft" role="note">
            Borrador en revisión. Este texto todavía no ha sido validado por un asesor legal y puede cambiar.
          </p>
        )}
        <div className="prose">{children}</div>
      </article>
    </div>
  );
}

/** Marca visible para datos que el dueño aún debe completar o decidir. */
export function Pending({ children }: { children: React.ReactNode }) {
  return <mark className="pending">{children}</mark>;
}
