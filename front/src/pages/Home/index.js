import React, { useEffect, useState } from 'react'
import { useLocation } from "wouter"

import getGraficas from '../../services/Grafica/getGraficas'
import ListOfOfertas from '../../components/ListOfOfertas'


export default function Home() {
  const [graficas, setGraficas] = useState([])
  const [id, setId] = useState(0)

  const [loading, setLoading] = useState(false)

  const [, pushLocation] = useLocation()

  useEffect(function () {

    setLoading(true)
    getGraficas().then(graficas => {
      setGraficas(graficas)
      setLoading(false)
    })
  }, [])

  const handleChange = evt => {
    setId(evt.target.value)
    if (evt.target.value !== 0) {
      pushLocation(`/ofertas/${evt.target.value}`)
    } else {
      pushLocation(`/`)
    }
  }

  if (loading) return <img class="mx-auto d-block" src="https://www.gastroempleo.com/img/Cargando.gif" alt="Gif loading" height="100px" />


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
      <ListOfOfertas id={id} graficas={graficas} />
    </>
  )
}
