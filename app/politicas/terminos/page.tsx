import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/lib/config";

export const metadata: Metadata = { title: "Términos y condiciones · RUSH LAB" };

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      current="/politicas/terminos/"
      lead="Cómo funciona una compra en RUSH LAB, desde la cotización hasta la entrega."
    >
      <h2>Quiénes somos</h2>
      <p>
        RUSH LAB es una tienda online de componentes, PCs armadas y servicios de upgrade operada por {site.legalName},
        con RUC {site.ruc} y domicilio en {site.address}.
      </p>

      <h2>Precios</h2>
      <ul>
        <li>Todos los precios están en soles e incluyen IGV.</li>
        <li>
          Los precios del hardware cambian con frecuencia. Por eso confirmamos el precio y el stock del día antes de
          cobrarte.
        </li>
        <li>
          Si el precio cambia entre la cotización y tu pago, te avisamos y decides si continuar o cancelar, sin ningún
          costo.
        </li>
        <li>El costo de envío se informa por separado antes del pago.</li>
      </ul>

      <h2>Cómo se confirma tu compra</h2>
      <ol>
        <li>Nos pides una cotización o eliges un producto en la web.</li>
        <li>Te confirmamos precio, stock, envío y plazo de entrega por escrito.</li>
        <li>Pagas por Yape, transferencia u otro medio disponible.</li>
        <li>
          Verificamos que el dinero haya llegado a nuestra cuenta. Desde ese momento tu compra queda confirmada y
          empezamos a prepararla.
        </li>
      </ol>
      <p>
        Nunca te pediremos pagar a una cuenta a nombre de otra persona. Si tienes dudas, confirma el número de cuenta
        escribiéndonos al {site.whatsappDisplay}.
      </p>

      <h2>Comprobantes</h2>
      <p>Emitimos boleta o factura electrónica por cada compra. Si necesitas factura, envíanos tu RUC antes de pagar.</p>

      <h2>Imágenes y descripciones</h2>
      <p>
        Las imágenes son referenciales. La marca y el modelo exactos de cada pieza se indican en tu cotización y en tu
        comprobante.
      </p>

      <h2>Menores de edad</h2>
      <p>Si eres menor de edad, la compra debe hacerla o autorizarla tu madre, padre o tutor.</p>

      <h2>Reclamos</h2>
      <p>
        Puedes registrar un reclamo o una queja en nuestro <a href="/libro-de-reclamaciones/">Libro de Reclamaciones</a>.
        Estos términos se rigen por las leyes del Perú.
      </p>
    </LegalPage>
  );
}
