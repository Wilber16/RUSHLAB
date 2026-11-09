# Shopify: pago con la marca RUSH LAB, redirección y pedidos sin pagar

## 1. Diseño del pago (checkout)
Requiere haber elegido plan. Ruta: **Configuración → Checkout → Configuraciones → Editar → ícono de engranaje (Configuración)**.

| Ajuste | Valor |
|---|---|
| Logo → Imagen | `docs/marca/rushlab-logo-para-fondo-oscuro.png` · alineación izquierda |
| Principal → Fondo | `#0F1115` |
| Encabezado → Fondo / Acento | `#171A20` / `#FF6B1A` |
| Resumen del pedido → Fondo / Acento | `#171A20` / `#FF6B1A` |
| Acento y botones → Acento / Botón | `#FF6B1A` / `#FF6B1A` |
| Campos → Transparentes | Activado |
| Campos → Error | `#FF5D5D` |
| Tipografía → Títulos / Cuerpo | Barlow / Barlow |

Si el texto se lee mal con fondo oscuro: Principal → Fondo `#FFFFFF`, resumen `#F4F5F7`, encabezado `#FFFFFF` y usa `rushlab-logo-para-fondo-claro.png`.

## 2. Redirigir la tienda de ejemplo a la web
**Tienda online → Temas → (tema actual) … → Editar código → layout/theme.liquid**.
Pega el contenido de `docs/shopify/redireccion-tema.liquid` justo después de `<head>` y guarda.
Cuando compres el dominio, cambia solo la línea `rl_web`.

## 3. Cancelar pedidos no pagados en 24 h (Shopify Flow, gratis)
Instala la app **Shopify Flow** → Crear flujo de trabajo:
1. Activador: **Pedido creado**.
2. Acción: **Esperar** 24 horas.
3. Condición: *Estado financiero de visualización* es **Pendiente** y el pedido **no** está cancelado.
4. Si se cumple: **Cancelar pedido** (reponer inventario, notificar al cliente) + **Agregar etiquetas** `sin-pago-24h`.

Alerta de pedidos grandes: Pedido creado → condición *Precio total* mayor que 3000 → **Enviar correo interno** a tu correo.

## 4. Medición de visitas
Vercel → proyecto → **Analytics** → **Enable**. La web ya trae el código; los datos aparecen desde ese momento.
