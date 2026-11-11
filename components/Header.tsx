import { site, whatsappLink } from "@/lib/config";
import { CartLink } from "./cart/CartLink";
import { Logo } from "./Logo";
import { Menu, Search, WhatsApp } from "./icons";
import { SearchBox } from "./SearchBox";

const nav = [
  { label: "Áreas del laboratorio", href: "/areas/" },
  { label: "PCs armadas", href: "/pc-armadas/" },
  { label: "Upgrades", href: "/upgrades/" },
  { label: "Ofertas", href: "/ofertas/" },
  { label: "Contacto", href: "/contacto/" },
];

export function Header() {
  const quote = whatsappLink("Hola RUSH LAB, quiero cotizar una PC.");

  return (
    <header className="site-header">
      <div className="wrap header-main">
        <Logo />

        <SearchBox id="q" placeholder="Busca una tarjeta gráfica, un SSD, un monitor…" />

        <div className="header-actions">
          <a className="btn btn-ghost btn-ghost-wide" href={quote} target="_blank" rel="noopener">
            <WhatsApp />
            Cotizar por WhatsApp
          </a>
        </div>

        <details className="mobile-search">
          <summary aria-label="Buscar">
            <Search />
          </summary>
          <SearchBox id="q-m" placeholder="Busca un producto…" className="search mobile-search-panel" />
        </details>

        <CartLink />

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
            <a className="btn btn-primary" href="/rush-build/">
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
              <a href="/rush-build/">Construye tu máquina</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
