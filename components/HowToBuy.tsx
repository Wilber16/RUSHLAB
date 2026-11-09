// El proceso de compra real, en orden. Por eso aquí sí van números.
const steps = [
  {
    title: "Elige o cotiza",
    text: "Escoge un armado o cuéntanos tu presupuesto y para qué usarás la PC.",
  },
  {
    title: "Confirma y paga",
    text: "Te confirmamos precio y stock del día. Pagas con Yape o transferencia.",
  },
  {
    title: "Armamos y probamos",
    text: "Ensamblamos, ordenamos cables y hacemos pruebas de estabilidad y temperatura.",
  },
  {
    title: "Recibes tu PC",
    text: "Entrega en Lima o envío asegurado a provincias, con reporte y garantía.",
  },
];

export function HowToBuy() {
  return (
    <section className="section" id="como-comprar" aria-labelledby="como-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head">
          <h2 id="como-title">Cómo comprar</h2>
          <p>Validamos cada pago directamente en nuestra cuenta antes de preparar tu pedido.</p>
        </div>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
