"use client";

import { useState } from "react";
import { site } from "@/lib/config";

type Status = "idle" | "sending" | "sent" | "error";

/** Número de hoja: año + correlativo provisional basado en fecha y hora. */
function makeSheetNumber() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(
    d.getSeconds(),
  )}`;
}

export function ComplaintForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [sheet, setSheet] = useState<string>("");
  const [minor, setMinor] = useState(false);
  const connected = site.complaintsEndpoint.length > 0;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!connected) return;
    const form = e.currentTarget;
    const number = makeSheetNumber();
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch(site.complaintsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          hoja: number,
          fecha: new Date().toISOString(),
          proveedor: `${site.legalName} · RUC ${site.ruc}`,
          ...data,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSheet(number);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="complaint-done" role="status">
        <h2>Registramos tu hoja de reclamación N.° {sheet}</h2>
        <p>
          Guarda este número. Te enviaremos una copia a tu correo y responderemos en un plazo no mayor a 15 días
          hábiles.
        </p>
        <button type="button" className="btn btn-outline" onClick={() => setStatus("idle")}>
          Registrar otro reclamo
        </button>
      </div>
    );
  }

  return (
    <form className="complaint" onSubmit={onSubmit}>
      {!connected && (
        <p className="legal-draft" role="note">
          Formulario aún no conectado. Mientras tanto, envía tu reclamo a {site.email} indicando estos mismos datos.
        </p>
      )}

      <fieldset>
        <legend>1. Tus datos</legend>
        <div className="form-grid">
          <label>
            Nombre y apellidos
            <input id="nombre" name="nombre" required autoComplete="name" />
          </label>
          <label>
            Tipo de documento
            <select id="tipo_doc" name="tipo_doc" defaultValue="DNI">
              <option>DNI</option>
              <option>Carné de extranjería</option>
              <option>Pasaporte</option>
              <option>RUC</option>
            </select>
          </label>
          <label>
            Número de documento
            <input id="num_doc" name="num_doc" required inputMode="numeric" />
          </label>
          <label>
            Teléfono
            <input id="telefono" name="telefono" required type="tel" autoComplete="tel" />
          </label>
          <label>
            Correo electrónico
            <input id="email" name="email" required type="email" autoComplete="email" />
          </label>
          <label className="span-2">
            Domicilio
            <input id="domicilio" name="domicilio" required autoComplete="street-address" />
          </label>
        </div>
        <label className="toggle">
          <input id="menor" type="checkbox" checked={minor} onChange={(e) => setMinor(e.target.checked)} />
          Soy menor de edad
        </label>
        {minor && (
          <label>
            Nombre de tu madre, padre o apoderado
            <input id="apoderado" name="apoderado" required />
          </label>
        )}
      </fieldset>

      <fieldset>
        <legend>2. Producto o servicio</legend>
        <div className="form-grid">
          <label>
            Es un
            <select id="bien" name="bien" defaultValue="Producto">
              <option>Producto</option>
              <option>Servicio</option>
            </select>
          </label>
          <label>
            Monto reclamado (S/)
            <input id="monto" name="monto" inputMode="decimal" placeholder="Opcional" />
          </label>
          <label>
            N.° de comprobante o pedido
            <input id="comprobante" name="comprobante" placeholder="Opcional" />
          </label>
          <label className="span-2">
            Descripción
            <input id="descripcion_bien" name="descripcion_bien" required placeholder="Ej.: RTX 5070 12 GB" />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>3. Detalle</legend>
        <div className="radio-row" role="radiogroup" aria-label="Tipo">
          <label className="radio">
            <input type="radio" name="tipo" value="Reclamo" defaultChecked /> Reclamo
          </label>
          <label className="radio">
            <input type="radio" name="tipo" value="Queja" /> Queja
          </label>
        </div>
        <label>
          ¿Qué pasó?
          <textarea id="detalle" name="detalle" required rows={5} />
        </label>
        <label>
          ¿Qué solicitas?
          <textarea id="pedido" name="pedido" required rows={3} />
        </label>
      </fieldset>

      <label className="toggle">
        <input id="acepto" type="checkbox" name="acepto" required />
        Declaro que los datos son verdaderos y acepto que se usen para atender este reclamo, según la{" "}
        <a href="/politicas/privacidad/">política de privacidad</a>.
      </label>

      {status === "error" && (
        <p className="form-error" role="alert">
          No se pudo registrar el reclamo por un problema de conexión. Inténtalo de nuevo o escríbenos a {site.email}.
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={!connected || status === "sending"}>
        {status === "sending" ? "Registrando…" : "Registrar reclamo"}
      </button>
    </form>
  );
}
