import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
  const editHandler = () => {
    console.log("edit btn clicked");
  };

  const deleteHandler = () => {
    console.log("delete btn clicked");
  };

  const setPublicHandler = () => {
    console.log("make public clicked");
  };

  return (
    <div id={styles.container}>
      <Link to={`/note/${note.id}`}>
        <p>{note.title}</p>
      </Link>
      <div id={styles.controller}>
        <span onClick={() => editHandler()} className={styles.btn}>
          edit
        </span>
        <span onCLick={() => deleteHandler()} className={styles.btn}>
          delete
        </span>
        <span onCLick={() => setPublicHandler()} className={styles.btn}>
          make public
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
