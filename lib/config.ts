// Datos de la tienda en un solo lugar. Reemplaza los valores marcados
// con "PENDIENTE" cuando tengas tu número, RUC y redes definitivos.

export const site = {
  name: "RUSH LAB",
  slogan: "Tecnología fuera de control",
  concept: "Experimenta. Construye. Juega.",
  // Número de WhatsApp Business en formato internacional, sin + ni espacios.
  whatsappNumber: "51900000000", // PENDIENTE
  whatsappDisplay: "+51 900 000 000", // PENDIENTE
  email: "hola@rushlab.pe", // PENDIENTE
  ruc: "En trámite", // PENDIENTE
  social: {
    instagram: "https://instagram.com/", // PENDIENTE
    tiktok: "https://tiktok.com/", // PENDIENTE
    facebook: "https://facebook.com/", // PENDIENTE
    youtube: "https://youtube.com/", // PENDIENTE
  },
} as const;

/** Enlace de WhatsApp con un mensaje ya escrito. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Formato de precio en soles: S/ 4,790 */
export function formatPEN(amount: number): string {
  return `S/ ${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}
