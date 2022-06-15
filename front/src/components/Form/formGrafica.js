import React, { useState, useEffect } from "react";
import moment from "moment";
import useGrafica from "../../hooks/useGrafica";
import { Link } from "wouter";
import Spinner from "../Spinner";
import getServices from "../../services/buscar";
import SimpleFileUpload from "react-simple-file-upload";

export default function FormGrafica({ grafica_id }) {
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [pvpr, setPvpr] = useState("");
  const [arquitectura, setArquitectura] = useState("");
  const [memoria, setMemoria] = useState("");
  const [tipo_memoria, setTipo_memoria] = useState("");
  const [consumo, setConsumo] = useState("");
  const [fecha, setFecha] = useState("");
  const [imagen, setImagen] = useState("");
  const [imagenEdit, setImagenEdit] = useState("");
  const keyword = "grafica";
  const {
    isLoadingGrafica,
    hasErrorGrafica,
    postGrafica,
    putGrafica,
    isSubmit,
  } = useGrafica();
  const [errorNombre, setErrorNombre] = useState("");
  const [errorEmpresa, setErrorEmpresa] = useState("");
  const [errorPvpr, setErrorPvpr] = useState("");
  const [errorArquitectura, setErrorArquitectura] = useState("");
  const [errorMemoria, setErrorMemoria] = useState("");
  const [errorTipo_memoria, setErrorTipo_memoria] = useState("");
  const [errorConsumo, setErrorConsumo] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const [errorImagen, setErrorImagen] = useState("");
  const [formValido, setFormValido] = useState(false);
  const regPvpr = new RegExp("^[\\d]{0,11}(\\.[\\d]{1,2})?$");

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
        setImagenEdit(grafica.imagen);
        setFormValido(true);
        setErrorNombre(false);
        setErrorEmpresa(false);
        setErrorPvpr(false);
        setErrorMemoria(false);
        setErrorTipo_memoria(false);
        setErrorConsumo(false);
        setErrorFecha(false);
        setErrorImagen(false);
        setErrorArquitectura(false);
      });
    }
  }, [grafica_id]);

  const handleChange = (target) => {
    if (target.name === "nombre") {
      setNombre(target.value);
      if (target.value.length > 3 && target.value.length < 50) {
        setErrorNombre(false);
      } else {
        setErrorNombre(true);
      }
    }
    if (target.name === "empresa") {
      setEmpresa(target.value);
      if (target.value.length > 3 && target.value.length < 50) {
        setErrorEmpresa(false);
      } else {
        setErrorEmpresa(true);
      }
    }
    if (target.name === "pvpr") {
      setPvpr(target.value);
      if (target.value > 0 && regPvpr.test(target.value)) {
        setErrorPvpr(false);
      } else {
        setErrorPvpr(true);
      }
    }
    if (target.name === "arquitectura") {
      setArquitectura(target.value);
      if (target.value.length > 3 && target.value.length < 50) {
        setErrorArquitectura(false);
      } else {
        setErrorArquitectura(true);
      }
    }
    if (target.name === "memoria") {
      setMemoria(target.value);
      if (target.value > 0 && target.value.length < 50) {
        setErrorMemoria(false);
      } else {
        setErrorMemoria(true);
      }
    }
    if (target.name === "tipo_memoria") {
      setTipo_memoria(target.value);
      if (target.value.length && target.value.length < 50) {
        setErrorTipo_memoria(false);
      } else {
        setErrorTipo_memoria(true);
      }
    }
    if (target.name === "consumo") {
      setConsumo(target.value);
      if (target.value > 0 && target.value.length < 50) {
        setErrorConsumo(false);
      } else {
        setErrorConsumo(true);
      }
    }
    if (target.name === "fecha") {
      setFecha(target.value);
      if (moment(target.value, "YYYY-MM-DD", true).isValid()) {
        setErrorFecha(false);
      } else {
        setErrorFecha(true);
      }
    }
  };
  const handleUpload = (url) => {
    if (url !== "") {
      setErrorImagen(false);
      setImagen(url);
    } else {
      setErrorImagen(true);
    }
  };

  useEffect(() => {
    setFormValido(
      errorArquitectura === false &&
        errorNombre === false &&
        errorEmpresa === false &&
        errorConsumo === false &&
        errorFecha === false &&
        errorMemoria === false &&
        errorTipo_memoria === false &&
        errorPvpr === false &&
        errorImagen === false
    );
  }, [handleChange]);

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
            imagen: imagen ? imagen : imagenEdit,
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
            imagen: imagen,
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
      }
      setFormValido(false);
    }
  };

  return (
    <>
      {isLoadingGrafica && <Spinner />}
      {hasErrorGrafica && (
        <div className="alert alert-danger">Datos incorrectos</div>
      )}
      {isSubmit && !hasErrorGrafica && (
        <div className="alert alert-success">
          {grafica_id
            ? "Grafica modificada correctamente"
            : "Grafica publicada correctamente"}
        </div>
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
                  <div className="alert alert-danger">
                    Obligatorio, mas de 3 caracteres y menos de 50
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
                {errorEmpresa && (
                  <div className="alert alert-danger">
                    Obligatorio, mas de 3 caracteres y menos de 50
                  </div>
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
                  <div className="alert alert-danger">
                    Obligatorio, numero, mayor de 0 y maximo 2 decimales
                  </div>
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
                  <div className="alert alert-danger">
                    Obligatorio, mas de 3 caracteres y menos de 50
                  </div>
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
                  <div className="alert alert-danger">Obligatorio y positivo</div>
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
                  <div className="alert alert-danger">                    Obligatorio, mas de 3 caracteres y menos de 50
                  </div>
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
                  <div className="alert alert-danger">Obligatorio y positivo</div>
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
                  <div className="alert alert-danger">
                    Obligatorio y formato fecha
                  </div>
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
                  <div className="alert alert-danger">Obligatorio</div>
                )}
                <label htmlFor="inputImagen" className="form-label"></label>
                {imagenEdit && (
                  <img
                    src={imagen ? imagen : imagenEdit}
                    className="form-control"
                    alt="Imagen grafica"
                  />
                )}
                <SimpleFileUpload
                  apiKey="268ccedd024fa995abe1240d0bfd8298"
                  name="imagen"
                  id="inputImagen"
                  onSuccess={handleUpload}
                />
              </div>
              <div className="col-6 form-control text-center d-flex border-0">
                {formValido ? (
                  <input
                    type="submit"
                    className="fadeIn fourth form-control ms-4 p-2 submit"
                    value={grafica_id ? "Editar" : "Publicar"}
                  />
                ) : (
                  <input
                    type="submit"
                    className="fadeIn fourth disabled form-control ms-4 p-2 submit"
                    value={grafica_id ? "Editar" : "Publicar"}
                  />
                )}
                <Link className="fadeIn fourth" to="/graficas">
                  <input
                    type="button"
                    className="fadeIn fourth form-control ms-0 p-2"
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
