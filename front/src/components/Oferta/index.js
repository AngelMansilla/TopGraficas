import React, { useState, useEffect } from "react";

import { Link } from "wouter";

import Spinner from "../Spinner";

import useUser from "../../hooks/useUser";

import useOferta from "../../hooks/useOferta";

import getServices from "../../services/buscar";


export default function Oferta({
  id,
  titulo,
  precio,
  enlace,
  descripcion,
  vendedor,
  grafica_id,
  created_at,
  user_id,
  graficas,
}) {
  let fecha = new Date(created_at);
  const { isLoginLoading } = useUser();
  const { deleteOferta, hasErrorOferta, isLoadingOferta } = useOferta();
  const [imagen, setImagen] = useState("");
  const [nombreGrafica, setNombreGrafica] = useState("");
  const [diferenciaPrecio, setDiferenciaPrecio] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleEnlace = function () {
    window.location.href = enlace;
  };

  useEffect(
    function () {
      if (graficas.length !== 0 && graficas !== undefined) {
        setLoading(true);
        getServices({ keyword: "grafica", id: grafica_id })
          .then((grafica) => {
            setImagen(grafica.imagen);
            setNombreGrafica(grafica.nombre);
            setDiferenciaPrecio(
              parseFloat(precio) - parseFloat(grafica.pvpr) 
            );
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
          });
      }
    },
    [grafica_id]
  );

  return (
    <div className="col fadeIn first m-50">
      <div className="card m-50">
        <div className="card-body flex-row w-100 ms-3 mx-3">
          {loading ? (
            <Spinner />
          ) : (
            <img
              src={imagen}
              className="card-img-top mb-4"
              alt={nombreGrafica}
            ></img>
          )}
          <h5 className="card-title row justify-content-center">{titulo}</h5>
          <div className="card-text row ms-3">
            <p className="row justify-content-center">Tienda: {vendedor}</p>
            <p className="row justify-content-center">
              <strong>Precio: {precio}€</strong>
              <span className={diferenciaPrecio < 0 ? "precioVerde" : "precioRojo"}>{diferenciaPrecio}€</span> 
            </p>
            <p className="row justify-content-center">
              Grafica: {nombreGrafica}
            </p>
            <button
              id="enlace"
              className="row justify-content-center submit-button"
              onClick={() => handleEnlace()}
            >
              Ir a la Oferta
            </button>
            <p className="row text-break justify-content-center">
              Descipcion: {descripcion}
            </p>
            <small className="text-muted row justify-content-center">
              Publicado el {fecha.getDay()}/{fecha.getMonth()}/
              {fecha.getFullYear()}
            </small>
          </div>
        </div>
        {(isLoginLoading || isLoadingOferta) && <Spinner height="50px" />}
        {!isLoginLoading &&
          !isLoadingOferta &&
          (sessionStorage.getItem("isAdmin") === "1" ||
            String(user_id) === sessionStorage.getItem("user_id")) && (
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
                onClick={() => deleteOferta({ id })}
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
  );
}
