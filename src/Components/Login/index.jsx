import React from "react";
import styles from "./styles.module.css";

const Login = () => {
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
