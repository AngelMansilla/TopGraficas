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
  const { isLoadingOferta, hasErrorOferta, postOferta, putOferta, isSubmit } =
    useOferta();
  const [errorTitulo, setErrorTitulo] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorEnlace, setErrorEnlace] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState(false);
  const [errorVendedor, setErrorVendedor] = useState("");
  const [errorGrafica, setErrorGrafica] = useState("");
  const [formValido, setFormValido] = useState(false);
  const regPrecio = new RegExp("^[\\d]{0,11}(\\.[\\d]{1,2})?$");

  const handleChange = (target) => {
    if (target.name === "titulo") {
      setTitulo(target.value);
      if (target.value.length > 3 && target.value.length < 50) {
        setErrorTitulo(false);
      } else {
        setErrorTitulo(true);
      }
    }
    if (target.name === "vendedor") {
      setVendedor(target.value);
      if (target.value.length > 3 && target.value.length < 50) {
        setErrorVendedor(false);
      } else {
        setErrorVendedor(true);
      }
    }
    if (target.name === "precio") {
      setPrecio(target.value);
      if (target.value > 0 && regPrecio.test(target.value)) {
        setErrorPrecio(false);
      } else {
        setErrorPrecio(true);
      }
    }
    if (target.name === "descripcion") {
      setDescripcion(target.value);
      if (
        target.value.length === 0 ||
        (target.value.length > 3 && target.value.length < 9999)
      ) {
        setErrorDescripcion(false);
      } else {
        setErrorDescripcion(true);
      }
    }
    if (target.name === "enlace") {
      setEnlace(target.value);
      if (target.value.length > 3 && target.value.length < 999) {
        setErrorEnlace(false);
      } else {
        setErrorEnlace(true);
      }
    }
    if (target.name === "grafica") {
      setGrafica_id(target.value);
      if (target.value > 0) {
        setErrorGrafica(false);
      } else {
        setErrorGrafica(true);
      }
    }
    setFormValido(
      errorTitulo === false &&
        errorDescripcion === false &&
        errorVendedor === false &&
        errorEnlace === false &&
        errorGrafica === false &&
        errorPrecio === false
    );
  };

  useEffect(() => {
    if (oferta_id) {
      getServices({ keyword, id: oferta_id }).then((oferta) => {
        setTitulo(oferta.titulo);
        setPrecio(oferta.precio);
        setEnlace(oferta.enlace);
        oferta.descripcion
          ? setDescripcion(oferta.descripcion)
          : setDescripcion("");
        setVendedor(oferta.vendedor);
        setGrafica_id(oferta.grafica_id);
        setUser_id(oferta.user_id);
        setFormValido(true);
        setErrorTitulo(false);
        setErrorEnlace(false);
        setErrorGrafica(false);
        setErrorPrecio(false);
        setErrorVendedor(false);
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

      setFormValido(false);
    }
  };

  return (
    <>
      {isLoadingOferta && <Spinner />}
      {hasErrorOferta && (
        <div className="alert alert-danger">Datos incorrectos</div>
      )}
      {isSubmit && !hasErrorOferta && (
        <div className="alert alert-success">
          {oferta_id
            ? "Oferta modificada correctamente"
            : "Oferta publicada correctamente"}
        </div>
      )}
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
                  <div className="alert alert-danger">
                        Obligatorio, mas de 3 caracteres y menos de 50
                  </div>
                )}
                <label htmlFor="inputTitulo" className="form-label">
                  Titulo*
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
                  <div className="alert alert-danger">
                        Obligatorio, mas de 3 caracteres y menos de 1000
                  </div>
                )}
                <label htmlFor="inputEnlace" className="form-label">
                  Enlace*
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
                  <div className="alert alert-danger">
                    Obligatorio, mayor de 0 y maximo 2 decimales
                  </div>
                )}
                <label htmlFor="inputPrecio" className="form-label">
                  Precio (€)*
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
                  <div className="alert alert-danger">
                    Obligatorio, mas de 3 caracteres y menos de 50
                  </div>
                )}
                <label htmlFor="inputVendedor" className="form-label">
                  vendedor*
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
                  <div className="alert alert-danger">Obligatorio</div>
                )}
                <label htmlFor="textareaDescipcion" className="form-label">
                  Graficas*
                </label>
                <select
                  onChange={(e) => handleChange(e.target)}
                  multiple={false}
                  name="grafica"
                  id="inputGrafica"
                  className="form-control text-center"
                  value={grafica_id}
                >
                  <option key="0" value="0">
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
                  <div className="alert alert-danger">
                      Obligatorio, mas de 3 caracteres y menos de 10000
                  </div>
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
              <div className="col-6 form-control text-center d-flex border-0">
                {formValido ? (
                  <input
                    type="submit"
                    className="fadeIn fourth form-control ms-4 p-2 submit"
                    value={oferta_id ? "Editar" : "Publicar"}
                  />
                ) : (
                  <input
                    type="submit"
                    className="fadeIn fourth disabled form-control ms-4 p-2 submit"
                    value={oferta_id ? "Editar" : "Publicar"}
                  />
                )}
                <Link className="fadeIn fourth" to="/">
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
