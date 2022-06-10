// const ENDPOINT = `https://top-graficas.herokuapp.com/api`
const ENDPOINT = `http://127.0.0.1:8000/api`


export default async function logout(jwt) {
  const res = await fetch(`${ENDPOINT}/cerrarsesion`, {
    method: 'GET',
    contentType: 'application/json',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
  if (!res.ok)
    throw new Error('Response is NOT ok')
  const res_1 = await res.json()
  return res_1
}
