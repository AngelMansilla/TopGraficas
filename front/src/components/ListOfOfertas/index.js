import React, { useEffect, useState } from 'react'

import Oferta from '../Oferta'
import getOfertas from '../../services/getOfertas'
import getGraficas from '../../services/getGraficas'


export default function ListOfOfertas({ id = '' } = {}) {
  const [ofertas, setOfertas] = useState([])

  useEffect(function () {
    getOfertas({ id }).then(ofertas => setOfertas(ofertas))
  }, [id])

  return ofertas.map(({ id, titulo, precio, votos, enlace, descripcion, vendedor, fecha, grafica_id }) =>
    <Oferta
      id={id}
      titulo={titulo}
      precio={precio}
      votos={votos}
      enlace={enlace}
      descripcion={descripcion}
      vendedor={vendedor}
      imagen={getGraficas({ grafica_id }).imagen}
      fecha={fecha}
      nombreGrafica={getGraficas({ grafica_id }).nombre}
    />
  )
}
