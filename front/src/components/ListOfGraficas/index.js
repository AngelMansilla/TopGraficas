import React, { useEffect, useState } from 'react'
import Grafica from '../Grafica'
import getGraficas from '../../services/getGraficas'

export default function ListOfGraficas() {
  const [graficas, setGraficas] = useState([])

  useEffect(function () {
    getGraficas().then(graficas => setGraficas(graficas))
  }, [])

  return graficas.map(({ id, nombre, imagen, empresa, memoria, consumo, fecha }) =>
    <Grafica
      id={id}
      nombre={nombre}
      imagen={imagen}
      empresa={empresa}
      memoria={memoria}
      consumo={consumo}
      fecha={fecha}
    />
  )
}
