import { useCallback, useContext, useState } from "react";
import postService from "../services/publicar";
import putService from "../services/modificar";
import deleteService from "../services/eliminar";
import Context from "../context/UserContext";

export default function useGrafica() {
  const { jwt } = useContext(Context);
  const [state, setState] = useState({ loading: false, error: false });
  const keyword = "oferta";

  const postOferta = useCallback(
    ({ titulo, precio, enlace, descripcion, vendedor, grafica_id }) => {
      setState({ loading: true, error: false });
      let datos = {
        titulo,
        precio,
        enlace,
        descripcion,
        vendedor,
        grafica_id,
      };
      console.log(datos);
      console.log(jwt);
      console.log(keyword);
      postService({
        keyword,
        jwt,
        datos,
      })
        .then((res) => {
          setState({ loading: false, error: false });
        })
        .catch((err) => {
          setState({ loading: false, error: true });
          console.error(err);
        });
    },
    []
  );

  const putOferta = useCallback(
    ({
      oferta_id,
      titulo,
      precio,
      enlace,
      descripcion,
      vendedor,
      grafica_id,
      user_id,
    }) => {
      setState({ loading: true, error: false });
      let datos = {
        titulo,
        precio,
        enlace,
        descripcion,
        vendedor,
        grafica_id,
      };
      console.log(datos);
      sessionStorage.getItem("isAdmin") === "1" ||
      user_id === sessionStorage.getItem("user_id")
        ? putService({
            keyword,
            id: oferta_id,
            jwt,
            datos,
          })
            .then((res) => {
              setState({ loading: false, error: false });
            })
            .catch((err) => {
              setState({ loading: false, error: true });
              console.error(err);
            })
        : setState({ loading: false, error: true });
    },
    []
  );
  const deleteOferta = useCallback(({ id }) => {
    setState({ loading: true, error: false });
    sessionStorage.getItem("isAdmin") === "1"
      ? deleteService({
          id,
          keyword,
          jwt,
        })
          .then((res) => {
            setState({ loading: false, error: false });
            window.location.reload();
          })
          .catch((err) => {
            setState({ loading: false, error: true });
            console.error(err);
          })
      : setState({ loading: false, error: true });
  }, []);

  return {
    isLoadingOferta: state.loading,
    hasErrorOferta: state.error,
    postOferta,
    putOferta,
    deleteOferta,
  };
}
