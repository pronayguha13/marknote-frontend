import React, { useEffect, useState } from "react";
import axios from "axios";
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.min.css";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import Modal from "../Modal";

const plugins = [gfm(), highlight()];

const NoteViewer = () => {
  const { uuid } = useParams();
  const history = useHistory();
  const [value, setValue] = useState("");
  const [note, setNote] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/notes/view/${uuid}`)
      .then((res) => {
        if (Object.keys(res.data).length) {
          console.log(res.data);
          setValue(res.data.content);
          setNote(res.data);
          window.localStorage.setItem("title", `${res.data.title}-COPY`);
        } else {
          Swal.fire("Cannot open a private note", "", "error");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeHandler = (v) => {
    //store the content in the localstorage
    window.localStorage.setItem("content", v);
    //show the sign in dialog
    setShowModal(true);
  };

  return (
    <div>
      {showModal ? <Modal setShowModal={setShowModal} /> : null}
      <Editor value={value} onChange={(v) => onChangeHandler(v)} />
    </div>
  );
};

export default NoteViewer;
