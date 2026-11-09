"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/config";
import { WhatsApp } from "./icons";

const topics = ["Cotizar una PC armada", "Comprar un componente", "Mejorar mi PC", "Garantía o soporte", "Otro"];

/** Arma un mensaje ordenado y lo abre en WhatsApp. No guarda ningún dato. */
export function ContactForm() {
  const [sentUrl, setSentUrl] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      `Hola RUSH LAB, soy ${f.get("nombre")}${f.get("ciudad") ? ` de ${f.get("ciudad")}` : ""}.`,
      `Motivo: ${f.get("motivo")}`,
      f.get("presupuesto") ? `Presupuesto: S/ ${f.get("presupuesto")}` : "",
      `${f.get("mensaje")}`,
    ].filter(Boolean);
    const url = whatsappLink(lines.join("\n"));
    setSentUrl(url);
    window.open(url, "_blank", "noopener");
  }

  return (
    <form className="contact-form complaint" onSubmit={onSubmit}>
      <h2 className="contact-form-title">Escríbenos</h2>
      <p className="muted small">Al enviar se abrirá WhatsApp con tu mensaje listo. No guardamos estos datos.</p>
      <div className="form-grid">
        <label>
          Tu nombre
          <input id="c-nombre" name="nombre" required autoComplete="given-name" />
        </label>
        <label>
          Ciudad
          <input id="c-ciudad" name="ciudad" placeholder="Ej.: Arequipa" />
        </label>
        <label>
          Motivo
          <select id="c-motivo" name="motivo" defaultValue={topics[0]}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Presupuesto (S/)
          <input id="c-presupuesto" name="presupuesto" inputMode="numeric" placeholder="Opcional" />
        </label>
        <label className="span-2">
          Mensaje
          <textarea
            id="c-mensaje"
            name="mensaje"
            rows={5}
            required
            placeholder="Ej.: Quiero jugar Warzone en 1440p y hacer streaming."
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        <WhatsApp />
        Enviar por WhatsApp
      </button>
      {sentUrl && (
        <p className="small muted" role="status">
          Si WhatsApp no se abrió, <a href={sentUrl} target="_blank" rel="noopener">toca aquí para abrirlo</a>.
        </p>
      )}
    </form>
  );
}
