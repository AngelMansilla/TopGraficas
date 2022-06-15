import React from "react";

import { Link } from "wouter";

import useUser from "../../hooks/useUser";
import Spinner from "../Spinner";
import useNoticia from "../../hooks/useNoticia";

export default function Noticia({
  id,
  titulo,
  informacion,
  imagen,
  created_at,
}) {
  let fecha = new Date(created_at);

  const { isLoginLoading } = useUser();

  const { deleteNoticia, hasErrorNoticia, isLoadingNoticia } = useNoticia();
  return (
    <div className="col fadeIn first">
      <div className="card flex-row">
        <img
          src={imagen}
          className="card-img-top w-50"
          alt="Imagen de la noticia"
        ></img>
        <div className="card-body col w-50 ms-3 mx-3">
          <h5 className="card-title row justify-content-center">{titulo}</h5>
          <div className="card-text row ms-3">
            <p className="row text-break justify-content-center">
              Informacion: {informacion}
            </p>
            <small className="text-muted row justify-content-center">
              Publicado el {fecha.getDay()}/{fecha.getMonth()}/
              {fecha.getFullYear()}
            </small>
          </div>
          {(isLoginLoading || isLoadingNoticia) && <Spinner height="50px" />}
          {(!isLoginLoading && !isLoadingNoticia) && sessionStorage.getItem("isAdmin") === "1" && (
            <div className="card-footer my-3">
              <Link to={`/noticia/editar/${id}`}>
                <i
                  className="bi bi-wrench-adjustable-circle mx-3"
                  type="button"
                ></i>
              </Link>
              <i
                className="bi bi-x-circle"
                type="button"
                onClick={() => deleteNoticia({id})}
              ></i>
            </div>
          )}
          {hasErrorNoticia && (
            <div>
              <strong className="alert alert-danger">Error al eliminar</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
