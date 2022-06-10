import React, { useState } from "react";
import { useLocation } from "wouter";
import './style.css'

export default function IniciarSesion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/')
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div class="fadeIn first">
          <i class="bi bi-file-person-fill"></i>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="usuario"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="text"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="submit"
            className="fadeIn fourth"
            value="Iniciar sesion" />
        </form>
      </div>
    </div>
  )
}
