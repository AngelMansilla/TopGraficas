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
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [formValido, setFormValido] = useState(false);
  const regEmail = newRegExp("^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$")
  const regPassword = newRegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$")
  
  
  const handleChange = (target) => {
    if (target.name === "email") {
      if (regEmail.test(target.value)) {
        setEmail(target.value)
        setErrorEmail(false)
      } else {
        setErrorEmail(true)
      }
    }
    if (target.name === "password") {
      if (regPassword.test(target.value)) {
        setPassword(target.value)
        setErrorPassword(false)
      } else {
        setErrorPassword(true)
      }
    }
    setFormValido(
      errorEmail === false && errorPassword === false
    )
  }
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
          <div id="formContent">
            <div className="fadeIn first">
              <i className="bi bi-file-person-fill"></i>
            </div>
            <form onSubmit={handleSubmit}>
              {errorEmail && (
                <strong className="alert alert-danger">Formato emeail. Ejemplo: pepito@gmail.com</strong>
              )}
              <input
                type="email"
                id="login"
                className="fadeIn second"
                name="login"
                placeholder="correo electronico"
                onChange={(e) => handleChange(e.target)}
                value={email}
              />
              {errorPassword && (
                <strong className="alert alert-danger">Minimo una letra, numero y caracter especial. 6-16 caracteres</strong>
              )}
              <input
                type="password"
                id="password"
                className="fadeIn third"
                name="login"
                placeholder="contraseña"
                onChange={(e) => handleChange(e.target)}
                value={password}
              />
              {formValido &&
                <input
                  type="submit"
                  className="fadeIn fourth"
                  value="Iniciar sesion"
                />}
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
