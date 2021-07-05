import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./Components/Navbar/index";
import DashBoard from "./Container/Dashboard/index";
import GoogleAuthCallback from "./Container/GoogleAuthCallback";
import Login from "./Components/Login/index";
import NoteEditor from "./Container/Editor/index";
import { LoginContext } from "./global/LoginContext";
import { UserContext } from "./global/UserContext";

const Routes = () => {
  const { validateAndFetch } = useContext(UserContext);

  useEffect(() => {
    validateAndFetch();
  }, [window.sessionStorage.getItem("authToken")]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <ProtectedRoute path="/note/:id" component={NoteEditor} />
        <ProtectedRoute path="/dashboard" component={DashBoard} />
        <Route path="/auth/google/callback" component={GoogleAuthCallback} />
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
