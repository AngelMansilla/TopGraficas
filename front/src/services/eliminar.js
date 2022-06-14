import ENDPOINT from "../constants"

export default async function eliminar({ keyword, id, jwt }) {
  const res = await fetch(`${ENDPOINT()}/${keyword}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const Response = await res.json();
  if (!res.ok) throw new Error("Response is NOT ok");
  return Response;
}
