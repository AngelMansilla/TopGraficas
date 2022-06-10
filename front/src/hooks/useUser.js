import { useCallback, useContext } from 'react'
import { useState } from "react"
import Context from '../context/UserContext'
import loginService from '../services/login'
import logoutService from '../services/logout'

export default function useUser() {
  const { jwt, setJWT } = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })
  const login = useCallback(({ email, password }) => {
    setState({ loading: true, error: false })
    loginService({ email, password })
      .then(res => {
        setState({ loading: false, error: false })
        sessionStorage.setItem("jwt", res.accessToken);
        sessionStorage.setItem("isAdmin", res.user.is_admin);
        setJWT(res.accessToken)
      })
      .catch(err => {
        setState({ loading: false, error: true })
        console.error(err)
      })
  }, [setJWT])

  const logout = useCallback(() => {
    logoutService(sessionStorage.getItem("jwt"))
      .then(res => {
        setJWT(null)
        sessionStorage.setItem("jwt", "");
        sessionStorage.setItem("isAdmin", 0);
      })
      .catch(err => {
        console.error(err)
      })
  }, [setJWT])
  return {
    isLogged: Boolean(sessionStorage.getItem("jwt")),
    isLoginLoading: state && state.loading,
    hasLoginError: state && state.error,
    login,
    logout
  }
}
