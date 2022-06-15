import React from "react";

import { Link } from "wouter";

import useGrafica from "../../hooks/useGrafica";

import useUser from "../../hooks/useUser";
import Spinner from "../Spinner";



export default function Grafica({
  id,
  nombre,
  imagen,
  empresa,
  memoria,
  consumo,
  fecha,
  pvpr,
}) {
  const { isLoginLoading } = useUser();
  const { deleteGrafica, hasErrorGrafica, isLoadingGrafica } = useGrafica();
  return (
    <div className="col fadeIn first">
      <div className="card flex-row">
        <img
          src={imagen}
          className="card-img-top w-50"
          alt={nombre}
        ></img>
        <div className="card-body col w-50 ms-3 mx-3">
          <h5 className="card-title row justify-content-center">{nombre}</h5>
          <div className="card-text row ms-3">
            <p className="row justify-content-center">Empresa: {empresa}</p>
            <p className="row justify-content-center">Memoria: {memoria} GB</p>
            <p className="row justify-content-center">
              Consumo: {consumo} vatios
            </p>
            <p className="row justify-content-center">Precio: {pvpr} €</p>
          </div>
          <small className="text-muted row justify-content-center">
            Fecha de salida {fecha}
          </small>
          {(isLoginLoading || isLoadingGrafica) && <Spinner height="50px" />}
          {!isLoginLoading &&
            !isLoadingGrafica &&
            sessionStorage.getItem("isAdmin") === "1" && (
              <div className="card-footer my-3">
                <Link to={`/grafica/editar/${id}`}>
                  <i
                    className="bi bi-wrench-adjustable-circle mx-3"
                    type="button"
                  ></i>
                </Link>
                <i
                  className="bi bi-x-circle"
                  type="button"
                  onClick={() => deleteGrafica({ id })}
                ></i>
              </div>
            )}
          {hasErrorGrafica && (
            <div>
              <strong className="alert alert-danger">Error al eliminar</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
