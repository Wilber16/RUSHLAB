import { Search } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap not-found">
        <img src="/brand/byte.webp" alt="BYTE, el especialista en velocidad de RUSH LAB" width={480} height={720} />
        <div className="not-found-copy">
          <p className="not-found-code">Error 404</p>
          <h1 className="page-hero-title">
            Este experimento <span>no existe</span>
          </h1>
          <p className="page-hero-lead">
            BYTE corrió por todo el laboratorio y no encontró esta página. Puede que el enlace esté mal escrito o que el
            producto ya no esté publicado.
          </p>
          <form className="search search-big" role="search" action="/buscar/" method="get">
            <label className="visually-hidden" htmlFor="q-404">
              Buscar productos
            </label>
            <input id="q-404" name="q" type="search" placeholder="Busca lo que necesitas…" />
            <button type="submit" aria-label="Buscar">
              <Search />
            </button>
          </form>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/">
              Volver al inicio
            </a>
            <a className="btn btn-ghost" href="/areas/">
              Ver áreas del laboratorio
            </a>
            <a className="btn btn-ghost" href="/rush-build/">
              Armar mi PC
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
