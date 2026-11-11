"use client";

import { useEffect, useState } from "react";
import { formatPEN } from "@/lib/config";
import { AddToCart } from "../cart/AddToCart";
import { WhatsApp } from "../icons";

/**
 * Barra fija abajo en celulares: aparece cuando los botones de compra
 * de la ficha salen de la pantalla, para comprar sin volver a subir.
 */
export function BuyBar({
  targetId,
  name,
  price,
  variantId,
  whatsappHref,
}: {
  targetId: string;
  name: string;
  price: number;
  variantId?: string;
  whatsappHref: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    // Visible solo cuando los botones quedaron ARRIBA (ya los pasó), no antes de llegar a ellos
    const io = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    io.observe(target);
    return () => io.disconnect();
  }, [targetId]);

  return (
    <div className={`buy-bar${visible ? " is-visible" : ""}`} aria-hidden={!visible} inert={!visible}>
      <div className="buy-bar-info">
        <span className="buy-bar-name">{name}</span>
        <strong>{formatPEN(price)}</strong>
      </div>
      {variantId ? (
        <AddToCart variantId={variantId} name={name} label="Agregar" />
      ) : (
        <a className="btn btn-primary" href={whatsappHref} target="_blank" rel="noopener">
          <WhatsApp />
          Cotizar
        </a>
      )}
    </div>
  );
}
