import { useCallback, useContext } from "react";
import { useState } from "react";
import Context from "../context/UserContext";
import loginService from "../services/User/login";
import logoutService from "../services/User/logout";

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
        navigate("/iniciarSesion")
      })
      .catch((err) => {
        setState({ loading: false, error: true });
        console.error(err);
      });
  }, [setJWT]);
  return {
    isLogged: Boolean(sessionStorage.getItem("jwt")),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
  };
}
