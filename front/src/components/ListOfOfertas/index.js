import React, { useState, useEffect } from "react";

import Oferta from "../Oferta";
import Spinner from "../../components/Spinner";
import getServices from "../../services/buscar";

export default function ListOfOfertas({ graficaId, graficas }) {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(false);
  const keyword = "oferta";
  let grafica = "";

  useEffect(
    function () {
      setLoading(true);
      getServices({ keyword, graficaId }).then((ofertas) => {
        setOfertas(ofertas);
        setLoading(false);
      });
    },
    [graficaId]
  );

  function searchGraficaImagen(grafica_id) {
    if (graficas.length !== 0 && grafica !== undefined) {
      grafica = getServices({ keyword, grafica_id });
      return grafica.imagen;
    }
  }
  function searchGraficaNombre() {
    if (graficas.length !== 0 && grafica !== undefined) {
      return grafica.nombre;
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className="d-grid gap-2">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {ofertas.map(
          ({
            id,
            titulo,
            precio,
            votos,
            enlace,
            descripcion,
            vendedor,
            created_at,
            grafica_id,
            user_id,
          }) => (
            <Oferta
              key={id}
              id={id}
              titulo={titulo}
              precio={precio}
              votos={votos}
              enlace={enlace}
              descripcion={descripcion}
              vendedor={vendedor}
              imagen={searchGraficaImagen(grafica_id)}
              created_at={created_at}
              nombreGrafica={searchGraficaNombre(grafica_id)}
              user_id={user_id}
            />
          )
        )}
      </div>
    </div>
  );
}
