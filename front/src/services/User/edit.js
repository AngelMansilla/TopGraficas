import ENDPOINT from "../constants";
export default async function login({jwt, datos}) {
  const res = await fetch(`${ENDPOINT}/usuario`, {
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
