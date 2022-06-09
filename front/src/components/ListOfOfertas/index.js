import React, { useEffect, useState } from 'react'

import Oferta from '../Oferta'
import getOfertas from '../../services/Oferta/getOfertas'


export default function ListOfOfertas({ id, graficas }) {
  const [ofertas, setOfertas] = useState([])
  let grafica = "";

  useEffect(function () {
    if(id!==0){
      let arrayOfertas = []
      getOfertas({ id }).then(ofertas => arrayOfertas.push(arrayOfertas))
      setOfertas(arrayOfertas)
    }else{
      getOfertas({ id }).then(ofertas => setOfertas(ofertas))
    }
  }, [id])

  function searchGrafica(id){
    grafica =  graficas.find(grafica => grafica.id === id)
  }

  function searchGraficaImagen(id) {
    if (graficas.length !== 0 && grafica !== undefined) {
      searchGrafica(id)
      return grafica.imagen
    }
  }
  function searchGraficaNombre(id) {
    if (graficas.length !== 0  && grafica !== undefined) {
      return grafica.nombre
    }
  }
  return ofertas.map(({ id, titulo, precio, votos, enlace, descripcion, vendedor, created_at, grafica_id }) =>
    <Oferta
      key={id}
      id={id}
      titulo={titulo}
      precio={precio}
      votos={votos}
      enlace={enlace}
      descripcion={descripcion}
      vendedor={vendedor}
      imagen={searchGraficaImagen(grafica_id)}
      created_at={created_at}
      nombreGrafica={searchGraficaNombre(grafica_id)}
    />
  )
}
