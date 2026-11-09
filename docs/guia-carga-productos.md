# Guía para cargar productos en Shopify

Archivo: `plantilla-productos-shopify.csv`. Ábrelo con Excel o Google Sheets, reemplaza las 3 filas de ejemplo por tus productos (una fila por producto) y guárdalo como **CSV UTF-8**.

## Qué poner en cada columna

| Columna | Qué poner | Ejemplo |
| --- | --- | --- |
| Handle | Identificador único: minúsculas, sin espacios ni tildes, con guiones. Será la URL del producto. | `msi-rtx-5070-12gb-gaming-trio` |
| Title | Nombre del producto (sin la marca) | `GeForce RTX 5070 12 GB Gaming Trio OC` |
| Body (HTML) | Descripción corta. Puede ir dentro de `<p>...</p>` | |
| Vendor | La marca | `MSI` |
| Type | Tipo de producto, **escrito exactamente así**: Tarjeta gráfica, Procesador, Memoria RAM, SSD, Placa madre, Fuente de poder, Gabinete, Refrigeración, Monitor, Teclado, Mouse, Audífonos, Accesorio | `Tarjeta gráfica` |
| Tags | 2 o 3 datos clave separados por comas. Se muestran como etiquetas en la web. | `12 GB GDDR7, PCIe 5.0, DLSS 4` |
| Published | `TRUE` | |
| Option1 Name / Value | Déjalo `Title` / `Default Title` si el producto no tiene variantes | |
| Variant SKU | Tu código interno | `RL-GPU-0001` |
| Variant Grams | Peso en gramos (para envíos) | `1500` |
| Variant Inventory Tracker | `shopify` | |
| Variant Inventory Policy | `continue` = se puede vender sin stock (bajo pedido). `deny` = no se vende si no hay stock. | `continue` |
| Variant Price | Precio de venta en soles, con IGV, sin "S/" | `2399` o `2399.90` |
| Variant Compare At Price | **Solo** si es una rebaja real: el precio que cobrabas antes. Si no, vacío. | |
| Image Src | Enlace directo a la foto (opcional; también puedes subirlas después en Shopify) | |
| Image Alt Text | Descripción de la foto | |
| Cost per item | Lo que te cuesta el producto (para el panel de márgenes). No se muestra al cliente. | `2150` |
| Status | `draft` = borrador, no se ve en la web. `active` = visible. | `draft` |

## Importar

1. En Shopify: **Productos → Importar** → elige el archivo → **Subir y continuar** → **Importar productos**.
2. Revisa los productos. Cuando el precio sea el real, cambia el estado a **Activo**.
3. Selecciona todos los productos → **Más acciones → Incluir en canales de ventas** → marca **Rush Lab Headless**. Sin este paso, la web no los muestra.
4. En máximo 5 minutos aparecen en la web, cada uno en su área según su tipo.

## Revisar

Abre `https://rushlab-five.vercel.app/api/shopify/estado/`. Debe decir `"fuenteDelCatalogo": "Shopify"`.
