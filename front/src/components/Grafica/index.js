import React from 'react'

import {Link} from 'wouter'

import deleteGrafica from '../../services/deleteGrafica'

// const endpoint = 'https://top-graficas.herokuapp.com/api'
const endpoint = 'http://127.0.0.1:8000/api'

const srcImagen =  (imagen) =>{
  return `${endpoint}/imagen/${imagen}`
}

export default function Grafica({id, nombre, imagen, empresa, memoria, consumo, fecha}) {
  return (
    <div className="col">
      <div className="card flex-row">
        <img src={srcImagen(imagen)} className="card-img-top w-50" alt={nombre}></img>
        <div className="card-body w-50">
          <h5 className="card-title">{nombre}</h5>
          <div className="card-text"> 
            <p>
              {empresa}
            </p>
            <p>
              {memoria} GB
            </p>
            <p>
              {consumo} vatios
            </p>
          </div>
          <small className="text-muted">{fecha}</small>
          <div className="card-footer">
            <Link to={`editar/${id}`} className='btn btn-warning'>Editar</Link>
            <button onClick={() => deleteGrafica(id)} className='btn btn-danger'>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
