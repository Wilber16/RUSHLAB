import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { ComplaintForm } from "@/components/legal/ComplaintForm";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones · RUSH LAB",
  description: "Libro de Reclamaciones virtual de RUSH LAB, conforme al Código de Protección y Defensa del Consumidor.",
};

export default function LibroPage() {
  return (
    <LegalPage
      title="Libro de Reclamaciones"
      current="/libro-de-reclamaciones/"
      lead="Registra aquí tu reclamo o queja. Te enviaremos una copia a tu correo y responderemos en un plazo no mayor a 15 días hábiles."
    >
      <dl className="spec-table legal-provider">
        <div>
          <dt>Proveedor</dt>
          <dd>{site.legalName}</dd>
        </div>
        <div>
          <dt>RUC</dt>
          <dd>{site.ruc}</dd>
        </div>
        <div>
          <dt>Domicilio</dt>
          <dd>{site.address}</dd>
        </div>
      </dl>

      <ul className="legal-defs">
        <li>
          <strong>Reclamo:</strong> disconformidad relacionada con los productos o servicios que compraste.
        </li>
        <li>
          <strong>Queja:</strong> disconformidad que no se relaciona con los productos o servicios, o malestar por la
          atención recibida.
        </li>
      </ul>

      <ComplaintForm />

      <p className="small muted">
        La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo
        para interponer una denuncia ante el INDECOPI.
      </p>
    </LegalPage>
  );
}
