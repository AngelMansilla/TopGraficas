
export default async function deleteNoticia(id) {
  const apiURL = `http://127.0.0.1:8000/api/noticia/${id}`

  const res = await fetch(apiURL, {
    method: 'DELETE'
  })
  const Response = await res.json()
  if (Array.isArray(Response)) {
    return Response
  }
}