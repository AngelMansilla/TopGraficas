import React, { useState, useEffect } from "react";
import useOferta from "../../hooks/useOferta";
import { Link } from "wouter";
import Spinner from "../Spinner";
import getServices from "../../services/buscar";

export default function FormOferta({ oferta_id }) {
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [enlace, setEnlace] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [grafica_id, setGrafica_id] = useState("");
  const [graficas, setGraficas] = useState([]);
  const [user_id, setUser_id] = useState([]);
  const keyword = "oferta";
  const { isLoadingOferta, hasErrorOferta, postOferta, putOferta } =
    useOferta();
  const [errorTitulo, setErrorTitulo] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorEnlace, setErrorEnlace] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState("");
  const [errorVendedor, setErrorVendedor] = useState("");
  const [errorGrafica, setErrorGrafica] = useState("");
  const [formValido, setFormValido] = useState(false);
  const regPrecio = newRegExp("^[\d]{0,11}(\.[\d]{1,2})?$")


  const handleChange = (target) => {
    if (target.name === "titulo") {
      if (target.value.lengeht > 3) {
        setTitulo(target.value)
        setErrorTitulo(false)
      } else {
        setErrorTitulo(true)
      }
    }
    if (target.name === "vendedor") {
      if (target.value.lengeht > 3) {
        setVendedor(target.value)
        setErrorVendedor(false)
      } else {
        setErrorVendedor(true)
      }
    }
    if (target.name === "precio") {
      if (target.value > 0 && regPrecio.test(target.value)) {
        setPrecio(target.value)
        setErrorPrecio(false)
      } else {
        setErrorPrecio(true)
      }
    }
    if (target.name === "descripcion") {
      if (target.value.lengeht > 3) {
        setDescripcion(target.value)
        setErrorDescripcion(false)
      } else {
        setErrorDescripcion(true)
      }
    }
    if (target.name === "enlace") {
      if (target.value.lengeht > 3) {
        setEnlace(target.value)
        setErrorEnlace(false)
      } else {
        setErrorEnlace(true)
      }
    }
    if (target.name === "grafica") {
      if (target.value > 0) {
        setGrafica_id(target.value)
        setErrorGrafica(false)
      } else {
        setErrorGrafica(true)
      }
    }
    setFormValido(
      errorTitulo === false &&
      errorDescripcion === false &&
      errorVendedor === false &&
      errorEnlace === false &&
      errorGrafica === false &&
      errorPrecio === false)
  }

  useEffect(() => {
    if (oferta_id) {
      getServices({ keyword, id: oferta_id }).then((oferta) => {
        setTitulo(oferta.titulo);
        setPrecio(oferta.precio);
        setEnlace(oferta.enlace);
        setDescripcion(oferta.descripcion);
        setVendedor(oferta.vendedor);
        setGrafica_id(oferta.grafica_id);
        setUser_id(oferta.user_id);
      });
    }
    getServices({ keyword: "grafica" }).then((graficas) => {
      setGraficas(graficas);
    });
  }, [oferta_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValido) {
      oferta_id
        ? putOferta({
          oferta_id,
          titulo,
          precio,
          enlace,
          descripcion,
          vendedor,
          grafica_id,
          user_id,
        })
        : postOferta({
          titulo,
          precio,
          enlace,
          descripcion,
          vendedor,
          grafica_id,
        });

      if (!oferta_id) {
        setTitulo("");
        setPrecio("");
        setEnlace("");
        setDescripcion("");
        setVendedor("");
      }
    }
  };

  return (
    <>
      {isLoadingOferta && <Spinner />}
      {hasErrorOferta ? (
        <strong className="alert alert-danger">Datos incorrectos</strong>
      )
        :
        <strong className="alert alert-success">{oferta_id ? "Oferta modificada correctamente" : "Oferta publicada correctamente"}</strong>
      }
      {!isLoadingOferta && (
        <div className="wrapper fadeInDown">
          <div className="container w-50 border p-4 mt-4 formContent">
            <h1 className="text-center fadeIn first">
              {oferta_id ? "Editar oferta" : "Publicar oferta"}
            </h1>
            <form
              className="row g-3"
              name="publicar-oferta"
              onSubmit={handleSubmit}
            >
              <div className="col-md-6">
                {errorTitulo && (
                  <strong className="alert alert-danger">Obligatorio y mas de 3 caracteres</strong>
                )}
                <label htmlFor="inputTitulo" className="form-label">
                  Titulo
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="titulo"
                  id="inputTitulo"
                  value={titulo}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorEnlace && (
                  <strong className="alert alert-danger">Obligatorio y mas de 3 caracteres</strong>
                )}
                <label htmlFor="inputEnlace" className="form-label">
                  Enlace
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="enlace"
                  id="inputEnlace"
                  value={enlace}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorPrecio && (
                  <strong className="alert alert-danger">Obligatorio, mayor de 0 y maximo 2 decimales</strong>
                )}
                <label htmlFor="inputPrecio" className="form-label">
                  Precio (€)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  id="inputPrecio"
                  step="0.01"
                  value={precio}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-6">
                {errorVendedor && (
                  <strong className="alert alert-danger">Obligatorio y mas de 3 caracteres</strong>
                )}
                <label htmlFor="inputVendedor" className="form-label">
                  vendedor
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="vendedor"
                  id="inputVendedor"
                  value={vendedor}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-12">
                {errorGrafica && (
                  <strong className="alert alert-danger">Obligatorio</strong>
                )}
                <label htmlFor="textareaDescipcion" className="form-label">
                  Graficas
                </label>
                <select
                  onChange={(e) => handleChange(e.target)}
                  multiple={false}
                  name="grafica"
                  id="inputGrafica"
                  className="form-control text-center"
                  value={grafica_id}
                >
                  <option key='0' value='0'>
                    Selecciona una gráfica
                  </option>
                  {graficas.map((grafica) => (
                    <option key={grafica.id} value={grafica.id}>
                      Gráficas {grafica.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12">
                {errorDescripcion && (
                  <strong className="alert alert-danger">Obligatorio y mas de 3 caracteres</strong>
                )}
                <label htmlFor="textareaDescipcion" className="form-label">
                  Descripcion
                </label>
                <textarea
                  className="form-control"
                  name="descripcion"
                  id="textareaDescipcion"
                  value={descripcion}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-12 text-center d-flex">
                {formValido &&
                  <input
                    type="submit"
                    className="fadeIn fourth"
                    value={oferta_id ? "Editar" : "Publicar"}
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
