import React from 'react'

import { Link } from 'wouter'

import deleteOferta from '../../services/Oferta/deleteOferta'

// const endpoint = 'http://127.0.0.1:8000/api'
const endpoint = 'https://top-graficas.herokuapp.com/api'


const srcImagen = (imagen) => {
  return `${endpoint}/imagen/${imagen}`
}

export default function Oferta({ id, titulo, precio, votos, enlace, descripcion, vendedor, imagen, created_at, nombreGrafica }) {
  let fecha = new Date(created_at)
  return (
    <div className="col">
      <div className="card flex-row">
        <img src={srcImagen(imagen)} className="card-img-top w-50" alt={nombreGrafica}></img>
        <div className="card-body col w-50 ms-3 mx-3">
          <h5 className="card-title row justify-content-center">{titulo}</h5>
          <div className="card-text row ms-3">
            <p className="row justify-content-center">
              Tienda: {vendedor}
            </p>
            <p className="row justify-content-center">
              Precio:  {precio} €
            </p>
            <p className="row justify-content-center">
              Votos: {votos}
            </p>
            <p className="row justify-content-center">
              Grafica: {nombreGrafica}
            </p>
            <p className="row text-break justify-content-center">
              Descipcion: {descripcion}
            </p>
            <small className="text-break row justify-content-center">Enlace: {enlace}</small>
            <small className="text-muted row justify-content-center">Publicado el {fecha.getDay()}/{fecha.getMonth()}/{fecha.getFullYear()}</small>
          </div>
          <div className="card-footer row">
            <Link to={`editar/${id}`} className='btn btn-warning'>Editar</Link>
            <button onClick={() => deleteOferta(id)} className='btn btn-danger'>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
