import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GoogleAuthCallback from "./Container/GoogleAuthCallback";
import Login from "./Container/Login";

const Routes = () => {
  return (
    <Router>
      <Switch>
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

export default Routes;
