import React, { useContext } from "react";
import axios from "axios";
import uuid from "react-uuid";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../global/UserContext";
import styles from "./styles.module.css";

const Modal = ({ setShowModal }) => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const rejectChangeHandler = () => {
    window.localStorage.removeItem("content");
    setShowModal(false);
  };

  const copyNoteHandler = () => {
    const title = localStorage.getItem("title");
    const content = localStorage.getItem("content");
    axios
      .post(
        "http://localhost:1337/notes",
        {
          title: title,
          author: user.email,
          content: content,
          user: user,
          UUID: uuid(),
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      )
      .then((res) => {
        localStorage.clear();
        window.location.replace(`/note/${res.data.UUID}`);
      })
      .catch((err) => {
        Swal.fire("Something went wrong!", "Cannot create note", "error");
      });
  };

  const signInHandler = () => {
    //checks whether a autToken is present or note
    const authToken = window.sessionStorage.getItem("authToken");
    //if present create a new note with the given title and content and redirect to Editor
    if (authToken) {
      copyNoteHandler();
    } else {
      //if authToken is not present then go to sign in page and after sign in the logic will be same as GoogleAuthcallback's setAuthhandler
      window.location = "http://localhost:1337/connect/google";
    }
  };

  return (
    <div id={styles.Modal}>
      <p>Sign in to create a copy of this document</p>
      <button
        id={styles.confirmBtn}
        className={styles.btn}
        onClick={() => signInHandler()}
      >
        Confirm
      </button>
      <button
        id={styles.calcelBtn}
        className={styles.btn}
        onClick={() => rejectChangeHandler()}
      >
        Cancel
      </button>
    </div>
  );
};

export default Modal;
