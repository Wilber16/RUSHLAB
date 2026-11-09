// Galería de entregas y reseñas. Solo contenido REAL, con permiso del cliente.
// Mientras estén vacías, las páginas muestran un estado vacío honesto.

export interface Delivery {
  /** Nombre del armado o del equipo */
  title: string;
  /** Piezas principales, en una línea */
  specs: string;
  city: string;
  /** Mes y año de entrega, ej.: "Noviembre 2026" */
  date: string;
  /** Ruta de la foto en /public/entregas/ */
  image: string;
  /** Nombre del cliente solo si dio permiso, ej.: "Diego, Arequipa" */
  customer?: string;
}

export interface Review {
  name: string;
  city?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  /** Dónde se publicó la reseña original */
  source: "Google" | "Facebook" | "Instagram";
}

export const deliveries: Delivery[] = [
  // Ejemplo del formato (descomenta y reemplaza cuando tengas tu primera entrega):
  // {
  //   title: "RUSH BUILD Pro",
  //   specs: "Ryzen 7 7800X3D · RTX 5070 · 32 GB DDR5",
  //   city: "Lima",
  //   date: "Noviembre 2026",
  //   image: "/entregas/2026-11-pro-lima.webp",
  //   customer: "Diego",
  // },
];

export const reviews: Review[] = [
  // Copia aquí reseñas reales publicadas en Google u otras redes.
];

/** La galería aparece en el menú solo cuando hay suficientes entregas reales. */
export const MIN_DELIVERIES_TO_SHOW = 3;
export const showGallery = deliveries.length >= MIN_DELIVERIES_TO_SHOW;
