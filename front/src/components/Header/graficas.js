import React from "react";
import { Link } from "wouter";

export default function Graficas() {
  return (
    <header className="header">
      <nav className="navbar d-flex justify-content-center">
        <Link
          className="nav-link active"
          aria-current="page"
          to="/grafica/publicar"
        >
          <input
            type="button"
            className="fadeIn first"
            value="Publicar grafica"
          />
        </Link>
      </nav>
    </header>
  );
}
