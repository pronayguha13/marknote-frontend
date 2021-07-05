import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../global/LoginContext";
import { UserContext } from "../../global/UserContext";
import styles from "./styles.module.css";

const Navbar = () => {
  const { isAuthenticated, logOutHandler } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  return (
    <nav id={styles.nav}>
      <Link to="/dashboard">
        <span id={styles.companyName}>MARKNOTE</span>
      </Link>
      {isAuthenticated && (
        <div id={styles.userSection}>
          <p>
            Hello! <span style={{ fontWeight: "600" }}>{user.email}</span>
          </p>
          <button id={styles.signOutBtn} onClick={() => logOutHandler()}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
