import React, { useState, useEffect } from "react";
import * as moment from 'moment';
import useGrafica from "../../hooks/useGrafica";
import { Link } from "wouter";
import Spinner from "../Spinner";
import getServices from "../../services/buscar";

export default function FormGrafica({ grafica_id }) {
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [pvpr, setPvpr] = useState("");
  const [arquitectura, setArquitectura] = useState("");
  const [memoria, setMemoria] = useState("");
  const [tipo_memoria, setTipo_memoria] = useState("");
  const [consumo, setConsumo] = useState("");
  const [fecha, setFecha] = useState("");
  const [imagen, setImagen] = useState(null);
  const keyword = "grafica";
  const {
    isLoadingGrafica,
    hasErrorGrafica,
    postGrafica,
    putGrafica,
  } = useGrafica();
  const [errorNombre, setErrorNombre] = useState("");
  const [errorEmpresa, setErrorEmpresa] = useState("");
  const [errorPvpr, setErrorPvpr] = useState("");
  const [errorArquitectura, setErrorArquitectura] = useState("");
  const [errorMemoria, setErrorMemoria] = useState("");
  const [errorTipo_memoria, setErrorTipo_memoria] = useState("");
  const [errorConsumo, setErrorConsumo] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const [I, setI] = useState("");
  const [formValido, setFormValido] = useState(false);
  const regPvpr = newRegExp("/^[\d]{0,11}(\.[\d]{1,2})?$/")
  useEffect(() => {
    if (grafica_id) {
      getServices({ keyword, id: grafica_id }).then((grafica) => {
        setNombre(grafica.nombre);
        setEmpresa(grafica.empresa);
        setPvpr(grafica.pvpr);
        setArquitectura(grafica.arquitectura);
        setMemoria(grafica.memoria);
        setTipo_memoria(grafica.tipo_memoria);
        setConsumo(grafica.consumo);
        setFecha(grafica.fecha);
      });
    }
  }, [grafica_id]);

  const handleChange = (target) => {
    if (target.name === "nombre") {
      if (target.value.lengeht > 3) {
        setNombre(target.value)
        setErrorNombre(false)
      } else {
        setErrorNombre(true)
      }
    }
    if (target.name === "empresa") {
      if (target.value.lengeht > 3) {
        setEmpresa(target.value)
        setErrorEmpresa(false)
      } else {
        setErrorEmpresa(true)
      }
    }
    if (target.name === "pvpr") {
      if (target.value > 0 && regPvpr.test(target.value)) {
        setPvpr(target.value)
        setErrorPvpr(false)
      } else {
        setErrorPvpr(true)
      }
    }
    if (target.name === "arquitectura") {
      if (target.value.lengeht > 3) {
        setArquitectura(target.value)
        setErrorArquitectura(false)
      } else {
        setErrorArquitectura(true)
      }
    }
    if (target.name === "memoria") {
      if (target.value.lengeht > 1) {
        setMemoria(target.value)
        setErrorMemoria(false)
      } else {
        setErrorMemoria(true)
      }
    }
    if (target.name === "tipo_memoria") {
      if (target.value.lengeht > 1) {
        setTipo_memoria(target.value)
        setErrorTipo_memoria(false)
      } else {
        setErrorTipo_memoria(true)
      }
    }
    if (target.name === "consumo") {
      if (target.value.lengeht > 1) {
        setConsumo(target.value)
        setErrorConsumo(false)
      } else {
        setErrorConsumo(true)
      }
    }
    if (target.name === "fecha") {
      if (moment(target.value, 'MM/DD/YY', true).isValid()) {
        setFecha(target.value)
        setErrorFecha(false)
      } else {
        setErrorFecha(true)
      }
    }
    if (target.name === "fecha") {
      if (target.files[0].name !== "") {
        setImagen(target.files[0].name)
        setI(false)
      } else {
        setI(true)
      }
    }
    setFormValido(
      errorArquitectura === false &&
      errorNombre === false &&
      errorEmpresa === false &&
      errorConsumo === false &&
      errorFecha === false &&
      errorMemoria === false &&
      errorTipo_memoria === false &&
      errorPvpr === false &&
      errorImagen === false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValido) {
      grafica_id
        ? putGrafica({
          grafica_id,
          nombre,
          empresa,
          pvpr,
          arquitectura,
          memoria,
          tipo_memoria,
          consumo,
          fecha,
          imagen,
        })
        : postGrafica({
          nombre,
          empresa,
          pvpr,
          arquitectura,
          memoria,
          tipo_memoria,
          consumo,
          fecha,
          imagen,
        });

      if (!grafica_id) {
        setNombre("");
        setEmpresa("");
        setPvpr("");
        setArquitectura("");
        setMemoria("");
        setTipo_memoria("");
        setConsumo("");
        setFecha("");
        setImagen(null);
      }
    }
  };

  return (
    <>
      {isLoadingGrafica && <Spinner />}
      {hasErrorGrafica && (
        <strong className="alert alert-danger">Datos incorrectos</strong>
      )}
      {!isLoadingGrafica && (
        <div className="wrapper fadeInDown">
          <div className="container w-50 border p-4 mt-4 formContent">
            <h1 className="text-center fadeIn first">
              {grafica_id ? "Editar gráfica" : "Publicar gráfica"}
            </h1>
            <form
              className="row g-3"
              name="publicar-grafica"
              onSubmit={handleSubmit}
            >
              <div className="col-md-6">
                {errorNombre && (
                  <strong className="alert alert-danger">Obligatorio y mas de 3 caracteres</strong>
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
                {errorEmpresa && (
                  <strong className="alert alert-danger">Obligatorio y mas de 3 caracteres</strong>
                )}
                <label htmlFor="inputEmpresa" className="form-label">
                  Empresa*
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="empresa"
                  id="inputEmpresa"
                  value={empresa}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorPvpr && (
                  <strong className="alert alert-danger">Obligatorio, numero, mayor de 0 y maximo 2 decimales</strong>
                )}
                <label htmlFor="inputPVPR" className="form-label">
                  Precio de salida (€)*
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="pvpr"
                  id="inputPVPR"
                  step="0.01"
                  value={pvpr}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorArquitectura && (
                  <strong className="alert alert-danger">Obligatorio y mas de 3 caracteres</strong>
                )}
                <label htmlFor="inputArquitectura" className="form-label">
                  Arquitectura*
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="arquitectura"
                  id="inputArquitectura"
                  value={arquitectura}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorMemoria && (
                  <strong className="alert alert-danger">Obligatorio</strong>
                )}
                <label htmlFor="inputMemoria" className="form-label">
                  Memoria (GB)*
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="memoria"
                  id="inputMemoria"
                  value={memoria}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorTipo_memoria && (
                  <strong className="alert alert-danger">Obligatorio</strong>
                )}
                <label htmlFor="inputTipo_memoria" className="form-label">
                  Tipo de memoria*
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="tipo_memoria"
                  id="inputTipo_memoria"
                  value={tipo_memoria}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorConsumo && (
                  <strong className="alert alert-danger">Obligatorio</strong>
                )}
                <label htmlFor="inputConsumo" className="form-label">
                  Consumo (Vatios)*
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="consumo"
                  id="inputConsumo"
                  value={consumo}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorFecha && (
                  <strong className="alert alert-danger">Obligatorio y formato fecha</strong>
                )}
                <label htmlFor="inputFecha" className="form-label">
                  Fecha*
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha"
                  id="inputFecha"
                  value={fecha}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-12">
                {errorImagen && (
                  <strong className="alert alert-danger">Obligatorio</strong>
                )}
                <label htmlFor="inputImagen" className="form-label">
                  Imagen*
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="imagen"
                  id="inputImagen"
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-12 text-center d-flex">
                {formValido &&
                  <input
                    type="submit"
                    className="fadeIn fourth"
                    value={grafica_id ? "Editar" : "Publicar"}
                  />}
                <Link className="fadeIn fourth" to="/graficas">
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
