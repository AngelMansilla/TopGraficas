import React from 'react'
import { useLocation } from "wouter"

export default function SelectGraficas({ id, graficas }) {
  const [, pushLocation] = useLocation()

  const handleChange = evt => {
    if (evt.target.value !== '0') {
      pushLocation(`/ofertas/${evt.target.value}`)
    } else {
      pushLocation(`/`)
    }
  }
  return Array.isArray(graficas) &&
  <select onChange={handleChange} value={id} multiple={false} className="select_graficas fadeIn first">
    <option key="0" value="0">Selecciona una gráfica</option> 
    {graficas.map((grafica) => (
      <option key={grafica.id} value={grafica.id}>
        Gráficas {grafica.nombre}
      </option>
    ))}
  </select>
}
