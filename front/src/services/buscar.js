import ENDPOINT from "../constants";
export default async function buscar({ keyword, id = 0, graficaId = 0 }) {
  //Añado la barra para la url en caso de que le pasemos una id de una gráfica asi al utilizar el servicio no es necesario pasar la barra
  if (id !== 0) {
    id = "/" + id;
  } else {
    id = "s";
    if (graficaId !== 0) {
      id += "/" + graficaId;
    }
  }

  const apiURL = `${ENDPOINT()}/${keyword}${id}`;
  const res = await fetch(apiURL)
  if (!res.ok) throw new Error("Response is NOT ok");
  const Response = await res.json();
  return  !Array.isArray(Response) && id === 0?  Object.values(Response): Response
}
