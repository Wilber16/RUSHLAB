// Carrito con la Storefront API de Shopify. Solo corre en el servidor.
// El identificador del carrito se guarda en una cookie httpOnly (el navegador no puede leerla).

import { shopifyFetch } from "./client";

export interface CartLine {
  id: string;
  quantity: number;
  variantId: string;
  handle: string;
  title: string;
  brand: string;
  kind: string;
  image?: { url: string; alt: string };
  unitPrice: number;
  lineTotal: number;
  availableForSale: boolean;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  total: number;
  currency: string;
  lines: CartLine[];
}

const CART_FIELDS = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        cost {
          totalAmount {
            amount
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            availableForSale
            price {
              amount
            }
            image {
              url
              altText
            }
            product {
              handle
              title
              vendor
              productType
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

interface RawCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: { totalAmount: { amount: string } };
      merchandise: {
        id: string;
        availableForSale: boolean;
        price: { amount: string };
        image: { url: string; altText: string | null } | null;
        product: {
          handle: string;
          title: string;
          vendor: string;
          productType: string;
          featuredImage: { url: string; altText: string | null } | null;
        };
      };
    }[];
  };
}

interface UserError {
  field: string[] | null;
  message: string;
}

export class CartError extends Error {}

function mapCart(raw: RawCart): Cart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    subtotal: Number(raw.cost.subtotalAmount.amount),
    total: Number(raw.cost.totalAmount.amount),
    currency: raw.cost.totalAmount.currencyCode,
    lines: raw.lines.nodes.map((l) => {
      const img = l.merchandise.image ?? l.merchandise.product.featuredImage;
      return {
        id: l.id,
        quantity: l.quantity,
        variantId: l.merchandise.id,
        handle: l.merchandise.product.handle,
        title: l.merchandise.product.title,
        brand: l.merchandise.product.vendor,
        kind: l.merchandise.product.productType,
        image: img ? { url: img.url, alt: img.altText ?? l.merchandise.product.title } : undefined,
        unitPrice: Number(l.merchandise.price.amount),
        lineTotal: Number(l.cost.totalAmount.amount),
        availableForSale: l.merchandise.availableForSale,
      };
    }),
  };
}

function checkErrors(errors: UserError[] | undefined) {
  if (errors && errors.length > 0) throw new CartError(errors.map((e) => e.message).join(" · "));
}

// Nunca se cachean: cada cliente tiene su propio carrito
const noCache = { cache: "no-store" as RequestCache };

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: RawCart | null }>(
    `${CART_FIELDS} query GetCart($id: ID!) { cart(id: $id) { ...CartFields } }`,
    { id: cartId },
    noCache,
  );
  return data.cart ? mapCart(data.cart) : null;
}

export async function createCart(variantId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: RawCart | null; userErrors: UserError[] } }>(
    `${CART_FIELDS}
    mutation CreateCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines, buyerIdentity: { countryCode: PE } }) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }`,
    { lines: [{ merchandiseId: variantId, quantity }] },
    noCache,
  );
  checkErrors(data.cartCreate.userErrors);
  if (!data.cartCreate.cart) throw new CartError("No se pudo crear el carrito.");
  return mapCart(data.cartCreate.cart);
}

export async function addLine(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: RawCart | null; userErrors: UserError[] } }>(
    `${CART_FIELDS}
    mutation AddLine($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
    noCache,
  );
  checkErrors(data.cartLinesAdd.userErrors);
  if (!data.cartLinesAdd.cart) throw new CartError("No se pudo agregar el producto.");
  return mapCart(data.cartLinesAdd.cart);
}

export async function updateLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: RawCart | null; userErrors: UserError[] } }>(
    `${CART_FIELDS}
    mutation UpdateLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] },
    noCache,
  );
  checkErrors(data.cartLinesUpdate.userErrors);
  if (!data.cartLinesUpdate.cart) throw new CartError("No se pudo actualizar la cantidad.");
  return mapCart(data.cartLinesUpdate.cart);
}

export async function removeLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: RawCart | null; userErrors: UserError[] } }>(
    `${CART_FIELDS}
    mutation RemoveLine($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }`,
    { cartId, lineIds: [lineId] },
    noCache,
  );
  checkErrors(data.cartLinesRemove.userErrors);
  if (!data.cartLinesRemove.cart) throw new CartError("No se pudo quitar el producto.");
  return mapCart(data.cartLinesRemove.cart);
}
