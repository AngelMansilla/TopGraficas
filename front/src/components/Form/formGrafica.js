import React, { useState, useEffect } from "react";
import useGrafica from "../../hooks/useGrafica";
import { Link } from "wouter";
import Spinner from "../Spinner";
import getGrafica from "../../services/Grafica/getGraficas";

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
  const { isSubmitLoading, hasSubmitError, submitPost, isSubmit, submitPut } =
    useGrafica();

  useEffect(() => {
    if (grafica_id) {
      getGrafica({ id: grafica_id }).then((grafica) => {
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

  useEffect(() => {
    if (isSubmit);
  }, [isSubmit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    grafica_id
      ? submitPut({
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
      : submitPost({
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
  };

  return (
    <>
      {isSubmitLoading && <Spinner />}
      {hasSubmitError && (
        <strong className="alert alert-danger">Datos incorrectos</strong>
      )}
      {!isSubmitLoading && (
        <div className="wrapper fadeInDown">
          <div className="container w-50 border p-4 mt-4 formContent">
            {grafica_id ? (
              <h1 className="text-center fadeIn first">Editar Gráfica</h1>
            ) : (
              <h1 className="text-center fadeIn first">Publicar Gráfica</h1>
            )}
            <form
              className="row g-3"
              name="publicar-grafica"
              onSubmit={handleSubmit}
            >
              <div className="col-md-6">
                <label htmlFor="inputNombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  id="inputNombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmpresa" className="form-label">
                  Empresa
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="empresa"
                  id="inputEmpresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPVPR" className="form-label">
                  Precio de salida (€)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="pvpr"
                  id="inputPVPR"
                  step="0.01"
                  value={pvpr}
                  onChange={(e) => setPvpr(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputArquitectura" className="form-label">
                  Arquitectura
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="arquitectura"
                  id="inputArquitectura"
                  value={arquitectura}
                  onChange={(e) => setArquitectura(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputMemoria" className="form-label">
                  Memoria (GB)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="memoria"
                  id="inputMemoria"
                  value={memoria}
                  onChange={(e) => setMemoria(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputTipo_memoria" className="form-label">
                  Tipo de memoria
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="tipo_memoria"
                  id="inputTipo_memoria"
                  value={tipo_memoria}
                  onChange={(e) => setTipo_memoria(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputConsumo" className="form-label">
                  Consumo (Vatios)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="consumo"
                  id="inputConsumo"
                  value={consumo}
                  onChange={(e) => setConsumo(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputFecha" className="form-label">
                  Fecha
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha"
                  id="inputFecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputImagen" className="form-label">
                  Imagen
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="imagen"
                  id="inputImagen"
                  onChange={(e) => setImagen(e.target.files[0].name)}
                />
              </div>
              <div className="col-12 text-center d-flex">
                {grafica_id ? (
                  <input
                    type="submit"
                    className="fadeIn fourth"
                    value="Editar"
                  />
                ) : (
                  <input
                    type="submit"
                    className="fadeIn fourth"
                    value="Publicar"
                  />
                )}
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
