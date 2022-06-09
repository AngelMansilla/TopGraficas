import React, { useEffect, useState } from 'react'
import Noticia from '../Noticia'
import getNoticias from '../../services/Noticia/getNoticias'

export default function ListOfNoticias() {
  const [noticias, setNoticias] = useState([])

  useEffect(function () {
    getNoticias().then(noticias => setNoticias(noticias))
  }, [])

  return noticias.map(({ id, titulo, imagen, informacion, created_at }) =>
    <Noticia
      key={id}
      id={id}
      titulo={titulo}
      imagen={imagen}
      informacion={informacion}
      created_at={created_at}
    />
  )
}
