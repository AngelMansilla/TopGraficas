export default async function getOfertas({ id = 0, graficaId = 0 }) {
  //Añado la barra para la url en caso de que le pasemos una id de una gráfica asi al utilizar el servicio no es necesario pasar la barra
  if (id !== 0) {
    id = '/' + id
  } else {
    id = 's'
    if (graficaId !== 0) {
      id += '/' + graficaId
    }
  }

  const apiURL = `https://top-graficas.herokuapp.com/api/oferta${id}`
  // const apiURL = `http://127.0.0.1:8000/api/oferta${id}`
  
  const res = await fetch(apiURL)
  const Response = await res.json()
  let arrayResponse = []
  if (!Array.isArray(Response)) {
    //En caso de que no sea un array como cuando tenemos solo 1 resultado pasamos ese objeto a array
    arrayResponse = Object.values(Response)
  } else {
    arrayResponse = Response
  }
  return arrayResponse
}

