import React from "react";

import { Link } from "wouter";

import deleteGrafica from "../../services/Grafica/deleteGrafica";

import useUser from "../../hooks/useUser";
import Spinner from "../Spinner";

const endpoint = "http://127.0.0.1:8000/api";

const srcImagen = (imagen) => {
  return `${endpoint}/imagen/${imagen}`;
};

export default function Grafica({
  id,
  nombre,
  imagen,
  empresa,
  memoria,
  consumo,
  fecha,
}) {
  const { isLoginLoading } = useUser();
  return (
    <div className="col fadeIn first">
      <div className="card flex-row">
        <img
          src={srcImagen(imagen)}
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
          </div>
          <small className="text-muted row justify-content-center">
            Fecha de salida {fecha}
          </small>
          {isLoginLoading && <Spinner height="50px" />}
          {!isLoginLoading && sessionStorage.getItem("isAdmin") === "1" && (
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
                onClick={() => deleteGrafica(id)}
              ></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
