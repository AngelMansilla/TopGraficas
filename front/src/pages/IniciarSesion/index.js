import React, { useState } from "react";
import { useLocation } from "wouter";

export default function IniciarSesion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button>Iniciar Sesion</button>
    </form>
  );
}
