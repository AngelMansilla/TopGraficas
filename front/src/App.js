import React from 'react'
import { Route } from "wouter"

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home/index'
import Graficas from './pages/Graficas/index'
import Noticias from './pages/Noticias/index'
import IniciarSesion from './pages/IniciarSesion'
import CreateGraficas from './pages/Graficas/create'
import EditGraficas from './pages/Graficas/edit'

import { UserContextProvider } from './context/UserContext'

import './App.css';

export default function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <section className="App-content">
          <Header />
          <main className="main">
            <Route
              component={Home}
              path="/" />
            <Route
              component={Home}
              path="/ofertas/:id" />
            <Route
              component={Graficas}
              path="/graficas" />
            <Route
              component={Noticias}
              path="/noticias" />
            <Route
              component={IniciarSesion}
              path="/iniciarSesion" />
            <Route
              component={CreateGraficas}
              path="/grafica/publicar" />
            <Route
              component={EditGraficas}
              path="/grafica/editar/:id" />
          </main>
          <Footer />
        </section>
      </div >
    </UserContextProvider>
  )
}