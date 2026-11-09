"use client";

import { useState } from "react";
import type { ProductImage } from "@/lib/catalog";
import { imageSrcSet, sizedImage } from "@/lib/shopify/image";

/** Foto principal + miniaturas. Al tocar una miniatura cambia la foto principal. */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  const total = images.length;

  const go = (i: number) => setActive((i + total) % total);

  return (
    <>
      <div
        className="product-visual has-photo"
        onKeyDown={(e) => {
          if (total < 2) return;
          if (e.key === "ArrowRight") go(active + 1);
          if (e.key === "ArrowLeft") go(active - 1);
        }}
      >
        <img
          key={current.url}
          className="product-main-img"
          src={sizedImage(current.url, 800)}
          srcSet={imageSrcSet(current.url, 800)}
          alt={current.alt || name}
          width={800}
          height={600}
        />
        {total > 1 && (
          <>
            <button type="button" className="gallery-nav prev" onClick={() => go(active - 1)} aria-label="Foto anterior">
              ‹
            </button>
            <button type="button" className="gallery-nav next" onClick={() => go(active + 1)} aria-label="Foto siguiente">
              ›
            </button>
            <span className="gallery-count" aria-hidden="true">
              {active + 1} / {total}
            </span>
          </>
        )}
      </div>
      {total > 1 && (
        <ul className="product-thumbs" aria-label="Fotos del producto">
          {images.map((img, i) => (
            <li key={img.url}>
              <button
                type="button"
                className={i === active ? "is-active" : undefined}
                aria-current={i === active}
                aria-label={`Ver foto ${i + 1} de ${total}`}
                onClick={() => setActive(i)}
              >
                <img src={sizedImage(img.url, 160)} alt="" width={160} height={120} loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
