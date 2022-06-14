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

  useEffect(() => {
    if (noticia_id) {
      getServices({ keyword, id: noticia_id }).then((noticia) => {
        setTitulo(noticia.titulo);
        setInformacion(noticia.informacion);
      });
    }
  }, [noticia_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <>
      {isLoadingNoticia && <Spinner />}
      {hasErrorNoticia && (
        <strong className="alert alert-danger">Datos incorrectos</strong>
      )}
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
                <label htmlFor="inputTitulo" className="form-label">
                  Titulo
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="tiutlo"
                  id="inputTitulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="textareaInformacion" className="form-label">
                  Informacion
                </label>
                <textarea
                  className="form-control"
                  name="infomracion"
                  id="textareaInformacion"
                  value={informacion}
                  onChange={(e) => setInformacion(e.target.value)}
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
                <input
                  type="submit"
                  className="fadeIn fourth"
                  value={noticia_id ? "Editar" : "Publicar"}
                />
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
