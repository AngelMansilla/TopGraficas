import React, { useState, useEffect } from "react";
import Noticia from "../Noticia";
import Spinner from "../../components/Spinner";
import getServices from "../../services/buscar";

export default function ListOfNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(false);
  const keyword = "noticia";

  useEffect(function () {
    setLoading(true);
    getServices({ keyword }).then((noticias) => {
      if (!Array.isArray(noticias)) {
        noticias = [noticias];
      }
      setNoticias(noticias);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="d-grid gap-2">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {noticias.map(({ id, titulo, imagen, informacion, created_at }) => (
          <Noticia
            key={id}
            id={id}
            titulo={titulo}
            imagen={imagen}
            informacion={informacion}
            created_at={created_at}
          />
        ))}
      </div>
    </div>
  );
}
