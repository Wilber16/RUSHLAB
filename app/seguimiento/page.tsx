import type { Metadata } from "next";
import { TrackForm } from "@/components/TrackForm";

export const metadata: Metadata = {
  title: "Seguimiento de pedido · RUSH LAB",
  description: "Consulta en qué etapa está tu pedido: pago, armado, pruebas, despacho o entrega.",
};

const stages = [
  { title: "Pago verificado", text: "Confirmamos que el dinero llegó a nuestra cuenta." },
  { title: "Piezas reservadas", text: "Recogemos los componentes con nuestros proveedores." },
  { title: "Armado", text: "Montamos tu PC y ordenamos los cables. Te enviamos fotos." },
  { title: "Pruebas", text: "Estrés de procesador, gráfica y memoria. Generamos tu reporte." },
  { title: "Despachado", text: "Te enviamos la guía de la agencia o coordinamos la entrega en Lima." },
  { title: "Entregado", text: "Recibes tu PC con comprobante, reporte y garantía." },
];

export default function SeguimientoPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Ruta">
            <a href="/">Inicio</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Seguimiento de pedido</span>
          </nav>
          <h1 className="page-hero-title">
            ¿Dónde está mi <span>experimento?</span>
          </h1>
          <p className="page-hero-lead">
            Escribe tu número de pedido y te respondemos por WhatsApp con la etapa exacta y fotos de tu PC.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 36 }}>
        <div className="wrap track-layout">
          <TrackForm />
          <div>
            <h2 className="page-title track-title">Las etapas de tu pedido</h2>
            <ol className="track-steps">
              {stages.map((s) => (
                <li key={s.title}>
                  <strong>{s.title}</strong>
                  <span>{s.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
