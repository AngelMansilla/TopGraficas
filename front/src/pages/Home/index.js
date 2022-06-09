import React, { useEffect, useState } from 'react'
import { useLocation } from "wouter"

import getGraficas from '../../services/Grafica/getGraficas'
import ListOfOfertas from '../../components/ListOfOfertas'

export default function Home() {
  const [graficas, setGraficas] = useState([])
  const [id, setId] = useState(0)

  const [, pushLocation] = useLocation()

  useEffect(function () {
    getGraficas().then(graficas => setGraficas(graficas))
  }, [])


  const handleChange = evt => {
    setId(evt.target.value)
    if (evt.target.value !== 0) {
      pushLocation(`/ofertas/${evt.target.value}`)
    } else {
      pushLocation(`/`)
    }
  }

  return (
    <>
      <select onChange={handleChange} value={id} multiple={false}>
        <option key="0" value="0"></option>
        {graficas.map((grafica) => (
          <option key={grafica.id} value={grafica.id}>
            Graficas {grafica.nombre}
          </option>
        ))}
      </select>
      <h3 className="Page-tittle">Las mejores ofertas</h3>
      <div className='d-grid gap-2'>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <ListOfOfertas id={id} graficas={graficas} />
        </div>
      </div>
    </>
  )
}
