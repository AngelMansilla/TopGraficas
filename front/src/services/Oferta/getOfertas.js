export default async function getOfertas({id}) {
  //Añado la barra para la url en caso de que le pasemos una id de una gráfica asi al utilizar el servicio no es necesario pasar la barra

  if (id!==0) {
    id = '/' + id
  }else{
    id = 's'
  }
  
  const apiURL = `http://127.0.0.1:8000/api/oferta${id}`
  const res = await fetch(apiURL)
  const Response = await res.json()
  if (Array.isArray(Response)) {
    return Response
  }
}

