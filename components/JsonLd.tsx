/** Datos estructurados para Google (precio, stock, marca), invisibles para el visitante. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escapamos "<" para que ningún texto pueda cerrar la etiqueta script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
