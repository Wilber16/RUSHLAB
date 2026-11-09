// Campaña de ofertas activa. Cambia fechas y beneficios aquí.
// IMPORTANTE: un "precio antes" (compareAtPrice) debe ser un precio que realmente
// cobraste antes. Mostrar rebajas inventadas está prohibido por el Código de
// Protección y Defensa del Consumidor.

export const campaign = {
  name: "Black Friday RUSH LAB",
  /** Fechas en formato AAAA-MM-DD, hora de Lima */
  start: "2026-11-27",
  end: "2026-11-30",
  startLabel: "viernes 27 de noviembre",
  endLabel: "lunes 30 de noviembre (Cyber Monday)",
  /** Beneficios que no recortan el margen de la tarjeta gráfica */
  perks: [
    { title: "Armado y pruebas gratis", text: "En cualquier PC armada durante la campaña." },
    { title: "Pasta térmica premium de regalo", text: "Con la compra de un procesador o un disipador." },
    { title: "Mousepad XL de regalo", text: "En compras desde S/ 3,000, hasta agotar stock." },
  ],
  terms:
    "Válido del 27 al 30 de noviembre de 2026 o hasta agotar stock. Beneficios no acumulables con otras promociones.",
  /** true mientras los beneficios y fechas sean un borrador */
  isExample: true,
};

/** Estado de la campaña según la fecha (se evalúa en el navegador del cliente). */
export function campaignState(now = new Date()): "upcoming" | "live" | "ended" {
  const start = new Date(`${campaign.start}T00:00:00-05:00`);
  const end = new Date(`${campaign.end}T23:59:59-05:00`);
  if (now < start) return "upcoming";
  if (now > end) return "ended";
  return "live";
}
