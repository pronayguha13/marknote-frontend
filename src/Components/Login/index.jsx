import React, { useContext, useEffect } from "react";
import styles from "./styles.module.css";
import { LoginContext } from "../../global/LoginContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { isAuthenticated } = useContext(LoginContext);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  });
  return (
    <section id={styles.loginContainer}>
      <p>
        Welcome to <span>MARKNOTE</span>
      </p>
      <button
        id={styles.loginBtn}
        onClick={() =>
          (window.location = "http://localhost:1337/connect/google")
        }
      >
        Sign in with Google
      </button>
    </section>
  );
};

export default Login;
