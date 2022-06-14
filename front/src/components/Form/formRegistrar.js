import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { Link } from "wouter";
import Spinner from "../Spinner";
import * as moment from 'moment';

export default function FormRegistrar() {
  const user = sessionStorage.getItem("user")
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecha_nacimiento, setFecha_nacimiento] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");

  const { isLoginLoading, hasLoginError, register, edit } =
    useUser();
  const [errorNombre, setErrorNombre] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorApellido, setErrorApellido] = useState("");
  const [errorFecha_nacimiento, setErrorFecha_nacimiento] = useState("");
  const [errorPais, setErrorPais] = useState("");
  const [errorCiudad, setErrorCiudad] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [formValido, setFormValido] = useState(false);
  const regTelefono = newRegExp("^\d{9}$")
  const regEmail = newRegExp("^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$")
  const regPassword = newRegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$")

  const handleChange = (target) => {
    if (target.name === "nombre") {
      if (target.value.lengeht > 3) {
        setNombre(target.value)
        setErrorNombre(false)
      } else {
        setErrorNombre(true)
      }
    }
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
    if (target.name === "apellido") {
      if (target.value.lengeht > 3) {
        setApellido(target.value)
        setErrorApellido(false)
      } else {
        setErrorApellido(true)
      }
    }
    if (target.name === "fecha_nacimiento") {
      if (moment(target.value, 'MM/DD/YY', true).isValid()) {
        setFecha_nacimiento(target.value)
        setErrorFecha_nacimiento(false)
      } else {
        setErrorFecha_nacimiento(true)
      }
    }
    if (target.name === "pais") {
      if (target.value.lengeht > 3) {
        setPais(target.value)
        setErrorPais(false)
      } else {
        setErrorPais(true)
      }
    }
    if (target.name === "ciudad") {
      if (target.value.lengeht > 3) {
        setCiudad(target.value)
        setErrorCiudad(false)
      } else {
        setErrorCiudad(true)
      }
    }
    if (target.name === "telefono") {
      if (regTelefono.test(target.value)) {
        setTelefono(target.value)
        setErrorTelefono(false)
      } else {
        setErrorTelefono(true)
      }
    }

    setFormValido(
      errorNombre === false &&
      errorApellido === false &&
      errorEmail === false &&
      errorPassword === false &&
      errorFecha_nacimiento === false &&
      errorPais === false &&
      errorCiudad === false &&
      errorTelefono === false)
  }

  useEffect(() => {
    if (user) {
      setNombre(user.nombre);
      setEmail(user.email);
      setPassword(user.password);
      setApellido(user.apellido);
      setFecha_nacimiento(user.fecha_nacimiento);
      setPais(user.pais);
      setCiudad(user.ciudad);
      setTelefono(user.telefono);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValido) {
      user
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

      if (!user) {
        setNombre("");
        setEmail("");
        setPassword("");
        setApellido("");
        setFecha_nacimiento("");
        setPais("");
        setCiudad("");
        setTelefono("");
      }
    }
  };

  return (
    <>
      {isLoginLoading && <Spinner />}
      {hasLoginError && (
        <strong className="alert alert-danger">Datos incorrectos</strong>
      )}
      {!isLoginLoading && (
        <div className="wrapper fadeInDown">
          <div className="container w-50 border p-4 mt-4 formContent">
            <h1 className="text-center fadeIn first">
              {user ? "Editar perfil" : "Registrarse"}
            </h1>
            <form
              className="row g-3"
              name={user ? "editar_perfil" : "registrase"}
              onSubmit={handleSubmit}
            >
              <div className="col-md-6">
                {errorNombre && (
                  <strong className="alert alert-danger">Obligatorio y mas de 3 caracteres</strong>
                )}
                <label htmlFor="inputNombre" className="form-label">
                  Nombre
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
                  <strong className="alert alert-danger">Obligatorio y formato email. Ej: pepito@gmail.com</strong>
                )}
                <label htmlFor="inputEmail" className="form-label">
                  Email
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
                  <strong className="alert alert-danger">Obligatorio, entre 6-16 caracteres, minimo una letra, numero y caracter especial</strong>
                )}
                <label htmlFor="inputPassword" className="form-label">
                  password
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
                  <strong className="alert alert-danger">Obligatorio y mas de 3 caracteres</strong>
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
                  <strong className="alert alert-danger">Obligatorio y formato fecha</strong>
                )}
                <label htmlFor="inputFecha_nacimiento" className="form-label">
                  Fecha de nacimiento
                </label>
                <input
                  type="text"
                  name="fecha_nacimiento"
                  id="inputFecha_nacimiento"
                  className="form-control"
                  value={fecha_nacimiento}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorPais && (
                  <strong className="alert alert-danger">Obligatorio y mas de 3 caracteres</strong>
                )}
                <label htmlFor="inputPais" className="form-label">
                  Pais
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
                  <strong className="alert alert-danger">Obligatorio y mas de 3 caracteres</strong>
                )}
                <label htmlFor="inputCiudad" className="form-label">
                  Pais
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
                  <strong className="alert alert-danger">Obligatorio y mas de 3 caracteres</strong>
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
              <div className="col-12 text-center d-flex">
                {formValido &&
                  <input
                    type="submit"
                    className="fadeIn fourth"
                    value={oferta_id ? "Editar" : "Registrarse"}
                  />}
                <Link className="fadeIn fourth" to="/">
                  <input
                    type="button"
                    className="fadeIn fourth"
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
