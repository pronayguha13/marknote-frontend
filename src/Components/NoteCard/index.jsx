import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
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
        Swal.fire({
          icon: "success",
          title: "Success...",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
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

  const deleteBtnClickHandler = () => {
    Swal.fire({
      title: "Do you want to delete?",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Delete`,
    }).then((result) => {
      if (result.isDenied) {
        deleteHandler();
      }
    });
  };

  return (
    <div id={styles.container}>
      {error.status ? <Error error={error} setError={setError} /> : null}
      {showModal ? <Modal cb={modalHandler} controller={setShowModal} /> : null}
      <Link to={`/note/${note.UUID}`}>
        <p>{note.title}</p>
      </Link>
      <div id={styles.controller}>
        <span onClick={() => deleteBtnClickHandler()} className={styles.btn}>
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
