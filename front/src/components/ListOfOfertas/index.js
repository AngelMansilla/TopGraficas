import React, { useState, useEffect } from "react";

import Oferta from "../Oferta";
import Spinner from "../../components/Spinner";

import getServices from "../../services/buscar";

export default function ListOfOfertas({ graficaId, graficas }) {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(false);
  const keyword = "oferta";

  useEffect(
    function () {
      setLoading(true);
      getServices({ keyword, graficaId: graficaId }).then((ofertas) => {
        if (!Array.isArray(ofertas)) {
          ofertas = Object.values(ofertas);
        }
        setOfertas(ofertas);
        setLoading(false);
      });
    },
    [graficaId]
  );

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
              created_at={created_at}
              user_id={user_id}
              grafica_id={grafica_id}
              graficas={graficas}
            />
          )
        )}
      </div>
    </div>
  );
}
