import ENDPOINT from "../constants";

export default async function modificar({ keyword, id, jwt, datos }) {
  console.log(datos)
  const res = await fetch(`${ENDPOINT()}/${keyword}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(datos),
  });
  const Response = await res.json();
  
  if (!res.ok) throw new Error("Response is NOT ok");
  return Response;
}
