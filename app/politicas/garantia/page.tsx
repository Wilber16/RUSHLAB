import type { Metadata } from "next";
import { LegalPage, Pending } from "@/components/legal/LegalPage";
import { site } from "@/lib/config";

export const metadata: Metadata = { title: "Garantía · RUSH LAB" };

export default function GarantiaPage() {
  return (
    <LegalPage
      title="Garantía"
      current="/politicas/garantia/"
      lead="Todos nuestros productos son nuevos y tienen garantía. Si algo falla, nos escribes a nosotros y nosotros nos encargamos del trámite."
    >
      <h2>Qué cubre</h2>
      <ul>
        <li>
          <strong>Componentes y periféricos:</strong> garantía del fabricante contra defectos de fábrica. El plazo
          depende de la marca y el modelo, y figura en tu comprobante y en la ficha del producto.
        </li>
        <li>
          <strong>PCs armadas por RUSH LAB:</strong> cada pieza mantiene la garantía de su fabricante y, además,
          cubrimos durante <Pending>3 meses</Pending> cualquier falla causada por el armado (conexiones, cables o montaje).
        </li>
        <li>
          <strong>Servicios de upgrade:</strong> la instalación tiene garantía de <Pending>30 días</Pending>. La pieza
          nueva tiene la garantía de su fabricante.
        </li>
      </ul>

      <h2>Qué no cubre</h2>
      <ul>
        <li>Golpes, caídas, humedad o líquidos.</li>
        <li>Daños por variaciones de voltaje o instalaciones eléctricas defectuosas.</li>
        <li>Productos abiertos, modificados o reparados por terceros, o con sellos de garantía rotos.</li>
        <li>Overclocking o uso fuera de las especificaciones del fabricante.</li>
        <li>Problemas de software, virus o pérdida de información. Haz copia de tus archivos importantes.</li>
      </ul>

      <h2>Cómo hacer válida tu garantía</h2>
      <ol>
        <li>
          Escríbenos por WhatsApp al {site.whatsappDisplay} o a {site.email} con tu número de comprobante, el producto
          y una descripción o video de la falla.
        </li>
        <li>Revisamos el caso y, si hace falta, coordinamos el recojo o la entrega del producto para diagnosticarlo.</li>
        <li>
          Si la falla está cubierta, tramitamos la reparación o el cambio con la marca. Los plazos dependen del
          fabricante y te mantenemos informado en cada paso.
        </li>
      </ol>

      <h2>Tus derechos como consumidor</h2>
      <p>
        Esta garantía no reemplaza los derechos que te da el Código de Protección y Defensa del Consumidor (Ley N.°
        29571). Si un producto no corresponde a lo ofrecido o no es idóneo, puedes pedir su reparación, reposición o la
        devolución de lo pagado.
      </p>
    </LegalPage>
  );
}
