import React, { useEffect, useState } from 'react'

import getGraficas from '../../services/getGraficas'
import ListOfGraficas from '../../components/ListOfGraficas'

export default function Graficas() {
  const [graficas, setGraficas] = useState([])

  useEffect(function () {
    getGraficas().then(graficas => setGraficas(graficas))
  }, [])

  return (
    <div className='d-grid gap-2'>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <ListOfGraficas graficas={graficas} />
      </div>
    </div>
  )
}
