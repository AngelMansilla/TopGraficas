import { useCallback, useContext, useState } from "react";
import postService from "../services/publicar";
import putService from "../services/modificar";
import deleteService from "../services/eliminar";
import Context from "../context/UserContext";

export default function useGrafica() {
  const { jwt } = useContext(Context);
  const [state, setState] = useState({ loading: false, error: false });
  const keyword = "noticia";


  const postNoticia = useCallback(
    ({
      titulo,
      informacion,
      imagen,
    }) => {
      setState({ loading: true, error: false });
      let datos = {
        titulo,
        informacion,
        imagen,
      };
      sessionStorage.getItem("isAdmin") === "1"
        ? postService({
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
            })
        : setState({ loading: false, error: true });
    },
    []
  );

  const putNoticia = useCallback(
    ({
      noticia_id,
      titulo,
      informacion,
      imagen,
    }) => {
      setState({ loading: true, error: false });
      let datos = {
        titulo,
        informacion,
        imagen,
      };
      sessionStorage.getItem("isAdmin") === "1"
        ? putService({
            keyword,
            id: noticia_id,
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
  const deleteNoticia = useCallback(({ id }) => {
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
    isLoadingNoticia: state.loading,
    hasErrorNoticia: state.error,
    postNoticia,
    putNoticia,
    deleteNoticia,
  };
}
