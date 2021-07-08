import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.min.css";
import styles from "./styles.module.css";
import Success from "../../Components/Toast-notification/Success";
import Error from "../../Components/Toast-notification/Error";
import Swal from "sweetalert2";

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
    const authToken = sessionStorage.getItem("authToken");
    axios
      .get(`http://localhost:1337/notes?UUID=${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
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
          `http://localhost:1337/notes/${note.id}`,
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
          setTimeout(() => {
            setIsSuccess(false);
          }, 1001);
        })
        .catch((err) => {
          setError({ status: true, message: err.message });
        });
    }
  };

  const shareLinkHandler = () => {
    if (note.isPublic) {
      const copyTxt = document.createElement("input");
      copyTxt.value = `${window.location.origin}/view/${id}`;
      document.body.parentNode.appendChild(copyTxt);
      copyTxt.select();
      document.execCommand("copy");
      document.body.parentNode.removeChild(copyTxt);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Link successfully copied to clipboard",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Private notes cannot be shared",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div onKeyDown={(e) => saveHandler(e)} id={styles.editorContainer}>
      {isSuccess ? <Success setSuccess={setIsSuccess} /> : null}
      {error.status ? <Error error={error.message} /> : null}
      <div id={styles.noteInfo}>
        <input
          id={styles.titleInput}
          type="text"
          value={note.title}
          onChange={(e) => onChangeHandler(e)}
          onBlur={() => renameHandler()}
          placeholder="Enter title..."
          style={
            note?.title && note.title.length
              ? {
                  width: `${
                    note.title.length * 10.4 + 32 > 250
                      ? 250
                      : note.title.length * 10.4 + 32 <= 50
                      ? 80
                      : note.title.length * 13 + 32
                  }px`,
                }
              : { width: "200px" }
          }
        />
        <img
          src="/images/share-button.svg"
          alt="Share"
          id={styles.shareBtn}
          title="Copy shareable link"
          onClick={() => shareLinkHandler()}
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
