import React, { useState } from 'react'
import { Link } from 'wouter'
import getGraficas from '../../services/getGraficas'

const POPULAR_GRAFICAS = getGraficas

export default function Home() {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = evt => {
    //navegar a otra ruta
    console.log(keyword)
  }

  const handleChange = evt => {
    setKeyword(evt.target.value)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={keyword} />
      </form>
      <h3 className="Page-tittle">Las mejores ofertas</h3>
      <select>
        <option></option>
        {POPULAR_GRAFICAS.map((popularGraficas) => (
          <option key={popularGraficas.id}>
            <Link to={`/search/${popularGraficas.id}`}>Graficas {popularGraficas.nombre}</Link>
          </option>
        ))}
      </select>
    </>
  )
}
