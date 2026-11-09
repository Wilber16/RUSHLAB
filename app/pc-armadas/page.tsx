import type { Metadata } from "next";
import { getAllBuilds } from "@/lib/catalog";
import { formatPEN, whatsappLink } from "@/lib/config";
import { includedWithEveryBuild } from "@/lib/services";
import { BuildCard, buildHref, tierWord } from "@/components/BuildCard";
import { WhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "PCs armadas RUSH BUILD · RUSH LAB",
  description: "PCs gamer armadas, probadas y con reporte de pruebas. Configuraciones para cada presupuesto y envío a todo el Perú.",
};

const faqs = [
  {
    q: "¿Cuánto demora en estar lista mi PC?",
    a: "Normalmente entre 2 y 4 días hábiles desde que confirmamos tu pago: conseguir las piezas, armar y hacer las pruebas. Si alguna pieza está bajo pedido te avisamos antes de cobrar.",
  },
  {
    q: "¿Puedo cambiar alguna pieza del armado?",
    a: "Sí. Los armados son un punto de partida. Cambiamos la tarjeta gráfica, la memoria, el gabinete o lo que necesites y te enviamos el nuevo precio.",
  },
  {
    q: "¿La PC incluye Windows?",
    a: "Los precios no incluyen licencia de Windows. Podemos instalar una licencia original si la compras con nosotros o la tuya si ya la tienes.",
  },
  {
    q: "¿Qué garantía tiene?",
    a: "Cada pieza tiene la garantía de su fabricante y nosotros gestionamos el reclamo por ti. Te entregamos las condiciones por escrito junto con tu comprobante.",
  },
  {
    q: "¿Envían a provincias?",
    a: "Sí. Enviamos con embalaje reforzado y seguro declarado por agencia. Te pasamos el costo exacto según tu ciudad antes de confirmar.",
  },
];

export default async function PcArmadasPage() {
  const builds = await getAllBuilds();
  const rows = builds.at(0)?.parts.map((p) => p.label).concat(builds.at(0)?.extraParts.map((p) => p.label) ?? []) ?? [];

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Ruta">
            <a href="/">Inicio</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">PCs armadas</span>
          </nav>
          <h1 className="page-hero-title">
            PCs armadas <span>RUSH BUILD</span>
          </h1>
          <p className="page-hero-lead">
            Elegimos piezas que funcionan bien juntas, las armamos y las probamos antes de entregarte. Todas se pueden
            ajustar a tu presupuesto.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="todos-title" style={{ paddingTop: 36 }}>
        <div className="wrap">
          <h2 id="todos-title" className="visually-hidden">
            Todos los armados
          </h2>
          <div className="builds builds-4">
            {builds.map((b) => (
              <BuildCard key={b.slug} build={b} />
            ))}
          </div>
          {builds.some((b) => b.priceIsExample) && (
            <p className="builds-note">Precios de ejemplo. Se confirman con el stock del día antes de cobrar.</p>
          )}
        </div>
      </section>

      <section className="section builds-band" aria-labelledby="incluye-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="incluye-title">Qué incluye cada PC</h2>
            <p>No es solo juntar piezas. Esto recibes con cualquier armado.</p>
          </div>
          <ul className="included">
            {includedWithEveryBuild.map((i) => (
              <li key={i.title}>
                <strong>{i.title}</strong>
                <span>{i.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="compara-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="compara-title">Compara los armados</h2>
            <p>Las piezas de cada configuración, lado a lado.</p>
          </div>
          <div className="table-scroll">
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">Pieza</th>
                  {builds.map((b) => (
                    <th key={b.slug} scope="col" className={b.featured ? "is-featured" : undefined}>
                      <a href={buildHref(b)}>{tierWord[b.tier]}</a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Pensada para</th>
                  {builds.map((b) => (
                    <td key={b.slug}>{b.target}</td>
                  ))}
                </tr>
                {rows.map((label) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {builds.map((b) => (
                      <td key={b.slug}>{[...b.parts, ...b.extraParts].find((p) => p.label === label)?.value ?? "—"}</td>
                    ))}
                  </tr>
                ))}
                <tr className="compare-price">
                  <th scope="row">Precio</th>
                  {builds.map((b) => (
                    <td key={b.slug}>{formatPEN(b.price)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section builds-band" aria-labelledby="medida-title">
        <div className="wrap custom-build">
          <div>
            <h2 id="medida-title">¿Tienes otro presupuesto?</h2>
            <p>
              Cuéntanos cuánto quieres invertir, qué juegos o programas usas y si ya tienes monitor o alguna pieza. Te
              enviamos una configuración a medida en el día.
            </p>
          </div>
          <a
            className="btn btn-primary"
            href={whatsappLink(
              "Hola RUSH LAB, quiero una PC a medida.\nPresupuesto: \nUso (juegos o programas): \nYa tengo (monitor, piezas): ",
            )}
            target="_blank"
            rel="noopener"
          >
            <WhatsApp />
            Pedir mi PC a medida
          </a>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <h2 id="faq-title" className="page-title">
            Preguntas frecuentes
          </h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
