import { site, whatsappLink } from "@/lib/config";
import { Logo } from "./Logo";
import { Book, WhatsApp } from "./icons";

export function Footer() {
  const year = 2026;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p className="concept">{site.concept}</p>
            <p style={{ color: "var(--muted)", maxWidth: "36ch" }}>
              Componentes, PCs armadas y upgrades con asesoría técnica. Desde Lima para todo el Perú.
            </p>
          </div>

          <div>
            <h2>Tienda</h2>
            <ul>
              <li><a href="/#areas">Áreas del laboratorio</a></li>
              <li><a href="/#armados">Armados RUSH BUILD</a></li>
              <li><a href="/#upgrades">Upgrades</a></li>
              <li><a href="/#como-comprar">Cómo comprar</a></li>
            </ul>
          </div>

          <div>
            <h2>Políticas</h2>
            <ul>
              <li><a href="/politicas/garantia/">Garantía</a></li>
              <li><a href="/politicas/envios/">Envíos</a></li>
              <li><a href="/politicas/devoluciones/">Cambios y devoluciones</a></li>
              <li><a href="/politicas/privacidad/">Privacidad de datos</a></li>
            </ul>
          </div>

          <div>
            <h2>Contacto</h2>
            <ul>
              <li>
                <a href={whatsappLink("Hola RUSH LAB")} target="_blank" rel="noopener">
                  WhatsApp {site.whatsappDisplay}
                </a>
              </li>
              <li>{site.email}</li>
              <li><a href={site.social.instagram} target="_blank" rel="noopener">Instagram</a></li>
              <li><a href={site.social.tiktok} target="_blank" rel="noopener">TikTok</a></li>
              <li><a href={site.social.youtube} target="_blank" rel="noopener">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-legal">
          <span>
            © {year} RUSH LAB · RUC {site.ruc}
          </span>
          <a className="reclamaciones" href="/libro-de-reclamaciones/">
            <Book />
            Libro de Reclamaciones
          </a>
        </div>
      </div>

      <a className="wa-float" href={whatsappLink("Hola RUSH LAB, tengo una consulta.")} target="_blank" rel="noopener">
        <WhatsApp />
        <span>Escríbenos</span>
      </a>
    </footer>
  );
}
