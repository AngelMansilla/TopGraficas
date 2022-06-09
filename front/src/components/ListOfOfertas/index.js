import React, { useEffect, useState } from 'react'

import Oferta from '../Oferta'
import getOfertas from '../../services/Oferta/getOfertas'

import Spinner from '../../components/Spinner'

export default function ListOfOfertas({ graficaId, graficas }) {
  const [ofertas, setOfertas] = useState([])
  const [loading, setLoading] = useState(false)
  let grafica = "";
  useEffect(function () {
    setLoading(true)
    getOfertas({ graficaId }).then(ofertas => {
      setOfertas(ofertas)
      setLoading(false)
    })
  }, [graficaId])

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

  return <div className='d-grid gap-2'>
    <h3 className="Page-tittle">Las mejores ofertas</h3>
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {loading
        ? <Spinner />
        :
        ofertas.map(({ id, titulo, precio, votos, enlace, descripcion, vendedor, created_at, grafica_id }) =>
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
