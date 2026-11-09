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
  // Datos legales que aparecen en políticas y Libro de Reclamaciones
  legalName: "[Tu nombre completo o razón social]", // PENDIENTE
  address: "[Dirección fiscal], Lima, Perú", // PENDIENTE
  hours: "Lunes a sábado, 9:00 a 19:00",
  deliveryArea: "Lima Metropolitana (entrega coordinada) y todo el Perú por agencia",
  // Enlace a tu ficha de Google Business Profile para dejar reseñas
  googleReviewsUrl: "", // PENDIENTE
  // Dirección que recibirá el Libro de Reclamaciones (Formspree u otro servicio).
  // Mientras esté vacía, el formulario no se puede enviar y lo indica.
  complaintsEndpoint: process.env.NEXT_PUBLIC_RECLAMOS_ENDPOINT ?? "",
  // Fecha de la última actualización de las políticas
  policiesUpdated: "9 de noviembre de 2026",
  // Cambia a true cuando tu contador o abogado haya revisado las políticas.
  // Mientras sea false, cada política muestra un aviso de borrador.
  policiesReviewed: false,
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
