import React from "react";
import styles from "./styles.module.css";

const Modal = ({ cb, controller }) => {
  return (
    <div id={styles.Modal}>
      <p>Do you want to delete ?</p>
      <button
        id={styles.confirmBtn}
        className={styles.btn}
        onClick={() => cb()}
      >
        Confirm
      </button>
      <button
        id={styles.calcelBtn}
        className={styles.btn}
        onClick={() => controller(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default Modal;
