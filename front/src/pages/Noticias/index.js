import React from 'react'

import ListOfNoticias from '../../components/ListOfNoticias'

export default function Noticias() {

  return (
    <div className='d-grid gap-2'>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <ListOfNoticias />
      </div>
    </div>
  )
}
