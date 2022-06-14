import ENDPOINT from "../constants";
export default async function publicar({ keyword, jwt, datos }) {
  const res = await fetch(`${ENDPOINT()}/${keyword}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(datos),
  });
  console.log(res)
  if (!res.ok) throw new Error("Response is NOT ok");
  return res;
}
