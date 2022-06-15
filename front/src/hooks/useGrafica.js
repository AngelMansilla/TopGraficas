import { useCallback, useContext, useState } from "react";
import postService from "../services/publicar";
import putService from "../services/modificar";
import deleteService from "../services/eliminar";
import Context from "../context/UserContext";

export default function useGrafica() {
  const { jwt } = useContext(Context);
  const [state, setState] = useState({ loading: false, error: false });
  const [isSubmit, setIsSubmit] = useState(false);
  const keyword = "grafica";

  const postGrafica = useCallback(
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
      let datos = {
        nombre,
        empresa,
        pvpr,
        arquitectura,
        memoria,
        tipo_memoria,
        consumo,
        fecha,
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
              setIsSubmit(true);
            })
            .catch((err) => {
              setState({ loading: false, error: true });
              console.error(err);
            })
        : setState({ loading: false, error: true });
    },
    []
  );

  const putGrafica = useCallback(
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
      let datos = {
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
      };

      sessionStorage.getItem("isAdmin") === "1"
        ? putService({
            keyword,
            id: grafica_id,
            jwt,
            datos,
          })
            .then((res) => {
              setState({ loading: false, error: false });
              setIsSubmit(true);
            })
            .catch((err) => {
              setState({ loading: false, error: true });
              console.error(err);
            })
        : setState({ loading: false, error: true });
    },
    []
  );
  const deleteGrafica = useCallback(({ id }) => {
    setState({ loading: true, error: false });
    sessionStorage.getItem("isAdmin") === "1"
      ? deleteService({
          id,
          keyword,
          jwt,
        })
          .then((res) => {
            setState({ loading: false, error: false });
            setIsSubmit(true);
            window.location.reload();
          })
          .catch((err) => {
            setState({ loading: false, error: true });
            console.error(err);
          })
      : setState({ loading: false, error: true });
  }, []);

  return {
    isLoadingGrafica: state.loading,
    hasErrorGrafica: state.error,
    postGrafica,
    putGrafica,
    deleteGrafica,
    isSubmit,
  };
}
