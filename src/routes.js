import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Navbar from "./Components/Navbar/index";
import DashBoard from "./Container/Dashboard/index";
import GoogleAuthCallback from "./Container/GoogleAuthCallback";
import Login from "./Components/Login/index";
import { LoginContext } from "./global/LoginContext";
import { UserContext } from "./global/UserContext";

const Routes = () => {
  const { setIsAuthenticated } = useContext(LoginContext);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
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
              setUser({ ...res.data, notes: notes.data });
            });
        });
    } else {
      setIsAuthenticated(false);
    }
  }, [window.sessionStorage.getItem("authToken")]);
  return (
    <Router>
      <Navbar />
      <Switch>
        <ProtectedRoute path="/user" component={DashBoard} />
        <Route
          path="/auth/google/callback/"
          exact
          component={GoogleAuthCallback}
        />
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, authToken } = useContext(LoginContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authToken || isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    ></Route>
  );
};

export default Routes;
