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
import NoteViewer from "./Components/NoteViewer";
import { LoginContext } from "./global/LoginContext";
import { UserContext } from "./global/UserContext";

const Routes = () => {
  const { validateAndFetch } = useContext(UserContext);
  const authToken = window.sessionStorage.getItem("authToken");
  useEffect(() => {
    validateAndFetch();
  }, [authToken]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/view/:uuid" component={NoteViewer} />
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
