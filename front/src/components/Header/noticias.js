import React from "react";
import { Link } from "wouter";

export default function Noticias() {
  return (
    <header className="header">
      <nav className="navbar d-flex justify-content-center">
        <Link
          className="nav-link active"
          aria-current="page"
          to="/noticia/publicar"
        >
          <input
            type="button"
            className="fadeIn first"
            value="Publicar noticia"
          />
        </Link>
      </nav>
    </header>
  );
}
