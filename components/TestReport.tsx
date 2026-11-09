"use client";

import { useEffect, useState } from "react";
import { Check } from "./icons";

// Reporte de pruebas de ejemplo. Al cargar, "corre" la prueba de estrés:
// las temperaturas suben, la barra avanza y termina en "Aprobado para entrega".
// Sin JavaScript o con movimiento reducido se muestra directamente el resultado final.

const FINAL = { cpu: 74, gpu: 68, minutes: 120 };
const DURATION_MS = 3200;

export function TestReport() {
  const [progress, setProgress] = useState(1); // 0 a 1; 1 = resultado final

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / DURATION_MS);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    setProgress(0);
    const delay = window.setTimeout(() => (frame = requestAnimationFrame(tick)), 500);
    return () => {
      window.clearTimeout(delay);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Las temperaturas suben rápido al inicio y se estabilizan, como en una prueba real
  const ease = 1 - Math.pow(1 - progress, 3);
  const cpu = Math.round(32 + (FINAL.cpu - 32) * ease);
  const gpu = Math.round(30 + (FINAL.gpu - 30) * ease);
  const minutes = Math.round(FINAL.minutes * progress);
  const done = progress >= 1;

  return (
    <aside className={`report${done ? " is-done" : ""}`} aria-label="Ejemplo de reporte de pruebas">
      <div className="report-head">
        <span className="report-title">Reporte de pruebas</span>
        <span className="report-note">Ejemplo</span>
      </div>
      <dl aria-live="off">
        <dt>Equipo</dt>
        <dd>RUSH BUILD Pro</dd>
        <dt>Prueba de estrés</dt>
        <dd>
          {Math.floor(minutes / 60)} h {String(minutes % 60).padStart(2, "0")} min
        </dd>
        <dt>CPU, temp. máx.</dt>
        <dd>{cpu} °C</dd>
        <dt>GPU, temp. máx.</dt>
        <dd>{gpu} °C</dd>
        <dt>Memoria</dt>
        <dd>{done ? "Sin errores" : "Probando…"}</dd>
      </dl>
      <div className="report-bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="report-status" role="status">
        {done ? (
          <>
            <Check />
            Aprobado para entrega
          </>
        ) : (
          <span className="report-running">Prueba en curso…</span>
        )}
      </div>
    </aside>
  );
}
