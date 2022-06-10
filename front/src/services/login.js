// const ENDPOINT = `https://top-graficas.herokuapp.com/api`
const ENDPOINT = `http://127.0.0.1:8000/api`


export default async function login({ email, password }) {

  const res = await fetch(`${ENDPOINT}/sesion`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok)
    throw new Error('Response is NOT ok')
  const res_1 = await res.json()
  return res_1
}
