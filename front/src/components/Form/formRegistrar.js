import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { Link } from "wouter";
import Spinner from "../Spinner";
import moment from "moment";

import getService from "../../services/User/get";

export default function FormRegistrar() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecha_nacimiento, setFecha_nacimiento] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");

  const { isLoginLoading, hasLoginError, register, edit, isLogged, isSubmit } =
    useUser();
  const [errorNombre, setErrorNombre] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorApellido, setErrorApellido] = useState(false);
  const [errorFecha_nacimiento, setErrorFecha_nacimiento] = useState("");
  const [errorPais, setErrorPais] = useState("");
  const [errorCiudad, setErrorCiudad] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);
  const [formValido, setFormValido] = useState(false);
  const regTelefono = new RegExp(
    "(^\\+34|0034|34)?^[ -]*(6|7)[ -]*([0-9][ -]*){8}$"
  );
  const regEmail = new RegExp("^[\\w-\\.]+@([\\w-]+.)+[\\w-]{2,4}$");
  const regPassword = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");

  const handleChange = (target) => {
    if (target.name === "nombre") {
      setNombre(target.value);
      if (target.value.length > 3) {
        setErrorNombre(false);
      } else {
        setErrorNombre(true);
      }
    }
    if (target.name === "email") {
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
    if (target.name === "apellido") {
      setApellido(target.value);
      if (!target.value || target.value.length > 3) {
        setErrorApellido(false);
      } else {
        setErrorApellido(true);
      }
    }
    if (target.name === "fecha_nacimiento") {
      setFecha_nacimiento(target.value);
      if (moment(target.value, "YYYY-MM-DD", true).isValid()) {
        setErrorFecha_nacimiento(false);
      } else {
        setErrorFecha_nacimiento(true);
      }
    }
    if (target.name === "pais") {
      setPais(target.value);
      if (target.value.length > 3) {
        setErrorPais(false);
      } else {
        setErrorPais(true);
      }
    }
    if (target.name === "ciudad") {
      setCiudad(target.value);
      if (!target.value || target.value.length > 3) {
        setErrorCiudad(false);
      } else {
        setErrorCiudad(true);
      }
    }
    if (target.name === "telefono") {
      setTelefono(target.value);
      if (!target.value || regTelefono.test(target.value)) {
        setErrorTelefono(false);
      } else {
        setErrorTelefono(true);
      }
    }
  };
  useEffect(() => {
    setFormValido(
      errorNombre === false &&
        errorApellido === false &&
        errorEmail === false &&
        errorPassword === false &&
        errorFecha_nacimiento === false &&
        errorPais === false &&
        errorCiudad === false &&
        errorTelefono === false
    );
  }, [handleChange]);

  useEffect(() => {
    let user_id = sessionStorage.getItem("user_id");
    let jwt = sessionStorage.getItem("jwt");
    getService({ user_id, jwt })
      .then((user) => {
        setNombre(user.nombre);
        setEmail(user.email);
        setPassword(user.password);
        setApellido(user.apellido);
        setFecha_nacimiento(user.fecha_nacimiento);
        setPais(user.pais);
        setCiudad(user.ciudad);
        setTelefono(user.telefono);
        setFormValido(true);
        setErrorNombre(false);
        setErrorEmail(false);
        setErrorFecha_nacimiento(false);
        setErrorPais(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValido) {
      isLogged
        ? edit({
            nombre,
            email,
            password,
            apellido,
            fecha_nacimiento,
            pais,
            ciudad,
            telefono,
          })
        : register({
            nombre,
            email,
            password,
            apellido,
            fecha_nacimiento,
            pais,
            ciudad,
            telefono,
          });

      if (!isLogged) {
        setNombre("");
        setEmail("");
        setPassword("");
        setApellido("");
        setFecha_nacimiento("");
        setPais("");
        setCiudad("");
        setTelefono("");
      }
      setFormValido(false);
    }
  };

  return (
    <>
      {isLoginLoading && <Spinner />}
      {hasLoginError && (
        <div className="alert alert-danger">Datos incorrectos</div>
      )}
      {isSubmit && !hasLoginError && (
        <div className="alert alert-success">
          {isLogged && "Perfil modificado correctamente"}
        </div>
      )}
      {!isLoginLoading && (
        <div className="wrapper fadeInDown">
          <div className="container w-50 border p-4 mt-4 formContent">
            <h1 className="text-center fadeIn first">
              {isLogged ? "Editar perfil" : "Registrarse"}
            </h1>
            <form
              className="row g-3 mt-3"
              name={isLogged ? "editar_perfil" : "registrase"}
              onSubmit={handleSubmit}
            >
              <div className="col-md-6">
                {errorNombre && (
                  <div className="alert alert-danger">
                    Obligatorio y 3 caracteres minimo
                  </div>
                )}
                <label htmlFor="inputNombre" className="form-label">
                  Nombre*
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  id="inputNombre"
                  value={nombre}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorEmail && (
                  <div className="alert alert-danger">
                    Obligatorio y formato email. Ej: pepito@gmail.com
                  </div>
                )}
                <label htmlFor="inputEmail" className="form-label">
                  Email*
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="inputEmail"
                  value={email}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorPassword && (
                  <div className="alert alert-danger">
                    1 letra, 1 numero y 8 caracteres minimo
                  </div>
                )}
                <label htmlFor="inputPassword" className="form-label">
                  password*
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="inputPassword"
                  value={password}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorApellido && (
                  <div className="alert alert-danger">
                    Obligatorio y mas de 3 caracteres
                  </div>
                )}
                <label htmlFor="inputApellido" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="apellido"
                  id="inputApellido"
                  value={apellido}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorFecha_nacimiento && (
                  <div className="alert alert-danger">
                    Obligatorio y formato fecha
                  </div>
                )}
                <label htmlFor="inputFecha_nacimiento" className="form-label">
                  Fecha de nacimiento*
                </label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  id="inputFecha_nacimiento"
                  className="form-control"
                  value={fecha_nacimiento}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorPais && (
                  <div className="alert alert-danger">
                    Obligatorio y mas de 3 caracteres
                  </div>
                )}
                <label htmlFor="inputPais" className="form-label">
                  Pais*
                </label>
                <input
                  className="form-control"
                  name="pais"
                  id="inputPais"
                  value={pais}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorCiudad && (
                  <div className="alert alert-danger">
                    Obligatorio y mas de 3 caracteres
                  </div>
                )}
                <label htmlFor="inputCiudad" className="form-label">
                  Ciudad
                </label>
                <input
                  className="form-control"
                  name="ciudad"
                  id="inputCiudad"
                  value={ciudad}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorTelefono && (
                  <div className="alert alert-danger">
                    Obligatorio y mas de 3 caracteres
                  </div>
                )}
                <label htmlFor="inputTelefono" className="form-label">
                  Telefono
                </label>
                <input
                  className="form-control"
                  name="telefono"
                  id="inputTelefono"
                  value={telefono}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6 mt-5">
                {formValido ? (
                  <input
                    type="submit"
                    className="fadeIn fourth  ms-0"
                    value={isLogged ? "Editar" : "Registrarse"}
                  />
                ) : (
                  <input
                    type="submit"
                    className="fadeIn fourth disabled ms-0"
                    value={isLogged ? "Editar" : "Registrarse"}
                  />
                )}
              </div>
              <div className="col-md-6 mt-5">
                <Link to="/">
                  <input
                    type="button"
                    className="fadeIn fourth ms-3"
                    value="volver"
                  />
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
