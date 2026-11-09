import type { Metadata } from "next";
import { LegalPage, Pending } from "@/components/legal/LegalPage";
import { site } from "@/lib/config";

export const metadata: Metadata = { title: "Privacidad de datos · RUSH LAB" };

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Privacidad de datos"
      current="/politicas/privacidad/"
      lead="Usamos tus datos solo para atender tu pedido y darte soporte. No los vendemos a nadie."
    >
      <h2>Quién es responsable de tus datos</h2>
      <p>
        {site.legalName}, con RUC {site.ruc} y domicilio en {site.address}. Contacto: {site.email}.
      </p>

      <h2>Qué datos recopilamos</h2>
      <ul>
        <li>Nombre, DNI o RUC, para emitir tu boleta o factura.</li>
        <li>Teléfono, correo y dirección, para coordinar la entrega y la atención posventa.</li>
        <li>Los productos que compras y las piezas de tu PC que nos envías para recomendarte mejoras.</li>
        <li>Datos de navegación anónimos para entender cómo se usa la web.</li>
      </ul>
      <p>No guardamos datos de tarjetas. Los pagos con tarjeta los procesa directamente la pasarela de pago.</p>

      <h2>Para qué los usamos</h2>
      <ul>
        <li>Procesar tu pedido, emitir comprobantes y entregar tus productos.</li>
        <li>Atender garantías, reclamos y consultas.</li>
        <li>Enviarte promociones, solo si nos das tu autorización. Puedes retirarla cuando quieras.</li>
      </ul>

      <h2>Con quién los compartimos</h2>
      <p>
        Solo con quienes necesitamos para darte el servicio: la agencia de envío, la SUNAT para los comprobantes, la
        pasarela de pago y los servicios tecnológicos donde funciona la tienda. Cada uno los usa solo para ese fin.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Según la Ley de Protección de Datos Personales (Ley N.° 29733) y su reglamento, puedes acceder a tus datos,
        rectificarlos, pedir que los eliminemos u oponerte a su uso. Escríbenos a {site.email} con tu nombre, DNI y lo
        que solicitas. Si no estás conforme con nuestra respuesta, puedes acudir a la Autoridad Nacional de Protección
        de Datos Personales.
      </p>

      <h2>Banco de datos</h2>
      <p>
        Nuestro banco de datos de clientes está inscrito ante la Autoridad Nacional de Protección de Datos Personales
        con el código <Pending>[número de inscripción]</Pending>.
      </p>
    </LegalPage>
  );
}
