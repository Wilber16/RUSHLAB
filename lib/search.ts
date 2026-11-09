// Búsqueda simple en el navegador: sin acentos, sin mayúsculas, todas las palabras deben aparecer.

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9.]+/g, " ")
    .trim();
}

// Sinónimos comunes de cómo busca la gente
const synonyms: Record<string, string[]> = {
  gpu: ["tarjeta grafica"],
  grafica: ["tarjeta grafica"],
  video: ["tarjeta grafica"],
  cpu: ["procesador"],
  ram: ["memoria ram"],
  memoria: ["memoria ram"],
  disco: ["ssd"],
  fuente: ["fuente de poder"],
  case: ["gabinete"],
  placa: ["placa madre"],
  mobo: ["placa madre"],
  pc: ["rush build"],
  audifono: ["audifonos"],
};

export function matches(haystack: string, query: string): boolean {
  const hay = normalize(haystack);
  const words = normalize(query).split(" ").filter(Boolean);
  if (words.length === 0) return false;
  return words.every((w) => hay.includes(w) || (synonyms[w] ?? []).some((s) => hay.includes(s)));
}
