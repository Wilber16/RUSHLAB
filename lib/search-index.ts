import type { SearchEntry } from "@/app/api/buscar/route";

// Índice del catálogo para el navegador (buscador, vistos y sugerencias del carrito).
// Se descarga una sola vez por visita y se comparte entre componentes.
let indexPromise: Promise<SearchEntry[]> | null = null;

export function loadIndex(): Promise<SearchEntry[]> {
  indexPromise ??= fetch("/api/buscar/")
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => {
      indexPromise = null;
      return [];
    });
  return indexPromise;
}
