import type { Metadata } from "next";
import { LegalPage, Pending } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Envíos y entregas · RUSH LAB" };

export default function EnviosPage() {
  return (
    <LegalPage
      title="Envíos y entregas"
      current="/politicas/envios/"
      lead="Despachamos tu pedido cuando confirmamos tu pago. Enviamos a Lima y a todo el Perú."
    >
      <h2>Tiempo de preparación</h2>
      <div className="table-scroll">
        <table className="compare legal-table">
          <thead>
            <tr>
              <th scope="col">Tipo de pedido</th>
              <th scope="col">Listo para despacho</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Producto disponible</th>
              <td>24 a 48 horas</td>
            </tr>
            <tr>
              <th scope="row">Producto bajo pedido</th>
              <td>2 a 4 días hábiles</td>
            </tr>
            <tr>
              <th scope="row">PC armada</th>
              <td>2 a 4 días hábiles (incluye armado y pruebas)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Lima Metropolitana</h2>
      <ul>
        <li>Coordinamos contigo el día y la franja horaria de entrega por WhatsApp.</li>
        <li>
          Costo de envío según distrito: <Pending>desde S/ 10</Pending>. Te lo confirmamos antes de cobrar.
        </li>
        <li>Las PCs armadas se entregan en persona para revisarlas juntos al momento de la entrega.</li>
      </ul>

      <h2>Provincias</h2>
      <ul>
        <li>
          Enviamos por agencia (<Pending>Shalom, Olva u otra a tu elección</Pending>). El flete depende del destino y del
          peso, y te lo informamos antes de cobrar.
        </li>
        <li>Las PCs viajan con embalaje reforzado y con el valor declarado y asegurado.</li>
        <li>El tiempo en tránsito suele ser de 1 a 5 días hábiles según la ciudad y la agencia.</li>
        <li>Te enviamos la guía o clave de recojo apenas despachamos.</li>
      </ul>

      <h2>Al recibir tu pedido</h2>
      <ol>
        <li>Revisa el empaque antes de firmar. Si está golpeado, abierto o mojado, anótalo en la guía y graba un video.</li>
        <li>Graba un video al abrir la caja, sobre todo en PCs armadas y tarjetas gráficas.</li>
        <li>Si algo llegó dañado o no corresponde, escríbenos dentro de las 48 horas siguientes a la entrega.</li>
      </ol>
    </LegalPage>
  );
}
