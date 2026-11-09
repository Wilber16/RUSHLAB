import type { Metadata } from "next";
import { site, whatsappLink } from "@/lib/config";
import { ContactForm } from "@/components/ContactForm";
import { WhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contacto · RUSH LAB",
  description: "Escríbenos por WhatsApp o correo. Atendemos de lunes a sábado y enviamos a todo el Perú.",
};

export default function ContactoPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Ruta">
            <a href="/">Inicio</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contacto</span>
          </nav>
          <h1 className="page-hero-title">
            Habla con el <span>laboratorio</span>
          </h1>
          <p className="page-hero-lead">
            Respondemos por WhatsApp en horario de atención. Cuéntanos qué necesitas y te ayudamos a elegir.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 36 }}>
        <div className="wrap contact">
          <div className="contact-channels">
            <a className="channel channel-main" href={whatsappLink("Hola RUSH LAB")} target="_blank" rel="noopener">
              <WhatsApp />
              <span>
                <strong>WhatsApp</strong>
                <span>{site.whatsappDisplay}</span>
              </span>
            </a>
            <dl className="spec-table">
              <div>
                <dt>Correo</dt>
                <dd>{site.email}</dd>
              </div>
              <div>
                <dt>Horario</dt>
                <dd>{site.hours}</dd>
              </div>
              <div>
                <dt>Entregas</dt>
                <dd>{site.deliveryArea}</dd>
              </div>
              <div>
                <dt>Redes</dt>
                <dd className="social-links">
                  <a href={site.social.instagram} target="_blank" rel="noopener">
                    Instagram
                  </a>
                  <a href={site.social.tiktok} target="_blank" rel="noopener">
                    TikTok
                  </a>
                  <a href={site.social.facebook} target="_blank" rel="noopener">
                    Facebook
                  </a>
                  <a href={site.social.youtube} target="_blank" rel="noopener">
                    YouTube
                  </a>
                </dd>
              </div>
            </dl>
            <p className="muted small">
              Trabajamos sin tienda física. Las entregas en Lima se coordinan contigo por WhatsApp.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
