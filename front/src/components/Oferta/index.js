import React from "react";

import { Link } from "wouter";

import Spinner from "../Spinner";

import useUser from "../../hooks/useUser";

import useOferta from "../../hooks/useOferta";

import ENDPOINT from "../../constants"

import { useLocation } from "wouter";


export default function Oferta({
  id,
  titulo,
  precio,
  enlace,
  descripcion,
  vendedor,
  imagen,
  created_at,
  nombreGrafica,
  user_id,
}) {
  const srcImagen = (imagen) => {
    return `${ENDPOINT}/imagen/${imagen}`;
  };
  const [, navigate] = useLocation();
  let fecha = new Date(created_at);
  const { isLoginLoading } = useUser();
  const { deleteOferta, hasErrorOferta, isLoadingOferta } = useOferta();
  return (
    <div className="col fadeIn first">
      <div className="card flex-row">
        <img
          src={srcImagen(imagen)}
          className="card-img-top w-50"
          alt={nombreGrafica}
        ></img>
        <div className="card-body col w-50 ms-3 mx-3">
          <h5 className="card-title row justify-content-center">{titulo}</h5>
          <div className="card-text row ms-3">
            <p className="row justify-content-center">Tienda: {vendedor}</p>
            <p className="row justify-content-center">Precio: {precio} €</p>
            <p className="row justify-content-center">
              Grafica: {nombreGrafica}
            </p>
            <p className="row text-break justify-content-center">
              Descipcion: {descripcion}
            </p>
            <button id="enlace" class="row justify-content-center submit-button" onClick={ navigate(enlace)} >Ir a la Oferta</button>
            <small className="text-muted row justify-content-center">
              Publicado el {fecha.getDay()}/{fecha.getMonth()}/
              {fecha.getFullYear()}
            </small>
          </div>
          {(isLoginLoading || isLoadingOferta) && <Spinner height="50px" />}
          {(!isLoginLoading && !isLoadingOferta) && (sessionStorage.getItem("isAdmin") === "1" ||  String(user_id) === sessionStorage.getItem("user_id")) && (
            <div className="card-footer my-3">
              <Link to={`/oferta/editar/${id}`}>
                <i
                  className="bi bi-wrench-adjustable-circle mx-3"
                  type="button"
                ></i>
              </Link>
              <i
                className="bi bi-x-circle"
                type="button"
                onClick={() => deleteOferta({id})}
              ></i>
            </div>
          )}
          {hasErrorOferta && (
            <div>
              <strong className="alert alert-danger">Error al eliminar</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
