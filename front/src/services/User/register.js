import ENDPOINT from "../../constants";
export default async function login(datos) {
  const res = await fetch(`${ENDPOINT}/registrar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
  if (!res.ok) throw new Error("Response is NOT ok");
  const res_1 = await res.json();
  return res_1;
}
