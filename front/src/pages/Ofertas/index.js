import React, { useState, useEffect } from "react";

import ListOfOfertas from "../../components/ListOfOfertas";
import HeaderOfertas from "../../components/Header/ofertas";
import Spinner from "../../components/Spinner";
import getServices from "../../services/buscar";

export default function Home({ params }) {
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
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <HeaderOfertas params={params} graficas={graficas} />
          <ListOfOfertas
            graficaId={params ? params.id : 0}
            graficas={graficas}
          />
        </div>
      )}
    </>
  );
}
