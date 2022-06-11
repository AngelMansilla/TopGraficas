import React from "react";
import { Link } from "wouter";
import "./index.css";
import useUser from "../../hooks/useUser";
import Spinner from "../Spinner";

export default function Header() {
  
  const { isLoginLoading, isLogged, logout } = useUser();

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <div className="container-fluid">
          <div className="container-fluid-navbar-toggler">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse ms-5"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item ms-5">
                <Link className="nav-link active" aria-current="page" to="/">
                  Ofertas
                </Link>
              </li>
              <li className="nav-item ms-5">
                <Link className="nav-link" to="/graficas">
                  Graficas
                </Link>
              </li>
              <li className="nav-item ms-5">
                <Link className="nav-link" to="/noticias">
                  Noticias
                </Link>
              </li>
              {isLoginLoading && <Spinner height="50px" />}
              {!isLoginLoading &&
                (isLogged ? (
                  <>
                    <li className="nav-item ms-5">
                      <Link className="nav-link" to="/perfil">
                        Perfil
                      </Link>
                    </li>
                    <li className="nav-item ms-5">
                      <span
                        type="button"
                        className="nav-link"
                        onClick={() => logout()}
                      >
                        Cerrar sesión
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item ms-5">
                      <Link className="nav-link" to="/iniciarSesion">
                        Iniciar sesión
                      </Link>
                    </li>
                    <li className="nav-item ms-5">
                      <Link className="nav-link" to="/registrarse">
                        Registrarse
                      </Link>
                    </li>
                  </>
                ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
