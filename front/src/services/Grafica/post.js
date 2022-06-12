// const ENDPOINT = `https://top-graficas.herokuapp.com/api`
const ENDPOINT = `http://127.0.0.1:8000/api`;

export default async function post({
  nombre,
  empresa,
  pvpr,
  arquitectura,
  memoria,
  tipo_memoria,
  consumo,
  fecha,
  imagen,
  jwt,
}) {
  console.log(jwt)
  console.log(ENDPOINT)
  const res = await fetch(`${ENDPOINT}/grafica`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      nombre,
      empresa,
      pvpr,
      arquitectura,
      memoria,
      tipo_memoria,
      consumo,
      fecha,
      imagen,
    }),
  });
  console.log(res)
  if (!res.ok) throw new Error("Response is NOT ok");
  return res;
}
