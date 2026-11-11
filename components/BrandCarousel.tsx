"use client";

import { useEffect, useRef } from "react";
import type { Brand } from "@/lib/catalog";
import { sizedImage } from "@/lib/shopify/image";

const SPEED = 30; // píxeles por segundo
const LOOP_MIN = 5; // con menos marcas no se repite la fila (se vería forzado)

/**
 * Fila de marcas que avanza sola y despacio. Se detiene al pasar el mouse,
 * al tocarla o al navegar con el teclado, y también se puede deslizar a mano.
 */
export function BrandCarousel({ brands }: { brands: Brand[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const firstList = useRef<HTMLUListElement>(null);
  const loop = brands.length >= LOOP_MIN;

  useEffect(() => {
    const el = scroller.current;
    const list = firstList.current;
    if (!el || !list || !loop) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pos = el.scrollLeft;
    let last = 0;
    let frame = 0;
    let hovering = false;
    let focused = false;
    let touchedUntil = 0;
    let visible = true;

    const step = (t: number) => {
      const dt = last ? Math.min(t - last, 64) : 0;
      last = t;
      const paused = hovering || focused || Date.now() < touchedUntil || !visible || document.hidden;
      if (paused) {
        pos = el.scrollLeft;
      } else {
        const loopWidth = list.offsetWidth;
        pos += (SPEED * dt) / 1000;
        if (pos >= loopWidth) pos -= loopWidth;
        el.scrollLeft = pos;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    const on = (type: string, fn: () => void) => el.addEventListener(type, fn, { passive: true });
    on("pointerenter", () => (hovering = true));
    on("pointerleave", () => (hovering = false));
    on("focusin", () => (focused = true));
    on("focusout", () => (focused = false));
    on("touchstart", () => (touchedUntil = Date.now() + 60_000));
    on("touchend", () => (touchedUntil = Date.now() + 3000));
    on("wheel", () => (touchedUntil = Date.now() + 3000));

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [loop]);

  if (brands.length < 2) return null;

  const items = (copy: boolean) =>
    brands.map((b) => (
      <li key={`${copy ? "c-" : ""}${b.slug}`}>
        <a
          className={`brand-tile${b.logo ? " has-logo" : ""}`}
          href={`/marca/${b.slug}/`}
          tabIndex={copy ? -1 : undefined}
        >
          {b.logo ? (
            <img
              className="brand-logo"
              src={sizedImage(b.logo.url, 320)}
              alt={b.name}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="brand-name">{b.name}</span>
          )}
          <span className="brand-count">
            {b.count} {b.count === 1 ? "producto" : "productos"}
          </span>
        </a>
      </li>
    ));

  return (
    <section className="brands" aria-labelledby="brands-title">
      <div className="wrap brands-head">
        <h2 id="brands-title">Marcas que encuentras en RUSH LAB</h2>
        <a href="/marcas/">Ver todas las marcas</a>
      </div>
      <div ref={scroller} className={`brand-scroller${loop ? " is-loop" : " wrap"}`}>
        <ul ref={firstList} className="brand-list">
          {items(false)}
        </ul>
        {loop && (
          <ul className="brand-list" aria-hidden="true">
            {items(true)}
          </ul>
        )}
      </div>
    </section>
  );
}
