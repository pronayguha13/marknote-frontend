import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "./LoginContext";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const { setIsAuthenticated } = useContext(LoginContext);
  const [user, setUser] = useState({});

  const validateAndFetch = () => {
    const authToken = window.sessionStorage.getItem("authToken");
    if (authToken) {
      axios
        .get("http://localhost:1337/users/me", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          axios
            .get(`http://localhost:1337/notes?author=${res.data.email}`)
            .then((notes) => {
              setUser({ ...res.data, notes: notes?.data || [] });
            });
        });
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, validateAndFetch }}>
      {children}
    </UserContext.Provider>
  );
};
