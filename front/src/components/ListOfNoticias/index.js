import React, { useEffect, useState } from 'react'
import Noticia from '../Noticia'
import getNoticias from '../../services/Noticia/getNoticias'

export default function ListOfNoticias() {
  const [noticias, setNoticias] = useState([])

  const [loading, setLoading] = useState(false)
  useEffect(function () {
    setLoading(true)
    getNoticias().then(noticias => {
      setNoticias(noticias)
      setLoading(false)
    })
  }, [])

  //Imagen de carga para mostar mientras se este cargando la consulta a la api
  if (loading) return <img class="mx-auto d-block" src="https://www.gastroempleo.com/img/Cargando.gif" alt="Gif loading" height="100px" />

  return <div className='d-grid gap-2'>
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {noticias.map(({ id, titulo, imagen, informacion, created_at }) =>
        <Noticia
          key={id}
          id={id}
          titulo={titulo}
          imagen={imagen}
          informacion={informacion}
          created_at={created_at}
        />
      )}
    </div>
  </div>

}
