import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'


// const endpoint = 'https://top-graficas.herokuapp.com/api'
const endpoint = 'http://127.0.0.1:8000/api'

const ShowGrafica = () => {
  const [graficas, setGraficas] = useState([])

  useEffect(() => {
    getAllGraficas()
  }, [])

  const getAllGraficas = async () => {
    const response = await axios.get(`${endpoint}/graficas`)
    setGraficas(response.data)
  }

  const deleteGraficas = async (id) => {

    await axios.delete(`${endpoint}/graficas/${id}`)
    getAllGraficas()
  }

  const srcImagen =  (imagen) =>{
    return `${endpoint}/imagenes/${imagen}`
  }

  return (
    <div className='d-grid gap-2'>
      <Link to="/graficas/publicar" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Publicar</Link>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {graficas.map((grafica)  => (
          <div className="col">
            <div className="card flex-row">
              <img src={srcImagen(grafica.imagen)} className="card-img-top w-50" alt={grafica.nombre}></img>
              <div className="card-body w-50">
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
                <div className="card-footer">
                  <Link to={`editar/${grafica.id}`} className='btn btn-warning'>Editar</Link>
                  <button onClick={() => deleteGraficas(grafica.id)} className='btn btn-danger'>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ShowGrafica