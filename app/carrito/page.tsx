import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Tu carrito · RUSH LAB",
  robots: { index: false },
};

export default function CarritoPage() {
  return (
    <section className="section" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Ruta">
          <a href="/">Inicio</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Carrito</span>
        </nav>
        <h1 className="page-title cart-title">Tu carrito</h1>
        <CartView />
      </div>
    </section>
  );
}
