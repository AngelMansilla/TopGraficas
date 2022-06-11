import React from "react";

export default function Spinner({ height = "100px" }) {
  return (
    <img
      className="mx-auto d-block"
      src="https://www.gastroempleo.com/img/Cargando.gif"
      alt="Gif loading"
      height={height}
    />
  );
}
