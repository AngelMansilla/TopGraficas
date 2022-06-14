import React from "react"
import './index.css'

export default function Footer() {
  return (
    <footer className="bg-dark text-center text-white mt-5">
      <div className="container p-4">
        <section className="mb-4">
          <a className="btn btn-outline-light btn-floating m-2" href="https://www.facebook.com" ><i className="bi bi-facebook"></i></a>
          <a className="btn btn-outline-light btn-floating m-2" href="https://www.twitter.com" ><i className="bi bi-twitter"></i></a>
          <a className="btn btn-outline-light btn-floating m-2" href="https://www.instagram.com" ><i className="bi bi-instagram"></i></a>
        </section>
        <section className="mb-4">
          <p>
            Top Gráficas es una web donde podrás encontrar las mejores ofertas actuales sobre tarjetas gráficas en el mercado.
          </p>
          <p>
            Tambien destacamos en mostrar un catalogo de tarjetas gráficas con información relevante para los usuarios.
          </p>
        </section>
      </div>
      <div className="text-center p-3" cssproperties="background-color: rgba(0, 0, 0, 0.2);">
        Autor: Ángel Mansilla Puerto
      </div>
    </footer >
  )
}