import React from 'react'

import ListOfGraficas from '../../components/ListOfGraficas'

export default function Graficas() {

  return (
    <div className='d-grid gap-2'>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <ListOfGraficas />
      </div>
    </div>
  )
}
