import React from 'react'

import { Link } from 'wouter'

import deleteGrafica from '../../services/Grafica/deleteGrafica'

// const endpoint = 'http://127.0.0.1:8000/api'
const endpoint = `https://top-graficas.herokuapp.com/api`

const srcImagen = (imagen) => {
  return `${endpoint}/imagen/${imagen}`
}

export default function Grafica({ id, nombre, imagen, empresa, memoria, consumo, fecha }) {
  return (
    <div className="col">
      <div className="card flex-row">
        <img src={srcImagen(imagen)} className="card-img-top w-50" alt={nombre}></img>
        <div className="card-body col w-50 ms-3 mx-3">
          <h5 className="card-title row justify-content-center">{nombre}</h5>
          <div className="card-text row ms-3">
            <p className="row justify-content-center">
              Empresa: {empresa}
            </p>
            <p className="row justify-content-center">
              Memoria: {memoria} GB
            </p>
            <p className="row justify-content-center">
              Consumo: {consumo} vatios
            </p>
          </div>
          <small className="text-muted row justify-content-center">Fecha de salida {fecha}</small>
          <div className="card-footer row">
            <Link to={`editar/${id}`} className='btn btn-warning'>Editar</Link>
            <button onClick={() => deleteGrafica(id)} className='btn btn-danger'>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
