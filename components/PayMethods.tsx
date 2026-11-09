import { site } from "@/lib/config";

/** Medios de pago aceptados, junto a cada botón de compra. */
export function PayMethods({ note = true }: { note?: boolean }) {
  return (
    <div className="pay-methods">
      <span className="pay-label">Pagas con</span>
      <ul>
        {site.paymentMethods.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      {note && (
        <p>
          Verificamos tu pago en nuestra cuenta antes de preparar el pedido. RUC {site.ruc}.
        </p>
      )}
    </div>
  );
}
