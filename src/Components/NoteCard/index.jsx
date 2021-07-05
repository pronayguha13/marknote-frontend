import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import Error from "../Toast-notification/Error";
import Modal from "../Modal/index";

const NoteCard = ({ note }) => {
  const [isPublic, setIsPublic] = useState(note.isPublic);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [showModal, setShowModal] = useState(false);

  const deleteHandler = () => {
    const authToken = sessionStorage.getItem("authToken");
    axios
      .delete(`http://localhost:1337/notes/${note.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        //success => the modal will be closed
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

  const modalHandler = () => {
    deleteHandler();
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div id={styles.container}>
      {error.status ? <Error error={error} setError={setError} /> : null}
      {showModal ? <Modal cb={modalHandler} controller={setShowModal} /> : null}
      <Link to={`/note/${note.id}`}>
        <p>{note.title}</p>
      </Link>
      <div id={styles.controller}>
        <span onClick={() => setShowModal(true)} className={styles.btn}>
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
