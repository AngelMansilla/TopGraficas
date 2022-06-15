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
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [formValido, setFormValido] = useState(false);
  const regEmail = new RegExp("^[\\w-\\.]+@([\\w-]+.)+[\\w-]{2,4}$");
  const regPassword = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");

  const handleChange = (target) => {
    if (target.name === "login") {
      setEmail(target.value);
      if (regEmail.test(target.value)) {
        setErrorEmail(false);
      } else {
        setErrorEmail(true);
      }
    }
    if (target.name === "password") {
      setPassword(target.value);
      if (regPassword.test(target.value)) {
        setErrorPassword(false);
      } else {
        setErrorPassword(true);
      }
    }
  };
  useEffect(() => {
    setFormValido(errorEmail === false && errorPassword === false);
  }, [handleChange]);

  useEffect(() => {
    if (isLogged) navigate("/");
  }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formValido && login({ email, password });
  };

  return (
    <>
      {isLoginLoading && <Spinner />}
      {!isLoginLoading && (
        <div className="wrapper fadeInDown">
          {hasLoginError && (
            <strong className="alert alert-danger">
              Credenciales incorrectos
            </strong>
          )}
          <div id="formContent">
            <div className="fadeIn first">
              <i className="bi bi-file-person-fill"></i>
            </div>
            <form className="mt-2" onSubmit={handleSubmit}>
              <div>
                {errorEmail && (
                  <strong className="alert alert-danger">
                    Formato emeail. Ejemplo: pepito@gmail.com
                  </strong>
                )}
                <input
                  type="email"
                  id="login"
                  className="fadeIn second mt-3 mb-3 login"
                  name="login"
                  placeholder="correo electronico"
                  onChange={(e) => handleChange(e.target)}
                  value={email}
                />
              </div>
              <div>
                {errorPassword && (
                  <strong className="alert alert-danger">
                    1 letra, 1 numero y 8 caracteres minimo
                  </strong>
                )}
                <input
                  type="password"
                  id="password"
                  className="fadeIn third mt-3 login "
                  name="password"
                  placeholder="contraseña"
                  onChange={(e) => handleChange(e.target)}
                  value={password}
                />
              </div>
              {formValido ? (
                <input
                  type="submit"
                  className="fadeIn fourth mt-3"
                  value="Iniciar sesion"
                />
              ) : (
                <input
                  type="submit"
                  className="fadeIn fourth disabled mt-3"
                  value="Iniciar sesion"
                />
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
