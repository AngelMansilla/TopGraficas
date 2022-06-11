import { useCallback, useContext } from "react";
import { useState } from "react";
import postService from "../services/Grafica/post";
import putService from "../services/Grafica/put";
import Context from "../context/UserContext";

export default function useGrafica() {
  const { jwt } = useContext(Context);
  const [state, setState] = useState({ loading: false, error: false });

  const submitPost = useCallback(
    ({
      nombre,
      empresa,
      pvpr,
      arquitectura,
      memoria,
      tipo_memoria,
      consumo,
      fecha,
      imagen,
    }) => {
      setState({ loading: true, error: false });
      sessionStorage.getItem("isAdmin") === "1"
        ? postService({
            nombre,
            empresa,
            pvpr,
            arquitectura,
            memoria,
            tipo_memoria,
            consumo,
            fecha,
            imagen,
            jwt,
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

  const submitPut = useCallback(
    ({
      grafica_id,
      nombre,
      empresa,
      pvpr,
      arquitectura,
      memoria,
      tipo_memoria,
      consumo,
      fecha,
      imagen,
    }) => {
      setState({ loading: true, error: false });
      sessionStorage.getItem("isAmin") === "1"
        ? putService({
            grafica_id,
            nombre,
            empresa,
            pvpr,
            arquitectura,
            memoria,
            tipo_memoria,
            consumo,
            fecha,
            imagen,
            jwt,
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

  return {
    isSubmit: state.loading && state.error,
    isSubmitLoading: state.loading,
    hasSubmitError: state.error,
    submitPost,
    submitPut,
  };
}
