import React, { useState, useEffect } from "react";
import useNoticia from "../../hooks/useNoticia";
import { Link } from "wouter";
import Spinner from "../Spinner";

import getServices from "../../services/buscar";

export default function Formnoticia({ noticia_id }) {
  const [titulo, setTitulo] = useState("");
  const [informacion, setInformacion] = useState("");
  const [imagen, setImagen] = useState(null);

  const keyword = "noticia";
  const {
    isLoadingNoticia,
    hasErrorNoticia,
    postNoticia,
    putNoticia,
  } = useNoticia();
  const [errorTitulo, setErrorTitulo] = useState("");
  const [errorInformacion, setErrorInformacion] = useState("");
  const [errorImagen, setErrorImagen] = useState("");
  const [formValido, setFormValido] = useState(false);


  useEffect(() => {
    if (noticia_id) {
      getServices({ keyword, id: noticia_id }).then((noticia) => {
        setTitulo(noticia.titulo);
        setInformacion(noticia.informacion);
      });
    }
  }, [noticia_id]);


  const handleChange = (target) => {
    if (target.name === "titulo") {
      setTitulo(target.value)
      if (target.value.lengeht > 3) {
        setErrorTitulo(false)
      } else {
        setErrorTitulo(true)
      }
    }
    if (target.name === "informacion") {
      setInformacion(target.value)
      if (target.value.lengeht > 3) {
        setErrorInformacion(false)
      } else {
        setErrorInformacion(true)
      }
    }
    if (target.name === "imagen") {
      setImagen(target.files[0])
      if (target.files[0] ) {
        setErrorImagen(false)
      } else {
        setErrorImagen(true)
      }
    }
    setFormValido(
      errorTitulo === false &&
      errorInformacion === false &&
      errorImagen === false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValido) {
      noticia_id
        ? putNoticia({
          noticia_id,
          titulo,
          informacion,
          imagen,
        })
        : postNoticia({
          titulo,
          informacion,
          imagen,
        });

      if (!noticia_id) {
        setTitulo("");
        setInformacion("");
        setImagen(null);
      }
    }
  };

  return (
    <>
      {isLoadingNoticia && <Spinner />}
      {hasErrorNoticia ? (
        <strong className="alert alert-danger">Datos incorrectos</strong>
      )
        :
        <strong className="alert alert-success">{noticia_id ? "Noticia modificada correctamente" : "Noticia publicada correctamente"}</strong>
      }
      {!isLoadingNoticia && (
        <div className="wrapper fadeInDown">
          <div className="container w-50 border p-4 mt-4 formContent">
            <h1 className="text-center fadeIn first">
              {noticia_id ? "Editar noticia" : "Publicar noticia"}
            </h1>
            <form
              className="row g-3"
              name="publicar-noticia"
              onSubmit={handleSubmit}
            >
              <div className="col-md-12">
                {errorTitulo && (
                  <strong className="alert alert-danger">Obligatorio y minimo 3 caracteres</strong>
                )}
                <label htmlFor="inputTitulo" className="form-label">
                  Titulo
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="tiutlo"
                  id="inputTitulo"
                  value={titulo}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-12">
                {errorInformacion && (
                  <strong className="alert alert-danger">Obligatorio y minimo 3 caracteres</strong>
                )}
                <label htmlFor="textareaInformacion" className="form-label">
                  Informacion
                </label>
                <textarea
                  className="form-control"
                  name="infomracion"
                  id="textareaInformacion"
                  value={informacion}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-12">
                {errorImagen && (
                  <strong className="alert alert-danger">Obligatorio</strong>
                )}
                <label htmlFor="inputImagen" className="form-label">
                  Imagen
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
                {formValido && <input
                  type="submit"
                  className="fadeIn fourth"
                  value={noticia_id ? "Editar" : "Publicar"}
                />}
                <Link className="fadeIn fourth" to="/noticias">
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
