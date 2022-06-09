import React, { useEffect, useState } from 'react'
import Grafica from '../Grafica'
import getGraficas from '../../services/Grafica/getGraficas'

export default function ListOfGraficas() {
  const [graficas, setGraficas] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(function () {
    setLoading(true)
    getGraficas().then(graficas => {
      setGraficas(graficas)
      setLoading(false)
    })
  }, [])


  //Imagen de carga para mostar mientras se este cargando la consulta a la api
  if (loading) return <img class="mx-auto d-block" src="https://www.gastroempleo.com/img/Cargando.gif" alt="Gif loading" height="100px" />

  return <div className='d-grid gap-2'>
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {graficas.map(({ id, nombre, imagen, empresa, memoria, consumo, fecha }) =>
        <Grafica
          key={id}
          id={id}
          nombre={nombre}
          imagen={imagen}
          empresa={empresa}
          memoria={memoria}
          consumo={consumo}
          fecha={fecha}
        />
      )}
    </div>
  </div>
}
