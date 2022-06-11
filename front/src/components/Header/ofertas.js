import React from "react";
import { Link } from "wouter";
import SelectGraficas from '../../components/SelectGraficas'

export default function Graficas({ params, graficas }) {
  return (
    <header className="header">
      <nav className="navbar d-flex justify-content-center">
        <SelectGraficas
          graficaId={params ? params.id : 0}
          graficas={graficas}
        />
        <Link
          className="nav-link active"
          aria-current="page"
          to="/oferta/publicar"
        >
          <input
            type="button"
            className="fadeIn first"
            value="Publicar oferta"
          />
        </Link>
      </nav>
    </header>
  );
}
