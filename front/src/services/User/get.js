import ENDPOINT from "../../constants";
export default async function get({user_id, jwt}) {
  const res = await fetch(`${ENDPOINT()}/usuario/${user_id}`, {
    method: "GET",
    contentType: "application/json",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!res.ok) throw new Error("Response is NOT ok");
  const Response = await res.json();
  return Response;
}
