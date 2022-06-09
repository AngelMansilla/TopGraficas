
export default async function deleteOferta(id) {
  const apiURL = `http://127.0.0.1:8000/api/oferta/${id}`

  const res = await fetch(apiURL, {
    method: 'DELETE'
  })
  const Response = await res.json()
  if (Array.isArray(Response)) {
    return Response
  }
}