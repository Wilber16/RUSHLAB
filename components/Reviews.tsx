import { reviews } from "@/lib/trust";
import { site } from "@/lib/config";

function Stars({ value }: { value: number }) {
  return (
    <span className="stars" aria-label={`${value} de 5 estrellas`}>
      {"★★★★★".slice(0, value)}
      <span className="stars-off">{"★★★★★".slice(value)}</span>
    </span>
  );
}

/** Reseñas reales. Si no hay ninguna, muestra un estado vacío y el enlace para dejar una. */
export function Reviews({ hideWhenEmpty = false }: { hideWhenEmpty?: boolean }) {
  if (reviews.length === 0 && hideWhenEmpty) return null;

  return (
    <section className="section" aria-labelledby="reviews-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="reviews-title">Lo que dicen nuestros clientes</h2>
          {site.googleReviewsUrl && (
            <a className="btn btn-ghost" href={site.googleReviewsUrl} target="_blank" rel="noopener">
              Ver y dejar reseñas en Google
            </a>
          )}
        </div>

        {reviews.length > 0 ? (
          <div className="reviews">
            {reviews.map((r) => (
              <figure key={`${r.name}-${r.date}`} className="review">
                <Stars value={r.rating} />
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <strong>{r.name}</strong>
                  {r.city && `, ${r.city}`}
                  <span>
                    {r.date}, en {r.source}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="empty empty-wide">
            <p>
              <strong>Todavía no tenemos reseñas publicadas.</strong>
            </p>
            <p>
              Somos una tienda nueva y solo mostramos opiniones reales de clientes. Si ya compraste con nosotros, tu
              reseña nos ayuda muchísimo.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
