import React, { useState, useEffect } from "react";
import Grafica from "../Grafica";
import Spinner from "../../components/Spinner";
import getServices from "../../services/buscar";

export default function ListOfGraficas() {
  const [graficas, setGraficas] = useState([]);
  const [loading, setLoading] = useState(false);
  const keyword = "grafica";

  useEffect(function () {
    setLoading(true);
    getServices({ keyword }).then((graficas) => {
      if (!Array.isArray(graficas)) {
        graficas = [graficas];
      }
      setGraficas(graficas);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="d-grid gap-2">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {graficas.map(
          ({ id, nombre, imagen, empresa, memoria, consumo, fecha, pvpr }) => (
            <Grafica
              key={id}
              id={id}
              nombre={nombre}
              imagen={imagen}
              empresa={empresa}
              memoria={memoria}
              consumo={consumo}
              fecha={fecha}
              pvpr={pvpr}
            />
          )
        )}
      </div>
    </div>
  );
}
