import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import { useLocation } from "react-router-dom"

// eslint-disable-next-line no-unused-vars
const endpoint = 'https://top-graficas.herokuapp.com/api'
const ShowGrafica = () => {
  // eslint-disable-next-line no-unused-vars
  const [graficas, setGraficas] = useState([])

  const location = useLocation();
  useEffect(() => {
    getAllGraficas()
  }, [])

  const getAllGraficas = async () => {
    const response = await axios.get('${endpoint/graficas')
    setGraficas(response)
  }

  const deleteGraficas = async (id) => {

    const response = await axios.delete('${endpoint/grafica/${id}')
    getAllGraficas()
  }

  return (

    <div className='d-grid gap-2'>
      <Link to="/publicar" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Publicar</Link>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {graficas.map((grafica) => (
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{grafica.nombre}</h5>
                <p className="card-text">
                  <div>
                    {grafica.empresa}
                  </div>
                  <div>
                    {grafica.memoria} GB
                  </div>
                  <div>
                    {grafica.consumo} vatios
                  </div>
                </p>
                <small className="text-muted">{grafica.fecha}</small>
              </div>
              <img src="{Location.pathname + grafica.imagen}" className="card-img-top" alt="{grafica.nombre}"></img>
              <div className="card-footer">
                <Link to={'/edit/${grafica.id}'} className='btn btn-warning'>Editar</Link>
                <button onClick={() => deleteGraficas(grafica.id)} className='btn btn-danger'>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ShowGrafica