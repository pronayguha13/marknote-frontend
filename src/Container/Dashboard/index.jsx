import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../global/UserContext";
import styles from "./styles.module.css";
import NoteCard from "../../Components/NoteCard/";
import Error from "../../Components/Toast-notification/Error";

const DashBoard = () => {
  const { user, validateAndFetch } = useContext(UserContext);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  useEffect(() => {
    validateAndFetch();
  }, []);

  const createNoteHandler = () => {
    axios
      .post(
        "http://localhost:1337/notes",
        {
          author: user.email,
          user: user,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      )
      .then((res) => {
        window.location.replace(`/note/${res.data.id}`);
      })
      .catch((err) => {
        setError({
          status: true,
          message: err.message,
        });
      });
  };

  return (
    <div
      id={`${
        user && user.notes && user.notes.length
          ? styles.dashboardContainer
          : styles.emptyContainer
      }`}
    >
      {error.status ? <Error error={error} setError={setError} /> : null}
      <button
        id={styles.createBtn}
        style={
          user && user.notes && user.notes.length
            ? null
            : { alignSelf: "center" }
        }
        onClick={() => createNoteHandler()}
      >
        Create New Note
      </button>
      {user.notes.length ? (
        <div id={styles.noteSection}>
          {user.notes.map((note, idx) => (
            <NoteCard key={idx} note={note} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DashBoard;
