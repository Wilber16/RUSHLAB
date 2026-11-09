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

## Pendientes

- Reemplazar en `lib/config.ts` el número de WhatsApp, RUC, correo y redes.
- Reemplazar el logo en código (`components/Logo.tsx`) por el SVG definitivo.
- Siguientes páginas: catálogo por área, ficha de producto, RUSH BUILD, políticas y Libro de Reclamaciones.
- Conectar Shopify (Storefront API) en `lib/catalog/index.ts` y quitar `output: "export"` de `next.config.ts`.

## Publicar en Vercel

1. Sube el proyecto a un repositorio privado de GitHub.
2. En vercel.com, "Add New Project" y elige el repositorio.
3. Vercel detecta Next.js solo; pulsa "Deploy".
