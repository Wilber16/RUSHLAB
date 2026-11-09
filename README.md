# RUSH LAB · Tienda web

Proyecto Next.js (App Router + TypeScript) de la tienda RUSH LAB.

## Cómo ejecutarlo en tu computadora

```bash
npm install
npm run dev
```

Abre http://localhost:3000

Para generar la versión publicable (sitio estático en la carpeta `out/`):

```bash
npm run build
```

## Estructura

```
app/
  layout.tsx        Header, footer y fuentes de todas las páginas
  page.tsx          Página de inicio
  globals.css       Colores, tipografía y estilos de la marca
components/         Piezas de la interfaz (Header, Hero, Armados, etc.)
lib/
  config.ts         WhatsApp, RUC, correo y redes (cambia aquí los PENDIENTE)
  catalog/
    index.ts        Única entrada a los datos: aquí se conectará Shopify
    sample-data.ts  Datos de ejemplo de la vista previa
    types.ts        Tipos de áreas y armados
public/brand/       Imágenes de los personajes
```

## Dónde se edita cada cosa

| Qué | Archivo |
| --- | --- |
| WhatsApp, RUC, razón social, dirección, horario, redes | `lib/config.ts` |
| Productos, áreas y PCs armadas (hasta conectar Shopify) | `lib/catalog/sample-data.ts` |
| Piezas y precios del configurador RUSH BUILD | `lib/builder/parts.ts` |
| Servicios de upgrade y lo que incluye cada PC | `lib/services.ts` |
| Campaña de ofertas (fechas y beneficios) | `lib/campaign.ts` |
| Fotos de entregas y reseñas reales | `lib/trust.ts` |
| Textos de políticas | `app/politicas/*/page.tsx` |

Los textos resaltados en amarillo en las políticas son datos que debes completar o decidir.
Cuando tu contador o abogado revise las políticas, cambia `policiesReviewed` a `true` en `lib/config.ts`.

## Activar el Libro de Reclamaciones

El formulario necesita un servicio que reciba los reclamos y te los envíe por correo:

1. Crea un formulario gratuito en https://formspree.io (o un servicio similar) con tu correo.
2. Copia la dirección del formulario (ej.: `https://formspree.io/f/abcd1234`).
3. En Vercel: Settings → Environment Variables → agrega `NEXT_PUBLIC_RECLAMOS_ENDPOINT` con esa dirección.
4. Vuelve a publicar. El botón "Registrar reclamo" se activará.

Mientras no esté configurado, el formulario muestra un aviso y el correo de la tienda.

## Pendientes

- Reemplazar en `lib/config.ts` el número de WhatsApp, RUC, correo y redes.
- Reemplazar el logo en código (`components/Logo.tsx`) por el SVG definitivo.
- Siguientes páginas: catálogo por área, ficha de producto, RUSH BUILD, políticas y Libro de Reclamaciones.
- Conectar Shopify (Storefront API) en `lib/catalog/index.ts` y quitar `output: "export"` de `next.config.ts`.

## Publicar en Vercel

1. Sube el proyecto a un repositorio privado de GitHub.
2. En vercel.com, "Add New Project" y elige el repositorio.
3. Vercel detecta Next.js solo; pulsa "Deploy".
