// Textos de ayuda por tipo de producto: qué es y qué revisar antes de comprar.
// Es contenido propio de RUSH LAB (no viene de Shopify), así que vive aquí.

export interface KindInfo {
  /** Para qué sirve este tipo de componente, en una o dos frases */
  role: string;
  /** Lo que hay que revisar para que sea compatible */
  checks: string[];
}

export const kindInfo: Record<string, KindInfo> = {
  "Tarjeta gráfica": {
    role: "Es la pieza que más influye en los FPS y en la calidad gráfica de tus juegos.",
    checks: [
      "Que tu fuente tenga la potencia y los conectores que pide la tarjeta.",
      "Que la tarjeta entre en tu gabinete (largo y grosor).",
      "Que tu procesador no la limite en los juegos que usas.",
    ],
  },
  Procesador: {
    role: "Ejecuta el juego y todo lo demás. Pesa más en juegos competitivos y en multitarea.",
    checks: [
      "Que el socket coincida con tu placa madre (AM5, AM4 o LGA 1700).",
      "Que la placa tenga la BIOS actualizada para este modelo.",
      "Si no trae disipador, sumar uno adecuado.",
    ],
  },
  "Memoria RAM": {
    role: "Permite tener juegos, navegador y programas abiertos sin que la PC se trabe.",
    checks: [
      "Que sea del tipo que acepta tu placa (DDR4 o DDR5).",
      "Usar dos módulos iguales para que trabajen en doble canal.",
      "Activar el perfil EXPO o XMP para que vaya a su velocidad real.",
    ],
  },
  SSD: {
    role: "Hace que Windows, los programas y los juegos carguen en segundos.",
    checks: [
      "Que tu placa tenga una ranura M.2 libre (para NVMe) o un puerto SATA.",
      "Que la ranura soporte la generación PCIe del SSD para aprovechar su velocidad.",
    ],
  },
  "Placa madre": {
    role: "Conecta todas las piezas y define qué podrás mejorar en el futuro.",
    checks: [
      "Socket compatible con tu procesador.",
      "Tipo de memoria (DDR4 o DDR5) y tamaño (ATX o Micro ATX) para tu gabinete.",
    ],
  },
  "Fuente de poder": {
    role: "Entrega energía estable a toda la PC. Una fuente mala pone en riesgo las demás piezas.",
    checks: [
      "Potencia suficiente para tu tarjeta gráfica con margen de sobra.",
      "Conectores necesarios para la tarjeta gráfica.",
    ],
  },
  Gabinete: {
    role: "Protege las piezas y define qué tan frescas se mantienen.",
    checks: [
      "Que entre tu placa madre (ATX o Micro ATX).",
      "Espacio para el largo de tu tarjeta gráfica y la altura del disipador.",
    ],
  },
  Refrigeración: {
    role: "Mantiene el procesador a buena temperatura para que rinda sin bajar su velocidad.",
    checks: [
      "Compatibilidad con el socket de tu procesador.",
      "Altura máxima del disipador o espacio para el radiador en tu gabinete.",
    ],
  },
  Monitor: {
    role: "Muestra lo que tu tarjeta gráfica produce. La frecuencia (Hz) define qué tan fluido se ve.",
    checks: [
      "Que tu tarjeta gráfica pueda dar los FPS que el monitor muestra.",
      "Usar el cable correcto (DisplayPort o HDMI 2.1) para llegar a la frecuencia máxima.",
    ],
  },
  Teclado: { role: "Tu herramienta principal en cada partida.", checks: ["Conexión USB libre o inalámbrica según el modelo."] },
  Mouse: { role: "Precisión y comodidad para jugar horas.", checks: ["Tamaño y forma según tu mano y tu tipo de agarre."] },
  Audífonos: {
    role: "Escuchar pasos y comunicarte bien con tu equipo.",
    checks: ["Conexión USB o 3.5 mm según tu PC o consola."],
  },
  Accesorio: { role: "Complementa tu setup.", checks: ["Revisa la descripción para confirmar compatibilidad."] },
};

export function getKindInfo(kind: string): KindInfo {
  return kindInfo[kind] ?? kindInfo.Accesorio;
}
