import React from "react";
import { Route } from "wouter";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Ofertas/index";
import Graficas from "./pages/Graficas/index";
import Noticias from "./pages/Noticias/index";
import IniciarSesion from "./pages/Usuarios";
import CreateGrafica from "./pages/Graficas/create";
import EditGrafica from "./pages/Graficas/edit";
import CreateOferta from "./pages/Ofertas/create";
import EditOferta from "./pages/Ofertas/edit";
import CreateNoticia from "./pages/Noticias/create";
import EditNoticia from "./pages/Noticias/edit";
import CreateUsuario from "./pages/Usuarios/create";
import EditUsuario from "./pages/Usuarios/edit";

import { UserContextProvider } from "./context/UserContext";

import "./App.css";

export default function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <section className="App-content">
          <Header />
          <main className="main">
            <Route component={Home} path="/" />
            <Route component={Home} path="/ofertas/:id" />
            <Route component={Graficas} path="/graficas" />
            <Route component={Noticias} path="/noticias" />
            <Route component={IniciarSesion} path="/iniciarSesion" />
            <Route component={CreateGrafica} path="/grafica/publicar" />
            <Route component={EditGrafica} path="/grafica/editar/:id" />
            <Route component={CreateOferta} path="/oferta/publicar" />
            <Route component={EditOferta} path="/oferta/editar/:id" />
            <Route component={CreateNoticia} path="/noticia/publicar" />
            <Route component={EditNoticia} path="/noticia/editar/:id" />
            <Route component={CreateUsuario} path="/registrarse" />
            <Route component={EditUsuario} path="/perfil" />
          </main>
          <Footer />
        </section>
      </div>
    </UserContextProvider>
  );
}
