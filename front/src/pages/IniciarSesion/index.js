import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import "./style.css";
import useUser from "../../hooks/useUser";
import Spinner from "../../components/Spinner";

export default function IniciarSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();
  const { isLoginLoading, hasLoginError, login, isLogged } = useUser();

  useEffect(() => {
    if (isLogged) navigate("/");
  }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <>
      {isLoginLoading && <Spinner />}
      {!isLoginLoading && (
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
              <i className="bi bi-file-person-fill"></i>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                id="login"
                className="fadeIn second"
                name="login"
                placeholder="correo electronico"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                id="password"
                className="fadeIn third"
                name="login"
                placeholder="contraseña"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <input
                type="submit"
                className="fadeIn fourth"
                value="Iniciar sesion"
              />
            </form>
          </div>
        </div>
      )}
      {hasLoginError && (
        <strong className="alert alert-danger">Credenciales incorrectos</strong>
      )}
    </>
  );
}
