import React from 'react'
import { useLocation } from "wouter"

export default function SelectGraficas({ id, graficas }) {
  const [, pushLocation] = useLocation()

  const handleChange = evt => {
    if (evt.target.value != 0) {
      pushLocation(`/ofertas/${evt.target.value}`)
    } else {
      pushLocation(`/`)
    }
  }
  return <select onChange={handleChange} value={id} multiple={false}>
    <option key="0" value="0"></option>
    {graficas.map((grafica) => (
      <option key={grafica.id} value={grafica.id}>
        Graficas {grafica.nombre}
      </option>
    ))}
  </select>
}
