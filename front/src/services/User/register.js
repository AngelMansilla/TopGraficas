import ENDPOINT from "../../constants";

export default async function register({ datos }) {
  const res = await fetch(`${ENDPOINT()}/registrar`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
  console.log(datos)
  const Response = await res.json();
  if (!res.ok) throw new Error("Response is NOT ok");
  return Response;
}
