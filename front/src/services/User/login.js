import ENDPOINT from "../../constants";
export default async function login({ email, password }) {
  const res = await fetch(`${ENDPOINT}/sesion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Response is NOT ok");
  const res_1 = await res.json();
  return res_1;
}
