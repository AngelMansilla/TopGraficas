import React, { useEffect, useState } from 'react'

import Oferta from '../Oferta'
import getOfertas from '../../services/Oferta/getOfertas'


export default function ListOfOfertas({ id, graficas }) {
  const [ofertas, setOfertas] = useState([])
  const [loading, setLoading] = useState(false)
  let grafica = "";

  useEffect(function () {
    setLoading(true)
    if (id !== 0) {
      let arrayOfertas = []
      getOfertas({ id }).then(ofertas => {
        arrayOfertas.push(arrayOfertas)
        setLoading(false)
      })
      setOfertas(arrayOfertas)
    } else {
      getOfertas({ id }).then(ofertas => {
        setOfertas(ofertas)
        setLoading(false)
      })
    }
  }, [id])

  function searchGrafica(id) {
    grafica = graficas.find(grafica => grafica.id === id)
  }

  function searchGraficaImagen(id) {
    if (graficas.length !== 0 && grafica !== undefined) {
      searchGrafica(id)
      return grafica.imagen
    }
  }
  function searchGraficaNombre(id) {
    if (graficas.length !== 0 && grafica !== undefined) {
      return grafica.nombre
    }
  }

  //Imagen de carga para mostar mientras se este cargando la consulta a la api
  if (loading) return <img class="mx-auto d-block" src="https://www.gastroempleo.com/img/Cargando.gif" alt="Gif loading" height="100px" />


  return <div className='d-grid gap-2'>
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {ofertas.map(({ id, titulo, precio, votos, enlace, descripcion, vendedor, created_at, grafica_id }) =>
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
      )}
    </div>
  </div>
}
