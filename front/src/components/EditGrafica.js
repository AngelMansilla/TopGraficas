import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


// const endpoint = 'https://top-graficas.herokuapp.com/api/graficas/'
const endpoint = 'http://127.0.0.1:8000/api/graficas/'

const EditGrafica = () => {

  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [pvpr, setPvpr] = useState(0)
  const [arquitectura, setArquitectura] = useState('')
  const [memoria, setMemoria] = useState('')
  const [tipo_memoria, setTipo_memoria] = useState('')
  const [consumo, setConsumo] = useState('')
  const [fecha, setFecha] = useState('')
  const [imagen, setImagen] = useState(null)
  const { id } = useParams()


  const update = async (e) => {
    e.preventDefault()

    await axios.put(`${endpoint}${id}`, {
      nombre: nombre,
      empresa: empresa,
      pvpr: pvpr,
      arquitectura: arquitectura,
      memoria: memoria,
      tipo_memoria: tipo_memoria,
      consumo: consumo,
      fecha: fecha,
      imagen: imagen
    })
  }

  useEffect(() => {
    const getGraficaById = async () => {
      const response = await axios.get(`${endpoint}${id}`)
      setNombre(response.data.nombre)
      setEmpresa(response.data.empresa)
      setPvpr(response.data.pvpr)
      setArquitectura(response.data.arquitectura)
      setMemoria(response.data.memoria)
      setTipo_memoria(response.data.tipo_memoria)
      setConsumo(response.data.consumo)
      setFecha(response.data.fecha)
      setImagen(response.data.imagen)
    }
    getGraficaById()
  }, [id])

  return (
    <div className="container w-50 border p-4 mt-4">
      <h1 className="text-center">Publicar Grafica</h1>
      <form className="row g-3" name="publicar-grafica" onSubmit={update}>
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
          <button type="submit" className="btn btn-primary">Actualizar</button>
        </div>
      </form>
    </div>
  )
}

export default EditGrafica