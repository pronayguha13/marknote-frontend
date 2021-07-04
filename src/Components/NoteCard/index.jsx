import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import Error from "../Toast-notification/Error";

const NoteCard = ({ note }) => {
  const [isPublic, setIsPublic] = useState(note.isPublic);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const deleteHandler = () => {
    const authToken = sessionStorage.getItem("authToken");
    axios
      .delete(`http://localhost:1337/notes/${note.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        setError({
          status: true,
          message: err.message,
        });
      });
  };

  const setVisibilityHandler = () => {
    const authToken = sessionStorage.getItem("authToken");
    axios
      .put(
        `http://localhost:1337/notes/${note.id}`,
        {
          isPublic: !isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setIsPublic(!isPublic);
      })
      .catch((err) => {
        setError({
          status: true,
          message: err.message,
        });
      });
  };

  return (
    <div id={styles.container}>
      {error.status ? <Error error={error} setError={setError} /> : null}
      <Link to={`/note/${note.id}`}>
        <p>{note.title}</p>
      </Link>
      <div id={styles.controller}>
        <span onClick={() => deleteHandler()} className={styles.btn}>
          Delete
        </span>
        <span onClick={() => setVisibilityHandler()} className={styles.btn}>
          Make {isPublic ? "Private" : "Public"}
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
