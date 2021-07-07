import React, { useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../global/LoginContext";
import { UserContext } from "../global/UserContext";

function GoogleAuthCallback() {
  const location = useLocation();
  const history = useHistory();
  const { setIsAuthenticated, setAuthToken } = useContext(LoginContext);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (!location) {
      return;
    }
    const { search } = location;
    axios({
      method: "GET",
      url: `http://localhost:1337/auth/google/callback?${search}`,
    }).then((res) => setAuthHandler(res.data));
  }, [location]);

  const setAuthHandler = (authData) => {
    window.sessionStorage.setItem("authToken", authData.jwt);
    setAuthToken(authData.jwt);
    setUser(authData.user);
    history.push("/dashboard");
  };

  return <div></div>;
}

export default GoogleAuthCallback;
