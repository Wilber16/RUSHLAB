import { Check, Receipt, Shield, Truck } from "./icons";

// Franja de garantías del laboratorio: cambia el ritmo entre secciones
// y responde las dudas que frenan una compra en una tienda nueva.
const items = [
  { Icon: Check, title: "Compatibilidad revisada", text: "Antes de cobrar confirmamos que cada pieza funcione con las demás." },
  { Icon: Shield, title: "Probada antes de salir", text: "Cada PC pasa pruebas de estrés y sale con su reporte." },
  { Icon: Receipt, title: "Formal y con garantía", text: "Boleta o factura, garantía por escrito y Libro de Reclamaciones." },
  { Icon: Truck, title: "Envío asegurado", text: "Lima con entrega coordinada y provincias por agencia." },
];

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Por qué comprar en RUSH LAB">
      <ul className="wrap">
        {items.map(({ Icon, title, text }) => (
          <li key={title}>
            <Icon />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
