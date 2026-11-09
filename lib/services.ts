// Contenido de servicios: lo que incluye cada PC armada y los upgrades.
// Los precios de mano de obra son de ejemplo hasta que los definas.

export const includedWithEveryBuild = [
  { title: "Armado profesional", text: "Montaje con pulsera antiestática y cables ordenados para un buen flujo de aire." },
  { title: "BIOS y drivers", text: "Actualizamos la BIOS, activamos el perfil de memoria y dejamos los drivers instalados." },
  { title: "Pruebas de estrés", text: "Procesador, tarjeta gráfica y memoria bajo carga para detectar fallas antes de entregar." },
  { title: "Reporte de pruebas", text: "Recibes las temperaturas y resultados de tu PC, con su número de serie RUSH LAB." },
  { title: "Garantía por escrito", text: "Cubre cada pieza según el fabricante y nosotros gestionamos el reclamo por ti." },
  { title: "Envío seguro", text: "Embalaje reforzado y envío asegurado a provincias. En Lima, entrega coordinada." },
];

export interface UpgradeService {
  slug: string;
  title: string;
  what: string;
  worthIt: string;
  /** Mano de obra en soles (sin la pieza). Ejemplo hasta definirlo. */
  laborFrom: number;
}

export const upgradeServices: UpgradeService[] = [
  {
    slug: "ram",
    title: "Más memoria RAM",
    what: "Agregamos o cambiamos módulos y activamos el perfil EXPO o XMP para que rindan a su velocidad.",
    worthIt: "Si tienes 8 GB, o 16 GB y juegas con muchas cosas abiertas.",
    laborFrom: 30,
  },
  {
    slug: "gpu",
    title: "Cambio de tarjeta gráfica",
    what: "Instalamos la nueva tarjeta, revisamos que la fuente la soporte y dejamos los drivers limpios.",
    worthIt: "Si tu procesador aún va bien pero los juegos nuevos no llegan a los FPS que quieres.",
    laborFrom: 50,
  },
  {
    slug: "ssd",
    title: "SSD NVMe y migración",
    what: "Instalamos el SSD y pasamos tu Windows, programas y archivos sin que pierdas nada.",
    worthIt: "Si tu PC aún arranca desde un disco duro o un SSD casi lleno.",
    laborFrom: 60,
  },
  {
    slug: "psu",
    title: "Fuente de poder",
    what: "Cambiamos la fuente por una certificada con la potencia correcta para tus piezas.",
    worthIt: "Si vas a poner una tarjeta gráfica más potente o tu fuente es genérica.",
    laborFrom: 40,
  },
  {
    slug: "cooling",
    title: "Limpieza y pasta térmica",
    what: "Limpieza completa, cambio de pasta térmica y revisión de ventiladores.",
    worthIt: "Si tu PC hace mucho ruido, se calienta o lleva más de un año sin limpieza.",
    laborFrom: 60,
  },
  {
    slug: "diagnostico",
    title: "Diagnóstico de rendimiento",
    what: "Medimos temperaturas y rendimiento y te decimos qué pieza limita tu equipo.",
    worthIt: "Si no sabes qué mejorar primero para aprovechar tu presupuesto.",
    laborFrom: 0,
  },
];

export const howToFindSpecs = [
  {
    title: "Abre el Administrador de tareas",
    text: "Presiona Ctrl + Shift + Esc y entra a la pestaña Rendimiento.",
  },
  {
    title: "Toma capturas de CPU, Memoria y GPU",
    text: "Ahí verás el modelo de tu procesador, cuánta RAM tienes y tu tarjeta gráfica.",
  },
  {
    title: "Mira tu placa madre",
    text: "Presiona Windows + R, escribe msinfo32 y busca \"Fabricante de la placa base\" y \"Producto de la placa base\".",
  },
  {
    title: "Envíanos todo por WhatsApp",
    text: "Con las capturas y para qué usas la PC te respondemos con las mejoras que más convienen.",
  },
];
