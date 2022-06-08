import React from 'react'
import { Route } from "wouter"

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Graficas from './pages/Graficas'
import Noticias from './pages/Noticias'
import IniciarSesion from './pages/IniciarSesion'

import './App.css';

export default function App() {
  return (
    <div className="App">
      <section className="App-content">
        <Header />
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
        <Footer />
      </section>
    </div >
  );
}