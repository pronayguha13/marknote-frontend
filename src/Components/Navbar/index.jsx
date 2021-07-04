import React, { useContext } from "react";
import { LoginContext } from "../../global/LoginContext";
import styles from "./styles.module.css";

const Navbar = () => {
  const { isAuthenticated, logOutHandler } = useContext(LoginContext);

  return (
    <nav id={styles.nav}>
      <span id={styles.companyName}>MARKNOTE</span>
      {isAuthenticated && (
        <button id={styles.signOutBtn} onClick={() => logOutHandler()}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Navbar;
