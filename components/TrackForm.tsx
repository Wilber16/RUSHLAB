"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/config";
import { WhatsApp } from "./icons";

// Por ahora la consulta se hace por WhatsApp. Cuando conectemos Shopify,
// este formulario mostrará el estado del pedido directamente aquí.
export function TrackForm() {
  const [url, setUrl] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const link = whatsappLink(
      `Hola RUSH LAB, quiero saber el estado de mi pedido N.° ${f.get("pedido")} a nombre de ${f.get("nombre")}.`,
    );
    setUrl(link);
    window.open(link, "_blank", "noopener");
  }

  return (
    <form className="complaint track" onSubmit={onSubmit}>
      <h2 className="contact-form-title">Consulta tu pedido</h2>
      <label>
        Número de pedido
        <input id="pedido" name="pedido" required placeholder="Ej.: RL-1024" />
      </label>
      <label>
        Nombre con el que compraste
        <input id="t-nombre" name="nombre" required autoComplete="name" />
      </label>
      <button type="submit" className="btn btn-primary">
        <WhatsApp />
        Consultar por WhatsApp
      </button>
      <p className="small muted">Tu número de pedido está en el mensaje de confirmación y en tu comprobante.</p>
      {url && (
        <p className="small muted" role="status">
          Si WhatsApp no se abrió,{" "}
          <a href={url} target="_blank" rel="noopener">
            toca aquí para abrirlo
          </a>
          .
        </p>
      )}
    </form>
  );
}
