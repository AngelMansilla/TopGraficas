const ENDPOINT = `https://top-graficas.herokuapp.com/api`
// const ENDPOINT = `http://127.0.0.1:8000/api`;

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
  const res = await fetch(`${ENDPOINT}/grafica`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  if (!res.ok) throw new Error("Response is NOT ok");
  const res_1 = await res.json();
  return res_1;
}
