import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBuilds, getBuildBySlug } from "@/lib/catalog";
import { formatPEN, whatsappLink } from "@/lib/config";
import { includedWithEveryBuild } from "@/lib/services";
import { BuildCard, tierWord } from "@/components/BuildCard";
import { PayMethods } from "@/components/PayMethods";
import { Check, Receipt, Shield, Truck, WhatsApp } from "@/components/icons";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const builds = await getAllBuilds();
  return builds.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const build = await getBuildBySlug(slug);
  if (!build) return {};
  return {
    title: `${build.name}: PC gamer ${build.target} · RUSH LAB`,
    description: `${build.purpose} ${build.parts.map((p) => p.value).join(", ")}. Armada, probada y con garantía.`,
  };
}

export default async function BuildPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const build = await getBuildBySlug(slug);
  if (!build) notFound();

  const others = (await getAllBuilds()).filter((b) => b.slug !== build.slug);
  const allParts = [...build.parts, ...build.extraParts];

  return (
    <div className="wrap build-page">
      <nav className="crumbs" aria-label="Ruta">
        <a href="/">Inicio</a>
        <span aria-hidden="true">/</span>
        <a href="/pc-armadas/">PCs armadas</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{build.name}</span>
      </nav>

      <section className="build-top">
        <div className="build-top-copy">
          <h1 className="page-hero-title">
            Rush build <span>{tierWord[build.tier]}</span>
          </h1>
          <span className="build-target">{build.target}</span>
          <p className="page-hero-lead">{build.purpose}</p>
          <ul className="ideal">
            {build.idealFor.map((i) => (
              <li key={i}>
                <Check />
                {i}
              </li>
            ))}
          </ul>
        </div>

        <aside className="build-buybox" aria-label="Precio y compra">
          <p className="product-price">{formatPEN(build.price)}</p>
          <p className="product-price-note">
            Incluye armado, pruebas y reporte. Precio con IGV, sin licencia de Windows.
            {build.priceIsExample && " Precio de ejemplo para esta vista previa."}
          </p>
          <a
            className="btn btn-primary"
            href={whatsappLink(`Hola RUSH LAB, quiero el ${build.name} (${formatPEN(build.price)}).`)}
            target="_blank"
            rel="noopener"
          >
            <WhatsApp />
            Cotizar este armado
          </a>
          <a
            className="btn btn-ghost"
            href={whatsappLink(`Hola RUSH LAB, quiero el ${build.name} pero con estos cambios: `)}
            target="_blank"
            rel="noopener"
          >
            Quiero cambiar piezas
          </a>
          <ul className="proof">
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
              Lista en 2 a 4 días hábiles
            </li>
          </ul>
          <PayMethods />
        </aside>
      </section>

      <section className="product-details">
        <div className="product-block">
          <h2>Piezas de este armado</h2>
          <dl className="spec-table">
            {allParts.map((p) => (
              <div key={p.label}>
                <dt>{p.label}</dt>
                <dd>{p.value}</dd>
              </div>
            ))}
          </dl>
          <p className="muted small">
            Las marcas exactas dependen del stock del día. Siempre te confirmamos cada modelo antes de cobrar.
          </p>
        </div>

        <div className="product-block">
          <h2>Incluido en el precio</h2>
          <ul className="included included-compact">
            {includedWithEveryBuild.map((i) => (
              <li key={i.title}>
                <strong>{i.title}</strong>
                <span>{i.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="product-related" aria-labelledby="otros-title">
        <div className="section-head">
          <h2 id="otros-title">Otros armados</h2>
          <a className="link-btn" href="/pc-armadas/">
            Comparar todos
          </a>
        </div>
        <div className="builds">
          {others.map((b) => (
            <BuildCard key={b.slug} build={b} />
          ))}
        </div>
      </section>
    </div>
  );
}
