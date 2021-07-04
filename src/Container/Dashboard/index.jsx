import React, { useContext } from "react";
import styles from "./styles.module.css";

import { UserContext } from "../../global/UserContext";
import NoteCard from "../NoteCard";
const DashBoard = () => {
  const { user } = useContext(UserContext);
  return (
    <div id={styles.dashboardContainer}>
      <h2 id={styles.header}> Welcome!</h2>
      <div id={styles.noteSection}>
        {user.notes &&
          user.notes.map((note, idx) => <NoteCard key={idx} note={note} />)}
      </div>
    </div>
  );
};

export default DashBoard;
