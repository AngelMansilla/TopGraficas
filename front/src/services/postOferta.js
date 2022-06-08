
export default async function postGrafica(formData) {

  // const apiURL = 'https://top-graficas.herokuapp.com/api'
  const apiURL = `http://127.0.0.1:8000/api/oferta`

  const res = await fetch(apiURL)
  const Response = await res.json()
  const { data = [] } = Response
  if (Array.isArray(data)) {
    return data
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };
  fetch(apiURL, requestOptions)
    .then(response => response.json())
    .then(data => element.innerHTML = data.id);

  let accessToken = "29|hptNG2W7gR7h83Y5lEopKRNgTHZcikNEXRxGI0gy"
  await axios.post(endpoint, formData, { "Authorization": `Bearer ${accessToken}` }, { 'Content-Type': 'multipart/form-data' })
} 
