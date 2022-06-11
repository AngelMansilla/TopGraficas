import React, { useEffect, useState } from 'react'

import getGraficas from '../../services/Grafica/getGraficas'
import ListOfOfertas from '../../components/ListOfOfertas'
import HeaderOfertas from '../../components/Header/ofertas'
import Spinner from '../../components/Spinner'

export default function Home({ params }) {
  const [graficas, setGraficas] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(function () {
    setLoading(true)
    getGraficas().then(graficas => {
      setGraficas(graficas)
      setLoading(false)
    })
  }, [])
  return (
    <>
      {
        loading
          ? <Spinner />
          :
          <div>
            <HeaderOfertas params={params} graficas={graficas} />
            <ListOfOfertas graficaId={params ? params.id : 0} graficas={graficas} />
          </div>
      }
    </>
  )
}