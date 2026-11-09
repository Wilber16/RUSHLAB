import type { Metadata } from "next";
import { LegalPage, Pending } from "@/components/legal/LegalPage";
import { site } from "@/lib/config";

export const metadata: Metadata = { title: "Cambios y devoluciones · RUSH LAB" };

export default function DevolucionesPage() {
  return (
    <LegalPage
      title="Cambios y devoluciones"
      current="/politicas/devoluciones/"
      lead="Si tu producto llega dañado o no es lo que pediste, lo resolvemos sin costo para ti."
    >
      <h2>Producto dañado, incompleto o distinto al pedido</h2>
      <p>
        Escríbenos dentro de las 48 horas de recibido, con fotos o video del producto y del empaque. Te ofrecemos el
        cambio por el mismo producto o la devolución total de lo que pagaste, incluido el envío.
      </p>

      <h2>Falla de funcionamiento</h2>
      <p>
        Si el producto falla después de usarlo, aplica la <a href="/politicas/garantia/">garantía</a>: diagnosticamos el
        problema y tramitamos la reparación o el cambio con el fabricante.
      </p>

      <h2>Cambio de opinión</h2>
      <p>
        Puedes pedir un cambio o devolución dentro de los <Pending>7 días calendario</Pending> de recibido el producto,
        siempre que:
      </p>
      <ul>
        <li>Esté sellado, sin uso y con su empaque, manuales y accesorios completos.</li>
        <li>Nos envíes el comprobante de compra.</li>
        <li>Asumas el costo de envío de la devolución.</li>
      </ul>
      <p>No aplica a:</p>
      <ul>
        <li>PCs armadas o configuraciones hechas a tu pedido.</li>
        <li>Productos abiertos o instalados, salvo falla o error nuestro.</li>
        <li>Servicios de instalación ya realizados.</li>
      </ul>

      <h2>Reembolsos</h2>
      <p>
        Devolvemos el dinero por el mismo medio de pago en un plazo de <Pending>7 días hábiles</Pending> desde que
        recibimos y revisamos el producto. Para iniciar, escríbenos al {site.whatsappDisplay} o a {site.email}.
      </p>
    </LegalPage>
  );
}
