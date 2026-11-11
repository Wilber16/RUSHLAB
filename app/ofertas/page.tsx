import type { Metadata } from "next";
import { getAllProducts } from "@/lib/catalog";
import { campaign } from "@/lib/campaign";
import { whatsappLink } from "@/lib/config";
import { ProductCard } from "@/components/area/ProductCard";
import { CampaignStatus } from "@/components/CampaignStatus";
import { WhatsApp } from "@/components/icons";

export const metadata: Metadata = campaign.enabled
  ? {
      title: `${campaign.name} · Ofertas · RUSH LAB`,
      description: `Ofertas de ${campaign.name}: del ${campaign.startLabel} al ${campaign.endLabel}.`,
    }
  : {
      title: "Ofertas en componentes y PCs · RUSH LAB",
      description: "Rebajas reales en componentes de PC, periféricos y monitores, con envío a todo el Perú.",
    };

export default async function OfertasPage() {
  // Solo productos con una rebaja real (precio anterior cargado)
  const deals = (await getAllProducts()).filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);

  return (
    <>
      <section className="page-hero offer-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Ruta">
            <a href="/">Inicio</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Ofertas</span>
          </nav>
          {campaign.enabled ? (
            <>
              <CampaignStatus />
              <h1 className="page-hero-title">
                Black Friday <span>fuera de control</span>
              </h1>
              <p className="page-hero-lead">
                Del {campaign.startLabel} al {campaign.endLabel}. Beneficios reales en PCs armadas y componentes, con
                precio y stock confirmados antes de pagar.
              </p>
            </>
          ) : (
            <>
              <h1 className="page-hero-title">
                Ofertas <span>del laboratorio</span>
              </h1>
              <p className="page-hero-lead">
                Rebajas reales sobre precios que cobramos antes, con precio y stock confirmados antes de pagar.
              </p>
            </>
          )}
        </div>
      </section>

      {campaign.enabled && (
        <section className="section" aria-labelledby="perks-title" style={{ paddingTop: 36 }}>
          <div className="wrap">
            <div className="section-head">
              <h2 id="perks-title">Beneficios de la campaña</h2>
              <p>{campaign.terms}</p>
            </div>
            <ul className="included">
              {campaign.perks.map((p) => (
                <li key={p.title} className="perk">
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
            {campaign.isExample && <p className="builds-note">Beneficios de ejemplo. Defínelos en lib/campaign.ts.</p>}
          </div>
        </section>
      )}

      <section className="section builds-band" aria-labelledby="deals-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="deals-title">Productos en oferta</h2>
            <p>Solo mostramos rebajas sobre precios que realmente cobramos antes.</p>
          </div>
          {deals.length > 0 ? (
            <div className="pgrid">
              {deals.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : !campaign.enabled ? (
            <div className="empty empty-wide">
              <p>
                <strong>Ahora mismo no hay productos rebajados.</strong>
              </p>
              <p>
                Revisa las áreas del laboratorio o cotiza tu PC completa: siempre te damos el mejor precio que podemos.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="/areas/">
                  Ver áreas del laboratorio
                </a>
                <a className="btn btn-ghost" href="/rush-build/">
                  Armar mi PC
                </a>
              </div>
            </div>
          ) : (
            <div className="empty empty-wide">
              <p>
                <strong>Los precios especiales se publican el {campaign.startLabel}.</strong>
              </p>
              <p>Escríbenos y te avisamos por WhatsApp apenas empiece la campaña.</p>
              <a
                className="btn btn-primary"
                href={whatsappLink(`Hola RUSH LAB, avísenme cuando empiece el ${campaign.name}.`)}
                target="_blank"
                rel="noopener"
              >
                <WhatsApp />
                Avisarme cuando empiece
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
