import React, { createContext, useEffect, useState } from "react";
export const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    sessionStorage.getItem("authToken") || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authToken]);

  const logOutHandler = () => {
    sessionStorage.removeItem("authToken");
    window.location.replace("/");
  };

  return (
    <LoginContext.Provider
      value={{
        authToken: authToken,
        setAuthToken: setAuthToken,
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        logOutHandler: logOutHandler,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
