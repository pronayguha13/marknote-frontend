import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Routes from "./routes";
import { LoginProvider } from "./global/LoginContext";
import { UserProvider } from "./global/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <LoginProvider>
      <UserProvider>
        <Routes>
          <App />
        </Routes>
      </UserProvider>
    </LoginProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
