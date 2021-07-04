import React, { useContext } from "react";
import { LoginContext } from "../../global/LoginContext";
import { UserContext } from "../../global/UserContext";
import styles from "./styles.module.css";

const Navbar = () => {
  const { isAuthenticated, logOutHandler } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  return (
    <nav id={styles.nav}>
      <span id={styles.companyName}>MARKNOTE</span>
      {isAuthenticated && (
        <div id={styles.userSection}>
          <p>{user.email}</p>
          <button id={styles.signOutBtn} onClick={() => logOutHandler()}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
