import axios from 'axios'
import React, { useState } from 'react'


// const endpoint = 'https://top-graficas.herokuapp.com/api/graficas'
const endpoint = 'http://127.0.0.1:8000/api/graficas'

const CreateGrafica = () => {

  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [pvpr, setPvpr] = useState(0)
  const [arquitectura, setArquitectura] = useState('')
  const [memoria, setMemoria] = useState('')
  const [tipo_memoria, setTipo_memoria] = useState('')
  const [consumo, setConsumo] = useState('')
  const [fecha, setFecha] = useState('')
  const [imagen, setImagen] = useState(null)


  const store = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("nombre", nombre)
    formData.append("empresa", empresa)
    formData.append("pvpr", pvpr)
    formData.append("arquitectura", arquitectura)
    formData.append("memoria", memoria)
    formData.append("tipo_memoria", tipo_memoria)
    formData.append("consumo", consumo)
    formData.append("fecha", fecha)
    formData.append("imagen", imagen)

    await axios.post(endpoint, formData, { 'Content-Type': 'multipart/form-data' })
  }
  return (
    <div className="container w-50 border p-4 mt-4">
      <h1 className="text-center">Publicar Grafica</h1>
      <form className="row g-3" name="publicar-grafica" onSubmit={store}>
        <div className="col-md-6">
          <label htmlFor="inputNombre" className="form-label">Nombre</label>
          <input type='text' className="form-control" name="nombre" id="inputNombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmpresa" className="form-label">Empresa</label>
          <input type="text" className="form-control" name="empresa" id="inputEmpresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPVPR" className="form-label">PVPR (€)</label>
          <input type="number" className="form-control" name="pvpr" id="inputPVPR" step='0.01' value={pvpr} onChange={(e) => setPvpr(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputArquitectura" className="form-label">Arquitectura</label>
          <input type="text" className="form-control" name="arquitectura" id="inputArquitectura" value={arquitectura} onChange={(e) => setArquitectura(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputMemoria" className="form-label">Memoria (GB)</label>
          <input type="number" className="form-control" name="memoria" id="inputMemoria" value={memoria} onChange={(e) => setMemoria(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputTipo_memoria" className="form-label">Tipo de memoria</label>
          <input type="text" className="form-control" name="tipo_memoria" id="inputTipo_memoria" value={tipo_memoria} onChange={(e) => setTipo_memoria(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputConsumo" className="form-label">Consumo (Vatios)</label>
          <input type="number" className="form-control" name="consumo" id="inputConsumo" value={consumo} onChange={(e) => setConsumo(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputFecha" className="form-label">Fecha</label>
          <input type="date" className="form-control" name="fecha" id="inputFecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="col-12">
          <label htmlFor="inputImagen" className="form-label">Imagen</label>
          <input type="file" className="form-control" name="imagen" id="inputImagen" onChange={(e) => setImagen(e.target.files[0])} />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">Publicar</button>
        </div>
      </form>
    </div>
  )
}

export default CreateGrafica