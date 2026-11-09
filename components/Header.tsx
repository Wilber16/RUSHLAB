import { site, whatsappLink } from "@/lib/config";
import { Logo } from "./Logo";
import { Menu, Search, WhatsApp } from "./icons";

const nav = [
  { label: "Áreas del laboratorio", href: "/areas/" },
  { label: "PCs armadas", href: "/pc-armadas/" },
  { label: "Upgrades", href: "/upgrades/" },
  { label: "Cómo comprar", href: "/#como-comprar" },
  { label: "Garantía y envíos", href: "/politicas/" },
];

export function Header() {
  const quote = whatsappLink("Hola RUSH LAB, quiero cotizar una PC.");

  return (
    <header className="site-header">
      <div className="wrap header-main">
        <Logo />

        <form className="search" role="search" action="/buscar/" method="get">
          <label className="visually-hidden" htmlFor="q">
            Buscar productos
          </label>
          <input id="q" name="q" type="search" placeholder="Busca una tarjeta gráfica, un SSD, un monitor…" />
          <button type="submit" aria-label="Buscar">
            <Search />
          </button>
        </form>

        <div className="header-actions">
          <a className="btn btn-ghost btn-ghost-wide" href={quote} target="_blank" rel="noopener">
            <WhatsApp />
            Cotizar por WhatsApp
          </a>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Abrir menú">
            <Menu />
          </summary>
          <nav className="mobile-menu-panel" aria-label="Menú principal">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a className="btn btn-primary" href="/pc-armadas/">
              Construye tu máquina
            </a>
            <a className="btn btn-ghost" href={quote} target="_blank" rel="noopener">
              <WhatsApp />
              {site.whatsappDisplay}
            </a>
          </nav>
        </details>
      </div>

      <nav className="header-nav" aria-label="Secciones">
        <div className="wrap">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li className="nav-cta">
              <a href="/pc-armadas/">Construye tu máquina</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
