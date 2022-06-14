import { useCallback, useContext } from "react";
import { useState } from "react";
import Context from "../context/UserContext";
import loginService from "../services/User/login";
import logoutService from "../services/User/logout";
import registerService from "../services/User/register";
import editService from "../services/User/edit";

import { useLocation } from "wouter";

export default function useUser() {
  const { setJWT } = useContext(Context);
  const [state, setState] = useState({ loading: false, error: false });
  const [, navigate] = useLocation();

  const login = useCallback(
    ({ email, password }) => {
      setState({ loading: true, error: false });
      loginService({ email, password })
        .then((res) => {
          setState({ loading: false, error: false });
          sessionStorage.setItem("jwt", res.accessToken);
          sessionStorage.setItem("isAdmin", res.user.is_admin);
          sessionStorage.setItem("user_id", res.user.id);
          sessionStorage.setItem("user", res.user);
          setJWT(res.accessToken);
        })
        .catch((err) => {
          setState({ loading: false, error: true });
          console.error(err);
        });
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    setState({ loading: true, error: false });
    logoutService(sessionStorage.getItem("jwt"))
      .then((res) => {
        setState({ loading: false, error: false });
        setJWT(null);
        sessionStorage.setItem("jwt", "");
        sessionStorage.setItem("isAdmin", 0);
        sessionStorage.setItem("user_id", 0);
        sessionStorage.setItem("user", null);
        navigate("/iniciarSesion")
      })
      .catch((err) => {
        setState({ loading: false, error: true });
        console.error(err);
      });
  }, [setJWT]);

  const register = useCallback((datos) => {
    setState({ loading: true, error: false });
    registerService(datos)
      .then((res) => {
        setState({ loading: false, error: false });
        navigate("/iniciarSesion")
      })
      .catch((err) => {
        setState({ loading: false, error: true });
        console.error(err);
      });
  }, []);

  const edit = useCallback((datos) => {
    setState({ loading: true, error: false });
    const jwt = sessionStorage.getItem("jwt")
    editService({ jwt, datos })
      .then((res) => {
        sessionStorage.setItem("jwt", res.accessToken);
        sessionStorage.setItem("isAdmin", 0);
        sessionStorage.setItem("user", res.data);
        setState({ loading: false, error: false });
      })
      .catch((err) => {
        setState({ loading: false, error: true });
        console.error(err);
      })
  }, []);


  return {
    isLogged: Boolean(sessionStorage.getItem("jwt")),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
    register,
    edit,
  };
}
