import React from 'react'

import { Link } from 'wouter'

import deleteOferta from '../../services/deleteOferta'

// const endpoint = 'https://top-graficas.herokuapp.com/api'
const endpoint = 'http://127.0.0.1:8000/api'

const srcImagen = (imagen) => {
  return `${endpoint}/imagenes/${imagen}`
}

export default function Oferta({ id, titulo, precio, votos, enlace, descripcion, vendedor, imagen, fecha, nombreGrafica }) {
  return (
    <div className="col">
      <div className="card flex-row">
        <img src={srcImagen(imagen)} className="card-img-top w-50" alt={nombreGrafica}></img>
        <div className="card-body w-50">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">
            <div>
              {vendedor}
            </div>
            <div>
              {precio} €
            </div>
            <div>
              {votos}
            </div>
          </p>
          <p className="card-text text-break">
            {descripcion}
          </p>
          <small className="text-break fw-bolder">{enlace}</small>
          <small className="text-muted">{fecha}</small>
          <div className="card-footer">
            <Link to={`editar/${id}`} className='btn btn-warning'>Editar</Link>
            <button onClick={() => deleteOferta(id)} className='btn btn-danger'>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
