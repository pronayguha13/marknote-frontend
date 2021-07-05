import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Editor, Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.min.css";
import styles from "./styles.module.css";
import Success from "../../Components/Toast-notification/Success";
import Error from "../../Components/Toast-notification/Error";
const plugins = [gfm(), highlight()];

const NoteEditor = () => {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [value, setValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`http://localhost:1337/notes?id=${id}`).then((res) => {
      setNote(res.data[0]);
      setValue(res.data[0].content);
    });
  };

  const onChangeHandler = (e) => {
    setNote({
      ...note,
      title: e.target.value,
    });
  };

  const renameHandler = () => {
    let { title } = note;
    title = title.length ? title : "UNTITLED";
    const authToken = sessionStorage.getItem("authToken");
    axios
      .put(
        `http://localhost:1337/notes/${note.id}`,
        {
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setNote(res.data);
      })
      .catch((err) => {
        setError({
          status: true,
          message: err.message,
        });
      });
  };

  const saveHandler = (e) => {
    if (e.key === "s" && e.ctrlKey === true) {
      e.preventDefault();
      const authToken = window.sessionStorage.getItem("authToken");

      axios
        .put(
          `http://localhost:1337/notes/${id}`,
          {
            content: value,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => {
          setIsSuccess(true);
        })
        .catch((err) => {
          setError({ status: true, message: err.message });
        });
    }
  };

  return (
    <div onKeyDown={(e) => saveHandler(e)} id={styles.editorContainer}>
      {isSuccess ? <Success /> : null}
      {error.status ? <Error error={error.message} /> : null}
      <div id={styles.noteInfo}>
        <input
          id={styles.titleInput}
          type="text"
          value={note.title}
          onChange={(e) => onChangeHandler(e)}
          onBlur={() => renameHandler()}
          placeholder="Enter title..."
        />
      </div>
      <Editor
        value={value}
        plugins={plugins}
        onChange={(v) => {
          setValue(v);
        }}
      />
    </div>
  );
};

export default NoteEditor;
